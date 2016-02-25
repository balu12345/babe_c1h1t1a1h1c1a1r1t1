angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
    });
}])

.controller('homeCtrl', ['$scope', '$state', '$location', '$ionicSlideBoxDelegate', 'networkHandlerService', '$ionicLoading', '$timeout', function($scope, $state, $location, $ionicSlideBoxDelegate, networkHandlerService, $ionicLoading, $timeout) {

    $scope.slideProducts = [];

    $scope.categories = [];

    var count = 0;
    var totalSlideProductsCount = 0;


    $scope.animateSwipeCard = {};


    $scope.onSwipeLeft = function() {
        console.log(" $scope.onSwipeLeft = function(){");
        // $scope.animateSwipeCard.class = bounceInRight;
        $scope.animateSwipeCard.class = "bounceOutLeft";
    }


    $scope.onRelease = function() {

        $timeout(function() {

            $scope.animateSwipeCard.class = "bounceInRight";
            $scope.animateSwipeCard.currentImg = $scope.slideProducts[count].imgSrc;

            count = (count + 1) % totalSlideProductsCount;
            console.log(" count " + count)

        }, 400);


    }

    $scope.onSwipeRight = function() {

        console.log(" $scope.onSwipeRight = function(){");
        count--;



        /*count = (count-1)%totalSlideProductsCount;*/



        console.log(" count " + count)

        console.log(" $scope.onSwipeRight = function(){");
        // $scope.animateSwipeCard.class = bounceInRight;
        $scope.animateSwipeCard.class = "bounceOutRight";

        $timeout(function() {

            $scope.animateSwipeCard.class = "bounceInLeft";
            $scope.animateSwipeCard.currentImg = $scope.slideProducts[count].imgSrc;


        }, 500);

    }






    $scope.loadProducts = function() {
        console.log(" in $scope.loadProducts ");

        networkHandlerService.homeOfferProducts()
            .then(function successCallback(response) {
                // $scope.slideProducts = response.data;



                totalSlideProductsCount = response.data.productImageURLs.length;

                response.data.productImageURLs.forEach(function(entry) {
                    console.log(" entry :" + entry);

                    var img = {
                        imgSrc: entry,
                        name: "someName"
                    };
                    $scope.slideProducts.push(img);



                });


                console.log(" $scope.slideProducts " + JSON.stringify($scope.slideProducts));

                $scope.animateSwipeCard.class = "bounceInRight";
                $scope.animateSwipeCard.currentImg = $scope.slideProducts[count].imgSrc;







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
