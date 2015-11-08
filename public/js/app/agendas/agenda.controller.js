export default function($location, $routeParams, Agenda) {
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

  vm.editAgenda = function($event) {
    $event.preventDefault();
    $location.path('/agendas/' + $routeParams.agendaId + '/edit');
  }
}
