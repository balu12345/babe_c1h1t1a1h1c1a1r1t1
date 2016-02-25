angular.module('myApp.productView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/productView/:product', {
        templateUrl: 'templates/productView.html',
        controller: 'productViewCtrl'
    });
}])

.controller('productViewCtrl', ['$scope', '$state', '$location', '$stateParams', 'networkHandlerService', '$ionicLoading', '$timeout',function($scope, $state, $location, $stateParams, networkHandlerService, $ionicLoading,$timeout) {

    $scope.product = [];
    var count = 0;
    var totalSlideProductsCount  = 0;



    $scope.animateSwipeCard = {};


    $scope.onSwipeLeft = function() {
        console.log(" $scope.onSwipeLeft = function(){");
        // $scope.animateSwipeCard.class = bounceInRight;
        $scope.animateSwipeCard.class = "bounceOutLeft";
    }


    $scope.onRelease = function() {

        $timeout(function() {

            $scope.animateSwipeCard.class = "bounceInRight";
            $scope.animateSwipeCard.currentImg = $scope.product.images[count].src;

            count = (count + 1) % totalSlideProductsCount;
            console.log(" count " + count)

        }, 400);


    }




    $scope.loadProductDetails = function() {

        networkHandlerService.loadProductDetails($stateParams.product)
            .then(function successCallback(response) {
                $scope.product = response.product;
                console.log(" $scope.product " + JSON.stringify($scope.product))

                if ($scope.product.images.length > 0) {
                    $scope.animateSwipeCard.currentImg = $scope.product.images[0].src;
                    totalSlideProductsCount = $scope.product.images.length;
                }



                $scope.product.images.forEach(function(entry) {
                    console.log(" entry :" + entry.src);

                    var img = {
                        imgSrc: entry,
                        name: "someName"
                    };
                    // $scope.slideProducts.push(img);



                });


                $ionicLoading.hide();

            }, function errorCallback(response) {
                $ionicLoading.hide();
                console.log("Error in loadProducts : " + JSON.stringify(response));
            });

        $ionicLoading.show({
            template: '<p class="balanced">Loading Product Details...</p><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>'
        });
    };

    $scope.addToCart = function() {
        console.log("Product : " + $scope.product + " Added Successfully.");
    };
}]);
