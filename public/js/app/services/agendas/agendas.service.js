export default AgendasServiceFactory;

function AgendasServiceFactory($http, $timeout) {

    let service =  {
        fetch: fetch
    }
    let oneday = 24 * 60 * 60 * 1000;
    let now = new Date().getTime();

    var agendas = [{
        id: 1,
        date: new Date(now)
    },{
        id: 2,
        date: new Date(now + oneday)
    },{
        id: 3,
       date: new Date(now + (oneday*3))
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

