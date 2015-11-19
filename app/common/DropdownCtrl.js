angular.module('myApp.main').controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'Manage My Ads',
    'Favourites',
    'Saved Searches',
    'My Details',
    'Create Account'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});


