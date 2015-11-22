myApp.controller("SearchBarController", ['$scope', function($scope) {
    angular.element(document).ready(function () {
        $('#catsDropdown').multiselect({
            enableCollapsibleOptGroups:true,
            buttonWidth:200
        });
        $('#locationsDropdown').multiselect({
            buttonWidth:200,
            includeSelectAllOption:true,
            selectAllValue:"all",
            selectAllName:"selectAll",
            nonSelectedText:"Select location...",
            selectAllText:"Select all locations"
        });
    });
}]);
