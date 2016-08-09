

$(document).ready(function () {
	$('.ui.sidebar').sidebar({
		dimPage: false,
		transition: 'scale down',
		mobileTransition: 'uncover'
	}).sidebar('attach events', '.menu .item');
	$('#menu').sticky({
		context: '.pusher'
	});
	//alert('bootstrap attempt....');
});

angular.module('ziptopia.auth', []);
angular.module('ziptopia', ['ziptopia.auth', 'ngRoute', 'ngResource']);
angular.module('ziptopia').config(function ($routeProvider) {
			$routeProvider.when('/', { templateUrl: '/views/home.html', controller: homeController }).when('/login', { templateUrl: '/views/login.html', controller: loginController });
});

//there is so much DI going on here.... need to figure out of this is bad and if it can be cleaned up
function homeController($scope, AuthCheck) {
	AuthCheck.forceAuth();
	//logged in and all is well
	$scope.fullName = AuthCheck.getFullName();
}


//there is so much DI going on here.... need to figure out of this is bad and if it can be cleaned up
function loginController($scope, AuthCheck, AuthResource, $location) {
	//for Auth
	$scope.auth = new AuthResource();
	//no errors yet, just getting started here
	$scope.auth.errors = false;
	$scope.checkLogin = function () {
		var invalid = false;
		if (typeof $scope.auth.password == 'undefined') {
			invalid = true;
		};
		if (typeof $scope.auth.username == 'undefined') {
			invalid = true;
		};
		if (invalid) {
			$scope.auth.errors = true;
		} else {
			$scope.auth.$save(function (auth) {
				console.log(auth);
				if (auth.errors == false) {
					//dont need an else, the view will take care of that ;)
					AuthCheck.setAuth(auth.token, auth.userid, auth.fullname, auth.username, auth.email);
					$location.path('/');
				}
			});
		}
	};
}
angular.module('ziptopia.auth').factory('AuthCheck', ['$location', function ($location) {
  //this will be the random hashed algorithm that laravel sends us
  var authToken = '';
  var userID = 0;
  var fullName = '';
  var email = '';
  var loggedIn = false;
  var userName = '';

  return {
    getAuth: function () {
      return authToken;
    },
    isLoggedIn: function () {
      return loggedIn;
    },
    getUserID: function () {
      return userID;
    },
    getFullName: function () {
      return fullName;
    },
    setAuth: function (newAuthToken, newUserID, newFullName, newUserName, newEmail) {
      authToken = newAuthToken;
      userID = newUserID;
      fullName = newFullName;
      userName = newUserName;
      email = newEmail;
      loggedIn = true;
    },
    forceAuth: function () {
      if (!loggedIn) {
        $location.path('/login');
      }
    }
  };
}]);


