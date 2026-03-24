const express = require('express');
const router = express.Router();
const { createAppointment } = require('../services/calendar');
const { appendLead } = require('../services/sheets');

const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE   = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE   = /^\d{2}:\d{2}$/;

function truncate(str, max) {
  return typeof str === 'string' ? str.slice(0, max) : '';
}

router.post('/', async (req, res) => {
  let { name, email, phone, date, time, notes, language, answers } = req.body;

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  if (!date || !DATE_RE.test(date)) return res.status(400).json({ error: 'Date is required (YYYY-MM-DD).' });
  if (!time || !TIME_RE.test(time)) return res.status(400).json({ error: 'Time is required (HH:MM).' });

  email    = email.trim();
  name     = truncate(name, 100);
  phone    = truncate(phone, 30);
  notes    = truncate(notes, 500);
  language = truncate(language, 5);

  try {
    const event = await createAppointment({ name, email, phone, date, time, notes });

    // Also log to Google Sheets as a lead
    await appendLead({
      name,
      email,
      phone,
      firstQuestion: req.body.firstQuestion || '',
      language: language || 'EN',
      answers: answers || {},
    }).catch(() => {}); // don't fail if sheets errors

    res.json({ success: true, eventLink: event?.htmlLink || null });
  } catch (err) {
    console.error('Calendar error:', err.message);
    res.status(500).json({ error: 'Failed to create appointment.' });
  }
});

module.exports = router;
