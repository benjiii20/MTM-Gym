const { google } = require('googleapis');

async function appendLead({ name, email, phone, firstQuestion, language, answers = {} }) {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!credentialsJson || !sheetId) {
    console.warn('Google Sheets not configured — skipping lead save.');
    return;
  }

  const credentials = JSON.parse(credentialsJson);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const timestamp = new Date().toISOString();
  const row = [
    timestamp,
    name || '',
    email || '',
    phone || '',
    firstQuestion || '',
    language || '',
    answers.goal || '',
    answers.exerciseHours || '',
    answers.experience || '',
    answers.satisfaction || '',
    answers.budget || '',
    answers.timePerWeek || '',
    answers.studio || '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:M',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

module.exports = { appendLead };
