export default ProfileServiceFactory;

function ProfileServiceFactory($http) {

    let service =  {
        getProfile: getProfile
    }

    function getProfile() {
        return $http.get('api/profile')
            .then(function(result){
                return result.data;
            })
            .catch(function(e){
                console.error('error on get profile: ' + e);
            })
    }

    return service;
}

