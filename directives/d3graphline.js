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
			var data = scope.data,
				x = d3.time.scale().range([5, d3Ctrl.width()-5]),
				y = d3.scale.linear().range([d3Ctrl.height()-5, 5]),
        line;

        x.domain(d3.extent(data, function(d) { return d[0]; }));
        y.domain(d3.extent(data, function(d) { return d[1]; }));

        line = d3.svg.line()
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
          .interpolate('basis');

        d3Ctrl.addComponent(function(svg) {
          svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
        });
    }
  };
});