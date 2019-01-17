var serviceName = '$modal';

var moduleName = '$modal';

module.exports.name = moduleName;

var angularMaterial = require('angular-material');

var angular = require('angular');

angular.module(moduleName,[angularMaterial])
.factory(serviceName, function($mdSidenav) {
	return {
		isOpen:  function(){
	      	return $mdSidenav('show').isOpen();
	    },
		toggleShow: function() {
        	return $mdSidenav('show').toggle();
    	},
		close: function(){
      		$mdSidenav('show').close()
 		},
	}
})

