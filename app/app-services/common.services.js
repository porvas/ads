(function(){
    angular
        .module("myApp.services", ["ngResource"])
        .constant("appSettings", {
            serverPath: "http://localhost/RestApi/"
        })
        .constant("locations", {
            cities: ["Larnaca", "Nicosia", "Limassol", "Paphos", "Paralimni", "Ayia Napa"]
        });
}());