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