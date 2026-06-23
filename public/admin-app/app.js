// ── CONFIG ──
const SUPABASE_URL = 'https://rehvwvujuamehoanfomj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaHZ3dnVqdWFtZWhvYW5mb21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNTYzNDYsImV4cCI6MjA5NTkzMjM0Nn0.zT9H0MMpk_H_lD_LVARrspw8aaqOAZ-0I606D8Ho0Ws';
const ADMIN_PIN = '1234'; // ← CHANGE THIS

// ── STATE ──
let currentFilter = 'all';
let currentConv = null;
let conversations = {};

// ── HEADERS ──
const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

// ── DOM REFS ──
const loginScreen = document.getElementById('login-screen');
const appScreen = document.getElementById('app-screen');
const convList = document.getElementById('conv-list');
const chatView = document.getElementById('chat-view');
const chatMessages = document.getElementById('chat-messages');
const chatHeaderName = document.getElementById('chat-header-name');
const chatHeaderRole = document.getElementById('chat-header-role');
const replyInput = document.getElementById('reply-input');
const pinError = document.getElementById('pin-error');

// ── PIN LOGIN ──
let pinEntry = '';
const pinDots = document.querySelectorAll('.pin-dot');

function updatePinDisplay() {
  pinDots.forEach((dot, i) => {
    dot.classList.toggle('filled', i < pinEntry.length);
  });
}

function handlePin(val) {
  if (val === 'del') {
    pinEntry = pinEntry.slice(0, -1);
    updatePinDisplay();
    return;
  }
  if (pinEntry.length >= 4) return;
  pinEntry += val;
  updatePinDisplay();

  if (pinEntry.length === 4) {
    if (pinEntry === ADMIN_PIN) {
      pinError.textContent = '';
      loginScreen.style.display = 'none';
      appScreen.style.display = 'flex';
      initApp();
    } else {
      pinError.textContent = 'Incorrect PIN. Try again.';
      pinEntry = '';
      updatePinDisplay();
    }
  }
}

document.querySelectorAll('.pin-btn').forEach(btn => {
  btn.addEventListener('click', () => handlePin(btn.dataset.val));
});

// ── INIT APP ──
async function initApp() {
  await loadConversations();
  // Poll every 15 seconds
  setInterval(async () => {
    await loadConversations();
    if (currentConv) {
      const updated = conversations[currentConv.id];
      if (updated) {
        currentConv = updated;
        renderMessages();
      }
    }
  }, 15000);
}

// ── LOAD CONVERSATIONS ──
async function loadConversations() {
  convList.style.display = 'block';
  convList.innerHTML = `<div class="loading-msg"><div class="spinner"></div>Loading messages...</div>`;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/messages?select=id,conversation_id,sender_id,sender_name,sender_role,content,created_at&order=created_at.desc&limit=200`,
      { headers }
    );

    if (!res.ok) {
      const err = await res.text();
      convList.innerHTML = `<div class="empty-msg">Error: ${res.status} — ${err}</div>`;
      return;
    }

    const messages = await res.json();
    console.log('Messages loaded:', messages.length, messages);

    if (!Array.isArray(messages) || messages.length === 0) {
      convList.innerHTML = `<div class="empty-msg">No messages yet.</div>`;
      return;
    }

    // Group by conversation_id
    conversations = {};
    messages.forEach(msg => {
      const cid = msg.conversation_id;
      if (!conversations[cid]) {
        conversations[cid] = {
          id: cid,
          sender_name: msg.sender_name,
          sender_role: msg.sender_role,
          messages: [],
          last_message: msg.content,
          last_time: msg.created_at
        };
      }
      conversations[cid].messages.push(msg);
    });

    renderConvList();
  } catch (err) {
    convList.innerHTML = `<div class="empty-msg">Failed to load. Check connection.<br>${err.message}</div>`;
    console.error('Load error:', err);
  }
}

// ── RENDER CONVERSATION LIST ──
function renderConvList() {
  const all = Object.values(conversations);
  const filtered = all.filter(c => {
    if (currentFilter === 'all') return true;
    return c.sender_role === currentFilter;
  });

  if (filtered.length === 0) {
    convList.innerHTML = `<div class="empty-msg">No conversations found.</div>`;
    return;
  }

  convList.innerHTML = filtered.map(c => {
    const initials = c.sender_name
      ? c.sender_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
      : '??';
    const roleClass = `role-${c.sender_role || 'client'}`;
    const time = formatTime(c.last_time);
    const preview = c.last_message || 'No messages yet';

    return `
      <div class="conv-item" onclick="openChat('${c.id}')">
        <div class="conv-avatar ${roleClass}">${initials}</div>
        <div class="conv-info">
          <div class="conv-name">${c.sender_name || 'Unknown'}</div>
          <div class="conv-preview">${preview}</div>
        </div>
        <div class="conv-meta">
          <div class="conv-time">${time}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ── OPEN CHAT ──
function openChat(convId) {
  currentConv = conversations[convId];
  if (!currentConv) return;

  chatHeaderName.textContent = currentConv.sender_name || 'Unknown';
  chatHeaderRole.textContent = currentConv.sender_role || 'client';

  convList.style.display = 'none';
  chatView.style.display = 'flex';

  renderMessages();
}

// ── RENDER MESSAGES ──
function renderMessages() {
  if (!currentConv) return;

  const msgs = [...currentConv.messages].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  chatMessages.innerHTML = msgs.map(msg => {
    const isOutgoing = msg.sender_role === 'support';
    const time = formatTime(msg.created_at);

    return `
      <div>
        ${!isOutgoing ? `<div class="msg-sender">${msg.sender_name || 'User'}</div>` : ''}
        <div class="msg-bubble ${isOutgoing ? 'outgoing' : 'incoming'}">
          ${msg.content}
          <div class="msg-time">${time}</div>
        </div>
      </div>
    `;
  }).join('');

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ── SEND MESSAGE ──
async function sendMessage() {
  const content = replyInput.value.trim();
  if (!content || !currentConv) return;

  replyInput.value = '';

  const newMsg = {
    conversation_id: currentConv.id,
    sender_name: 'Support',
    sender_role: 'support',
    content,
    created_at: new Date().toISOString()
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newMsg)
    });

    if (!res.ok) {
      console.error('Send failed:', await res.text());
      return;
    }

    currentConv.messages.push(newMsg);
    currentConv.last_message = content;
    renderMessages();
  } catch (err) {
    console.error('Send error:', err);
  }
}

// ── SEND ON ENTER ──
replyInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

document.getElementById('send-btn').addEventListener('click', sendMessage);

// ── BACK BUTTON ──
document.getElementById('back-btn').addEventListener('click', () => {
  chatView.style.display = 'none';
  convList.style.display = 'block';
  currentConv = null;
});

// ── LOGOUT ──
document.getElementById('logout-btn').addEventListener('click', () => {
  appScreen.style.display = 'none';
  loginScreen.style.display = 'flex';
  pinEntry = '';
  updatePinDisplay();
});

// ── FILTERS ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderConvList();
  });
});

// ── FORMAT TIME ──
function formatTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}