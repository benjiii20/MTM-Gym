const express = require('express');
const router = express.Router();
const { chat } = require('../services/claude');

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const result = await chat(messages);
    res.json({ reply: result.reply, showBookingForm: result.showBookingForm || false });
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

module.exports = router;
