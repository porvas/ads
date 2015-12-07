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

myApp.controller("ShellController", function ($scope) {

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
myApp.controller("HeaderController", ['$scope', '$location', '$auth', 'User', '$rootScope', 
    function($scope, $location, $auth, User, $rootScope) {
    
    $scope.name = "Guest";
    
//    $rootScope.$watch('name', function(){
//        $scope.name = "Guest";
//        if ($rootScope.name.trim() !== "") {
//            $scope.name = $rootScope.name;
//        }
//    });
//    
//    $scope.logout = function() {
//        $auth.logout()
//            .then(function () {
//                console.log('You have been logged out');
//                $rootScope.name = "Guest";
//                $location.path('/');
//        });
//    }

//    $scope.name = function() {
//        if ($scope.isAuthenticated()) {
//            var user = User.get({id: $scope.getUserId()}, function () {
//                console.log("USER: " + JSON.stringify(user));
//            }); // get() returns a single entry   
//            return user.FirstName;
//        } else {
//            return "Guest";
//        }
//    };
    
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
myApp.controller('LoginController', ['$scope', '$auth','$http','$rootScope',  function($scope, $auth,$http,$rootScope) {
    $scope.login = function() {
        var user = {
            grant_type:"password",
            username: $scope.email,
            password: $scope.password
        };    
        
        var req = {
            method: 'POST',
            url: 'http://localhost/APIService/api/oauth/token',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: "userName=" + "test@gmail.com" + "&password=" + "FirstPassword" + 
              "&grant_type=password"
        };

        $http(req).then(function(response){
            console.log("LOGGED IN: " + response.data.access_token);
            $auth.setToken(response.data.access_token);
            $rootScope.name = "Porfyrios";
        }, function(){
            console.log("ERROR");
        });         
        
//        $auth.login(user)
//          .then(function(response) {
////            toastr.success('You have successfully signed in');
//              console.log("LOGGED IN");
//              $location.path('/');
//          })
//          .catch(function(response) {
//              console.log("ERROR LOGGING IN")
////            toastr.error(response.data.message, response.status);
//          });
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
(function(){
    "use strict"
    
    angular
        .module("myApp")
        .controller("SearchBarController",
                ["categoryResource",
                    SearchBarController]);
                    
    function SearchBarController(categoryResource) {
        var vm=this;
        
        categoryResource.query(function(data) {
           vm.categories = data; 
           fillCategoriesDropdown();
           activateMultiSelect();
        });
        
        function activateMultiSelect() {
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
        }

        function fillCategoriesDropdown() {
            console.log(vm.categories);
            vm.categories.forEach(function(item){
               $('#catsDropdown').append("<optgroup label='"+item.name+"'>");
               var subcats = item.subcategories;
               subcats.forEach(function(subcat){
                   $('#catsDropdown').find('optGroup').last().append("<option value='"+item.id+"-"+subcat.id+"'>"+subcat.name+"</option>");
               });
            });        
        }        
    }
    

}());
//
//myApp.controller("SearchBarController", ['$scope', 'Category', 'Subcategory', function($scope, Category, Subcategory) {
//
//    
//
//    // Fill the categories dropdown
//    $scope.cats = Category.query(function(){
//        $scope.cats.forEach(function(item){
//           $('#catsDropdown').append("<optgroup label='"+item.Name+"'>");
//           var subcats = item.Subcategories;
//           subcats.forEach(function(subcat){
//               $('#catsDropdown').find('optGroup').last().append("<option value='"+item.Id+"-"+subcat.Id+"'>"+subcat.Name+"</option>");
//           });
//        });
//        
//        $('#catsDropdown').multiselect({
//            enableCollapsibleOptGroups:true,
//            buttonWidth:200
//        });
//        $('#locationsDropdown').multiselect({
//            buttonWidth:200,
//            includeSelectAllOption:true,
//            selectAllValue:"all",
//            selectAllName:"selectAll",
//            nonSelectedText:"Select location...",
//            selectAllText:"Select all locations"
//        });        
//    });
////    mv.subcats = Subcategory.query(function(){console.log(mv.subcats)});  
//    angular.element(document).ready(function () {
//
//
//    });
//    
//}]);

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