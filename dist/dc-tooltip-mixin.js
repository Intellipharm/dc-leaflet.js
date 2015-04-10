/*!
 * dc-addons v0.5.0
 *
 * 2015-04-07 16:00:37
 *
 */
(function () {
    'use strict';

    dc.tooltipMixin = function (_chart) {

        if (_chart) {
            _chart.tip = function () {
                var selector = 'rect.bar,circle.dot,g.pie-slice path',
                    svg = _chart.svg(),
                    tip = d3.tip()
                        .attr('class', 'tip')
                        .html(function (d) {
                            return _chart.title()(d.data);
                        });

                svg.selectAll(selector).call(tip);
                svg.selectAll(selector).on('mouseover', tip.show).on('mouseleave', tip.hide);

                // remove standard tooltip
                svg.selectAll('title').remove();
            };

            _chart.tip();
        }

        return _chart;
    };
})();