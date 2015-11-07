import angular from 'angular';
import 'angular-route';
import routeConfig from './login.routes.js';

export default angular.module('login', ['ngRoute'])
    .config(routeConfig);