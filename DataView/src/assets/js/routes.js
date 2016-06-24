angular.module('scid').
		config(function ($routeProvider) {
			$routeProvider
			.when('/', {templateUrl: '/views/home.html', controller: homeController})
			//====================products controllers
			//=====all products view
			.when('/products', {templateUrl: 'views/products/dashboard.html', controller: productsController})
			.when('/products/reports', {templateUrl: 'views/fixme.html', controller: productsReportsController})
			//======single product
			.when('/products/:id', {templateUrl: 'views/products/single.html', controller: productController})
			.when('/products/reports/:id', {templateUrl: 'views/fixme.html', controller: productReportsController})
			
			//===========ability to edit products coming in future
			.when('/products/edit/:id', {templateUrl: 'views/fixme.html', controller: productEditController})
			.when('/products/edit/list', {templateUrl: 'views/fixme.html', controller: productsEditListController})
			//=======================team controllers
			.when('/teams', {templateUrl: 'views/team/dashboard.html', controller: teamsController})
			.when('/teams/reports', {templateUrl: 'views/team/reports.html', controller: teamsReportsController})
			.when('/teams/:id', {templateUrl: 'views/team/single.html', controller: teamController})
			.when('/teams/reports/:id', {templateUrl: 'views/team/reports.html', controller: teamReportsController})
			//=========================scanners controllers
			.when('/qualys/', {templateUrl: 'views/scanners/qualysDashboard.html', controller: qualysController})
			.when('/qualys/all', {templateUrl: 'views/scanners/qualysReports.html', controller: qualysReportsController})
			.when('/whitehat', {templateUrl: 'views/fixme.html', controller: whitehatController})
			.when('/whitehat/all', {templateUrl: 'views/scanners/whitehatReports.html', controller: whitehatReportsController})
			.when('/teams/reports/totals', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/teams/reports/averages', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/teams/reports/qualys', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/teams/reports/whitehat', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})

			.when('/teams/reports/:id/totals', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/teams/reports/:id/averages', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/teams/reports/:id/qualys', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/teams/reports/:id/whitehat', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})

			.when('/products/reports/:id/totals', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/products/reports/:id/averages', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/products/reports/:id/whitehat', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/products/reports/:id/qualys', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})

			.when('/products/reports/totals', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/products/reports/averages', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/products/reports/qualys', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/products/reports/whitehat', {templateUrl: 'views/fixme.html', controller: changemepleaseiamverywrong})
			.when('/products/reports/whitehat', {templateUrl: 'views/fixme.html', controller: IDONOTEXISTSSSSSSS})
		});

