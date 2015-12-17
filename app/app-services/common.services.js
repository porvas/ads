(function(){
    angular
        .module("myApp.services", ["ngResource"])
        .constant("appSettings", {
            serverPath: "http://localhost/RestApi/"
        });
}());