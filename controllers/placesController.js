"use strict";

var GooglePlaces = require("googleplaces");
var googlePlaces = new GooglePlaces(process.env.GOOGLE_API_KEY, 'json');

module.exports.getPlaces = function(req, res) {

  /**
   * Place search - https://developers.google.com/places/documentation/#PlaceSearchRequests
   */
  // let parameters = {
  //     location: [-33.8670522, 151.1957362],
  //     types: "grocery_or_supermarket"
  // };
  //
  googlePlaces.placeSearch(req.body.parameters, function(error, places) {
    if (error) {
      console.log(error);
    };
    res.json(places);
  });

};

module.exports.getPlaceDetails = function(req, res) {

  // let parameters = {
  //     reference: 'vherhfiefjf43rt34jfopf'
  // };
  googlePlaces.placeDetailsRequest(req.body.parameters, function(error, places) {
    if (error) {
      console.log(error);
    };
    res.json(places);
  });

};
