angular.module('ziptopia.auth').factory('AuthCheck', ['$location', function($location) {
  //this will be the random hashed algorithm that laravel sends us
  var authToken = '';
  var userID = 0;
  var fullName = '';
  var email = '';
  var loggedIn = false;
  var userName = '';

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
      return fullName;
    },
    setAuth: function(newAuthToken, newUserID, newFullName, newUserName, newEmail){
      authToken = newAuthToken;
      userID = newUserID;
      fullName = newFullName;
      userName = newUserName;
      email = newEmail;
      loggedIn = true;
    },
    forceAuth: function(){
      if (!loggedIn) {
        $location.path('/login');
      }
    }
  }
}]);