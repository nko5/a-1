import angular from 'angular';
import 'angular-route';
import agendasServicesModule from '../services/agendas/agendas.module.js';
import routeConfig from './agendas.routes.js';
import 'arunisrael/angularjs-geolocation';
import locationServicesModule from '../services/location/location.module.js';

export default angular.module('agendas', ['ngRoute', 'geolocation', agendasServicesModule.name,
    locationServicesModule.name
  ])
  .config(routeConfig);
