angular.module('myApp.userCart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/userCart', {
        templateUrl: 'templates/userCart.html',
        controller: 'userCartCtrl'
    });
}])

.controller('userCartCtrl',['$scope', '$state', '$location', '$http', 'networkHandlerService', function($scope, $state, $location, $http, networkHandlerService) {

    $scope.cartItems = [];
    $scope.totalCost = 0;

    $scope.loadCartItems = function(){
        networkHandlerService.loadCartItems().then(function successCallback(response) {
            angular.forEach(response.data.items, function(item){
                $scope.cartItems.push(item);
                $scope.totalCost += item.cost * item.quantity;
            });
        }, function errorCallback(response) {
            console.log("Error in loadCartItems : " + response);
        });
    };

    $scope.removeItem = function($index){
        $scope.totalCost -= $scope.cartItems[$index].quantity * $scope.cartItems[$index].cost;
        $scope.cartItems.splice($index, 1);
    };

    $scope.increaseQuantity = function($index){
        $scope.cartItems[$index].quantity += 1;
        $scope.totalCost += $scope.cartItems[$index].cost;
    };

    $scope.decreaseQuantity = function($index){
        if ($scope.cartItems[$index].quantity > 1){
            $scope.cartItems[$index].quantity -= 1;
            $scope.totalCost -= $scope.cartItems[$index].cost;
        }
    };

    $scope.gotoItemView = function($item){
        $state.go("myApp.productView", {productID : $item.cost});
    };
}]);
