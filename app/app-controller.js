myApp.controller("ShellController", function ($scope) {
//    var entries = Entry.query(function () {
//        console.log(entries);
//    }); // get() returns a single entry
//    $scope.name = "Main Page";
//    $scope.user = {};
//    $scope.save = function () {
//        if (!$scope.user.name || !$scope.user.email) {
//            return;
//        }
//
//        console.log("Subscribed user!");
//    };
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
                when('/training', {
                    templateUrl: 'training.html',
                    controller: 'ShellController'
                }).
                when('/page2', {
                    templateUrl: 'page2.html',
                    controller: 'ShellController'
                }).
                when('/page3', {
                    templateUrl: 'page3.html',
                    controller: 'ShellController'
                }).
                otherwise({
                    redirectTo: 'home.html'
                });
    }]);


