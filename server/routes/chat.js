const express = require('express');
const router = express.Router();
const { chat } = require('../services/claude');
const { logChat } = require('../services/sheets');

const MAX_MESSAGES   = 20;   // max history items accepted from client
const MAX_MSG_LENGTH = 2000; // max chars per message

router.post('/', async (req, res) => {
  const { messages, messageCount, firstQuestion, isReturnVisitor, sessionId } = req.body;

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

  // Validate analytics fields — strict type checks prevent prototype pollution
  if (messageCount !== undefined && (typeof messageCount !== 'number' || messageCount < 0 || messageCount > 10000)) {
    return res.status(400).json({ error: 'Invalid messageCount.' });
  }
  if (sessionId !== undefined && typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'Invalid sessionId.' });
  }
  if (firstQuestion !== undefined && typeof firstQuestion !== 'string') {
    return res.status(400).json({ error: 'Invalid firstQuestion.' });
  }
  if (isReturnVisitor !== undefined && typeof isReturnVisitor !== 'boolean') {
    return res.status(400).json({ error: 'Invalid isReturnVisitor.' });
  }

  // Clamp string fields to safe lengths
  const safeSessionId = typeof sessionId === 'string' ? sessionId.slice(0, 64) : '';
  const safeFirstQuestion = typeof firstQuestion === 'string' ? firstQuestion.slice(0, 500) : '';

  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');

  try {
    const result = await chat(messages);

    // Log user question + bot reply to Google Sheets
    if (lastUserMsg) {
      const language = /[äöüÄÖÜß]/.test(lastUserMsg.content) ? 'DE' : 'EN';
      logChat({
        message: lastUserMsg.content,
        reply: result.reply,
        language,
        ledToLead: result.showBookingForm || false,
        messageCount: messageCount || 1,
        firstQuestion: safeFirstQuestion || lastUserMsg.content,
        returnVisitor: isReturnVisitor === true,
        sessionId: safeSessionId,
      }).catch((e) => console.error('logChat error:', e.message));
    }

    res.json({ reply: result.reply, showBookingForm: result.showBookingForm || false });
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

module.exports = router;
