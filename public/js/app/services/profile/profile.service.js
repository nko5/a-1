export default ProfileServiceFactory;

function ProfileServiceFactory($http) {

    let service =  {
        fetch: fetch
    }

    function fetch() {
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

