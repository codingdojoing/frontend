'use strict';
angular.module('xbrlImport')
    .factory('lineChartService', function () {

        // Chart.js Data
        var data = {
            labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            datasets: [
                {
                    label: 'Management scenario',
                    fillColor: 'rgba(255,98,0,0.2)',
                    strokeColor: 'rgba(255,98,0,1)',
                    pointColor: 'rgba(255,98,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(255,98,0,1)',
                    data: [0, 3, 4, 5, 8, 12, 15]
                },
                {
                    label: 'Neutraal scenario',
                    fillColor: 'rgba(96,166,218,0.2)',
                    strokeColor: 'rgba(96,166,218,1)',
                    pointColor: 'rgba(96,166,218,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(96,166,218,1)',
                    data: [0, 1, 2, 1, 3, 2, 1]
                },
                {
                    label: 'Pessimistische scenario',
                    fillColor: 'rgba(255,0,0,0.2)',
                    strokeColor: 'rgba(255,0,0,1)',
                    pointColor: 'rgba(255,0,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(255,0,0,1)',
                    data: [0, -1, -2, -3, -1, -4, -5]
                }
            ]
        };

        // Chart.js Data
        var data2 = {
            labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            datasets: [
                {
                    label: 'Management scenario',
                    fillColor: 'rgba(255,98,0,0.2)',
                    strokeColor: 'rgba(255,98,0,1)',
                    pointColor: 'rgba(255,98,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(255,98,0,1)',
                    data: [0, 2, 3, 4, 7, 11, 16]
                },
                {
                    label: 'Neutraal scenario',
                    fillColor: 'rgba(96,166,218,0.2)',
                    strokeColor: 'rgba(96,166,218,1)',
                    pointColor: 'rgba(96,166,218,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(96,166,218,1)',
                    data: [0, 2, 1, 2, 3, 2, 4]
                },
                {
                    label: 'Pessimistische scenario',
                    fillColor: 'rgba(255,0,0,0.2)',
                    strokeColor: 'rgba(255,0,0,1)',
                    pointColor: 'rgba(255,0,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(255,0,0,1)',
                    data: [0, -2, -1, -4, -3, -2, -3]
                }
            ]
        };

        // Chart.js Data
        var data3 = {
            labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            datasets: [
                {
                    label: 'Management scenario',
                    fillColor: 'rgba(255,98,0,0.2)',
                    strokeColor: 'rgba(255,98,0,1)',
                    pointColor: 'rgba(255,98,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(255,98,0,1)',
                    data: [0, 5, 6, 7, 10, 14, 19]
                },
                {
                    label: 'Neutraal scenario',
                    fillColor: 'rgba(96,166,218,0.2)',
                    strokeColor: 'rgba(96,166,218,1)',
                    pointColor: 'rgba(96,166,218,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(96,166,218,1)',
                    data: [0, 5, 4, 5, 6, 5, 7]
                },
                {
                    label: 'Pessimistische scenario',
                    fillColor: 'rgba(255,0,0,0.2)',
                    strokeColor: 'rgba(255,0,0,1)',
                    pointColor: 'rgba(255,0,0,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(255,0,0,1)',
                    data: [0, -2, -5, -3, -2, -1, -4]
                }
            ]
        };


        // Chart.js Options
        var options =  {

            // Sets the chart to be responsive
            responsive: true,

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            // Function - on animation progress
            onAnimationProgress: function(){},

            // Function - on animation complete
            onAnimationComplete: function(){},

            //String - A legend template
            legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        };


        return {
            'data': data,
            'data2': data2,
            'data3': data3,
            'options': options
        }
    });
