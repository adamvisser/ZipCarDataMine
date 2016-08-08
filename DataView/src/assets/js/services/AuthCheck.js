angular.module('ziptopia.auth').factory('AuthCheck', ['$location', function($location) {
  //this will be the random hashed algorithm that laravel sends us
  var authToken = '';
  var loggedIn = false;

  return {
    getAuth : function() {
      return authToken;
    },
    isLoggedIn : function(){
      return loggedIn;
    },
    setAuth: function(newAuth){
      authToken = newAuth;
      loggedIn = true;
    },
    forceAuth: function(){
      if (!loggedIn) {
        $location.path('/login');
      }
    }
  }
}]);