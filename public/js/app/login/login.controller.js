export default function($location, $auth) {

  this.authenticate = function(provider) {
    $auth.authenticate(provider);
  };


}
