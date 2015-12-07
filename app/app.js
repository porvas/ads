'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'common.services',
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

//angular.module('MyApp')
//  .factory('Account', function($http, $auth) {
//    return {
//      getProfile: function() {
//        var payload = $auth.getPayload();
//        return $http.get('/api/users/' + payload.nameid);
//      },
//      updateProfile: function(profileData) {
//        return $http.put('/api/me', profileData);
//      }
//    };
//  });

angular.module('myApp').factory('Subcategory', function($resource) {
  return $resource('http://localhost/APIService/api/Subcategories/:id'); // Note the full endpoint address
});

angular.module('myApp').factory('User', function($resource) {
  return $resource('http://localhost/APIService/api/users/:id'); // Note the full endpoint address
});
