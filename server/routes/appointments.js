const express = require('express');
const router = express.Router();
const { createAppointment } = require('../services/calendar');
const { appendLead } = require('../services/sheets');

router.post('/', async (req, res) => {
  const { name, email, phone, date, time, notes, language } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required.' });
  if (!date)  return res.status(400).json({ error: 'Date is required.' });
  if (!time)  return res.status(400).json({ error: 'Time is required.' });

  try {
    const event = await createAppointment({ name, email, phone, date, time, notes });

    // Also log to Google Sheets as a lead
    await appendLead({
      name,
      email,
      phone,
      firstQuestion: req.body.firstQuestion || '',
      language: language || 'EN',
    }).catch(() => {}); // don't fail if sheets errors

    res.json({ success: true, eventLink: event?.htmlLink || null });
  } catch (err) {
    console.error('Calendar error:', err.message);
    res.status(500).json({ error: 'Failed to create appointment.' });
  }
});

module.exports = router;
