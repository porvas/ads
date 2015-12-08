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
