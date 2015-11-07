import angular from 'angular';
import routeConfig from './agendas.routes.js';


export default angular.module('agendas', [])
    .config(routeConfig)
    .factory('Agenda', ['$resource', function ($resource) {
        return $resource('api/agendas/:id', {id: '@_id'},
              {
                  'update': {method: 'PUT'},
                  'get': {method: 'GET', isArray: false}
              });
    }]);
