require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const chatRouter = require('./routes/chat');
const leadsRouter = require('./routes/leads');
const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/appointments', appointmentsRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Serve React build in production
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));

app.listen(PORT, () => {
  console.log(`MTM Gym chatbot server running on port ${PORT}`);
});
