'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'satellizer'
]).config(function($authProvider){
    
    $authProvider.facebook({
      clientId: 'Facebook App ID'
    });

    $authProvider.google({
      clientId: 'Google Client ID'
    });
    
    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }    
});
//
//angular.module('myApp').factory('Entry', function($resource) {
//  return $resource('http://localhost:8282/api/Categories/:id'); // Note the full endpoint address
//});

//angular.module('myApp').controller('ResourceController',function($scope, Entry) {
//  var entry = Entry.get({ id: $scope.id }, function() {
//    console.log(entry);
//  }); // get() returns a single entry
//
//  var entries = Entry.query(function() {
//    console.log(entries);
//  }); //query() returns all the entries
//
//  $scope.entry = new Entry(); //You can instantiate resource class
//
//  $scope.entry.data = 'some data';
//
//  Entry.save($scope.entry, function() {
//    //data saved. do something here.
//  }); //saves an entry. Assuming $scope.entry is the Entry object  
//});
