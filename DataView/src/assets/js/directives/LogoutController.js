




angular.module('ziptopia.auth').controller('LogoutController', ['$scope', 'AuthCheck', function($scope, AuthCheck) {
	$scope.loggedIn = AuthCheck.isLoggedIn;
	$scope.logout = function(){
		AuthCheck.clearAuth();
	}
}]);
