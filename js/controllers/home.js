angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
    });
}])

.controller('homeCtrl', ['$scope', '$state', '$location', '$ionicSlideBoxDelegate', 'networkHandlerService', '$ionicLoading', function($scope, $state, $location, $ionicSlideBoxDelegate, networkHandlerService, $ionicLoading) {

    $scope.slideProducts = [];

    $scope.categories = [];

    var count = 0;



    $scope.loadProducts = function() {
        console.log(" in $scope.loadProducts ");

        networkHandlerService.homeOfferProducts()
            .then(function successCallback(response) {
                // $scope.slideProducts = response.data;




                response.data.productImageURLs.forEach(function(entry) {
                    console.log(" entry :" + entry);

                    var img = {
                        imgSrc: entry,
                        name: "someName"
                    };
                    $scope.slideProducts.push(img);

                });


                console.log(" $scope.slideProducts " + JSON.stringify($scope.slideProducts));





                if (count == 1) {
                    $ionicLoading.hide();
                    count = 0;
                }
                count = 1;
            }, function errorCallback(response) {
                console.log("Error in handleHomeOfferProducts : " + response);
            });
        networkHandlerService.loadCategories()
            .then(function successCallback(response) {
                angular.forEach(response.product_categories, function(category) {
                    $scope.categories.push(category);
                    if (count == 1) {
                        $ionicLoading.hide();
                        count = 0;
                    }
                    count = 1;
                });
            }, function errorCallback(response) {
                $ionicLoading.hide();
                console.log("Error in loadCategories : " + response);
            });
        $ionicLoading.show({
            template: '<p class="balanced">Loading Please wait...</p><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>'
        });
    };

    $scope.clickedItem = function($index) {
        console.log($index);
    };

    $scope.exploreCategory = function(category) {
        $state.go('myApp.categoryProducts', {
            categoryName: category.name,
            categoryID: category.id
        });
    };

    $scope.gotoSearchPage = function() {
        $state.go('myApp.search');
    };
}]);
