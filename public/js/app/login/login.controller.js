export default function($location, $auth) {

  this.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(){
      goToAgendas();
    });
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
