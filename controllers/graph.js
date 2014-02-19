var testApp = angular.module('testApp');
testApp.controller('GraphCtrl', function($scope) {
	var data = [];

	function genData(points, max) {
		var t = +new Date(),
			data = [];
		while(points--) {
			data.push([t+=47600, Math.floor(Math.random() * max )]);
		}
		return data;
	}

	data = [
		genData(5, 100),
		genData(5, 100),
		genData(5, 1000)
	];

	$scope.getData = function(i) {
		return data[i];
	};
});