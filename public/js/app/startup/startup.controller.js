export default function($location, $auth, $timeout) {

    $timeout(redirect, 100);

    function redirect(){
        let path =  $auth.isAuthenticated() ? "/agendas": "/login";
        $location.path(path);
    }
}
