var testApp = angular.module('testApp');
testApp.directive('d3Graph', function() {
	var svg,
		components = [];

  return {
    restrict: 'E',
    replace: true,
    scope: {},
    link: function(scope, element, attrs) {
			svg = d3.select(element[0])
            .append("svg");
      components.forEach(function(component) {
        component(svg);
      });
    },
    controller: function($scope) {
			this.width = function() {
				return 400;
			};
			this.height = function() {
				return 100;
			};

			this.svg = function() {
				return svg;
			};

			this.addComponent = function(component) {
				components.push(component);
			};
    }
  };
});