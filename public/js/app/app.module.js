import angular from 'angular';
import loginModule from './login/login.module.js';

angular.module('app', [loginModule.name]);
angular.bootstrap(document, ['app']);