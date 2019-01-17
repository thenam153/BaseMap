var angular = require('angular');

require('./index.css');
	
var mapView = require('./component/map-view/map-view.js');

var mapPopup = require('./component/map-popup/map-popup.js');

var modalMemory = require('./component/modal-memory/modal-memory.js');

var app = angular.module('baseMap',[mapView.name,mapPopup.name,modalMemory.name]);