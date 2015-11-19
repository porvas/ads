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
