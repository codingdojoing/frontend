'use strict';

/**
 * @ngdoc module
 * @name tgRibbon
 * @module tgRibbon
 */

angular.module('tgRibbon', ['tgSplitList', 'ngAnimate', 'tgUtils', 'ingGlobal']);



angular.module('tgRibbon').config(['propertyServiceProvider', function(propertyServiceProvider) {
    propertyServiceProvider.add('tgRibbon', {
        'explanationSr': 'Subnavigatie met {0} items',
        'activeElementSr': 'Huidige pagina',
        'more':  'Meer'
    });
}]);
'use strict';

/*jshint latedef: nofunc */

angular.module('tgRibbon').directive('tgClassDeferred', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // Prevent ng-animate classes from being added by Angular on init, resulting in unwanted animation.
            // Only needed for sr-only(not for ng-hide), which is required for split-list
            $timeout(function () {
                element.addClass(attrs.tgClassDeferred);
            }, 100, false);
        }
    }
}]);

'use strict';

/*jshint latedef: nofunc */

/**
 * @ngdoc directive
 * @name tgRibbon
 * @module tgRibbon
 * @restrict E
 *
 * @description
 * Directive for generating a ribbon.
 *
 * @see tg-ribbon

 * @param {Number} [init-index=0] - Preselect a ribbon item (mark as 'active').
 * @param {Object} content - scope variable or array of Json objects with all data needed for rendering items<br>
 * item.text - the text for the item<br>
 * item.href - the url to navigate to when item is clicked<br>
 * item.icon - guide icon name (string after the 'icon-' prefix in Guide documentation)
 *
 * @example
 <example module="tgRibbon" deps="spectingular-core/spectingular-core.js;theguide-ribbon/theguide-ribbon.js;theguide-utils/theguide-utils.js;theguide-split-list/theguide-split-list.js;theguide-toggle/theguide-toggle.js">

 <file name="index.html">
 <div ng-controller="RibbonExampleCtrl">
 <tg-ribbon content="content" init-index="2"></tg-ribbon>
</div>
 </file>


 <file name="ExampleCtrl.js">
 			angular.module('tgRibbon').controller('RibbonExampleCtrl', function($scope, $element, $timeout) {
            $scope.content = [];

            var icons = ['calculator', 'wealth-increase', 'house', 'holiday', 'euro', 'washing-machine'];
            for(var i in icons){
                $scope.content.push( {href: '', text: icons[i], icon: icons[i]} );
            }

            // For demo purposes, ignore routing on anchor click
            $timeout(function(){
                $element.find('a').click(function(e){e.preventDefault();});
            });

      });
 </file>

 </example>
 *
 **/

angular.module('tgRibbon').directive('tgRibbon', ['propertyService', function (propertyService) {
    return {
        restrict: 'EA',
        replace: true,
        scope: true,
        templateUrl:'app/ribbon/ribbon.html',
        controller: 'RibbonController',
        controllerAs: 'ribbon',
        link: function (scope, element, attrs, ctrl) {
            ctrl.splitList = element.controller('tgSplitList');
            ctrl.state.activeIndex = Number(attrs.initIndex);
            ctrl.content = scope.$eval(attrs.content);
            ctrl.texts.explanationSrParsed = propertyService.replaceVariables(ctrl.texts.explanationSr,[ctrl.content.length]);
        }
    };
}]);


angular.module('ingGlobal').controller('RibbonController', ['$scope', 'mqService', 'propertyService', function ($scope, mqService, propertyService) {
    var _this = this;

    this.setActiveIndex = setActiveIndex;
    this.isActiveInMoreList = isActiveInMoreList;

    this.state = {
        activeIndex: null,
        mobile: null
    };

    this.texts = angular.copy(propertyService.properties('tgRibbon'));

    this.content = null;


    /** Functions (used by template) **/

    function setActiveIndex(index) {
        _this.state.activeIndex = index;
    }

    function isActiveInMoreList(startIndexB) {
        return startIndexB !== -1 && _this.state.activeIndex >= startIndexB;
    }


    /** Code **/

    // Change dropdown config on mediaquery change
    $scope.$on('mq-changed', function (e, mq) {
        var oldState = _this.state.mobile;
        _this.state.mobile = mq.width < mqService.mqSizes.xs;

        if(oldState !== _this.state.mobile) {
            $scope.$evalAsync(function () {
                _this.splitList._initList();
            });
        }

    });


}]);


'use strict';

/*jshint latedef: nofunc */

