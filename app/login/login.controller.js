(function(){
    "use strict"

    angular
        .module("myApp")
        .controller("LoginController",
                    ["userService", "auth", "$rootScope", "$location", LoginCtrl]);

    function LoginCtrl(userService, auth, $rootScope, $location) {
        var vm = this;
        vm.message = "";
        
        this.userlogin = {
            username: "Postman1@gmail.com",
            password: "Postman1"
        };

        auth.logout();

        this.login = function(){
            vm.userlogin.grant_type = "password";
            console.log(JSON.stringify(vm.userlogin));
            userService.login(vm.userlogin).then(
                function(data) {
                    console.log(JSON.stringify(data));
                    vm.isLoggedIn = true;
                    vm.message = "";
                    vm.password = "";

                    auth.saveToken(data.access_token);
                    vm.token=data.access_token;
                    console.log("LOGGED IN: " + JSON.stringify(auth.parseJwt(data.access_token)));
                    $rootScope.$broadcast('loginStatusChanged', vm.isLoggedIn);
                    $location.path('/');
                },
                function (response) {
                    console.log("Login Failed:", response);
                    vm.isLoggedIn = false;
                    vm.message = response.err.error_description + "\r\n";
                    vm.password = "";
//                    if (response.data.exceptionMessage) {
//                            vm.message += response.data.exceptionMessage;
//                    }
//                    if (response.data.error) {
//                            vm.message += response.data.error;
//                    }
                }
            );
        };
    }
}());