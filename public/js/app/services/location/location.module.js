import angular from 'angular';
import locationService from './location.service.js';

export default angular.module('locationService', [])
    .factory('locationService', locationService);
