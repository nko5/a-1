import StartupController from './startup.controller.js';

export default function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'js/app/startup/startup.html',
        controller: StartupController,
        controllerAs: 'vm'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}
