export default function($location, profileService) {
    var vm = this;

    init();

    function init() {
      profileService.fetch().then(function(profile){
          vm.agendas = profile.agendas;
      });
    }

    vm.goToAgenda =  getToAgenda;

    function getToAgenda(agenda, $event) {
        $location.path('/agendas/'+agenda._id);
        $event.preventDefault();
    }
}
