/**
 * Bubble drag and drop v0.0.1 (2013-02-22)
 *
 * (c) 2012-2013 Black Label
 *
 * License: Creative Commons Attribution (CC)
 */
 
(function(HC){
/*jshint expr:true, boss:true */

        var bubDrag = HC.SVGElement.prototype.dragAndDrop = {
            //start
            start: function (e, po) {

                var p = po.graphic,
                    ch = po.series.chart,
                    epageX,
                    epageY;
                
                $(document).bind({
                    'mousemove.line': function (e2) {
                        bubDrag.step(e2, p, po)
                    },
                        'mouseup.line': function (e2) {
                        bubDrag.stop(e2, po)
                    },
                        'touchmove.line': function (e2) {
                        bubDrag.step(e2, p, po)
                    },
                        'touchend.line': function (e2) {
                        bubDrag.stop(e2, po)
                    }
                });
                
                if (e.changedTouches) {
                    epageX = e.changedTouches[0].pageX;
                    epageY = e.changedTouches[0].pageY;
                } else {
                    epageX = e.pageX;
                    epageY = e.pageY;
                    
                }
                
                p.clickX = epageX - p.translateX;
                p.clickY = epageY - p.translateY;
               
                p.offsetXdrag = epageX - (ch.container.offsetLeft + ch.plotLeft + po.plotX);
                p.offsetYdrag = epageY - (ch.container.offsetTop + ch.plotTop + po.plotY);
                
                
            },
            //step
            step: function (e, p, po) {
                e.preventDefault();


                var ch = po.series.chart,
                    pageX = e.pageX,
                    pageY = e.pageY,
                    offsetX, offsetY, x, y, tmpX, tmpY;


                if (e.originalEvent.changedTouches) {
                    pageX = e.originalEvent.changedTouches[0].pageX;
                    pageY = e.originalEvent.changedTouches[0].pageY;
                }


                offsetX = pageX - ch.container.offsetLeft; 
                offsetY = pageY - ch.container.offsetTop;

                // move element
                p.translate(pageX - p.clickX, pageY - p.clickY);
                
                po.update({
                    x: ch.xAxis[0].toValue(offsetX - p.offsetXdrag),
                    y: ch.yAxis[0].toValue(offsetY - p.offsetYdrag)
                }, false, false);

                if (ch.tooltip.options.enabled) ch.tooltip.refresh(po);
                
                if(offsetX < ch.plotLeft || offsetY < ch.plotTop || offsetY > (ch.plotHeight + ch.plotTop) || offsetX > (ch.plotWidth + ch.plotLeft)) this.stop(e,po);
            },
            //stop
            stop: function (el, po) {
                po.series.chart.redraw(false);
                $(document).unbind('.line');
            }
        };

        HC.wrap(HC.seriesTypes.bubble.prototype, 'drawPoints', function (proceed) {

            proceed.apply(this, Array.prototype.slice.call(arguments, 1));

            var points = this.data;

            $.each(points, function (i,point) {
                point.graphic.translate(0, 0)
                    .css({
                    'cursor': 'pointer'
                })
                    .on('mousedown', function (e) {

                    point.graphic.dragAndDrop.start(e, point);
                })
                    .on('touchstart', function (e) {

                    point.graphic.dragAndDrop.start(e, point);
                });
            });
        });
})(Highcharts);
