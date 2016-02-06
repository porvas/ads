'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'myApp.services',
    'ngResource',
    'ui.bootstrap',
    'ngMessages',
    'ui.router',
    'ngAnimate',
    'ngFileUpload',
    'ngStorage'
  ]);

angular.module('myApp').factory('Subcategory', function($resource) {
  return $resource('http://localhost/APIService/api/Subcategories/:id'); // Note the full endpoint address
});

angular.module('myApp').factory('User', function($resource) {
  return $resource('http://localhost/APIService/api/users/:id'); // Note the full endpoint address
});

angular.module("myApp").run(function ($rootScope, $state, auth) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !auth.isAuthed()){
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault(); 
    }
  });
});
