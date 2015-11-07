import AgendasController from './agendas.controller.js';
import AgendaController from './agenda.controller.js';
import EditAgendaController from './editAgenda.controller.js';

export default function($routeProvider) {

    $routeProvider.when('/agendas', {
        templateUrl: 'js/app/agendas/agendas.html',
        controller: AgendasController,
        controllerAs: 'vm'
    });

    $routeProvider.when('/agendas/new', {
        templateUrl: 'js/app/agendas/editAgenda.html',
        controller: EditAgendaController,
        controllerAs: 'vm'
    });

    $routeProvider.when('/agendas/:agendaId', {
        templateUrl: 'js/app/agendas/agenda.html',
        controller: AgendaController,
        controllerAs: 'vm'
    });

    $routeProvider.when('/agendas/:agendaId/edit', {
        templateUrl: 'js/app/agendas/editAgenda.html',
        controller: EditAgendaController,
        controllerAs: 'vm'
    });
    //
    // function getAgendas(agendasService){
    //     return agendasService.fetch();
    // }
    //
    // function getAgenda($route, agendasService) {
    //     let id = $route.current.params.id;
    //     return agendasService.fetch(id);
    // }

}
