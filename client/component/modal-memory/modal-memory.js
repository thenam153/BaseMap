const componentName = "modalMemory";

module.exports.name = componentName;

var angular = require('angular');

var angularMaterial = require('angular-material');

var app = angular.module(componentName,[angularMaterial]);

require('./modal-memory.css');

app.component(componentName,{
	template: require('html-loader!./modal-memory.html'),
	controller: ModalMemoryController,
	controllerAs: 'self'
});

function ModalMemoryController($scope,$interval,$mdDialog){
	let memory = window.performance.memory;
		$scope.limit = memory.jsHeapSizeLimit;
		$scope.total = memory.totalJSHeapSize;
		$scope.used = memory.usedJSHeapSize;
		$scope.per= Math.round($scope.used/$scope.total*10000)/100;
		$scope.percent =  Math.ceil($scope.per);

	$interval(function(){
		let memory = window.performance.memory;
		$scope.limit = memory.jsHeapSizeLimit;
		$scope.total = memory.totalJSHeapSize;
		$scope.used = memory.usedJSHeapSize;
		$scope.per = Math.round($scope.used/$scope.total*10000)/100;
		$scope.percent =  Math.ceil($scope.per);
	},1000);

	
}