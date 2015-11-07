import angular from 'angular';
import 'angular-route';
import routeConfig from './agendas.routes.js';

export default angular.module('agendas', ['ngRoute'])
    .config(routeConfig);