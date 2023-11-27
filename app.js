/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const viewRoutes = require('./routes/viewRoutes');
const formulationRoutes = require('./routes/formulationRoutes');
const globalErrorHandeler = require('./controllers/errorController');

const app = express();

// load view engine to render pages
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/', viewRoutes);
app.use('/formulation', formulationRoutes);

app.use(express.static(`${__dirname}/public`));

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandeler);

module.exports = app;
