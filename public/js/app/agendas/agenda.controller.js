export default function($location, agenda) {
    var vm = this;

    vm.agenda = agenda;

    vm.newTask = newTask;

    function newTask($event) {
        $event.preventDefault();
        $location.path('/agendas/' + agenda.id + '/task');
    }
}
