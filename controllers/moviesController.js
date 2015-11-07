"use strict";

var showtimes = require('showtimes');

module.exports.getTheaters = function(req, res) {

  var st = showtimes(req.body.location || '06042', {});
  st.getTheaters(function(err, theaters) {
    res.json(theaters);
  });

};
