




angular.module('ziptopia.auth').controller('LogoutController', ['$scope', 'AuthCheck', function($scope, AuthCheck) {
	$scope.loggedIn = AuthCheck.loggedIn;
	$scope.logout = function(){
		AuthCheck.clearAuth();
	}
}]);
