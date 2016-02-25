angular.module('myApp.categoryProducts', ['ngRoute', 'ionic.rating'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/categoryProducts/:categoryID/:categoryName', {
		templateUrl: 'templates/categoryProducts.html',
		controller: 'categoryProductsCtrl'
	});
}])

.controller('categoryProductsCtrl', ['$scope', '$state', '$location', '$stateParams', '$ionicModal', '$ionicTabsDelegate', 'networkHandlerService', '$ionicLoading', function ($scope, $state, $location, $stateParams, $ionicModal, $ionicTabsDelegate, networkHandlerService, $ionicLoading) {

	$scope.ratingMax = 5;
	$scope.categoryProducts = [];
	$scope.hasMoreProducts = false;

	$scope.loadCategoryProducts = function(){

		networkHandlerService.loadCategoryProducts($stateParams.categoryName)
			.then(function successCallback(response) {
				if (response.products.length === 0){
					$scope.hasMoreProducts = false;
				}else{
					$scope.categoryProducts = response.products;
				}
				$scope.hasMoreProducts = true;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, function errorCallback(response) {
				$scope.hasMoreProducts = true;
				$ionicLoading.hide();
				console.log("Error in loadProducts : " + JSON.stringify(response));
			});

		$ionicLoading.show({
			template: '<p class="balanced">Loading Please wait...</p><ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>'
		});
	};

	$scope.loadMoreProducts = function () {
		networkHandlerService.loadMoreProducts($stateParams.categoryName, $scope.categoryProducts.length)
			.then(function successCallback(response) {
				if (response.products.length === 0){
					console.log("Stopping Infinite Scroll. Because No Products Available More than these.");
					$scope.hasMoreProducts = false;
				}
				else if(response.products.Length < 10){
					console.log("No More Products to Load... Products Length : " + $scope.categoryProducts.length);
					$scope.hasMoreProducts = false;
				}
				else{
					$scope.categoryProducts = $scope.categoryProducts.concat(response.products);
				}
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, function errorCallback(response) {
				console.log("Error in loadProducts : " + JSON.stringify(response));
			});
	};

	$scope.gotoProductView = function (product) {
		$state.go('myApp.productView', {
			product: product.id
		});
	};

	$scope.onSubCategoryChanged = function (index) {
		console.log("Index " + index + " Products Length : " + $scope.categoryProducts.length);
	};

}]);
