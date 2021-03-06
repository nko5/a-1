export default function($scope, $location, $auth, profileService) {
    var self = this;
    this.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    this.logout = function($event) {
        $auth.logout();
        $event.preventDefault();
        $location.path('/login');
    };

    $scope.$watch('vm.isAuthenticated()', onAuthenticationChange);

    function onAuthenticationChange() {
        if ($auth.isAuthenticated()) {

            profileService.fetch().then(function(profile){
                self.userProfile = profile;
            })
        }
        else {
            self.userProfile = null;
        }
    }


}
