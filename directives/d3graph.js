var testApp = angular.module('testApp');
testApp.directive('d3Graph', function() {
	var svg,
		y_axes = [],
    x,
		components = [];

  return {
    restrict: 'E',
    // transclude: true,
    replace: true,
    scope: {},
    link: function(scope, element, attrs, d3Ctrl) {
			svg = d3.select(element[0])
            .append("svg");
      // build up the graph

      x.range([5, d3Ctrl.width()-5]);
      var yAxis,
        xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(3)
        .outerTickSize(0)
        .tickFormat(d3.time.format("%H:%M"))
        .tickSubdivide(false);
      svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + 200 + ")")
            .call(xAxis);

      // extra axis to remove
      y_axes.pop();
      y_axes.forEach(function(axis, i) {
        var side = i === 0 ? 'left' : 'right',
          xTrans = side === 'left' ? 0: 415;
        axis.range([200-5, 5]);
        yAxis = d3.svg.axis()
          .scale(axis)
          .ticks(4)
          .outerTickSize(0)
          .orient("right");

        svg.append("g")
            .attr("class", "y axis axis"+side)
            .attr("transform", "translate("+xTrans+",0)")
            .call(yAxis);

      });
      components.forEach(function(component) {
        var el;
        switch(component.type) {
          case 'line':
            el = d3.svg.line()
              .x(function(d) { return x(d[0]); })
              .y(function(d) { return y_axes[component.axis](d[1]); })
              .interpolate('basis');

            svg.append("path")
              .datum(component.data)
              .attr('stroke', component.color)
              .attr("class", "line")
              .attr("d", el);

            break;
          default:
            console.error('unkown component type:', component.type);
        }
      });
    },
    controller: function($scope) {
			this.width = function() {
				return 400;
			};
			this.height = function() {
				return 200;
			};

			this.svg = function() {
				return svg;
			};

			this.addLine = function(data, color) {
        var axis = y_axes[y_axes.length-1],
          domain = axis.domain(),
          extent = d3.extent(data, function(d) { return d[1]; });

        axis.domain(
          [
            Math.min(domain[0], extent[0]),
            Math.max(domain[1], extent[1])
          ]
        );
        x.domain(d3.extent(data, function(d) { return d[0]; }));
				components.push({
					type: 'line',
					axis: y_axes.length-1,
          color: color,
					data: data
				});
			};

			this.newAxis = function() {
        y_axes.push(d3.scale.linear());
			};
      this.newAxis();
      x = d3.time.scale();
    }
  };
});
