(function(){
	"use strict"
	
	angular
		.module("myApp")
		.controller("LoginController",
					["userAccount", '$auth',
						LoginCtrl]);
						
	function LoginCtrl(userAccount, $auth) {
		var vm = this;
		vm.message = "";
		vm.userlogin = {
			email: "",
			password: ""
		};
		vm.usersignup = {
			userName: "",
			email: "",
			password: "",
			confirmPassword: ""
		};
		
		vm.login = function(){
			vm.userlogin.grant_type = "password";
			
			userAccount.login.loginUser(vm.userlogin,
				function(data) {
					vm.isLoggedIn = true;
					vm.message = "";
					vm.password = "";
					$auth.setToken(data.access_token);
					vm.token=data.access_token;
					console.log("LOGGED IN: " + JSON.stringify($auth.getPayload()));
				},
				function (response) {
					vm.isLoggedIn = false;
					vm.message = response.statusText + "\r\n";
					vm.password = "";
					if (response.data.exceptionMessage) {
						vm.message += response.data.exceptionMessage;
					}
					if (response.data.error) {
						vm.message += response.data.error;
					}
				});
		};
	}
}());