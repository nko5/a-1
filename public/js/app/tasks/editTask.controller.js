import _ from 'lodash';

export default function($location, $routeParams, Task, geolocation, locationService) {
  var vm = this;

  init();

  function init() {
    let isEdit = !!$routeParams.taskId;
    if (isEdit) {
      Task.get({
        id: $routeParams.taskId
      }).$promise.then(function(task) {
        vm.task = task;
      });
    } else {
      vm.task = new Task();
    }

    vm.title = isEdit ? "Change Task" : "Add Task";
    vm.cancelTo = "#/agendas/"+ $routeParams.agendaId;
    if (isEdit) {
      vm.cancelTo += '/' + $routeParams.agendaId
    }
  }

  vm.createTask = function() {
    let Model;
    let params = { agendaId: $routeParams.agendaId };
    Model = $routeParams.taskId ? vm.task.$update(parmas) : vm.task.$save(params);
    Model.then(function(success) {
      $location.path('/agendas/'+ $routeParams.agendaId);
    }, function(error) {
      $location.path('/agendas/'+ $routeParams.agendaId);
    });
  }





}
