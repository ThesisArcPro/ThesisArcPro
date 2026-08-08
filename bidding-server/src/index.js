require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { Pool } = require('pg');
const Stripe = require('stripe');

const app = express();
const server = http.createServer(app);
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ── DATABASE ──
const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

// ── CORS ──
const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL,
  'http://localhost:4321',
  'http://localhost:3000'
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. server-to-server, curl, Stripe webhooks)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Stripe webhook needs the RAW request body to verify its signature — this MUST be
// registered before express.json(), and only for this one path, or signature checks fail.
app.post('/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    const userId = intent.metadata?.user_id;
    const amount = intent.amount_received / 100; // Stripe uses cents
    if (userId) {
      try {
        await db.query('BEGIN');
        await db.query(
          `INSERT INTO wallet_transactions (user_id, type, amount, note, created_at)
           VALUES ($1, 'deposit', $2, $3, NOW())`,
          [userId, amount, `Stripe payment ${intent.id}`]
        );
        await db.query(
          `INSERT INTO wallets (user_id, available_balance)
           VALUES ($1, $2)
           ON CONFLICT (user_id) DO UPDATE SET available_balance = wallets.available_balance + EXCLUDED.available_balance`,
          [userId, amount]
        );
        await db.query('COMMIT');
        console.log(`Wallet credited: user ${userId} +$${amount}`);
      } catch (err) {
        await db.query('ROLLBACK');
        console.error('Wallet credit error:', err);
      }
    } else {
      console.error('Stripe webhook: missing user_id in metadata');
    }
  }

  res.json({ received: true });
});

app.use(express.json());

// Create a PaymentIntent for the embedded card form (Stripe Elements)
app.post('/create-payment-intent', async (req, res) => {
  const { amount, userId, userEmail } = req.body;
  if (!amount || amount < 5 || !userId) {
    return res.status(400).json({ error: 'Invalid amount or missing user.' });
  }
  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars to cents
      currency: 'usd',
      receipt_email: userEmail,
      metadata: { user_id: userId },
      automatic_payment_methods: { enabled: true }
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error('create-payment-intent error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── SOCKET.IO ──
const io = new Server(server, {
  cors: { origin: ALLOWED_ORIGINS, methods: ['GET', 'POST'], credentials: true }
});

// Track online writers
const onlineWriters = new Map();
const onlineClients = new Map();

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Writer comes online
  socket.on('writer:online', (writerId) => {
    onlineWriters.set(writerId, socket.id);
    socket.join(`writer:${writerId}`);
    console.log(`Writer ${writerId} online`);
  });

  // Client comes online
  socket.on('client:online', (clientId) => {
    onlineClients.set(clientId, socket.id);
    socket.join(`client:${clientId}`);
    console.log(`Client ${clientId} online`);
  });

  // Writer joins a bidding room for an order
  socket.on('bid:join', (orderId) => {
    socket.join(`order:${orderId}`);
  });

  // Writer submits a bid
  socket.on('bid:submit', async (data) => {
    const { orderId, writerId, writerName, amount, message } = data;
    try {
      // Save bid to database
      const result = await db.query(
        `INSERT INTO bids (order_id, writer_id, bid_price, note, status, created_at)
         VALUES ($1, $2, $3, $4, 'pending', NOW())
         RETURNING *`,
        [orderId, writerId, amount, message]
      );
      const bid = result.rows[0];

      // Get order to find client
      const orderResult = await db.query(
        `SELECT * FROM orders WHERE id = $1`,
        [orderId]
      );
      const order = orderResult.rows[0];

      // Broadcast new bid to the order room (client sees it live)
      io.to(`order:${orderId}`).emit('bid:new', {
        ...bid,
        writer_name: writerName,
        order_topic: order?.topic
      });

      // Confirm to the writer
      socket.emit('bid:confirmed', { success: true, bid });

    } catch (err) {
      console.error('bid:submit error', err);
      socket.emit('bid:confirmed', { success: false, error: err.message });
    }
  });

  // Client accepts a bid
  socket.on('bid:accept', async (data) => {
    const { bidId, orderId, writerId } = data;
    try {
      await db.query('BEGIN');

      // Update bid status
      await db.query(`UPDATE bids SET status='accepted' WHERE id=$1`, [bidId]);

      // Reject all other bids for this order
      await db.query(
        `UPDATE bids SET status='rejected' WHERE order_id=$1 AND id!=$2`,
        [orderId, bidId]
      );

      // Assign writer to order
      await db.query(
        `UPDATE orders SET writer_id=$1, order_status='in_progress' WHERE id=$2`,
        [writerId, orderId]
      );

      await db.query('COMMIT');

      // Notify the writer their bid was accepted
      io.to(`writer:${writerId}`).emit('bid:accepted', { orderId, bidId });

      // Notify the order room bidding is closed
      io.to(`order:${orderId}`).emit('bid:closed', { orderId });

      socket.emit('bid:accept:confirmed', { success: true });

    } catch (err) {
      await db.query('ROLLBACK');
      console.error('bid:accept error', err);
      socket.emit('bid:accept:confirmed', { success: false, error: err.message });
    }
  });

  // New order posted — notify all online writers
  socket.on('order:new', (orderData) => {
    socket.broadcast.emit('order:available', orderData);
    console.log('New order broadcasted:', orderData.topic);
  });

  socket.on('disconnect', () => {
    onlineWriters.forEach((sid, wid) => { if (sid === socket.id) onlineWriters.delete(wid); });
    onlineClients.forEach((sid, cid) => { if (sid === socket.id) onlineClients.delete(cid); });
    console.log('Disconnected:', socket.id);
  });
});

// ── HEALTH CHECK ──
app.get('/', (req, res) => res.json({ status: 'ThesisArcPro Bidding Server running' }));

app.get('/health', (req, res) => res.json({ 
  status: 'ok', 
  onlineWriters: onlineWriters.size,
  onlineClients: onlineClients.size
}));

// ── START ──
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Bidding server running on port ${PORT}`)); 
