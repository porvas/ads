angular
    .module('myApp')
    .controller('PostController', ['$scope', function($scope) {
	$scope.footer="Company 2015";
}]);

////(function(){
//    "use strict";
//
//    angular.module("myApp")
//           .controller('PostAdController', 
//                        PostAdController);
//
//    function PostAdController($scope) {
//        var vm = $scope;
//        vm.ad = {};
//
//        $scope.submit = function() {
//            console.log("Submitting form!", vm);
//        };
//    };
//}());