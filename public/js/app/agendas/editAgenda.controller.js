export default function($location, $http, agenda, geolocation, locationService) {
    var vm = this;

    vm.agenda = agenda;

    vm.createTask = createTask;

    geolocation.getLocation().then(function(data){
      vm.currentCoordinates = {lat:data.coords.latitude, long:data.coords.longitude};
      locationService.getAddressByLatLon(vm.currentCoordinates.lat,
      vm.currentCoordinates.long).then(function(data) {
        console.log(data);
      });
    });

    function createTask($event) {
        $event.preventDefault();
        $location.path('/agendas/' + agenda.id + '/task');
    }
}
