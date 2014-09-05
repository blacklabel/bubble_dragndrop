<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="./bubble-dragndrop.js"></script>

# Bubble drag n drop - Highcharts module

Go to project page to see this module in action: [http://blacklabel.github.io/bubble_dragndrop/](http://blacklabel.github.io/bubble_dragndrop/)


<div id="chart" style="height: 300px"></div>
<script>
window.chart = new Highcharts.Chart({
     chart: {
            renderTo:'chart',
            type: 'bubble'
        },
        title: {
            text: 'Highcharts Bubbles'
        },
        tooltip: {
            followTouchMove: true,
            followPointer: true
        },
        series: [{
            data: [[10,20,3],[5,13,10],[40,32,15]]
        }, {
            data: [[5,5,20],[21,12,10],[22,5,9]]
        }, {
            data: [[7,3,14],[13,10,4],[12,13,14]]
        }]
});
</script>

### Requirements

* Plugin requires the latest Highcharts (tested with 2.3.5)

### Installation

* Like any other Highcharts module (e.g. exporting), add `<script>` tag pointing to `bubble-dragndrop.js` below Highcharts script tag.

### Code

The latest code is available on github: [https://github.com/blacklabel/bubble_dragndrop/](https://github.com/blacklabel/bubble_dragndrop/)

### Demo

Demos are available at project's github page: [http://blacklabel.github.io/bubble_dragndrop/](http://blacklabel.github.io/bubble_dragndrop/)
