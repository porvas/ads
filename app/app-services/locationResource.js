(function(){
    "use strict"
    
    angular
        .module("myApp.services")
        .factory("locationResource", 
                ["$resource", 
                 "appSettings", 
                 locationResource]);
                 
    function locationResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "api/Locations/:id");
    }
}());


