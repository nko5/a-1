import _ from 'lodash';

export default function($location, $routeParams, $http, Task, geolocation, locationService) {
  var vm = this;

  init();

  function init() {
    let isEdit = !!$routeParams.taskId;
    if (isEdit) {
      Task.get({
        agendaId: $routeParams.agendaId,
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

    if(vm.task.type === 'running') {
      vm.task.description = `Running for ${vm.task.duration} mins`;
    }

    if(vm.task.type === 'movie') {
      vm.task.description = `Movie - ${vm.movie.name.name} at ${vm.movie.theater.name}`;
      vm.task.duration = vm.movie.name.runtime;
      vm.task.location = vm.movie.theater.address;
    }

    Model = $routeParams.taskId ? vm.task.$update(params) : vm.task.$save(params);
    Model.then(function(success) {
      $location.path('/agendas/'+ $routeParams.agendaId);
    }, function(error) {
      $location.path('/agendas/'+ $routeParams.agendaId);
    });
  };


  vm.getTheaters = function() {
      $http.get(`/api/movies?address=${vm.address}`).then(function(data) {
          vm.theaters = data.data;
      });
  };

  vm.getMovies = function() {
      return _.find(vm.theaters, {'id': vm.movie.theater.id}).movies;
  };

  vm.getShowtimes = function() {
      return _.find(vm.getMovies(), {'id': vm.movie.name.id}).showtimes;
  };

  vm.updateType = function() {
      if(vm.task.type === 'movie') {
        vm.getTheaters();
      }
  };


  function populateStartAddressFromGeolocation() {
    geolocation.getLocation().then(function(data) {
      locationService.getAddressByLatLon(data.coords.latitude,
        data.coords.longitude).then(function(data) {
          var address = _.find(data.data.results, function(locationResult) {
            return _.includes(locationResult.types, "street_address");
          }).formatted_address;
          vm.address = address;
      });
    });
  }

  populateStartAddressFromGeolocation();

}
