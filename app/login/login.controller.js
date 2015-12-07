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