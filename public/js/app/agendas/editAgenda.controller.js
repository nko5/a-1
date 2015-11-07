import _ from "npm:lodash@3.10.1";

export default function($location, $http, agenda, geolocation, locationService) {
  var vm = this;

  vm.agenda = agenda;

  vm.createTask = createTask;

  populateAddressFromGeolocation();

  function populateAddressFromGeolocation() {
    geolocation.getLocation().then(function(data) {
      vm.currentCoordinates = {
        lat: data.coords.latitude,
        long: data.coords.longitude
      };
      locationService.getAddressByLatLon(vm.currentCoordinates.lat,
        vm.currentCoordinates.long).then(function(data) {
        vm.startAddress = _.find(data.data.results, function(locationResult) {
          return _.includes(locationResult.types, "street_address");
        }).formatted_address;
      });
    });
  }

  function createTask($event) {
    $event.preventDefault();
    $location.path('/agendas/' + agenda.id + '/task');
  }
}
