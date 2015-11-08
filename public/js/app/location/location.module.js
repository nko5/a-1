import angular from 'angular';
import 'angular-route';
import 'angular-google-maps';
import 'npm:angular-simple-logger@0.0.4';
import _ from 'lodash';

//import routeConfig from './login.routes.js';
//import LocationController from './location.module.js'

export default angular.module('location', ['ngRoute', 'uiGmapgoogle-maps'])
    .config(function($routeProvider){
        $routeProvider.when('/location',{
            templateUrl: 'js/app/location/location.html'
            //controller: LoginController,
            //controllerAs: 'vm'
        });

    })
    .config(function(uiGmapGoogleMapApiProvider) {
        window._ = _;
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDXwlZHplzzKptXymKwLO4NgEZcpaezHlo',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'places' // Required for SearchBox.
        });
    });
