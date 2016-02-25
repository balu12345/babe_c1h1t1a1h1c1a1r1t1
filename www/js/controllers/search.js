angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
    });
}])

.controller('searchCtrl',['$scope', '$state', '$location', 'networkHandlerService', function($scope, $state, $location, networkHandlerService) {

    $scope.searchList = [];

    $scope.loadMoreSearchResults = function(){

        networkHandlerService.loadMoreSearchResults().then(function successCallback(response) {
            angular.forEach(response.data.data.children, function(product){
                $scope.searchList.push(product.data);
            });
        }, function errorCallback(response) {
            console.log("Error in loadMoreSearchResults : " + response);
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
}]);
