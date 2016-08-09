

$(document).ready(function() {
			$('.ui.sidebar').sidebar({
				dimPage          : false,
				transition       : 'scale down',
				mobileTransition : 'uncover'
			}).sidebar('attach events', '#MenuButton');
			$('#menu').sticky({
				context: '.pusher'
			});
			//alert('bootstrap attempt....');
		});

angular.module('ziptopia.auth', ['ngResource','ngCookies']);
angular.module('ziptopia', [ 'ziptopia.auth','ngRoute']);