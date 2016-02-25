angular.module('myApp.networkHandlerService', ['ngRoute'])

.service('networkHandlerService', ['$http', function ($http) {

	var oauth = OAuth({
		consumer: {
			public: 'ck_d02a4bfbe5f368dcf8b2ccbfdebb67a6d599d741',
			secret: 'cs_2215642479a45a4f5d5892eddd3fc5dccf382973'
		},
		signature_method: 'HMAC-SHA1'
	});

	// For all Product details
	// url: 'http://www.cheethakart.com/wc-api/v3/products',

	// For all categorie details
	// url: 'http://www.cheethakart.com/wc-api/v3/products/categories',

	// For a particular category details
	// url: 'http://www.cheethakart.com/wc-api/v3/products/categories/171',

	// For all coupon details
	// url: 'http://www.cheethakart.com/wc-api/v3/coupons',

	// For all customer details
	// url: 'http://www.cheethakart.com/wc-api/v3/customers',

	// Products by category
	// url: 'http://www.cheethakart.com/wc-api/v3/products?filter[category]=Laptops',

	function getReqDetails(requestUrl) {
		var request_data = {
			url: requestUrl,
			method: 'GET'
		};
		return request_data;
	}

	this.homeOfferProducts = function () {
		return $http.get('resources/productDetails.json');
	};


	this.loadCategories = function () {

		var request = getReqDetails('http://www.cheethakart.com/wc-api/v3/products/categories');

		return $.ajax({
				url: request.url,
				type: request.method,
				data: oauth.authorize(request)
			});
	};


	this.loadMoreSearchResults = function () {
		return $http.get('http://www.reddit.com/r/Android/new/.json');
	};

	this.loadCartProducts = function () {
		var request = getReqDetails('http://www.cheethakart.com/wc-api/v3/orders');

		return $.ajax({
				url: request.url,
				type: request.method,
				data: oauth.authorize(request)
			});
	};

	this.loadCategoryProducts = function (categoryName) {
		var request = getReqDetails('http://www.cheethakart.com/wc-api/v3/products?filter[category]=' + categoryName);

		return $.ajax({
				url: request.url,
				type: request.method,
				data: oauth.authorize(request)
			});
	};

	this.loadMoreProducts = function (categoryName, pageNo) {

		pageNo = pageNo/10 + 1;
		request = getReqDetails('http://www.cheethakart.com/wc-api/v3/products?filter[category]=' + categoryName + '&page=' + pageNo);

		return $.ajax({
				url: request.url,
				type: request.method,
				data: oauth.authorize(request)
			});
	};

	this.loadProductDetails = function (productID) {
		var request = getReqDetails('http://www.cheethakart.com/wc-api/v3/products/' + productID);

		return $.ajax({
				url: request.url,
				type: request.method,
				data: oauth.authorize(request)
			});
	};

	this.loadMoreCoupons = function () {
		return $http.get('resources/coupons.json');
	};

	this.loadNewCoupons = function () {
		return $http.get('resources/coupons.json');
	};

	this.loadMoreOffers = function () {
		return $http.get('resources/offers.json');
	};

	this.loadNewOffers = function () {
		return $http.get('resources/offers.json');
	};

}]);
