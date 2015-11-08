"use strict";
var request = require('request');
var _ = require('lodash');
var querystring = require('querystring');

module.exports.getLocationDetails = function(req, res) {
  let lat = req.query.lat;
  let long = req.query.long;
  var qs = querystring.stringify({ latlng: `${lat},${long}`, key: process.env.GOOGLE_API_KEY})

  var url = 'https://maps.googleapis.com/maps/api/geocode/json?' + qs;
  request.get(url, {
    json: true
  }, function(err, response, responseBody) {
    return res.json(responseBody);
  });
};

module.exports.getTravelTime = getTravelTime;

module.exports.getTravelTimeReqHandler = function(req, res) {
  getTravelTime(req.query.origin, req.query.destination, function(err, duration) {
    if (err) {
      res.status(500).send({
        message: 'Error retrieving travel time.'
      });
    }
    res.json(duration);
  });
};

function getTravelTime(origin, destination, cb) {
  var qs = querystring.stringify({ origins: origin,
    destinations: destination,
    key: process.env.GOOGLE_API_KEY});

  var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?' + qs;
  console.log(qs);
  request.get(url, {
    json: true
  }, function(err, response, responseBody) {

    if (err) {
      return cb(err);
    }
    var durationInMinutes = responseBody.rows[0].elements[0].duration ? responseBody.rows[0].elements[0].duration.value / 60 : 0;
    return cb(null, {
      duration: {
        minutes: durationInMinutes
      }
    });
  });
};

module.exports.getTravelTimeReqHandler = function(req, res) {
  let origin = req.query.origin;
  let destination = req.query.destination;
  getTravelTime(origin, destination, function(err, duration) {
    res.json(duration);
  });
};
