const { google } = require('googleapis');

async function createAppointment({ name, email, phone, date, time, notes }) {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!credentialsJson || !calendarId) {
    console.warn('Google Calendar not configured — skipping appointment creation.');
    return null;
  }

  const credentials = JSON.parse(credentialsJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  // Build start datetime (Berlin timezone)
  const startDateTime = new Date(`${date}T${time}:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour

  const toISO = (d) => d.toISOString();

  const description = [
    `Free Initial Consultation — MTM Gym Berlin`,
    ``,
    `Client: ${name || 'Not provided'}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    notes ? `Notes: ${notes}` : '',
  ]
    .filter((l) => l !== undefined)
    .join('\n');

  const event = {
    summary: `MTM Gym Consultation — ${name || email}`,
    description,
    start: { dateTime: toISO(startDateTime), timeZone: 'Europe/Berlin' },
    end: { dateTime: toISO(endDateTime), timeZone: 'Europe/Berlin' },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    resource: event,
    sendUpdates: 'none',
  });

  return response.data;
}

module.exports = { createAppointment };
