import _ from 'lodash';

export default function($location, $routeParams, Agenda, geolocation,
  locationService) {
  var vm = this;

  init();

  function init() {
    let isEdit = !!$routeParams.agendaId;
    if (isEdit) {
      Agenda.get({
        id: $routeParams.agendaId
      }).$promise.then(function(agenda) {
        vm.agenda = agenda;
      });
    } else {
      vm.agenda = new Agenda();
      populateStartAddressFromGeolocation(vm.agenda);
    }

    vm.title = isEdit ? "Change My Plan" : "Plan a New Day";
    vm.cancelTo = "#/agendas";
    if (isEdit) {
      vm.cancelTo += '/' + $routeParams.agendaId
    }
  }

  vm.createAgenda = function() {
    var Model = $routeParams.agendaId ? vm.agenda.$update() : vm.agenda.$save();
    Model.then(function(success) {
      $location.path('/agendas/');
    }, function(error) {
      $location.path('/agendas/');
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
