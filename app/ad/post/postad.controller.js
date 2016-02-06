(function () {
    "use strict";

    angular.module("myApp")
            .controller('PostAdController',
                    PostAdController);

    function PostAdController($scope, $state, categoryResource, locations, $uibModal, $localStorage) {

        categoryResource.query(function (data) {
            $scope.categories = data;
            console.log("data:", data);
        });

        $scope.locations = locations.cities;
        locations.cities.forEach(function (loc, index) {
            $scope.locations[index] = {};
            $scope.locations[index].id = index + 1;
            $scope.locations[index].name = loc;
        });

        console.log("locations:", $scope.locations);

        $scope.catSelected = function () {
            var categoryId = $scope.ad.category;
            console.log("Catselected: ", categoryId);
            $scope.subcats = $scope.categories[categoryId - 1].subcategories;
        };

        $scope.images = [];
        $scope.addImage = function (file, errFiles) {
            console.log("File: ", file);
            console.log("errFile: ", errFiles);
            if (file !== null) {
                $scope.images.push(file);
                $scope.errFile = null;
            } else if (errFiles.length > 0) {
                $scope.errFile = errFiles[0];
                console.log("$scope.errFile: ", $scope.errFile);
            }
        };

        $scope.removeImage = function (index) {
            console.log("removeImage: ", index);
            if (index >= 0) {
                $scope.errFile = null;
                $scope.images.splice(index, 1);
            }
        };

        $scope.openModal = function (index) {
            var uibModalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'ad/post/modalImage.html',
                controller: function ($scope, $uibModalInstance, image) {
                    $scope.image = image;
                },
                size: 'lg',
                resolve: {
                    image: function () {
                        return $scope.images[index];
                    }
                }
            });
        };

        var localSavedAd = $localStorage.postFormAd;
        console.log("localSavedAd:", localSavedAd);
        if (localSavedAd !== null) {
            $scope.ad = localSavedAd;
        } else {
            $scope.ad = {};
            $scope.ad.step1_done = false;
            $scope.ad.step2_done = false;
            $scope.ad.step3_done = false;
            $scope.ad.step4_done = false;
            $scope.ad.step5_done = false;
        }

        // we will store all of our form data in this object


        // function to process the form
        $scope.processForm = function () {
            alert('awesome!');
        };

        $scope.next = function (step, form) {
            if (form.$invalid) {
                $scope.message = "Invalid form";
                return;
            }

            switch (step) {
                case 1:
                    $scope.ad.step1_done = true;
                    $state.go("postad.location");
                    break;
                case 2:
                    $scope.ad.step2_done = true;
                    $state.go("postad.description");
                    break;
                case 3:
                    $scope.ad.step3_done = true;
                    $state.go("postad.price");
                    break;
                case 4:
                    $scope.ad.step4_done = true;
                    $state.go("postad.images");
                    break;
                case 5:
                    $scope.ad.step5_done = true;
                    $state.go("postad.submit");
                    break;
                default:
                    $state.go("postad.category");
            }

            $localStorage.postFormAd = $scope.ad;
            console.log("Saving scope..:", $localStorage.postFormAd);
        };
    }
    ;
}());