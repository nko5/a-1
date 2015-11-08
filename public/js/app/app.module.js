import angular from 'angular';
import loginModule from './login/login.module.js';
import agendasModule from './agendas/agendas.module.js';
import tasksModule from './tasks/tasks.module.js';
import headerModule from './header/header.module.js';
import startupModule from './startup/startup.module.js';
import 'angular/bower-angular-resource';
import 'angular-route';
import 'arunisrael/angularjs-geolocation';
import 'angular-ui/bootstrap-bower';
import locationServiceModule from './services/location/location.module.js';

angular.module('app', [
    startupModule.name,
    loginModule.name,
    headerModule.name,
    agendasModule.name,
    tasksModule.name,
    'ngResource',
    'ngRoute',
    'geolocation',
    'ui.bootstrap',
    locationServiceModule.name
  ])
  .config(['$resourceProvider', '$routeProvider', '$locationProvider', function($resourceProvider, $routeProvider, $locationProvider) {

    // strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = true;

    //default route
    $routeProvider.otherwise('/');

    //html5 PushState
    //$locationProvider.html5Mode(true);

  }]);

angular.bootstrap(document, ['app']);
