import AgendasController from './agendas.controller.js';
import AgendaController from './agenda.controller.js';

export default function($routeProvider) {

    $routeProvider.when('/agendas', {
        templateUrl: 'js/app/agendas/agendas.html',
        controller: AgendasController,
        controllerAs: 'vm',
        resolve: {
            agendas: getAgendas
        }
    });

    $routeProvider.when('/agendas/new', {
        templateUrl: 'js/app/agendas/editAgenda.html'
        //controller: HomeController,
        //controllerAs: 'vm'
    });

    $routeProvider.when('/agendas/:id', {
        templateUrl: 'js/app/agendas/agenda.html',
        controller: AgendaController,
        controllerAs: 'vm',
        resolve: {
            agenda: getAgenda
        }
    });

    function getAgendas(agendasService){
        return agendasService.fetch();
    }

    function getAgenda($route, agendasService) {
        let id = $route.current.params.id;
        return agendasService.fetch(id);
    }

}