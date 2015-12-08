myApp.controller('SignupController', function ($scope, $location, $auth, userAccount) {
    var vm = $scope;
	
	vm.user = {
		userName: "",
		email: "",
		password: "",
		confirmPassword: ""
	};
	vm.testuser = {
		userName: "Test",
		email: "test@gmail.com",
		password: "Test123",
		confirmPassword: "Test123"
	};
	
	
	$scope.registerUser = function(){
		vm.user = vm.testuser;
		vm.user.confirmPassword = vm.user.password;
		userAccount.registerUser(vm.user,
			function(data){
				vm.user.confirmPassword="";
				vm.message="... Registration successful";
				console.log("SUCCESS: " + vm.message);
			},
			function(response){
				vm.isLoggedIn = false;
				console.log("FAILED: " + response);
//				vm.message = response.statusText + "\r\n";
//				if (response.data.exceptionMessage) {
//					vm.message += response.data.exceptionMessage;
//				}
//				if (response.data.modelState) {
//					for (var key in response.data.modelState) {
//						vm.message += response.data.modelState[key] + "\r\n";
//					}
//				}
			});
	};	
});