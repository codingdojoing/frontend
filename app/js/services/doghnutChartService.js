'use strict';
angular.module('xbrlImport')
    .factory('doghnutChartService', function (dataService) {

        var data = function () {
            console.log('test');
            return [
            {
                value: dataService.getData().omzet.br1,
                color:'#FF6200',
                highlight: '#FFF3EB',
                label: 'Omzet'
            },
            {
                value: dataService.getData().kostprijsInkoop.br1,
                color: '#60A6DA',
                highlight: '#F3F8FC',
                label: 'kostprijs Inkoop'
            },
            {
                value: dataService.getData().brutomarge.br1,
                color: '#FF0000',
                highlight: '#EFF7F1',
                label: 'Brutomarge'
            }
        ]};

        // Chart.js Options
        var options =  {

            // Sets the chart to be responsive
            responsive: true,

            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,

            //String - The colour of each segment stroke
            segmentStrokeColor : '#fff',

            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 50, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps : 100,

            //String - Animation easing effect
            animationEasing : 'easeOutBounce',

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : false,

            //String - A legend template
            //legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

        };

        return {
            'data': function () {return data()},
            'options': options
        }
    });
