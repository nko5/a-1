"use strict";

var GooglePlaces = require("googleplaces");
var googlePlaces = new GooglePlaces(process.env.GOOGLE_API_KEY, 'json');

module.exports.getPlaces = function(req, res) {

  /**
     * Place search - https://developers.google.com/places/documentation/#PlaceSearchRequests
     */
    let parameters = {
        location: [-33.8670522, 151.1957362],
        types: "doctor"
    };
    googlePlaces.placeSearch(parameters, function (error, places) {
        if (error) throw error;
        res.json(places);
    });

};
