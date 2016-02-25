angular.module('myApp.offers', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/offers', {
		templateUrl: 'templates/offers.html',
		controller: 'offersCtrl'
	});
}])

.controller('offersCtrl', ['$scope', '$state', '$location', '$http', '$ionicLoading', 'networkHandlerService', function ($scope, $state, $location, $http, $ionicLoading, networkHandlerService) {

	$scope.offersList = [];

	$scope.loadMoreOffers = function () {
		networkHandlerService.loadMoreOffers()
			.then(function successCallback(response) {
				$scope.offersList = $scope.offersList.concat(response.data.offers);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, function errorCallback(response) {
				console.log("Error in loadMoreOffers : " + response);
			});
	};

	$scope.loadNewOffers = function () {
		networkHandlerService.loadNewOffers()
			.then(function successCallback(response) {
				$scope.offersList = response.data.offers.concat($scope.offersList);
				$scope.$broadcast('scroll.refreshComplete');
			}, function errorCallback(response) {
				console.log("Error in loadNewOffers : " + response);
			});
	};

}]);
