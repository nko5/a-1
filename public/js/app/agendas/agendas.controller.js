export default function($location, $route, profileService, Agenda) {
  var vm = this;

  init();

  function init() {
    profileService.fetch().then(function(profile) {
      vm.agendas = profile.agendas;
    });
  }

  vm.goToAgenda = function(agenda, $event) {
    $event.preventDefault();
    $location.path('/agendas/' + agenda._id);
  }

  vm.removeAgenda = function(agenda, $event) {
    $event.preventDefault();
    Agenda.remove({ id: agenda._id }).$promise.then(function() {
      $route.reload();
    });
  }

}
