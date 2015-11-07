export default function($location, $routeParams, Agenda) {
  var vm = this;

  init();

  function init() {
    if($routeParams.agendaId) {
      Agenda.get({id: $routeParams.agendaId}).$promise.then(function (agenda) {
        vm.agenda = agenda;
      });
    } else {
      vm.agenda = new Agenda();
    }
  }

  vm.createAgenda = function () {
    console.log('inside save');
    vm.agenda.$save().then(function(success) {
      console.log(success);
    }, function(error) {
      console.log(error);
    });
  }

  function createTask($event) {
    $event.preventDefault();
    $location.path('/agendas/' + agenda.id + '/task');
  }

}
