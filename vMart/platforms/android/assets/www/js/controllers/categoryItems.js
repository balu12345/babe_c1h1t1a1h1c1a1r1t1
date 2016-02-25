angular.module('myApp.categoryItems', ['ngRoute', 'ionic.rating'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/categoryItems/:categoryID', {
		templateUrl: 'templates/categoryItems.html',
		controller: 'categoryItemsCtrl'
	});
}])

.controller('categoryItemsCtrl', ['$scope', '$state', '$location', '$stateParams', '$ionicModal', '$ionicTabsDelegate', 'networkHandlerService', function ($scope, $state, $location, $stateParams, $ionicModal, $ionicTabsDelegate, networkHandlerService) {

	$scope.ratingMax = 5;
	$scope.categoryProducts = [];

	$scope.loadOlderProducts = function () {

		networkHandlerService.loadProducts()
			.then(function successCallback(response) {
				angular.forEach(response.data.data.children, function (product) {
					if (product.data.thumbnail !== "self" && product.data.thumbnail !== "default") {
						$scope.categoryProducts.push(product.data);
					}
				});
				console.log("OlderProducts : $scope.categoryProducts Length : " + $scope.categoryProducts.length);
				$scope.$broadcast('scroll.infiniteScrollComplete');

			}, function errorCallback(response) {
				console.log("Error in loadMoreSearchResults : " + response);
			});

	};

	$scope.loadNewerProducts = function () {

		networkHandlerService.loadProducts()
			.then(function successCallback(response) {
				angular.forEach(response.data.data.children, function (product) {
					if (product.data.thumbnail !== "self" && product.data.thumbnail !== "default") {
						$scope.categoryProducts.push(product.data);
					}
				});
				$scope.$broadcast('scroll.refreshComplete');
				console.log("NewerProducts : $scope.categoryProducts Length : " + $scope.categoryProducts.length);
			}, function errorCallback(response) {
				console.log("Error in loadMoreSearchResults : " + response);
			});
	};

	$scope.gotoProductView = function (product) {
		$state.go('myApp.productView', {
			product: product
		});
	};

	$scope.onSubCategoryChanged = function (index) {
		console.log("Index " + index + " Products Length : " + $scope.categoryProducts.length);
	};

}]);
