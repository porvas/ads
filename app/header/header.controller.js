myApp.controller("HeaderController", ['$scope', '$location', '$auth', function($scope, $location, $auth) {
    $scope.guest="Porfyrios";
        
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };        
}]);
