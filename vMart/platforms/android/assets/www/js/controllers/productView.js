angular.module('myApp.productView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/productView/:product', {
        templateUrl: 'templates/productView.html',
        controller: 'productViewCtrl'
    });
}])

.controller('productViewCtrl',['$scope', '$state', '$location', '$stateParams', '$http', function($scope, $state, $location, $stateParams, $http) {

    $scope.loadProductDetails = function(){
        $scope.product = $stateParams.product;
    };

    $scope.addToCart = function(){
        console.log("Product : " + $scope.product + " Added Successfully.");
    };
}]);
