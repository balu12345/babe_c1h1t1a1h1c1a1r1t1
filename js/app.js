angular.module('myApp', ['ngRoute',
    'ionic',

    'myApp.controllers',

    // States
    'myApp.home',
    'myApp.login',
    'myApp.profile',
    'myApp.search',
    'myApp.offers',
    'myApp.coupons',
    'myApp.userCart',
    'myApp.aboutus',
    'myApp.contactus',
    'myApp.categoryProducts',
    'myApp.productView',

    // Services
    'myApp.networkHandlerService'
])

.run(function($window, $ionicPlatform) {

    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        if ($window.plugins && $window.plugins.googleplus) {
            $window.plugins.googleplus.isAvailable(
                function (available) {
                if (available) {
                    console.log("available");
                }
            });
        }

        var deviceInformation = ionic.Platform.device();

        var isWebView = ionic.Platform.isWebView();
        var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        var isWindowsPhone = ionic.Platform.isWindowsPhone();

        var currentPlatform = ionic.Platform.platform();
        var currentPlatformVersion = ionic.Platform.version();

        // console.log(deviceInformation + " " + isWebView + " " + isAndroid + " " + currentPlatform + " " + currentPlatformVersion);

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('myApp', {
        url: '/myApp',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'appCtrl'
      })

      .state('myApp.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('myApp.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html',
            controller: 'searchCtrl'
          }
        }
      })

      .state('myApp.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
        }
      })

      .state('myApp.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
          }
        }
      })

      .state('myApp.offers', {
        url: '/offers',
        views: {
          'menuContent': {
            templateUrl: 'templates/offers.html',
            controller: 'offersCtrl'
          }
        }
      })

      .state('myApp.coupons', {
        url: '/coupons',
        views: {
          'menuContent': {
            templateUrl: 'templates/coupons.html',
            controller: 'couponsCtrl'
          }
        }
      })

      .state('myApp.userCart', {
        url: '/userCart',
        views: {
          'menuContent': {
            templateUrl: 'templates/userCart.html',
            controller: 'userCartCtrl'
          }
        }
      })

      .state('myApp.aboutus', {
        url: '/aboutus',
        views: {
          'menuContent': {
            templateUrl: 'templates/aboutus.html',
            controller: 'aboutusCtrl'
          }
        }
      })

      .state('myApp.contactus', {
        url: '/contactus',
        views: {
          'menuContent': {
            templateUrl: 'templates/contactus.html',
            controller: 'contactusCtrl'
          }
        }
      })

      .state('myApp.categoryProducts', {
            url: "/categoryProducts/:categoryID/:categoryName",
            views: {
                'menuContent' :{
                    templateUrl: "templates/categoryProducts.html",
                    controller: 'categoryProductsCtrl'
                }
            }
        })

        .state('myApp.productView', {
              url: "/productView/:product",
              views: {
                  'menuContent' :{
                      templateUrl: "templates/productView.html",
                      controller: 'productViewCtrl'
                  }
              }
          });

      $urlRouterProvider.otherwise('/myApp/home');
});
