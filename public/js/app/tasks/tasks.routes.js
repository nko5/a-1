import EditTaskController from './editTask.controller.js';

export default function($routeProvider) {

    $routeProvider.when('/agendas/:agendaId/tasks/new', {
        templateUrl: 'js/app/agendas/editTask.html'
        controller: EditTaskController,
        controllerAs: 'vm'
    });

}
