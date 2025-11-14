const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const alojaRouter = require('./routes/aloja');

const app = express();

// middlewares
// CORS: permitir peticiones desde el frontend durante desarrollo
// Puedes ajustar `origin` a tu frontend en producción.
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aloja', alojaRouter);

// 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use(errorHandler);

module.exports = app;
