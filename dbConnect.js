var mongoose = require('mongoose');

var config = require('./config').config;

module.exports.connect = function(callback) {
  mongoose.connect(config.MONGO_URL);
}
