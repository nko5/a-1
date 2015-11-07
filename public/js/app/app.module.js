import angular from 'angular';
import loginModule from './login/login.module.js';
import agendasModule from './agendas/agendas.module.js';
import headerModule from './header/header.module.js';


angular.module('app', [
    loginModule.name,
    agendasModule.name,
    headerModule.name
]);

angular.bootstrap(document, ['app']);