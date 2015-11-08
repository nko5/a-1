import angular from 'angular';
import 'angular-route';

import LocationController from './location.controller.js'

export default angular.module('location', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('/location',{
            templateUrl: 'js/app/location/location.html',
            controller: LocationController,
            controllerAs: 'vm'
        });

    });