angular.module('tgRibbon').directive('tgSyncHeight', ['tgUtils', 'mqService', '$timeout', function (tgUtils, mqService, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {

            /** IE css fix (IE is not able to inherit height in a display:table-cell element when parent height isn't set 'hard') **/
            function correctHeight() {
                element.css('height', '');

                $timeout(function () {
                    element.css('height', element[0].clientHeight + 'px');
                }, false);
            }

            if(tgUtils.getIEVersion()) {
                scope.$on('mq-changed', correctHeight);
                correctHeight();
            }
        }
    }
}]);
angular.module('tgRibbon').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/ribbon/ribbon.html',
    "<nav tg-split-list list=\"ribbon.content\" sync-list=\"true\" justify=\"true\" delegate-focus=\"true\" role=\"navigation\" aria-labelledby=\"ribbon-heading-{{$id}}\"><div class=\"sr-only\" id=\"ribbon-heading-{{$id}}\">{{ribbon.texts.explanationSrParsed}}</div><div class=\"ribbon ribbon-a h-bg-a-darker ribbon-inverse\" ng-class=\"{ 'ribbon-sm': ribbon.state.mobile, 'ribbon-lg': !ribbon.state.mobile }\"><div tg-toggle class=\"dropdown ribbon-dropdown open\"><div class=\"ribbon-wrapper\" tg-sync-height><div class=\"ribbon-container\"><ul tg-split-list-a class=\"ribbon-list\" role=\"presentation\"><li ng-repeat=\"item in splitList.A track by $index\" class=\"ribbon-list-item\"><a tg-split-item tg-split-focus-element ng-click=\"ribbon.setActiveIndex($index)\" ng-class=\"{active:$index == ribbon.state.activeIndex}\" class=\"btn btn-transparent btn-wrap ribbon-element arrow-container arrow-sm\" href=\"{{item.href}}\" aria-selected=\"{{$index == ribbon.state.activeIndex}}\"><div class=\"ribbon-element-icon\"><span class=\"icon icon-{{item.icon}} ribbon-element-icon-element\" aria-hidden=\"true\"></span></div><div class=\"ribbon-element-text\"><span ng-if=\"$index == ribbon.state.activeIndex\" class=\"sr-only\">{{ribbon.texts.activeElementSr}}</span> {{item.text}}</div><div class=\"arrow arrow-down arrow-d ribbon-element-arrow\"></div></a></li></ul></div><div class=\"ribbon-container\"><div tg-split-more-item tg-split-focus-element tg-toggle-invoker ng-class=\"{active:ribbon.isActiveInMoreList(splitList.state.startIndexB)}\" class=\"btn btn-transparent dropdown-toggle ribbon-element ribbon-element-more dropdown-toggle arrow-container arrow-sm\"><div class=\"ribbon-element-icon\"><span class=\"icon icon-more ribbon-element-icon-element\" aria-hidden=\"true\"></span></div><div class=\"ribbon-element-text\">{{ribbon.texts.more}} <span aria-hidden=\"true\" class=\"icon\" ng-class=\"{'icon-arrow-a-up': !toggle.state.open, 'icon-arrow-a-down': toggle.state.open}\"></span></div><div class=\"arrow arrow-down arrow-d ribbon-element-arrow\"></div></div></div></div><ul ng-if=\"ribbon.state.mobile\" tg-split-list-b tg-toggle-content close-on-esc=\"true\" tg-class-deferred=\"animate-collapse\" class=\"dropdown-menu dropdown-menu-right dropdown-menu-default dropdown-menu-lg ribbon-dropdown-menu ribbon-dropdown-menu-arrow arrow-border arrow-up\" role=\"presentation\"><li tg-split-item ng-repeat=\"item in splitList.B track by $index\" ng-class=\"{active:$index == ribbon.state.activeIndex}\" class=\"dropdown-menu-item\"><a tg-split-focus-element class=\"dropdown-menu-element ribbon-dropdown-menu-element\" href=\"{{item.href}}\" ng-click=\"ribbon.setActiveIndex($index)\">{{item.text}}</a></li></ul><ul ng-if=\"!ribbon.state.mobile\" tg-split-list-b tg-toggle-content close-on-esc=\"true\" close-on-click-outside=\"true\" class=\"dropdown-menu dropdown-menu-right dropdown-menu-default dropdown-menu-lg ribbon-dropdown-menu ribbon-dropdown-menu-arrow arrow-border arrow-up\" role=\"presentation\"><li tg-split-item ng-repeat=\"item in splitList.B track by $index\" ng-class=\"{active:$index == ribbon.state.activeIndex}\" class=\"dropdown-menu-item\"><a tg-split-focus-element class=\"dropdown-menu-element ribbon-dropdown-menu-element\" href=\"{{item.href}}\" ng-click=\"ribbon.setActiveIndex($index)\">{{item.text}}</a></li></ul></div></div></nav>"
  );

}]);

