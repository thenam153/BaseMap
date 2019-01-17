var serviceName = '$well';

var moduleName = '$well';

module.exports.name = moduleName;

var async = require('async');

var modal = require('./modal-service.js');

var angular = require('angular');

angular.module(moduleName,[modal.name])
.factory(serviceName, function($http,$modal) {

	function formatWellFromData(inData){
			let well = {};
			well.idWell = inData.idWell;
			well.idProject = inData.idProject;
			for(let i = 0; i < inData.well_headers.length; i++){
				if(inData.well_headers[i].header =='LATI') {
					well.lat = inData.well_headers[i].value;
				}
				if(inData.well_headers[i].header =='LONG') {
					well.lng = inData.well_headers[i].value;
				}
				if(inData.well_headers[i].header =='CNTY') {
					well.cnty = inData.well_headers[i].value;
				}
				if(inData.well_headers[i].header =='COMPANY') {
					well.company = inData.well_headers[i].value;
				}
				if(inData.well_headers[i].header =='FLD') {
					well.fld = inData.well_headers[i].value;
				}
				if(inData.well_headers[i].header =='LOC') {
					well.loc = inData.well_headers[i].value;
				}
			}
			return well;
		}

	function addWellToMapAndControl(well,myMap,drawnItems,myIcon) {
			if(well.lat != '') {
				let marker = L.marker([well.lat, well.lng],{icon : myIcon})
							.addTo(myMap)
							// .bindPopup(`<mini-popup></mini-popup>`)
							.bindPopup(`<b>CNTY:</b> ${well.cnty}</br>
								<b>COMPANY:</b> ${well.company}</br>
								<b>FLD:</b> ${well.fld}</br>
								<b>LOC:</b> ${well.loc}`)
							// .on('click',function(ev) {
							// 	console.log('You clicked!');
							// 	this.bindPopup(`<b>CNTY:</b> ${well.cnty}</br>
							// 	<b>COMPANY:</b> ${well.company}</br>
							// 	<b>FLD:</b> ${well.fld}</br>
							// 	<b>LOC:</b> ${well.loc}`).openPopup();
							// })
							.on('dblclick', function(ev) {
								$modal.openScope(this.well);
							})
							.on('contextmenu', function(ev) {
								$modal.openScope(this.well);
							})
				marker.id = well.id;
				marker.well = well;
				myMap.setView(new L.LatLng(well.lat, well.lng), 6);
				drawnItems.addLayer(marker);
			}
			else {
				console.log("Well location is invalid. Ignore it!");
			}
		}

	function getAndShowWell(myMap,drawnItems,myIcon) {
			$http.post('http://dev.i2g.cloud/project/well/list',{
				idProject: 1
			}, {
		    	headers: {
		    			'Content-Type' : 'application/json; charset=UTF-8',
		    			Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1bmdoeCIsIndob2FtaSI6Im1haW4tc2VydmljZSIsInJvbGUiOjAsImNvbXBhbnkiOiJJMkciLCJpYXQiOjE1NDc2MTYwMjksImV4cCI6MTU0Nzc4ODgyOX0._I-QioL_xXHx7ncgvQ6WA7_Zpv2D2-yLCfcDQn4c0UE'
		    		}
			})
			.then(res => {
				let dataWells = res.data.content;
				async.each(dataWells, function(well,callback) {
					$http.post('http://dev.i2g.cloud/project/well/info', {
						idWell : well.idWell
					},{
				    	headers : {
			    			'Content-Type' : 'application/json; charset=UTF-8',
			    			Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1bmdoeCIsIndob2FtaSI6Im1haW4tc2VydmljZSIsInJvbGUiOjAsImNvbXBhbnkiOiJJMkciLCJpYXQiOjE1NDc2MTYwMjksImV4cCI6MTU0Nzc4ODgyOX0._I-QioL_xXHx7ncgvQ6WA7_Zpv2D2-yLCfcDQn4c0UE'
			    		}
					})
					.then(res => {
						let data = res.data.content;
						let well = formatWellFromData(data);
						addWellToMapAndControl(well,myMap,drawnItems,myIcon);
						// addWellToMap(well,myMap);
						callback();
					});
				}, err => {
					console.log('done',(err || {}).message);
				});
			});
		}

	return {
		getAndShowWell: getAndShowWell,
	}
});