var testApp = angular.module('testApp');
testApp.directive('d3GraphLine', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '^d3Graph',
    scope: {
			data: '=data'
    },
    link: function(scope, element, attrs, d3Ctrl) {
      d3Ctrl.addLine(scope.data, attrs.stroke);
    }
  };
});