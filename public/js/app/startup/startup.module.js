import angular from 'angular';
import 'angular-route';
import routeConfig from './startup.routes.js';

export default angular.module('startup', ['ngRoute'])
    .config(routeConfig);
