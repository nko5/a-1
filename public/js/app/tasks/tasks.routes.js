import EditTaskController from './editTask.controller.js';

export default function($routeProvider) {

  $routeProvider.when('/agendas/:agendaId/tasks/new', {
    templateUrl: 'js/app/tasks/editTask.html',
    controller: EditTaskController,
    controllerAs: 'vm'
  });

  $routeProvider.when('/agendas/:agendaId/tasks/:taskId/edit', {
    templateUrl: 'js/app/tasks/editTask.html',
    controller: EditTaskController,
    controllerAs: 'vm'
  });

}
