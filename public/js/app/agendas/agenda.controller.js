export default function($location, $route, $routeParams, AgendaService, Task) {
  var vm = this;

  init();

  function init() {
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
