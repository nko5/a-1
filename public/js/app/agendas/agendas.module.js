import angular from 'angular';
import 'angular-route';
import agendasServicesModule from '../services/agendas/agendas.module.js';
import routeConfig from './agendas.routes.js';

export default angular.module('agendas', ['ngRoute', agendasServicesModule.name])
    .config(routeConfig);