import angular from 'angular';
import loginModule from './login/login.module.js';
import agendasModule from './agendas/agendas.module.js';
import headerModule from './header/header.module.js';
import startupModule from './startup/startup.module.js';


angular.module('app', [
    startupModule.name,
    loginModule.name,
    agendasModule.name,
    headerModule.name
]);

angular.bootstrap(document, ['app']);