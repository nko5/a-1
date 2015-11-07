"use strict";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const agendaController = require('./controllers/agendaController');
const taskController = require('./controllers/taskController');

const app = express();

app.use(bodyParser.json());

//Create a static file server
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

//create routes for agendas
agendaController(app);

//create routes for tasks
taskController(app);


app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
