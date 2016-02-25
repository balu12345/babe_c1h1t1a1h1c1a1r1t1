angular.module('myApp.contactus', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contactus', {
        templateUrl: 'templates/contactus.html',
        controller: 'contactusCtrl'
    });
}])

.controller('contactusCtrl',['$scope', '$state', '$location', function($scope, $state, $location) {
}]);
