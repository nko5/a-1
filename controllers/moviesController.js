"use strict";

var showtimes = require('showtimes');

module.exports.getTheaters = function(req, res) {

  var st = showtimes(req.query.address, {});
  st.getTheaters(function(err, theaters) {
    res.json(theaters);
  });

};
