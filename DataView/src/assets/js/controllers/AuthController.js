

//there is so much DI going on here.... need to figure out of this is bad and if it can be cleaned up
function AuthController($scope, AuthCheck, AuthResource, $location){
	//for Auth
	$scope.loginAuth = new AuthResource();
	$scope.registerAuth = new AuthResource();
	//no errors yet, just getting started here
	$scope.loginAuth.errors = false;
	$scope.registerAuth.errors = false;
	$scope.checkLogin = function(){
		var invalid = false;
        if (typeof $scope.loginAuth.password == 'undefined') {invalid=true;};
        if (typeof $scope.loginAuth.username == 'undefined') {invalid=true;};
        if (invalid) {
        	$scope.loginAuth.errors = true;
        } else {
        	$scope.loginAuth.$save(function(auth){
        		console.log(auth);
				if (auth.errors==false) {
					//dont need an else, the view will take care of that ;)
					AuthCheck.setAuth(auth.token, auth.userid, auth.fullname, auth.username, auth.email);
					$location.path('/');
				}
			});
        }
		
	}
}
