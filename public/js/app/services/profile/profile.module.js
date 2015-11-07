import angular from 'angular';
import profileService from './profile.service.js';

export default angular.module('profile', [])
    .factory('profileService', profileService);
