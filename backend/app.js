require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const searchRoutes = require('./routes/search');
const movieRoutes = require('./routes/movie');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/search', searchRoutes);
app.use('/api/movie', movieRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;