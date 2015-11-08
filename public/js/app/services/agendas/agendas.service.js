import _ from 'lodash';

export default AgendasServiceFactory;

const MINUTE_PX = 1;

function AgendasServiceFactory($resource) {
    var service = {
        get: get
    };

    var resource = $resource('api/agendas/:id', {id: '@_id'},
        {
            'update': {method: 'PUT'},
            'get': {method: 'GET', isArray: false}
        });

    function get(id) {
        return resource.get({id: id}).$promise.then(function(agenda) {
            return decorateTasks(agenda);
        });
    }

    function decorateTasks(agenda) {
        agenda.date = new Date(agenda.date);

        _.each(agenda.tasks, function(task){
            task.durationPx = Math.round((task.duration || 30) * MINUTE_PX);
            task.traveleDurationPx = Math.round((task.travelDuration || 30) * MINUTE_PX);
        });

        return agenda;
    }

    return service;
}
