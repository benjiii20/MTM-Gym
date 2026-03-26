require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');

const chatRouter = require('./routes/chat');
const leadsRouter = require('./routes/leads');
const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 3001;

// Security headers
app.use(helmet());

// CORS — only allow the gym's domain and localhost in dev
const isProd = process.env.NODE_ENV === 'production';
const extraOrigin = process.env.ALLOWED_ORIGIN;
// In production, reject ALLOWED_ORIGIN that isn't HTTPS to prevent accidental misconfiguration
const safeExtraOrigin = extraOrigin && (!isProd || extraOrigin.startsWith('https://')) ? extraOrigin : null;

const allowedOrigins = [
  'https://www.mtmgym.de',
  'https://mtmgym.de',
  safeExtraOrigin,
  ...(!isProd ? ['http://localhost:5173', 'http://localhost:3001'] : []),
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Allow same-origin requests (no origin header) and listed origins
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS: origin not allowed'));
  },
}));

// Limit body size to 32 KB — prevents memory abuse
app.use(express.json({ limit: '32kb' }));

// Reject non-JSON POST bodies early
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && !req.is('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json.' });
  }
  next();
});

// Rate limits
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,                   // 15 messages per IP per 15-min window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please wait a few minutes and try again.' },
});

const leadsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                    // 5 lead submissions per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again later.' },
});

const appointmentsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                    // 5 booking attempts per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many booking attempts. Please try again later.' },
});

app.use('/api/chat', chatLimiter, chatRouter);
app.use('/api/leads', leadsLimiter, leadsRouter);
app.use('/api/appointments', appointmentsLimiter, appointmentsRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Serve React build in production
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));

app.listen(PORT, () => {
  console.log(`MTM Gym chatbot server running on port ${PORT}`);
});
