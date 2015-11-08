"use strict";
var request = require('request');
var _ = require('lodash');

module.exports.getLocationDetails = function(req, res) {
  let lat = req.query.lat;
  let long = req.query.long;
  var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_API_KEY}`;
  request.get(url, {
    json: true
  }, function(err, response, responseBody) {
    return res.json(responseBody);
  });
};

module.exports.getTravelTime = function(req, res) {
  let origin = req.query.origin;
  let destination = req.query.destination;
  var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=driving&language=en-US&key=${process.env.GOOGLE_API_KEY}`;
  request.get(url, {
    json: true
  }, function(err, response, responseBody) {
    var durationInMinutes = responseBody.rows[0].elements[0].duration.value / 60;
    return res.json({
      duration: {
        minutes: durationInMinutes
      }
    });
  });
};
