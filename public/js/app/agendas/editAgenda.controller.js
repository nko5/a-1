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
        vm.agenda.date = new Date(vm.agenda.date);
        vm.agenda.startTime = new Date(vm.agenda.startTime);
      });
    } else {
      vm.agenda = new Agenda();
      // populateStartAddressFromGeolocation(vm.agenda);
    }

    vm.title = isEdit ? "Change My Plan" : "Plan a New Day";
    vm.cancelTo = "#/agendas";
    if (isEdit) {
      vm.cancelTo += '/' + $routeParams.agendaId
    }
  }

  vm.createAgenda = function() {
    var Model;
    Model = $routeParams.agendaId ? vm.agenda.$update() : vm.agenda.$save();
    Model.then(function(data) {
      data.date = new Date(data.date);
      $location.path('/agendas/'+data._id);
    }, function(error) {
      $location.path('/agendas/');
    });
  }

  function createTask($event) {
    $event.preventDefault();
    $location.path('/agendas/' + agenda.id + '/task');
  }

  vm.getStartTimes = function() {
    let startTimes = {};
    let displayTime;
    let isoTime;
    _.times(12, function(time) {
      displayTime = time+':'+'00AM';
      isoTime = moment(displayTime, 'HH:mma').toISOString();
      startTimes[isoTime] = displayTime;
      displayTime = time+':'+'30AM';
      isoTime = moment(displayTime, 'HH:mma').toISOString();
      startTimes[isoTime] = displayTime;
    });
    return startTimes;
  };

  // function populateStartAddressFromGeolocation(agenda) {
  //   geolocation.getLocation().then(function(data) {
  //     locationService.getAddressByLatLon(data.coords.latitude,
  //       data.coords.longitude).then(function(data) {
  //         var address = _.find(data.data.results, function(locationResult) {
  //           return _.includes(locationResult.types, "street_address");
  //         }).formatted_address;
  //         //assuming start and end address is same - user can change it
  //         agenda.startAddress = address;
  //         agenda.endAddress = address;
  //     });
  //   });
  // }

}
