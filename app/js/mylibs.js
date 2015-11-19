'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap'
]);

myApp.controller("ShellController", ['$scope', function ($scope) {
        $scope.name = "Main Page";
        $scope.user = {};
        $scope.save = function () {
            if (!$scope.user.name || !$scope.user.email) {
                return;
            }

            console.log("Subscribed user!");
        };
    }]);

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
myApp.controller("HeaderController", ['$scope', '$location', function($scope, $location) {
	$scope.header="I am the header";
	$scope.guest="Guest";
    $scope.isActive = function(path){
      var currentPath = $location.path().split('/')[1];
      if (currentPath.indexOf('?') !== -1) {
        currentPath = currentPath.split('?')[0];
      }
      return currentPath === path.split('/')[1];
    };
}]);

myApp.directive('header', function () {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        templateUrl: "header/header.html",
        controller: "HeaderController"
    }
});



myApp.controller('LoginController', [function() {

}]);