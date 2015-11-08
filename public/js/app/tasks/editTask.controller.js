import _ from 'lodash';

export default function($location, $routeParams, $http, Task, geolocation, locationService, AgendaService) {
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
    let agenda = AgendaService.currentAgenda();
    let lastTask = agenda && agenda.tasks && agenda.tasks.length && agenda.tasks[agenda.tasks.length-1] || {}
    let params = { agendaId: $routeParams.agendaId };

    if(vm.task.type === 'running') {
      vm.task.description = `Running for ${vm.task.duration} mins`;
    }

    if(vm.task.type === 'movie') {
      vm.task.description = `Movie - ${vm.movie.name.name} at ${vm.movie.theater.name}`;
      let runtime = moment(vm.movie.name.runtime, 'HH mm');
      vm.task.duration = moment.duration(runtime).asMinutes();
      vm.task.location = vm.movie.theater.address;
    }

    if (!$routeParams.taskId) {
      vm.task.sequenceNumber = lastTask && lastTask.hasOwnProperty(sequenceNumber) ? lastTask.sequenceNumber + 1 : 0;
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
      if(vm.task.type === 'glocery') {
        vm.getPlaces('grocery_or_supermarket');
      }
  };

  $scope.$watch('vm.place', function(current, original) {
    if(current) {
      let body = {
        parameters: {
          reference: current.reference
        }
      };
      $http.post('/api/placeDetails', body).then(function(data) {
          vm.placeDetails = data.data.result;
      });
    }
  });


  vm.getPlaces = function(types) {
    if(vm.coords) {
      let body = {
        parameters: {
          location: [vm.coords.latitude, vm.coords.longitude],
          types: types,
          radius: 30000
        }
      };
      $http.post('/api/places', body).then(function(data) {
          vm.places = data.data.results;
      });
    }
  };

  vm.getStartTimes = function() {
    let startTimes = {};
    let displayTime;
    let isoTime;
    _.times(12, function(time) {
      displayTime = time+':'+'00 AM';
      isoTime = moment(displayTime, 'HH:mm a').toISOString();
      startTimes[isoTime] = displayTime;
      displayTime = time+':'+'30 AM';
      isoTime = moment(displayTime, 'HH:mm a').toISOString();
      startTimes[isoTime] = displayTime;
    });
    _.times(12, function(time) {
      displayTime = time+':'+'00 PM';
      isoTime = moment(displayTime, 'HH:mm a').toISOString();
      startTimes[isoTime] = displayTime;
      displayTime = time+':'+'30 PM';
      isoTime = moment(displayTime, 'HH:mm a').toISOString();
      startTimes[isoTime] = displayTime;
    });
    return startTimes;
  };

  function populateStartAddressFromGeolocation() {
    geolocation.getLocation().then(function(data) {
      vm.coords = data.coords;
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
