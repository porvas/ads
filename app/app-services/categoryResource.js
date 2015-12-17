(function(){
    "use strict"
    
    angular
        .module("myApp.services")
        .factory("categoryResource", 
                ["$resource", 
                 "appSettings", 
                 categoryResource]);
                 
    function categoryResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "api/Categories/:id");
    }
}());


