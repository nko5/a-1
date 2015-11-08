export default function($location, $route, $routeParams, Agenda, Task) {
  var vm = this;

  init();

  function init() {
    if ($routeParams.agendaId) {
      Agenda.get({
        id: $routeParams.agendaId
      }).$promise.then(function(agenda) {
        vm.agenda = agenda;
        vm.agenda.date = new Date(vm.agenda.date);
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
    Task.remove({ agendaId: $routeParams.agendaId, id: taskId });
    $route.reload();
  }

  vm.editAgenda = function($event) {
    $event.preventDefault();
    $location.path('/agendas/' + $routeParams.agendaId + '/edit');
  }
}
