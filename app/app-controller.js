myApp.controller("ShellController", function ($scope) {

});

myApp.config(['$stateProvider', '$urlRouterProvider', configureApp]);

function configureApp($stateProvider, $urlRouterProvider){
    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "home.html",
        controller: "ShellController",
        authenticate: false
      })
      .state("login", {
        url: "/login",
        templateUrl: "login/login.html",
        controller: "LoginController as vm",
        authenticate: false
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "signup/signup.html",
        controller: "SignupController",
        authenticate: false
      });
    // Send to login if the URL was not found
    $urlRouterProvider.otherwise("/home");
}

