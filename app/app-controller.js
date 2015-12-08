myApp.controller("ShellController", function ($scope) {

});

myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'home.html',
                    controller: 'ShellController'
                }).
                when('/home', {
                    templateUrl: 'home.html',
                    controller: 'ShellController'
                }).
                when('/login', {
                    templateUrl: 'login/login.html',
                    controller: 'LoginController'
                }).
                when('/signup', {
                    templateUrl: 'signup/signup.html',
                    controller: 'SignupController'
                }).
                otherwise({
                    redirectTo: 'home.html'
                });
    }]);


