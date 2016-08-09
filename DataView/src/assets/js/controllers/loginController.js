

//there is so much DI going on here.... need to figure out of this is bad and if it can be cleaned up
function loginController($scope, AuthCheck, AuthResource, $location){
	//for Auth
	$scope.auth = new AuthResource();
	//no errors yet, just getting started here
	$scope.auth.errors = false;
	$scope.checkLogin = function(){
		var invalid = false;
        if (typeof $scope.auth.password == 'undefined') {invalid=true;};
        if (typeof $scope.auth.username == 'undefined') {invalid=true;};
        if (invalid) {
        	$scope.auth.errors = true;
        } else {
        	$scope.auth.$save(function(auth){
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
