angular.module('myApp.aboutus', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/aboutus', {
        templateUrl: 'templates/aboutus.html',
        controller: 'aboutusCtrl'
    });
}])

.controller('aboutusCtrl',['$scope', '$state', '$location', function($scope, $state, $location) {
}]);
