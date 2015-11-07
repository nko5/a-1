export default function($location, $http, agenda, geolocation, locationService) {
    var vm = this;

    vm.agenda = agenda;

    vm.createTask = createTask;

    geolocation.getLocation().then(function(data){
      vm.currentCoordinates = {lat:data.coords.latitude, long:data.coords.longitude};
      console.log(vm.currentCoordinates);
    });

    function createTask($event) {
        $event.preventDefault();
        $location.path('/agendas/' + agenda.id + '/task');
    }
}
