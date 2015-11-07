export default function($scope, $location, $auth) {

    this.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    this.logout = function($event) {
        $auth.logout();
        $event.preventDefault();
        $location.path('/');
    };

    $scope.$watch('vm.isAuthenticated()', onAuthenticationChange);

    function onAuthenticationChange() {
        if ($auth.isAuthenticated()) {
            console.log("get the user object");
        }
        else {
            console.log("clear the user object");
        }
    }


}
