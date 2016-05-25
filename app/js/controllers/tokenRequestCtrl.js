'use strict';
angular.module('xbrlImport')
    .controller('tokenRequestCtrl', function ($rootScope, $scope, $http, $window, $cookies, $location, mainService, pieChartService, lineChartService, doghnutChartService, dataService, $cookieStore) {

        $scope.requestToken = function() {
            console.log("requestToken: " + $location.absUrl().split("code=")[1]);
            //$scope.code = decodeURIComponent($location.absUrl().split("code=")[1]);

            var code = $location.absUrl().split("code=")[1];
            
            mainService.getToken(code).then(function success(response) {
                console.log(response);

                var s = window.opener.angular.element('#loginCtrl').scope();
                s.token = response.data.access_token;
                //s.koppelExactDisabled=true;
                s.$apply();

                debugger;

                mainService.getDivisions(response.data.access_token).then(function success(response) {
                    debugger;
                    console.log(response);
                    $scope.divisions = response.data;
                }, function error(response) {
                    console.log("error to get divisions")
                });

            }, function error(response){
                console.log("error to get token")
            });

            //function change(){
                //var s = window.opener.angular.element('#loginCtrl').scope();
                //s.koppelExactDisabled=true;
                //s.$apply();
            //}
        };

        $scope.selectDivision = function() {
            var s = window.opener.angular.element('#loginCtrl').scope();
            s.division = $scope.selectedDivision;
            s.$apply();
            s.loadData();
            $window.close();
        }

        $scope.requestToken();

    });
