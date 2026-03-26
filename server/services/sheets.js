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
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  });
}

async function logChat({ message, reply, language, ledToLead, messageCount, firstQuestion, returnVisitor, sessionId }) {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!credentialsJson || !sheetId) return;

  const credentials = JSON.parse(credentialsJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const timestamp = new Date().toISOString();
  const row = [
    timestamp,
    sessionId || '',
    message || '',
    reply || '',
    language || '',
    ledToLead ? 'Yes' : 'No',
    messageCount || 1,
    firstQuestion || '',
    returnVisitor ? 'Yes' : 'No',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Chat!A:I',
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  });
}

module.exports = { appendLead, logChat };
