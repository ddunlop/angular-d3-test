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

      /* currently register gets called per each element,
          idealy this would be registered once */
      d3Ctrl.registerComponentType('line', function(settings, svg, x, y, color) {
        var line = d3.svg.line()
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
          .interpolate('basis');

        svg.append("path")
          .datum(settings.data)
          .attr('stroke', settings.stroke)
          .attr("class", "line")
          .attr("d", line);
      });
      d3Ctrl.addComponent('line', {
        data: scope.data,
        stroke: attrs.stroke
      });
    }
  };
});