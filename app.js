var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var authRoutes = require('./routes/authRoutes');

var app = express();

app.use(bodyParser.json());

//Create a static file server
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
