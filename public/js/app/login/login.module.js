import angular from 'angular';
import 'angular-route';
import 'satellizer';
import routeConfig from './login.routes.js';

export default angular.module('login', ['ngRoute', 'satellizer'])
  .config(routeConfig)
  .config(function($authProvider) {
    $authProvider.google({
      clientId: '5477081756-t47c34c7tio7v9h1rq145j918q3a08pq.apps.googleusercontent.com'
    });

  });