angular.module('ziptopia.auth').factory('AuthResource', function ($resource) {
	var AuthResource = $resource('/login', {});
	AuthResource.prototype.isNew = function () {
		return typeof this.id === 'undefined';
	};
	return AuthResource;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInJvdXRlcy5qcyIsImhvbWVDb250cm9sbGVyLmpzIiwibG9naW5Db250cm9sbGVyLmpzIiwiQXV0aENoZWNrLmpzIiwiQXV0aFJlc291cmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFXO0FBQzFCLEdBQUUsYUFBRixFQUFpQixPQUFqQixDQUF5QjtBQUN4QixXQUFtQixLQUFuQjtBQUNBLGNBQW1CLFlBQW5CO0FBQ0Esb0JBQW1CLFNBQW5CO0VBSEQsRUFJRyxPQUpILENBSVcsZUFKWCxFQUk0QixhQUo1QixFQUQwQjtBQU0xQixHQUFFLE9BQUYsRUFBVyxNQUFYLENBQWtCO0FBQ2pCLFdBQVMsU0FBVDtFQUREOztBQU4wQixDQUFYLENBQWxCOztBQVlBLFFBQVEsTUFBUixDQUFlLGVBQWYsRUFBZ0MsRUFBaEM7QUFDQSxRQUFRLE1BQVIsQ0FBZSxVQUFmLEVBQTJCLENBQUUsZUFBRixFQUFrQixTQUFsQixFQUE0QixZQUE1QixDQUEzQjtBQ2ZBLFFBQVEsTUFBUixDQUFlLFVBQWYsRUFBMkIsTUFBM0IsQ0FBa0MsVUFBVSxjQUFWLEVBQTBCO0FBQ3pELGtCQUNDLElBREQsQ0FDTSxHQUROLEVBQ1csRUFBQyxhQUFhLGtCQUFiLEVBQWlDLFlBQVksY0FBWixFQUQ3QyxFQUVDLElBRkQsQ0FFTSxRQUZOLEVBRWdCLEVBQUMsYUFBYSxtQkFBYixFQUFrQyxZQUFZLGVBQVosRUFGbkQsRUFEeUQ7Q0FBMUIsQ0FBbEM7OztBQ0VBLFNBQVMsY0FBVCxDQUF3QixNQUF4QixFQUFnQyxTQUFoQyxFQUEwQztBQUN6QyxXQUFVLFNBQVY7O0FBRHlDLE9BR3pDLENBQU8sUUFBUCxHQUFrQixVQUFVLFdBQVYsRUFBbEIsQ0FIeUM7Q0FBMUM7Ozs7QUNDQSxTQUFTLGVBQVQsQ0FBeUIsTUFBekIsRUFBaUMsU0FBakMsRUFBNEMsWUFBNUMsRUFBMEQsU0FBMUQsRUFBb0U7O0FBRW5FLFFBQU8sSUFBUCxHQUFjLElBQUksWUFBSixFQUFkOztBQUZtRSxPQUluRSxDQUFPLElBQVAsQ0FBWSxNQUFaLEdBQXFCLEtBQXJCLENBSm1FO0FBS25FLFFBQU8sVUFBUCxHQUFvQixZQUFVO0FBQzdCLE1BQUksVUFBVSxLQUFWLENBRHlCO0FBRXZCLE1BQUksT0FBTyxPQUFPLElBQVAsQ0FBWSxRQUFaLElBQXdCLFdBQS9CLEVBQTRDO0FBQUMsYUFBUSxJQUFSLENBQUQ7R0FBaEQsQ0FGdUI7QUFHdkIsTUFBSSxPQUFPLE9BQU8sSUFBUCxDQUFZLFFBQVosSUFBd0IsV0FBL0IsRUFBNEM7QUFBQyxhQUFRLElBQVIsQ0FBRDtHQUFoRCxDQUh1QjtBQUl2QixNQUFJLE9BQUosRUFBYTtBQUNaLFVBQU8sSUFBUCxDQUFZLE1BQVosR0FBcUIsSUFBckIsQ0FEWTtHQUFiLE1BRU87QUFDTixVQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLFVBQVMsSUFBVCxFQUFjO0FBQy9CLFlBQVEsR0FBUixDQUFZLElBQVosRUFEK0I7QUFFckMsUUFBSSxLQUFLLE1BQUwsSUFBYSxLQUFiLEVBQW9COztBQUV2QixlQUFVLE9BQVYsQ0FBa0IsS0FBSyxLQUFMLEVBQVksS0FBSyxNQUFMLEVBQWEsS0FBSyxRQUFMLEVBQWUsS0FBSyxRQUFMLEVBQWUsS0FBSyxLQUFMLENBQXpFLENBRnVCO0FBR3ZCLGVBQVUsSUFBVixDQUFlLEdBQWYsRUFIdUI7S0FBeEI7SUFGdUIsQ0FBbEIsQ0FETTtHQUZQO0VBSmEsQ0FMK0M7Q0FBcEU7QUNIQSxRQUFRLE1BQVIsQ0FBZSxlQUFmLEVBQWdDLE9BQWhDLENBQXdDLFdBQXhDLEVBQXFELENBQUMsV0FBRCxFQUFjLFVBQVMsU0FBVCxFQUFvQjs7QUFFckYsTUFBSSxZQUFZLEVBQVosQ0FGaUY7QUFHckYsTUFBSSxTQUFTLENBQVQsQ0FIaUY7QUFJckYsTUFBSSxXQUFXLEVBQVgsQ0FKaUY7QUFLckYsTUFBSSxRQUFRLEVBQVIsQ0FMaUY7QUFNckYsTUFBSSxXQUFXLEtBQVgsQ0FOaUY7QUFPckYsTUFBSSxXQUFXLEVBQVgsQ0FQaUY7O0FBU3JGLFNBQU87QUFDTCxhQUFVLFlBQVU7QUFDbEIsYUFBTyxTQUFQLENBRGtCO0tBQVY7QUFHVixnQkFBYSxZQUFVO0FBQ3JCLGFBQU8sUUFBUCxDQURxQjtLQUFWO0FBR2IsZUFBWSxZQUFZO0FBQ3RCLGFBQU8sTUFBUCxDQURzQjtLQUFaO0FBR1osaUJBQWMsWUFBWTtBQUN4QixhQUFPLFFBQVAsQ0FEd0I7S0FBWjtBQUdkLGFBQVMsVUFBUyxZQUFULEVBQXVCLFNBQXZCLEVBQWtDLFdBQWxDLEVBQStDLFdBQS9DLEVBQTRELFFBQTVELEVBQXFFO0FBQzVFLGtCQUFZLFlBQVosQ0FENEU7QUFFNUUsZUFBUyxTQUFULENBRjRFO0FBRzVFLGlCQUFXLFdBQVgsQ0FINEU7QUFJNUUsaUJBQVcsV0FBWCxDQUo0RTtBQUs1RSxjQUFRLFFBQVIsQ0FMNEU7QUFNNUUsaUJBQVcsSUFBWCxDQU40RTtLQUFyRTtBQVFULGVBQVcsWUFBVTtBQUNuQixVQUFJLENBQUMsUUFBRCxFQUFXO0FBQ2Isa0JBQVUsSUFBVixDQUFlLFFBQWYsRUFEYTtPQUFmO0tBRFM7R0FyQmIsQ0FUcUY7Q0FBcEIsQ0FBbkU7OztBQ0dBLFFBQVEsTUFBUixDQUFlLGVBQWYsRUFBZ0MsT0FBaEMsQ0FBd0MsY0FBeEMsRUFBd0QsVUFBVSxTQUFWLEVBQXFCO0FBQzNFLEtBQUksZUFBZSxVQUFVLFFBQVYsRUFBb0IsRUFBcEIsQ0FBZixDQUR1RTtBQUUzRSxjQUFhLFNBQWIsQ0FBdUIsS0FBdkIsR0FBK0IsWUFBVTtBQUN4QyxTQUFRLE9BQU8sS0FBSyxFQUFMLEtBQWEsV0FBcEIsQ0FEZ0M7RUFBVixDQUY0QztBQUszRSxRQUFPLFlBQVAsQ0FMMkU7Q0FBckIsQ0FBeEQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdFx0JCgnLnVpLnNpZGViYXInKS5zaWRlYmFyKHtcblx0XHRcdFx0ZGltUGFnZSAgICAgICAgICA6IGZhbHNlLFxuXHRcdFx0XHR0cmFuc2l0aW9uICAgICAgIDogJ3NjYWxlIGRvd24nLFxuXHRcdFx0XHRtb2JpbGVUcmFuc2l0aW9uIDogJ3VuY292ZXInXG5cdFx0XHR9KS5zaWRlYmFyKCdhdHRhY2ggZXZlbnRzJywgJy5tZW51IC5pdGVtJyk7XG5cdFx0XHQkKCcjbWVudScpLnN0aWNreSh7XG5cdFx0XHRcdGNvbnRleHQ6ICcucHVzaGVyJ1xuXHRcdFx0fSk7XG5cdFx0XHQvL2FsZXJ0KCdib290c3RyYXAgYXR0ZW1wdC4uLi4nKTtcblx0XHR9KTtcblxuYW5ndWxhci5tb2R1bGUoJ3ppcHRvcGlhLmF1dGgnLCBbXSk7XG5hbmd1bGFyLm1vZHVsZSgnemlwdG9waWEnLCBbICd6aXB0b3BpYS5hdXRoJywnbmdSb3V0ZScsJ25nUmVzb3VyY2UnXSk7IiwiYW5ndWxhci5tb2R1bGUoJ3ppcHRvcGlhJykuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuXHRcdFx0JHJvdXRlUHJvdmlkZXJcblx0XHRcdC53aGVuKCcvJywge3RlbXBsYXRlVXJsOiAnL3ZpZXdzL2hvbWUuaHRtbCcsIGNvbnRyb2xsZXI6IGhvbWVDb250cm9sbGVyfSlcblx0XHRcdC53aGVuKCcvbG9naW4nLCB7dGVtcGxhdGVVcmw6ICcvdmlld3MvbG9naW4uaHRtbCcsIGNvbnRyb2xsZXI6IGxvZ2luQ29udHJvbGxlcn0pO1xuXHRcdH0pOyIsIlxuLy90aGVyZSBpcyBzbyBtdWNoIERJIGdvaW5nIG9uIGhlcmUuLi4uIG5lZWQgdG8gZmlndXJlIG91dCBvZiB0aGlzIGlzIGJhZCBhbmQgaWYgaXQgY2FuIGJlIGNsZWFuZWQgdXBcbmZ1bmN0aW9uIGhvbWVDb250cm9sbGVyKCRzY29wZSwgQXV0aENoZWNrKXtcblx0QXV0aENoZWNrLmZvcmNlQXV0aCgpO1xuXHQvL2xvZ2dlZCBpbiBhbmQgYWxsIGlzIHdlbGxcblx0JHNjb3BlLmZ1bGxOYW1lID0gQXV0aENoZWNrLmdldEZ1bGxOYW1lKCk7XG59XG5cbiIsIlxuXG4vL3RoZXJlIGlzIHNvIG11Y2ggREkgZ29pbmcgb24gaGVyZS4uLi4gbmVlZCB0byBmaWd1cmUgb3V0IG9mIHRoaXMgaXMgYmFkIGFuZCBpZiBpdCBjYW4gYmUgY2xlYW5lZCB1cFxuZnVuY3Rpb24gbG9naW5Db250cm9sbGVyKCRzY29wZSwgQXV0aENoZWNrLCBBdXRoUmVzb3VyY2UsICRsb2NhdGlvbil7XG5cdC8vZm9yIEF1dGhcblx0JHNjb3BlLmF1dGggPSBuZXcgQXV0aFJlc291cmNlKCk7XG5cdC8vbm8gZXJyb3JzIHlldCwganVzdCBnZXR0aW5nIHN0YXJ0ZWQgaGVyZVxuXHQkc2NvcGUuYXV0aC5lcnJvcnMgPSBmYWxzZTtcblx0JHNjb3BlLmNoZWNrTG9naW4gPSBmdW5jdGlvbigpe1xuXHRcdHZhciBpbnZhbGlkID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgJHNjb3BlLmF1dGgucGFzc3dvcmQgPT0gJ3VuZGVmaW5lZCcpIHtpbnZhbGlkPXRydWU7fTtcbiAgICAgICAgaWYgKHR5cGVvZiAkc2NvcGUuYXV0aC51c2VybmFtZSA9PSAndW5kZWZpbmVkJykge2ludmFsaWQ9dHJ1ZTt9O1xuICAgICAgICBpZiAoaW52YWxpZCkge1xuICAgICAgICBcdCRzY29wZS5hdXRoLmVycm9ycyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIFx0JHNjb3BlLmF1dGguJHNhdmUoZnVuY3Rpb24oYXV0aCl7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZyhhdXRoKTtcblx0XHRcdFx0aWYgKGF1dGguZXJyb3JzPT1mYWxzZSkge1xuXHRcdFx0XHRcdC8vZG9udCBuZWVkIGFuIGVsc2UsIHRoZSB2aWV3IHdpbGwgdGFrZSBjYXJlIG9mIHRoYXQgOylcblx0XHRcdFx0XHRBdXRoQ2hlY2suc2V0QXV0aChhdXRoLnRva2VuLCBhdXRoLnVzZXJpZCwgYXV0aC5mdWxsbmFtZSwgYXV0aC51c2VybmFtZSwgYXV0aC5lbWFpbCk7XG5cdFx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJy8nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG4gICAgICAgIH1cblx0XHRcblx0fVxufVxuIiwiYW5ndWxhci5tb2R1bGUoJ3ppcHRvcGlhLmF1dGgnKS5mYWN0b3J5KCdBdXRoQ2hlY2snLCBbJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCRsb2NhdGlvbikge1xuICAvL3RoaXMgd2lsbCBiZSB0aGUgcmFuZG9tIGhhc2hlZCBhbGdvcml0aG0gdGhhdCBsYXJhdmVsIHNlbmRzIHVzXG4gIHZhciBhdXRoVG9rZW4gPSAnJztcbiAgdmFyIHVzZXJJRCA9IDA7XG4gIHZhciBmdWxsTmFtZSA9ICcnO1xuICB2YXIgZW1haWwgPSAnJztcbiAgdmFyIGxvZ2dlZEluID0gZmFsc2U7XG4gIHZhciB1c2VyTmFtZSA9ICcnO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0QXV0aCA6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gYXV0aFRva2VuO1xuICAgIH0sXG4gICAgaXNMb2dnZWRJbiA6IGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gbG9nZ2VkSW47XG4gICAgfSxcbiAgICBnZXRVc2VySUQgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdXNlcklEO1xuICAgIH0sXG4gICAgZ2V0RnVsbE5hbWUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZnVsbE5hbWU7XG4gICAgfSxcbiAgICBzZXRBdXRoOiBmdW5jdGlvbihuZXdBdXRoVG9rZW4sIG5ld1VzZXJJRCwgbmV3RnVsbE5hbWUsIG5ld1VzZXJOYW1lLCBuZXdFbWFpbCl7XG4gICAgICBhdXRoVG9rZW4gPSBuZXdBdXRoVG9rZW47XG4gICAgICB1c2VySUQgPSBuZXdVc2VySUQ7XG4gICAgICBmdWxsTmFtZSA9IG5ld0Z1bGxOYW1lO1xuICAgICAgdXNlck5hbWUgPSBuZXdVc2VyTmFtZTtcbiAgICAgIGVtYWlsID0gbmV3RW1haWw7XG4gICAgICBsb2dnZWRJbiA9IHRydWU7XG4gICAgfSxcbiAgICBmb3JjZUF1dGg6IGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoIWxvZ2dlZEluKSB7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1dKTsiLCJcblxuXG5hbmd1bGFyLm1vZHVsZSgnemlwdG9waWEuYXV0aCcpLmZhY3RvcnkoJ0F1dGhSZXNvdXJjZScsIGZ1bmN0aW9uICgkcmVzb3VyY2UpIHtcblx0XHR2YXIgQXV0aFJlc291cmNlID0gJHJlc291cmNlKCcvbG9naW4nLCB7fSk7XG5cdFx0QXV0aFJlc291cmNlLnByb3RvdHlwZS5pc05ldyA9IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gKHR5cGVvZih0aGlzLmlkKSA9PT0gJ3VuZGVmaW5lZCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gQXV0aFJlc291cmNlO1xuXHR9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
