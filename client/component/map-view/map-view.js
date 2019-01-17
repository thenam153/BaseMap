var componentName = 'mapView';

module.exports.name = componentName;

var angular = require('angular');

var miniPopup = require('../map-mini-popup/mini-popup.js');

var modal = require('../../services/modal-service.js');

var well = require('../../services/formatAndAddWell-service.js');

require('./map-view.css');

var app = angular.module(componentName,[modal.name,miniPopup.name,well.name]);

app.component(componentName,{
	template: require('html-loader!./map-view.html'),
	controller: mapViewController,
	controllerAs: 'self'
});

function mapViewController($scope, $http, $modal, $well) {

	var myMap = L.map('map', {
		center: [21.01279, 105.835256],
		zoom: 6,
		// drawControl: true
	});
	var drawnItems = new L.FeatureGroup();

	myMap.addLayer(drawnItems);

	var drawControl = new L.Control.Draw({	
	    edit: {
	        featureGroup: drawnItems
	    }
	});

	myMap.addControl(drawControl);

	myMap.on('draw:created', function(e) {
	    var type = e.layerType,
	        layer = e.layer;
	    console.log(type);

	    if (type === 'marker') {
	        layer.bindPopup('A popup!');
	    }
	    drawnItems.addLayer(layer);
	});

	myMap.on('draw:deleted', function(e) {
		let layers = e.layers;
		console.log(layers);
	});

	var myIcon = L.icon({
		iconUrl: 'wellx4.png',
		iconSize:[36, 87],
		iconAnchor:[25, 85],
		popupAnchor:  [-2, -74]
	});

	// layer 1
	var layerOne = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYXBpcyIsImEiOiJjanFyZnpscXowMTRuM3hyeGJxenM2aG83In0.megb1sv5N5EvfvkLV-pycg', {
		maxZoom: 18,
		id: 'mapbox.streets'
	}, {
		tms:true
	})
	.addTo(myMap);
	
	// layer 2
	var scale = 691.0 / 250;
	var imageUrl = './map.jpg'

	var layerTwo = L.imageOverlay(imageUrl, new L.LatLngBounds([0,(691 / scale) ], [(541/ scale),0]), { 
			noWrap: false,
			maxZoom: 18, 
			minZoom: 0
		});
	// layer 3
	var layerThree = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYXBpcyIsImEiOiJjanFyZnpscXowMTRuM3hyeGJxenM2aG83In0.megb1sv5N5EvfvkLV-pycg', {
		maxZoom: 18,
		id: 'mapbox.outdoors'
	}, {
		tms:true
	});
	// layer 4
	var layerFour = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYXBpcyIsImEiOiJjanFyZnpscXowMTRuM3hyeGJxenM2aG83In0.megb1sv5N5EvfvkLV-pycg', {
		maxZoom: 18,
		id: 'mapbox.dark'
	}, {
		tms:true
	});
	// switch layer
	var toggleLayer = {
		'Streets' : layerOne,
		'Contour' : layerTwo,
		'OutDoors':layerThree,
		'Dark' : layerFour,
	}
	// add toggle layer
	L.control.layers(null,toggleLayer).addTo(myMap);
	// L.control.scale().addTo(myMap);
	myMap.on('overlayadd ',function(e){
		if(e.name === 'Contour'){
			myMap.setZoom(2);
		}else{
			myMap.setZoom(4);
		}
		console.log("change layer");
	})
	// =============add well and popup===============
	$well.getAndShowWell(myMap,drawnItems,myIcon);

	myMap.on('click', clodePopupInfo);

	function clodePopupInfo(e) {
		$modal.close();
	}
}