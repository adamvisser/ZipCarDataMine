angular.module('ziptopia.auth').factory('AuthCheck', ['$location', '$cookies', function($location, $cookies) {

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
    forceAuth: function(){
      var loggedIn = $cookies.get('loggedIn');
      if (!loggedIn) {
        $location.path('/login');
      }
    }
  }
}]);