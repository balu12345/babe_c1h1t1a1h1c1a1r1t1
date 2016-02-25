angular.module('myApp.networkHandlerService', ['ngRoute'])

.service('networkHandlerService', ['$http', function($http) {
    var centralServer = "";



    this.homeOfferProducts = function() {
        console.log(" checking oAuth 1a ");

        var oauth = OAuth({
            consumer: {
                public: 'ck_d02a4bfbe5f368dcf8b2ccbfdebb67a6d599d741',
                secret: 'cs_2215642479a45a4f5d5892eddd3fc5dccf382973'
            },
            signature_method: 'HMAC-SHA1'
        });

        var request_data = {
            url: 'http://www.cheethakart.com/wc-api/v3/products',
            method: 'GET'

        };

        $.ajax({
            url: request_data.url,
            type: request_data.method,
            data: oauth.authorize(request_data)
        }).done(function(data) {
            //process your data here
            console.log(" jquery method of posting " + data);
        });


        var data = oauth.authorize(request_data)



        return $http.get('resources/productDetails.json');
    };

    this.loadMoreSearchResults = function() {
        return $http.get('http://www.reddit.com/r/Android/new/.json');
    };

    this.loadCartItems = function() {
        return $http.get('resources/cartItems.json');
    };

    this.loadProducts = function() {
        return $http.get('http://www.reddit.com/r/Android/new/.json');
    };

    this.loadMoreCoupons = function() {
        return $http.get('resources/coupons.json');
    };

    this.loadNewCoupons = function() {
        return $http.get('resources/coupons.json');
    };

    this.loadMoreOffers = function() {
        return $http.get('resources/offers.json');
    };

    this.loadNewOffers = function() {
        return $http.get('resources/offers.json');
    };

}]);
