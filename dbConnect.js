var mongoose = require('mongoose');

module.exports.connect = function (url) {
    mongoose.connect(url);
}