export default LocationServiceFactory;

function LocationServiceFactory($http) {

  let service = {
    getAddressByLatLon: getAddressByLatLon
  }

  function getAddressByLatLon(lat, long) {
    return $http.get(`/api/location?lat=${lat}&long=${long}`);
  }

  return service;
}
