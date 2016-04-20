'use strict';

/**
 * @ngdoc overview
 * @name jschallengeApp
 * @description
 * # jschallengeApp
 *
 * Main module of the application.
 */
var app = angular.module('jschallengeApp', ['ngRoute','angularUtils.directives.dirPagination','ngDialog','ngMap', 'ngAnimate'])

app.config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl : 'views/home.html',
        controller : 'HomeCtrl'
    }).when('/', {
        templateUrl: 'views/main.html'
    }).when('/map', {
        templateUrl: 'views/fullMap.html',
        controller: 'MapCtrl'
    })
});
