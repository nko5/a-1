import angular from 'angular';
import 'satellizer';
import headerController from './header.controller.js';
import profileModule from '../services/profile/profile.module.js';

export default angular.module('header', ['satellizer', profileModule.name])
    .controller('header.controller', headerController );
