const express = require('express');
const router = express.Router();
const { appendLead } = require('../services/sheets');

router.post('/', async (req, res) => {
  const { name, email, phone, firstQuestion, language } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    await appendLead({ name, email, phone, firstQuestion, language });
    res.json({ success: true });
  } catch (err) {
    console.error('Google Sheets error:', err.message);
    res.status(500).json({ error: 'Failed to save lead.' });
  }
});

module.exports = router;
