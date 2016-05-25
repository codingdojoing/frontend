'use strict';
var userModules = [];
/** Defines main module */
angular.module('xbrlImport', ['ingGlobal', 'ngSanitize', 'ngCookies', 'chart.js', 'tgFullCover', 'tc.chartjs', 'tgIcon'].concat(userModules))
    .config(function (propertyServiceProvider) {
        propertyServiceProvider.add('xbrlImport', {
            'xbrlImport': 'Importmodule voor de boekhoudpakketbestanden'
        });
    }).constant('appName', 'xbrlImport');

