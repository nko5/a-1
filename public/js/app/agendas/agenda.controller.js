import _ from 'lodash';

export default function($location, $route, $routeParams, AgendaService, Task) {
  var vm = this;

  init();

  function init() {
    vm.hours = _.times(50, function(ix){
      let hour = ix % 24;
      let ampm = hour < 12 ? 'am' : 'pm';
      hour = ix % 12;
      if (hour) {
        hour = ix + ":00";
      }
      else {
        hour = "12:00"
      }

      return {value: hour + ampm};

    });

    if ($routeParams.agendaId) {
      AgendaService.get($routeParams.agendaId).then(function(agenda) {
        vm.agenda = agenda;
      });
    } else {
      vm.agenda = {};
    }
  }

  vm.newTask = function($event) {
    $event.preventDefault();
    $location.path('/agendas/' + $routeParams.agendaId + '/tasks/new');
  }

  vm.editTask = function($event, taskId) {
    $event.preventDefault();
    $location.path('/agendas/' + $routeParams.agendaId + '/tasks/' + taskId + '/edit');
  }

  vm.removeTask = function($event, taskId) {
    $event.preventDefault();
    Task.remove({ agendaId: $routeParams.agendaId, id: taskId }).$promise.then(function() {
      $route.reload();
    });
  }

  vm.editAgenda = function($event) {
    $event.preventDefault();
    $location.path('/agendas/' + $routeParams.agendaId + '/edit');
  }
}
