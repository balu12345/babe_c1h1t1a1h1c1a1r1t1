angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl'
	});
}])

.controller('homeCtrl', ['$scope', '$state', '$location', '$ionicSlideBoxDelegate', 'networkHandlerService', function ($scope, $state, $location, $ionicSlideBoxDelegate, networkHandlerService) {

	$scope.images = [];
	$scope.slideProducts = [];

	networkHandlerService.homeOfferProducts()
		.then(function successCallback(response) {
			$scope.slideProducts = response.data;
		}, function errorCallback(response) {
			console.log("Error in handleHomeOfferProducts : " + response);
		});


	$scope.clickedItem = function ($index) {
		console.log($index);
	};

	$scope.loadCategories = function () {
		for (var i = 0; i < 5; i++) {
			$scope.images.push({
				id: i,
				src: "img/img.png"
			});
		}
	};

	$scope.exploreCategory = function (categoryID) {
		$state.go('myApp.categoryItems', {
			categoryID: categoryID
		});
	};

	$scope.gotoSearchPage = function () {
		$state.go('myApp.search');
	};
}]);
