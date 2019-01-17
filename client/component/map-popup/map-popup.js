var componentName = "popupMap";

module.exports.name = componentName;

require('./map-popup.css');

var angular = require('angular');

var angularMaterial = require('angular-material');

var modal = require('../../services/modal-service.js');

var app = angular.module(componentName,[angularMaterial, modal.name]);

app.component(componentName, {
	template: require('html-loader!./map-popup.html'),
	controller: PopupMapController,
	controllerAs: 'self'
});

function PopupMapController($scope, $mdSidenav, $modal) {
	
	$scope.close = function() {
		$mdSidenav('show').close()
      	$scope.address = '';
      	$scope.des = '';
  		$modal.status = 1;
	}

	$modal.openScope = function(well) {
		$scope.cnty = well.cnty;
		$scope.company = well.company;
		$scope.fld = well.fld;
		$scope.loc = well.loc;
		$scope.lat = well.lat;
		$scope.lng = well.lng;
		$modal.toggleShow();
	}


}