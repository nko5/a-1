import _ from 'lodash';

export default AgendasServiceFactory;

const MINUTE_PX = 1;

function AgendasServiceFactory($resource) {
    var service = {
        get: get,
        currentAgenda: currentAgenda,
        clearCurrentAgenda: clearCurrentAgenda
    };

    var _currentAgenda;

    //var agendaResource = $resource('api/agendas/:id', {id: '@_id'},
    //    {
    //        'update': {method: 'PUT'},
    //        'get': {method: 'GET', isArray: false}
    //    });

    var planResource = $resource('api/plan/:id', {id: '@_id'},
        {
            'get': {method: 'GET', isArray: false}
        });

    function get(id) {
        return planResource.get({id: id}).$promise.then(function(agenda) {
            return currentAgenda(decorateTasks(agenda));
        });
    }


    function currentAgenda(agenda) {
        if (agenda) {
            _currentAgenda = agenda;
        }
        return _currentAgenda;
    }

    function clearCurrentAgenda() {
        _currentAgenda = null;
    }

    function decorateTasks(agenda) {
        agenda.date = new Date(agenda.date);
        let lastTask;

        _.each(agenda.tasks, function(task){
            task.durationPx = Math.round(task.duration * MINUTE_PX);
            task.travelDurationPx = Math.round(task.travelDuration * MINUTE_PX);
            lastTask = task;
        });
        if (lastTask) {
            lastTask.endOfDay = true;
        }

        return agenda;
    }

    return service;
}
