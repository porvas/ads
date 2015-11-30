'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'satellizer'
]).config(function($authProvider){
    $authProvider.httpInterceptor = function () {
        return true;
    },
    $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.cordova = false;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    // Facebook
    $authProvider.facebook({
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        type: '2.0',
        popupOptions: {width: 580, height: 400}
    });

    // Google
    $authProvider.google({
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0',
        popupOptions: {width: 452, height: 633}
    });
    
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

myApp.controller("ShellController", function ($scope) {
//    var entries = Entry.query(function () {
//        console.log(entries);
//    }); // get() returns a single entry
//    $scope.name = "Main Page";
//    $scope.user = {};
//    $scope.save = function () {
//        if (!$scope.user.name || !$scope.user.email) {
//            return;
//        }
//
//        console.log("Subscribed user!");
//    };
});

myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'home.html',
                    controller: 'ShellController'
                }).
                when('/home', {
                    templateUrl: 'home.html',
                    controller: 'ShellController'
                }).
                when('/login', {
                    templateUrl: 'login/login.html',
                    controller: 'LoginController'
                }).
                when('/signup', {
                    templateUrl: 'signup/signup.html',
                    controller: 'SignupController'
                }).
                when('/training', {
                    templateUrl: 'training.html',
                    controller: 'ShellController'
                }).
                when('/page2', {
                    templateUrl: 'page2.html',
                    controller: 'ShellController'
                }).
                when('/page3', {
                    templateUrl: 'page3.html',
                    controller: 'ShellController'
                }).
                otherwise({
                    redirectTo: 'home.html'
                });
    }]);



myApp.controller("FooterController", ['$scope', function($scope) {
	$scope.footer="Company 2015";
}]);
myApp.directive('footer', function () {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        templateUrl: "footer/footer.html",
        controller: "FooterController"
    }
});
myApp.controller("HeaderController", ['$scope', '$location', '$auth', function($scope, $location, $auth) {
    $scope.guest="Porfyrios";
        
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };        
}]);

myApp.directive('header', function () {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        templateUrl: "header/header.html",
        controller: "HeaderController"
    }
});
myApp.controller('LoginController', [function($scope, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('You have successfully signed in');
          $location.path('/');
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider);
          $location.path('/');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };        
}]);
myApp.controller("SearchBarController", ['$scope', function($scope) {
    angular.element(document).ready(function () {
        $('#catsDropdown').multiselect({
            enableCollapsibleOptGroups:true,
            buttonWidth:200
        });
        $('#locationsDropdown').multiselect({
            buttonWidth:200,
            includeSelectAllOption:true,
            selectAllValue:"all",
            selectAllName:"selectAll",
            nonSelectedText:"Select location...",
            selectAllText:"Select all locations"
        });
    });
}]);

myApp.directive('searchbar', function() {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "search_bar/searchbar.html";
    directive.controller= "SearchBarController";

    return directive;
});



myApp.controller("ThumbController", ['$scope', function($scope) {
	$scope.title="";
}]);
myApp.directive('adthumb', function () {
    return {
        restrict: 'E',
        templateUrl: "common/adthumb/adthumb.html",
        scope: {
            title: '@title'
        },
        controller: "ThumbController"
    };
});