import TaskController from './task.controller.js';

export default function($routeProvider) {

    $routeProvider.when('agendas/:agendaId/tasks/new', {
        templateUrl: 'js/app/agendas/editTask.html'
        controller: TaskController,
        controllerAs: 'vm'
    });

}
