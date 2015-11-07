export default function($location, $auth) {

  this.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

  this.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  this.logout = $auth.logout;

}
