import _ from 'lodash';

export default function($location, $routeParams, Agenda, geolocation,
  locationService) {
  var vm = this;

  init();

  function init() {
    if ($routeParams.agendaId) {
      Agenda.get({
        id: $routeParams.agendaId
      }).$promise.then(function(agenda) {
        vm.agenda = agenda;
      });
    } else {
      vm.agenda = new Agenda();
      populateStartAddressFromGeolocation(vm.agenda);
    }
  }

  vm.createAgenda = function() {
    console.log('inside save');
    var Model = $routeParams.agendaId ? vm.agenda.$update() : vm.agenda.$save();
    Model.then(function(success) {
      console.log(success);
    }, function(error) {
      console.log(error);
    });
  }

  function createTask($event) {
    $event.preventDefault();
    $location.path('/agendas/' + agenda.id + '/task');
  }

  function populateStartAddressFromGeolocation(agenda) {
    geolocation.getLocation().then(function(data) {
      locationService.getAddressByLatLon(data.coords.latitude,
        data.coords.longitude).then(function(data) {
        agenda.startAddress = _.find(data.data.results, function(locationResult) {
          return _.includes(locationResult.types, "street_address");
        }).formatted_address;
      });
    });
  }

}
