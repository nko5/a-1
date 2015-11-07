export default LocationServiceFactory;

function LocationServiceFactory($http) {

  let service = {
    getAddressByLatLon: getAddressByLatLon
  }

  getAddressByLatLon = function(lat, long) {
    $http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}`)
      .then(function(data) {
        console.log(data);
      });
  }

  return service;
}
