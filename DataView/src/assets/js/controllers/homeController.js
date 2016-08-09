
//there is so much DI going on here.... need to figure out of this is bad and if it can be cleaned up
function homeController($scope, AuthCheck){
	AuthCheck.forceAuth();
	//logged in and all is well
	$scope.fullName = AuthCheck.getFullName();
}

