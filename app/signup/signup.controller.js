(function(){
    "use strict";

    angular.module("myApp")
           .controller('SignupController', 
                        SignupController);

    function SignupController($scope, $location, auth, userService) {
        var vm = $scope;
//        vm.user = {
//                "FirstName": "Test4",
//                "LastName": "Test4",
//                "Email": "test4@gmail.com",
//                "Password": "Test1234",
//                "ConfirmPassword": "Test1234"
//        };
        vm.user = {
                "LastName": "",
                "Email": "",
                "Password": "",
                "ConfirmPassword": ""
        };

        $scope.registerUser = function() {
            userAccount.register(vm.user).then(function (data) {
                vm.isRegistered = true;
                console.log("REGISTERED: " + JSON.stringify(data));
            }, function (response) {
                vm.isRegistered = false;
                console.log("Registration failed:", response);
                $location = '#home';
                vm.message = response.err.error_description + "\r\n";
//                if (error && error.data && error.data.exceptionMessage) {
//                    vm.message += error.data.exceptionMessage;
//                }
//                if (error && error.data && error.data.modelState) {
//                    for (var key in error.data.modelState) {
//                            vm.message += error.data.modelState[key] + "\r\n";
//                    }
//                }
            });         
        };
    };
}());