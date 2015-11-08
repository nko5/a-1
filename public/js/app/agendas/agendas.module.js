import angular from 'angular';
import routeConfig from './agendas.routes.js';
import AgendasService from '../services/agendas/agendas.module.js';


export default angular.module('agendas', [AgendasService.name])
    .config(routeConfig)
    .factory('Agenda', ['$resource', function ($resource) {
        return $resource('api/agendas/:id', {id: '@_id'},
              {
                  'update': {method: 'PUT'},
                  'get': {method: 'GET', isArray: false}
              });
    }]);
