angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
    });
}])

.controller('profileCtrl',['$scope', '$state', '$location', function($scope, $state, $location) {
    $scope.name = "Meghan Fox";
}]);
