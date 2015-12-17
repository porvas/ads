myApp.controller("HeaderController", ['$scope', '$location', 'auth', 'User', '$rootScope', 
    function($scope, $location, auth, User, $rootScope) {
        var vm = this;
        vm.guestName = "Guest";
        vm.name = vm.guestName;
        $rootScope.$on('loginStatusChanged', function(event, isLoggedIn){
            var payload = auth.parseJwt(auth.getToken());
            console.log("payload", payload);
            User.get({id: payload.nameid}, function (userData) {
                vm.name = userData.User.FirstName;  
            });
        });
    
        this.logout = function() {
            auth.logout();
            vm.name = vm.guestName;
        };

        this.isAuthenticated = function() {
          return auth.isAuthed();
        };  
}]);
