export default function($location, Agenda) {
    var vm = this;

    vm.agendas = Agenda.query();

    vm.goToAgenda =  getToAgenda;

    function getToAgenda(agenda, $event) {
        $location.path('/agendas/'+agenda._id);
        $event.preventDefault();
    }
}
