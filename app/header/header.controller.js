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
