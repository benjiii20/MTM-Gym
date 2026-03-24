const express = require('express');
const router = express.Router();
const { chat } = require('../services/claude');
const { logChat } = require('../services/sheets');

router.post('/', async (req, res) => {
  const { messages, messageCount, firstQuestion, isReturnVisitor, sessionId } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

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
        firstQuestion: firstQuestion || lastUserMsg.content,
        returnVisitor: isReturnVisitor || false,
        sessionId: sessionId || '',
      }).catch((e) => console.error('logChat error:', e.message));
    }

    res.json({ reply: result.reply, showBookingForm: result.showBookingForm || false });
  } catch (err) {
    console.error('Claude API error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

module.exports = router;
