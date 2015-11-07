import angular from 'angular';
import 'satellizer';
import headerController from './header.controller.js';

export default angular.module('header', ['satellizer'])
    .controller('header.controller', headerController );
