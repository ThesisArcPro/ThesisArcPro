require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const server = http.createServer(app);

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
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// ── SOCKET.IO ──
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'], credentials: true }
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
