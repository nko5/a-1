export default LocationServiceFactory;

function LocationServiceFactory($http) {

  let service = {
    getAddressByLatLon: getAddressByLatLon
  }

  function getAddressByLatLon(lat, long) {
    return $http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}`);
  }

  return service;
}
