import angular from 'angular';
import routeConfig from './tasks.routes.js';


export default angular.module('tasks', [])
    .config(routeConfig)
    .factory('Task', ['$resource', function ($resource) {
        return $resource('api/agendas/:agendaId/tasks/:id', {id: '@_id'},
              {
                  'update': {method: 'PUT'},
                  'get': {method: 'GET', isArray: false}
              });
    }]);
