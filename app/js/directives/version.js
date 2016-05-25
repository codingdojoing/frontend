'use strict';

/* Version directive */

angular.module('xbrlImport').
directive('appVersion', ['version', function (version) {
    return function (scope, elm) {
        elm.text(version.version);
    };
}]);
