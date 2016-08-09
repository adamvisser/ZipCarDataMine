

//there is so much DI going on here.... need to figure out of this is bad and if it can be cleaned up
function loginController($scope, AuthCheck, AuthResource, $location){
	//for Auth
	$scope.auth = new AuthResource();
	//no errors yet, just getting started here
	$scope.auth.errors = 0;
	$scope.checkLogin = function(){
		$scope.auth.$save(function(auth){
			if (auth.errors==0) {
				//dont need an else, the view will take care of that ;)
				AuthCheck.setAuth(auth.token, auth.username);
				$location.path('/');
			}
		});
	}
}
