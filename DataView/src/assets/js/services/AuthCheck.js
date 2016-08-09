angular.module('ziptopia.auth').factory('AuthCheck', ['$location', function($location) {
  //this will be the random hashed algorithm that laravel sends us
  var authToken = '';
  var userID = 0;
  var fullName = '';
  var loggedIn = false;

  return {
    getAuth : function(){
      return authToken;
    },
    isLoggedIn : function(){
      return loggedIn;
    },
    getUserID : function () {
      return userID;
    },
    getFullName : function () {
      return userID;
    },
    setAuth: function(newAuth, newName){
      authToken = newAuth;
      fullName = newName;
      loggedIn = true;
    },
    forceAuth: function(){
      if (!loggedIn) {
        $location.path('/login');
      }
    }
  }
}]);