# MTM Gym AI Lead Generator

## Overview
A bilingual (English / German) AI chatbot web app for **MTM Gym Berlin** (mtmgym.de). Potential clients visit the page, ask questions about the gym, and Claude AI answers using only the official MTM Gym knowledge base. Interested leads can leave their contact details, which are saved to a Google Sheet.

## Architecture

```
client/   React (Vite) frontend — chat UI
server/   Node.js + Express backend — Claude API + Google Sheets
```

## Running Locally

### 1. Set up environment variables
```bash
cp .env.example server/.env
# Then fill in server/.env with your actual keys
```

### 2. Start the backend
```bash
cd server
npm install
npm run dev     # or: node index.js
# Runs on http://localhost:3001
```

### 3. Start the frontend
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `localhost:3001`, so no CORS issues in development.

## Environment Variables (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 3001) |
| `ANTHROPIC_API_KEY` | Your Anthropic API key from console.anthropic.com |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Full JSON string of your Google Service Account credentials |
| `GOOGLE_SHEET_ID` | The ID of your Google Sheet (from the URL) |

## Google Sheets Setup

1. Create a new Google Sheet with the header row:
   `Timestamp | Name | Email | Phone | First Question | Language`
2. Go to [Google Cloud Console](https://console.cloud.google.com/) → IAM → Service Accounts → Create a service account
3. Create a JSON key for that service account → download it
4. Share your Google Sheet with the service account email (give it **Editor** access)
5. Copy the full JSON content into `GOOGLE_SERVICE_ACCOUNT_JSON` in your `.env`
6. Copy the Sheet ID (from the URL: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`) into `GOOGLE_SHEET_ID`

## Updating the Knowledge Base

All gym information is in:
```
server/data/gymKnowledge.js
```

Edit that file to update pricing, team members, locations, FAQs, etc. The content is injected directly into the Claude system prompt.

## How the AI Works

- Uses `claude-sonnet-4-6` via the Anthropic SDK
- Answers ONLY from the knowledge base (no hallucination)
- Detects language automatically and responds in the same language (EN / DE)
- If a question cannot be answered: replies "Wait for someone from the team to answer"
- When a user shows buying intent, the bot returns a flag that triggers the lead capture form in the UI
- Lead capture form collects: Name, Email, Phone → saved to Google Sheets

## Project Structure

```
AI-lead-Gen-MTM/
├── client/
│   ├── src/
│   │   ├── App.jsx                        # State management, API calls
│   │   ├── index.css                      # Global MTM dark theme styles
│   │   └── components/
│   │       ├── ChatWindow.jsx / .module.css
│   │       ├── Message.jsx / .module.css
│   │       ├── TypingIndicator.jsx / .module.css
│   │       └── LeadCaptureForm.jsx / .module.css
│   ├── index.html
│   └── vite.config.js                     # API proxy to :3001
└── server/
    ├── data/gymKnowledge.js               # All MTM Gym info
    ├── services/
    │   ├── claude.js                      # Claude API + system prompt
    │   └── sheets.js                      # Google Sheets integration
    ├── routes/
    │   ├── chat.js                        # POST /api/chat
    │   └── leads.js                       # POST /api/leads
    └── index.js                           # Express app entry point
```
