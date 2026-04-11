const express = require('express');
const router = express.Router();
const { chat } = require('../services/claude');

const MAX_MESSAGES   = 20;   // max history items accepted from client
const MAX_MSG_LENGTH = 2000; // max chars per message

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Reject oversized arrays
  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Too many messages in history.' });
  }

  // Validate each message: only 'user' / 'assistant' roles, string content, max length
  for (const m of messages) {
    if (!m || typeof m !== 'object') return res.status(400).json({ error: 'Invalid message format.' });
    if (m.role !== 'user' && m.role !== 'assistant') return res.status(400).json({ error: 'Invalid message role.' });
    if (typeof m.content !== 'string' || m.content.trim() === '') return res.status(400).json({ error: 'Invalid message content.' });
    if (m.content.length > MAX_MSG_LENGTH) return res.status(400).json({ error: 'Message too long.' });
  }

  try {
    const result = await chat(messages);

    res.json({ reply: result.reply, showBookingForm: result.showBookingForm || false, showSoftLeadForm: result.showSoftLeadForm || false });
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

module.exports = router;
