angular.module('myApp.coupons', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/coupons', {
		templateUrl: 'templates/coupons.html',
		controller: 'couponsCtrl'
	});
}])

.controller('couponsCtrl', ['$scope', '$state', '$location', '$http', '$ionicLoading', 'networkHandlerService', function ($scope, $state, $location, $http, $ionicLoading, networkHandlerService) {

	$scope.couponsList = [];

	$scope.loadMoreCoupons = function () {
		networkHandlerService.loadMoreCoupons()
			.then(function successCallback(response) {
				$scope.couponsList = $scope.couponsList.concat(response.data.coupons);
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}, function errorCallback(response) {
				console.log("Error in loadMoreCoupons : " + response);
			});
	};

	$scope.loadNewCoupons = function () {
		networkHandlerService.loadNewCoupons()
			.then(function successCallback(response) {
				$scope.couponsList = response.data.coupons.concat($scope.couponsList);
				$scope.$broadcast('scroll.refreshComplete');
			}, function errorCallback(response) {
				console.log("Error in loadNewCoupons : " + response);
			});
	};

}]);
