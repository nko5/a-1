//import HomeController from './home.controller.js';
export default function($routeProvider) {

    $routeProvider.when('/', {
        //templateUrl: 'js/app/home/home.html',
        template: '<h2>Login</h2>'
        //controller: HomeController,
        //controllerAs: 'vm'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
}