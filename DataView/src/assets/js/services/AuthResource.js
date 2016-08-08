


angular.module('ziptopia.auth').factory('AuthResource', function ($resource) {
		var AuthResource = $resource('/login', {});
		AuthResource.prototype.isNew = function(){
			return (typeof(this.id) === 'undefined');
		}
		return AuthResource;
	});