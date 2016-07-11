angular.module('ziptopia').config(function ($routeProvider) {
			$routeProvider
			.when('/', {templateUrl: '/views/home.html', controller: homeController});
		});