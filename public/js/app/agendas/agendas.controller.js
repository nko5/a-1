export default function($location, agendas) {
    var vm = this;

    vm.agendas = agendas;

    vm.goToAgenda =  getToAgenda;

    function getToAgenda(agenda, $event) {
        $location.path('/agendas/'+agenda.id);
        $event.preventDefault();
    }
}

