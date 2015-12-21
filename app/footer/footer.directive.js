angular
    .module("myApp")
    .directive('footer', function () {
	"use strict";
	
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        templateUrl: "footer/footer.html",
        controller: "FooterController"
    };
});