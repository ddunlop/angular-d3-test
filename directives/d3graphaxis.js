var testApp = angular.module('testApp');
testApp.directive('d3GraphAxis', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '^d3Graph',
    scope: {
    },
    link: function(scope, element, attrs, d3Ctrl) {
      d3Ctrl.newAxis();
    }
  };
});