angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'loginCtrl'
	});
}])

.controller('loginCtrl', ['$scope', '$state', '$ionicLoading', '$ionicActionSheet', function ($scope, $state, $ionicLoading, $ionicActionSheet) {

	$scope.loginData = {
		'username': '',
		'password': ''
	};

	$scope.emailLogin = function () {
		console.log('Doing login', $scope.loginData);
	};

	$scope.login = function (provider) {

		$ionicLoading.show({
			template: 'Logging in via Google+...'
		});

		window.plugins.googleplus.login({
				'scopes': 'profile https://www.googleapis.com/auth/contacts.readonly',
				'offline': true
			},
			function (obj) {
				alert(JSON.stringify(obj));
				$ionicLoading.hide();
			},
			function (msg) {
				alert('error: ' + msg);
				$ionicLoading.hide();
			}
		);
	};

	$scope.logout = function () {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function () {},
			buttonClicked: function (index) {
				return true;
			},
			destructiveButtonClicked: function () {
				$ionicLoading.show({
					template: 'Logging out'
				});
				// Google logout
				window.plugins.googleplus.logout(
					function (msg) {
						console.log(msg);
						alert("Logout successful " + msg);
						$ionicLoading.hide();
					},
					function (fail) {
						console.log(fail);
					}
				);
			}
		});
	};
}]);
