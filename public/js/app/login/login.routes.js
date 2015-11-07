import LoginController from './login.controller.js';

export default function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'js/app/login/login.html',
        controller: LoginController,
        controllerAs: 'vm'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}
