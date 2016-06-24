

$(document).ready(function() {
			$('.ui.sidebar').sidebar({
				dimPage          : false,
				transition       : 'scale down',
				mobileTransition : 'uncover'
			}).sidebar('attach events', '.menu .item');
			$('#menu').sticky({
				context: '.pusher'
			});
			//alert('bootstrap attempt....');
		});


angular.module('ziptopia', [ 'ngRoute']).config(function ($routeProvider) {
			$routeProvider
			.when('/', {templateUrl: '/views/home.html', controller: homeController});
		});


function homeController(){
	
}