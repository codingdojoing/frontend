/**
 * @ngdoc module
 * @name tgRadio
 * @module tgRadio
 */

angular.module('tgRadio', []);
'use strict';

/**
 * @ngdoc directive
 * @name tgRadio
 * @module tgRadio
 * @restrict E
 *
 * @description
 * Custom ING implementation of a radio.
 *
 *
 * @example
 <example module="tgRadio" deps="theguide-radio/theguide-radio.js">
    <file name="index.html">
        <form class="form-horizontal" ng-controller="tgRadioExampleCtrl">
            <div ing-form-row-fieldset="" label="Radiobuttons">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="radio">
                            <label>
                                <tg-radio></tg-radio>
                                <span>Item default</span>
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <tg-radio ng-model="isChecked"></tg-radio>
                                <span>Item bounded</span>
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <tg-radio ng-model="isChecked" disabled="disabled"></tg-radio>
                                <span>Item bounded+disabled</span>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    </file>
    <file name="tgRadioExampleCtrl.js">
        angular.module('tgRadio').controller('tgRadioExampleCtrl', function ($scope) {
            $scope.isChecked = true;
        });
    </file>
 </example>
 *
 */

angular.module('tgRadio').directive('tgRadio', [function () {

    return {
        restrict: 'E',
        replace: true,
        template: '<input type="radio" />'
    };
}]);

