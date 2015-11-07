import angular from 'angular';
import loginModule from './login/login.module.js';
import agendasModule from './agendas/agendas.module.js';
import headerModule from './header/header.module.js';
import startupModule from './startup/startup.module.js';
import 'angular/bower-angular-resource';
import 'angular-route';
import 'arunisrael/angularjs-geolocation';
import locationServiceModule from './services/location/location.module.js';

angular.module('app', [
    startupModule.name,
    loginModule.name,
    agendasModule.name,
    headerModule.name,
    'ngResource',
    'ngRoute',
    'geolocation',
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
