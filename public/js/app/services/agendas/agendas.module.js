import angular from 'angular';
import agendasService from './agendas.service.js';

export default angular.module('agendasService', [])
    .factory('AgendaService', agendasService);
