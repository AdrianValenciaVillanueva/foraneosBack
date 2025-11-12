const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use(errorHandler);

module.exports = app;
