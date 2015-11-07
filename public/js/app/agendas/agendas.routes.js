//import HomeController from './home.controller.js';
export default function($routeProvider) {

    $routeProvider.when('/agendas', {
        //templateUrl: 'js/app/agendas/agendas.html',
        template: '<h2>Agendas</h2>'
        //controller: HomeController,
        //controllerAs: 'vm'
    });

    $routeProvider.when('/agendas/new', {
        templateUrl: 'js/app/agendas/editAgenda.html'
        //controller: HomeController,
        //controllerAs: 'vm'
    });

    $routeProvider.when('/agendas/:id', {
        //templateUrl: 'js/app/agendas/agenda.html',
        template: '<h2>My Plan for [date]</h2>'
        //controller: HomeController,
        //controllerAs: 'vm'
    });

}