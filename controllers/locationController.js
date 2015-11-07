"use strict";
var request = require('request');

module.exports.getLocationDetails = function(req, res) {
  let lat = req.query.lat;
  let long = req.query.long;
  var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_API_KEY}`
  request.get(url, {
    json: true
  }, function(err, response, responseBody) {
    return res.json(responseBody);
  });
};
