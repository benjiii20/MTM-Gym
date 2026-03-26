const express = require('express');
const router = express.Router();
const { appendLead } = require('../services/sheets');

// Bounded regex — prevents catastrophic backtracking (ReDoS)
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{1,63}$/;

function truncate(str, max) {
  return typeof str === 'string' ? str.slice(0, max) : '';
}

router.post('/', async (req, res) => {
  let { name, email, phone, firstQuestion, language } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required.' });
  }
  email = email.trim();
  // Length check before regex to avoid running regex on huge strings
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  name          = truncate(name, 100);
  phone         = truncate(phone, 30);
  firstQuestion = truncate(firstQuestion, 500);
  language      = truncate(language, 5);

  try {
    await appendLead({ name, email, phone, firstQuestion, language });
    res.json({ success: true });
  } catch (err) {
    console.error('Google Sheets error:', err.message);
    res.status(500).json({ error: 'Failed to save lead.' });
  }
});

module.exports = router;
