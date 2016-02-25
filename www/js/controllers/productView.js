angular.module('myApp.productView', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/productView/:product', {
		templateUrl: 'templates/productView.html',
		controller: 'productViewCtrl'
	});
}])

.controller('productViewCtrl', ['$scope', '$state', '$location', '$stateParams', 'networkHandlerService', '$ionicLoading', function ($scope, $state, $location, $stateParams, networkHandlerService, $ionicLoading) {

	$scope.product = [];

	$scope.loadProductDetails = function () {

		networkHandlerService.loadProductDetails($stateParams.product)
			.then(function successCallback(response) {
				$scope.product = response.product;
				$ionicLoading.hide();
			}, function errorCallback(response) {
				$ionicLoading.hide();
				console.log("Error in loadProducts : " + JSON.stringify(response));
			});

		$ionicLoading.show({
			template: '<p class="balanced">Loading Product Details...</p><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>'
		});
	};

	$scope.addToCart = function () {
		console.log("Product : " + $scope.product + " Added Successfully.");
	};
}]);
