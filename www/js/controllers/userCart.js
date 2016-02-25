angular.module('myApp.userCart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/userCart', {
        templateUrl: 'templates/userCart.html',
        controller: 'userCartCtrl'
    });
}])

.controller('userCartCtrl',['$scope', '$state', '$location', 'networkHandlerService', '$ionicLoading', function($scope, $state, $location, networkHandlerService, $ionicLoading) {

    $scope.cartProducts = [];
    $scope.totalCost = 0;

    $scope.loadCartProducts = function(){

        networkHandlerService.loadCartProducts().then(function successCallback(response) {
            $scope.cartProducts = response.orders;
            $ionicLoading.hide();
            console.log(JSON.stringify($scope.cartProducts[0]));
        }, function errorCallback(response) {
            $ionicLoading.hide();
            console.log("Error in loadcartProducts : " + JSON.stringify(response));
        });

        $ionicLoading.show({
            template: '<p class="balanced">Loading Cart Products...</p><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>'
        });
    };

    $scope.removeProduct = function($index){
        $scope.totalCost -= $scope.cartProducts[$index].quantity * $scope.cartProducts[$index].cost;
        $scope.cartProducts.splice($index, 1);
    };

    $scope.increaseQuantity = function($index){
        $scope.cartProducts[$index].quantity += 1;
        $scope.totalCost += $scope.cartProducts[$index].cost;
    };

    $scope.decreaseQuantity = function($index){
        if ($scope.cartProducts[$index].quantity > 1){
            $scope.cartProducts[$index].quantity -= 1;
            $scope.totalCost -= $scope.cartProducts[$index].cost;
        }
    };

    $scope.gotoProductView = function($item){
        $state.go("myApp.productView", {productID : $item.cost});
    };
}]);
