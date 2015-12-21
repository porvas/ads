myApp.controller("ShellController", function ($rootScope, $state, auth) {
    $rootScope.$on('unauthorized', function() {
        auth.logout();
        $state.go('login');
    });
});

myApp.config(['$stateProvider', '$urlRouterProvider', configureApp]);

function configureApp($stateProvider, $urlRouterProvider){
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "home/home.html",
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
      })
      .state("postad", {
        url: "/postad",
        templateUrl: "ad/post/postad.html",
        controller: "PostController",
        authenticate: true
      });
    // Send to login if the URL was not found
    $urlRouterProvider.otherwise("/home");
}

