export default AgendasServiceFactory;

function AgendasServiceFactory($http, $timeout) {

    let service =  {
        fetch: fetch
    }
    let oneday = 24 * 60 * 60 * 1000;
    let now = new Date().getTime();

    var tasks = [{
        id: 1,
        startTime: new Date(0,0,0,9,0,0),
        description: "Task 1",
        durationHours: 1.5
    },{
        id: 2,
        startTime: new Date(0,0,0,10,30,0),
        description: "Task 1",
        durationHours: 1
    },{
        id: 3,
        startTime: new Date(0,0,0,12,0,0),
        description: "Task 1",
        durationHours: .5
    },{
        id: 4,
        startTime: new Date(0,0,0,13,0,0),
        description: "Task 1",
        durationHours: 2
    }];

    var agendas = [{
        id: 1,
        date: new Date(now),
        tasks: tasks
    },{
        id: 2,
        date: new Date(now + oneday),
        tasks, tasks
    },{
        id: 3,
        date: new Date(now + (oneday*3)),
        tasks: tasks
    }];

    function fetch(id) {
        return $timeout(function(){
            if (id) {
                for(var i=0; i<agendas.length; i++) {
                    if (id == agendas[i].id) {
                        return agendas[i];
                    }
                }
                return null;
            }
            else {
                return agendas;
            }
        }, 300);

    }

    return service;
}
