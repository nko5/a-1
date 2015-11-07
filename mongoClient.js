"use strict";

const mongoose = require('mongoose');
const fs = require('fs');

const db = mongoose.connection;

// Bootstrap mongoose models
fs.readdirSync('models').forEach(function (file) {
    require('./models/' + file);
});

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log("connected to db.")
});

module.exports.connect = function (url) {
    mongoose.connect(url);
};
