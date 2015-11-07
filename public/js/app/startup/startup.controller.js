export default function($location, $auth, $timeout) {

    $timeout(redirect, 100);

    function redirect(){
        let path = "login"
        if ($auth.isAuthenticated()) {
            path = '/agendas';
        }

        $location.path(path);
    }
}
