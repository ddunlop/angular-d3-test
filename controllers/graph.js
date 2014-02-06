var testApp = angular.module('testApp');
testApp.controller('GraphCtrl', function($scope) {
	var data = [];

	function genData(points) {
		var t = +new Date();
		while(points--) {
			data.push([t+=1600, Math.floor(Math.random() * 100 )]);
		}
	}

	genData(5);

	$scope.getData = function() {
		return data;
	};
});