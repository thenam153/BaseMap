var componentName = 'miniPopup';

module.exports.name = componentName;

require('./mini-popup.css');

var angular = require('angular');

var app = angular.module(componentName,[]);

app.component(componentName,{
	template: require('html-loader!./mini-popup.html'),
	controller: MiniPopupController,
	controllerAs: 'self'
});

function MiniPopupController($scope) {
	console.log("Mini popup welcome!");
}
