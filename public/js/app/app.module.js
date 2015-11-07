import angular from 'angular';
import loginModule from './login/login.module.js';
import agendasModule from './agendas/agendas.module.js';


angular.module('app', [
    loginModule.name,
    agendasModule.name
]);
angular.bootstrap(document, ['app']);