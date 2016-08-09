angular.module('ziptopia.auth').factory('AuthCheck', ['$location', '$cookies', function($location, $cookies) {
  //todo this proper like we will want to set some timer that auto clears auth when the session from the server actually expires, but I still have to setup events and that could take a bit of time, may be out of scope, not sure
  return {
    getAuth : function(){
      return $cookies.get('authToken');
    },
    isLoggedIn : function(){
      return $cookies.get('loggedIn');
    },
    getUserID : function () {
      return $cookies.get('userID');
    },
    getFullName : function () {
      return $cookies.get('fullName');
    },
    setAuth: function(newAuthToken, newUserID, newFullName, newUserName, newEmail){
      $cookies.put('authToken', newAuthToken);
      $cookies.put('userID', newUserID);
      $cookies.put('fullName', newFullName);
      $cookies.put('userName', newUserName);
      $cookies.put('email', newEmail);
      $cookies.put('loggedIn', true);
      
    },
    clearAuth: function(){
      $cookies.remove('authToken');
      $cookies.remove('userID');
      $cookies.remove('fullName');
      $cookies.remove('userName');
      $cookies.remove('email');
      $cookies.remove('loggedIn');
      $location.path('/login');
    },
    forceAuth: function(){
      var loggedIn = $cookies.get('loggedIn');
      if (!loggedIn) {
        $location.path('/login');
      }
    }
  }
}]);