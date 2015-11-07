var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log("connected to db.")
});

module.exports.connect = function (url) {
    mongoose.connect(url);
};

