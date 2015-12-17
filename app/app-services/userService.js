(function () {
    "use strict"

    angular
        .module("myApp.services")
        .factory("userService",
                ['$http', '$q', "appSettings", userService]);

    function userService($http, $q, appSettings) {
        var service = {
            register : registerUser,
            login : loginUser
        };
        return service;
        
        function registerUser(userData) {
            var accountUrl = appSettings.serverPath + "/api/Account/Register";
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: accountUrl,
                data: userData
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject({err:err, status:status});
            });
            return deferred.promise;
        }
        
        function loginUser(userData) {
            var tokenUrl = appSettings.serverPath + "oauth/token";
            if (!userData.grant_type) {
                userData.grant_type = "password";
            }
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: tokenUrl,
                data: userData
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject({err:err, status:status});
            });
            return deferred.promise;
        }
    }
}());