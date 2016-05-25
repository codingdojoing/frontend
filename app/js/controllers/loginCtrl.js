'use strict';
angular.module('xbrlImport')
    .controller('loginCtrl', function ($rootScope, $scope, $http, $window, $cookies, $location, mainService, pieChartService, lineChartService, doghnutChartService, dataService, $cookieStore) {

        $scope.popup = function() {
            console.log("show login popup");
            // center the popup window
            var left = screen.width/2 - 200;
            var top = screen.height/2 - 250;
            var popup = $window.open('https://start.exactonline.nl/api/oauth2/auth?client_id=%7B27a8cdb0-7a05-44fc-bb6a-10a6efdf4a7a%7D&redirect_uri=http://localhost:8080/static/requestToken.html&response_type=code&force_login=1', '', "top=" + top + ",left=" + left + ",width=400,height=500")
        };
        
        $scope.koppelExactDisabled = false;

        $scope.loadData = function() {
            $scope.koppelExactDisabled = true;
            $scope.$apply();
            
            alert("load data with division: " + $scope.division + "\n" + " and token: " +  $scope.token)

        }
    });
