'use strict';
angular.module('xbrlImport')
    .controller('mainCtrl', function ($rootScope, $scope, $http, $cookies, $location, mainService, pieChartService, lineChartService, doghnutChartService, dataService, $cookieStore) {

        $scope.login=function() {
            var url='https://start.exactonline.nl/api/oauth2/auth?client_id=27a8cdb0-7a05-44fc-bb6a-10a6efdf4a7a&redirect_uri=http%3a%2f%2flocalhost:7000&response_type=token&force_login=1';
            window.location.replace(url);
        };

        var hash = $location.path().substr(1);

        var splitted = hash.split('&');
        var params = {};
        for (var i = 0; i < splitted.length; i++) {
            var param  = splitted[i].split('=');
            var key    = param[0];
            var value  = param[1];
            params[key] = value;
            $rootScope.accesstoken=params;

            console.log('param.........', key, value);
        }
        //$cookieStore.put('test', 'test')

        console.log('cookies', $cookieStore.get('ExactOnlineLogin'));
        if (angular.isDefined(params.access_token)) {

            $http({
                method: 'GET',
                url: 'https://start.exactonline.nl/api/v1/current/Me?$select=CurrentDivision',
                headers: {
                    'access_token': params.access_token,
                    'Authorization': 'Bearer ' + params.access_token,
                    'Accept': 'application/json'
                }
            }).
            success(function(data) {
                $scope.greeting = data;
            });
        }


            //$scope.showGraphs = function () {
        //    return angular.isDefined(params.access_token);
        //};

        //
        //
        //console.log('getting data from the REST service');
        //$http.get('http://rest-service.guides.spring.io/greeting').
        //$http.get('http://10.130.176.241:8080/greeting').

         //In the api: @CrossOrigin(origins = "http://bl00047.nl.europe.intranet:7000")

        //$http({
        //    method: 'GET',
        //    url: 'http://172.16.33.117:8080/hackaton',
        //    headers: {
        //        'Content-Type': 'application/json'
        //    }
        //}).
        //success(function(data) {
        //    $scope.greeting = data;
        //});

        $scope.getData = function () {
            return mainService.getData();
        };

        //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        //$scope.data = [300, 500, 100];

        // Chart.js Data
        $scope.data1 = function () {
            return doghnutChartService.data();
        };

        $scope.data2 = function () {
            return pieChartService.data();
        };

        $scope.data3 = lineChartService.data;

        // Chart.js Options
        $scope.options1 =  doghnutChartService.options;
        $scope.options2 =  pieChartService.options;
        $scope.options3 =  lineChartService.options;

        $scope.legend = '';

        $scope.tabelData = dataService.getData();

        $scope.showEdit = false;

        $scope.brutomarge = function () {
            return dataService.getData().omzet.br1 - dataService.getData().kostprijsInkoop.br1;
        };

        $scope.bedrijfsresultaat = function () {
            var data = dataService.getData();
            var sum = data.personeelskosten.br1 + data.afschrijvingen.br1 + data.overigeKosten.br1;
            var brutomarge = $scope.brutomarge();
            if (brutomarge < sum) {
                return 0;
            }
            return brutomarge - sum;
        };

        $scope.resultaat = function () {
            return $scope.bedrijfsresultaat() - dataService.getData().rentelasten.br1;
        };

        $scope.isToggled = 'omzet';
        $scope.toggleChart = function (what) {
            // console.log(isToggled);
            $scope.data3 = '';
            $scope.isToggled = what;

            switch ($scope.isToggled){
                case 'kosten':
                    $scope.data3 = lineChartService.data2;
                    break;
                case 'bedrijfsresultaat':
                    $scope.data3 = lineChartService.data3;
                    break;
                default:
                    //omzet
                    $scope.data3 = lineChartService.data;
            }
        }

    });
