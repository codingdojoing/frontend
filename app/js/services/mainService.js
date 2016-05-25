'use strict';
angular.module('xbrlImport')
    .factory('mainService', function ($http) {
        var getData = function () {
            $http({
                method: 'GET',
                url: 'http://10.130.176.241:8080/greeting',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).
            success(function(data) {
                $scope.greeting = data;
            });

        };

        var getToken = function(code) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/exact/token/' + code,
            })
        };

        var getDivisions = function(token) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/exact/divisions/',
                headers: {
                    'token' : token
                }
            })
        }

        return {
            'getData': getData,
            'getToken': getToken,
            'getDivisions' : getDivisions
        }
    })
