'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'myApp.services',
    'ngResource',
    'ui.bootstrap',
    'ngMessages',
    'ui.router'
  ])
.factory('authInterceptor', authInterceptor)
.config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
    
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];    
});

function authInterceptor(appSettings, auth) {
  return {
    // automatically attach Authorization header
    request: function(config) {
        var token = auth.getToken();
        if(config.url.indexOf(appSettings.serverPath) === 0 && token) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    },

    // If a token was sent back, save it
    response: function(res) {
        console.log("Response from interceptor: ", res);
        if(res.config.url.indexOf(appSettings.serverPath) === 0 && res.data.token) {
          auth.saveToken(res.data.token);
        }

        return res;
    }
  };
}

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
