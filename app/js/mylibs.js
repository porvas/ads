myApp.controller("FooterController", ['$scope', function($scope) {
	$scope.footer="Company 2015";
}]);
myApp.directive('footer', function () {
	"use strict";
	
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        templateUrl: "footer/footer.html",
        controller: "FooterController"
    };
});
(function(){
    "use strict"
    
    angular
        .module("myApp")
        .controller("SearchBarController",
                ["categoryResource",
                    SearchBarController]);
                    
    function SearchBarController(categoryResource) {
        var vm=this;
        
        categoryResource.query(function(data) {
           vm.categories = data; 
           fillCategoriesDropdown();
           activateMultiSelect();
        });
        
        function activateMultiSelect() {
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
        }

        function fillCategoriesDropdown() {
            console.log(vm.categories);
            vm.categories.forEach(function(item){
               $('#catsDropdown').append("<optgroup label='"+item.name+"'>");
               var subcats = item.subcategories;
               subcats.forEach(function(subcat){
                   $('#catsDropdown').find('optGroup').last().append("<option value='"+item.id+"-"+subcat.id+"'>"+subcat.name+"</option>");
               });
            });        
        }        
    }
}());
//
//myApp.controller("SearchBarController", ['$scope', 'Category', 'Subcategory', function($scope, Category, Subcategory) {
//
//    
//
//    // Fill the categories dropdown
//    $scope.cats = Category.query(function(){
//        $scope.cats.forEach(function(item){
//           $('#catsDropdown').append("<optgroup label='"+item.Name+"'>");
//           var subcats = item.Subcategories;
//           subcats.forEach(function(subcat){
//               $('#catsDropdown').find('optGroup').last().append("<option value='"+item.Id+"-"+subcat.Id+"'>"+subcat.Name+"</option>");
//           });
//        });
//        
//        $('#catsDropdown').multiselect({
//            enableCollapsibleOptGroups:true,
//            buttonWidth:200
//        });
//        $('#locationsDropdown').multiselect({
//            buttonWidth:200,
//            includeSelectAllOption:true,
//            selectAllValue:"all",
//            selectAllName:"selectAll",
//            nonSelectedText:"Select location...",
//            selectAllText:"Select all locations"
//        });        
//    });
////    mv.subcats = Subcategory.query(function(){console.log(mv.subcats)});  
//    angular.element(document).ready(function () {
//
//
//    });
//    
//}]);

myApp.directive('searchbar', function() {
    var directive = {};

    directive.restrict = 'E';
    directive.templateUrl = "search_bar/searchbar.html";
    directive.controller= "SearchBarController";

    return directive;
});



myApp.controller("ThumbController", ['$scope', function($scope) {
	$scope.title="";
}]);
myApp.directive('adthumb', function () {
    return {
        restrict: 'E',
        templateUrl: "common/adthumb/adthumb.html",
        scope: {
            title: '@title'
        },
        controller: "ThumbController"
    };
});