// Code copied and changed from https://github.com/vlandham/gates_bubbles

(function () {
    'use strict';

    if (dc.bubbleCloud) {
        return false;
    }

    dc.bubbleCloud = function (parent, chartGroup) {
        var _chart = dc.bubbleMixin(dc.capMixin(dc.bubbleChart(parent)));

        var FORCE_STRENGTH = 0.3;
        var FRICTION = 0.25;

        var _simulation = null;
        var _circles = [];
        var _g = null;
        var _gs = null;

        _chart._doRender = function () {
            _chart.resetSvg();

            _g = _chart.svg().append('g');

            _circles = d3.select();

            drawChart();

            return _chart;
        };

        _chart._doRedraw = function () {
            drawChart();

            return _chart;
        };

        function drawChart() {

            if (_chart.elasticRadius()) {
                _chart.r().domain([_chart.rMin(), _chart.rMax()]);
            }

            _chart.r().range([_chart.MIN_RADIUS, _chart.xAxisLength() * _chart.maxBubbleRelativeSize()]);

            if (_circles.empty()) {
                createBubbles();
            } else {
                updateBubbles();
            }

            let center = {x: _chart.effectiveWidth() / 2, y: _chart.effectiveHeight() / 2}

            highlightFilter();

            _simulation = d3.forceSimulation()
                .nodes(_chart.data())
                .on('tick', function () {
                    _gs.attr('transform', d => `translate(${d.x}, ${d.y})`)
                });

            _simulation
                .force('x', d3.forceX().strength(FORCE_STRENGTH).x(center.x))
                .force('y', d3.forceY().strength(FORCE_STRENGTH).y(center.y))
                .force('charge', d3.forceManyBody().strength(charge))
                .force('collide', d3.forceCollide(d => _chart.bubbleR(d) + 1))
                .velocityDecay(FRICTION)
        }

        function createBubbles() {
            _gs = _g
                .selectAll('g')
                .data(_chart.data())
                .enter()
                .append('g')
                .attr('class', _chart.BUBBLE_NODE_CLASS)
                .on('mouseover', function () {
                    d3.select(this).raise();
                });

            _circles = _gs
                .append('circle')
                .attr('class', _chart.BUBBLE_CLASS)
                .attr('r', d => {
                    d.radius = _chart.bubbleR(d);
                    return d.radius;
                })
                .attr('fill-opacity', 1)
                .attr('fill', function (d, i) {
                    return _chart.getColor(d, i);
                })
                .attr('stroke-width', 2)
                .on('click', _chart.onClick)
                .on('mouseenter', function () {
                    d3.select(this).attr('stroke', '#303030');
                })
                .on('mouseout', function () {
                    d3.select(this).attr('stroke', 'none');
                });

            _chart._doRenderLabel(_gs);
            _chart._doRenderTitles(_gs);
        }

        function updateBubbles() {
            _circles.data(_chart.data())
                .attr('r', d => {
                    d.radius = _chart.bubbleR(d);
                    return d.radius;
                });

            _chart.doUpdateLabels(_gs);
            _chart.doUpdateTitles(_gs);
        }

        function charge(d) {
            return -Math.pow(d.radius, 2.0) * FORCE_STRENGTH;
        }

        function highlightFilter() {
            if (_chart.hasFilter()) {
                _gs.each(function (d) {
                    if (_chart.hasFilter(_chart.keyAccessor()(d))) {
                        _chart.highlightSelected(this);
                    } else {
                        _chart.fadeDeselected(this);
                    }
                });
            } else {
                _gs.each(function () {
                    _chart.resetHighlight(this);
                });
            }
        }

        return _chart.anchor(parent, chartGroup);
    };
})();
