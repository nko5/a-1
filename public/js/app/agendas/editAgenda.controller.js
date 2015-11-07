export default function($location, $http, agenda) {
    var vm = this;

    vm.agenda = agenda;

    vm.createTask = createTask;

    function createTask($event) {
        $event.preventDefault();
        $location.path('/agendas/' + agenda.id + '/task');
    }
}
