export default function($location, $auth) {

  this.authenticate = function(provider, $event) {
    $auth.authenticate(provider).then(function(){
      goToAgendas();
    });
    $event.preventDefault();
  };

  this.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  if ($auth.isAuthenticated()) {
    goToAgendas();
  }


  function goToAgendas() {
    $location.path('/agendas');
  }

}
