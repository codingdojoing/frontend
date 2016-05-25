'use strict';

/**
 * @ngdoc overview
 * @name ingGlobal
 *
 * @description
 * ingGlobal
 *
 **/

angular.module('ingGlobal', [], ['$provide', function($provide) {
    var PLURAL_CATEGORY = {ZERO: 'nul', ONE: 'een', TWO: 'twee', FEW: 'weinig', MANY: 'veel', OTHER: 'overig'};
    $provide.value('$locale', {
        'DATETIME_FORMATS': {
            'AMPMS': {
                '0': 'AM',
                '1': 'PM'
            },
            'DAY': {
                '0': 'zondag',
                '1': 'maandag',
                '2': 'dinsdag',
                '3': 'woensdag',
                '4': 'donderdag',
                '5': 'vrijdag',
                '6': 'zaterdag'
            },
            'MONTH': {
                '0': 'januari',
                '1': 'februari',
                '2': 'maart',
                '3': 'april',
                '4': 'mei',
                '5': 'juni',
                '6': 'juli',
                '7': 'augustus',
                '8': 'september',
                '9': 'oktober',
                '10': 'november',
                '11': 'december'
            },
            'SHORTDAY': {
                '0': 'zo',
                '1': 'ma',
                '2': 'di',
                '3': 'wo',
                '4': 'do',
                '5': 'vr',
                '6': 'za'
            },
            'SHORTMONTH': {
                '0': 'jan.',
                '1': 'feb.',
                '2': 'mrt.',
                '3': 'apr.',
                '4': 'mei',
                '5': 'jun.',
                '6': 'jul.',
                '7': 'aug.',
                '8': 'sep.',
                '9': 'okt.',
                '10': 'nov.',
                '11': 'dec.'
            },
            'fullDate': 'EEEE d MMMM y',
            'longDate': 'd MMMM y',
            'medium': 'd MMM y HH:mm:ss',
            'mediumDate': 'd MMM y',
            'mediumTime': 'HH:mm:ss',
            'short': 'dd-MM-yy HH:mm',
            'shortDate': 'dd-MM-yy',
            'shortTime': 'HH:mm'
        },
        'NUMBER_FORMATS': {
            'CURRENCY_SYM': '\u20ac',
            'DECIMAL_SEP': ',',
            'GROUP_SEP': '.',
            'PATTERNS': {
                '0': {
                    'gSize': 3,
                    'lgSize': 3,
                    'macFrac': 0,
                    'maxFrac': 3,
                    'minFrac': 0,
                    'minInt': 1,
                    'negPre': '-',
                    'negSuf': '',
                    'posPre': '',
                    'posSuf': ''
                },
                '1': {
                    'gSize': 3,
                    'lgSize': 3,
                    'macFrac': 0,
                    'maxFrac': 2,
                    'minFrac': 2,
                    'minInt': 1,
                    'negPre': '\u00a4\u00a0-',
                    'negSuf': '',
                    'posPre': '\u00a4\u00a0',
                    'posSuf': ''
                }
            }
        },
        'id': 'nl-nl',
        'pluralCat': function (n) {  if (n === 1) {   return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
    });
}]);

/**
 * String.removeSpaces
 * @returns {string}
 */
String.prototype.removeSpaces = function () {
    return (this + '').replace(/[\s\xA0\t\n]/g,'');
};

/* IE8 SPECIFIC SHIMS */

if (!Array.prototype.map)
{
    Array.prototype.map = function(fun /*, thisArg */)
    {
        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length > 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = new Array(len);
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++)
        {
            // NOTE: Absolute correctness would demand Object.defineProperty
            //       be used.  But this method is fairly new, and failure is
            //       possible only if Object.prototype or Array.prototype
            //       has a property |i| (very unlikely), so use a less-correct
            //       but more portable alternative.
            if (i in t) {
                res[i] = fun.call(thisArg, t[i], i, t);
            }
        }

        return res;
    };
}

/**
 *
 *  This module is injected on the open site. It includes directives, services and filters ONLY intended for open.
 *  Example: ingOpen.a which renders a lock icon next to all links to restricted (MING)
 *
 **/

angular.module('ingOpen', ['ingGlobal'], function() {

});



/* END IE8 SPECIFIC SHIMS */

/**
 * @ngdoc directive
 * @name ingOpen.directive:a
 * @restrict E
 *
 * @description This directive is intended to add a lock icon to all hyperlinks, not buttons, on the open site e.g. www.ing.nl referring to the restricted site e.g. mijn.ing.nl.
 */

'use strict';

angular.module('ingOpen').directive('a', function(){
    return {
        restrict: 'E',
        link: function (scope, element,attrs) {
            if(!attrs.href || element.hasClass('btn')) {
                return;
            }
            var ming = /(mijn|mijnzakelijk).ing.nl/;
            if(ming.test(attrs.href)) {
                element.append('<i class="icon icon-xs icon-gray icon-lock l-ml-1 l-mr-1"></i>');
            }
        }
    };
});
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-add-body-classes
 * @restrict A
 * @param {String} contains a space separated list of classes to add. Use this directive to triggen css rules, for example for print styling
 *
 * @description
 * For print functionality it can be usefull to hide certain portions of the page to which you do not have access. Use this directive to hide em.
 * It will place classes on the body. The generic print style will hide them.
 * For hiding/ showing of angular components in your app: use the available print classes
 *
 * Also other directives could use this: for instance when opening a modal, popover etc.
 */

angular.module('ingGlobal').directive('ingAddBodyClasses',function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var body = angular.element('body');
            body.addClass(attrs.ingAddBodyClasses);
            scope.$on('$destroy', function(){
                body.removeClass(attrs.ingAddBodyClasses);
            });
        }
    };
});
'use strict';

/** Binds the expression once at startup
 *
 * Usage: <span ing-bind-once="myExpression"></span>
 *
 */

angular.module('ingGlobal').directive('ingBindOnce', ['$parse', function ($parse) {
    return {
        compile: function compile(element, attrs) {
            var expr = $parse(attrs.ingBindOnce);
            return function link(scope, element) {
                element.text(expr(scope));
            };
        }
    };
}]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-collapsible
 * @restrict EA
 * @scope =
 *
 * @param {string} header The header title of the collapsible
 * @param {boolean} expanded Initial state of the collapsible
 * @param {boolean} omitDefaultStyle Optional parameter to omit the panel-default style class
 *
 * @description
 * Directive for displaying an Collapsible.
 * Regulates the open/close state of the Collapsible.
 * Provides a default sliding animation.
 * Can be used within the context of an CollapsibleGroup directive (if present).
 *
 * @example
 <example module="ingGlobal">
    <file name="ing-collapsible.html">
        <div ing-collapsible expanded="true" header="Title default">
            <div>Lorem ipsum dolor sit amet.</div>
        </div>

         <div ing-collapsible expanded="true" omit-default-style="true" header="Title 2">
            <div>Lorem ipsum dolor sit amet.</div>
         </div>
    </file>
 </example>
 */

angular.module('ingGlobal').directive('ingCollapsible', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?ingCollapsibleGroup',
        scope: {
            header: '@header',
            isExpanded: '=expanded',
            omitDefaultStyle: '=?'
        },
        link: function (scope) {
            scope.expanded = scope.isExpanded || false; // init state
            scope.omitDefaultStyle = scope.omitDefaultStyle || false; //init state

            /** Toggle the collapsible. */
            scope.toggle = function () {
                scope.expanded = !scope.expanded;
                scope.$emit('updateCollapsibleStates', scope);
            };

            /** set the correct expanded state. */
            scope.$on('updateCollapsibleState', function (event, collapsible) {
                if(!angular.equals(collapsible, scope)) {
                    scope.expanded = false;
                }
            });
        },
        template:
        '<div class="panel panel-sm" ng-class="{\'panel-default\': !omitDefaultStyle}" role="group" aria-expanded="{{expanded}}">' +
            '<div class="panel-heading collapsible-header">'+
                '<div class="panel-title">' +
                    '<a role="button" href="" class="h-block" ng-class="{collapsed: !expanded}" ng-click="toggle()">' +
                        '<i class="icon icon-xxs icon-collapsible-toggle" aria-hidden="true"></i>{{header}}' +
                    '</a>' +
                '</div>' +
            '</div> '+
            '<div class="collapsible-details collapse" ng-class="{in: expanded}">' +
                '<div class="panel-body" aria-hidden="{{!expanded}}">' +
                    '<div ng-transclude></div>' +
                '</div>' +
            '</div>' +
        '</div>'
    };
});

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-collapsible-group
 * @restrict EA
 * @scope =
 *
 * @description
 * Optional parent CollapsibleGroup Directive for displaying a
 * collection of self-registering Collapsible's.
 * Ensures that max. one stays open at any time.
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-collapsible-group.html">
    <div ing-collapsible-group class="panel-group">
        <div ing-collapsible expanded="true" header="Title 1" class="panel condensed panel-default">
           <p>Lorem ipsum sit amet, consectetur adipisicing elit.</p>
        </div>

         <div ing-collapsible expanded="false" header="Title 2" class="panel condensed panel-default">
            <p>Lorem ipsum sit amet, consectetur adipisicing elit.</p>
        </div>

        <div ing-collapsible expanded="false" header="Title 3" class="panel condensed panel-default">
            <p>Lorem ipsum sit amet, consectetur adipisicing elit.</p>
        </div>
    </div>
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingCollapsibleGroup', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div class="panel-group panel-bordered" role="group" ng-transclude></div>',
        controller: 'ingCollapsibleGroupCtrl'
    };
});

angular.module('ingGlobal').controller('ingCollapsibleGroupCtrl', ['$scope', function ($scope) {
    /** upon opening an other collapsible, close others by broadcasting that a collapsible has been opened. */
    $scope.$on('updateCollapsibleStates', function (event, collapsible) {
        if(event.stopPropagation) { // only stop propagation if the event is emitted
            event.stopPropagation();
        }
        $scope.$broadcast('updateCollapsibleState', collapsible);
    });
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-control-group
 * @deprecated as of 11/2014
 * Eventually this component will be removed
 */

/*jshint loopfunc: true */
angular.module('ingGlobal').directive('ingControlGroup', function () {
    return {
        restrict: 'EA',
        scope: {
            label: '@label',
            'for': '@for'
        },
        replace: true,
        transclude: true,
        template:
            '<div class="form-group">' +
                '   <label class="control-label col-md-3" for="{{for}}">{{label}}</label>' +
                '   <div class="col-md-9" ng-transclude></div>' +
            '</div>'
    };
});

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-deffered-spinner
 * @restrict A
 *
 * @description
 * This directive could be used on MING tab pages to indicate that the page is loading. In short, this directive displays an
 * overlay within a loading panel and spinner.
 *
 * Note that the overlay is a absolute positioned element, so the container you place it in needs to have either content or a height!
 *
 * It will toggle this component based on the not resolved promises in the
 * loadingQueue service that match the id that is used for this directive. See the example below for more information.
 *
 * Use this directive in conjunction with infDefferedVisible to also hide the content under the spinner.
 * See the second example. Note the watching of the same id's in the loadingQueue
 *
 * @example
 <example>
 <file name=example.html>
 <div class="tg" data-ng-controller="myController">
    Just the spinner. Content under the overlay is visible / overlay is transparent
    <div class="panel panel-bordered panel-tabs-primary">
        <div ing-deffered-spinner="myIdentifierForThisQuery">&nbsp;</div>
        <div>This is the content that you were waiting for</div>
    </div>
 </div>
 </file>

 <file name=example2.html>
     <div class="tg" data-ng-controller="myController">
         The spinner with content under it not visible during spinning  using the ingDefferedVisible directive
         <div class="panel panel-bordered panel-tabs-primary">
             <div ing-deffered-spinner="myIdentifierForThisQuery">&nbsp;</div>
             <div ing-deffered-visible="myIdentifierForThisQuery">This is the content that you were waiting for</div>
         </div>
     </div>
 </file>

 <file name=example3.html>
     <div class="tg" data-ng-controller="myController">
         The spinner with content under it not visible during spinning  using the ingDefferedVisible directive
         <div class="panel panel-bordered panel-tabs-primary">
             <div ing-deffered-spinner="myIdentifierForThisQuery" loading-text="Some fancy loadingtext">&nbsp;</div>
             <div ing-deffered-visible="myIdentifierForThisQuery">This is the content that you were waiting for</div>
         </div>
     </div>
 </file>


 <example>
 */
angular.module('ingGlobal').directive('ingDefferedSpinner', ['loadingQueue', function (loadingQueue) {
    return {
        restrict: 'A',
        template:
        '<div data-ng-show="!isLoadingQueueReady" aria-hidden="{{isLoadingQueueReady}}" class="overlay overlay-inline overlay-margin overlay-centered overlay-sm backdrop backdrop-a">' +
        '   <div class="overlay-content">' +
        '       <div class="panel panel-a panel-bordered panel-shadow-b" ng-style="spinnerTopMargin">' +
        '           <div class="panel-body l-pt-2 l-pb-2">' +
        '               <div class="spinner-text h-inline-block">' +
        '                   <ing-spinner></ing-spinner><span>{{loadingText}}</span>' +
        '               </div>' +
        '           </div>' +
        '       </div>' +
        '    </div>' +
        '</div>' ,
        link: function (scope, element, attr) {
            // This styling is required to make sure that the overlay-inline is not displayed on the full page.
            var parent = element.parent();
            if(parent.css('position') === 'static' || parent.css('position') === '') {
                parent.css('position', 'relative');
            }

            var topMargin = ( parent.height() - element.height()) / 3;
            scope.spinnerTopMargin = {'margin-top': (topMargin <= 10) ? 10 : topMargin + 'px'};
            scope.loadingText = angular.isDefined(attr.loadingText) ? attr.loadingText : 'Even geduld a.u.b.';

            scope.$watch(function () {
                return loadingQueue.isReady(attr.ingDefferedSpinner);
            }, function (newValue) {
                scope.isLoadingQueueReady = newValue;
            });
        }
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-deffered-visible
 * @restrict A
 *
 * @description
 * This directive toggles the visibility of the element based on the finishing of promises in the loadingQueue.
 * Toggling visibility keeps box-layout fixed. If you don't want this behavior, use ng-show in conjunction with the loadingQueue.
 * The directive implements the loadingQueue service in to watch for promise completion.
 *
 * Use this directive in conjunction with the defferedSpinner directive in order to create a 'blocking spinner which hide the content spinner tab ;-)'
 * See also docs of ingDefferedSpinner
 *
 * @example
 <example>
 <file name=example.html>
 <div class="tg" data-ng-controller="myController">
    <div class="panel panel-bordered panel-tabs-primary">
        <div ing-deffered-visible="myIdentifierForThisQuery">
            <div class="panel-body panel-bg-mig-a-l l-p-0">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="row">
                            <div class="col-lg-12">Placeholder for the tab content. it will be visible when all promises are resolved in the loadingQueue</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
 </file>
 <example>
 */

angular.module('ingGlobal').directive('ingDefferedVisible', ['loadingQueue', function (loadingQueue) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watch(function () {
                return loadingQueue.isReady(attr.ingDefferedVisible);
            }, function (ready) {
                if(ready){
                    element.css({'visibility':'visible'});
                    element.attr('aria-hidden', 'false');
                    element.removeAttr('aria-busy');
                } else {
                    element.css({'visibility':'hidden'});
                    element.attr('aria-hidden', 'true');
                    element.attr('aria-busy', 'true');
                }
            });
        }
    };
}]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-draggable
 * @restrict A
 *
 * @param {string=} override - If this attribute is present, the draggable will not handle repositioning for you.
 * @param {function=} on-drag-begin - A function can be passed to this attribute that will be fired when the user starts dragging the element (e.g. after a mousedown event). The current coordinates are passed as an argument in the form `{x: <xCoordPx>, y: <yCoordPx>}`.
 * @param {function=} on-drag - A function can be passed to this attribute that will be fired when the user drags the element (e.g. after a mousemove event). The offset in pixels relative to the starting position is passed as an argument in the form `{x: <xOffsetPx>, y: <yOffsetPx>}`.
 * @param {function=} on-drag-end - A function can be passed to this attribute that will be fired when the user stops dragging the element (e.g. after a mouseup event). The offset in pixels relative to the starting position is passed as an argument in the form `{x: <xOffsetPx>, y: <yOffsetPx>}`.
 *
 * @description
 * This directive allows the developer to detect when the user drags an element on the screen.
 * It supports dragging  using the mouse or touch, although the latter needs the module ngTouch to be
 * present and included (e.g. `angular.module('myModule', ['ingGlobal', 'ngTouch'])`).
 *
 * This directive can be used in two ways. The first option is to let the directive handle the
 * positioning of the element. There is a caveat though: the draggable is repositioned by
 * setting [the `position` property](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
 * to `relative` and then setting its `top` and `left` values.
 *
 * If this is not what you want, the other option is to handle the repositioning yourself.
 * To enable this, simply add the `override` attribute and provide your own event handlers
 * that handle the repositioning of your element in response to a drag action by the user
 * to one or more of the `on-drag-begin`, `on-drag` and `on-drag-end` attributes.
 * Usually, you will only need the offset provided to the `on-drag` handler and use that to
 * reposition the element to make it follow the movement of the user while dragging.
 *
 * @example
 <example module="ingGlobal">
    <file name="draggable.html">
        <div ng-controller="Ctrl">
            <span ing-draggable id="draggable" on-drag-begin="startDrag" on-drag="drag" on-drag-end="stopDrag"
                  class="h-cursor-pointer panel panel-bordered h-bg-a">Drag me! ({{offset.x}}, {{offset.y}})</span>
        </div>
    </file>
    <file name="draggable-controller.js">
        function Ctrl($scope) {
            $scope.offset = {x: 0, y: 0};

            $scope.startDrag = function(coordinates){
                console.log('Started dragging');
            };
            $scope.drag = function(offset){
                $scope.$apply(function(){
                    $scope.offset = offset;
                });
            };
            $scope.stopDrag = function(offset){
                console.log('Stopped dragging');
            };
        }
    </file>
 </example>
 */
angular.module('ingGlobal').directive('ingDraggable', ['$document', '$window', '$injector', function ($document, $window, $injector) {
    return {
        restrict: 'A',
        controller: 'ingDraggableCtrl',
        link: function (scope, element, attrs, controller) {
            // This property is needed to prevent the browser from intercepting
            // the event handling. See
            // http://msdn.microsoft.com/en-us/library/ie/jj583807%28v=vs.85%29.aspx#control_default_touch
            element.css('-ms-touch-action', 'none');
            element.css('touch-action', 'none');
            
            if(angular.isUndefined(attrs.override)) {
                if(element.css('position') === 'static'){
                    element.css({position:'relative' })
                }
                // Initialise the position to no offset.
                // (Which is what auto should be doing as well, but
                // by setting it to a number we can make offset calculations.)
                if(element.css('top') === 'auto'){
                    element.css('top', 0);
                }
                if(element.css('left') === 'auto'){
                    element.css('left', 0);
                }
            }

            // Note: although ngTouch (see $swipe below) is _supposed_ to also handle mousemove
            // events, this is not working as expected right now. This probably has to do with
            // http://www.ng-newsletter.com/posts/angular-on-mobile.html#comment-1091275169
            // Therefore, we still add regular mousemove, mousedown and mouseup event listeners.
            var onPointermove = function(event){
                if($window.PointerEvent || $window.MSPointerEvent) {
                    // (Our version of) jQuery does not yet standardise MSPointerEvents,
                    // so just access the event object directly (which should have pageX and pageY)
                    // instead of jQuery's normalised one.
                    event = event.originalEvent;
                }
                event.preventDefault();

                controller.drag({
                    x: event.pageX,
                    y: event.pageY
                });
            };

            var onPointerup = function(event){
                if($window.PointerEvent || $window.MSPointerEvent) {
                    // (Our version of) jQuery does not yet standardise MSPointerEvents,
                    // so just access the event object directly (which should have pageX and pageY)
                    // instead of jQuery's normalised one.
                    event = event.originalEvent;
                }
                event.preventDefault();

                if($window.PointerEvent) {
                    $document.off('pointermove', onPointermove);
                    $document.off('pointerup', onPointerup);
                } else if ($window.MSPointerEvent) {
                    $document.off('MSPointerMove', onPointermove);
                    $document.off('MSPointerUp', onPointerup);
                } else {
                    $document.off('mousemove', onPointermove);
                    $document.off('mouseup', onPointerup);
                }

                controller.stopDrag({
                    x: event.pageX,
                    y: event.pageY
                });
            };

            var onPointerdown = function(event){
                if($window.PointerEvent || $window.MSPointerEvent) {
                    // (Our version of) jQuery does not yet standardise MSPointerEvents,
                    // so just access the event object directly (which should have pageX and pageY)
                    // instead of jQuery's normalised one.
                    event = event.originalEvent;
                }

                event.preventDefault();
                
                controller.startDrag({
                    x: event.pageX,
                    y: event.pageY
                });

                if($window.PointerEvent) {
                    // Pointer events are the only way of capturing touch input in IE 11
                    // See http://msdn.microsoft.com/en-us/library/ie/dn304886%28v=vs.85%29.aspx
                    $document.on('pointermove', onPointermove);
                    $document.on('pointerup', onPointerup);
                } else if ($window.MSPointerEvent) {
                    // MS Pointer events are the only way of capturing touch input in IE 10
                    // See http://msdn.microsoft.com/en-us/library/ie/hh673557%28v=vs.85%29.aspx
                    $document.on('MSPointerMove', onPointermove);
                    $document.on('MSPointerUp', onPointerup);
                } else {
                    // For browsers with separate touch and mouse events, implement mouse support as well
                    // (Touch support is done below using $swipe)
                    $document.on('mousemove', onPointermove);
                    $document.on('mouseup', onPointerup);
                }
            };

            if($window.PointerEvent) {
                element.bind('pointerdown', onPointerdown);
            } else if ($window.MSPointerEvent) {
                element.bind('MSPointerDown', onPointerdown);
            } else {
                element.bind('mousedown', onPointerdown);
            }

            // Only add swipe listeners when it is available --
            // this prevents errors when the implementer has not loaded the ngTouch module.
            if($injector.has('$swipe')){
                var $swipe = $injector.get('$swipe');
                $swipe.bind(element, {
                    start: controller.startDrag,
                    move: controller.drag
                });
            }
        }
    };
}]);

angular.module('ingGlobal')
.controller('ingDraggableCtrl', ['$scope', '$element', '$attrs', '$parse', 'utilsService', function($scope, $element, $attrs, $parse, utilsService){
    var startCoordinates, startPosition;

    this.startDrag = function(coordinates){
        startCoordinates = coordinates;
        if(!utilsService.isEmpty($attrs.onDragBegin)){
            $parse($attrs.onDragBegin)($scope)(coordinates);
        }
        if(angular.isUndefined($attrs.override)) {
            startPosition = {
                // We're assuming that these are either 0,
                // or a pixel value set by this directive.
                // (After all, the user should've overriden it otherwise.)
                top: parseInt($element.css('top').replace('px', '')),
                left: parseInt($element.css('left').replace('px', ''))
            };
        }
    };

    this.drag = function(coordinates){
        var offset = {
            x: coordinates.x - startCoordinates.x,
            y: coordinates.y - startCoordinates.y
        };
        if(!utilsService.isEmpty($attrs.onDrag)){
            $parse($attrs.onDrag)($scope)(offset);
        }
        if(angular.isUndefined($attrs.override)) {
            $element.css({
                top: (startPosition.top + offset.y) + 'px',
                left:  (startPosition.left + offset.x) + 'px'
            });
        }
    };

    this.stopDrag = function(coordinates){
        var offset = {
            x: coordinates.x - startCoordinates.x,
            y: coordinates.y - startCoordinates.y
        };
        if(!utilsService.isEmpty($attrs.onDragEnd)){
            $parse($attrs.onDragEnd)($scope)(offset);
        }
    };
}]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-dropdown-positioning
 * @restrict EA
 *
 * @description
 * The ing-dropdown-positioning is used to position and size a dropdown box
 *
 * Using <label> inside a dropdown box using dropdown-positioning can cause problems with older android browsers.
 * This is caused by a bug in Android-browser 4.4.2 and below.
 * - css overflow-y prevents a normal click behaviour on <label>.
 *
 **/
angular.module('ingGlobal').directive('ingDropdownPositioning', ['$window', function( $window ) {
    return {
        restrict: 'EA',
        controller: 'DropdownPositioningController',
        link: function (scope, element, attr, ctrl) {

            var visibilityUnwatch = function(){};

            /**
             * Set listeners for changes in height, window size and scroll position while visible
             * @param {boolean} isVisible - whether dropdown is visible
             */
            function setListeners(isVisible) {
                angular.element($window)[isVisible ? 'bind':'unbind']('resize scroll', ctrl.setDropdownPosition);

                if(isVisible) {
                    visibilityUnwatch = scope.$watch( getDropdownHeight, ctrl.setDropdownPosition );
                } else  {
                    visibilityUnwatch();
                }
            }


            /**
             * Helper functions for dropdown watchers
             */

            function dropdownVisible(){
                return element.is(':visible');
            }

            function getDropdownHeight(){
                return element.outerHeight(true);
            }


            // Initial code

            scope.$watch(dropdownVisible, function(isVisible) {
                setListeners(isVisible);
                if(isVisible) {
                    element.scrollTop = 0;
                    ctrl.setDropdownPosition();
                }
            });

        }
    }
}]);


/**
 * @ngdoc interface
 * @name ingGlobal.directive:dropdown-positioning-controller
 * @restrict EA
 * @requires ingGlobal.service:utilService
 *
 * @description
 The ing-dropdown-positioning is used to position and size a dropdown box
 **/
angular.module('ingGlobal').controller('DropdownPositioningController', ['$window', '$element', '$attrs', function($window, $element, $attrs) {

    var MINIMUM_DROPDOWN_SIZE = 100,
        dropdownMenuStyle = {},
        invokerHeight;

    var ctrl = this;

    /**
     * Initial method called by listeners. Computes and sets new styles when necessary
     */
    ctrl.setDropdownPosition = function() {
        var scrollTop = $element[0].scrollTop;

        // Reset styles
        angular.extend(dropdownMenuStyle, {'top':'auto', 'bottom': 'auto', 'max-height': 'none', 'overflow-y': 'auto'});
        $element.css(dropdownMenuStyle);

        // Compute viewport dependent styles
        angular.extend(dropdownMenuStyle, ctrl.computeStyles());
        $element.css(dropdownMenuStyle);

        // Reset scrollTop, since setting style causes scrollTop position to reset
        $element[0].scrollTop = scrollTop;

    }

    /**
     * Compute right styling based on current dropdown position in viewport
     * @returns {object} appropiate dropdown styling
     */
    ctrl.computeStyles = function() {
        var dropStyle = {},
            elementRect = $element[0].getBoundingClientRect(),
            windowHeight = $window.innerHeight,
            bottomOverFlow = elementRect.bottom - windowHeight;

        if(bottomOverFlow > 0) { // action necessary
            invokerHeight = invokerHeight || parseInt($attrs.invokerHeight, 10);
             var availableHeightAbove = elementRect.top - invokerHeight,
                 availableHeightBelow = windowHeight - elementRect.top;

              if (availableHeightBelow < MINIMUM_DROPDOWN_SIZE && availableHeightAbove > availableHeightBelow) {
                // drop-up
                dropStyle = {'bottom': invokerHeight, 'max-height': availableHeightAbove};
            } else {
                // drop-down
                dropStyle = {'max-height': availableHeightBelow};
            }
        }
        return dropStyle;
    }


}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-dropdown-toggle
 * @restrict A
 *
 * @description
 * Directive for toggling a dropdown menu, intended to be used with The Guide dropdown component.
 *
 * @example
 * <example module="ingGlobal">
 *     <file name="dropdown.html">
 *         <div class="dropdown">
 *             <button class="btn btn-default dropdown-toggle icon-position icon-after icon-position-xs" type="button" id="exampleDropdownToggle" ing-dropdown-toggle>
 *                 Dropdown
 *                 <i aria-hidden="true" class="icon dropdown-toggle-icon"></i>
 *             </button>
 *             <ul class="dropdown-menu dropdown-menu-default" role="menu" aria-labelledby="exampleDropdownToggle">
 *                 <li class="dropdown-menu-item" role="presentation">
 *                     <a role="menuitem" tabindex="-1" href="#">Action</a>
 *                 </li>
 *                 <li class="dropdown-menu-item" role="presentation">
 *                     <a role="menuitem" tabindex="-1" href="#">Another action</a>
 *                 </li>
 *                 <li class="dropdown-menu-item" role="presentation">
 *                     <a role="menuitem" tabindex="-1" href="#">Something else here</a>
 *                 </li>
 *             </ul>
 *         </div>
 *     </file>
 * </example>
 */
angular.module('ingGlobal')
    .directive('ingDropdownToggle', ['$document', function ($document) {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element) {
                element.on('click', function (event) {
                    var parent = element.parent(),
                        shouldOpen = !parent.hasClass('open');
                    element.triggerHandler('blur');
                    event.stopPropagation();

                    angular.element($document[0].querySelector('.dropdown.open')).removeClass('open');
                    parent.toggleClass('open', shouldOpen);
                });

                // we need jQuery, cause jqLite can't bind an event with a namespace
                $document.on('click.dropdown-' + scope.$id, function () {
                    element.parent().removeClass('open');
                });

                scope.$on('$destroy', function () {
                    $document.off('click.dropdown-' + scope.$id);
                });
            }
        };
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-fingertabs
 * @restrict EA
 *
 *
 * @description
 * Directive for displaying a fingertab style item / account selector
 *
 *
 * @example
<example module="ingGlobal">
    <file name="ing-fingertabs.html">
        <div ng-controller="Ctrl" class="h-bg-b">
        <div ing-fingertabs init-select="1">

            <div ing-info-tab>
                <b>Betaalrekeningen</b>
            </div>

            <div ing-tab ng-repeat="tab in myTabs">
                <div class="h-float-right">
                    <b>{{tab.saldo | currency}}</b>
                </div>

                <div>{{tab.account}}</div>
                <div>{{tab.naam}}</div>
            </div>

             <div ing-info-tab>
                <b>Totaalsaldo</b>
                <div class="h-float-right">
                    <b>{{total}}</b>
                </div>
             </div>

        </div>
        </div>
    </file>
    <file name="Ctrl.js">
        function Ctrl($scope){
            var names = ['B. Pecht', 'Marlies Aarden', 'Sjoerd Van Houttum', 'Maximiliaan Mas', 'Jaap Klerks'],
            myTabs = [],
            total = 0;

            // Add some random accounts
            for(var i = 0; i < 5; i ++) {
                var saldo = Math.random() * 200;
                total += saldo;

                myTabs.push({
                    account: 6525+i,
                    saldo: saldo,
                    naam: names[i]
                });
            }

            $scope.myTabs = myTabs;
            $scope.total = total.toFixed(2);
        }
    </file>
</example>
*/

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-fingertabs#tabSelected
 * @eventOf ingGlobal.directive:ing-fingertabs
 * @eventType  emit on $scope
 * @description This event is emitted when a new tab is selected. The whole object in scope of the repeat is sent as the event data.
 */

angular.module('ingGlobal').directive('ingFingertabs',['$timeout', function($timeout){
    return{
        restrict:'EA',
        replace: true,
        transclude: true,
        require: '^?ingItemScroller',
        scope: true,
        link: function(scope, element, attrs, ctrl) {

            attrs.$observe('initSelect', function() {
                var corrIndex = Number(attrs.initSelect); // = 2

                if(ctrl){
                    // If the fingertab is inside an itemscroller,
                    // an offset can be defined in the latter's start-viewport attribute.
                    // Unfortunately, this doesn't work,
                    // as the item-scroller is not necessarily initialised yet at this point.
                    // Since this feature is not used in practice,
                    // and fixing it should entail an entire rewrite of both directives,
                    // we manually set the offset to 0 if it is undefined.
                    // This is the value expected in the projects currently using this directive,
                    // and at least fixes issue GAN-511.
                    var offset = ctrl.$scope.offset || 0;
                    if (corrIndex >= ((Number(offset)) + Number(ctrl.$scope.viewPort)) ) {
                        scope.initSelect = corrIndex;
                        scope.$emit('ingScroll', 'to', corrIndex);
                    } else if(corrIndex < Number(ctrl.$scope.viewPort)) {
                        scope.initSelect = corrIndex;
                    }
                } else {
                    scope.initSelect = corrIndex;
                }
            });

            if (ctrl) {
                // correcting the initSelect to its proper place inside the viewport
                ctrl.$scope.$watch('offset', function(sVP) {
                    $timeout(function(){
                        if (attrs.initSelect >= Number(sVP) && (Number(attrs.initSelect) >= ctrl.$scope.viewPort) === false) {
                            scope.initSelect = attrs.initSelect;
                        }
                        else if (Number(attrs.initSelect) === Number(sVP)) {
                            scope.initSelect = 0;
                        } else {
                            scope.initSelect = Number(attrs.initSelect) - sVP;
                        }
                    });
                });
            }
        },
        template: '<ol class="list-group list-group-sm list-group-mig-a" ng-transclude role="listbox" selected-tab="{{selected}}">',
        controller: 'ingFingertabsCtrl'
    };
}]);

angular.module('ingGlobal').controller('ingFingertabsCtrl', ['$scope' ,function($scope) {
    this.$scope = $scope;
}]);

angular.module('ingGlobal').directive('ingTab',[ '$timeout',  function($timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^ingFingertabs',
        link: function(scope, element, attrs ,ctrl) {
            scope.selectTab = function(tabObj, event) {
                ctrl.$scope.selected = tabObj;
                scope.$emit('tabSelected', tabObj);
                if(event) {
                    event.preventDefault();
                }
            };
            scope.isSelected = function() {
                return angular.equals(scope.tab, ctrl.$scope.selected);
            };

            ctrl.$scope.$watch('initSelect', function() {
                $timeout(function(){
                    if((Number(ctrl.$scope.initSelect) === scope.$index) && angular.isUndefined(ctrl.$scope.selected)) {
                        scope.selectTab(scope.tab);
                    }
                })
            });
        },
        transclude: true,
        template: '<li role="option" data-ng-click="selectTab(tab, $event)" ' +
                'class="list-group-item row-{{$index}}" ' +
                'ng-class="{active : isSelected()}" ' +
                'ng-mouseenter="hover = true" ng-mouseleave="hover = false"><a href="#" ng-transclude>' +
                '</a></li>'
    };
}]);

angular.module('ingGlobal').directive('ingInfoTab', function(){
    return {
        restrict:'EA',
        replace: true,
        require: '^ingFingertabs',
        transclude: true,
        template: '<li class="list-group-item" ng-transclude></li>'
    };
});

'use strict';
/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-date-format
 * @restrict A
 *
 * @description
 * DateFormat directive which formats a string as a date with dash separators if that is possible
 * 10102015 or 10-102015 will be transformed into 10-10-2015
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-date-format.html">
 <form role="form" class="form-horizontal">
 <div ing-form-row label="Date" for="i1">
 <input type="text" class="form-control" id="i1" ing-date-format ng-model="model.date">
 </div>
 </form>
 </file>
 </example>
 */
angular.module('ingGlobal').directive('ingDateFormat', ['dateUtils', function (dateUtils) {
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function () {
                var value = dateUtils.formatIngDate(ctrl.$viewValue);
                if(value !== ctrl.$viewValue){
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                }
                return value;
            });

            ctrl.$formatters.push(function () {
                return dateUtils.formatIngDate(ctrl.$modelValue);
            });
        }
    }
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-placeholder
 * @restrict A
 *
 * @description
 * Placeholder directive which is compatible with older browsers ( < IE9 )
 *
 * ### CSS
 * The class "placeholder" is placed on the input element when the placeholder is active.
 *
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-placeholder.html">
 <form role="form" class="form-horizontal">
     <div ing-form-row label="Placeholder" for="i1">
        <input type="text" class="form-control" id="i1" ing-placeholder="this is the placeholder" ng-model="model.phone">
     </div>
 </form>
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingPlaceholder', ['$timeout', function ($timeout) {
    return {
        require: 'ngModel',
        priority: 1,
        link: function (scope, element, attrs) {

            // Get placeholder
            var nonScopedIngPlaceholder = attrs.ingPlaceholder,
                scopedIngPlaceholder,
                ingPlaceholder;

            try {
                scopedIngPlaceholder = scope.$eval(attrs.ingPlaceholder);
            } catch (e) {
                scopedIngPlaceholder = undefined;
            }

            ingPlaceholder = angular.isDefined(scopedIngPlaceholder) ? scopedIngPlaceholder : nonScopedIngPlaceholder;


            // Set placeholder depending on model value
            var modelValue;

            scope.$watch(attrs.ngModel, function (val) {
                modelValue = val;
            });

            var togglePlaceholder = function (action) {
                if (action === 'focus') {
                    if (modelValue === null || modelValue === undefined || modelValue === '') {
                        if(element.hasClass('placeholder')) {
                            element.val(modelValue);
                        }
                    }
                    element.removeClass('placeholder');
                } else {
                    if (modelValue === null || modelValue === undefined || modelValue === '') {
                        var elementVal = element.val();
                        var error = element.hasClass('ng-invalid');
                        if (!error || elementVal === null || elementVal === undefined || elementVal === '') {
                            element.val(ingPlaceholder);
                            element.addClass('placeholder');
                        }
                    }
                }
            };

            $timeout(function () {
                scope.$apply(togglePlaceholder());
            });

            element.bind('focus', function () {
                scope.$apply(togglePlaceholder('focus'));
            });

            element.bind('blur', function () {
                $timeout(function() {
                    // Timeout is needed for IE9, this prevents a change in the model with the value of the placeholder
                    // when using the tab key. What happens is when the tab key is pressed, the value changes to the
                    // placeholder value and the tab is executed afterwards which causes the model to change. Other
                    // browsers doesn't have this problem, other browsers first tabs out the field and the changes the
                    // textfield text which results in angular not seeing it as a change in the model.
                    scope.$apply(togglePlaceholder('blur'));
                });
            });
        }
    };
}]);

'use strict';

/**
 * @ngdoc inputType
 * @name ingGlobal.directive:ing-shrink-font
 * @restrict A
 * @element input
 *
 *
 * @param {Object=} [ing-shrink-font='{ 11:22, 12:20, 13:18, 14:17, 15:16, 16:15, 17:14 }']    A key value pair object with the amount of characters as key and the font-size as value.
 *
 * @description
 * Shrinks the font size as amount of typed characters increases
 *
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-shrink-font.html">
     <form class="form-horizontal" role="form">
         <div ing-form-row label="Shrink font">
            <input type="text" decimals="3" ing-shrink-font="{1:20,2:19,3:18,4:17,5:16,6:17,7:16,8:15,9:14}" class="form-control" ing-placeholder="0,40" name="amount" ng-model="data.amount" ing-required>
         </div>
     </form>
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingShrinkFont', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var customSizeMap = scope.$eval(attrs.ingShrinkFont),
                defaultSizeMap = { 11: 22, 12: 20, 13: 18, 14: 17, 15: 16, 16: 15, 17: 14 };

            var sizeMap = customSizeMap || defaultSizeMap;

            element.css('fontSize', scope.getInitialFontSize(sizeMap));

            element.bind('keyup blur change', function () {
                element.css('fontSize', scope.computeFontSize(element.val(), sizeMap));
            });
        },
        controller: 'shrinkFontController'
    }
});


angular.module('ingGlobal').controller('shrinkFontController', ['$scope', function ($scope) {
    $scope.getInitialFontSize = function (sizeMap) {
        var i = 0;
        for (var key in sizeMap) {
            if (i === 0) {
                return sizeMap[key];
            }
        }
    }

    $scope.computeFontSize = function (inputString, sizeMap) {

        /** Get min and max chars from sizeMap. */
        var i = 0, sizeMapLength = 0, firstKey, lastKey, j;

        for (j in sizeMap) {
            sizeMapLength++;
        }

        for (var key in sizeMap) {
            if (i === 0) {
                firstKey = key;
            } else if (i === sizeMapLength - 1) {
                lastKey = key;
            }
            i++;
        }


        /**  Return font size. */
        var inputStrLength = inputString.length;
        if (inputStrLength <= firstKey) {
            return (sizeMap[firstKey]);
        } else if (inputStrLength >= lastKey) {
            return (sizeMap[lastKey]);
        } else {
            return (sizeMap[inputStrLength]);
        }
    }
}]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-checkbox-group
 * @restrict EA
 *
 * @param {String=} ngModel                         reference to scope variable storing the selected checkbox items
 * @param {int} ing-min-items                       optional numeric value representing the minimal selected items
 * @param {int} ing-max-items                       optional numeric value representing the maximum selected items
 *
 * @description Use this directive to select multiple checkbox values with a min and max restriction. The validation
 * works with the ing-validation-group and the ing-notify directives
 *
 * @example
 <example>
 <file name="ing-checkbox-group.html">
 <form role="form" class="form-horizontal" name="carForm" ng-controller="Ctrl">
     <div ing-validation-group name="carsGroup">
          <div ing-form-row-fieldset label="Cars">
             <div name="carsCheckboxGroup" ng-model="selectedCars" ing-checkbox-group ing-min-items="1" ing-max-items="2" class="checkboxGroup">
                 <label class="checkbox" ng-repeat="car in cars">
                    <input type="checkbox" ing-checkbox-value="{{car}}" name="cars" id="car{{$index}}"> {{car.value}}
                 </label>
             </div>
          </div>
     </div>
</form>
 </file>

 <file name="script.js">function Ctrl($scope){$scope.cars = [{'key':'0','value':'Opel'},{'key':'1','value':'Ford'},{'key':'2','value':'Mazda'},{'key':'3','value':'Volkswagen'}];};</file>
 </example>
 */

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-checkbox-value
 * @param {Object} ing-checkbox-value               value for the added value in the ngModel of the ing-checkbox-group,
 *                                                  this can be a any value as long as it can be pushed into an array
 * @restrict A
 * @requires ingGlobal.directive:ing-checkbox-group
 *
 * @description Use this directive with the ing-checkbox-group. This directive adds the selected item to the ngModel of the ing-checkbox-group.

 */


angular.module('ingGlobal').directive('ingCheckboxGroup', function () {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
            checkboxItems: '=ngModel'
        },
        controller: ['$scope', function ($scope) {
            if (angular.isUndefined($scope.checkboxItems)) {
                $scope.checkboxItems = [];
            }

            $scope.items = angular.copy($scope.checkboxItems);

            this.addCheckboxItem = function (value) {
                $scope.items.push(value);
                $scope.updateModel($scope.items);
            };
            this.removeCheckboxItem = function (index) {
                $scope.items.splice(index, 1);
                $scope.updateModel($scope.items);
            };
            this.getIndexOf = function (value) {
                for (var i = 0; i < $scope.items.length; i++) {
                    if (angular.equals($scope.items[i], value)) {
                        return i;
                    }
                }
                return -1;
            };
            this.getItems = function () {
                return $scope.items;
            }
        }],
        link: function (scope, element, attrs, ngModel) {
            scope.updateModel = function (value) {
                ngModel.$setViewValue(value);
            };
        }
    };
}).directive('ingCheckboxValue', function () {
    return {
        restrict: 'A',
        require: '^ing-checkbox-group',
        scope: true,
        link: function (scope, elem, attrs, checkboxGroup) {
            scope.value = scope.$eval(attrs.ingCheckboxValue);
            function changeHandler() {
                var checked = elem.prop('checked');
                var index = checkboxGroup.getIndexOf(scope.value);

                if (checked && index === -1) {
                    checkboxGroup.addCheckboxItem(scope.value);
                } else if (!checked && index !== -1) {
                    checkboxGroup.removeCheckboxItem(index);
                }
            }

            function setupHandler() {
                var checked = elem.prop('checked');
                var index = checkboxGroup.getIndexOf(scope.value);

                if (checked && index === -1) {
                    elem.prop('checked', false);
                } else if (!checked && index !== -1) {
                    elem.prop('checked', true);
                }
            }

            elem.on('change', function () {
                scope.$apply(changeHandler);
            });

            scope.$watchCollection(function () {
                return checkboxGroup.getItems()
            }, setupHandler);
        }
    };
});

'use strict';
/**
 * @description
 *   Provide two select boxes for modifying a Date. minYear and maxYear are required.
 */
angular.module('ingGlobal').directive('ingDateMonthNavigation', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            viewDate: '=viewDate',
            minYear: '=',
            maxYear: '='
        },
        controller: 'ingDateMonthNavigationCtrl',
        template:
            '<fieldset class="fieldset-row form-inline l-ml-0 l-mr-0">' +
                '<legend class="sr-only">Geselecteerde kalendermaand</legend>' +
                '<div class="form-group">' +
                    '<label class="sr-only" for="month-{{$id}}">Maand</label>' +
                    '<select ng-model="month" ng-options="val as monthNames[val] for val in monthRange" class="form-control" id="month-{{$id}}"></select>' +
                '</div>' +
                '<div class="form-group l-ml-1">' +
                    '<label class="sr-only" for="year-{{$id}}">Jaar</label>' +
                    '<select ng-model="year" ng-options="value for value in yearRange" class="form-control" id="year-{{$id}}"></select>' +
                '</div>' +
            '</fieldset>'
    };
});

angular.module('ingGlobal').controller('ingDateMonthNavigationCtrl', ['$scope', 'dateFilter', function($scope, dateFilter) {
    // TODO: Make dynmaic
    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var monthNames = {};
    angular.forEach(months, function(month) {
        monthNames[month] = dateFilter(new Date(2013, month, 1), 'MMMM');
    })
    $scope.monthNames = monthNames;
    $scope.monthRange = months;
    $scope.yearRange  = [];

    var currentYear = new Date().getFullYear(),
        minYear     = currentYear - 5,
        maxYear     = currentYear + 5;

    function setYearRange(min, max) {
        if (min <= max) {
            var years = [];

            for (var year = min; year <= max; year++) {
                years.push(year);
            }
            $scope.yearRange = years;
        }
    }

    $scope.$watch('minYear', function (_minYear_) {
        if (_minYear_ !== undefined) {
            minYear = _minYear_;
        }
        setYearRange(minYear, maxYear);
    });

    $scope.$watch('maxYear', function (_maxYear_) {
        if (_maxYear_ !== undefined) {
            maxYear = _maxYear_;
        }
        setYearRange(minYear, maxYear);
    });

    $scope.$watch('viewDate', function(date) {
        $scope.month = date.getMonth();
        $scope.year  = date.getFullYear();
    }, true);

    $scope.$watch('month', function(month) {
        $scope.viewDate.setMonth(month);
    });
    $scope.$watch('year', function(year) {
        $scope.viewDate.setFullYear(year);
    });
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-date-month-view
 * @restrict EA
 *
 * @describe Provides a view of the month specified by the viewDate month
 *
 * @param {Date=} viewDate            used to determine the focus of the calendar.
 * @param {Date=} minDate             used to determine the earliest date possible.
 * @param {Date=} maxDate             used to determine the latest date possible.
 * @param {Date=} selectedDate        used to update the date in case of selection.
 * @param {Function=} [dateDisabled]  callback(viewDate, date) that determines whether that date should be disabled
 * @param {Function=} [classes]       callback(viewDate, date) that determines the additional classes for that date
 */
angular.module('ingGlobal').directive('ingDateMonthView', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            viewDate: '=viewDate',
            minDate: '=minDate',
            maxDate: '=maxDate',
            selectedDate: '=selectedDate',
            dateDisabled: '=dateDisabled',
            classes: '=classes'
        },
        template:
            '<table class="table">' +
                '<thead>'+
                    '<tr>' +
                        '<th class="rockwell-l-small" ng-repeat="label in labels">{{label}}</th>' +
                    '</tr>' +
                '</thead>'+
                '<tbody>'+
                    '<tr ng-repeat="row in rows">' +
                        '<td ng-repeat="date in row">' +
                            '<button class="btn btn-block" type="button" ng-class="{{date.classes}}" ng-click="select(date.date)" ng-disabled="date.disabled"><span>{{ date.date.getDate() }}</span></button>' +
                        '</td>' +
                    '</tr>' +
                '</tbody>'+
            '</table>',
        controller: 'ingDateMonthViewCtrl'
    }
});

angular.module('ingGlobal').controller('ingDateMonthViewCtrl', ['$scope', 'utilsService', 'dateUtils', '$locale', function($scope, utilsService, dateUtils, $locale) {
    $scope.labels = [];
    for (var i=1; i<=7; i++) {
        $scope.labels.push($locale.DATETIME_FORMATS.SHORTDAY[i % 7]);
    }

    function createDate(date) {
        var classes = { day: true },
            disabled = false;

        // Add disabled state through callback
        if( typeof $scope.dateDisabled === 'function' ) {
            disabled = $scope.dateDisabled($scope.viewDate, date);
            classes.disabled = disabled;
        }

        // Add classes through callback
        if (typeof $scope.classes === 'function') {
            angular.extend(classes, $scope.classes($scope.viewDate, date));
        }

        return {
            date: date,
            classes: classes,
            disabled: disabled
        };
    }

    $scope.select = function(date) {
        $scope.selectedDate = new Date(date);
    };

    $scope.$watch('[viewDate, selectedDate, minDate, maxDate, classes, dateDisabled]', function() {
        var viewDate = $scope.viewDate;
        if (viewDate !== undefined) {
            var firstMonthDay     = dateUtils.firstDayOfMonth(viewDate),
                lastMonthDay      = dateUtils.lastDayOfMonth(viewDate),
                firstCalenderDate = dateUtils.mondayOfWeek(firstMonthDay),
                lastCalenderDate  = dateUtils.sundayOfWeek(lastMonthDay),
                datesInRange      = dateUtils.datesInRange(firstCalenderDate, lastCalenderDate),
                calendarDates     = datesInRange.map(createDate);


            $scope.rows = utilsService.chunk(calendarDates, 7);

        }
    }, true)
}]);



'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-datepicker-input
 * @restrict EA
 *
 * @param {String=} ngModel           String representation in the dd-MM-yyyy format
 * @param {Function=} [dateDisabled]  callback(viewDate, date) that determines whether that date should be disabled
 * @param {String=} [ingMinDate]      String representation in the ^^ format for the minimal date: should be an object on your scope
 * @param {String=} [ingMaxDate]      String representation in the ^^ format for the maximal date :should be an object on your scope
 * @param {String=} [popoverLabel]    The title of the popover should be equal to the label of the control group.
 * @param {String=} [ingPlaceholder]  The placeholder.
 * @param {Function=} [ngFocus]       Expression with access to the parent scope when this element attains focus.
 *
 *
 * @description Use this directive to add a date input field with datepicker to your application. It provides you with a correctly setup tooltip, a datepicker,
 * and the input field. You can add any required validators directly to the input tag. Additionally you can set the ingMinDate and ingMaxDate to provide the
 * range of the datepicker. The default range is +- 5 years from the current year.
 *
 * @example
 <example>
    <file name="datepicker.html">
        <div ng-controller="Ctrl" class="form-horizontal">
            <fieldset>
                <div ing-validation-group class="form-group">
                    <label ing-form-grid-label for="the_id">Pick a date</label>
                    <div ing-form-grid-field>
                        <input ing-datepicker-input ng-model="startDate" id="the_id" name="datepickerExample" date-disabled="disabled" ing-date ing-required ing-min-date="minDate" ing-max-date="maxDate" popover-label="Ingangsdatum" class="l-w-40"/>
                    </div>
                </div>
            </fieldset>
        </div>
        <div ng-controller="Ctrl" class="form-horizontal">
            <fieldset>
                <div ing-validation-group class="form-group">
                    <label ing-form-grid-label for="the_second_id">Pick another date</label>
                    <div ing-form-grid-field>
                        <input ing-datepicker-input ng-model="empty.model" id="the_second_id" name="datepickerExampleWithPlaceholder" date-disabled="disabled" ing-date ing-required ing-min-date="minDate" ing-max-date="maxDate" popover-label="Ingangsdatum" ing-placeholder="'dd-mm-yyyy'" class="l-w-40"/>
                    </div>
                 </div>
            </fieldset>
        </div>
    </file>

    <file name="script.js">
        function Ctrl($scope, dateFilter) {
            $scope.startDate = dateFilter(new Date(), 'dd-MM-yyyy');
            $scope.minDate   = dateFilter(new Date(), 'dd-MM-yyyy');
            var nextYear = new Date();
            nextYear.setFullYear(nextYear.getFullYear() + 1);
            $scope.maxDate   = dateFilter(nextYear, 'dd-MM-yyyy');

        }
    </file>
 </example>
 */
angular.module('ingGlobal').directive('ingDatepickerInput', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            'inputName': '@name',
            'inputId': '@id',
            'date': '=ngModel',
            'customDisabled': '=dateDisabled',
            'minDate': '=ingMinDate',
            'maxDate': '=ingMaxDate',
            'popoverLabel': '@popoverLabel',
            'placeholder': '@ingPlaceholder',
            'focusFunction': '&ngFocus'
        },
        template:
            '<div class="input-group">' +
                '<input type="text" id="{{inputId}}-input" name="{{inputName}}" class="form-control" ng-focus="focusFunction()"  ng-model="date" ng-blur="formatDateField()" ing-placeholder="{{placeholder}}">' +
                '<span class="input-group-btn">' +
                    '<div ing-popover>' +
                        '<a ing-popover-invoker class="btn btn-default" ng-focus="focusFunction()">'+
                            '<span class="sr-only">Selecteer datum</span>' +
                            '<i class="icon icon-calendar icon-lg icon-dark-grey"></i>'+
                        '</a>'+
                        '<div ing-popover-content size="auto" padding="false">' +
                            '<h3 class="datepicker-heading">{{popoverLabel}}</h3>'+
                            '<div ing-datepicker></div>'+
                        '</div>'+
                    '</div>'+
                '</span>' +
            '</div>',
        controller: 'ingDatepickerCtrl',
        link:  function (scope, element) {
            scope.init = true;
            scope.dateField = element.children('input');
        }
    };
});


angular.module('ingGlobal').directive('ingDatepicker', function () {
    return {
        replace:true,
        template:
            '<div class="datepicker">'+
                '<div class="datepicker-content">' +
                    '<div ing-date-month-navigation view-date="state.viewDate" min-year="minYear" max-year="maxYear"></div>'+
                    '<div ing-date-month-view selected-date="state.selectedDate" min-date="minDate" max-date="maxDate" view-date="state.viewDate" classes="classes" date-disabled="disabled"></div>' +
                '</div>'+
            '</div>'
    }
});


angular.module('ingGlobal').controller('ingDatepickerCtrl', ['$timeout', '$rootScope', '$scope', 'dateUtils', 'dateFilter', function($timeout, $rootScope, $scope, dateUtils, dateFilter) {
    $scope.state = {
        viewDate: new Date() // Use today as default viewDate
    };
    $scope.$watch('date', function(date) {
        var newDate = dateUtils.parseIngDate(date);
        if (dateUtils.isValid(newDate)) {

            $scope.state.selectedDate = newDate;

            var viewDate = new Date(newDate);
            viewDate.setDate(1);
            $scope.state.viewDate = viewDate;
        }
    }, true);

    $scope.formatDateField = function(){
        var enteredDate = dateUtils.parseIngDate($scope.date);
        if (angular.isDefined(enteredDate) && dateUtils.isValid(enteredDate)) {
            $scope.date = dateFilter(enteredDate, 'dd-MM-yyyy');
        }
    };

    $scope.$watch('state.selectedDate', function (date) {
        var scopeDate = dateUtils.parseIngDate($scope.date);
        if (!angular.isDefined(scopeDate) || (scopeDate.getTime() !== date.getTime())){
            // When state.selectedDate was changed to a value different than $scope.date value,change $scope.date value.
            $scope.date = dateFilter(date, 'dd-MM-yyyy');
        }

        $rootScope.$broadcast('close-all-popovers');

        // Put focus back on the input
        if(!$scope.init && $scope.dateField) {
            $timeout(function () {
                $scope.dateField.focus();
            });
        }

        $scope.init = false;
    }, true);

    $scope.classes = function(viewDate, date) {
        var selected = $scope.state.selectedDate !== undefined && dateUtils.compare(date, $scope.state.selectedDate) === 0;
        var classes = {
            today:    dateUtils.compare(date, new Date())    === 0,
            'btn-selected': selected,
            selected: selected,
            'btn-general' : !this.today && ! this['btn-selected'],
            previousMonth: date.getFullYear() < viewDate.getFullYear() || date.getMonth() < viewDate.getMonth(),
            nextMonth:     date.getFullYear() > viewDate.getFullYear() || date.getMonth() > viewDate.getMonth()
        };

        if ( typeof $scope.customClasses === 'function' ) {
            angular.extend(classes, $scope.customClasses(viewDate, date));
        }

        return classes;
    };

    $scope.disabled = function(viewDate, date) {
        var customDisabled = typeof $scope.customDisabled === 'function' && $scope.customDisabled(viewDate, date),
            parsedMinDate  = dateUtils.parseIngDate($scope.minDate),
            parsedMaxDate  = dateUtils.parseIngDate($scope.maxDate),
            minDateDisabled = parsedMinDate !== undefined && dateUtils.isValid(parsedMinDate) && dateUtils.compare(date, parsedMinDate) === -1,
            maxDateDisabled = parsedMaxDate !== undefined && dateUtils.isValid(parsedMaxDate) && dateUtils.compare(date, parsedMaxDate) ===  1;

        return customDisabled || minDateDisabled || maxDateDisabled;
    };

    function yearOrUndefined(date) {
        var dt = dateUtils.parseIngDate(date);
        return dt !== undefined ? dt.getFullYear() : undefined;
    }

    $scope.$watch('minDate', function(minDate) {
        $scope.minYear = yearOrUndefined(minDate);
    }, true);
    $scope.$watch('maxDate', function(maxDate) {
        $scope.maxYear = yearOrUndefined(maxDate);
    }, true);

}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-form-grid
 * @restrict EA
 * @scope false
 *
 * @description
 *
 * Use this directive to configure the global widths of the labels and input column in the form. All legends, labels,
 * and input columns will adhere to the specified ratios when they are marked by the ing-form-label(for label and legend elements, one can say the left side of the form) and ing-form-field(for a field containing input(s) or static form controls, one can say the right side of the form). Otherwise they will default to 3/6. Use this directive in
 * combination ing-form-grid-label and ing-form-grid-label.
 *
 * <div ing-notification type="info">Please make use of the ing-form-row and ing-form-row-fieldset directives as much as possible. They internally use
 * ing-form-grid-label and ing-form-grid-field directives.</div>
 *
 * @param {Number@} labelWidth  width to use for the labels and legends columns
 * @param {Number@} fieldWidth  width to use for the input columns
 *
 * @example
 <example module="ingGlobal">

 <file name="ing-form-grid.html">
 <div ng-controller="Ctrl">
     <form role="form" class="form-horizontal" ing-form-grid label-width="3" field-width="7">
        <fieldset>
            <legend>Form grid on form level</legend>
            <div ng-include src="'fg-A.html'"></div>
            <div ng-include src="'fg-B.html'"></div>
        </fieldset>
     </form>

     <form class="form-horizontal">
         <fieldset>
            <legend>Label and field width not specified</legend>
            <div ng-include src="'fg-C.html'"></div>
        </fieldset>
     </form>

    <form class="form-horizontal">
        <fieldset>
            <legend>Form grid on form row level</legend>
            <div ng-include src="'fg-D.html'"></div>
        </fieldset>
    </form>
 </div>
 </file>

<file name="fg-A.html">
 <!-- note: this example doesn't use ing-form-row and ing-form-row-fieldset, which are recommended -->

 <div class="form-group" ing-form-grid label-width="3" field-width="3">
     <div ing-form-grid-label class="control-label">
         <div class="icon-position icon-after icon-position-sm">
             <label for="id_a">A. Label and field</label>
             <span ing-info-popover config="popoverA" class="icon-position-icon"></span>
         </div>
     </div>
     <div ing-form-grid-field>
         <div class="row">
             <div class="col-lg-12"><input id="id_a" ng-model="data.a" class="form-control"></div>
         </div>
     </div>
 </div>
</file>

<file name="fg-B.html">
 <!-- note: this example doesn't use ing-form-row and ing-form-row-fieldset, which are recommended -->

 <fieldset class="fieldset-row" ing-form-grid label-width="3" field-width="3">
     <legend class="control-label" ing-form-grid-label>
         <div class="icon-position icon-after icon-position-sm">
             B. Label
             <span ing-info-popover config="popoverB" class="icon-position-icon"></span>
         </div>
     </legend>
     <div class="col-lg-5">
         <div class="row">
             <div class="col-lg-12">
                 <div class="input-group">
                     <label class="sr-only" for="price-from2">amount</label>
                     <input type="text" class="form-control input-price l-w-60" id="price-from2">
                     <span class="input-group-additive l-w-10" aria-hidden="true">,</span>
                     <label class="sr-only" for="price-from-decimal2">Price from decimal</label>
                     <input type="text" name="price-from-decimal2" class="form-control input-price l-w-20" id="price-from-decimal2">
                 </div>
             </div>
         </div>
     </div>
 </fieldset>
</file>

<file name="fg-C.html">
 <!-- note: this example doesn't use ing-form-row and ing-form-row-fieldset, which are recommended -->

 <div class="form-group">
      <div ing-form-grid-label class="control-label">
          <div class="icon-position icon-after icon-position-sm">
              <label for="id_c">C. Default ratios (label and field)</label>
              <span ing-info-popover config="popoverC" class="icon-position-icon"></span>
          </div>
      </div>
     <div ing-form-grid-field>
         <div class="row">
             <div class="col-lg-12"><input id="id_c" ng-model="data.c" class="form-control"></div>
         </div>
     </div>
 </div>
</file>

<file name="fg-D.html">
 <div ing-form-row label="D. Form-row combined with form grid" ing-form-grid field-width="4" class="form-text-only" info-popover="popoverD">
    <p class="form-control-static">Static content</p>
 </fieldset>
</file>



 <file name="Ctrl.js">
 function Ctrl($scope) {
    $scope.popoverA = {
        title: 'Grid A',
        text: 'The label element has directive ing-form-grid-label and therefore inherits the label width specified at form level. The field (div wrapping input element) has directive ing-form-grid-field and therefore inherits the field width specified at form level.'
    }
    $scope.popoverB = {
        title: 'Grid B',
        text: 'The legend element(\'label equivalent\' for fieldsets) has directive ing-form-grid-label and therefore inherits the label width specified at form level. The field (div wrapping .input-group) has a grid-class(col-lg-5 in this case) and no ing-form-grid-* directive. Therefore it doesn\'t inherit grid values specified at form level.'
    }
    $scope.popoverC = {
        title: 'Grid C',
        text: 'See example A. Since label-width and field-width are not specified for this form, default form ratio will be chosen (3:6)'
    }
    $scope.popoverD = {
        title: 'Grid D',
        text: 'Form grid can be applied on row level as well. When used with ing-form-row or ing-form-row-fieldset, subdirectives ing-form-grid-label and ing-form-grid-field will be automatically applied by the form-row directives.'
    }
}
</file>

 </example>
 */


angular.module('ingGlobal').directive('ingFormGrid', function () {
    return {
        restrict: 'A',
        scope: false,
        controller: 'formGridController'
    }
});

angular.module('ingGlobal').controller('formGridController', ['$attrs', 'formGridService', function ($attrs, gridSvc) {
    var ctrl = this;

    $attrs.$observe('labelWidth', function (w) {
        ctrl.labelWidth = Number(w) || gridSvc.labelWidth;
    });

    $attrs.$observe('fieldWidth', function (w) {
        ctrl.fieldWidth = Number(w) || gridSvc.fieldWidth;
    });

}]);

angular.module('ingGlobal').directive('ingFormGridLabel', ['formGridService', function (gridSvc) {
    return {
        restrict: 'EA',
        replace: true,
        require: '?^ingFormGrid',
        link: function(scope, element, attrs, ctrl){
            if(ctrl){
                scope.$watch(function(){return ctrl.labelWidth}, function(){
                    if(ctrl.labelWidth){
                        gridSvc.setClass(element, ctrl.labelWidth);
                    }
                });
            } else {
                gridSvc.setClass(element, gridSvc.labelWidth);
            }
        }
    }
}]);


/* For align content with fields when no label column present */
angular.module('ingGlobal').directive('ingFormGridOffset', ['formGridService', function (gridSvc) {
    return {
        restrict: 'EA',
        replace: true,
        require: '?^ingFormGrid',
        link: function(scope, element, attrs, ctrl){
            if(ctrl){
                scope.$watch(function(){return ctrl.labelWidth}, function(){
                    if(ctrl.labelWidth){
                        gridSvc.setClass(element, ctrl.labelWidth, true);
                    }
                });
            } else {
                gridSvc.setClass(element, gridSvc.labelWidth, true);
            }
        }
    }
}]);

angular.module('ingGlobal').directive('ingFormGridField', ['formGridService', function (gridSvc) {
    return {
        restrict: 'EA',
        replace: true,
        require: '?^ingFormGrid',
        link: function(scope, element, attrs, ctrl){
            if(ctrl){
                scope.$watch(function(){return ctrl.fieldWidth}, function(){
                    if(ctrl.fieldWidth){
                        gridSvc.setClass(element, ctrl.fieldWidth);
                    }
                });
            } else {
                gridSvc.setClass(element, gridSvc.fieldWidth);
            }
        }
    }
}]);


angular.module('ingGlobal').service('formGridService', ['$timeout', function ($timeout) {
    function setClass(element, width, offset) {
        $timeout(function(){
            if(offset) {
                element.addClass('col-lg-offset-' + width);
            } else {
                element.addClass('col-lg-' + width);
            }
        });
    }

    return {
        setClass : setClass,
        labelWidth : 3,
        fieldWidth: 6
    }
}]);






'use strict';

/**
* @ngdoc directive
* @name ingGlobal.directive:ing-form-row
* @restrict EA
* @scope true
*
* @param {String=} label The label(legend in case of a ing-form-row-fieldset) text for the form input. When left empty, no label or legend(in case of a form-row-fieldset) will be rendered and fields will have an offset equal to the label width
* @param {String=} for The id of the input inside the control group (note: not needed for ing-form-row-fieldset, since this directive uses a legend instead of a label.). If the for attribute is not provided, a span element will be rendered instead of a label. (In case )
* @param {Object}  info-popover Contains config for an <a href="#/spectingular/ingGlobal.directive:ing-info-popover">ing-info-popover</a>
*
* @description
*
* Directive for providing markup for a form row. When a row contains more than one input(multiple radiobuttons for instance,) one needs to use the ing-form-row-fieldset directive.
* Both the ig-form-row and ing-form-row-fieldset directives make use of the default grid. See <a href="#/spectingular/ingGlobal.directive:ing-form-grid">ing-form-grid</a> for more information.
* Do not forget the for attribute and the id of the corresponding field for good accessibility
* <div ing-notification type="info">Important: this page contains documentation for both the ing-form-row and ing-form-row-fieldset directives. Please take a close look at the examples below to see their differences.</div>
*
* @example
<example module="ingGlobal">

<file name="ing-fr.html">
<form class="form-horizontal" ng-controller="Ctrl">
 <fieldset>
    <legend class="sr-only">Examples ing-form-row and ing-form-row-fieldset</legend>
    <ng-include src="'fr-A.html'"></ng-include>
    <ng-include src="'fr-B.html'"></ng-include>
    <ng-include src="'fr-C.html'"></ng-include>
    <ng-include src="'fr-D.html'"></ng-include>
    <ng-include src="'fr-E.html'"></ng-include>
    <ng-include src="'fr-F.html'"></ng-include>
    <ng-include src="'fr-G.html'"></ng-include>
    <ng-include src="'fr-H.html'"></ng-include>
 </fieldset>
</form>
</file>

<file name="fr-A.html">
<div ing-form-row label="A. Single input" for="input_a">
    <div class="row">
        <div class="col-lg-12">
            <input class="form-control" id="input_a">
        </div>
    </div>
</div>
</file>

<file name="fr-B.html">
<div ing-form-row label="B. With popover" for="input_b" info-popover="popoverA">
    <div class="row">
        <div class="col-lg-12">
            <input class="form-control" id="input_b">
        </div>
    </div>
</div>

</file>

<file name="fr-C.html">
<div ing-form-row-fieldset label="C. Multiple inputs">
    <div class="row">
        <div class="col-lg-2">
            <div class="form-group">
                <label class="sr-only" for="input_c1">screenreader text</label>
                <input class="form-control" id="input_c1">
            </div>
        </div>
        <div class="col-lg-3">
            <div class="form-group">
                <label class="sr-only" for="input_c2">screenreader text</label>
                <input class="form-control" id="input_c2">
            </div>
        </div>
        <div class="col-lg-5">
            <div class="form-group">
                <label class="sr-only" for="input_c3">screenreader text</label>
                <input class="form-control" id="input_c3">
            </div>
        </div>
    </div>
</div>
</file>

<file name="fr-D.html">
<div ing-form-row-fieldset label="D. Radiobuttons">
    <div class="row">
        <div class="col-lg-12">
            <label class="radio-inline">
                <input type="radio" value="1" id="input_d1" name="ouder">
                <span>Ja</span>
            </label>
            <label class="radio-inline">
                <input type="radio" value="0" id="input_d2" name="ouder">
                <span>Nee</span>
            </label>
        </div>
    </div>
</div>
</file>

<file name="fr-E.html">
<div ing-form-row class="form-text-only">
    <p class="form-control-static">E. No label on the left, content has an offset equal to the specified label width</p>
</div>
</file>

<file name="fr-F.html">
    <div ing-form-row ing-form-grid field-width="9">
        <label class="sr-only" for="input_f">Label for input_f</label><input type="text" class="form-control" id="input_f" value="F. Label not visible, but present for screen readers."/>
    </div>
</file>

<file name="fr-G.html">
<div ing-form-row label="F. Static input (with popover)" info-popover="popoverA" class="form-text-only">
    <p class="form-control-static">Static content</p>
</div>
</file>

<file name="fr-H.html">
<div ing-form-row label="G. Static input form-inline" class="form-inline" ing-form-grid field-width="9">
    <p class="form-control-static">Static text of variable length</p>
    <button type="button" class="btn btn-default" type="button">Button immediately next to it</button>
</div>
</file>

<file name="Ctrl.js">
function Ctrl($scope) {
    $scope.popoverA = {
        title: 'Popover',
        text: 'Example'
    }
}
</file>

 </example>
 */

angular.module('ingGlobal').directive('ingFormRow', ['$timeout', function () {
    return {
        restrict:'EA',
        replace:true,
        transclude: true,
        scope: {
            label: '@',
            'for': '@',
            infoPopover: '='
        },
        template:
            '<div class="form-group">' +
                '<div ng-if="label" ing-form-grid-label class="control-label">' +
                    '<span ng-if="!for && !infoPopover">{{label}}</span>' +
                    '<label ng-if="for && !infoPopover" for="{{for}}">{{label}}</label>' +
                    '<div ng-if="infoPopover" class="icon-position icon-after icon-position-sm">' +
                        '<span ng-if="!for">{{label}}</span>' +
                        '<label ng-if="for" for="{{for}}">{{label}}</label>' +
                        '<span ing-info-popover config="infoPopover" class="icon-position-icon"></span>' +
                    '</div>' +
                '</div>' +
                '<div ng-if="label" ing-form-grid-field ng-transclude></div>' +
                '<div ng-if="!label" ing-form-grid-offset ing-form-grid-field ng-transclude></div>' +
            '</div>'
    }
}]);

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-form-row-fieldset
 * @scope true
 * @description
 *
 * @example
 * See <a href="#/spectingular/ingGlobal.directive:ing-form-row">ing-form-row</a> for documentation and examples.
 */
angular.module('ingGlobal').directive('ingFormRowFieldset', ['$timeout', function () {
    return {
        restrict:'EA',
        replace:true,
        transclude: true,
        scope: {
            label: '@',
            infoPopover: '='
        },
        template:
            '<fieldset class="fieldset-row">' +
                '<legend ng-if="infoPopover && label" ing-form-grid-label class="control-label">' +
                    '<div class="icon-position icon-after icon-position-sm">' +
                        '<span >{{label}}</span>' +
                        '<span ing-info-popover config="infoPopover" class="icon-position-icon"></span>' +
                    '</div>' +
                '</legend>' +
                '<legend ng-if="!infoPopover && label" ing-form-grid-label class="control-label">' +
                    '<span >{{label}}</span>' +
                '</legend>' +
                '<div ng-if="label" ing-form-grid-field ng-transclude></div>' +
                '<div ng-if="!label" ing-form-grid-offset ing-form-grid-field ng-transclude></div>' +
            '</fieldset>'
    }
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-validation-group
 * @restrict EA
 * @scope true
 *
 * @param {String} name The unique name for the group
 * @param {String} setstate :expression: used for setting the state of the group, ignoring form element states
 * @param {String} id The id for the group
 *
 *
 * @description
 * Directive for handling the display of validation state of a group of form elements.
 * The group watches the blur of child form elements, will not show validation if the group is pristine
 * The state('warning' or false) can also be set independent of the child elements from within you application controller. Note that the 'error' value for setstate is deprecated, one should write a custom validation directive instead
 *
 *
 * @example
<example module="ingGlobal">
<file name="ing-validation-group.html">
<form role="form" class="form-horizontal" ng-controller="Ctrl">
    <div ing-validation-group>
        <div ing-form-row label="Validate: ing-required, ing-number, ng-minlength" for="input_id">
            <div class="row">
                <div class="col-lg-12">
                    <input type="text" class="form-control" id="input_id" name="eltest" ng-model="mtest" ing-required ng-minlength="3" ing-number />
                </div>
            </div>
            <div ing-notify on-element="eltest" validate="ingRequired">
                <div ing-notification type="error">Please fill in something</div>
            </div>
            <div ing-notify on-element="eltest" validate="ingNumber">
                <div ing-notification type="error">Please fill in a number</div>
            </div>
            <div ing-notify on-element="eltest" validate="minlength">
                <div ing-notification type="error">Please use three characters at least</div>
            </div>
        </div>
    </div>
    <div ing-validation-group setstate="{{state}}">
        <div ing-form-row-fieldset label="Warning on service error" for="warningInput">
            <div class="row">
                <div class="col-lg-3">
                    <input type="text" class="form-control" id="warningInput" name="eltest2" ng-model="mtest2" />
                </div>
                <div class="col-lg-9">
                    <button type="button" class="btn btn-default" ng-click="setState('warning')">Get address</button>
                    <button type="button" class="btn btn-default" ng-click="setState(false)">Reset address</button>
                </div>
            </div>
            <div ng-show="state=='warning'">
                <div ing-notification type="warning">Your address could not be retrieved</div>
            </div>
        </div>
    </div>
</form>
</file>

 <file name="Ctrl.js">
    function Ctrl($scope){
        $scope.setState = function(state){
            $scope.state = state;
        }
    }
 </file>

</example>
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-validation-group#checkValidity
 * @eventOf ingGlobal.directive:ing-validation-group
 * @eventType  broadcast on $scope
 * @description to trigger the validity check on inputs
 */

/*jshint loopfunc: true */
angular.module('ingGlobal').directive('ingValidationGroup', ['$timeout',
    function($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            require: '^form',
            scope: true,
            controller: 'validationGroupCtrl',
            link: function(scope, element, attr, formCtrl) {
                function bindChildInputs(){
                    var eventsToBind = ['blur'];
                    var childInputs = element.find('input,select,textarea');

                    for (var key = 0; key < childInputs.length; key++) {
                        var input = childInputs.eq(key);
                        if(input.attr('type') === 'checkbox') {
                            eventsToBind.push('click');
                        }
                        input.bind(eventsToBind.join(' '), function() {
                            if (formCtrl.$dirty) {
                                scope.$apply(function() {
                                    scope.checkValidity();
                                });
                            }
                        });
                    }
                }

                scope.formName = attr.name;
                attr.$observe('setstate', function(show) {
                    scope.showError   = show === 'error' ? true : false;
                    scope.showWarning = show === 'warning' ? true : false;
                });

                scope.$watch(function(){return formCtrl.$valid}, function(valid) {
                    scope.showError = valid ? false : scope.showError;
                });

                $timeout(bindChildInputs, 0);
            },
            template:
                '<div ng-form="{{ formName }}" class="validation-group" ng-class=" { \'has-error\' : showError , \'has-warning\': showWarning && !showError, groupvalid : !showError && !showWarning } ">' +
                '<div ng-transclude></div>' +
                '</div>'
        };
    }]);

angular.module('ingGlobal').controller('validationGroupCtrl', ['$scope', '$element', function($scope, $element) {
        this.scope = $scope;

        // Set the validity on the scope based on the element class.
        function setValidity() {
            if ($element.hasClass('ng-invalid')) {
                $scope.showError = true;
            }
        }

        $scope.checkValidity = function() {
            setValidity();
        };

        $scope.$on('checkValidity', function() {
            setValidity();
        });
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-amount
 * @restrict A
 * @element input
 *
 * @param {String=} [decimals='2'] Amount of decimals after comma separator. Possible values: 2(default,)3 or 0
 *
 *
 * @description
 * Directive for amount input.
 *
 * @example
<example module="ingGlobal">
<file name="ing-amount.html">
<form role="form" class="form-horizontal">
    <div ing-validation-group>
        <div ing-form-row label="Amount" for="i1" class="form-group-lg">
            <div class="row">
                <div class="col-lg-4">
                    <div class="input-group">
                        <span class="input-group-addon" aria-hidden="true">&euro;</span>
                        <input id="i1" type="text" ing-amount decimals="3" ing-shrink-font class="form-control input-price" ing-placeholder="0,00" name="el" ng-model="data.amount" ing-required />
                    </div>
                </div>
            </div>
            <div ing-notify on-element="el" validate="ingAmount">
                <div ing-notification type="error">Amount invalid</div>
            </div>
            <div ing-notify on-element="el" validate="ingAmountCharacters">
                <div ing-notification type="error">Amount characters invalid</div>
            </div>
            <div ing-notify on-element="el" validate="ingAmountFormat">
                <div ing-notification type="error">Amount format invalid</div>
            </div>
        </div>
    </div>
</form>
</file>
</example>
 */

angular.module('ingGlobal').directive('ingAmount', ['$filter', 'expressions', function ($filter, expressions) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {},
        priority: 100,
        controller: 'amountController',
        link: function(scope, element, attrs, ctrl) {

            var isRequired = attrs.ingRequired !== undefined;
            var decimals = attrs.decimals;

            /** Validation. */
            if (decimals === '3') {
                scope.validAmount = expressions.validAmount3digits;
            } else {
                scope.validAmount = expressions.validAmount;
            }


            /** Format model amount value (initial or updated) from float to currency format and send to view. */
            ctrl.$formatters.push(function () {
                var value = ctrl.$modelValue;
                if((value === '' || value === undefined || value === null) && !isRequired) {
                    return '';
                }

                var formattedValue = $filter('ingCurrency')(value, '').removeSpaces();

                if(decimals === '0') {
                    formattedValue = formattedValue.replace(expressions.trailingCommaAndDigits, '');
                }
                
                scope.validateAmount(ctrl, formattedValue);
                if(!!ctrl.$error.ingAmount) {
                    return value;
                }
                
                return formattedValue;
            });


            /** Parse model value (called on each keypress and on $setViewValue). */
            ctrl.$parsers.push(function () {
                var value = ctrl.$viewValue;
                if (!angular.isDefined(value)) {
                    return undefined;
                }

                // Validate
                scope.validateAmount(ctrl, ctrl.$viewValue);

                if (typeof value === 'string') {
                    value = parseFloat(value
                            .removeSpaces()
                            .replace(expressions.containsDot, '')
                            .replace(expressions.containsComma, '.')
                    );
                }
                if (!isNaN(value)) {
                    return value;
                }
                
                return undefined;
            });
            

            /** Bind keymask to keypress event. */
            element.bind('keypress', function (event) {
                scope.handleKeyPressEvent(event);
                scope.handlePasteEvent(event);
            });


            /** Bind formatting and validation to blur event. */
            element.bind('blur', function () {
                scope.$apply(function () {
                    scope.formatAndStoreViewValue(ctrl, decimals, isRequired);   // $parsers are called, since $setViewValue is called inside this method
                });
            });


            /** When user focuses on currency field that is prefilled with a zero value, clear the value. */
            element.bind('focus', function() {
                scope.$apply(function() {
                    var zeroValueMatcher = /(^[0]+[.,]?[0]{0,3})$/;
                    if (zeroValueMatcher.test(ctrl.$viewValue)){
                        ctrl.$setViewValue('');
                        ctrl.$render();
                    }
                });
            });
        }
    };
}]);


angular.module('ingGlobal').controller('amountController', ['$scope', '$filter', '$timeout', 'expressions','utilsService', function ($scope, $filter, $timeout, expressions, utilsService) {

    /** Validation. */
    $scope.validateAmount = function (ctrl, val) {
//        var value = val.toString().removeSpaces(),
        var validity = false,
            validityCharacters = false,
            validityFormat = false;

        var value = angular.isString(val) ? val.removeSpaces() : '';
        if (utilsService.isEmpty(value)) {
            validity=validityCharacters=validityFormat = true;
        }
        else if (value.length > 0) {
            validityCharacters = expressions.validCharsAmount.test(value);
            validityFormat = expressions.leadingZeroAndDot.test(value) ? false : $scope.validAmount.test(value);
            validity = validityCharacters && validityFormat;
        }

        ctrl.$setValidity('ingAmount', validity);
        ctrl.$setValidity('ingAmountCharacters', validityCharacters);
        ctrl.$setValidity('ingAmountFormat', validityFormat);
    };

    /** Format view value (on blur) and store value in model (via $setViewValue, which calls $parsers). */
    $scope.formatAndStoreViewValue = function(fieldCtrl, decimals, isRequired) {
        var viewValue = angular.isString(fieldCtrl.$viewValue) ? fieldCtrl.$viewValue.removeSpaces() : '',
            isValidCurrency = expressions.leadingZeroAndDot.test(viewValue) ? false : expressions.validAmount.test(viewValue),
            isValidSingleDotSeparator = expressions.validSingleDotSeparator.test(viewValue);

        if(viewValue.length === 0) {
            if (isRequired) {
                viewValue = $filter('ingCurrency')(0, '').removeSpaces();
            }
        } else if (isValidCurrency === true || isValidSingleDotSeparator === true) {
            if(isValidCurrency === true) {
                viewValue = viewValue
                    .replace(expressions.containsDot, '')
                    .replace(expressions.containsComma, '.');
            }
            viewValue = $filter('ingCurrency')(viewValue, '').removeSpaces();
        }

        if(decimals === '0'){
            viewValue = viewValue.replace(expressions.trailingCommaAndDigits, '');
        }

        fieldCtrl.$setViewValue(viewValue);
        fieldCtrl.$render();
    };


    /** Input KeyMask event handler. */
    $scope.handleKeyPressEvent = function (event) {
        if(event !== undefined && event !== null) {
            var letter = String.fromCharCode(event.which);

            if(event.which > 32 && !event.metaKey && !event.ctrlKey) {
                if(!expressions.currencyMask.test(letter)) {
                    event.preventDefault();
                    return false;
                }
            }
            return true;
        }
        return false;
    };


    /** Paste event handler. */
    $scope.applyPasteFiltering = function (fieldCtrl) {
        $scope.$apply(function() {
            fieldCtrl.$setViewValue(fieldCtrl.$viewValue.removeSpaces());
            fieldCtrl.$render();
            $scope.validateAmount(fieldCtrl, fieldCtrl.$viewValue);
        });
    };

    $scope.handlePasteEvent = function (event, fieldCtrl) {
        if(event !== null && event.which === 118 && event.ctrlKey === true) {
            $timeout(function(){
                $scope.applyPasteFiltering(fieldCtrl);
            }, 50);
            return true;
        }
        return false;
    };
}]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-bsn
 * @restrict A
 *
 * @description
 * Directive for validating a dutch social security number ( bsn )
 *
 * @example
<example module="ingGlobal">
<file name="ing-bsn.html">
<form role="form" class="form-horizontal">
    <div ing-validation-group>
        <div ing-form-row label="Burgerservicenummer" for="i1">
            <div class="row">
                <div class="col-lg-12">
                    <input type="text" class="form-control" id="i1" name="el" ng-model="model.bsn" ing-bsn />
                </div>
            </div>
            <div ing-notify on-element="el" validate="ingBsn">
                <div ing-notification type="error">Please fill in a valid bsn</div>
            </div>
        </div>
    </div>
</form>
</file>
</example>
 */

angular.module('ingGlobal').directive('ingBsn', ['utilsService', function(utilsService) {
        return {
            restrict: 'A',
            priority: 100,
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                function validate(value) {
                    var valid;
                    
                    if (utilsService.isEmpty(value)) {
                        valid = true;
                    } else if (isNaN(value) || value.length !== 9 || value.charAt(0) === '9') {
                        valid = false;
                    } else {
                        var pos = 0;
                        var result = 0;
                        for (var i = value.length; i > 0; i--) {
                            result += (i !== 1) ? (value.charAt(pos) * i) : (value.charAt(pos) * i * -1);
                            pos++;
                        }
                        
                        valid = result % 11 === 0;
                    }
                    
                    ctrl.$setValidity('ingBsn', valid);
                    return valid;
                }
                                
                utilsService.addValidator(ctrl, validate);
            }
        };
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-date
 * @restrict A
 *
 * @description
 * Directive for validating a date without a datepicker
 *
 *
 * @example
<example module="ingGlobal">
<file name="ing-date.html">
<form role="form" class="form-horizontal">
    <div ing-validation-group>
        <div ing-form-row label="Date" for="i1">
            <div class="row">
                <div class="col-lg-12">
                    <input class="form-control" type="text" id="i1" name="el" ng-model="model.date" ing-date>
                </div>
            </div>
            <div ing-notify on-element="el" validate="ingDate">
                <div ing-notification type="error">Please fill in a valid date</div>
            </div>
        </div>
    </div>
 </form>
</file>
</example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingDate', ['utilsService', 'expressions',
    function(utilsService, expressions) {
        return {
            priority: 100,
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                function validate(value) {
                    var valid = (expressions.validDate.test(jQuery.trim(value)) || utilsService.isEmpty(value));
                    ctrl.$setValidity('ingDate', valid);
                    return valid;
                }

                utilsService.addValidator(ctrl, validate);
            }
        };
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-dutch-zipcode
 * @restrict A
 *
 * @description
 * Directive for validating a dutch zipcode
 *
 *
 * @example
<example module="ingGlobal">
<file name="ing-dutch-zipcode.html">
<form role="form" class="form-horizontal">
    <div ing-validation-group>
        <div ing-form-row label="Zip code" for="i1">
            <div class="row">
                <div class="col-lg-3">
                    <input type="text" id="i1" class="form-control" ing-placeholder="1000AB" name="zipcode" ing-dutch-zipcode ng-model="mtest"/>
                </div>
                </div>
            <div ing-notify on-element="zipcode" validate="ingDutchZipcode">
                <div ing-notification type="error">Please fill in a valid (Dutch) zip code</div>
            </div>
        </div>
    </div>
</form>
</file>
</example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingDutchZipcode', ['$filter', 'expressions', 'utilsService', function($filter, expressions, utilsService) {
    return {
        priority: 100,
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            function validate(value) {
                var valid = utilsService.isEmpty(value) || expressions.dutchZipcode.test(jQuery.trim(value));
                ctrl.$setValidity('ingDutchZipcode', valid);
                return valid;
            }

            ctrl.$parsers.push(function() {
                var value = $filter('dutchZipcode')(ctrl.$viewValue),
                    valid = validate(value);

                if(valid) {
                    ctrl.$viewValue = value;
                    ctrl.$render();
                }

                return valid ? value : undefined;
            });

            ctrl.$formatters.push(function() {
                var value = $filter('dutchZipcode')(ctrl.$modelValue);
                validate(value);
                return value;
            });
        }
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-firstnames
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>text</b>
 *
 * @description
 * Directive for validating input to be valid first names (not more then 4 first names and a name should not have more then 25 characters.
 *
 * @example
<example module="ingGlobal">
<file name="ing-first-names.html">
<form role="form" class="form-horizontal">
    <div ing-validation-group>
        <div ing-form-row label="First name" for="i1">
            <div class="row">
                <div class="col-lg-12">
                    <input type="text" class="form-control" id="i1" name="el" ing-firstnames ng-model="model.names" />
                </div>
            </div>
            <div ing-notify on-element="el" validate="ingFirstnames">
                <div ing-notification type="error">Please fill in a correct first name</div>
            </div>
        </div>
    </div>
</form>
</file>
</example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingFirstnames', ['utilsService', function(utilsService) {
    return {
        require: 'ngModel',
        priority: 1,
        link: function(scope, element, attrs, ctrl) {
            function validate(value) {
                var names = jQuery.trim(value).split(/[ ]+/),
                    valid = true;

                // no more than 4 names allowed
                if (names.length > 4) {
                    valid = false;
                }

                for (var i = 0; i < names.length; i++) {
                    if (names[i].length > 25) {
                        valid = false;
                        break;
                    }
                }

                ctrl.$setValidity('ingFirstnames', valid);
                return valid;
            }

            utilsService.addValidator(ctrl, validate);
        }
    };
}]);

'use strict';
angular.module('ingGlobal')
/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-iban-validator
 * @restrict A
 *
 * @description
 * Directive for validating an IBAN account
 * Default the input will be validated as an IBAN
 * This directive can be configured with the restrict argument:
 *  1. restrict === 'ING'           The IBAN will be validated as an ING specific IBAN
 *  2. restrict === 'NL'            The IBAN will be validated as a NL specific IBAN
 *  3. restrict not specified       The IBAN will be validated as an default international IBAN, this is the default setting
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-iban-validator.html">
 <form role="form" class="form-horizontal">
    <div ing-validation-group>
        <div ing-form-row label="IBAN" for="i1">
            <div class="row">
                <div class="col-lg-3">
                    <input type="text" id="i1" class="form-control" name="ingIban" ing-iban-validator restrict="ING" ng-model="mtest"/>
                </div>
            </div>
            <div ing-notify on-element="ingIban" validate="ingInvalidIban">
                <div ing-notification type="error">Please fill in a valid IBAN account</div>
            </div>
         </div>
    </div>
 </form>
 </file>
 </example>
 */
    .directive('ingIbanValidator', ['$filter', 'utilsService', 'ibanService', function ($filter, utilsService, ibanService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                /** format on blur if the input is a valid IBAN */
                element.bind('blur', function() {
                    if(isValidIban(ctrl.$viewValue)) {
                        ctrl.$setViewValue($filter('iban')(ctrl.$viewValue));
                        ctrl.$render();
                    }
                });

                /**
                 * Validate the iban and set the validation state
                 * @param iban View or model value
                 * @returns {boolean} true if valid, false if otherwise
                 */
                function isValidIban(iban) {
                    var valid = true;
                    if (!utilsService.isEmpty(iban)) {
                        var evaluatedRestrict = scope.$eval(attrs.restrict) || attrs.restrict;
                        var restrict = !utilsService.isEmpty(evaluatedRestrict) ? evaluatedRestrict.toUpperCase() :'';
                        switch (restrict) {
                            case 'NL':
                                valid = ibanService.isValidDutchIban(iban);
                                break;
                            case 'ING':
                                valid = ibanService.isValidIngIban(iban);
                                break;
                            default :
                                valid = ibanService.isValidIban(iban);
                        }
                    }
                    ctrl.$setValidity('ingInvalidIban', valid);
                    return valid;
                }

                utilsService.addValidator(ctrl, isValidIban);

            }
        }
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-max-amount
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>float</b>
 *
 * @description
 * Directive for validating a maximum amount boundary
 *
 * @example

 <example module="ingGlobal">
 <file name="ing-max-amount.html">
 <form role="form" ng-controller="Ctrl" class="form-horizontal">
     <div ing-validation-group>
         <div ing-form-row label="Amount (maximum is {{model.maxAmount}})" for="i1">
            <div class="row">
                <div class="col-lg-12">
                    <input class="form-control input-price" type="text"  ing-amount id="i1" name="el" ing-max-amount="{{model.maxAmount}}" ng-model="model.amount" />
                </div>
            </div>
            <div ing-notify on-element="el" validate="ingMaxAmount">
                <div ing-notification type="error">Please lower your amount</div>
            </div>
         </div>
     </div>
 </form>
 </file>

 <file name="Ctrl.js">
 function Ctrl($scope) {
    $scope.model = { maxAmount: 90000 };
 }
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingMaxAmount', ['utilsService', 'expressions',
    function (utilsService, expressions) {
        return {
            require: ['ngModel', 'ingAmount'],
            priority: 1,
            link: function (scope, element, attrs, ctrl) {
                var modelCtrl = ctrl[0],
                    maxAmount;

                attrs.$observe('ingMaxAmount', function (value) {
                    if (angular.isDefined(value)) {
                        maxAmount = value.toString().replace(expressions.containsDot, ',');

                        // do check if empty or form will be dirty
                        if (angular.isDefined(modelCtrl.$viewValue) && (utilsService.isEmpty(modelCtrl.$viewValue) !== true)) {
                            modelCtrl.$setViewValue(modelCtrl.$viewValue);
                        }
                    }
                });

                function validate(value) {
                    var valid = false;
                    // check if model is empty: then is valid
                    if (utilsService.parseAmount(value) <= utilsService.parseAmount(maxAmount) || (utilsService.isEmpty(modelCtrl.$viewValue) ===true) ) {
                        valid = true;
                    }

                    modelCtrl.$setValidity('ingMaxAmount', valid);
                    return valid;
                }

                modelCtrl.$parsers.push(function () {
                    var value = modelCtrl.$viewValue;
                    return validate(value) ? value : undefined;
                });

                modelCtrl.$formatters.push(function (value) {
                    validate(modelCtrl.$modelValue);
                    return value;
                });
            }
        };
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-max-date
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>ing-date</b>
 *
 * @description
 * Directive validating whether given date is below max date.
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-max-date.html">
     <form role="form" ng-controller="Ctrl" class="form-horizontal">
         <div ing-validation-group>
             <div ing-form-row label="Date before {{model.maxDate}}" for="i1">
                 <div class="row">
                     <div class="col-lg-12">
                        <input class="form-control" type="text" id="i1" name="el" ing-date ing-max-date="model.maxDate" ng-model="model.date">
                     </div>
                 </div>
                 <div ing-notify on-element="el" validate="ingDate || ingMaxDate">
                     <div ing-notification type="error">Please fill in a date below or equal to {{model.maxDate}}</div>
                 </div>
             </div>
         </div>
     </form>
 </file>

 <file name="Ctrl.js">
 function Ctrl($scope) {
    $scope.model = { maxDate: '01-01-2010' };
 }
 </file>
 </example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingMaxDate', ['utilsService', 'expressions',
    function(utilsService, expressions) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var maxDate = scope.$eval(attrs.ingMaxDate);

                var toDate = function(dateAsString) {
                    var date = dateAsString.split('-');
                    var day = date[0];
                    var month = (date[1] - 1);
                    var year = date[2];
                    return new Date(year, month, day, 23, 59, 59);
                };

                function validate(value) {
                    var valid;
                    if (utilsService.isEmpty(value) || !expressions.validDate.test(jQuery.trim(value))) {
                        valid = true;
                    } else {
                        valid = toDate(maxDate) >= toDate(jQuery.trim(value));
                    }
                    ctrl.$setValidity('ingMaxDate', valid);
                    return valid;
                }

                utilsService.addValidator(ctrl, validate);
            }
        };
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-max-items
 * @restrict A
 *
 * @description
 * Directive for validating the max items in the ngModel
 * For a working example, see: <a href="#/spectingular/ingGlobal.directive:ing-checkbox-group">ing-checkbox-group</a>.
  */

angular.module('ingGlobal').directive('ingMaxItems', function () {
    return {
        restrict: 'A',
        require: ['ngModel'],
        priority: 1,
        link: function (scope, element, attrs, ctrls) {
            var ngModel = ctrls[0];
            var max = scope.$eval(attrs.ingMaxItems);

            function validate(value) {
                var selectedCount = value ? value.length : 0;
                var valid = (max === undefined || selectedCount <= max);
                ngModel.$setValidity('ingMaxItems', valid);
                return valid;
            }

            ngModel.$parsers.push(function () {
                var value = ngModel.$viewValue;
                return validate(value) && ngModel.$valid ? value : undefined;
            });

            ngModel.$formatters.push(function(value) {
                validate(ngModel.$modelValue);
                return value;
            });
        }
    };
});
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-min-amount
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>float</b>
 *
 * @description
 * Directive for validating a minimum amount boundary
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-min-amount.html">
 <form role="form" class="form-horizontal" ng-controller="Ctrl">
     <div ing-validation-group>
         <div ing-form-row label="Amount (at least {{ model.minAmount }})" for="i1">
             <div class="row">
                <div class="col-lg-12">
                    <input class="form-control input-price" type="text" ing-amount id="i1" name="el" ing-min-amount="{{model.minAmount}}" ng-model="model.amount">
                </div>
             </div>
             <div ing-notify on-element="el" validate="ingMinAmount">
                <div ing-notification type="error">Please fill in a higher amount</div>
             </div>
         </div>
     </div>
 </form>
 </file>

 <file name="Ctrl.js">
 function Ctrl($scope) {
    $scope.model = { minAmount: 9.95 };
 }
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingMinAmount', ['utilsService', 'expressions',
    function (utilsService, expressions) {
        return {
            require: ['ngModel', 'ingAmount'],
            priority: 1,
            link: function (scope, element, attrs, ctrl) {
                var modelCtrl = ctrl[0],
                    minAmount;

                attrs.$observe('ingMinAmount', function (value) {
                    if (angular.isDefined(value)) {
                        minAmount = value.toString().replace(expressions.containsDot, ',');

                        if (angular.isDefined(modelCtrl.$viewValue) && (utilsService.isEmpty(modelCtrl.$viewValue) !== true)) {
                            modelCtrl.$setViewValue(modelCtrl.$viewValue);
                        }
                    }
                });

                function validate(value) {
                    var valid = false;
                    if (utilsService.parseAmount(value) >= utilsService.parseAmount(minAmount) || (utilsService.isEmpty(modelCtrl.$viewValue) ===true)) {
                        valid = true;
                    }

                    modelCtrl.$setValidity('ingMinAmount', valid);
                    return valid;
                }

                modelCtrl.$parsers.push(function () {
                    var value = modelCtrl.$viewValue;
                    return validate(value) ? value : undefined;
                });

                modelCtrl.$formatters.push(function (value) {
                    validate(modelCtrl.$modelValue);
                    return value;
                });
            }
        };
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-min-date
 * @restrict A
 * @element input
 *
 * @param {String} type The input type needs to be <b>ing-date</b>
 *
 * @description
 * Directive validating whether given date is above min date.
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-min-date.html">
 <form role="form" class="form-horizontal" ng-controller="Ctrl">
    <div ing-validation-group>
         <div ing-form-row label="Date before {{model.minDate}}" for="i1">
             <div class="row">
                 <div class="col-lg-12">
                    <input class="form-control" ing-date id="i1" name="the_id" ing-min-date="model.minDate" ng-model="model.date">
                 </div>
             </div>
             <div ing-notify on-element="the_id" validate="ingDate || ingMinDate">
                 <div ing-notification type="error">Please fill in a valid date, equal to or higher than {{model.minDate}}</div>
             </div>
         </div>
     </div>
 </form>
 </file>

 <file name="Ctrl.js">
 function Ctrl($scope) {
    $scope.model = { minDate: '01-01-2010' };
 }
 </file>
 </example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingMinDate', ['utilsService', 'expressions',
    function(utilsService, expressions) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                var minDate = scope.$eval(attrs.ingMinDate);

                var toDate = function(dateAsString) {
                    var date = dateAsString.split('-');
                    var day = date[0];
                    var month = (date[1] - 1);
                    var year = date[2];
                    return new Date(year, month, day, 23, 59, 59);
                };

                function validate(value) {
                    var valid;
                    if (utilsService.isEmpty(value) || !expressions.validDate.test(jQuery.trim(value))) {
                        valid = true;
                    } else {
                        valid = toDate(minDate) <= toDate(jQuery.trim(value));
                    }

                    ctrl.$setValidity('ingMinDate', valid);
                    return valid;
                }

                utilsService.addValidator(ctrl, validate);
            }
        };
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-min-items
 * @restrict A
 *
 * @description
 * Directive for validating the min items in the ngModel
 * For a working example, see: <a href="#/spectingular/ingGlobal.directive:ing-checkbox-group">ing-checkbox-group</a>.
 */

angular.module('ingGlobal').directive('ingMinItems', function () {
    return {
        restrict: 'A',
        require: ['ngModel'],
        priority: 1,
        link: function (scope, element, attrs, ctrls) {
            var ngModel = ctrls[0];
            var min = scope.$eval(attrs.ingMinItems);


            function validate(value) {
                var selectedCount = value ? value.length : 0,
                    valid = min === undefined || selectedCount >= min;
                ngModel.$setValidity('ingMinItems', valid);
                return valid;

            }

            ngModel.$parsers.push(function () {
                var value = ngModel.$viewValue;
                return validate(value) && ngModel.$valid ? value : undefined;
            });

            ngModel.$formatters.push(function (value) {
                validate(ngModel.$modelValue);
                return value;
            });
        }
    };
});
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-nameformat
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>text</b>
 *
 * @description
 * Directive for validating and formatting the input against a list of allowed characters.
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-nameformat.html">
 <form name="form" class="form-horizontal">
     <div ing-validation-group>
         <div ing-form-row label="Name" for="i1">
             <div class="row">
                 <div class="col-lg-12">
                    <input class="form-control" type="text" id="i1" name="el" ing-nameformat ng-model="model.names"/>
                 </div>
             </div>
             <div ing-notify on-element="el" validate="ingNameformat">
                 <div ing-notification type="error">Please correct your name</div>
             </div>
         </div>
     </div>
 </form>
 </file>
 </example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingNameformat', ['utilsService', 'expressions', function(utilsService, expressions) {
        return {
            require: 'ngModel',
            priority: 1,
            link: function(scope, element, attrs, ctrl) {
                /** Captitalize and remove leadingMin on blur.
                 */
                element.bind('blur', function() {
                    var value = jQuery.trim(element.val());
                    value = capitalize(value);
                    value = removeLeadingMin(value);
                    element.val(value);
                    ctrl.$setViewValue(value);
                });


                /** Recursively removes all leading - characters.
                 * @param name The name.
                 * @return corrected The corrected name.
                 */
                function removeLeadingMin(name) {
                    var corrected = name;
                    if (corrected.charAt(0) === '-') {
                        corrected = removeLeadingMin(jQuery.trim(corrected.substr(1)));
                    }
                    return corrected;
                }

                /**
                 * Capitalizes all names including all name parts.
                 * @param name The name.
                 * @returns capitalizedName The capitalized name.
                 */
                function capitalize(name) {
                    var names = jQuery.trim(name).split(/[ ]+/); // split by name
                    for (var i = 0; i < names.length; i++) {
                        var parts = jQuery.trim(names[i]).split(/[-]+/); //split by name part (-)
                        for (var j = 0; j < parts.length; j++) {
                            parts[j] = parts[j].charAt(0).toUpperCase() + parts[j].slice(1); //capitalize each name (part)
                        }
                        names[i] = parts.join('-');
                    }
                    return names.join(' ');
                }

                /**
                 * Validate the given value and set the validation state.
                 * @param {type} value View or model value
                 * @returns {boolean} true if valid, false otherwise
                 */
                function validate(value) {
                    var valid = utilsService.isEmpty(value) || expressions.validName.test(jQuery.trim(value));
                    ctrl.$setValidity('ingNameformat', valid);
                    return valid;
                }

                utilsService.addValidator(ctrl, validate);
            }
        };
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-number
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>text</b> or <b>number</b>
 *
 * @description
 * Directive for validating numbers.
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-number.html">
 <form role="form" class="form-horizontal">
     <div ing-validation-group>
         <div ing-form-row label="Number" for="i1">
             <div class="row">
                 <div class="col-lg-12">
                    <input class="form-control" type="text" id="i1" name="el" ing-number ng-model="model.number">
                 </div>
             </div>
             <div ing-notify on-element="el" validate="ingNumber">
                <div ing-notification type="error">Please fill in a number</div>
             </div>
         </div>
     </div>
 </form>
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingNumber', ['utilsService', 'expressions',
    function(utilsService, expressions) {
        return {
            require: 'ngModel',
            priority: 1,
            link: function(scope, element, attrs, ctrl) {
                function validate(value) {
                    var valid = utilsService.isEmpty(value) || expressions.validNumber.test(value);
                    ctrl.$setValidity('ingNumber', valid);
                    return valid;
                }
                utilsService.addValidator(ctrl, validate);
            }
        };
    }
]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-past-date
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>ing-date</b>
 *
 * @description
 * Directive for validating a date to be a past date.
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-past-date.html">
     <form role="form" class="form-horizontal">
         <div ing-validation-group>
             <div ing-form-row label="A date in past" for="i1">
                 <div class="row">
                     <div class="col-lg-12">
                        <input class="form-control" type="text" id="i1" name="el" ing-past-date ng-model="model.date">
                     </div>
                 </div>
                 <div ing-notify on-element="el" validate="ingPastDate">
                    <div ing-notification type="error">Please fill in a date in the past</div>
                 </div>
             </div>
         </div>
     </form>
 </file>
 </example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingPastDate', ['utilsService', 'expressions',
    function(utilsService, expressions) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {

                var toDate = function(dateAsString) {
                    var date = dateAsString.split('-');
                    var day = date[0];
                    var month = (date[1] - 1);
                    var year = date[2];
                    return new Date(year, month, day, 23, 59, 59);
                };

                var today = function() {
                    var now = new Date();
                    var day = now.getUTCDate();
                    var month = now.getUTCMonth();
                    var year = now.getUTCFullYear();
                    return new Date(year, month, day, 23, 59, 59);
                };

                function validate(value) {
                    var valid = utilsService.isEmpty(ctrl.$viewValue) || (expressions.validDate.test(jQuery.trim(value)) && toDate(value) < today());
                    ctrl.$setValidity('ingPastDate', valid);
                    return valid;
                }

                utilsService.addValidator(ctrl, validate);
            }
        };
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-phone
 * @restrict A
 *
 * @param {String} allowed-country-codes Comma separated list of country codes to use for validation. When no codes are provided the phone number will be validated against all valid country codes.
 *
 * @description
 * Directive for validating and formatting both foreign and dutch phone numbers.
 * The directive checks if the entered phone number is dutch or foreign, and then validates accordingly.
 *
 *- Various notations for country codes are allowed: +31, 0031, [+31], (+31). Brackets, dashes, comma's, points, and in the case of dutch phone numbers, an additional 0 after the country code are automatically stripped.
 *- Dutch phone numbers should start with a single 0 or the dutch country code 31, and should be exactly 12 characters long including the country code.
 *- Foreign phone numbers should start with a + or 00 and the country code and have no length restriction. The country code is validated against the codes provided with the allowed-country-codes attribute or when no codes are provided against a list of all valid country codes.
 *- A valid phone number will result in a string that starts with a + followed by only digits, e.g. +3112345678
 *
 *
 * @example
 <example module="ingGlobal">
    <file name="ing-phone.html">
        <form role="form" class="form-horizontal">
            <div ing-validation-group>
                <div ing-form-row label="Phone number" for="i1">
                    <div class="row">
                        <div class="col-lg-12">
                            <input type="text" class="form-control" id="i1" name="el" ing-phone ng-model="model.phone">
                        </div>
                    </div>
                    <div ing-notify on-element="el" validate="ingPhone">
                        <div ing-notification type="error">Please fill in a valid phone number</div>
                    </div>
                </div>
            </div>
        </form>
    </file>

    <file name="dutch-and-german-numbers-only.html">
        <form role="form" class="form-horizontal">
            <div ing-validation-group>
                <div ing-form-row label="Dutch or German phone number" for="i2">
                    <div class="row">
                        <div class="col-lg-12">
                            <input type="text" class="form-control" id="i2" name="el2" ing-phone allowed-country-codes="31,49" ng-model="model.phone2">
                        </div>
                    </div>
                    <div ing-notify on-element="el2" validate="ingPhone">
                        <div ing-notification type="error">Please fill in a valid phone number</div>
                    </div>
                </div>
            </div>
        </form>
    </file>
 </example>

 */

angular.module('ingGlobal').directive('ingPhone', ['utilsService', 'expressions', function(utilsService, expressions) {
    return {
        require: 'ngModel',
        priority: 100,
        link: function(scope, elm, attr, ctrl) {

            function validate(val) {
                if (utilsService.isEmpty(val)) {
                    ctrl.$setValidity('ingPhone', true);
                    return {valid: true, value: val};
                }

                var phoneRegExp;

                if (attr.allowedCountryCodes) {

                    // If specific country codes are passed we'll create a new regular expression with only those country codes

                    phoneRegExp = new RegExp('^(\\+' + attr.allowedCountryCodes.replace(/,/g, '|\\+') + ')([0-9]*)$');

                } else {

                    // If no specific country codes are passed we use the regular expression that contains all valid country codes
                    phoneRegExp = expressions.phoneNumber;

                }

                // First we format the phone number

                // Remove [0], (0), and spaces, dashes and brackets
                var value =  val.replace(/[\s\[\]\(\)\.\,\-]/g, '');

                // Remove all +ses except the one at the start if it's there
                value = value.charAt(0) === '+' ? value = '+' + value.replace(/\+/g, '') : value = value.replace(/\+/g, '');

                // If the phone number starts with a single 0 it's a dutch number, so we replace the 0 with +31. If it starts with two 0's it's a foreign number so we replace 00 with a +
                value = value.replace(/(^00)(.*)/, '+$2').replace(/(^0)(.*)/, '+31$2');

                // If the formatted phone number starts with +31 it's a dutch number, otherwise it's a foreign number
                var dutchNumberCheck = /^\+31/;
                var valid;

                // Then we validate the phone number

                if (dutchNumberCheck.test(value.trim())) {

                    // Remove extra 0 after the country code
                    value = value.replace(/(^\+31)([0]{1})([0-9])/, '$1$3');

                    // A dutch phone number should be exactly 12 characters long
                    valid = value.length === 12 ? phoneRegExp.test(value.trim()) : false;

                } else {

                    valid = value.length === 0 || phoneRegExp.test(value.trim());

                }

                ctrl.$setValidity('ingPhone', valid);

                return {valid: valid, value: value};
            }

            ctrl.$parsers.push(function() {
                var value = ctrl.$viewValue,
                    result = validate(value);
                return result.valid ? result.value : undefined;
            });

        }
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:phone-format
 * @deprecated as of 11/2014 - Replaced by ing-phone, see <a href="#/spectingular/ingGlobal.directive:ing-phone">ing-phone</a>
 * Eventually this component will be removed
 */

/* global jQuery */
angular.module('ingGlobal').directive('phoneFormat', ['$filter',
    function($filter) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attr, ctrl) {
                
                function validate(val) {
                    var value = jQuery.trim(val);
                    
                    // check for not allowed characters.
                    // The '+' is allowed only in some positions, like +31612345678 or [+31]612345678, so here we
                    // just remove in and NOT check it. We'll check it later.
                    var valueToCheck = value.replace(/[\+]/g, '');
                    var allowed = /^[0-9\ \-\.\[\](),]+$/;
                    if (!allowed.test(jQuery.trim(valueToCheck))) {
                        ctrl.$setValidity('phoneFormat', false);
                        return false;
                    }
                    // The phoneNumber filter formats the value like '06-12345678', so a valid length is 11
                    value = $filter('phoneNumber')(value);

                    var valid = !(value.indexOf('06') !== 0 || value.length !== 11 || value.indexOf('+') !== -1);
                    ctrl.$setValidity('phoneFormat', valid);
                    return {valid: valid, value: value};
                }
                
                ctrl.$parsers.push(function() {
                    var value = ctrl.$viewValue,
                        result = validate(value);
                    return result.valid ? result.value : undefined;
                });
                
                ctrl.$formatters.push(function(value) {
                    validate(ctrl.$modelValue);
                    return value;
                });
            }
        };
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-required
 * @restrict A
 *
 * @param {Expression} ing-required If the expression is truthy the element will be required. If not, it will be optional. When left empty it defaults to true.
 *
 * @description
 * Non HTML5 alternative for required directive since required triggers
 * browsers built-in validation-tooltip. Also allows you to toggle whether or
 * not the element should be required by passing an expression.
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-required.html">
 <form role="form" class="form-horizontal" ng-controller="Ctrl">
    <fieldset>
        <ng-include src="'Default.html'"></ng-include>
        <ng-include src="'Conditional.html'"></ng-include>
    </fieldset>
 </form>
 </file>

 <file name="Default.html">
  <div ing-validation-group>
      <div ing-form-row label="Required..." for="i1">
          <div class="row">
              <div class="col-lg-12">
                 <input type="text" class="form-control" id="i1" name="el" ing-required ng-model="model.value" />
              </div>
          </div>
          <div ing-notify on-element="el" validate="ingRequired">
             <div ing-notification type="error">Please fill in a value</div>
          </div>
      </div>
  </div>
 </file>

 <file name="Conditional.html">
  <div ing-validation-group>
       <div ing-form-row-fieldset label="Only required when checkbox is checked">
           <div class="row">
               <div class="col-lg-12">
                  <div class="form-group">
                     <label class="sr-only">Input screenreader text</label>
                     <input type="text" class="form-control" id="i2" name="el2" ing-required="model.required" ng-model="model.value2">
                  </div>
                  <div class="form-group">
                     <label class="sr-only">Checkbox screenreader text</label>
                     <input type="checkbox" id="i3" ng-model="model.required" value="true"> Required
                  </div>
               </div>
           </div>
           <div ing-notify on-element="el2" validate="ingRequired">
              <div ing-notification type="error">Please fill in a value</div>
           </div>
       </div>
  </div>
 </file>

 <file name="Ctrl.js">
    function Ctrl($scope){
        $scope.model = {
            required : false
        }
    }
 </file>


 </example>
 */

angular.module('ingGlobal').directive('ingRequired', ['utilsService', function(utilsService) {
    return {
        require: 'ngModel',
        priority: 1,
        link: function(scope, element, attrs, ctrl) {
            var isRequired = true;

            function validate(value) {
                var valid = (!(utilsService.isEmpty(value) || value === false) || !isRequired);
                ctrl.$setValidity('ingRequired', valid);
                return valid;
            }

            scope.$watch(attrs.ingRequired, function (_isRequired_) {
                isRequired = _isRequired_ === undefined || _isRequired_ === null ? true : _isRequired_;
                validate(ctrl.$viewValue);
            });

            utilsService.addValidator(ctrl, validate);
        }
    };
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-username
 * @restrict A
 * @element input
 *
 * @description
 * Directive for validating an ING username.
 * Username format:
 * min 6, max 20 characters
 * numbers (0 - 9)
 * characters (a - z, A - Z)
 * dot (.), dash( - ) or Underscore ( _ )
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-username.html">
 <form role="form" class="form-horizontal" ng-controller="Ctrl">
     <div ing-validation-group>
         <div ing-form-row label="Username" for="i1">
             <div class="row">
                 <div class="col-lg-12">
                    <input type="text" class="form-control" name="el" id="i1" ng-model="model.userName" ing-username ing-required maxlength="20" tabindex="1" autofocus>
                 </div>
             </div>
             <div ing-notify on-element="el" validate="ingUsername">
                 <div ing-notification type="error">Please fill in a valid Username</div>
             </div>
         </div>
     </div>
 </form>
 </file>

 <file name="script.js">
 function Ctrl($scope) {
    $scope.model = { username: 'myUserName' };
 }
 </file>
 </example>
 */


angular.module('ingGlobal').directive('ingUsername', ['utilsService', 'expressions', function (utilsService, expressions) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ctrl) {
            function validate(value) {
                if(angular.isString(value)) {
                    var valid = value.match(expressions.username);
                    ctrl.$setValidity('ingUsername', valid);
                    return valid;
                }
                
                return false;
            }
            
            utilsService.addValidator(ctrl, validate);
        }
    };
}]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-whitelist
 * @restrict A
 *
 * @param {String} type The input type needs to be <b>text</b>
 *
 * @description
 * Directive for checking input against the whitelist
 *
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-whitelist.html">
 <form role="form" class="form-horizontal" ng-controller="Ctrl">
     <div ing-validation-group>
         <div ing-form-row label="Whitelist" for="i1">
             <div class="row">
                 <div class="col-lg-12">
                     <input type="text" class="form-control" id="i1" name="el" ing-whitelist="model.whitelist" ng-model="model.value">
                 </div>
             </div>
             <div ing-notify on-element="el" validate="ingWhitelist">
                <div ing-notification type="error">Please conform to whitelist</div>
             </div>
         </div>
     </div>
 </form>
 </file>
 <file name="Ctrl.js">
 function Ctrl($scope) {
    $scope.model = {
        value: '',
        whitelist: ['allowed', 'another_allowed']
    };
 }
 </file>
 </example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingWhitelist', ['utilsService', function(utilsService) {
    return {
        require: 'ngModel',
        priority: 1,
        link: function(scope, element, attrs, ctrl) {
            var hasValue = function(value) {
                return value !== null && value !== undefined && value.length > 0;
            };

            var hasWhitelist = function(whitelist) {
                return whitelist !== null && whitelist !== undefined && whitelist.length > 0;
            };

            var isValid = function(value, whitelist) {
                return jQuery.inArray(value, whitelist) > -1;
            };

            function validate(value) {
                var whitelist = scope.$eval(attrs.ingWhitelist),
                    valid;

                if (!hasValue(value) || !hasWhitelist(whitelist)) {
                    valid = true;
                } else {
                    valid = isValid(jQuery.trim(value), whitelist);
                }

                ctrl.$setValidity('ingWhitelist', valid);
                return valid;
            }

            utilsService.addValidator(ctrl, validate);
        }
    };
}]);

'use strict';


/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-info-popover
 * @restrict EA
 * @scope =
 *
 * @param {Object} config object, can contain 'title', 'text', 'position' (optional, default is 'below-right',) 'invokerSrText' (text read by screen reader when accessing icon, default is "Meer informatie")
 *
 * @description
 * Markup directive for displaying an info tooltip icon in front of an input field. Abstracts html away from partials; provides correct, accessible html. Please use the attribute 'config.invokerSrText' to provide text for screen readers
 *
 * @example
<example module="ingGlobal">
<file name="ing-info-popover.html">
    <div ng-controller="Ctrl">
        <span ing-info-popover config="popoverConfig"></span>
    </div>
</file>
<file name="Ctrl.js">
    function Ctrl($scope) {
        $scope.popoverConfig = {
            title: 'Titel',
            text: 'Lorem <b>Ipsum</b>',
            position: 'above-right',
            invokerSrText:'Meer informatie over item X'
        }
    }
</file>
</example>
*/


angular.module('ingGlobal').directive('ingInfoPopover', ['$sce',function($sce) {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            config: '='
        },
        link: function(scope){
            scope.$watch('config.text', function(t){
                scope.text = $sce.trustAsHtml(t);
            });
        },
        template:
            '<div ing-popover>' +
                '<a href ing-popover-invoker>' +
                    '<span ing-info-icon sr-text="{{config.invokerSrText}}"></span>' +
                '</a>' +
                '<div ing-popover-content position="{{config.position}}">' +
                    '<h3 ing-popover-title>{{config.title}}</h3>' +
                    '<span ng-bind-html="text"></span>' +
                '</div>' +
            '</div>'
    };
}]);

angular.module('ingGlobal').directive('ingInfoIcon', function() {
    return {
        restrict: 'EA',
        replace: true,
        template:
            '<span class="stacked-icon icon-md">' +
                '<i aria-hidden="true" class="icon icon-information-z1 icon-white"></i>' +
                '<i aria-hidden="true" class="icon icon-information-z2 icon-orange"></i>' +
                '<span class="sr-only">{{srText}}</span>' +
            '</span>',
        link: function(scope, element, attrs){
            attrs.$observe('srText', function(t){
                scope.srText = t || 'Meer informatie';
            });
        }
    };
});
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-item-scroller
 * @restrict a
 *
 *
 * @description
 * Use this directive to make a list rendered with ng-repeat scrollable.
 * the set-viewport attribute allows a index value to be scrolled in the viewport
 * The selected object will be scrolled into the viewport
 * this allows for selection outside of the viewport
 *

 * @param {String} setstate :expression: used for setting the state of the group, ignoring formelement states
 * @param {String} id The id for the group
 *
 * @example
 <example module="ingGlobal">
    <file name="ing-item-scroller.html">
        <div ng-controller="Ctrl">
            <div id="test" ing-item-scroller slist="myTabs" items-visible="3" start-viewport="0">
                <ul class="list-group">
                    <li class="list-group-item" ng-repeat="tab in myTabs">
                        {{tab.text}}
                    </li>
                </ul>

                <div ing-scroller="up">UP</div>
                <div ing-scroller="down">DOWN</div>
            </div>
        </div>
    </file>
    <file name="Ctrl.js">
        function Ctrl($scope) {
            var myTabs = [];

            for(var i = 1; i < 21; i ++) {
                myTabs.push({ text: 'Item ' + i });
            }

            $scope.myTabs = myTabs;
        }
    </file>
 </example>
 */

angular.module('ingGlobal').directive('ingItemScroller',[function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.end = scope.viewPort = attr.itemsVisible;

            attr.$observe('startViewport', function (selectIndex) {
                    scope.offset = Number(selectIndex);
                    if (!scope.offset) {
                        scope.offset = 0;
                    }
            });

            scope.sliceList = function () {
                if (angular.isArray(scope.listOri)) {
                    scope[attr.slist] = scope.listOri.slice(scope.offset, scope.end);
                }
            };

            scope.$watch(attr.slist, function (list, init) {
                if (angular.isObject(init) || list !== init) {

                    if (!angular.isDefined(scope.listOri)) {
                        scope.listOri = [];
                    }
                    if (scope.listOri.length === 0) {
                        scope.listOri = angular.copy(list);
                    } else {
                        scope.oriLength = scope.listOri.length;
                    }
                    scope.sliceList(list);
                }
            }, true);

            scope.$watch('offset', function () {
                scope.sliceList();
            });

            element.bind('mousewheel wheel', function (event) {
                scope.wheel(event);
            });

            scope.handle = function (delta) {
                if (delta > 0) {
                    scope.$emit('ingScroll', 'up');
                } else {
                    scope.$emit('ingScroll', 'down');
                }
            };

            scope.wheel = function (event) {
                var deltaY = 0;
                if (!event.wheelDelta && event.originalEvent) {
                    event = event.originalEvent;
                }
                if (!event.deltaY) {
                    deltaY = 1 / 120 * event.wheelDelta;
                } else {
                    deltaY = -event.deltaY;
                }
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }

                scope.handle(deltaY);
            }
        },
        controller: 'ingItemScrollerCtrl'
    };
}]);

angular.module('ingGlobal').controller('ingItemScrollerCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    this.$scope = $scope;
    $scope.$on('ingScroll', function (event, command, dest) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        if (command === 'up' && $scope.offset !== 0) {
            $scope.offset--;
            $scope.end--;
            $scope.$apply();
        } else if (command === 'down' && $scope.offset < ($scope.listOri.length - $scope.viewPort)) {
            $scope.offset++;
            $scope.end++;
            $scope.$apply();
        } else if (command === 'to') {
            $timeout(function () {
                if (Number(dest) > (Number($scope.oriLength) - Number($scope.viewPort))) {
                    dest = Number($scope.oriLength) - Number($scope.viewPort);
                }
                $scope.offset = dest;
                $scope.end = Number(dest) + Number($scope.viewPort);
            });
        }
    });
}]);

angular.module('ingGlobal').directive('ingScroller', function () {
    return {
        link: function (scope, element, attr) {
            element.bind('click', function () {
                scope.$emit('ingScroll', attr.ingScroller);
            });
        }
    };
});

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-modal
 * @restrict EA
 * @scope =
 *
 * @param {String} partial              The partial to be loaded when modal opens
 * @param {String} [size=lg]            Values: sm, md, lg
 * @param {Boolean} [hide-close=false]  Whether a close button should be added to the modal. Note that a close button should always be available in the partial for accessibility purposes. (sr-only class should be added if close button needs te be invisible.)
 * @param {String} wrapped-in           The id of the element where the modal should be wrapped-in (if undefined the modal will be wrapped in the body element)
 *
 * @description
 * Directive invoking a modal dialog. It should only be placed on focusable elements (button, anchor).<br />
 * A button element is preferred, if this is not possible use an anchor with role="button".<br /><br />
 * Use cases / best practices:
 * <ul>
 * <li>In order to switch a partial from within the modal ('elem' can be any html element): <pre><elem ng-click="changePartial('partialName.html')"/></pre></li>
 * <li>In order to switch a partial from outside the modal, one can data-bind to the partial param on the : <pre><a ing-modal partial="{{scopeVars.dynamicPartial}}" /></pre></li>
 * <li>In order to have full control over the closing of the dialog, one can trigger the 'modal-close' event</li>
 * <li>In order to receive notification of the closing of the modal, one can listen for the 'modal-closed' event</li>
 * </ul>
 *
 * It is possible to open a new modal from the active modal. A stack is used to hide the current modal and display the second modal. When the second modal is closed, then the first modal comes back.
 *
 * @example
 <example module="ingGlobal">
<file name="ing-modal.html">
    <p>
        <a role="button" ing-modal partial="basic.html" class="btn btn-default">Example 1</a>
        <button type="button" ing-modal partial="page.html" class="btn btn-default">Example 2</button>
    </p>

    <h1>Sizes</h1>
    <p>
        <button type="button" ing-modal size="sm" partial="basic.html" class="btn btn-default">Small</button>
        <button type="button" ing-modal size="md" partial="basic.html" class="btn btn-default">Medium</button>
        <button type="button" ing-modal size="lg" partial="basic.html" class="btn btn-default">Large</button>
    </p>

    <h1>Custom close link</h1>
    <p>
        <button type="button" ing-modal partial="alert.html" hide-close="true" size="sm" class="btn btn-default">Close link</button>
    </p>

    <h1>Changing/binding partial</h1>
    <p ng-controller="partialCtrl">
        <button type="button" ing-modal partial="1.html" class="btn btn-default">Change</button>
        <button type="button" ing-modal partial="{{partialName}}" class="btn btn-default">Change and re-position</button>
    </p>
</file>

 <file name="Ctrl.js">
    function partialCtrl($scope, $rootScope) {
        $scope.partialName = '3.html';

        var contentHidden = false;

        $scope.toggleContent = function() {
            contentHidden ? angular.element('#modal-content-test').show() : angular.element('#modal-content-test').hide();
            contentHidden = !contentHidden;
            $rootScope.$broadcast('modal-set-position');
        };

        $scope.closeDialog = function() {
            $rootScope.$broadcast('modal-close');
        }

        $scope.popoverConfig = {
            title: 'Titel',
            text: 'Lorem <b>Ipsum</b>',
            position: 'above-right',
            invokerSrText:'Meer informatie over item X'
        }
    }
 </file>

<file name="basic.html">
    <div class="panel panel-a">
        <div class="panel-heading">
            <h3 class="panel-title panel-title-primary">Cookies</h3>
        </div>
        <div class="panel-body">
            <p>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
            <p>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
            <p>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
        </div>
    </div>
</file>

<file name="alert.html">
    <div class="panel panel-a panel-radius">
        <div class="panel-heading">
            <h3 class="panel-title panel-title-primary">Cookies</h3>
        </div>
        <div class="panel-body">
            <p>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
        </div>
        <div class="panel-footer" ng-controller="partialCtrl">
            <button type="button" ng-click="closeDialog()" class="btn btn-primary">OK</button>
            <a ng-click="closeDialog()" class="close close-c close-float-right cursor-pointer">No, thanks</a>
        </div>
    </div>
</file>

<file name="page.html">
    <div class="panel panel-a panel-radius">
        <div class="panel-body l-pb-2">
            <div class="row">
                <div class="col col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                    <div class="content-page">
                        <h1 class="l-mb-1 h-text-center">Profile</h1>
                        <img src="/the-guide-styles-viewer/img/temp/7-4-a.jpg" alt="" class="l-mb-2 img-responsive">
                        <p>ING is a global financial institution of Dutch origin, currently offering banking, investment, life insurance (NN Group) and retirement services. We draw on our experience and expertise, our commitment to excellent service and our global scale to meet the needs of a broad customer base, comprising individuals, families, small businesses, large corporations, institutions and governments.</p>
                        <p>Our strengths include our relatively high customer satisfaction levels, solid financial position, multi-channel distribution strategy and international network. Moreover, ING is a sustainability leader in its sector.</p>
                        <h2 class="heading-b-lg">Our purpose and strategy</h2>
                        <p>ING believes all sustainable progress is driven by people with the imagination and determination to improve their future and the futures of those around them. We empower people and organisations to realise their own vision for a better future – however modest or grand. Our purpose therefore is: Empowering people to stay a step ahead in life and in business.</p>
                        <p>ING Bank's strategy aims to create a differentiating customer experience, enabled by simplify and streamlining our organisation, further striving for operational excellence, enhancing the performance culture within our company and expanding our lending capabilities. The potential for improvement in these areas varies with our current market positions, which we have divided into Market Leaders (Netherlands, Belgium and Luxembourg), Challengers (Germany, Spain, Italy, France, Australia and Austria) and Growth Markets (Poland, Romania, Turkey and our stakes in Asia). We will aim to become the primary bank for more customers through growing the share of payment accounts in retail banking and with anchor products such as lending and transaction services in commercial banking.</p>
                        <p>NN Group's focus is on service to customers, generating capital, growing profitability and improving efficiency. Its strategy is about offering appealing and easy to understand products and services, multi-access distribution and efficient and effective operations in the 18 countries in which it is active.</p>
                        <h2 class="heading-b-lg">Our stakeholders</h2>
                        <p>ING conducts business on the basis of clearly defined business principles. In all our activities, we carefully weigh the interests of our various stakeholders such as customers, employees, shareholders, civil society organisations and regulators.</p>
                        <h2 class="heading-b-lg">Our corporate responsibility</h2>
                        <p>ING wants to build its future on sustainable profit, based on sound business ethics and respect for its stakeholders. Our Business Principles prescribe the corporate values and the responsibilities we have towards society and the environment: we act with integrity, we are open and clear, we respect each other and we are socially and environmentally responsible. ING managed to further solidify the sustainability of its business model in 2013, by taking steps towards greater transparency and by growing our sustainable products offerings across all our business lines.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </file>

<file name="1.html">
    <div class="panel panel-a">
        <div class="panel-body l-p-2">
            <button class="btn btn-primary" ng-click="changePartial('2.html')">Change to 2</button>
        </div>
    </div>
</file>

<file name="2.html">
    <div class="panel panel-a">
        <div class="panel-body l-p-2">
            <button class="btn btn-primary" ng-click="changePartial('1.html')">Change to 1</button>
        </div>
    </div>
</file>

<file name="3.html">
    <div class="panel panel-a" ng-controller="partialCtrl">
        <div class="panel-body l-p-2">
            <p>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
            <button class="btn btn-primary" ng-click="toggleContent()">Toggle content and re-position</button>
            <div id="modal-content-test">
                <p><span ing-info-popover config="popoverConfig"></span>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
                <p>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
                <p>Before you go further we are obliged to ask your permission before placing any cookies on your computer. This website uses cookies to make your browsing experience more efficient and enjoyable.</p>
            </div>
        </div>
    </div>
</file>

 </example>
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-modal#modal-close
 * @eventOf ingGlobal.directive:ing-modal
 * @eventType watch on $scope
 * @description Close the modal
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-modal#modal-closed
 * @eventOf ingGlobal.directive:ing-modal
 * @eventType  emit on $scope
 * @description Used when the modal is closed. This event is fired when the fade-out animation is done.
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-modal#modal-open
 * @eventOf ingGlobal.directive:ing-modal
 * @eventType  listens on $scope
 * @description Broadcast this to the directive with its id to open the modal without click
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-modal#modal-set-position
 * @eventOf ingGlobal.directive:ing-modal
 * @eventType  watch on $scope
 * @description Re-calculate the top margin of the modal
 */

angular.module('ingGlobal').directive('ingModal', ['$compile', 'ingKeyBinderConfig', 'modalService', function ($compile, ingKeyBinderConfig, modalService) {
    return {
        restrict: 'EA',
        replace: true,
        scope: true,
        link: function (scope, element, attrs) {
            var modalScope = {},
                specialKeys = ingKeyBinderConfig.specialKeys();

            if (element.attr('tabindex') === undefined) {
                element.attr('tabindex', '0');
            }

            /** Bind to click and touchstart (for Ipad and such) to add the modal. */
            element.bind('click touchStart', function () {
                scope.createModal();
            });

            element.bind('keyup', function (e) {
                if (e.target.tagName !== 'BUTTON' && (e.which === specialKeys.enter || e.which === specialKeys.space)) {
                    scope.createModal();
                    // Prevent 'double behaviour' on buttons(which respond on ng-click))
                    e.preventDefault();
                }
            });

            scope.$on('modal-open', function (event, id) {
                if (id === attrs.id) {
                    scope.createModal();
                }
            });

            scope.createModal = function ($event) {
                var wrapperElement;

                var isInlineModal = angular.isDefined(attrs.wrappedIn) && attrs.wrappedIn !== null;
                // If the modal is an inline modal set the wrapper element based on the wrapper id
                // Otherwise set the body element as wrapper element
                if (isInlineModal) {
                    wrapperElement = angular.element('#' + attrs.wrappedIn);
                    wrapperElement.addClass('overlay-inline-wrapper');
                } else {
                    wrapperElement = angular.element('body');
                    wrapperElement.addClass('overlay-fixed-open');
                }

                var oldWidth = wrapperElement.width(),
                    deregisterClosedListener;

                wrapperElement.css('padding-right', wrapperElement.width() - oldWidth);

                if ($event) {
                    $event.preventDefault();
                }

                modalScope = scope.$new();

                modalScope.partial = attrs.partial;
                modalScope.size = attrs.size || 'lg';
                modalScope.hideClose = attrs.hideClose || false;
                modalScope.isInlineModal = isInlineModal;
                modalScope.preventCloseOnOutsideClick = attrs.preventCloseOnOutsideClick || false; //UX needs to be consulted before using this option

                deregisterClosedListener = scope.$on('modal-closed', function(event) {
                    if (event.targetScope === modalScope) {
                        var activeModal = modalService.peekForActiveModalFromStack();
                        // If it is the last modal remove the classes from the wrapper element.
                        if (angular.isUndefined(activeModal)) {
                            wrapperElement.removeClass('overlay-inline-wrapper');
                            wrapperElement.removeClass('overlay-fixed-open');

                            wrapperElement.css('padding-right', '0');
                        }
                        element.focus();

                        deregisterClosedListener();
                    }
                });

                wrapperElement.append($compile('<div class="tg" ing-modal-holder></div>')(modalScope));

                modalService.pushModalInStack(modalScope.$id);
            };

            attrs.$observe('partial', function (newP) {
                modalScope.partial = newP;
            });
        }
    };
}]);

angular.module('ingGlobal').directive('ingModalHolder', ['$timeout', 'ingKeyBinder', 'modalService', function ($timeout, ingKeyBinder, modalService) {
    return {
        restrict: 'A',
        replace: false,
        template:
            '<div id="ing-modal-{{$id}}" tabindex="-1" ng-show="isModalActive">' +
                '<div ng-show="!isInlineModal" class="backdrop backdrop-default fade" ng-class="{\'in\':showModal }" tabindex="-1"></div>' +
                '<div class="overlay overlay-centered overlay-{{size}} fade" ng-class="{\'overlay-inline overlay-margin backdrop backdrop-a\':isInlineModal,\'overlay-fixed overlay-centered\':!isInlineModal,\'in\':showModal }" ng-click="overlayClick($event)" role="dialog" tabindex="-1">' +
                    '<div class="overlay-content" ng-style="modalStyle" ng-click="overlayContentClick($event)">' +
                        '<div ng-include="partial" onload="onContentReady()" class="ing-modal-body"></div>' +
                        '<button type="button" ng-click="close()" ng-if="!hideClose" class="close close-a close-absolute-right cursor-pointer" role="button" tabindex="0" id="ing-close-modal">' +
                            '<span class="sr-only">Close</span>' +
                            '<i class="icon" aria-hidden="true"></i>' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>',
        controller: 'modalHolderController',
        link: function (scope) {
            $timeout(function () {
                scope.showModal = true;
            }, 30);

            scope.$watch(function () {
                return modalService.peekForActiveModalFromStack();
            }, function (activeModal) {
                scope.isModalActive = angular.equals(activeModal, scope.$id);
            });

            ingKeyBinder.bind('escape', function() {
                scope.close();
            });

            scope.$on('modal-close', function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                scope.close();
            });

            scope.$on('modal-set-position', function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                scope.setStyles(true);
            });
        }
    };
}]);

angular.module('ingGlobal').controller('modalHolderController', ['$scope', '$element', '$timeout', 'modalService', function ($scope, $element, $timeout, modalService) {
    // helper variables, used to decide whether modal needs to be closed on overlay(backdrop) click
    var preventCloseOnInsideClick = false;
    var preventCloseOnOutsideClick = $scope.preventCloseOnOutsideClick;

    $scope.overlayContentClick = function () {
        preventCloseOnInsideClick = true;
    };

    $scope.overlayClick = function () {
        if (preventCloseOnInsideClick || preventCloseOnOutsideClick) {
            preventCloseOnInsideClick = false; // reset to false for the next time overlayClick gets called
            return; // close wont get called when overlayContentClick is called or prevent-close-on-outside-click is passed as an argument
        }
        $scope.close();
    };

    $scope.close = function () {
        modalService.popLastModalFromStack();

        $scope.showModal = false;

        $timeout(function () {
            $scope.$apply();
        });

        $timeout(function () {
            $scope.$emit('modal-closed');
            $scope.$destroy();
            $element.remove();
        }, 500);
    };

    $scope.onContentReady = function () {
        $timeout(function () {
            $scope.setStyles();
            $scope.setFocusInModal();
            $scope.keepTabNavigationInModal();
        });
    };

    /** Update the top margin if the partial changes. */
    $scope.setStyles = function (force) {
        if (!$scope.isInlineModal ) {
            if((force || !$scope.isTopMarginSet)){
                var windowHeight = document.compatMode === 'CSS1Compat' ? angular.element(window).height() : window.document.body.clientHeight,
                    topMargin = ( windowHeight - $element.find('.overlay-content').height()) / 3;
                $scope.modalStyle = {'margin-top': (topMargin <= 40) ? 40 : topMargin + 'px'};
                $scope.isTopMarginSet = true;
            }
        }else{
            //reset the modalStyle
            $scope.modalStyle = undefined;
            $scope.isTopMarginSet = false;
        }
    };

    $scope.setFocusInModal = function () {
        var focusElems = getFocusElementsInModalBody();
        if (focusElems.length > 0) {
            focusElems[0].focus();
        } else {
            closeModalButton().focus();
        }
    };

    $scope.keepTabNavigationInModal = function () {
        var focusElems = getFocusElementsInModal();
        if (focusElems.length > 0) {
            var firstFocusElem = focusElems[0],
                lastFocusElem = focusElems[focusElems.length - 1];

            //keydown is necessary to prevent the browser from catching the tab event
            jQuery(firstFocusElem).keydown(function (event) {
                if (isBackwardTab(event)) {
                    event.preventDefault();
                    lastFocusElem.focus();
                }
            });

            //keydown is necessary to prevent the browser from catching the tab event
            jQuery(lastFocusElem).keydown(function (event) {
                if (isForwardTab(event)) {
                    event.preventDefault();
                    firstFocusElem.focus();
                }
            });
        }
    };

    $scope.changePartial = function (partial) {
        $scope.partial = partial;
    };

    function isBackwardTab(event) {
        //event.which 9 == tab
        return event.which === 9 && event.shiftKey
    }

    function isForwardTab(event) {
        //event.which 9 == tab
        return event.which === 9 && !event.shiftKey
    }

    function closeModalButton() {
        return $element.find('#ing-close-modal');
    }

    function getFocusElementsInModal() {
        var elements = $element.find(getTabbables());

        return filterDisabledTabIndexes(elements);
    }

    function filterDisabledTabIndexes(elements) {
        var tabbableElements = [];
        angular.forEach(elements, function (tabbableElement) {
            var tabIndex = tabbableElement.getAttribute('tabindex');
            if (tabIndex !== undefined) {
                //tabindexes which are -1 must be skipped
                if (tabIndex !== '-1') {
                    this.push(tabbableElement);
                }
            } else {
                //every element without tabindex is still tabbable, because of selector in getTabbables()
                this.push(tabbableElement);
            }
        }, tabbableElements);

        return tabbableElements;
    }

    function getFocusElementsInModalBody() {
        return $element.find('.ing-modal-body').find(getTabbables());
    }

    function getTabbables() {
        return 'a[href], area[href], input:not([disabled]),' +
            'select:not([disabled]), textarea:not([disabled]),' +
            'button:not([disabled]), iframe, object, embed, *[tabindex],' +
            '*[contenteditable]';
    }
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-mq-classes
 * @restrict A
 * @param {object} Object containing pairs of mq states and associated classes
 *
 * @description
 * Set classes based on the media-query that is set by the mq-service.
 * input is an object with mediaquery (e.g. 'md' or 'xl') and a associated class.
 * The directive will have a 'from' behavior. Meaning that if you set a class on 'md' it will also
 * appear on the mq's above, like 'lg' and 'xl'.
 *
 * This directive registers a watch, so don't overuse it.
 *
 * example of usage: <pre><div ing-mq-classes="{xs:'xs-until-lg someotherclass', lg:'lg-and-above'}">react on mq</div></pre>
 *
 * * @example
 <example module="ingGlobal">
     <file name="ing-mq-classes.html">
        <div ing-mq-classes="{xs:'xs-until-lg someotherclass', lg:'lg-and-above'}">Classes on this div will change with browsersize. So drag it!</div>
     </file>
 </example>
 */

angular.module('ingGlobal').directive('ingMqClasses', ['mqService', function(mqService) {
    function getAllMqClasses(mqClasses) {
        var sortedMqNames = Object.keys(mqService.mqSizes).sort(function(a, b) {
                return mqService.mqSizes[a] - mqService.mqSizes[b];
            });

        sortedMqNames.forEach(function(mqName, i) {
            if (angular.isUndefined(mqClasses[mqName])) {
                mqClasses[mqName] = mqClasses[sortedMqNames[i - 1]];
            }
        });

        return mqClasses;
    }

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var currentMq = mqService.getMqState().mq,
                mqClasses = getAllMqClasses(scope.$eval(attrs.ingMqClasses));

            // on init the classes should be set: when in ng-include the mq-changed is only initially broadcasted
            if (currentMq) {
                element.addClass(mqClasses[currentMq.name]);
            }

            scope.$on('mq-changed', function (_event_, mq) {
                var oldClasses = currentMq ? mqClasses[currentMq.name] : '',
                    newClasses = mqClasses[mq.name];

                element.removeClass(oldClasses).addClass(newClasses);
                currentMq = mq;
            });
        }
    };
}]);
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-navigator
 * @restrict EA
 * @description Directive for handling step based navigation.<br/>
 * The directive should be used to declare the structure and outline of the Navigator.<br/>
 * Any further interaction should be controlled with the {@link ingGlobal.NavigatorController NavigatorController}.
 * @param {string} name Unique name for the navigator instance.
 *
 * @example 
    <example module="ingGlobal">
    <file name="ing-navigator.html">
        <div ing-navigator name="example">
            <div ing-navigator-header></div>
            <div ing-navigator-steps>
                <div ing-navigator-step id="stepOne" title="Step 1 of 3" template="stepOne.html"></div>
                <div ing-navigator-step id="stepTwo" title="Step 2 of 3">
                    <div ng-controller="StepTwoCtrl">
                        <h3>Step 2 of 3</h3>
                        <span>This is the second step.<br />
                        From here you can navigate back or forth.<br />
                        This step uses a simpler callback function<br /><br />
                        Click <strong>previous</strong> link below or the <strong>Step 1 of 3</strong> in the step navigation above to return to the first step.<br />
                        Click <strong>next</strong> link below to proceed to the third step.</span>
                        <form name="formTwo">
                            <label class="checkbox">
                                <input type="checkbox" name="goToNext" ng-model="next"> Check this to continue...
                            </label>
                        </form>
                    </div>
                </div>
                <div ing-navigator-step id="stepThree" finished="true">
                    <h3>Finished</h3>
                </div>
            </div>
            <div ing-navigator-footer></div>
        </div>
    </file>
    <file name="stepOne.html">
        <div ng-controller="StepOneCtrl">
            <h3>Step 1 of 3</h3>
            <span>This is the most simple and straightforward example of the wizard.<br />
            This implementation has 3 steps.<br />
            This step uses a callback function with a promise.<br /><br />
            Click <strong>next</strong> link below to proceed to the second step.</span><br />
            <span ng-show="count">Next in {{count}}...</span>
        </div>
    </file>
    <file name="app.js">
        function StepOneCtrl($scope, $q, $timeout, navigatorService) {
            var navigatorCtrl = navigatorService.get('example');

            navigatorCtrl.addCallback('stepOne', function () {
                var d = $q.defer();
                $scope.count = 2;

                $timeout(function tick() {
                    $scope.count--;

                    if(angular.equals($scope.count, 0)) {
                        delete $scope.count;
                        d.resolve();
                    } else {
                        $timeout(tick, 1000);
                    }
                }, 1000);

                return d.promise;
            });
        }

        function StepTwoCtrl($scope, navigatorService) {
            var navigatorCtrl = navigatorService.get('example');

            navigatorCtrl.addCallback('stepTwo', function (target) {
                return angular.equals(target, 'stepThree') ? !!$scope.next : true;
            });
        }
    </file>
    </example>
 */

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-navigator-step
 * @restrict EA
 * @description Directive which defines a step in the navigator.
 * @param {string} id Unique id of this step.
 * @param {string} title Label for the links in the Navigator header.
 * @param {string=} finished Boolean indicator for the last step.
 * @param {string=} icon Icon for the last step. See {@link #/style/foundation/icons#single-icons Icons} for a list of available icons.
 * @param {string=} nextLabel Label for the next button.
 * @param {string=} previousLabel Label for the previous button.
 */

/**
 * @ngdoc interface
 * @name ingGlobal.NavigatorController
 * @description The controller for the Navigator directive.<br/>
 * It exposes an interface to externally control the Navigator.<br/>
 * Use {@link ingGlobal.navigatorService#methods_get navigatorService#get} to get hold of the controller for a given instance.
 */

/**
 * @ngdoc service
 * @name ingGlobal.navigatorService
 * @kind function
 * 
 * @description
 * The navigatorService provides access to the {@link ingGlobal.NavigatorController NavigatorController} for each Navigator instance on the page.
 */
angular.module('ingGlobal')
    .directive('ingNavigator', [
        function() {
            return {
                template: '<div id="{{navId}}" class="panel panel-bordered" ng-transclude></div>',
                restrict: 'EA',
                replace: true,
                transclude: true,
                controller: 'NavigatorCtrl',
                link: function($scope, element, $attr) {
                    $scope.navId = $attr.name;
                    
                    if ($scope.steps.length > 0) {
                        $scope.currentStepId = $scope.steps[0].id;
                    }

                    $scope.update();
                }
            };
        }
    ])
    .directive('ingNavigatorSteps', ['$compile',
        function($compile) {
            return {
                transclude: true,
                restrict: 'EA',
                require: '^ingNavigator',
                scope: false,
                compile: function() {
                    var node = angular.element('<div class="panel-body" ng-switch on="currentStepId" />');

                    return function($scope, element, $attr, navCtrl, transcludeFn) {
                        transcludeFn($scope, function(clone) {
                            node.append(clone);
                            element.replaceWith(node);
                        });

                        node.children().each(function(i, _child) {
                            var child = angular.element(_child);
                            child.attr('ng-switch-when', child.data('_navigatorStepId'));
                        });

                        node.replaceWith($compile(node)($scope));
                    };
                }
            };
        }
    ])
    .directive('ingNavigatorStep', ['$interpolate',
        function($interpolate) {
            return {
                restrict: 'EA',
                require: '^ingNavigator',
                scope: false,
                compile: function(tElement, tAttrs) {
                    var node = angular.element('<div />');
                    if (angular.isDefined(tAttrs.template)) {
                        node.append(angular.element('<div ng-include="\'' + tAttrs.template + '\'" />'));
                    } else {
                        node.append(tElement.contents());
                    }

                    node.data('_navigatorStepId', tAttrs.id);
                    return function($scope, element, $attr, navCtrl) {
                        element.replaceWith(node);

                        navCtrl.register({
                            id: tAttrs.id,
                            title: angular.isString(tAttrs.title) ? $interpolate(tAttrs.title)($scope) : '',
                            finished: angular.isDefined(tAttrs.finished),
                            icon: angular.isString(tAttrs.icon) ? $interpolate(tAttrs.icon)($scope) : '',
                            nextLabel: angular.isString(tAttrs.nextLabel) ? $interpolate(tAttrs.nextLabel)($scope) : 'Volgende',
                            previousLabel: angular.isString(tAttrs.previousLabel) ? $interpolate(tAttrs.previousLabel)($scope) : 'Vorige'
                        });
                    };
                }
            };
        }
    ])
    .directive('ingNavigatorHeader', [
        function() {
            var template =
                '<div class="panel-heading l-p-0">' +
                '  <div class="pagination-wrapper pagination-steps-wrapper" ng-class="{\'pagination-steps-wrapper-a\': finishedStep, \'pagination-complete-text\': finishedStep.title}">' +
                '    <ol class="pagination pagination-steps pagination-steps-a">' +
                '      <li class="pagination-item" ng-repeat="step in steps track by step.id" ng-class="{\'visited\':step.visited ,\'active\':step.id==currentStepId}" ' +
                '          ng-switch="" on="step.visited">' +
                '        <a href="javascript:;" ng-click="goTo()" class="pagination-element" ng-switch-when="true">' +
                '          <span class="pagination-type">{{step.index}}</span>' +
                '          <span class="pagination-text">{{step.title}}</span>' +
                '          <span class="arrow pagination-arrow"></span>' +
                '        </a>' +
                '        <span class="pagination-element" ng-switch-default>' +
                '          <span class="pagination-type">{{step.index}}</span>' +
                '          <span class="pagination-text">{{step.title}}</span>' +
                '          <span class="arrow pagination-arrow"></span>' +
                '        </span>' +
                '      </li>' +
                '    </ol>' +
                '    <div class="pagination-complete" ng-if="finishedStep" ng-class="{active: finishedStep.id===currentStepId}">' +
                '      <div class="pagination-complete-item" ng-class="{\'l-pl-2\':finishedStep.title}">' +
                '        <span aria-hidden="true" class="icon" ng-class="finishedStep.icon"></span>' +
                '      </div>' +
                '      <div class="pagination-complete-item" ng-if="finishedStep.title">' +
                '        <span>{{finishedStep.title}}</span>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>';
            return {
                template: template,
                replace: true,
                restrict: 'EA',
                require: '^ingNavigator',
                scope: false,
                link: function($scope, element, $attr, navCtrl) {
                    $scope.goTo = function() {
                        var step = this.step;
                        if (!angular.isObject(step)) {
                            return;
                        }

                        navCtrl.navigate(step.id);
                    };
                }
            };
        }
    ])
    .directive('ingNavigatorFooter', [
        function() {
            var template =
                '<div class="row l-p-2">' +
                '  <div class="col-lg-3">' +
                '    <button type="button" class="btn btn-secondary icon-position icon-before icon-position-lg" ng-if="hasPrevious" ng-click="goToPrevious()">' +
                '      <i class="icon icon-arrow-g-left icon-lg" aria-hidden="true"></i> {{previousLabel}}' +
                '    </button>' +
                '  </div>' +
                '  <div class="col-lg-9">' +
                '    <button type="button" class="btn btn-primary icon-position icon-after icon-position-lg" ng-if="hasNext" ng-click="goToNext()">' +
                '      <i class="icon icon-arrow-g-right icon-lg" aria-hidden="true"></i> {{nextLabel}}' +
                '    </button>' +
                '  </div>' +
                '</div>';

            return {
                template: template,
                replace: true,
                restrict: 'EA',
                require: '^ingNavigator',
                scope: false,
                link: function($scope, element, $attr, navCtrl) {
                    $scope.goToNext = function() {
                        navCtrl.next();
                    };

                    $scope.goToPrevious = function() {
                        navCtrl.previous();
                    };
                }
            };
        }
    ])
    .controller('NavigatorCtrl', ['$scope', '$attrs', '$filter', '$q', '$window', 'navigatorService', 'businessMonitoring',
        function($scope, $attrs, $filter, $q, $window, navigatorService, businessMonitoring) {
            var MUTABLE_PROPS = ['title', 'nextLabel', 'previousLabel'];
            var self = this,
                callbacks = {},
                restrictions = {};
            $scope.steps = [];

            if (!angular.isString($attrs.name)) {
                throw new Error('[NavigatorCtrl]: unable to register a Navigator without a name');
            }

            // register the controller at the service, this allows other controllers to use this controller
            navigatorService.register($attrs.name, this);

            /**
             * Return the index (zero-based) of the current step.
             * @returns {number} the index of the current step
             */
            function getCurrentIndex() {
                var i;

                for (i = 0; i < $scope.steps.length; i++) {
                    if (angular.equals($scope.steps[i].id, $scope.currentStepId)) {
                        return i;
                    }
                }
                
                if(angular.isDefined($scope.finishedStep) && angular.equals($scope.finishedStep.id, $scope.currentStepId)) {
                    return $scope.steps.length;
                }

                throw new Error('[NavigatorCtrl]: unable to determine index of current step');
            }

            /**
             * Return the step with given id, or if increment is provided the step with index [index of 'id'] + increment.
             * @param {type} id Id of the step
             * @param {type} increment the index based increment
             * @returns {Object} the requested step or undefined if not found
             */
            function getStep(id, increment) {
                if (!angular.isNumber(increment)) {
                    increment = 0;
                }

                if (angular.isDefined($scope.finishedStep) && angular.equals(id, $scope.finishedStep.id)) {
                    if (angular.equals(increment, 0)) {
                        return $scope.finishedStep;
                    } else if (increment < 0) {
                        return $scope.steps[$scope.steps.length - 1];
                    } else {
                        return undefined;
                    }
                }

                var i;
                for (i = 0; i < $scope.steps.length; i++) {
                    if (angular.equals($scope.steps[i].id, id)) {
                        if (i + increment < $scope.steps.length) {
                            return $scope.steps[i + increment];
                        } else if (angular.isDefined($scope.finishedStep) && angular.equals(increment, 1)) {
                            return $scope.finishedStep;
                        }
                    }
                }

                return undefined;
            }

            /**
             * Checks if there is a restriction to navigate from the given step to the target step.
             * @param {type} stepId Id of the step to navigate from
             * @param {type} targetId Id of the step to navigate to
             * @returns {boolean} true if there is no restriction, false otherwise
             */
            function isRestricted(stepId, targetId) {
                return angular.isDefined(restrictions[stepId]) && $filter('filter')(restrictions[stepId], targetId).length > 0;
            }

            /**
             * Update the state of each step.
             * This function is on the scope to allow (child) directives to execute it.
             */
            $scope.update = function() {
                var index = getCurrentIndex(),
                    current = self.current();
                angular.forEach($scope.steps, function(step, i) {
                    if ((angular.isDefined($scope.finishedStep) && angular.equals(current.id, $scope.finishedStep.id)) || i >= index || isRestricted(current.id, step.id)) {
                        delete step.visited;
                    } else {
                        step.visited = true;
                    }
                });

                $scope.nextLabel = current.nextLabel;
                $scope.previousLabel = current.previousLabel;

                var prevStep = getStep(current.id, -1);
                if (angular.isDefined(prevStep) && isRestricted(current.id, prevStep.id)) {
                    $scope.hasPrevious = false;
                } else {
                    $scope.hasPrevious = index > 0 && (angular.isUndefined($scope.finishedStep) || !angular.equals(current.id, $scope.finishedStep.id));
                }

                var nextStep = getStep(current.id, 1);
                if (angular.isDefined(nextStep) && isRestricted(current.id, nextStep.id)) {
                    $scope.hasNext = false;
                } else {
                    $scope.hasNext = index + 1 < $scope.steps.length + (angular.isDefined($scope.finishedStep) ? 1 : 0);
                }
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#register
             * @description Register a step with the NavigatorController.<br>
             * This is handled by ingNavigatorStep.
             * @param {Object} step The step object.
             */
            this.register = function(step) {
                if (!angular.isObject(step)) {
                    throw new Error('[NavigatorCtrl]: "step" should be an object');
                }

                if (!angular.isDefined(step.id)) {
                    throw new Error('[NavigatorCtrl]: attribute "id" is required for every step');
                }

                // We send business monitoring info on navigation in the navigate()
                // method, but also need to do so upon initialisation.
                if($scope.steps.length === 0){
                    // We're registering the first step
                    businessMonitoring.sendFormStep($attrs.name, 'start', 1);
                }

                if (!!step.finished) {
                    delete step.nextLabel;
                    delete step.previousLabel;
                    $scope.finishedStep = step;
                } else {
                    delete step.icon;
                    $scope.steps.push(step);
                    step.index = $scope.steps.length;
                }
                
                delete step.finished;
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#updateStepProperty
             * @description Modify a property of the step with given id.
             * @param {string} id id of the step.
             * @param {string} key property name, valid properties are: `title`, `nextLabel` and `previousLabel`.
             * @param {string} value new property value.
             */
            this.updateStepProperty = function (id, key, value) {
                if (!angular.equals($filter('filter')(MUTABLE_PROPS, key).length, 1)) {
                    throw new Error('[NavigatorCtrl]: "' + key + '" is not a mutable property');
                }

                var step = getStep(id);
                if (angular.isUndefined(step)) {
                    throw new Error('[NavigatorCtrl]: unable to find step with id "' + id + '"');
                }

                step[key] = value;
                $scope.update();
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#addCallback
             * @description Add a callback function to the step with given id.<br/>
             * The callback function is called with a single parameter, the id of the step which is navigated to.<br/>
             * A callback function can return a boolean or a promise, the navigation is blocked if the promise is rejected or the return value is `false` (compared using strict equality)
             * @param {string} id id of the step.
             * @param {function} fn callback function.
             */
            this.addCallback = function(id, fn) {
                if (!angular.isFunction(fn)) {
                    throw new Error('[NavigatorCtrl]: the callback has to be a function');
                }

                callbacks[id] = fn;
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#restrict
             * @description Disable navigation from step with given id to the given step(s).
             * @param {string} id Id of the step the restriction applies to.
             * @param {string|string[]} steps Id of the restricted step, or an array with id's.
             */
            this.restrict = function(id, steps) {
                if (!angular.isDefined(getStep(id))) {
                    throw new Error('[NavigatorCtrl]: unable to find step with id: "' + id + '"');
                }

                if (!angular.isDefined(restrictions[id])) {
                    restrictions[id] = [];
                }

                var _steps = angular.isArray(steps) ? steps : [steps];
                angular.forEach(_steps, function(step) {
                    if (angular.equals($filter('filter')(restrictions[id], step).length, 0)) {
                        restrictions[id].push(step);
                    }
                });

                $scope.update();
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#allow
             * @description Allow navigation from step with given id to the given step(s).
             * @param {string} id Id of the step the allowance applies to.
             * @param {string|string[]} steps Id of the allowed step, or an array with id's.
             */
            this.allow = function(id, steps) {
                if (!angular.isDefined(getStep(id))) {
                    throw new Error('[NavigatorCtrl]: unable to find step with id: "' + id + '"');
                }

                if (angular.isDefined(restrictions[id])) {
                    var _steps = angular.isArray(steps) ? steps : [steps];
                    restrictions[id] = $filter('filter')(restrictions[id], function(value) {
                        return angular.equals($filter('filter')(_steps, value).length, 0);
                    });

                    $scope.update();
                }
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#current
             * @description Return the current step object based on $scope.currentStepId;
             * @returns {Object} the step object.
             */
            this.current = function() {
                if (angular.isDefined($scope.finishedStep) && angular.equals($scope.currentStepId, $scope.finishedStep.id)) {
                    return $scope.finishedStep;
                }

                return $filter('filter')($scope.steps, {id: $scope.currentStepId})[0];
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#navigate
             * @description Navigate to the given step
             * @param {Object|string} step the step object or the id of the step
             */
            this.navigate = function(_step) {
                var current = self.current(),
                    result = true;

                var step;
                if (angular.isString(_step)) {
                    step = getStep(_step);
                    if (!angular.isDefined(step)) {
                        throw new Error('[navigatorCtrl]: unable to find step "' + _step + '"');
                    }
                } else {
                    step = _step;
                }

                if (isRestricted(current.id, step.id)) {
                    return;
                }

                if (callbacks.hasOwnProperty(current.id)) {
                    result = callbacks[current.id](step.id);
                }

                $q.when(result).then(function(allowed) {
                    if (!angular.isDefined(allowed) || !!allowed) {
                        $window.scrollTo(0, 0);
                        delete step.visited;
                        $scope.currentStepId = step.id;
                        $scope.update();

                        var formStatus = '', stepNumber = step.index;
                        if(angular.isDefined($scope.finishedStep) && angular.equals(step.id, $scope.finishedStep.id)){
                            formStatus = 'conf';
                            // finishedStep is not added to $scope.steps,
                            // but saved to $scope.finishedStep. Since it's the
                            // final step, it's an increment to the second-to-last's
                            // index (which is 1-based).
                            stepNumber = $scope.steps.length + 1;
                        }
                        businessMonitoring.sendFormStep($attrs.name, formStatus, stepNumber);
                    }
                });
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#previous
             * @description Navigate to the previous step.
             */
            this.previous = function() {
                var current = self.current(),
                    previous = getStep($scope.currentStepId, -1);

                if (!angular.isObject(previous)) {
                    throw new Error('[navigatorCtrl]: unable to find step before "' + current.id + '"');
                }

                self.navigate(previous);
            };

            /**
             * @ngdoc method
             * @methodOf ingGlobal.NavigatorController
             * @name ingGlobal.NavigatorController#next
             * @description Navigate to the next step.
             */
            this.next = function() {
                var current = self.current(),
                    next = getStep($scope.currentStepId, 1);

                if (!angular.isObject(next)) {
                    throw new Error('[navigatorCtrl]: unable to find step after "' + current.id + '"');
                }

                self.navigate(next);
            };
        }
    ])
    .factory('navigatorService', [
        function() {
            var instances = {};

            return {
                /**
                 * @ngdoc method
                 * @methodOf ingGlobal.navigatorService
                 * @name ingGlobal.navigatorService#register
                 * @description Register a Navigator instance with the navigatorService.<br>
                 * This is handled by the {@link ingGlobal.NavigatorController NavigatorController}
                 * @param {string} name Unique id of the Navigator instance.
                 * @param {Object} instance The NavigatorController instance.
                 */
                register: function(name, instance) {
                    instances[name] = instance;
                },
                /**
                 * @ngdoc method
                 * @methodOf ingGlobal.navigatorService
                 * @name ingGlobal.navigatorService#get
                 * @description Returns the {@link ingGlobal.NavigatorController NavigatorController} for the instance with given id.
                 * @param {string} name Unique id of the Navigator instance.
                 * @returns {Object} The {@link ingGlobal.NavigatorController NavigatorController} for the Navigator instance with given id.
                 */
                get: function(name) {
                    return instances[name];
                }
            };
        }
    ]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-notification
 * @restrict E
 *
 * @param {String} type                 The type of the notification (error, warning, info, success)
 * @param {Boolean=} [closeable=false]  Indicating whether notification can be closed by end user.
 * @param {Boolean=} [unboxed=false]    Indicating whether notification has a 'box'(background-color and border.)
 * @param {Boolean=} [block=false]      Indicating whether notification is shown as block element.
 *
 * @description
 * Directive for displaying a notification.
 *
 * @example
 *
 * Please see <a href="#/spectingular/ingGlobal.directive:ing-validation-group">ing-validation-group</a> for an example inside a form (validation-group).
 *
 <example module="ingGlobal">
 <file name="ing-notification.html">
     <div ng-controller="Ctrl">
        <h1>Types</h1>
        <div ing-notification type="info">
            <strong>Info!</strong> This is an info notification
        </div>

        <div ing-notification type="success">
            <strong>Success!</strong> This is a success notification
        </div>

        <div ing-notification type="warning">
            <strong>Warning!</strong> This is a warning notification
        </div>

        <div ing-notification type="error">
            <strong>Error!</strong> This is an error notification
        </div>

        <h1>Options</h1>
        <div ing-notification unboxed type="info">
            {{msg}}
        </div>

        <div ing-notification closeable type="info">
            {{msg}}
        </div>

        <div ing-notification block type="info">
            <span ng-bind-html="msgBind"/>
        </div>

        <h1>With other directive inside</h1>
        <div ing-notification type="error" closeable>
            <span ng-bind-html="errorMsg"></span>
            <div ing-popover>
                <a href ing-popover-invoker>
                    Meer informatie
                </a>
                <div ing-popover-content position="above-right">
                    <h3 ing-popover-title>Meer informatie</h3>
                    <span ng-bind-html="errorMoreInfo"></span>
                </div>
            </div>
        </div>

     </div>
 </file>

 <file name="Ctrl.js">
     function Ctrl($scope){
        $scope.msg = 'This is an information notification';
        $scope.msgBind = 'This is an information notification bound via ng-bind-html';

        $scope.errorMsg = 'Sorry, u kunt tijdelijk geen Kinder- of Jongerenrekening openen. Probeert u het later eens. Excuses voor het ongemak.';
        $scope.errorMoreInfo = "<p>Wilt u ons verder helpen, belt u dan met de Klantenservice: 0900 0933 (10 cent per minuut) en geeft u de volgende code door: <strong>125.0.2.1018</strong></p><p>De Klantenservice is bereikbaar van maandag tot en met vrijdag van 8-21 uur en op zaterdag van 9-17 uur.</p>";
     }
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingNotification', function() {
    return {
        restrict: 'EA',
        transclude: true,
        require: '?^ingValidationGroup',
        replace: true,
        scope: {
            type: '@'
        },
        template:
            '<div ng-class="{alert: !inValidationGroup, \'alert-inline\': !inValidationGroup && !block,\'help-block message\': inValidationGroup, \'alert-transparent\':unboxed, \'alert-danger\':boxClass==\'error\' && !inValidationGroup, \'alert-warning\':boxClass==\'warning\' && !inValidationGroup, \'alert-info\':boxClass==\'info\' && !inValidationGroup, \'alert-success\':boxClass==\'success\' && !inValidationGroup}" role="alert" ng-show="showNotification">' +
                '<span class="stacked-icon icon-lg">' +
                    '<i aria-hidden="true" class="icon icon-notification-{{iconClass}}-z1 icon-{{color}}"></i>' +
                    '<i aria-hidden="true" class="icon icon-notification-{{iconClass}}-z2 icon-white"></i>' +
                '</span>' +
                '<button type="button" class="close close-default close-float-right" ng-click="closeNotification()" ng-if="closeable">' +
                    '<i aria-hidden="true" class="icon icon-xs"></i>' +
                '</button>' +
                '<span ng-transclude></span>' +
            '</div>',
        link: function(scope, element, attrs, validationGroupCtrl) {
            scope.inValidationGroup = !!validationGroupCtrl; // convert controller availability to boolean value
            scope.showNotification = true;

            scope.unboxed = angular.isDefined(attrs.unboxed);
            scope.block = angular.isDefined(attrs.block);
            scope.closeable = angular.isDefined(attrs.closeable);

            function setStylingValues() {
                switch (scope.type.toUpperCase())
                {
                    case 'WARNING':
                        scope.boxClass = scope.iconClass = 'warning';
                        scope.color = 'orange';
                        break;
                    case 'ERROR':
                    case 'PROBLEM_REPORT':
                        scope.boxClass = scope.iconClass = 'error';
                        scope.color = 'red';
                        break;
                    case 'SUCCESS':
                        scope.boxClass = scope.iconClass = 'success';
                        scope.color = 'green';
                        break;
                    case 'INFO':
                        scope.boxClass = 'info';
                        scope.iconClass = 'information';
                        scope.color = 'gray';
                        break;
                    default:
                        scope.boxClass = scope.iconClass = '';
                        scope.color = '';
                }
            }

            scope.$watch('type', function(t){
                if(angular.isDefined(t)){
                    setStylingValues();
                }
            });

            scope.closeNotification = function() {
                scope.showNotification = false;
            };
        }
    };
});
'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-notify
 * @restrict EA
 * @param {String} on-element The input or form element that can hold an error
 * @param {String} validate an expression referring to validators on the input element, evaluating whether content needs to be shown(for example: 'ingRequired' or 'minlength && !ingUsername').

 *
 * @description
 * You can attach this directive to form elements to display their respective validation errors.
 * This directive has control over the visibility state of the element it is applied on.
 *
 * @example
 * See <a href="#/spectingular/ingGlobal.directive:ing-validation-group">ing-validation-group</a> for examples.
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingNotify', ['$parse',
    function($parse) {
        /**
         * Helper function: rewrites expression to a format the $eval function 'understands'.
         * @param {string} expr - the expression given in the validate attribute
         * @returns {string}
         */
        function rewriteExpr(expr) {
            var aExpr = expr.replace(/\s+/g, '').replace(/&&/g, ' && ').replace(/\|\|/g, ' || ').split(' ');
            for (var i in aExpr) {
                if (jQuery.inArray(aExpr[i], ['&&', '||']) === -1) {
                    var isNegation = aExpr[i].toString().substr(0, 1) === '!',
                        validator = isNegation ? aExpr[i].toString().substr(1) : aExpr[i];

                    aExpr[i] = (isNegation ? '!' : '') + 'inputEl.$error.' + validator;
                }
            }
            return aExpr.join(' ');
        }
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            require: ['^form', '?^ingValidationGroup'],
            scope: true,
            template: '<div ng-show="showError" ng-transclude/>',
            link: function(scope, element, attrs, ctrls) {
                var formCtrl = ctrls[0],
                    valGroupCtrl = ctrls[1];

                var parseExp = $parse(rewriteExpr(attrs.validate));

                /* if validationGroup as parent, keep track of its state */
                var valGroupError = true;
                if (valGroupCtrl) {
                    scope.$watch(function() {
                        return valGroupCtrl.scope.showError;
                    }, function(showVgError) {
                        valGroupError = showVgError;
                    });
                }

                /* watch function that determines whether or not this ingNotify needs to show its content */
                scope.$watch(
                    function() {
                        var inputEl = formCtrl[attrs.onElement];
                        if (angular.isDefined(inputEl)) {
                            scope.inputEl = inputEl;
                            if (!valGroupError) { // Only show error if validation group doesn't prevent it's children from doing so
                                return false;
                            } else if (attrs.validate === 'ingRequired') {
                                return parseExp(scope);
                            } else {
                                return parseExp(scope) && !scope.inputEl.$error.ingRequired;
                            }
                        }
                    },
                    function(showError) {
                        scope.showError = showError;
                    }
                );
            }
        };
    }]);

'use strict';

/**
* @ngdoc directive
* @name ingGlobal.directive:ing-popover
* @restrict EA
* @scope =
*
* @param {String} [position] popover position relative to the container
* @param {String} [size] values: auto, xs, sm, md, lg (default is xs)
*
* @description
* Directive for displaying a popover.
*
* Position can be one of the following:
* right-down, above-right, above-left, below-right(default,) below-left
*
* @example
<example module="ingGlobal">

 <file name="ing-popover.html">

    <h2 class="heading-b-md">Usage example</h2>

    <div class="panel">
        <div ing-popover>
             <button ing-popover-invoker>
                <span ing-info-icon sr-text="Meer info over item X"></span>
             </button>
             <div ing-popover-content position="above-right">
                 <h3 ing-popover-title>Tooltip</h3>
                 Lorem ipsum
             </div>
         </div>
    </div>

    <h2 class="heading-b-md">Position demo</h2>

    <!-- Please use code above as implementation example -->

    <div data-popover-demo ng-controller="Ctrl" style="position:relative"><div ng-style="btnStyle"><input ng-model="ttt" ng-click="stopProp($event)"></input><button style="width:200px;" ng-click="posToggle($event)">{{preferredPosition || 'Toggle position'}}</button></div><div ing-popover style="position:absolute; top: 100px;"><a href class="btn btn-primary" ing-popover-invoker>Invoke popover</a><div ing-popover-content><h3 ing-popover-title>{{position}}</h3>{{ttt}}</div></div></div>
  </file>

    <file name="positionDemo.js">

        // Note: code below only needed for positioning demo

        function Ctrl($scope, $element, $timeout) {

            var demoTop = $('[data-popover-demo]').offset().top;

            $(document).scroll(function(){
                var btnStylePrev = $scope.btnStyle;

                if( $(document).scrollTop()  >= demoTop ){
                    $scope.btnStyle = {position:'fixed', top:'10px'};
                }else {
                    $scope.btnStyle = {position:'absolute', top:'10px'};
                }
                if(!angular.equals($scope.btnStyle, btnStylePrev)){
                    $scope.$digest();
                }
            });


            $scope.ttt = 'Popover content';

            var n = 0;
            $scope.posToggle = function(e){
                var poss = ['above-left', 'below-right', 'right-down', 'below-left', 'above-right', 'right-down' ];
                $scope.preferredPosition = $('[data-popover-demo] .overlay-content').scope().preferredPosition = poss[n % poss.length];
                n ++;

                e.stopPropagation();
                $('[data-popover-demo] .overlay-content').scope().positionPopover();
            }

            $scope.stopProp = function(e){
                e.stopPropagation();
            }
        }
    </file>
</example>
*/

/*global jQuery*/
angular.module('ingGlobal').directive('ingPopover', [function() {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope:true,
        template: '<div style="position:relative; display:inline-block;"></div>',
        link:function (scope, element, attrs, ctrl, transclude) {
            // Share scope
            transclude(scope, function(clone){
                element.append(clone);
            });
        }
    };
}]);


angular.module('ingGlobal').directive('ingPopoverInvoker', function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        template:'<a href="" role="button"></a>',
        link: function (scope, element, attrs, ctrl, transclude) {

            jQuery(document).bind('keyup.popover-' + scope.$id, function(e) {
                if(e.which === 27) { //esc
                    scope.closePopover();
                }
            });

            element.bind('click.popover-' + scope.$id, function(e) {
                scope.togglePopover();
                e.stopPropagation();
            });

            jQuery(document).bind('click.popover-' + scope.$id, function() {
                scope.closePopover();
            });

            scope.invokerElem = element; //share invoker element with popoverController

            scope.$on('$destroy', function(){
                jQuery(document).unbind('keyup.popover-' + scope.$id);
                jQuery(document, element).unbind('click.popover-' + scope.$id);
            });

            // Share scope
            transclude(scope, function(clone){
                element.append(clone);
            });
        },
        controller: 'popoverController'
    };
});


angular.module('ingGlobal').directive('ingPopoverContent', ['popoverPositionService', '$timeout', '$parse', '$animate', function (popoverPosition, $timeout, $parse, $animate) {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        template:
            '<div ng-show="visible" class="overlay overlay-{{size}} fade overlay-padding" ng-style="popoverStyle">' +
                '<div data-popover-content class="arrow-sm overlay-content panel panel-shadow-a h-bg-a l-mb-0">' +
                    '<button type="button" ng-click="closePopover()" class="close close-default close-float-right">' +
                        '<span class="sr-only">Sluiten</span>' +
                        '<i class="icon" aria-hidden="true"></i>' +
                    '</button>' +
                    '<div class="arrow arrow-bordered" ng-style="popoverArrowStyle" ng-class="{' +
                        '\'arrow-down\':    position == \'above-right\' || position == \'above-left\','   +
                        '\'arrow-up\':      position == \'below-right\' || position == \'below-left\','   +
                        '\'arrow-left\':    position == \'right-down\'}">'  +
                    '</div>' +
                '</div>' +
            '</div>',
        link: function (scope,element,attrs, ctrl, transclude){
            attrs.$observe('size', function(s){
                scope.size = s || 'xs';
            });

            attrs.$observe('position', function(p){
                scope.preferredPosition = p || 'below-right';
            });

            // For cross browser/device compatible css animation, apply styles successively
            scope.$watch('active', function(active) {
                if(active) {
                    scope.visible = true;
                    $timeout(function(){
                        scope.$digest();
                        $animate.addClass(element, 'in');
                        scope.positionPopover();
                    });
                } else {
                    $animate.removeClass(element, 'in', function(){
                        scope.visible = false;
                        $timeout(function(){
                            scope.$digest();
                        });
                    });
                }
            });

            transclude(scope, function(clone){
                element.find('[data-popover-content]').append(clone);
            });

            element.click(function (e) {
                e.stopPropagation();
            });

            // share elem with popoverController
            scope.popoverContentElem = element.find('[data-popover-content]');

        },
        controller: 'popoverController'
    };
}]);


angular.module('ingGlobal').controller('popoverController', ['$scope', '$element', '$timeout', '$rootScope', 'utilsService', 'popoverPositionService', function ($scope, $element, $timeout, $rootScope, utilsService, popoverPosition) {

    $scope.positionPopover = function () {
        var popoverElem = $scope.popoverContentElem,
            invokerElem = $scope.invokerElem,
            space       = utilsService.getSpaceInViewport(popoverElem, invokerElem);

        if(!utilsService.isNoSpaceInViewport(space) && !utilsService.isSpaceInViewportAllDirections(space)){
            var newPos  = popoverPosition.determineNewPosition($scope.preferredPosition, space);
            $scope.position = newPos !== null ? newPos: $scope.preferredPosition;
        } else {
            $scope.position = $scope.preferredPosition;
        }

        $scope.popoverStyle         = popoverPosition.getStylingFromPosition($scope.position, popoverElem, invokerElem);
        $scope.popoverArrowStyle    = popoverPosition.getArrowStylingFromPosition($scope.position, popoverElem, invokerElem);
    };

    $scope.togglePopover = function() {
        var active = $scope.active; // Save visibility state, so toggle doesn't get affected by broadcast
        $rootScope.$broadcast('close-all-popovers');
        $scope.active = !active;
    };

    $scope.closePopover = function() {
        $scope.active = false;
        $timeout(function() {
            $scope.$digest();
        });
    };

    $scope.$on('close-all-popovers', function() {
        $scope.closePopover();
    });

}]);


angular.module('ingGlobal').directive('ingPopoverTitle', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        replace: true,
        link:function (scope, element) {
            $timeout(function(){ // Minimize DOM manipulation, align with digest cycles
                element.addClass('heading-b-md l-mb-0 h-text-b');
            });
        }
    };
}]);


angular.module('ingGlobal').service('popoverPositionService', [function () {

    var constants = {
        MARGIN        : 15,     // amount of px between invoker and popover
        POPOVER_X     : -30,    // amount of px needed to align popover arrow with invoker
        ARROW_X       : 20      // amount of px between arrow and tooltip border
    };

    function determineNewPosition(position, space) {
        var noSpaceForGivenPosition =
            (position === 'right-down'  && !space.right)                    ||
            (position === 'above-right' && (!space.top || !space.right))    ||
            (position === 'above-left'  && (!space.top || !space.left))     ||
            (position === 'below-right' && (!space.bottom || !space.right)) ||
            (position === 'below-left'  && (!space.bottom || !space.left));

        if (noSpaceForGivenPosition){
            return getPositionFromViewportSpace(space);
        } else {
            return position;
        }
    }

    function getPositionFromViewportSpace(space){
        var position = null;

        // Position right if possible
        if (space.right) {
            if (space.bottom) {
                position = 'below-right';
            }
            else if (space.top) {
                position = 'above-right';
            }
            else {
                position = 'right-down';
            }
        }
        // Position left if no space on right
        else if (space.left) {
            if (space.bottom) {
                position = 'below-left';
            }
            else if (space.top) {
                position = 'above-left';
            }
        }
        return position;
    }

    function getStylingFromPosition(position, popoverElem, invokerElem) {
        var style;

        var popover = {
            width: popoverElem.outerWidth(true),
            height: popoverElem.outerHeight(true),
            margin: constants.MARGIN,
            popoverX: constants.POPOVER_X
        };

        var invoker = {
            width:  invokerElem.outerWidth(),
            height: invokerElem.outerHeight(),
            left:   invokerElem.offset().left,
            top:    invokerElem.offset().top
        };

        switch(position){
            case 'right-down':
                style = { top: 0, left: invoker.width + popover.margin + 'px' };
                break;
            case 'above-right':
                style = { bottom: invoker.height + popover.margin + 'px', left: invoker.width + popover.popoverX + 'px' };
                break;
            case 'above-left':
                style = { bottom: invoker.height + popover.margin + 'px', left: - popover.width - popover.popoverX + 'px' };
                break;
            case 'below-right':
                style = { top: invoker.height + popover.margin + 'px', left: invoker.width + popover.popoverX + 'px' };
                break;
            case 'below-left':
                style = { top: invoker.height + popover.margin + 'px', left: - popover.width - popover.popoverX + 'px' };
                break;
        }

        return style;
    }


    function getArrowStylingFromPosition(position, popoverElem, invokerElem) {
        var invokerHeight   = invokerElem.outerHeight(),
            arrowHeight     = popoverElem.find('.arrow').outerWidth(true),
            style;

        if (position === 'right-down'){
            style = { top: Math.max(invokerHeight/2, 11) + 'px' }; //11px is minimum for arrow to align properly with top
        }
        else if(position === 'above-right' || position === 'below-right') {
            style = { left: + constants.ARROW_X + 'px', right:'auto' };
        }
        else if(position === 'above-left' || position === 'below-left'){
            style = { right: constants.ARROW_X - 5 - (arrowHeight/2) + 'px', left:'auto' }; //5px correction needed, since same values for right and left positioning don't result in same offset
        }
        return style;
    }

    return {
        determineNewPosition :          determineNewPosition,
        getStylingFromPosition :        getStylingFromPosition,
        getArrowStylingFromPosition:    getArrowStylingFromPosition,
        getPositionFromViewportSpace :  getPositionFromViewportSpace
    };

}]);


'use strict';

/**
* @ngdoc directive
* @name ingGlobal.directive:ing-progress
* @restrict AE
*
* @param {String}      id                      Unique string. This value will be used in wai-aria..
* @param {Number}      min                     The minimal value. Literal or watched {{variable}}.
* @param {Number}      max                     The maximum value. Literal or watched {{variable}}.
* @param {Number}      value                   The current value. Literal or watched {{variable}}.
* @param {String}      label                   The name of the progress. This value will be used in wai-aria.
* @param {String}      size                    The size of the element. Supported values are: 'sm'.
* @param {String}      alignment               The horizontal alignment of the element. Supported values are: 'centered'.
* @param {String}      completed-style         The style that will be applied on completetion (default is 'a'(green color)).
*                                              When no style change is required, 'none' should be applied
* @param {Boolean=}    [animate=false]         A boolean that indicates if the progress bar should use CSS3 animation.
* @param {Number}      read-only-progress      This property can be used to read the current calculated progress from the directive.
*
* @description
* This directive should be used in combination with the progressBar or progressRadial directives to be displayed
* correctly. It will automatically calculate the current progress based on the provided min, max and value properties.
* The progressBar and progressRadial directives are used to display the correct bar or radial based on the calculated
* progress. See the progressBar or progressRadial directive for examples how to use it.
*
* When the min, max or value is updated, then this directive will automatically calculate the progress and update itself.
*/
angular.module('ingGlobal').directive('ingProgress', [function () {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            id: '@',                        // (String)
            min: '@',                       // (String | watched expression), e.g. min="{{min}}"
            max: '@',                       // (String | watched expression), e.g. max="{{max}}"
            value: '@',                     // (String | watched expression), e.g. value="{{value}}"
            label: '@',                     // (String)
            size: '@',                      // (String) optional, possible values { 'sm' }
            alignment: '@alignment',         // (String) optional, possible values { 'centered' }
            isAnimated: '@animate',         // (String) optional, possible values { 'true' | 'false' }
            progressReadOnly: '=readOnlyProgress',
            completedStyle: '@'            // (String) optional, possible values { 'none' | 'a' } (default is 'a')
        },
        template: '<div class="progress" ng-class="[sizeClass, animationClass, alignmentClass, completionClass]" ng-transclude></div>',
        controller: ['$scope', function ($scope) {
            var ctrl = this;
            var completedStyle = null;

            // Convert animation and size attributes to classnames
            $scope.sizeClass = angular.isDefined($scope.size) ? 'progress-' + $scope.size : null;
            $scope.animationClass = angular.equals($scope.isAnimated, 'true') ? 'progress-animated' : null;
            $scope.alignmentClass = angular.equals($scope.alignment, 'centered') ? 'progress-centered' : null;

            if($scope.completedStyle) {
                completedStyle = $scope.completedStyle === 'none' ? 'default' : $scope.completedStyle;
            } else {
                completedStyle = 'a';
            }

            /**
             * Define model to be passed on to depending directives
             * @type {{min: number, max: number, value: *}}
             */
            ctrl.model = {
                id: $scope.id,
                label: $scope.label,
                min: $scope.min,
                max: $scope.max,
                progress: null
            };

            $scope.$watchCollection(function () {
                // The min, max and current value properties could change, so watch these properties and calculate the new progress.
                return [$scope.min, $scope.max, $scope.value];
            }, function () {
                /**
                 * Calculate progress as a percentage value
                 * @type {number}
                 */
                var progress = Math.floor((($scope.value - $scope.min) / ($scope.max - $scope.min)) * 100);

                if (angular.equals(progress, 0) && $scope.value > $scope.min) {
                    // When the min=0, max=100 and value=1. Then the calculated progress is 0. This is incorrect because the customer has made some progress.
                    progress = 1;
                } else if (progress > 100) {
                    progress = 100;
                } else if (progress < 0) {
                    progress = 0;
                }

                /**
                 * Updated model and scope values
                 * @type {number}
                 */
                $scope.progress = progress;

                if(angular.isDefined($scope.progressReadOnly)) {
                    $scope.progressReadOnly = $scope.progress;
                }

                ctrl.model.min = $scope.min;
                ctrl.model.max = $scope.max;
                ctrl.model.progress = $scope.progress;

                /**
                 * Update completion class
                 */
                $scope.completionClass = (progress >= 100) ? 'progress-completed-' + completedStyle : null;


            });
        }]
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-progress-bar
 * @restrict AE
 *
 * @description
 * This directive should be used in combination with the progress directive. It will display the progress bar.
 *
 * @example
 <example>
 <file name="normal-size.html">
    <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label">
        <ing-progress-bar></ing-progress-bar>
    </ing-progress>
 </file>
 <file name="small-size.html">
    <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" size="sm">
        <ing-progress-bar></ing-progress-bar>
    </ing-progress>
 </file>
 <file name="animated.html">
    <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" animate="true">
        <ing-progress-bar></ing-progress-bar>
    </ing-progress>
 </file>
 </example>
 */
angular.module('ingGlobal').directive('ingProgressBar', [function () {
    return {
        require: '^ingProgress',
        restrict: 'AE',
        template:
            '<div class="sr-only" id="{{id}}-label">{{label}}</div>' +
            '<div class="progress-bar" data-progress="{{progress}}" role="progressbar" aria-labelledby="{{id}}-label" aria-valuenow="{{progress}}" aria-valuemin="{{min}}" aria-valuemax="{{max}}" ng-style="{width: progress + \'%\'}">' +
                '<span class="sr-only">{{progress}}%</span>' +
            '</div>',
        link: function (scope, element, attr, ingProgress) {
            /**
             * Watch changes in model of progress directive
             * and update local scope values and state
             */
            scope.$watch(function() {
                return ingProgress.model.progress;
            }, function() {
                scope.id = ingProgress.model.id;
                scope.label = ingProgress.model.label;
                scope.min = ingProgress.model.min;
                scope.max = ingProgress.model.max;
                scope.progress = ingProgress.model.progress;
            });
        }
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-progress-radial-content
 * @restrict AE
 *
 * @param {String}    text    A custom text which you want to display inside the radial.
 * @param {String}    icon    A custom icon which you want to display inside the radial.
 *
 * @description
 * This directive should be used in combination with the progress directive. It will display the progress radial. Optionally
 * you can provide a text or icon that should be displayed inside the radial.
 *
 * @example
 <example>
     <file name="normal-size.html">
         <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label">
            <ing-progress-radial>
                <ing-progress-radial-content></ing-progress-radial-content>
            </ing-progress-radial>
         </ing-progress>
     </file>
     <file name="normal-size-with-title.html">
         <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label">
             <ing-progress-radial>
                <ing-progress-radial-content title="Titel"></ing-progress-radial-content>
             </ing-progress-radial>
         </ing-progress>
     </file>
     <file name="with-custom-content-using-readonly-progress-property.html">
         <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" animate="true"  read-only-progress="myProgress">
             <ing-progress-radial>
                 <div class="progress-dial-content">
                     <div class="progress-dial-value">
                         <div><i class="h-bg-l-a icon icon-pig icon-orange"></i></div>
                         <div class="progress-dial-value-number">{{myProgress}}%</div>
                     </div>
                     <span class="sr-only">{{myProgress}}%</span>
                 </div>
             </ing-progress-radial>
         </ing-progress>
     </file>
     <file name="small-size-no-content-pie.html">
         <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" size="sm">
            <ing-progress-radial></ing-progress-radial>
         </ing-progress>
     </file>
     <file name="animated.html">
         <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" animate="true">
            <ing-progress-radial></ing-progress-radial>
         </ing-progress>
     </file>
 </example>
 */
angular.module('ingGlobal').directive('ingProgressRadial', [function () {
    return {
        require: '^ingProgress',
        restrict: 'AE',
        transclude: true,
        scope : {},
        template:
            '<div class="sr-only" id="{{id}}-label">{{label}}</div>' +
            '<div class="progress-dial" data-progress="{{progress}}" role="progressbar" aria-labelledby="{{id}}-label" aria-valuenow="{{progress}}" aria-valuemin="{{min}}" aria-valuemax="{{max}}">' +
                '<div class="progress-dial-indicator" ng-style="rotation">' +
                    '<div class="progress-dial-indicator-inner" ng-style="rotation"></div>' +
                '</div>' +
                '<div class="progress-dial-indicator">' +
                    '<div class="progress-dial-indicator-inner" ng-style="rotation"></div>' +
                '</div>' +
                '<div ng-transclude></div>' +
            '</div>',
        controller: ['$scope', function ($scope) {
            /**
             * Calulate rotation based on progress value
             * @param progress
             */
            $scope.updateProgress = function (progress) {
                var rotation = Math.floor((360 * progress) / 100);
                rotation = 'rotate(' + (rotation / 2) + 'deg)';

                $scope.rotation = {
                    '-webkit-transform': rotation,
                    '-ms-transform': rotation,
                    'transform': rotation
                };
            };
        }],
        link: function (scope, element, attr, ingProgress) {
            element.parent().addClass('progress-radial');

            /**
             * Watch changes in model of progress directive
             * and update local scope values and state
             */
            scope.$watch(function() {
                return ingProgress.model.progress;
            }, function() {
                scope.id = ingProgress.model.id;
                scope.label = ingProgress.model.label;
                scope.min = ingProgress.model.min;
                scope.max = ingProgress.model.max;
                scope.progress = ingProgress.model.progress;
                scope.updateProgress(scope.progress);
            });
        }
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-progress-radial
 * @restrict AE
 *
 * @param {String}    text    A custom text which you want to display inside the radial.
 * @param {String}    icon    A custom icon which you want to display inside the radial.
 *
 * @description
 * This directive should be used in combination with the progress directive. It will display the progress radial. Optionally
 * you can provide a text or icon that should be displayed inside the radial.
 *
 * @example
 <example>
 <file name="normal-size.html">
     <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label">
        <ing-progress-radial></ing-progress-radial>
     </ing-progress>
 </file>
 <file name="small-size.html">
     <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" size="sm">
        <ing-progress-radial></ing-progress-radial>
     </ing-progress>
 </file>
 <file name="animated.html">
     <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" animate="true">
        <ing-progress-radial></ing-progress-radial>
     </ing-progress>
 </file>
 <file name="with-custom-icon.html">
     <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" animate="true">
        <ing-progress-radial icon="icon-email"></ing-progress-radial>
     </ing-progress>
 </file>
 <file name="with-custom-text.html">
     <ing-progress min="{{data.min}}" max="{{data.max}}" value="{{data.value}}" label="My custom label" animate="true">
        <ing-progress-radial text="Custom"></ing-progress-radial>
     </ing-progress>
 </file>
 </example>
 */
angular.module('ingGlobal').directive('ingProgressRadialContent', [function () {
    return {
        require: '^ingProgress',
        restrict: 'AE',
        scope: {},
        template:
            '<div class="progress-dial-content">' +
                '<div class="progress-dial-value" ng-if="!text">{{progress}}%</div>' +
                '<div class="progress-dial-value" ng-if="text">' +
                    '<div class="progress-dial-value-text">{{text}}</div>' +
                    '<div class="progress-dial-value-number">{{progress}}%</div>' +
                '</div>' +
                '<span class="sr-only">{{progress}}%</span>' +
            '</div>',
        link: function (scope, element, attr, ingProgress) {
            scope.text = attr.title;
            /**
             * Watch changes in model of progress directive
             * and update local scope values and state
             */
            scope.$watch(function() {
                return ingProgress.model.progress;
            }, function() {
                scope.progress = ingProgress.model.progress;
            });
        }
    };
}]);

'use strict';

/*jshint latedef: nofunc */

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-ribbon
 * @restrict E
 *
 * @description
 * Directive for generating a ribbon.
 *
 * @param {string} init-index - Preselect a ribbon item (mark as 'active'). Default is 0.
 * @param {object} content - Json object with all data needed for rendering items
 * @param {string} content.text - the text for the item
 * @param {string} content.href - the url to navigate to when item is clicked
 * @param {string} content.icon - guide icon name (string after the 'icon-' prefix in Guide documentation)
 *
 * @see ing-ribbon
 * @example
 <example module="ingGlobal">

 <file name="example.html">
 <div ng-controller="RibbonExampleCtrl">

 <section class="full-cover h-bg-d l-p-0" role="region" aria-labelledby="section-heading-x">
 <h2 id="section-heading-x" class="sr-only">Ribbon X</h2>

 <ing-ribbon content="content" init-index="2"></ing-ribbon>

 </section>

 <button type="button" class="sr-only">Doelloze knop</button>
 </div>
 </file>


 <file name="ExampleCtrl.js">
 function RibbonExampleCtrl($scope, $element, $timeout) {
            $scope.content = [];

            var icons = ['calculator', 'wealth-increase', 'house', 'holiday', 'euro', 'washing-machine'];
            for(var i in icons){
                $scope.content.push( {href: '', text: icons[i], icon: icons[i]} );
            }

            // For demo purposes, ignore routing on anchor click
            $timeout(function(){
                $element.find('a').click(function(e){e.preventDefault();});
            });

        }
 </file>

 </example>
 *
 **/

angular.module('ingGlobal').directive('ingRibbon', [function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: true,
        template: '<nav ing-split-list list="ribbon.content" sync-list="true" justify="true" delegate-focus="true" role="navigation" aria-labelledby="ribbon-heading-{{$id}}">' +
        '<div class="sr-only" id="ribbon-heading-{{$id}}">Subnavigatie met {{ribbon.content.length}} items</div>' +
        '<div class="ribbon ribbon-a ribbon-inverse" ng-class="{ \'ribbon-sm\': ribbon.state.mobile, \'ribbon-lg\': !ribbon.state.mobile }">' +
        '<div ing-toggle class="dropdown ribbon-dropdown open">' +
        '<div class="ribbon-wrapper">' +
        '<div class="ribbon-container">' +
        '<ul ing-split-list-a class="ribbon-list" role="presentation">' +
        '<li ng-repeat="item in splitList.A track by $index" class="ribbon-list-item">' +
        '<a ing-split-item ing-split-focus-element ng-click="ribbon.setActiveIndex($index)" ng-class="{active:$index == ribbon.state.activeIndex}" class="btn btn-transparent btn-wrap ribbon-element arrow-container arrow-sm" href="{{item.href}}" aria-selected="{{$index == ribbon.state.activeIndex}}">' +
        '<div class="ribbon-element-icon">' +
        '<span class="icon icon-{{item.icon}} ribbon-element-icon-element" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="ribbon-element-text">' +
        '<span ng-if="$index == ribbon.state.activeIndex" class="sr-only">Huidige pagina</span>' +
        '{{item.text}}' +
        '</div>' +
        '<div class="arrow arrow-down arrow-d ribbon-element-arrow"></div>' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="ribbon-container">' +
        '<div ing-split-more-item ing-split-focus-element ing-toggle-invoker ng-class="{active:ribbon.isActiveInMoreList(splitList.state.startIndexB)}" class="btn btn-transparent dropdown-toggle ribbon-element ribbon-element-more dropdown-toggle arrow-container arrow-sm">' +
        '<div class="ribbon-element-icon">' +
        '<span class="icon icon-more ribbon-element-icon-element" aria-hidden="true"></span>' +
        '</div>' +
        '<div class="ribbon-element-text">' +
        'Meer <span aria-hidden="true" class="icon" ng-class="{\'icon-arrow-a-up\': !toggle.state.open, \'icon-arrow-a-down\': toggle.state.open}"></span>' +
        '</div>' +
        '<div class="arrow arrow-down arrow-d ribbon-element-arrow"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<ul ng-if="ribbon.state.mobile" ing-split-list-b ing-toggle-content close-on-esc="true" class="dropdown-menu dropdown-menu-right dropdown-menu-default dropdown-menu-lg ribbon-dropdown-menu ribbon-dropdown-menu-arrow arrow-border arrow-up" role="presentation">' +
        '<li ing-split-item ng-repeat="item in splitList.B track by $index" ng-class="{active:$index == ribbon.state.activeIndex}" class="dropdown-menu-item">' +
        '<a ing-split-focus-element class="dropdown-menu-element ribbon-dropdown-menu-element" href="{{item.href}}" ng-click="ribbon.setActiveIndex($index)">{{item.text}}</a>' +
        '</li>' +
        '</ul>' +
        '<ul ng-if="!ribbon.state.mobile" ing-split-list-b ing-toggle-content close-on-esc="true" close-on-click-outside="true" class="dropdown-menu dropdown-menu-right dropdown-menu-default dropdown-menu-lg ribbon-dropdown-menu ribbon-dropdown-menu-arrow arrow-border arrow-up" role="presentation">' +
        '<li ing-split-item ng-repeat="item in splitList.B track by $index" ng-class="{active:$index == ribbon.state.activeIndex}" class="dropdown-menu-item">' +
        '<a ing-split-focus-element class="dropdown-menu-element ribbon-dropdown-menu-element" href="{{item.href}}" ng-click="ribbon.setActiveIndex($index)">{{item.text}}</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</nav>',
        controller: 'RibbonController',
        controllerAs: 'ribbon',
        link: function (scope, element, attrs, ctrl) {
            ctrl.splitList = element.controller('ingSplitList');
            ctrl.content = scope.$eval(attrs.content);
            ctrl.state.activeIndex = Number(attrs.initIndex);
        }
    };
}]);


angular.module('ingGlobal').controller('RibbonController', ['$attrs', '$scope', '$element', '$window', 'mqService', '$timeout', 'utilsService', function ($attrs, $scope, $element, $window, mqService, $timeout, utils) {
    var _this = this;

    this.setActiveIndex = setActiveIndex;
    this.isActiveInMoreList = isActiveInMoreList;

    ////////////////

    this.state = {
        activeIndex: null,
        mobile: null
    };

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
        $scope.$evalAsync(function () {
            //_this.state.mobile = $element[0].clientWidth < mqService.mqSizes.xs;
            _this.state.mobile = mq.width < mqService.mqSizes.xs;
        });
    });


    $scope.$watch(function () {
        return _this.state.mobile
    }, function (mobile) {
        if (angular.isDefined(mobile)) {
            _this.splitList._initList();
            $timeout(function () {
                angular.element($element[0].querySelector('[ing-split-list-b]'))[mobile ? 'addClass' : 'removeClass']('animate-collapse'); //prevent ng-animate classes from being added by Angular on init. Only needed for sr-only, which is required for split-list (not ng-hide)
            }, 100, false);
        }
    });


    /** IE css fix (IE is not able to inherit height in a display:table-cell element when parent height isn't set 'hard') **/
    function correctHeight() {
        elem.style.height = '';
        $timeout(function () {
            elem.style.height = elem.clientHeight + 'px';
        }, false);
    }

    if (utils.getIEVersion()) {
        var elem = $element[0].querySelector('.ribbon-wrapper');
        $scope.$on('mq-changed', correctHeight);
        correctHeight();
    }

}]);




'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-rich-select
 * @restrict EA
 * @scope =
 *
 *
 * @param {String=} id                  The id of the item selector.
 * @param {String} [radio=true]         Determines whether item list will be displayed as radio list when upper boundary (default is 3, which means radio list will be rendered when less than 4 items) is not exceeded. When provided with integer (e.g. 'radio="5"') upper boundary can be set manually.
 * @param {Object} order-config         To (alphabetically) order your items on a certain property, use 'orderBy' (e.g. orderBy:'prop5') Define whether index headers should be added with boolean 'createIndexes.' If you want to set these index headers manually, do so in the JSON (property 'order-index'). (Make sure createIndexes is set to false then(which it is by default.))
 * @param {String} [image-size='xxxl']  Size of the image. See <a href="#/style/foundation/icons">Icons</a> and navigate to 'Sizes.' For a credit card for instance, use 'mg'
 * @param {String} [image-ratio='1-1']  Ratio of the image. For a credit card for instance, use '3-2'
 *
 * @description
 * Directive rendering selector (comparable to native < select > element). In order to provide maximum flexibility in terms of custom layouts, the directive is split up into several directives.
 *
 * In case one wants to use the standard layout as seen in the example below, please use the 'ing-rich-select-toggle-template' and the 'ing-rich-select-item-template.' These generic default templates provide for most configurations and should be used when possible. Depending on the configuration of the json (which keys (e.g. 'prop5') are present) one can create a two or three row selector, with or without images (configurable for each row.)
 * The positions can be configured by filling the json with props 1-5. One should strive to use the default positions however, as can be found in the <a href="https://jira.europe.intranet/browse/GDE-389">design</a>
 *
 * If you want to preselect an item, please do so in the JSON data (selected:true)
 *
 *
 * @example
 <example module="ingGlobal">
<file name="ing-rich-select.html">
<form role="form" class="form-horizontal" ng-controller="Ctrl">
    <fieldset>
        <legend class="sr-only">Rich Select modes </legend>
        <div ing-form-row-fieldset label="Default">
            <ng-include src="'rs-default.html'"></ng-include>
        </div>
        <div ing-form-row-fieldset label="Radio Mode">
            <ng-include src="'rs-radio.html'"></ng-include>
        </div>
        <div ing-form-row-fieldset label="One Item Mode">
            <ng-include src="'rs-one-item.html'"></ng-include>
        </div>
        <div class="form-group">
            <label class="sr-only" for="filter">Filter</label>
            <div class="col-lg-offset-3 col-lg-6">
                <input type="text" class="form-control" ing-placeholder="' Filter '" ng-model='filter' id="filter">
            </div>
        </div>
    </fieldset>
</form>
</file>

 <file name="rs-default.html">
  <div ing-rich-select id="rs_default" radio="false">
      <div ing-rich-select-toggle>
          <div ing-rich-select-toggle-template></div>
      </div>
      <div ing-rich-select-item-list items="{{items}}" order-config="{{orderByCfg}}" filter="{{filter}}">
          <div ing-rich-select-item ng-repeat="item in selectorItems">
              <div ing-rich-select-item-template></div>
          </div>
      </div>
  </div>
 </file>

 <file name="rs-radio.html">
  <div ing-rich-select id="rs_radio" image-size="mg" image-ratio="3-2">
      <div ing-rich-select-toggle>
          <div ing-rich-select-toggle-template></div>
      </div>
      <div ing-rich-select-item-list items="{{items2}}" order-config="{{orderByCfg}}" filter="{{filter}}">
          <div ing-rich-select-item ng-repeat="item in selectorItems">
              <div ing-rich-select-item-template></div>
          </div>
      </div>
  </div>
 </file>

 <file name="rs-one-item.html">
  <div ing-rich-select id="rs_one">
      <div ing-rich-select-toggle>
          <div ing-rich-select-toggle-template></div>
      </div>
      <div ing-rich-select-item-list items="{{items3}}" order-config="{{orderByCfg}}" filter="{{filter}}">
          <div ing-rich-select-item ng-repeat="item in selectorItems">
              <div ing-rich-select-item-template></div>
          </div>
      </div>
  </div>
 </file>


 <file name="Ctrl.js">
 function Ctrl($scope) {

    $scope.orderByCfg = {orderBy:'prop5', createIndexes :true };

    $scope.items=[
        {
            selected:true,
            prop1:'Betaalrekening',
            prop2:'1.234,00',
            prop3:'&euro;',
            prop4:'NL23ABNA01234567',
            prop5:'A.A. Bovenveldt',
            image: 'img/global_logo.gif'
        },
        {
            prop1:'Betaalrekening',
            prop2:'5.678,00',
            prop3:'&#36;',
            prop4:'NL23ABNA01234567',
            prop5:'B.A. Bovenveldt'
        }
        ,
        {
            disabled:true,
            prop1:'Betaalrekening',
            prop2:'98.765,00',
            prop3:'&euro;',
            prop4:'NL23ABNA01234567',
            prop5:'B.B. Bovenveldt'
        }
        ,
        {role:'divider'},
        {
            prop1:'Betaalrekening',
            prop2:'43.210,00',
            prop3:'&#36;',
            prop4:'NL23ABNA01234567',
            prop5:'B.C. Bovenveldt',
            prop6:'Lorem',
            prop7:'Ipsum'
        },
        {

            prop1:'Betaalrekening',
            prop2:'123.456,00',
            prop3:'&euro;',
            prop4:'NL23ABNA01234567',
            prop5:'C.A. Bovenveldt'
        }
    ];

    $scope.items2=[
     {
            selected : true,
            prop1:'Betaalrekening',
            prop2:'2.752,00',
            prop3:'&euro;',
            prop4:'NL23ABNA01234567',
            prop5:'M.A. Bovenveldt',
            image: 'img/Betaalpas.jpg'
        },
        {   prop1:'Betaalpas',
            prop2:'2.752,00',
            prop3:'&#36;',
            prop4:'NL30INGB01934581',
            prop5:'Slagerij van Dijk',
            image: 'img/Mijn_Betaalpas.jpg'
        },
        {   prop1:'Mijn Betaalpas',
            prop2:'60.000,00',
            prop3:'&euro;',
            prop4:'NL30INGB01934581',
            prop5:'M.A. Bovenveldt',
            image: 'img/Betaalpas.jpg'
        }
    ];

    $scope.items3=[
     {      prop1:'Betaalrekening',
            prop2:'2.752,00',
            prop3:'&euro;',
            prop4:'NL23ABNA01234567',
            prop5:'M.A. Bovenveldt',
            image: 'img/global_logo.gif'
        }
    ];

    $scope.$on('ing-rich-select-change-rs_default', function(e, data){
        $scope.data = data.prop1;
    });
    $scope.$on('ing-rich-select-change-rs_radio', function(e, data){
        $scope.data = data.prop1
    });
    $scope.$on('ing-rich-select-change-rs_one', function(e, data){
        $scope.data = data.prop1
    });

 }
 </file>
 </example>
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-rich-select#ing-rich-select-change-<id>
 * @eventOf ingGlobal.directive:ing-rich-select
 * @eventType  emit on $scope
 * @description This event is emitted when a new item is selected. The whole object in scope of the repeat is sent as the event data.
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingRichSelect', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: 'ingRichSelect',
        template: '<div ng-class="{\'dropdown-block\':cfg.mode ==\'default\', open: state.showList && cfg.mode ==\'default\'}"></div>',
        scope: true,
        link: function (scope, element, attrs, ctrl, transclude) {

            /** Initial configuration. */
            scope.cfg = {
                notSelectedText: 'Maak een keuze',  // TODO: add to ingGlobal
                mode: 'default',                // {string}
                radioBoundary: 3,              // {number} maximum number of items that cause directive to render with a radio button representation.
                imageSize: 'xxxl'
            };

            scope.state = {
                showList: false,               // {boolean} bound to ng-show of ul
                mouseOver: false,              // {boolean} tracks mouseOver state of ul
                selectedIndex: null
            };

            /* Helper object keeping track of initialization states */
            scope.initialized = {
                all: false,
                mode: false,
                radio: false,
                items: false
            };

            var unbindWatcher = scope.$watch(function(){
                return scope.initialized.mode && scope.initialized.radio && scope.initialized.items;
            }, function(allInitialized){
                // Consider completely initialized when all data needed for ordering and filtering are there
                if(allInitialized){
                    scope.initialized.all =  true;
                    ctrl.setupItemList();
                    unbindWatcher();
                }
            });

            /** Attribute observations. */
            attrs.$observe('id', function (id) {
                scope.itemSelectorId = id || 'item-selector-' + scope.$id;
            });

            attrs.$observe('imageSize', function (s) {
                if(angular.isDefined(s)){
                    scope.cfg.imageSize = s;
                }
            });

            attrs.$observe('imageRatio', function (r) {
                if(angular.isDefined(r)){
                    scope.cfg.imageRatio = r;
                }
            });

            attrs.$observe('radio', function (radioVal) {
                var radio = scope.$eval(radioVal);

                if (radio === false) {
                    scope.cfg.radioBoundary = 0;
                } else if (!isNaN(parseInt(radio, 10))) {
                    scope.cfg.radioBoundary = parseInt(radio, 10);
                }

                scope.initialized.radio = true;

                if(scope.initialized.items){
                    ctrl.setMode();
                }
            });

            scope.$on('close-all-rich-selects', function () {
                scope.close();
            });

            transclude(scope, function (clone) {
                element.append(clone); //Share scope
            });
        },
        controller: 'richSelectController'
    };
});

angular.module('ingGlobal').directive('ingRichSelectToggle', function () {
    return {
        restrict: 'EA',
        replace: true,
        require: '^ingRichSelect',
        transclude: true,
        template:
            '<div>' +
                '<button ng-if="cfg.mode == \'default\'" type="button" class="btn btn-default dropdown-toggle icon-position icon-after icon-position-sm" aria-haspopup="true" ng-click="invokerHandler()" ng-keydown="onToggleKeyDown($event)" style="width:100%;">' +
                    '<i aria-hidden="true" class="icon icon-position-icon" ng-class="{\'icon-arrow-a-down\':!state.showList, \'icon-arrow-a-up\':state.showList}"></i>' +
                    '<div ng-transclude></div>' +
                '</button>' +
            '</div>'
    };
});

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-rich-select-item-list
 * @restrict EA
 * @param {String} filter                           Data bound value which can filter text of item selector.
 * @param {Object=} items                           Object with text values (and eventually links to images) that are linked to positions in the chosen template
 * @param {Object=} order-config                    Data bound value which can order items on each prop
 * @property {String} order-config.orderBy          key to order on, for example 'prop1'
 * @property {Boolean} order-config.createIndexes   Whether or not to create alphabetical (and lexicographical) indexes (for example 'a', 'b', 'c') between items
 *
 * @description
 The ing-rich-select-item-list is used to add items and the configuration to an ing-rich-select.
 A filter can be added as well.

 **/

angular.module('ingGlobal').directive('ingRichSelectItemList', ['$timeout', 'utilsService', function ($timeout, utilsService) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^ingRichSelect',
        transclude: true,
        template:
            '<ul ng-transclude ng-style="dropdownMenuStyle" class="dropdown-menu dropdown-menu-default l-mb-0 h-bg-a" aria-hidden="{{!state.showList}}" ng-mouseenter="onListMouse(true)" ng-mouseleave="onListMouse(false)" ng-class="{' +
            '\'dropdown-menu dropdown-menu-default\' : cfg.mode == \'default\', \'list-group list-group-sm\': cfg.mode != \'default\'}" >' +
            '</ul>',
        link: function (scope, element, attrs, ctrl) {
            scope.orderCfg = {
                orderBy: null,
                createIndexes: true
            };

            /** Attribute observations. */
            attrs.$observe('items', function (items) {
                if (items === undefined || items.length === 0) {
                    return;
                }

                scope.selectorItems = scope.$eval(attrs.items);
                scope.selectorItemsOriginal = angular.copy(scope.selectorItems);
                scope.state.selectedIndex = ctrl.getStartIndex(scope.selectorItems);
                scope.selectedItem = scope.state.selectedIndex === -1 ? null : scope.selectorItems[scope.state.selectedIndex];

                scope.initialized.items = true;

                if(scope.initialized.radio) {
                    ctrl.setMode();
                }

                if(scope.initialized.all) {
                    ctrl.applyOrdering();
                    ctrl.applyFilter();
                }

                ctrl.setupUserInteraction();

                scope.hasImagesInList = ctrl.hasImagesInList();
                scope.hasIconsInList = ctrl.hasIconsInList();
            });

            attrs.$observe('orderConfig', function (orderConfig) {
                var orderCfg = scope.$eval(orderConfig);

                if (typeof orderCfg !== 'object') {
                    return;
                }

                scope.orderCfg.orderBy = orderCfg.orderBy;
                scope.orderCfg.createIndexes = orderCfg.createIndexes !== undefined ? orderCfg.createIndexes : true;

                if(scope.initialized.all) {
                    ctrl.applyOrdering();
                }

            });

            attrs.$observe('filter', function (filter) {
                scope.cfg.filter = filter;
                if(scope.initialized.all) {
                ctrl.applyOrdering();

                ctrl.applyFilter();
                }
            });

            /* Determine style/length of .dropdown-menu */
            scope.dropdownMenuStyle = {};

            scope.$watch('state.showList', function (showItemList) {
                setItemListStyling(showItemList);
            });

            $timeout(function(){
                setInitialToggleHeight();
            });

            /* Gives toggle element height of first element in list(assumption is made items are of equal height here)*/
            function setInitialToggleHeight(){
                element.css({ display:'block', visibility: 'hidden' });
                scope.toggleElemHeight = jQuery(element.find('[ing-rich-select-item]')[0]).height();
                element.css({ display:'', visibility: '' });
            }

            function setItemListStyling(showItemList) {
                // Reset styles
                angular.extend(scope.dropdownMenuStyle, {'bottom':'auto', 'max-height':'none','overflow-y':'hidden'});

                $timeout(function () {
                    scope.$digest();
                    computeStyles();
                });

                // Compute styles
                function computeStyles() {

                    // TODO: make code more efficient and readable by avoiding angular digest cycles (i.e. set styles directly instead of via ng-style), in which case timeouts, digests and callbacks are not needed

                    function computeDropupStyles(viewport,itemListEl) {
                        var dropStyle = { maxHeightValue:'none',
                                          overflowYValue:'hidden'};  // default
                        var topDifference = itemListEl.offset().top - viewport.top;
                        if (topDifference < 0){
                            dropStyle.maxHeightValue = (itemListEl.offset().top + itemListEl.height()) - viewport.top;
                            dropStyle.overflowYValue =  'scroll';
                        }
                        return dropStyle;
                    }

                    function computeDropDownStyles(bottomDifference,itemListEl){
                        var dropStyle = { maxHeightValue:'none',
                                          overflowYValue:'hidden'};// default
                        // When list is longer than document create scrollbar with max height to end of document
                        if (bottomDifference < 0){
                            dropStyle.maxHeightValue = jQuery(document).height() - itemListEl.offset().top;
                            dropStyle.overflowYValue = 'scroll' ;
                        }

                        // When list is longer than 50% of window height, limit view
                        if ( itemListEl.height() >(jQuery(window).height()/2)){
                            dropStyle.maxHeightValue = Math.floor(jQuery(window).height()/2);
                            dropStyle.overflowYValue = 'scroll';
                        }
                        return dropStyle;
                    }

                    function computeAndroidStyles(){
                        // On Android stock (non Chrome) browsers there are several problems with css scrollbar:
                        // a) Scrollbar is not visible on screen, so user does not know he/she can scroll.
                        // b) In Android version 2 Overflow-y is not supported.
                        // c) On Stock browser (for example Samsung 4.2.2) the use of label element within overflow-y scroll prevents clicking/selecting an account
                        // so for old Android browser the complete list is shown and user can scroll to the whole list
                        return  { maxHeightValue:'none',
                                  overflowYValue:'visible'};
                    }

                    function computeRightStyle(){
                        var itemListEl = element;//find('.dropdown-menu');
                        var viewport = utilsService.getViewportRelativeToDocument();
                        var bottomDifference  = jQuery(document).height() - (itemListEl.offset().top + itemListEl.height());
                        var dropStyle;
                        if (utilsService.isOldAndroidBrowser() ){
                            dropStyle = computeAndroidStyles();
                        } else if(bottomDifference < 5 && (viewport.bottom - itemListEl.offset().top) < 100) {
                            // Present as dropup if little space at bottom
                            angular.extend(scope.dropdownMenuStyle, {'bottom': scope.toggleElemHeight, top: 'auto'});
                            scope.$digest();
                            dropStyle = computeDropupStyles(viewport, itemListEl);
                        } else {
                            dropStyle = computeDropDownStyles(bottomDifference,itemListEl);
                        }
                        return dropStyle;
                    }

                    function setDropdownMenuStyles(dropStyle) {
                        angular.extend(scope.dropdownMenuStyle, {'max-height': dropStyle.maxHeightValue, 'overflow-y': dropStyle.overflowYValue});

                        $timeout(function () {
                            scope.$digest();
                        });
                    }

                    if (showItemList) {
                        setDropdownMenuStyles(computeRightStyle());
                    }
                }
            }
        }
    };
}]);

angular.module('ingGlobal').directive('ingRichSelectItem', function () {
    return {
        restrict: 'EA',
        replace: true,
        require: '^ingRichSelectItemList',
        transclude: true,
        template:
            '<li role="presentation" ng-mouseenter="onMouseEnter($index, item)" ng-mouseleave="onMouseLeave($index, item)" ng-class="{' +
                    'active:showActiveClass($index), disabled:item.disabled,' + //state
                    'divider:item.role==\'divider\', \'dropdown-menu-header\':item.orderIndex && cfg.mode == \'default\', \'list-group-header\':item.orderIndex && cfg.mode == \'radio-list\','+ //role
                    '\'dropdown-menu-item\':cfg.mode == \'default\', \'list-group-item\':  cfg.mode != \'default\'}">' + //mode

                '<div ng-if="item.role == \'orderIndex\'">{{item.orderIndex}}</div>' +

                // default mode
                '<label ng-if="isInputItem(item) && cfg.mode == \'default\'" tabindex="-1" role="menuitem">' +
                    '<input class="sr-only" type="radio" name="{{itemSelectorId}}" id="{{itemSelectorId + \'-\' + $index}}" value="{{$index}}" ng-model="state.selectedIndex" ng-disabled="{{item.disabled}}" ng-click="onClick($index, item)">' +
                    '<div ng-transclude></div>' +
                '</label>' +
                // radio-list mode
                '<div ng-if="isInputItem(item) && cfg.mode == \'radio-list\'" class="radio">' +
                    '<label tabindex="-1" for="{{itemSelectorId + \'-\' + $index}}">' +
                        '<input type="radio" name="{{itemSelectorId}}" id="{{itemSelectorId + \'-\' + $index}}" value="{{$index}}" ng-model="state.selectedIndex" ng-disabled="{{item.disabled}}" ng-click="onClick($index, item)">' +
                        '<div ng-transclude></div>' +
                    '</label>' +
                '</div>' +
                // one-item mode
                '<div ng-if="isInputItem(item) && cfg.mode == \'one-item\'" ng-transclude></div>' +
            '</li>'
    };
});


/** Default templates. */

angular.module('ingGlobal').directive('ingRichSelectToggleTemplate', function () {
    return {
        restrict: 'EA',
        replace: true,
        require: '^ingRichSelectItem',
        template:
            '<div>' +
            '<div ng-if="selectedItem" class="h-bor-r-1 h-bor-a l-pr-1 l-h-inherit" ng-class="{\'icon-position icon-before icon-position-{{cfg.imageSize}}\':(selectedItem.image || selectedItem.icon), \'icon-position-ratio-{{cfg.imageRatio}}\': hasImagesInList && cfg.imageRatio}">' +
            '<img ng-if="selectedItem.image != undefined" ng-src="{{selectedItem.image}}" alt="{{selectedItem.imageAlt}}" class="icon-position-icon">' +
            '<i ng-if="selectedItem.icon != undefined" class="h-bg-l-a icon {{selectedItem.icon}} icon-orange icon-{{cfg.imageSize}} "/>' +     '<div class="h-bold">' +
                        '<span class="h-float-right l-pl-2"><span data-ng-bind-html="getAsTrustedHtml(selectedItem.prop3)"></span> <span>{{selectedItem.prop2}}</span></span>' +
                        '<span class="h-text-ellipsis">{{selectedItem.prop1}}</span>' +
                    '</div>' +
                    '<div class="h-line-height-0">' +
                        '<div class="h-inline-block h-max-width-100p rockwell-l-md">' +
                            '<span class="h-text-ellipsis l-mr-2">{{selectedItem.prop4}}</span>' +
                        '</div>' +
                        '<div ng-if="selectedItem.prop5" class="h-inline-block h-max-width-100p rockwell-l-md">' +
                            '<span class="h-text-ellipsis">{{selectedItem.prop5}}</span>' +
                        '</div>' +
                    '</div>' +
                    '<div ng-if="selectedItem.prop6 || selectedItem.prop7" class="h-line-height-0">' +
                        '<div ng-if="selectedItem.prop6" class="h-inline-block h-max-width-100p rockwell-l-md">' +
                            '<span class="h-text-ellipsis l-mr-2">{{selectedItem.prop6}}</span>' +
                        '</div>' +
                        '<div ng-if="selectedItem.prop7" class="h-inline-block h-max-width-100p rockwell-l-md">' +
                            '<span class="h-text-ellipsis">{{selectedItem.prop7}}</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div ng-if="!selectedItem" class="h-bor-r-1 h-bor-a l-pr-1" style="min-height:{{toggleElemHeight}}px">' +
                    '<div class="h-text-ellipsis h-text-muted">{{cfg.notSelectedText}}</div>' +
                '</div>' +
            '</div>'
    };
});

angular.module('ingGlobal').directive('ingRichSelectItemTemplate', function () {
    return {
        restrict: 'EA',
        replace: true,
        require: '^ingRichSelectItem',
        template:
        '<div class="l-pr-1" ng-class="{\'icon-position icon-before icon-position-{{cfg.imageSize}}\':(hasImagesInList || hasIconsInList), \'icon-position-ratio-{{cfg.imageRatio}}\': cfg.imageRatio && (hasImagesInList || hasIconsInList)}">' +
        '<img ng-if="item.image != undefined" ng-src="{{item.image}}" alt="{{item.imageAlt}}" class="icon-position-icon">' +
        '<i ng-if="item.icon != undefined" class="h-bg-l-a icon {{item.icon}} icon-orange icon-{{cfg.imageSize}} "/>' +  '<div class="h-bold">' +
                    '<span class="h-float-right l-pl-2"><span data-ng-bind-html="getAsTrustedHtml(item.prop3)"></span> <span>{{item.prop2}}</span></span>' +
                    '<span class="h-text-ellipsis">{{item.prop1}}</span>' +
                '</div>' +
                '<div class="h-line-height-0">' +
                    '<div class="h-inline-block h-max-width-100p rockwell-l-md">' +
                        '<span class="h-text-ellipsis l-mr-2">{{item.prop4}}</span>' +
                    '</div>' +
                    '<div ng-if="item.prop5" class="h-inline-block h-max-width-100p rockwell-l-md">' +
                        '<span class="h-text-ellipsis">{{item.prop5}}</span>' +
                    '</div>' +
                '</div>' +
                '<div ng-if="item.prop6 || item.prop7" class="h-line-height-0">' +
                    '<div ng-if="item.prop6" class="h-inline-block h-max-width-100p rockwell-l-md">' +
                        '<span class="h-text-ellipsis l-mr-2">{{item.prop6}}</span>' +
                    '</div>' +
                    '<div ng-if="item.prop7" class="h-inline-block h-max-width-100p rockwell-l-md">' +
                        '<span class="h-text-ellipsis">{{item.prop7}}</span>' +
                    '</div>' +
                '</div>' +
            '</div>'
    };
});


angular.module('ingGlobal').controller('richSelectController', ['$scope', '$element', '$rootScope', '$timeout', '$filter', 'richSelectOrderService', '$sce', function ($scope, $element, $rootScope, $timeout, $filter, richSelectOrderService, $sce) {
    var ctrl = this;

    /** Helper functions. */


    // TODO: Decide if needed: isn't this the same as $.inArray or indexOf ?
    ctrl.checkInObjectArray = function ( elem, array ) {
        for ( var i = 0, length = array.length; i < length; i++ ){
            if (angular.equals(array[i],elem)){
                return i;
            }
        }
        return -1;
    }

    /* Layout helper function */
    ctrl.hasImagesInList = function () {
        for (var i in $scope.selectorItems) {
            if ($scope.selectorItems[i].image !== undefined) {
                return true;
            }
        }
        return false;
    };

    /* Layout helper function */
    ctrl.hasIconsInList = function () {
        for (var i in $scope.selectorItems) {
            if ($scope.selectorItems[i].icon !== undefined) {
                return true;
            }
        }
        return false;
    };

    /* Methods adjusting scope.selectorItems */

    /* When all data required via attrs has been retrieved asynchronously, this method takes care of ordering and filtering */
    ctrl.setupItemList = function () {
        ctrl.applyOrdering();
        ctrl.applyFilter();
    }

    ctrl.applyFilter = function () {
        if ($scope.cfg.mode !== 'one-item') {
            $scope.selectorItems = $filter('filter')($scope.selectorItemsOriginal, $scope.cfg.filter);
        }
    };

    ctrl.applyOrdering = function () {
        if ($scope.orderCfg.orderBy === null || $scope.cfg.mode === 'one-item' || !$scope.initialized.mode) {
            return;
        }

        $timeout(function () {
            richSelectOrderService.sortItems($scope.selectorItems, $scope.orderCfg.orderBy, $scope.orderCfg.createIndexes, true);
            $scope.state.selectedIndex = Number(ctrl.getStartIndex($scope.selectorItems));
        });
    };

    ctrl.setMode = function () {
        if (!$scope.selectorItemsOriginal) {
            return;
        }

        if ($scope.selectorItemsOriginal.length === 1) { // Only show one element
            $scope.cfg.mode = 'one-item';
        } else if ($scope.selectorItemsOriginal.length <= $scope.cfg.radioBoundary) { // Radiolist representation
            $scope.cfg.mode = 'radio-list';
        } else {
            $scope.cfg.mode = 'default';
        }

        $scope.initialized.mode = true;
    };

    ctrl.getStartIndex = function (items) {

        for (var i in items) {
            if (items[i].selected !== undefined && items[i].selected) {
                return i;
            }
        }
        return -1;
    };

    ctrl.setupUserInteraction = function () {
        /* Click outside rich-select */
        $timeout(function(){ // Wrap inside timoeut, to be sure that toggle template has compiled
            $element.find('.dropdown-toggle, .dropdown-menu').bind('mousedown.rich-select-' + $scope.$id, function(e) {
                e.stopPropagation();
            });
        });

        jQuery(document).bind('mousedown.rich-select-' + $scope.$id, function(e) {
            if (e.which === 1) {  // only close if left mouse
                $scope.close();
            }
        });

        /* Press of esc */
        jQuery(document).bind('keyup.rich-select-' + $scope.$id, function(e) {
            if (e.which === 27) { // ESC
                $scope.close();
            }
        });

        $scope.$on('$destroy', function() {
            jQuery(document, $element.find('.dropdown-toggle, .dropdown-menu')).unbind('mousedown.rich-select-' + $scope.$id);
            jQuery(document).unbind('keyup.rich-select-' + $scope.$id);
        });

    };

    $scope.close = function () {
        if ($scope.cfg.mode !== 'default') {
            return;
        }
        $scope.state.showList = false;
        $timeout(function () {
            $scope.$digest();
        });
    };

    $scope.showActiveClass = function (index) {
        return $scope.state.activeIndex === index && !$scope.mouseOver && $scope.cfg.mode === 'default';  // mouse over background is taken care of by css
    };

    /** Setters. */
    $scope.setPrevListItem = function () {
        var newIndex = $scope.state.selectedIndex;

        // Set $scope.state.selectedIndex to last elem if not set
        if ($scope.state.selectedIndex === -1) {
            newIndex = $scope.selectorItems.length; // Don't use $scope.selectorItems.length-1, since newIndex-- is at least called once
        }

        while (newIndex > 0) {
            newIndex--;
            if (ctrl.isSelectableItem($scope.selectorItems[newIndex])) {
                break;
            }
        }

        if (newIndex !== 0 || ctrl.isSelectableItem($scope.selectorItems[newIndex])) { // If first not selectable as well, leave selected on inital index
            $scope.state.selectedIndex = newIndex;
        }
        $scope.setListItem($scope.state.selectedIndex);
    };

    $scope.setNextListItem = function () {
        var newIndex = $scope.state.selectedIndex;
        while (newIndex < $scope.selectorItems.length - 1) {
            newIndex++;
            if (ctrl.isSelectableItem($scope.selectorItems[newIndex])) {
                break;
            }
        }

        if (newIndex !== $scope.selectorItems.length - 1 || ctrl.isSelectableItem($scope.selectorItems[newIndex])) { // If last not selectable as well, leave selected on inital index
            $scope.state.selectedIndex = newIndex;
        }

        $scope.setListItem($scope.state.selectedIndex);
    };

    $scope.setListItem = function (index) {
        $scope.state.selectedIndex = index;
        $timeout(function () {
            $scope.selectedItem = $scope.selectorItems[index];
        });
        $scope.$emit('ing-rich-select-change-' + $scope.itemSelectorId, $scope.selectorItems[index]);
    };


    /** User Interaction Handlers. */
    $scope.$watch('state.selectedIndex', function (selectedIndex) {
        if ($scope.state) {
            $scope.state.activeIndex = selectedIndex;
        }
    });

    /* toggle(.dropdown-toggle) interaction listeners */
    $scope.onToggleKeyDown = function (e) {
        if (e.target.tagName !== 'BUTTON' && e.which === 13) { // ENTER  (prevent 'double behaviour' on buttons(which respond on ng-click))
            $scope.invokerHandler();
        } else if (e.which === 32) { // SPACE
            if (!$scope.state.showList) {
                $scope.invokerHandler();
            }
        } else if (e.which === 40) { // KEY DOWN
            $scope.setNextListItem();
            e.preventDefault();
        } else if (e.which === 38) { // KEY UP
            $scope.setPrevListItem();
            e.preventDefault();
        }
    };

    $scope.invokerHandler = function () {
        $scope.state.selectedIndex =  ctrl.checkInObjectArray($scope.selectedItem, $scope.selectorItems);
        var showList = $scope.state.showList;
        $rootScope.$broadcast('close-all-rich-selects');
        $scope.state.showList = !showList; //toggle dropdown
        $scope.onListMouse(false);// force onMouseLeave because with click the ng-mouseleave is not handled properly
    };

    /* itemlist(.dropdown-menu) interaction listeners */
    $scope.onListMouse = function (enter) {
        $scope.mouseOver = enter;
    };

    /* item interaction listeners */
    $scope.onClick = function (index, item) {
        if (!ctrl.isSelectableItem(item)) {
            return;
        }
        $scope.state.selectedIndex = index;
        $scope.setListItem(index, item);
        $scope.close();

    };

    $scope.onMouseEnter = function (index, item) {
        if (!ctrl.isSelectableItem(item)) {
            return;
        }
        $scope.state.activeIndex = index;
    };

    $scope.onMouseLeave = function () {
        $scope.state.activeIndex = $scope.state.selectedIndex;
    };

    $scope.getAsTrustedHtml = function (string){
        return $sce.trustAsHtml(string);
    };

    /** Helper functions. */

    $scope.isInputItem = function (item) {
        return item.role !== 'divider' && item.role !== 'orderIndex';
    };

    ctrl.isSelectableItem = function (item) {
        return !item.disabled && item.role !== 'divider' && item.role !== 'orderIndex';
    };
}]);


angular.module('ingGlobal').service('richSelectOrderService', function () {

    var fn = {};

    fn.sortItems = function (items, orderByProp, createOrderIndexes, deleteDividers) {

        /** Sorting function to order itemlist on  a custom property. */
        function compare(a, b) {
            if (a[orderByProp] < b[orderByProp]) {
                return -1;
            }
            if (a[orderByProp] > b[orderByProp]) {
                return 1;
            }
            return 0;
        }

        /** Deletes unwanted items (dividers and orderIndex) in order to start with a 'clean' array. */
        function deleteUnwantedItems() {
            for (var i in items) {
                if (items[i].role === 'orderIndex' || (deleteDividers && items[i].role === 'divider')) {
                    items.splice(i, 1);
                }
            }
        }

        /** Add indexes for orderProp. */
        function addIndexes() {
            if (createOrderIndexes) {
                var currentIndexChar = null;

                for (var i = 0; i < items.length; i++) {
                    var currentChar = items[i][orderByProp].toString().substr(0, 1).toUpperCase();
                    //insert if new char
                    if (currentIndexChar !== currentChar) {
                        currentIndexChar = currentChar;
                        items.splice(i, 0, {role: 'orderIndex', orderIndex: currentChar});
                        i++;
                    }
                }
            }
        }

        deleteUnwantedItems(items);
        items.sort(compare);
        addIndexes(items);
        return items;
    };

    return fn;
});






'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-slider
 * @restrict E
 * @scope
 *
 * @param {number}   min                        The lowest value the user should be able to choose.
 * @param {number}   max                        The highest value the user should be able to choose.
 * @param {number}   step                       The amount with which the model is incremented when the handle is moved a single step.
 * @param {string=}  [orientation='horizontal'] Either 'horizontal' or 'vertical'. At the moment, only horizontal sliders are supported.
 * @param {boolean=} [inverse=false]            Set to true for an inverted slider, useful for dark and coloured backgrounds.
 *
 * @description
 * A slider is a space efficient form control element that provides a user a means of input within a predefined range.
 * It provides the user with a cue of possible values, and a means to roughly pick a desired value.
 * This directive is merely the container that allows the setting of the slider's properties (e.g. range and step size).
 * Functionality can be added by nesting related directives: this should include at least {@link ingGlobal.directive:ing-slider-bar a slider bar} and {@link ingGlobal.directive:ing-slider-handle a handle}
 * that allows the user to actually choose a value. When the slider includes two handles, the user can use them
 * to specify a range, whereby the handles represent the range's lower and higher bounds.
 *
 * Note: the slider can be controlled using touch. This is implemented using Angular's ngTouch module.
 * Thus, it only works when your app includes it (e.g. `angular.module('myModule', ['ingGlobal', 'ngTouch'])`).
 *
 * Currently, only a horizontal slider is supported. Eventually, it should also support vertical sliders
 * and adding labels to certain steps.
 *
 * @example
 <example module="ingGlobal">
    <file name="ing-slider-basic.html">
        <div ng-controller="Ctrl">
            <div class="row">
                <div class="col-md-4 col-md-offset-1 l-p-2">
                    <ing-slider min="{{min}}" max="{{max}}" step="{{step}}">
                        <ing-slider-bar>
                            <ing-slider-handle ng-model="slider.value" aria-controls="sliderValue"></ing-slider-handle>
                        </ing-slider-bar>
                    </ing-slider>
                </div>
            </div>
            <div class="row h-bg-d">
                <div class="col-md-4 col-md-offset-1 l-p-2">
                    <ing-slider inverse="true" min="{{min}}" max="{{max}}" step="{{step}}">
                        <ing-slider-bar>
                            <ing-slider-handle ng-model="slider.value" aria-controls="sliderValue"></ing-slider-handle>
                        </ing-slider-bar>
                    </ing-slider>
                </div>
            </div>
            <div class="row">
                <p class="l-p-2" id="sliderValue">Model value: {{slider.value}}</p>
            </div>
        </div>
    </file>
    <file name="slider-basic-example-controller.js">
        function Ctrl($scope) {
            $scope.slider = {
                value: 0.0
            };
            $scope.step = 0.5;
            $scope.min = 0.0;
            $scope.max = 2.5;
        }
    </file>
 </example>
 */
angular.module('ingGlobal').directive('ingSlider', [function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            min: '@',
            max: '@',
            step: '@',
            inverse: '='
        },
        controller: ['$scope', '$element', function($scope, $element){
            var handles = [];
            
            // Returns the handle's index in the array
            this.addHandle = function(handle){
                return handles.push(handle) - 1;
            };
            this.getHandles = function(){
                return handles;
            };
            
            this.getMax = function(){
                return parseFloat($scope.max);
            };
            this.getMin = function(){
                return parseFloat($scope.min);
            };
            this.getStep = function(){
                return parseFloat($scope.step);
            };
            
            this.getWidth = function(){
                // Return the width of the wrapper contained within the directive --
                // the directive itself does not get a bounding rectangle.
                return $element.children().get(0).getBoundingClientRect().width;
            };
            
            this.getOrientation = function(){
                if(angular.isDefined($scope.horizontalOrientation) && $scope.horizontalOrientation === false){
                    return 'vertical';
                }
                return 'horizontal';
            };
        }],
        require: 'ingSlider',
        link: {
            pre: function(scope, element, attrs){
                // TODO: Support vertical sliders
                scope.horizontalOrientation = true;
                if(angular.isDefined(attrs.orientation) && attrs.orientation === 'vertical'){
                    scope.horizontalOrientation = false;
                }
            }
        },
        template: '<div class="ing-slider slider slider-default"' +
                       'ng-class="{\'slider-horizontal\': horizontalOrientation,' +
                                  '\'slider-vertical\': !horizontalOrientation,' +
                                  '\'slider-inverse\': inverse}"' +
                       'ng-transclude></div>'
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-slider-bar
 * @restrict E
 * @scope
 * @requires ingGlobal.directive:ing-slider
 *
 * @param {Array=} segments An array of labels to show at each segment.
 *
 * @description
 * The slider bar is a representation of the slider's value. It is "filled" within a range
 * the bounds of which represent the current values of the contained handles. If only one
 * handle is present, it is filled from the lowest value up to the value of that handle.
 *
 * The slider is divided into segments, ranges between two steps, that can be labeled. This
 * can be done by passing an array to the bar using the `segments` attribute. Take care that
 * the array length is equal to the desired number of segments.
 *
 * Currently, vertical slider bars are not yet supported.
 *
 * @example
 <example module="ingGlobal">
    <file name="ing-slider-bar-basic.html">
        <div ng-controller="Ctrl">
            <div class="row">
                <div class="col-md-4 col-md-offset-1 l-p-2">
                    <ing-slider min="{{min}}" max="{{max}}" step="{{step}}">
                        <ing-slider-bar>
                            <ing-slider-handle ng-model="slider.value" aria-controls="sliderValue"></ing-slider-handle>
                        </ing-slider-bar>
                    </ing-slider>
                </div>
            </div>
            <div class="row">
                <p id="sliderValue">Model value: {{slider.value}}</p>
            </div>
        </div>
    </file>
    <file name="slider-bar-basic-example-controller.js">
        function Ctrl($scope) {
            $scope.slider = {
                value: 0.0
            };
            $scope.step = 0.5;
            $scope.min = 0.0;
            $scope.max = 2.5;
            $scope.segments = [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth'
            ];
        }
    </file>
 </example>
 */
angular.module('ingGlobal').directive('ingSliderBar', [function () {
    return {
        require: '^ingSlider',
        restrict: 'E',
        scope: {
            segments: '='
        },
        transclude: true,
        link: function(scope, element, attrs, ingSlider){
            var handles = ingSlider.getHandles();
            
            scope.getLowerBoundPercentage = function(){
                if(handles.length !== 2){
                    // If there aren't two handles, assume one handle - i.e. the slider range
                    // starts at zero.
                    return 0;
                }

                var percentage = ((handles[0].handleValue - ingSlider.getMin()) * 100) /
                                  (ingSlider.getMax() - ingSlider.getMin());
                // The lower bound percentage is bounded by 0% and 100%
                return Math.max(Math.min(percentage, 100), 0);
            };

            scope.getHigherBoundPercentage = function(){
                // If there are two handles, the higher bound is set by the second one.
                // Otherwise it's set by the only one.
                var handle = handles[0];
                if(handles.length === 2){
                    handle = handles[1];
                }

                var percentage = ((handle.handleValue - ingSlider.getMin()) * 100) /
                                  (ingSlider.getMax() - ingSlider.getMin());
                // The filled percentage is bounded by 0% and 100%
                return Math.max(Math.min(percentage, 100), 0);
            };
            
            scope.getSegments = function(){
                if(angular.isUndefined(scope.segments)){
                    return new Array((ingSlider.getMax() - ingSlider.getMin()) / ingSlider.getStep());
                }
                return scope.segments;
            };
        },
        template: '<div class="ing-slider-bar slider-wrapper">' +
           '<div class="slider-range"' +
                'ng-style="{left: getLowerBoundPercentage() + \'%\',' +
                           'width: (getHigherBoundPercentage() - getLowerBoundPercentage()) + \'%\'}">' +
           '</div>' +
           '<div ng-transclude></div>' +
           '<ol class="slider-segments" aria-hidden="true">' +
               '<li ng-repeat="segment in getSegments() track by $index" class="slider-segments-item">' +
                   '<div class="slider-segments-element">{{segment}}</div>' +
               '</li>' +
           '</ol>' +
        '</div>'
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-slider-handle
 * @restrict E
 * @scope
 * @requires ingGlobal.directive:ing-slider
 * @requires ingGlobal.directive:ing-slider-bar
 *
 * @param {number} ngModel Reference to scope variable containing the handle's value. This should not be undefined. Note: this should be an object property (e.g. `range.lowerBound`) instead of a single value (e.g. `lowerBound`), as otherwise Angular will not be able to update the model.
 *
 * @description
 * A handle allows the user to choose a value in the slider's range. The user can click and drag the handle
 * over the slider bar to alter the value. Moreover, the handle responds to keyboard input when focused,
 * allowing the user to increment the slider by one step by pressing the "Up" or "Right" keys,
 * decrement it by pressing either the "Down" or "Left" key, and set the model to its maximum
 * or minimum value by pressing "End" or "Home", respectively.
 *
 * DOM-wise, the handle is nested inside the slider bar that it should be locked onto. When two handles
 * are added to a single slider bar, the handles represent the lower and higher bound of a user-specifiable
 * range. Both handles have their own models representing the range boundaries.
 *
 * Moving the handle vertically is not yet supported.
 *
 * Note: the model specified in the `ng-model` attribute should be an object property (in other words:
 * there should be a dot in its name, e.g. `range.lowerBound` instead of `lowerBound`). Otherwise,
 * modifications of the value in the handle's do not propagate to the actual model in your own scope.
 * For more info, see https://egghead.io/lessons/angularjs-the-dot
 *
 * Furthermore, the value of the model should _always_ be set. After all, if it is undefined,
 * where should the handle be positioned? In practice, you will probably want to set it to the minimum
 * value. However, the slider does not set this value automatically to avoid tinkering with your model
 * without being asked to.
 *
 * @example
 <example module="ingGlobal">
    <file name="ing-slider-handle-basic.html">
        <div ng-controller="Ctrl">
            <div class="row">
                <h2>One handle (pick a value)</h2>
                <div class="col-md-4 col-md-offset-1 l-p-2">
                    <ing-slider min="{{min}}" max="{{max}}" step="{{step}}">
                        <ing-slider-bar>
                            <ing-slider-handle ng-model="slider1.value" aria-controls="slider1Value"></ing-slider-handle>
                        </ing-slider-bar>
                    </ing-slider>
                </div>
            </div>
            <div class="row">
                <p id="slider1Value">Model value: {{slider1.value}}</p>
            </div>
            <div class="row">
                <h2>Two handles (select a range)</h2>
                <div class="col-md-4 col-md-offset-1 l-p-2">
                    <ing-slider min="{{min}}" max="{{max}}" step="{{step}}">
                        <ing-slider-bar>
                            <ing-slider-handle ng-model="slider2.lowerBound" id="slider2LowerBound"
                                               aria-controls="slider2HigherBound slider2LowerBoundValue">
                            </ing-slider-handle>
                            <ing-slider-handle ng-model="slider2.higherBound" id="slider2HigherBound"
                                               aria-controls="slider2LowerBound slider2HigherBoundValue"></ing-slider-handle>
                        </ing-slider-bar>
                    </ing-slider>
                </div>
            </div>
            <div class="row">
                <p id="slider2LowerBoundValue">Lower bound: {{slider2.lowerBound}}</p>
                <p id="slider2HigherBoundValue">Higher bound: {{slider2.higherBound}}</p>
            </div>
        </div>
    </file>
    <file name="slider-handle-basic-example-controller.js">
        function Ctrl($scope) {
            $scope.step = 0.5;
            $scope.min = 0.0;
            $scope.max = 2.5;
            $scope.slider1 = {
                value: $scope.min
            };
            $scope.slider2 = {
                lowerBound: $scope.min,
                higherBound: $scope.max
            };
        }
    </file>
 </example>
 */
angular.module('ingGlobal').directive('ingSliderHandle', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        require: ['ngModel', '^ingSlider'],
        link: function(scope, element, attrs, controllers){
            var ngModelCtrl = controllers[0];
            var ingSlider = controllers[1];
            
            // Hardcoded until The Guide finds a way of automatically positioning the handle correctly
            scope.handleWidth = 20;
            
            scope.handleId = ingSlider.addHandle(scope);
            
            scope.isLowerBound = function(){
                return scope.handleId === 0;
            };
            var getOtherHandle = function(){
                var handles = ingSlider.getHandles();
                if(handles.length !== 2){
                    return;
                }
                return handles[(scope.handleId + 1) % 2];
            };
            scope.isOnlyHandle = function(){
                return !getOtherHandle();
            };

            scope.getBoundHandleClass = function(){
                if(scope.isOnlyHandle()){
                    return;
                }
                if(scope.isLowerBound()){
                    return 'slider-handle-min';
                }
                return 'slider-handle-max';
            };
            
            // If there are two handles, the higher handle should be at the right of the range.
            scope.getBoundHandleStyle = function(){
                if(!scope.isOnlyHandle() && !scope.isLowerBound()){
                    return {
                        '-ms-transform': 'translateX(' + scope.handleWidth + 'px)',
                        transform: 'translateX(' + scope.handleWidth + 'px)'
                    };
                }
                return {};
            };

            scope.getBoundButtonClass = function(){
                if(scope.isOnlyHandle()){
                    return;
                }
                if(scope.isLowerBound()){
                    return 'btn-rounded-left';
                }
                return 'btn-rounded-right';
            };

            scope.getMaxValue = function(){
                if(scope.isOnlyHandle() || !scope.isLowerBound()){
                    return ingSlider.getMax();
                }
                return getOtherHandle().handleValue;
            };
            scope.getMinValue = function(){
                if(scope.isOnlyHandle() || scope.isLowerBound()){
                    return ingSlider.getMin();
                }
                return getOtherHandle().handleValue;
            };
            
            scope.orientation = ingSlider.getOrientation();
            scope.$watch(
                function(){
                    return ingSlider.getOrientation();
                }, function(newOrientation){
                    scope.orientation = newOrientation;
                }
            );

            scope.getOffset = function(){
                // The filled percentage is bounded by 0% and 100%
                return Math.max(
                    Math.min(
                        // A value of min is 0%, a value of max is 100% - what is getValue()?
                        ((ngModelCtrl.$modelValue - ingSlider.getMin()) * 100) / (ingSlider.getMax() - ingSlider.getMin()),
                        100
                    ),
                    0
                );
            };

            ngModelCtrl.$parsers.push(function(value) {
                if (ngModelCtrl.$isEmpty(value)){
                    return null;
                }
                return parseFloat(value);
            });

            ngModelCtrl.$parsers.push(function(value){
                // The new value is bounded by the slider's bounds and the other handle
                value = Math.max(Math.min(value, scope.getMaxValue()), scope.getMinValue());
                // Snap to actual step values
                var remainder = value % ingSlider.getStep();
                value = value - remainder;
                if(remainder > (ingSlider.getStep() / 2)){
                    value = value + ingSlider.getStep();
                }
                return value;
            });

            ngModelCtrl.$formatters.push(function(value) {
                if (!ngModelCtrl.$isEmpty(value)) {
                    value = value.toString();
                }
                return value;
            });

            var minValidator = function(modelValue) {
                return ngModelCtrl.$isEmpty(modelValue) ||
                       angular.isUndefined(scope.getMinValue()) ||
                       modelValue >= scope.getMinValue();
            };
            var maxValidator = function(modelValue) {
                return ngModelCtrl.$isEmpty(modelValue) ||
                       angular.isUndefined(scope.getMaxValue()) ||
                       modelValue <= scope.getMaxValue();
            };

            if(angular.isDefined(ngModelCtrl.$validators)){
                // Angular 1.3:
                ngModelCtrl.$validators.min = minValidator;
                ngModelCtrl.$validators.max = maxValidator;
            } else {
                // Angular <1.3
                ngModelCtrl.$formatters.push(function(modelValue){
                    ngModelCtrl.$setValidity('min', minValidator(modelValue));
                    if(minValidator(modelValue)){
                        return modelValue;
                    }
                    return undefined;
                });
                ngModelCtrl.$formatters.push(function(modelValue){
                    ngModelCtrl.$setValidity('max', maxValidator(modelValue));
                    if(maxValidator(modelValue)){
                        return modelValue;
                    }
                    return undefined;
                });
            }
            
            ngModelCtrl.$render = function(){
                scope.handleValue = ngModelCtrl.$modelValue;
            };
          
            var startValue;
            var snapValue = function(xOffset){
                // Increment the startValue with (the percentage the slider has moved * the maximum value)
                ngModelCtrl.$setViewValue(startValue + (xOffset / ingSlider.getWidth()) * (ingSlider.getMax() - ingSlider.getMin()), 'handleDrag');
                ngModelCtrl.$render();
            };

            scope.startDrag = function(){
                startValue = ngModelCtrl.$modelValue;
            };

            scope.drag = function(offset){
                scope.$apply(function(){
                    snapValue(offset.x);
                });
            };

            scope.handleKeypress = function($event){
                // Up and right: increment the value
                if(38 === $event.keyCode || 39 === $event.keyCode){
                    ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue + ingSlider.getStep());
                    ngModelCtrl.$render();
                    $event.preventDefault();
                }
                // Left and down: decrement the value
                if(37 === $event.keyCode || 40 === $event.keyCode){
                    ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue - ingSlider.getStep());
                    ngModelCtrl.$render();
                    $event.preventDefault();
                }
                // End: set value to max
                if(35 === $event.keyCode){
                    ngModelCtrl.$setViewValue(ingSlider.getMax());
                    ngModelCtrl.$render();
                    $event.preventDefault();
                }
                // Home: set value to min
                if(36 === $event.keyCode){
                    ngModelCtrl.$setViewValue(ingSlider.getMin());
                    ngModelCtrl.$render();
                    $event.preventDefault();
                }
            };

            if(attrs.ariaControls){
                scope.ariaControls = attrs.ariaControls;
                element.removeAttr('aria-controls');
            }
        },
        // We need the style `-ms-touch-action: none` to allow pointer events to not be intercepted by IE
        // See http://msdn.microsoft.com/en-us/library/ie/jj583807%28v=vs.85%29.aspx#configure_touch_behaviors
        template: '<div tabindex="0" ng-keypress="handleKeypress($event)"' +
                       'ing-draggable override="true" on-drag-begin="startDrag" on-drag="drag"' +
                       'class="ing-slider-handle slider-slide"' +
                       'ng-style="{left: getOffset() + \'%\'}"' +
                       'role="slider" aria-valuemin="{{getMinValue()}}" aria-valuemax="{{getMaxValue()}}"' +
                       'aria-valuenow="{{handleValue}}" aria-orientation="{{orientation}}" aria-controls="{{ariaControls}}">' +
           '<div class="slider-handle" ng-class="getBoundHandleClass()" ng-style="getBoundHandleStyle()">' +
               '<div class="btn btn-b btn-lg btn-rounded btn-block" ng-class="getBoundButtonClass()">' +
                   '<i aria-hidden="true" class="icon icon-arrow-a-left icon-sm l-rt-n2"' +
                      'ng-if="isOnlyHandle() || isLowerBound()"></i>' +
                   '<i aria-hidden="true" class="icon icon-arrow-a-right icon-sm l-rt-n2 l-ml-n05"' +
                      'ng-if="isOnlyHandle() || !isLowerBound()"></i>' +
               '</div>' +
           '</div>' +
           '<div ng-transclude></div>' +
        '</div>'
    };
});

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-slider-popover
 * @restrict E
 * @scope
 * @requires ingGlobal.directive:ing-slider
 * @requires ingGlobal.directive:ing-slider-handle
 *
 * @description
 * A popover to attach to a slider's handle to display information associated with that handle.
 * It will move along with the handle when it is dragged.
 *
 * The popover should be nested inside the handle it should be attached to. The contents of
 * this element will be shown inside the popover.
 *
 * Currently, vertical sliders are not supported.
 *
 * @example
 <example module="ingGlobal">
    <file name="ing-slider-popover-basic.html">
        <div ng-controller="Ctrl">
            <div class="row">
                <div class="col-md-4 col-md-offset-1 l-p-2 l-pt-3">
                    <ing-slider min="{{min}}" max="{{max}}" step="{{step}}">
                        <ing-slider-bar>
                            <ing-slider-handle ng-model="slider.value" aria-controls="sliderValuePopover sliderValue">
                                <ing-slider-popover>
                                    <output class="h-text-b" id="sliderValuePopover">
                                        Amount: {{slider.value  | ingCurrency}}
                                    </output>
                                </ing-slider-popover>
                            </ing-slider-handle>
                        </ing-slider-bar>
                    </ing-slider>
                </div>
            </div>
            <div class="row">
                <p id="sliderValue">Model value: {{slider.value}}</p>
            </div>
        </div>
    </file>
    <file name="slider-popover-basic-example-controller.js">
        function Ctrl($scope) {
            $scope.slider = {
                value: 0.0
            };
            $scope.step = 0.5;
            $scope.min = 0.0;
            $scope.max = 2.5;
        }
    </file>
 </example>
 */
angular.module('ingGlobal').directive('ingSliderPopover', ['$timeout', function ($timeout) {
    return {
        require: ['^ngModel', '^ingSlider'],
        restrict: 'E',
        transclude: true,
        scope: {},
        link: function(scope, element, attrs, controllers){
            var ngModelCtrl = controllers[0];
            var ingSlider = controllers[1];
            // Hardcoded until The Guide finds a way of automatically positioning
            // the popover correctly
            scope.handleHeight = 40;
            scope.arrowHeight = 12;
            
            scope.$watch(
                function(){
                    return ngModelCtrl.$modelValue;
                },
                function(){
                    // Calculate the width of the popover after the DOM has been updated
                    // (and thus it has the correct width)
                    $timeout(function(){
                        scope.popoverWidth = element.children().get(0).getBoundingClientRect().width;
                    });
                }
            );

            scope.getOffset = function(){
                // The filled percentage is bounded by 0% and 100%
                return Math.max(
                    Math.min(
                        // A value of min is 0%, a value of max is 100% - what is getValue()?
                        ((ngModelCtrl.$modelValue - ingSlider.getMin()) * 100) / (ingSlider.getMax() - ingSlider.getMin()),
                        100
                    ),
                    0
                );
            };
            
            // Returns <0 when the popover, centered above the handle,
            // would flow over the left boundary, >0 if it would flow
            // over the slider's right boundary, and 0 if it just fits.
            var popoverOutsideBoundaries = function(){
                var stepPercentage = ingSlider.getStep() * 100 / (ingSlider.getMax() - ingSlider.getMin());
                var stepWidth = ingSlider.getWidth() * stepPercentage / 100;

                var steps = (ngModelCtrl.$modelValue - ingSlider.getMin())/ingSlider.getStep();
                var maxSteps = (ingSlider.getMax() - ingSlider.getMin())/ingSlider.getStep();
                if(steps * stepWidth < (scope.popoverWidth / 2)){
                    return - 1;
                }
                if((maxSteps - steps) * stepWidth < (scope.popoverWidth / 2)){
                    return 1;
                }
                return 0;
            };
            
            scope.getArrowPosition = function(){
                var isOutsideBoundaries = popoverOutsideBoundaries();
                if(isOutsideBoundaries < 0){
                    if(scope.popoverWidth < 115){
                        // Small popovers look weird if the arrow is too far to the left
                        return 20;
                    }
                    return 10;
                }
                if(isOutsideBoundaries > 0){
                    if(scope.popoverWidth < 115){
                        // Small popovers look weird if the arrow is too far to the right
                        return 80;
                    }
                    return 90;
                }
                return 50;
            };
            
            // How much does the popover need to be shifted on the X-axis to be centered above the handle?
            scope.getTranslation = function(){
                var isOutsideBoundaries = popoverOutsideBoundaries();
                if(isOutsideBoundaries < 0){
                    return -(scope.popoverWidth * 0.1);
                }
                if(isOutsideBoundaries > 0){
                    return -(scope.popoverWidth * 0.9);
                }
                return -scope.popoverWidth / 2;
            };
        },
        template: '<div class="slider-value overlay overlay-padding h-no-wrap"' +
                       'ng-style="{bottom: handleHeight + arrowHeight + \'px\',' +
                                  'left: getTranslation() + \'px\'}"' +
                       'role="presentation">' +
             // The trailing space on the next line is important: it separates class names
           '<div class="arrow-sm overlay-content panel panel-sm panel-shadow-a ' +
                       'h-bg-a panel-bordered l-mb-0 l-pt-05 l-pb-05">' +
               '<div class="arrow arrow-bordered arrow-down"' +
                    'ng-class="\'arrow-h-\' + getArrowPosition()">' +
               '</div>' +
               '<div ng-transclude></div>' +
           '</div>' +
        '</div>'
    };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-spinner
 * @restrict A
 *
 * @description
 *
 * <pre><config>
 * </config></pre>
 *
 * @param
 * {String} [size=lg]            Values: sm, lg
 *
 * @example
 <example module="ingGlobal">
 <file name="ing-spinner.html">
 <div ng-controller="Ctrl">
    <div ing-spinner ng-if="active" size="sm"></div>
    <div ing-spinner ng-if="active"></div>
    <button ng-click="active = !active">Toggle</button>
 </div>
 </file>

 <file name="Ctrl.js">
 function Ctrl($scope){
    $scope.active = true;
 }
 </file>
 </example>
 */

angular.module('ingGlobal').directive('ingSpinner', [function () {
    return {
        restrict: 'EA',
        scope:{
            size:  '@'
        },
        template:'<div class="spinner" ng-class="{\'spinner-sm\': size == \'sm\', \'spinner-lg\': (size == \'lg\' || !size)}"><div><span class="sr-only">Laden...</span></div></div>'
    };
}]);


/**
*
* @ngdoc directive
* @name ingGlobal.directive:ing-split-list
* @restrict A
*
* @description
* Purely functional directive. Should be wrapped around a split list (consisting of two lists from which one is a 'more list').
* It puts two lists ('A' and 'B') on the controller(exposed as 'splitList') that can be used as the aforementioned child lists
*
*
* ### Workings:
* #### Initialization
* <ul style="list-style-type:decimal;">
*   <li>The main directive, ing-split-list, will initialize and send an init event to its child directives </li>
*   <li>The ing-split-focus-element registers it_this on their parent(ing-split-item) controller. It will expose accessibility functions and a reference to it_this(the focusable elem) </li>
*   <li>The ing-split-item will register it_this on its own turn on the ing-split list controller. It will expose a reference to its element and the content of its focusable child </li>
*   <li>The ing-split-list will now hold a data object with reference to the objects exposed by ing-split-item for list A, list B and the more button. All data needed for measurement computations and maintaining focus between lists will be kept here </li>
*   <li>The document.activeElement will be watched to be able to keep an active state reference inside the main directive controller </li>
*   <li>All data are in place: depending on how much space is available on screen, the list will be split in a 'A' and 'B' list </li>
* </ul>
*
* When the data for the original list (list parameter for ing-split-list-directive) changes, initialization will take place again
*
* #### Resize of screen
* <ul style="list-style-type:decimal;">
*   <li>Recomputation (splitting of lists) will take place </li>
*   <li>When focus changes, focus will be set to right element </li>
*   <li>Outside world will be notified whether more list should be opened (whether focus resides in list B)   </li>
* </ul>
*
*
* ## Child directives
* <ul>
*  <li>The lists should be marked with the attribute directives <b>ing-split-list-a</b> (the 'normal' list) and <b>ing-split-list-b</b> (everything that will be under 'more') </li>
*  <li>Every list item that should be used as a measurement unit (mostly li elements) should be marked with the <b>ing-split-item</b> attribute directive </li>
*  <li>The more button has a distinct attribute directive: <b>ing-split-more-item</b> which is used as a measurement unit for the more button </li>
*  <li>Every focusable element inside a split-item(mostly anchors and buttons) will be used to detect which element currently has focus, and needs to be marked with the <b>ing-split-focus-element</b> attribute directive </li>
* </ul>
*
*
* ## Dependencies
*
* ### Directives
* <ul>
*  <li><a href="#/spectingular/ingGlobal.directive:ing-toggle">ing-toggle</a></li>
*  <li><a xhref="#/spectingular/ingGlobal.directive:ing-toggle">ing-toggle-invoker</a></li>
*  <li><a href="#/spectingular/ingGlobal.directive:ing-toggle-content">ing-toggle-content</a>(attr sr-only="true" is required)</li>
* </ul>
*
* ### Services
* <ul>
*  <li><a xhref="#/spectingular/ingGlobal.provider:mqService">mqService</a></li>
*  <li><a href="#/spectingular/ingGlobal.service:accessibilityService">accessibilityService</a></li>
* </ul>
*
*
* @param {array}  list   - list of objects that need to be rendered (the directive will split this list into 'A' and 'B')
* @param {object} config - additional options
* @param {boolean} config.syncItems - Default will be false. When list provided contains dynamic data, please provide 'true' (list will then be watched internally)
* @param {boolean} config.justify   - Default will be false. When provided, item width will be set to available width divided by amount of items that fit. A max-width should be provided in css if one wants to prevent items from becoming too large.
*
*
*
* @example
<example module="ingGlobal">

<file name="SplitExampleCtrl.js">
function SplitExampleCtrl($scope) {
        $scope.content = [];
        for (var i =1; i < 9; i++){
            $scope.content.push({ href: '#' + i, text: 'Item ' + i });
        }
    }
</file>

     <file name="example.html">

     <p> Please resize screen to split up list </p>

      <div ng-controller="SplitExampleCtrl">
          <div ing-split-list list="content" class="l-h-25 l-mb-5">
              <div ing-toggle class="dropdown open">

                  <ul ing-split-list-a class="nav nav-list nav-pills nav-primary">
                      <li ing-split-item ng-repeat="item in splitList.A" class="nav-item">
                          <a ing-split-focus-element>{{item.text}}</a>
                      </li>
                      <li ing-split-more-item class="nav-item dropdown">
                          <a ing-split-focus-element ing-toggle-invoker class="dropdown-toggle">
                              Meer
                              <span aria-hidden="true" class="icon icon-arrow-a-down l-mr-0"></span>
                          </a>
                      </li>
                  </ul>

                  <div ing-split-list-b ing-toggle-content overlay="true" sr-only="true" class="dropdown-menu dropdown-menu-a dropdown-menu-lg dropdown-menu-right arrow-sm">
                      <ul class="list-unstyled l-mb-0" role="presentation">
                          <li ing-split-item ng-repeat="item in splitList.B" class="dropdown-menu-item">
                              <a ing-split-focus-element class="dropdown-menu-element" >
                                  {{item.text}}
                              </a>
                          </li>
                      </ul>
                  </div>

              </div>
          </div>
      </div>

`
<button class="sr-only">Next focusable element</button>

<p> Also see: <a href="#/spectingular/spectingular-ui.ribbon.directive:ui-ribbon">ui-ribbon</a></p>

</file>



</example>
*
**/

'use strict';

angular.module('ingGlobal').directive('ingSplitList', [function() {
    return {
        restrict: 'A',
        scope:true,
        controllerAs: 'splitList',
        link: function(scope, elem, attrs, ctrl) {

            function setConfig() {
                for(var i in ctrl.config) {
                    var val = scope.$eval(attrs[i]);
                    if(angular.isDefined(val)) {
                        ctrl.config[i] =  val;
                    }
                }
            }

            setConfig();
            ctrl._init();

        },
        controller: ['$element', '$timeout', '$scope', '$rootScope', '$attrs', '$document', '$window', 'mqService', 'ingKeyBinderConfig', function( $element, $timeout, $scope, $rootScope, $attrs, $document, $window, mqService, ingKeyBinderConfig) {
            var _this = this;

            var specialKeys = ingKeyBinderConfig.specialKeys();

            /*** Private vars ***/

            this.config = {
                syncList: false,
                justify: false,
                delegateFocus: true,
                availableWidthFn: function() {}
            };

            this._data = {
                listA : [],  /* List containing objects with a reference to a measurement element (usually a 'li') and a focusable element (usually an 'a' or a 'button').
                                It contains a reference to the nodes themselves and accessibility and visibility functions
                                Data stored in this list originates from child directives of ing-split-list-a */
                listB : [],  // See listA. Data stored in this list originates from child directives of ing-split-list-b
                moreBtn : {} // Same object as stored in aforementioned arrays, for child directives of the more button
            };

            this.state = {
                startIndexB: -1,                    // This marks the 'breaking point' from list A to B
                _focusedIndex: -1,                  // The current index in the original list($attrs.list)
                _moreVisible: false,                // Internal visibility state of the more list, used to sync dropdown state via dropdownCtrl
                _childRegistrationComplete: false   // Internal helper state, true after child directives have handled their splitList.init handler
            };


            /*** Private functions ***/

            /**
             * Init method, should be called once
             * @private
             */
            this._init = function() {
                if(_this.config.syncList) {
                    // When the items in the ng-repeat of the visible item list change, reinitialization should take place as well.
                    $scope.$watch(function() {return $scope.$eval($attrs.list); }, _this._initList, true);
                } else {
                    _this._initList();
                }

                _this._addSkipLink();
            };

            /**
             * List init method, should be called when external list changes
             * @private
             */
            this._initList = function() {
                _this.state._childRegistrationComplete = false;
                _this.A = _this.B = $scope.$eval($attrs.list);

                $timeout(function gatherDataAndSplitList() {
                    // reset data needed for computations and
                    _this._data.listA = [];
                    _this._data.listB = [];
                    _this._data.moreBtn = {};

                    $scope.$broadcast('splitList.init');
                    _this.state._childRegistrationComplete = true;
                    _this._setAccessibilityButtons();

                    _this._splitList();

                });
            }

            /**
             * Make sure the more button is not accessible by keyboard, so tabbing experience will be like tabbing through one list (all data under more dropdown will be srOnly)
             * @private
             */
            this._setAccessibilityButtons = function() {
                for(var i in _this._data.listA) {
                    _this._data.listA[i].enableFocusable();
                    _this._data.listB[i].enableFocusable();
                }
                _this._data.moreBtn.disableFocusable();
            };

            /**
             * 'Cancel' or 'selection' actions should place focus after the splitList
             * @private
             */
            this._addSkipLink = function() {
                $element.append('<a tabindex="-1" id="' + 'splitListSkip-' + $scope.$id + '"></a>');
            };


            /**
             * Splits the list. It will recompute the width of all elements and decides how to divide listA and listB.
             * It will change accessibility and visibility properties appropriately. The changes should be immediately visible in the implementing directive, that is bound to the A and B variables of this 'splitList' controller
             * @private
             */
            this._splitList = function() {

                if(!_this.state._childRegistrationComplete) {
                    return
                }

                var i,
                    listA = _this._data.listA,
                    moreBtn = _this._data.moreBtn,
                    items = listA.length;

                // 1. Prepare data : show all items and delete inline widths

                $element.css('visibility', 'hidden'); // Prevent reflows for actions below

                for(i = 0; i < items; i++) {
                    if(_this.config.justify) {
                        listA[i].setClientWidth('');
                    }
                    listA[i].show();
                }

                moreBtn.show();

                if(_this.config.justify) {
                    moreBtn.setClientWidth('');
                }

                /*jshint -W030 */
                // Force reflow(repaint)
                $element[0].style.display = 'none';
                $element[0].offsetHeight;
                $element[0].style.display='';


                var availableWidth = _this.config.availableWidthFn() || $element[0].clientWidth;
                var moreBtnWidth = moreBtn.getOuterWidth();


                var totalWidth = 0,
                    itemsWhenMoreVisible = 0,
                    itemsWhenMoreNotVisible = 0;

                // Used if justify is true
                var totalSpacing = 0;


                // 2. Determine how many items fit with their width in availableWidth and (availableWidth - moreBtnWidth)

                for(i = 0; i < items; i++) {
                    totalWidth += listA[i].getOuterWidth();

                    if(_this.config.justify) {
                        totalSpacing += (listA[i].getOuterWidth() - listA[i].getClientWidth());
                    }

                    if(totalWidth <= (availableWidth - moreBtnWidth)) {
                        itemsWhenMoreVisible++;
                        itemsWhenMoreNotVisible++;
                    } else if (totalWidth <= availableWidth) {
                        itemsWhenMoreNotVisible++;
                    }
                }

                var allItemsFit = itemsWhenMoreNotVisible === items;

                if(_this.config.justify && !allItemsFit) {
                    totalSpacing += (moreBtn.getOuterWidth() - moreBtn.getClientWidth());
                }


                // 3. Set visibility

                _this.state.startIndexB = allItemsFit ? -1 : itemsWhenMoreVisible;
                _this.state._moreVisible = allItemsFit ? false : _this.state._moreVisible;
                moreBtn[allItemsFit ? 'hide' : 'show']();
                _this._setCorrectItemVisibility(_this.state.startIndexB);


                // 4. Justify content

                if(_this.config.justify) {
                    var itemsInA = (allItemsFit ? itemsWhenMoreNotVisible : itemsWhenMoreVisible);
                    var maxAvailWidthPerItem = Math.floor((availableWidth - totalSpacing) / (itemsInA + (allItemsFit ? 0 : 1)));

                    for(i = 0; i < items; i++) {
                        listA[i].setClientWidth(maxAvailWidthPerItem); // (note that max-width defined in css would still 'win')
                    }
                    if(!allItemsFit) {
                        moreBtn.setClientWidth(maxAvailWidthPerItem);
                    }
                }

                $element.css('visibility', ''); // Allow reflows

                // 5. Set focus
                if(_this.state._focusedIndex > -1) {
                    var focusInA = _this.state._focusedIndex <= itemsWhenMoreVisible;
                    _this.state._moreVisible = !focusInA;

                    if(_this.config.delegateFocus) {
                        _this._data['list' + (focusInA ? 'A' : 'B')][_this.state._focusedIndex].focus();
                    }
                }

                // Sync dropdown state
                _this.dropdownCtrl[_this.state._moreVisible ? 'open' : 'close']();

            };


            /**
             * Disables items in list A and B that are not supposed to be active
             *
             * @param {number} startIndexB
             * @private
             */
            this._setCorrectItemVisibility = function(startIndexB) {
                for(var i = 0, l = _this._data.listA.length; i < l; i++) {
                    if(startIndexB === -1 || i < startIndexB) {
                        _this._data.listB[i].hide();
                    } else {
                        _this._data.listA[i].hide();
                        _this._data.listB[i].show();
                    }
                }
            };


            /** Focus helper functions **/

            this._updateFocusedIndex = function() {
                _this.state._focusedIndex = _this._getFocusedIndexFromArrayList([_this._data.listA, _this._data.listB]);
            };

            this._setFocusOn = function(focusPosition) {

                switch(focusPosition) {
                    case 'afterList':
                        _this._focusSkipLink();
                        _this.state._focusedIndex = -1;
                        break;
                    case 'lastA':
                        _this.state._focusedIndex = _this.state.startIndexB-1;
                        _this._data.listA[_this.state._focusedIndex].focus();
                        break;
                    case 'firstB':
                        _this.state._focusedIndex = _this.state.startIndexB;
                        _this._data.listB[_this.state._focusedIndex].focus();
                        break;
                    case 'self':
                        _this._updateFocusedIndex();
                        break;
                }


            };



            /**
             * Gets the corresponding index from the original list of the dom node currently being focused
             *
             * @param {array} arrayList - array containing item lists(arrays on its own) it needs to search for the activeElement
             * @param {elementNode} activeElement - dom node currently having focus
             * @returns {int} index of the original item list
             * @private
             */
            this._getFocusedIndexFromArrayList = function(arrayList) {
                for (var i in arrayList) {
                    for (var j in arrayList[i]) {
                        if(arrayList[i][j].isActiveElement()) {
                            return Number(j);
                        }
                    }
                }
                return -1;
            };



            this._focusSkipLink = function() {
                document.getElementById('splitListSkip-' + $scope.$id).focus();
            };


            /* Public functions called by child directives */

            /**
             * Adds an object to this controller containing measurement data, accessibility and visibility data and functions
             * @param {object} elem - object as described above
             * @param {string} list - can be 'a' or 'b'
             */
            this.addItem = function(elem, list) {
                _this._data['list' + list.toUpperCase()].push(elem);
            };

            /**
             * Adds an object to this controller containing measurement data, accessibility data, and visibility functions
             * @param {object} elem - object as described above
             */
            this.addMoreBtn = function(elem) {
                _this._data.moreBtn = elem;
            };

            /**
             * To be called by this or child directive(s) mostly upon user interaction. Depending on given action and focusPosition, sets focus on right element in list (or skiplink after list)
             * @param {string} action - 'toggle'|'close'
             * @param {string} focusPosition - 'afterList'|'lastA'|'firstB'
             */
            this.handleFocus = function(action, focusPosition) {
                if(!_this.config.delegateFocus) {
                    return;
                }

                switch(action) {
                    case 'toggle':  //tab or more click
                        _this._setFocusOn(_this.state._moreVisible ? 'lastA' : 'firstB');
                        break;
                    case 'close':
                        _this._setFocusOn(focusPosition);
                        break;
                    case 'self':
                        _this._setFocusOn('self');
                }
            };


            /*** Code ***/


            // Container size has changed by css media query, therefore item widths need to be recalculated
            $scope.$on('mq-changed', function(event, mq) {

                if(mq.width === 0) {
                    angular.element($window).on('resize', _this._splitList);
                } else {
                    angular.element($window).off('resize', _this._splitList);
                }

                _this._splitList();

            });

            $scope.$watch(function() { return _this.dropdownCtrl && _this.dropdownCtrl.state.open }, function(open) {
                _this.state._moreVisible = open;
            });

            /** Event handlers **/

            // Ensure _focusedIndex is tracked on tab
            function tabHandler(e) {
                if(e.which === specialKeys.tab) {
                    _this._updateFocusedIndex();
                    _this.state._moreVisible = _this.state.startIndexB > -1 && _this.state._focusedIndex >= _this.state.startIndexB ? true :false;
                    _this.dropdownCtrl[_this.state._moreVisible ? 'open' : 'close']();
                }
            }

            $document.on('keyup', tabHandler);


            function escHandler  (e) {
                if(e.which === specialKeys.escape) {
                    _this.handleFocus('close', 'afterList');
                }
            }

            $document.on('keydown', escHandler);

            // Clean up on $destroy
            $scope.$on('$destroy', function() {
                $document.off('keyup', tabHandler);
                $document.off('keydown', escHandler);
                angular.element($window).off('resize', _this._splitList);
            });

        }]
    }
}]);


angular.module('ingGlobal').directive('ingSplitListA', [function() {
    return {
        restrict: 'A',
        require: '^ingSplitList',
        controller: function() {} // Lets child directives detect their parent
    }
}]);

angular.module('ingGlobal').directive('ingSplitListB', [function() {
    return {
        restrict: 'A',
        require: ['^ingSplitList', '^ingToggle'],
        link: function(scope, elem, attrs, ctrls) {
            var splitListCtrl = ctrls[0],
                dropdownCtrl = ctrls[1];

            dropdownCtrl.config.srOnly = true;

            // Expose dropdown controller
            splitListCtrl.dropdownCtrl = dropdownCtrl;

        },
        controller: function() {} // Lets child directives detect their parent
    }
}]);



// Only task of these directives is to register themselves on controller of ing-divided-list, so that ing-divided-list can access the items without knowing about their DOM structure.
angular.module('ingGlobal').directive('ingSplitItem', [function() {
    return {
        restrict: 'A',
        priority: 1,
        scope:true,
        require:['^ingSplitList', 'ingSplitItem', '?^ingSplitListA', '?^ingSplitListB'],
        link: function(scope, elem, attrs, ctrls) {
            var listCtrl = ctrls[0], itemCtrl = ctrls[1], listA = ctrls[2], listB = ctrls[3];

            if(!listA && !listB) {
                throw new Error('Please define which list(\'a\' or \'b\') the current item is part of (place \'ing-split-list-a\' or \'ing-split-list-b\' directive on its parent)');
            }

            scope.$on('splitList.init', function addItem() {
                listCtrl.addItem(itemCtrl.api, listB ? 'b' : 'a');
            });

        },
        controller:'SplitItemController'
    }
}]);

angular.module('ingGlobal').directive('ingSplitMoreItem', [function() {
    return {
        restrict: 'A',
        priority: 1,
        scope:true,
        require:['^ingSplitList', 'ingSplitMoreItem'], // use in conjunction with ng-repeat, so scope.$index can be used
        link: function(scope, elem, attrs, ctrls) {
            var listCtrl = ctrls[0], moreCtrl = ctrls[1];

            scope.$on('splitList.init', function addMoreBtn() {
                listCtrl.addMoreBtn(moreCtrl.api);
            });
        },
        controller:'SplitItemController'
    }
}]);

// Allow child elements to register themselves to their containing measurement element (usually a li)
angular.module('ingGlobal').controller('SplitItemController', ['$scope', '$element', function($scope, $element) {
    var _this = this;

    this.api = {
        hide : function() {
            $element.hide(); // loose jQ
        },
        show : function() {
            $element.show();  // loose jQ
        },
        getClientWidth: function() {
            return $element[0].clientWidth;
        },
        getOuterWidth: function() {
            return $element.outerWidth(true); //TODO: use utilsService.outerWidth() once available  // loose jQ
        },
        setClientWidth: function(x) {
            $element.css('width', x ? (x + 'px') : '');
        },
        isActiveElement: function() {
            return ($element[0] === document.activeElement) || ($element.has(document.activeElement).length > 0);  //IE gives elements inside anchor focus  // loose jQ
        },
        focus: function() {},
        enableFocusable: function() {},
        disableFocusable: function() {}
    };

    this.registerFocusFunction = function(fn) {
        _this.api.focus = fn;
    };

    this.registerFocusableEnabler = function(fn) {
        _this.api.enableFocusable = fn;
    };

    this.registerFocusableDisabler = function(fn) {
        _this.api.disableFocusable = fn;
    };

}]);

angular.module('ingGlobal').directive('ingSplitFocusElement', [ 'ingKeyBinderConfig', function(ingKeyBinderConfig) {
    return {
        restrict: 'A',
        priority: 0,
        require:['^ingSplitList', '?^ingSplitMoreItem', '?^ingSplitItem', 'ingSplitFocusElement', '?^^ingToggle', '?^^ingSplitListB'],
        controller: function()  {},
        link: function(scope, elem, attrs, ctrls) {
            var itemCtrl        = ctrls[2],
                moreCtrl        = ctrls[1],
                listBCtrl       = ctrls[5],
                dropdownCtrl    = ctrls[4],
                splitListCtrl   = ctrls[0],
                parentItemCtrl  = moreCtrl ? moreCtrl : itemCtrl;

            var specialKeys = ingKeyBinderConfig.specialKeys();

            if(!itemCtrl && !moreCtrl) {
                throw new Error('Please define where the ing-split-focus-element is part of (place \'ing-split-item\' or \'ing-split-more-item\' on its parent).');
            }

            scope.$on('splitList.init', function addFocusElem() {
                parentItemCtrl.registerFocusFunction(function() {
                    elem[0].focus();
                });

                parentItemCtrl.registerFocusableEnabler(function() {
                    elem.attr('tabindex','0');
                });

                parentItemCtrl.registerFocusableDisabler(function() {
                    elem.attr('tabindex','-1');
                });
            });

            if(itemCtrl && splitListCtrl.config.delegateFocus) {
                elem.on('click', function() {
                    elem[0].focus(); // Set focus for iOS and Android
                    splitListCtrl.handleFocus('self');
                });
            }

            if(itemCtrl && listBCtrl) { // Dropdown should close on click and enter. TODO: decide if this keyboard interaction should be part of usability (assignment of up and down keys)
                elem.on('keyup', function(e) {
                    if(e.which === specialKeys.enter) {
                        splitListCtrl.handleFocus('close', 'afterList');
                        dropdownCtrl.close();
                    }
                });

                elem.on('click', function() {
                    splitListCtrl.handleFocus('close', 'afterList');
                    dropdownCtrl.close();
                });
            }
            else if(moreCtrl) {
                elem.on('click', function() {
                    splitListCtrl.handleFocus('toggle');
                });
                // dropdown visibility is handled by dropdown directive
            }

        }
    }
}]);

'use strict';

/* Star directive */

/***
 * @ngdoc directive
 * @name ingGlobal.directive:ing-starrating
 * @restrict AE
 * @requires ngModel
 *
 * @scope
 * @param {number=}   ngModel                   The value (floating point values between 0 and 5, undefined for no stars filled). Values ending with decimals between .25 and .75 will fill half of the last star.
 * @param {boolean}   [ng-disabled=false]       Set to true to make the directive read-only. Hovering and clicking will be disabled.
 * @param {string}    [iconSize='md']           The size of the icons.

 *
 * @description
 * This directive will display five star icons, which are filled based on the model value.
 * Hovering over a star will toggle it and all stars before it. Clicking the star results in a model value between 1 and 5, or undefined for 0 stars.
 * Each star can be half- or fully filled, however it is not possible to manually select half stars.
 * Half stars will only be visible by using floaing point model values (useful ie. for displaying averages)
 *
 * @example
 <example module="ingGlobal">
 <file name="starrating-basic.html">
 <div ng-controller="Ctrl">
 <ing-starrating ng-model="data.rating">
 </ing-starrating>
 </div>
 </file>
 <file name="starrating-basic-example-controller.js">
 function Ctrl($scope) {
            $scope.data = {
                rating: 2.5
            };
        }
 </file>
 </example>
 */
angular.module('ingGlobal').
    directive('ingStarrating', function () {

        return {
            restrict: 'AE',
            require: 'ngModel',
            scope: {
                iconSize: '@',
                disabled: '@',
                rating: '=ngModel'
            },

            link: function (scope, element, attrs, ngModelCtrl) {

                element.attr('role', 'radiogroup');
                scope.iconSize = angular.isDefined(scope.iconSize) ? scope.iconSize : 'md';
                scope.iconClass = 'icon-' + scope.iconSize;
                scope.disabled = angular.isDefined(scope.disabled) && angular.equals(scope.disabled, 'disabled');

                ngModelCtrl.$render = function () {
                    scope.rating = ngModelCtrl.$viewValue;
                    updateStars(scope.rating);
                };

                scope.toggle = function (index) {
                    var starIndex = index + 1;
                    // toggle to undefined instead of 0, so ing-required can be used
                    var newRating = angular.equals(scope.rating, starIndex) ? undefined : starIndex;
                    ngModelCtrl.$setViewValue(newRating);
                    scope.rating = newRating;
                    updateStars(newRating);
                };

                scope.hoverStars = function (index) {
                    var hoverRating = index + 1;
                    updateStars(hoverRating);
                };

                scope.resetStars = function () {
                    updateStars(scope.rating);
                };

                scope.checkKeyDown = function (event, index) {
                    if (scope.disabled) {
                        return;
                    }
                    if (angular.equals(event.keyCode, 13)) { // Return key
                        scope.toggle(index);
                    }
                };

                function updateStars(rating) {
                    scope.stars = [];
                    for (var i = 0, count = rating || 0; i < 5; i++, count--) {
                        scope.stars.push(count < 0.25 ? 'off' : count < 0.75 ? 'half' : 'on');
                    }
                }
            },

            template: '<i ng-keydown="checkKeyDown($event, $index)" aria-label="{{starId+1 + (starId===0 ? \' star\' : \' stars\')}}" role="radio" tabindex="0" aria-readonly="{{disabled}}"  name="{{\'star-\' + $index}}" ng-repeat="(starId, star) in stars track by starId" ng-click="disabled ? {} : toggle($index)" ng-mouseover="disabled ? {} : hoverStars($index)" ng-mouseout="disabled ? {} : resetStars()">' +
            '<span aria-checked="{{rating >= starId+1 && rating < starId+2}}" ng-if="star != \'half\'" class="icon icon-star {{iconClass}}" ng-class="{\'icon-gray-light\': star !== \'on\', \'icon-orange\': star === \'on\'}"></span>' +
            '<span ng-if="star == \'half\'" class="stacked-icon {{iconClass}}">' +
            '<i class="icon icon-star-half-z1 icon-gray-light" aria-hidden="true"></i>' +
            '<i class="icon icon-star-half-z2 icon-orange" aria-hidden="true"></i>' +
            '</span>' +
            '</i>'

        };
    });

'use strict';

/** Initialize tagManagement data for a page
 */

angular.module('ingGlobal').directive('ingTagManagement', ['tagManagementService', '$timeout', function (tagManagementService, $timeout) {
    return {
        restrict: 'EA',
        link: function() {
            tagManagementService.init();
            $timeout(tagManagementService.objectReady);
        }
    };
}]);

'use strict';

/** Output tagManagement data for a page
 *
 * attributes:
 * page-instance-id: a unique identifier for this page
 * prefix: opp -> particulier, opb -> zakelijk, personal banking, private banking
 * channel: the channel, or 'home page'
 * openclosed: open|closed
 * path: the rest of the path, after channel
 * country (optional): country code
 * lang (optional): language code
 */


angular.module('ingGlobal').directive('ingTagManagementPosition', ['tagManagementService',function (tagManagementService) {
    return {
        restrict: 'EA',
        require: '^ingTagManagementSection',
        link: function (scope, element, attrs, sectionController) {
            var section = sectionController.getSection(),
                componentId = attrs.id,
                component = section.addComponent(componentId);

            if (!angular.equals(componentId, component.componentID)) {
                element.attr('id', component.componentID);
            }

            tagManagementService.mergeSections();
            if (tagManagementService.isReady()) {
                tagManagementService.objectChanged();
            }
        }
    };
}]);
'use strict';

/** Output tagManagement data for a page
 *
 * attributes:
 * page-instance-id: a unique identifier for this page
 * prefix: opp -> particulier, opb -> zakelijk, personal banking, private banking
 * channel: the channel, or 'home page'
 * openclosed: open|closed
 * path: the rest of the path, after channel
 * country (optional): country code
 * lang (optional): language code
 */

angular.module('ingGlobal').directive('ingTagManagementSection', function () {
    return {
        restrict: 'EA',
        controller: ['tagManagementService', '$attrs', function(tagManagementService, $attrs) {
            var section = tagManagementService.registerSection($attrs.id);
            this.getSection = function() {
                return section;
            }
        }]
    };
});
'use strict';

/*jshint latedef: nofunc */




/**
* ngdoc directive
* @name ingGlobal.directive:ing-toggle-content
* @restrict A
*
* @description
* Child directive of ing-toggle. Content can be hidden via class sr-only, which will make content visually hidden, but accessible for screen readers. Next to this, directives requiring the controller of the ing-toggle directive can control the open state.
* The ing-split-list does this for instance.
*
* @param {boolean} close-on-click-outside - default will be false. When true, document listeners for click  will be bound.
* @param {boolean} close-on-esc - default will be false. When true, [esc] listener will be bound on element
* @param {boolean} open-on - Boolean or function returning one that controls the open state of the content
* @param {string} open-evt - Set of events, separated by spaces that determine the open state of the content (for instance 'focus mouseover'). Note that the default 'click' event will be omitted when this option is supplied.
* @param {string} close-evt - Set of events, separated by spaces that determine the close state of the content (for instance 'blur mouseout'). Note that the default 'click' event will be omitted when this option is supplied.
* @param {string} toggle-evt - Set of events, separated by spaces that determine the open/close state of the content. Overrides the default 'click' event.
*
*
* ## Example
* See <a href="#/spectingular/ingGlobal.directive:ing-toggle">ing-toggle</a>
*
*/

(function(){

angular.module('ingGlobal').directive('ingToggleContent', ['$document', '$animate', 'ingKeyBinderConfig', ingToggleContentDirective]);


function ingToggleContentDirective($document, $animate, ingKeyBinderConfig) {

    return {
        restrict: 'A',
        require: ['^ingToggle', 'ingToggleContent'],
        link: function(scope, element, attrs, ctrls) {

            var toggleCtrl = ctrls[0];
            var ctrl = ctrls[1];

            var config = {};

            /** Get attr values **/

            config.closeOnEsc = scope.$eval(attrs.closeOnEsc) || false; // clicking outside this directive (except for the toggle button) will cause it to close, when true
            config.closeOnClickOutside = scope.$eval(attrs.closeOnClickOutside) || false; // in case one wants no overlay, but esc should lead to close of toggle-content. For instance, a collapsing menu

            toggleCtrl.config.closeOnClickOutside = config.closeOnClickOutside;


            ctrl.show = function show() {
                setVisibilityAndAccessibility(element, false, toggleCtrl.config.srOnly);
            };

            ctrl.hide = function hide() {
                setVisibilityAndAccessibility(element, true, toggleCtrl.config.srOnly);
            };

            var specialKeys = ingKeyBinderConfig.specialKeys();

            function escapeHandler(e) {
                if((e.keyCode || e.which) === specialKeys.escape) {
                    toggleCtrl.close();
                }
            }

            function documentClickHandler() {
                if(!toggleCtrl.state.preventClose) {
                    toggleCtrl.close();
                }
                toggleCtrl.state.preventClose = false;
            }

            if(config.closeOnClickOutside) {
                $document.on('click', documentClickHandler);
                scope.$on('$destroy', function unbindDocumentClickHandler() {
                    $document.off('click', documentClickHandler);
                });
            }

            if(config.closeOnEsc) {
                element.on('keydown', escapeHandler);
            }


            /** (Click) inside content **/

            element.on('click', function() {
                if(config.closeOnClickOutside) {
                    toggleCtrl.state.preventClose = true;
                }
            });

            /** On open state change: execute show or hide function on controller **/

            scope.$watch( function() { return toggleCtrl.state.open; }, function(open) {
                ctrl[open ? 'show':'hide']();
            });

            if(attrs.openOn) {
                scope.$watch(function() { return scope.$eval(attrs.openOn); }, function(result) {
                    if(angular.isDefined(result)) {
                        toggleCtrl[result ? 'open' : 'close']();
                    }
                });
            }
        },
        controller: 'toggleContentController'
    };

    function setVisibilityAndAccessibility(element, hide, srOnly) {
        var hideClass = srOnly ? 'sr-only' : 'ng-hide';
        var action = hide ? 'addClass' : 'removeClass';

        $animate[action](element, hideClass, function() {
            element.removeClass('ng-animate'); // Clean up what ng-animate leaves in some cases
        });

        // Use this in version >= 1.4
        //$animate[action](element, hideClass, { tempClasses: 'ng-hide-animate'});

        // Accessibility

        if(!srOnly) {
            element.attr('aria-hidden', hide);
            element.attr('aria-expanded', !hide);
        }

    }


}


angular.module('ingGlobal').controller('toggleContentController',[function() {

    this.show = function() {};
    this.hide = function() {};

    /////////////////

}]);


}());


/*jshint latedef: nofunc */

(function(){

angular.module('ingGlobal').directive('ingToggleInvoker', [ingToggleInvokerDirective]);


function ingToggleInvokerDirective() {
    return {
        restrict: 'A',
        require: '^ingToggle',
        link: function(scope, element, attrs, toggleCtrl) {

            function attachEvent(evt, element, action){
                element.on(evt, function() {
                    if(!toggleCtrl.state.preventClose) {
                        toggleCtrl[action]();
                    }

                    if(evt.indexOf('click') > -1) {
                        if(toggleCtrl.config.closeOnClickOutside) {
                            toggleCtrl.state.preventClose = true;
                        }
                    }

                    // When _closesOnClickOutside, the document handles this reset. In case toggleContent is a child of invoker, this doesn't hold
                    if(!toggleCtrl.config.closeOnClickOutside) {
                        toggleCtrl.state.preventClose = false;
                    }

                });
            }

            var evts = {
                open: attrs.openEvt,
                close: attrs.closeEvt,
                toggle: attrs.toggleEvt || ((attrs.openEvt || attrs.closeEvt) ? false : 'click')
            };

            for (var i in evts) {
                if(evts[i]) {
                    attachEvent(evts[i], element, i);
                }
            }

            if(!toggleCtrl.config.srOnly) {
                scope.$watch(function () {
                    return toggleCtrl.state.open;
                }, function (open) {
                    element.attr('aria-expanded', !!open);
                });
            }
        }
    };
}

}());

/**
* ngdoc directive
* @name ingGlobal.directive:ing-toggle
* @restrict A
*
* @description
* This is a purely functional directive that should be placed on an element wrapping child elements with directives ing-toggle-invoker and ing-toggle-content.
* It keeps track of the open state of the dropdown, which can be controlled externally as well.
* It doesn't have knowledge of markup and can be configured to be visually hidden, whilst accessible for screen readers.
*
* @param {boolean} sr-only - default will be false. When true, list is hidden via class sr-only, which will make content visually hidden, but accessible for screen readers. Also appropriate aria values will (or will not be) set.
*
* ## Child directives
* <ul>
*  <li><b>ing-toggle-invoker</b> </li>
*  <li><a href="#/spectingular/ingGlobal.directive:ing-toggle-content"><b>ing-toggle-content</b> </a></li>
* </ul>
*
* @example
<example module="ingGlobal">
    <file name="example.html">
        <div ng-include="'collapsibles.html'"></div>
         <div ng-include="'dropdown.html'"></div>
         <div ng-include="'collapseMenu.html'"></div>
    </file>

<file name="dropdown.html">


<div class="panel panel-shadow-a panel--tg">

     <div class="panel-heading">
         <div class="heading-b-xl">Dropdown</div>
         <p class="l-mb-0">Configuration <kbd>ing-toggle-content</kbd> : <code>overlay="true"</code></p>
     </div>

     <div class="panel-body l-pt-0 l-pb-2">

          <hr>

          <div id="dropdown" ing-toggle>
             <div class="dropdown">
                 <button ing-toggle-invoker class="btn btn-default dropdown-toggle" type="button" id="toggleButton">
                     <span class="position position-right position-xs">
                         <span aria-hidden="true" class="position-component position-component-middle icon dropdown-toggle-icon"></span>
                         Toggle
                     </span>
                 </button>
                 <div ing-toggle-content close-on-esc="true" close-on-click-outside="true" class="animation">
                     <ul class="dropdown-menu-default list-unstyled" role="menu">
                         <li class="dropdown-menu-item" role="presentation">
                             <a ng-click="toggle.close()" role="menuitem" tabindex="-1" >Action</a>
                         </li>
                         <li class="dropdown-menu-item" role="presentation">
                             <a ng-click="toggle.close()" role="menuitem" tabindex="-1" >Another action</a>
                         </li>
                     </ul>
                 </div>
             </div>
          </div>


     </div>

</div>


</file>



<file name="collapseMenu.html">




<div class="panel panel-shadow-a panel--tg">
     <div class="panel-heading">
         <div class="heading-b-xl">Collapsible menu</div>
        <p class="l-mb-0">Configuration <kbd>ing-toggle-content</kbd> : <code>close-on-esc="true" sr-only="true"</code></p>
    </div>

<div class="panel-body l-pt-0 l-pb-2">
    <hr>

     <nav role="navigation" aria-labelledby="ribbon-heading-small">
          <div class="ribbon ribbon-a ribbon-sm">
              <div class="example-ribbon-container">
                  <div ing-toggle class="dropdown ribbon-dropdown open">

                      <div class="ribbon-wrapper">

                          <div class="ribbon-container">
                              <ul class="ribbon-list" role="presentation">
                                  <li class="ribbon-list-item">
                                      <a tabindex="-1" class="btn btn-transparent btn-wrap ribbon-element" href="" role="button">
                                          <div class="ribbon-element-icon">
                                              <span class="icon icon-calculator ribbon-element-icon-element" aria-hidden="true"></span>
                                          </div>
                                          <div class="ribbon-element-text">
                                              Inkomsten en uitgaven
                                          </div>
                                      </a>
                                  </li>
                                  <li class="ribbon-list-item">
                                      <a tabindex="-1" class="btn btn-transparent btn-wrap ribbon-element" href="" role="button">
                                          <div class="ribbon-element-icon">
                                              <span class="icon icon-wealth-increase ribbon-element-icon-element" aria-hidden="true"></span>
                                          </div>
                                          <div class="ribbon-element-text">
                                              Vermogen
                                          </div>
                                      </a>
                                  </li>
                                  <li class="ribbon-list-item">
                                      <a tabindex="-1" href="" class="btn btn-transparent btn-wrap ribbon-element">
                                          <div class="ribbon-element-icon">
                                              <span class="icon icon-house ribbon-element-icon-element" aria-hidden="true"></span>
                                          </div>
                                          <div class="ribbon-element-text">
                                              Woonsituatie
                                          </div>
                                      </a>
                                  </li>
                              </ul>

                          </div>

                          <div class="ribbon-container">

                              <div ing-toggle-invoker class="btn btn-transparent ribbon-element ribbon-element-more dropdown-toggle">
                                  <div class="ribbon-element-icon">
                                      <span class="icon icon-more ribbon-element-icon-element" aria-hidden="true"></span>
                                  </div>
                                  <div class="ribbon-element-text">
                                      Meer <span aria-hidden="true" class="icon dropdown-toggle-icon"></span>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <ul ing-toggle-content close-on-esc="true" sr-only="true" class="animation dropdown-menu dropdown-menu-right dropdown-menu-default dropdown-menu-lg ribbon-dropdown-menu ribbon-dropdown-menu-arrow arrow-border arrow-up" role="presentation">
                          <li class="dropdown-menu-item">
                              <a tabindex="-1" class="dropdown-menu-element ribbon-dropdown-menu-element" href="">Geld overmaken</a>
                          </li>
                          <li class="dropdown-menu-item">
                              <a tabindex="-1" class="dropdown-menu-element ribbon-dropdown-menu-element" href="">Inleggen en opnemen</a>
                          </li>
                          <li class="dropdown-menu-item active" aria-selected="true">
                              <span class="dropdown-menu-element ribbon-dropdown-menu-element">Automatisch inloggen</span>
                          </li>
                      </ul>

                  </div>
              </div>
          </div>
     </nav>
    </div>
</div>

</file>


<file name="collapsibles.html">


<div class="panel panel-shadow-a panel--tg">

      <div class="panel-heading">
          <div class="heading-b-xl">Collapsibles</div>
          <p class="l-mb-0">Configuration; none, default behaviour</p>
      </div>

      <div class="panel-body l-pt-0 l-pb-2">
           <hr>

<table class="table table-b ng-scope">
     <caption>Table collapsible</caption>
     <thead>
     <tr>
         <th scope="col" class="l-pl-3">Collapsible header</th>
     </tr>
     </thead>
     <tbody>

     <tr ing-toggle class="collapsible">
         <td ing-toggle-invoker>
             <div>Content 1 heading</div>
             <button  class="btn btn-unstyled collapsible-header" style="left: 5px;">
                 <span class="sr-only">Toon en verberg details transactie voor Content 1</span>
             </button>
             <div ing-toggle-content>
                 <div class="example-dropdown-content">
                     Collapsible content 1
                 </div>
             </div>
         </td>
     </tr>

     <tr ing-toggle class="collapsible">
         <td ing-toggle-invoker>
             <div>Content 2 heading</div>
             <button class="btn btn-unstyled collapsible-header" style="left: 5px;">
                 <span class="sr-only">Toon en verberg details transactie voor Content 2</span>
             </button>
             <div ing-toggle-content>
                 <div class="example-dropdown-content">
                     Collapsible content 2
                 </div>
             </div>
         </td>
     </tr>

     <tr class="collapsible" ing-toggle>
         <td ing-toggle-invoker>
             <div>Content 3 heading</div>
             <button class="btn btn-unstyled collapsible-header" style="left: 5px;">
                 <span class="sr-only">Toon en verberg details transactie voor Content 3</span>
             </button>
             <div ing-toggle-content>
                 <div class="example-dropdown-content">
                     Collapsible content 3
                 </div>
             </div>
         </td>
     </tr>

     </tbody>
</table>

</div>

</div>


</file>


</example>
*/

/*jshint latedef: nofunc */

(function(){

angular.module('ingGlobal').directive('ingToggle', [ingToggleDirective]);


function ingToggleDirective() {

    return {
        restrict: 'A',
        scope: true,
        controllerAs: 'toggle',
        link: {
            pre: function(scope, element, attrs, ctrl) {
                ctrl.config.srOnly = !!scope.$eval(attrs.srOnly);
            }
        },
        controller: ['$scope', function($scope) {

            var _this = this;

            this.state = {
                open: false,
                init: true,
                preventClose: false
            };

            this.config = {
                closeOnClickOutside : false,
                srOnly: undefined
            };

            this.close = closeFn;
            this.open = openFn;
            this.toggle = toggleFn;

            ///////////////////


            function openFn() {
                $scope.$evalAsync(function() {
                    _this.state.open = true;
                });
            }

            function closeFn() {
                $scope.$evalAsync(function() {
                    _this.state.open = false;
                });
            }

            function toggleFn() {
                $scope.$evalAsync(function() {
                    _this.state.open = !_this.state.open;
                });
            }

        }]
    };
}




}());



'use strict';

/**
 * Puts a data object from the content service onto the scope.
 *
 * @example
 <example module="exampleApp">
 <file name="index.html">
 <div ing-use-content="mainArticle.contents as article">
 <h1>{{article.title}}</h1>
 <h2>{{article.subtitle}}</h2>
 <p>{{article.body}}</p>
 </div>
 </file>
 <file name="scripts.js">

 var exampleApp = angular.module("exampleApp", ['ingGlobal']);
 exampleApp.config(function(contentServiceProvider){
    contentServiceProvider.add('article1', {'contents': {'title': 'Article title', 'subtitle': 'Article subtitle', 'body': 'Lorem ipsum dolor sit amet...'}, 'metadata': {}});
 });
 </file>
 </example>
 */

/*global jQuery*/
angular.module('ingGlobal').directive('ingUseContent', ['$interpolate', 'contentService', function ($interpolate, contentService) {
    return {
        priority: 1001,
        restrict: 'A',
        scope: false,
        compile: function() {
            return {
                pre: function(scope, element, attrs) {
                    angular.forEach(attrs.ingUseContent.split(','), function(variable) {
                        var parts = jQuery.trim(variable).split(' as '),
                            path = $interpolate(parts[0])(scope),
                        // Use the "as" part, if any. Otherwise, use the name of the last element,
                        // discarding any non-word characters such as array brackets.
                            varName = parts[1] || path.split('.').pop().split(/\W/)[0];

                        if (varName) {
                            scope[varName] = contentService.get(path);
                        }
                    });
                }
            };
        }
    };
}]);

'use strict';

/* The version directive. */
angular.module('ingGlobal').directive('ingVersion', ['globalVersion', function (version) {
    return function (scope, element) {
        element.text(version.version);
    };
}]);



'use strict';
/**
 * paging directive for vertical paging.

 */

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-vertical-pager
 * @restrict E
 * @scope =
 *
 * @param {Object} config the config object
 * @property {Int}      config.tabIndex                 tabIndex for this control
 * @property {Int}      config.pageSize                 number of items for one page
 * @property {Boolean}  config.showTopLink              show/hide the back to top link
 * @property {String}   config.toTopButtonTxt           text on the back to top button
 * @property {Boolean}  config.getMore                  show/hide button to get more items
 * @property {String}   config.getMoreButtonTxt         text on the get more button
 * @property {Boolean}  config.showMore                 show/hide button to show more items
 * @property {String}   config.showMoreButtonTxt        text on the show more button
 * @property {Boolean}  config.getMoreMessage           show/hide the no more results message
 * @property {String}   config.noMoreResultsMessage     text for no more results
 * @property {Boolean}  config.endOfList                show/hide end of list message
 * @property {String}   config.endOfListMessage         text when we are at the end of the list
 * @property {Boolean}  config.loading                  show/hide loading message
 * @property {String}   config.loadingMessage           text when loading new data
 *
 * @description
 * Paging directive for vertical paging.
 * Use cases / best practices: <br/><br/>
 * This will only show / hide buttons and messages which you can switch form your controller
 * Use this directive for either client- or serverside paging.
 * It will broadcast showData (for clientside) or newCall (for serverside use) to the rootscope.
 * This will allow you to either get new data or scope data and set switches for messages accordingly
 *
 * @example
 <example module="ingGlobal">
 <file name="index.html">
    <div ng-controller="Ctrl">
        <h1>Get more message</h1>
        <ing-vertical-pager config="pager1"></ing-vertical-pager>

        <h1>Show more message</h1>
        <ing-vertical-pager config="pager2"></ing-vertical-pager>

        <h1>Loading</h1>
        <ing-vertical-pager config="pager3"></ing-vertical-pager>

        <h1>End of list</h1>
        <ing-vertical-pager config="pager4"></ing-vertical-pager>
    </div>
 </file>

 <file name="script.js">
    function Ctrl($scope) {
        $scope.pager1 = {
            tabIndex: 1,
            pageSize: 9,

            showTopLink: true,
            getMore: true,
            showMore: false,
            getMoreMessage: false,
            endOfList: false,
            loading: false,

            toTopButtonTxt: "Naar boven",
            getMoreButtonTxt: "Meer af- en bijschrijvingen",
            showMoreButtonTxt: "Meer resultaten",
            noMoreResultsMessage: "Geen (andere) resultaten gevonden tot 01-01-1900. Zoek verder terug",
            endOfListMessage: "Verder terug zoeken is niet mogelijk",
            loadingMessage: "Bezig met verder terug zoeken"
        };

        $scope.pager2 = {
            tabIndex: 1,
            pageSize: 9,

            showTopLink: false,
            getMore: false,
            showMore: true,
            getMoreMessage: true,
            endOfList: false,
            loading: false,

            toTopButtonTxt: "Naar boven",
            getMoreButtonTxt: "Meer af- en bijschrijvingen",
            showMoreButtonTxt: "Meer resultaten",
            noMoreResultsMessage: "Geen (andere) resultaten gevonden tot 01-01-1900. Zoek verder terug",
            endOfListMessage: "Verder terug zoeken is niet mogelijk",
            loadingMessage: "Bezig met verder terug zoeken"
        };

        $scope.pager3 = {
            tabIndex: 1,
            pageSize: 9,

            showTopLink: false,
            getMore: false,
            showMore: false,
            getMoreMessage: false,
            endOfList: false,
            loading: true,

            toTopButtonTxt: "Naar boven",
            getMoreButtonTxt: "Meer af- en bijschrijvingen",
            showMoreButtonTxt: "Meer resultaten",
            noMoreResultsMessage: "Geen (andere) resultaten gevonden tot 01-01-1900. Zoek verder terug",
            endOfListMessage: "Verder terug zoeken is niet mogelijk",
            loadingMessage: "Bezig met verder terug zoeken"
        };

        $scope.pager4 = {
            tabIndex: 1,
            pageSize: 9,
            error: true,

            showTopLink: false,
            getMore: false,
            showMore: false,
            getMoreMessage: false,
            endOfList: true,
            loading: false,

            toTopButtonTxt: "Naar boven",
            getMoreButtonTxt: "Meer af- en bijschrijvingen",
            showMoreButtonTxt: "Meer resultaten",
            noMoreResultsMessage: "Geen (andere) resultaten gevonden tot 01-01-1900. Zoek verder terug",
            endOfListMessage: "Verder terug zoeken is niet mogelijk",
            loadingMessage: "Bezig met verder terug zoeken"
        };
    }
 </file>
 </example>
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-vertical-pager#showData
 * @eventOf ingGlobal.directive:ing-vertical-pager
 * @eventType  emit on $rootScope
 * @description This event is emitted when ?????
 */

/**
 * @ngdoc event
 * @name ingGlobal.directive:ing-vertical-pager#newCall
 * @eventOf ingGlobal.directive:ing-vertical-pager
 * @eventType  emit on $rootScope
 * @description This event is emitted when ?????
 */
angular.module('ingGlobal').directive('ingVerticalPager', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            config: '='
        },
        template :
            '<div class="ib-pagerlist">' +
            '   <div class="row">' +
            '       <div class="col-lg-6 col-lg-offset-3 h-text-center">' +
            '           <a tabindex="{{config.tabIndex}}" ng-show="config.getMore && !config.loading && !config.endOfList" ng-keypress="newCall($event)"  ng-click="newCall()" class="btn btn-primary icon-position-md">' +
            '               <i aria-hidden="true" class="icon icon-arrow-c-down"></i> {{config.getMoreButtonTxt}}' +
            '           </a>' +
            '           <a tabindex="{{config.tabIndex}}" ng-show="config.showMore" ng-keypress="showMore(config.pageSize, $event)" ng-click="showMore(config.pageSize)" class="btn btn-primary icon-position-md" >' +
            '               <i aria-hidden="true" class="icon icon-arrow-c-down"></i> {{config.showMoreButtonTxt}}' +
            '           </a>' +
            '           <div ng-show="config.loading">' +
            '               <div class="spinner-text h-inline-block">' +
            '                   <div ing-spinner></div>' +
            '                   {{config.loadingMessage}}' +
            '               </div>' +
            '           </div>' +
            '           <div ng-if="config.getMoreMessage" ing-notification type="info" class="h-text-left l-mt-2">{{config.noMoreResultsMessage}}</div>' +
            '           <div ng-if="config.endOfList" ing-notification type="info" class="h-text-left">{{config.endOfListMessage}}</div>'+
            '       </div>' +
            '       <div class="col-lg-3 h-text-right">' +
            '           <a tabindex="{{config.tabIndex + 1}}" class="btn btn-link icon-position icon-after icon-position-sm" ng-show="config.showTopLink" ng-keypress="scrollTop($event)" ng-click="scrollTop()">' +
            '               {{config.toTopButtonTxt}}' +
            '               <i class="icon icon-arrow-e-up" aria-hidden="true"></i>' +
            '           </a>' +
            '       </div>' +
            '   </div>' +

            '   <div ng-if="error" ing-notification type="error">Er is iets misgegaan, probeer het later nog eens.</div>' +
            '</div>',
        replace: true,
        controller: 'verticalPagerCtrl'
    }
});

angular.module('ingGlobal').controller('verticalPagerCtrl' ,['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
    var ENTER = 13;
    this.scope = function() {
        return $scope;
    };
    $scope.showMore = function(resToShow, event) {
        if (event === undefined) {
            $rootScope.$broadcast('showData', resToShow);
        }
        else {
            if (event) {
                if (ENTER === event.which) {
                    $rootScope.$broadcast('showData', resToShow);

                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                }
            }
        }
    };
    $scope.newCall = function(event) {
        if (event === undefined) {
            $rootScope.$broadcast('newCall');
        }
        else {
            if (event) {
                if (ENTER === event.which) {
                    $rootScope.$broadcast('newCall');

                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                }
            }
        }
    };
    $scope.scrollTop = function(event) {
        if (event === undefined) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        } else {
            if (event) {
                if (ENTER === event.which) {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;

                    if (event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;
                    }
                }
            }
        }
    };
}]);


'use strict';

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-wizard
 * @deprecated as of 11/2014 - Replaced by ing-navigator, see <a href="#/spectingular/ingGlobal.directive:ing-navigator">ing-navigator</a>
 * Eventually this component will be removed
 */
angular.module('ingGlobal').directive('ingWizard', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            config: '='
        },
        controller: 'wizardController',
        template:
            '<div class="panel panel-bordered" id="{{config.id}}">' +
            '   <div class="panel-heading l-p-0">' +
            '       <div class="pagination-wrapper pagination-steps-wrapper pagination-steps-wrapper-a">' +
            '           <ol class="pagination pagination-steps pagination-steps-a">' +
            '               <li class="pagination-item" ng-repeat="step in config.steps" ng-class="{active: config.activeStepId == step.id, visited: step.completed }" ng-show="!step.hidden" ng-if="!step.finished">' +
                                '<a class="pagination-element" ng-show="allowed(step.id) && step.completed"  name="{{step.label}}" ng-click="navigate(step.id)">' +
                                    '<span class="pagination-type">{{step.index}}</span><span class="pagination-text">{{step.label}}</span><span class="arrow pagination-arrow"></span>' +
                                '</a>' +
                                '<span class="pagination-element" ng-show="!(allowed(step.id) && step.completed)" name="{{step.label}}")>' +
                                    '<span class="pagination-type">{{step.index}}</span><span class="pagination-text">{{step.label}}</span><span class="arrow pagination-arrow"></span>' +
                                '</span>' +
            '               </li>' +
            '           </ol>' +
            '           <div ng-show="hasFinishStep()" class="pagination-complete" ng-class="{active: current().finished }">' +
            '               <div class="pagination-complete-item"><span aria-hidden="true" class="icon"></span></div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '   <div class="ing-wizard-content panel-body" ng-transclude></div>' +
            '</div>',
        link: function ($scope) {
            $scope.stepsCount = ( $scope.hasFinishStep ) ? $scope.config.steps.length - 1 : $scope.config.steps.length;
        }
    };
});

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-wizard-steps
 * @deprecated
 */
angular.module('ingGlobal').directive('ingWizardSteps', function () {
    return {
        require: '^ingWizard',
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: { id: '@' },
        link: function ($scope, $element) {
            $scope.config = $element.inheritedData('config');
        },
        template:
            '<div class="ing-wizard-steps">' +
                '<div ng-transclude></div>' +
            '</div>'
    };
});

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-wizard-step
 * @deprecated
 */
angular.module('ingGlobal').directive('ingWizardStep', function () {
    return {
        require: '^ingWizard',
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: { id: '@' },
        link: function ($scope, $element) {
            $scope.config = $element.inheritedData('config');
        },
        template:
            '<div class="ing-wizard-step transitioned" ng-class="id" ng-hide="config.complete || config.activeStepId != id">' +
                '<div ng-transclude></div>' +
            '</div>'
    };
});

/**
 * @ngdoc directive
 * @name ingGlobal.directive:ing-wizard-footer
 * @deprecated
 */
angular.module('ingGlobal').directive('ingWizardFooter', function () {
    return {
        require: '^ingWizard',
        restrict: 'EA',
        replace: true,
        transclude: true,
        link: function ($scope, $element, attrs, wizardController) {
            $scope.config = $element.inheritedData('config');
            $scope.parentScope = wizardController.scope();
        },
        template: '<div class="ing-wizard-footer row l-pb-2 l-pt-2" ng-hide="parentScope.current().finished"> ' +
            '   <div class="col-lg-3">' +
            '       <button class="btn btn-default  icon-position icon-before icon-position-lg"  type="button" name="{{config.previousLabel != undefined && config.previousLabel || \'Vorige\'}}"  ng-show="!parentScope.first()" title="{{config.previousLabel != undefined && config.previousLabel || \'Vorige\'}}" ng-click="parentScope.previous()">' +
            '           <i class="icon icon-arrow-g-left icon-lg" aria-hidden="true"></i>' +
            '           {{parentScope.current().previousLabel || config.previousLabel || \'Vorige\'}}' +
            '       </button>' +
            '   </div>' +
            '   <div class="col-lg-5">' +
            '       <button class="btn btn-primary icon-position icon-after icon-position-lg" type="button" name="{{config.nextLabel != undefined && config.nextLabel || \'Volgende\'}}" title="{{config.nextLabel != undefined && config.nextLabel || \'Volgende\'}}" ng-click="parentScope.next()">' +
            '           {{parentScope.current().nextLabel || config.nextLabel || \'Volgende\'}}' +
            '           <i class="icon icon-arrow-g-right icon-lg" aria-hidden="true"></i> ' +
            '       </button>' +
            '   </div>' +
            '</div>'
    };
});

angular.module('ingGlobal').controller('wizardController', ['$scope', '$rootScope', '$element', '$filter', '$window', function ($scope, $rootScope, $element, $filter, $window) {
    $element.data('config', $scope.config);

    // Expose the wizard scope to the nested directives.
    this.scope = function () {
        return $scope;
    };

    // Navigate if allowed.
    $scope.navigate = function (id) {
        $rootScope.$broadcast($scope.config.id + '-navigate-started', id);

        if (!$scope.exists(id) || !$scope.allowed(id)) {
            $rootScope.$broadcast($scope.config.id + '-navigate-failed', id);
            return;
        }
        var currentStepIndex = $scope.stepIndex($scope.config.activeStepId);
        var toBeStepIndex = $scope.stepIndex(id);

        // scroll to top of the page
        $window.scrollTo(0,0);

        // if finished, disable steps
        if ($scope.config.steps[ toBeStepIndex ].finished) {
            for (var x = currentStepIndex; x >= 0; x--) {
                $scope.config.steps[x].completed = false;
            }
        }
        // if not available or not allowed
        else if (currentStepIndex < toBeStepIndex) {
            $scope.current().completed = true;
        } else {
            for (var i = toBeStepIndex; i < currentStepIndex; i++) {
                $scope.config.steps[i].completed = false;
            }
        }
        $scope.config.activeStepId = id;
        $rootScope.$broadcast($scope.config.id + '-navigate-success', id);
    };

    // Indicates if the step with the given id exists.
    $scope.exists = function (id) {
        return $scope.stepIndex(id) > -1;
    };

    // Navigates to the next step.
    $scope.next = function () {
        var overrideNavigation = $scope.current().overrideNavigation;
        if (overrideNavigation !== undefined && overrideNavigation.next) {
            $rootScope.$broadcast($scope.config.id + '-on-next', $scope.config.activeStepId);
        } else {
            $scope.navigateNext();
        }
    };

    // Navigates to the previous step.
    $scope.previous = function () {
        var overrideNavigation = $scope.current().overrideNavigation;
        if (overrideNavigation !== undefined && overrideNavigation.previous) {
            $rootScope.$broadcast($scope.config.id + '-on-previous', $scope.config.activeStepId);
        } else {
            $scope.navigatePrevious();
        }
    };

    // Gets the index in the step map for the given id.
    $scope.stepIndex = function (id) {
        for (var i = 0; i < $scope.config.steps.length; i++) {
            if ($scope.config.steps[i].id === id) {
                return i;
            }
        }
        return;
    };

    // Indicates if the current step is the first step.
    $scope.first = function () {
        return $scope.config.activeStepId === $scope.config.steps[0].id;
    };

    // Indicates if the current step is the last step ( not the finished step ).
    $scope.last = function () {
        var lastStep;
        if($scope.hasFinishStep) {
            lastStep = $scope.config.steps[ $scope.config.steps.length - 2 ];
        } else {
            lastStep = $scope.config.steps[ $scope.config.steps.length - 1 ];
        }
        return ($scope.current().id === lastStep.id);
    };

    $scope.hasFinishStep = function() {
        return $scope.config.steps[ $scope.config.steps.length - 1].finished === true;
    };

    // Gets the step with the given id.
    $scope.step = function (id) {
        return $scope.config.steps[$scope.stepIndex(id)];
    };

    // Gets the current step.
    $scope.current = function () {
        return $scope.step($scope.config.activeStepId);
    };

    // Indicates if navigation to the given index is allowed from the current one.
    $scope.allowed = function (id) {
        var allowedSteps = $scope.current().allowedSteps;
        var allowed = false;
        if (allowedSteps !== undefined) {
            allowed = $filter('filter')(allowedSteps, id).length === 1;
        }
        return allowed;
    };

    // Does the actual navigation next.
    $scope.navigateNext = function () {
        $scope.navigate($scope.config.steps[$scope.stepIndex($scope.config.activeStepId) + 1].id);
    };

    // Does the actual navigation previous.
    $scope.navigatePrevious = function () {
        $scope.navigate($scope.config.steps[$scope.stepIndex($scope.config.activeStepId) - 1].id);
    };

    // Watch on navigate broadcast event.
    $scope.$on($scope.config.id + '-navigate', function (event, destination) {
        $scope.navigate($scope.config.steps[$scope.stepIndex(destination)].id);
    });

    // Watch on navigate-next broadcast event.
    $scope.$on($scope.config.id + '-navigate-next', function () {
        $scope.navigate($scope.config.steps[$scope.stepIndex($scope.config.activeStepId) + 1].id);
    });

    // Watch on navigate-previous broadcast event.
    $scope.$on($scope.config.id + '-navigate-previous', function () {
        $scope.navigate($scope.config.steps[$scope.stepIndex($scope.config.activeStepId) - 1].id);
    });
}]);

'use strict';

/**
 * @ngdoc filter
 * @name ng.filter:ingCurrency
 *
 * @description
 * Formats a number as a currency (ie €1,234.56). Optionally you can provide some options to change the output.
 *
 * **Note:** default symbol is €. If you need another symbol and it's not already included in ingGlobal use <code> {{amount | ingCurrency:'USD'}} </code>
 * **Note:** default fractions is 2. If you use a different fraction, then the amount is not rounded. Everything after the decimal separator is stripped of.
 *
 * @param {number} amount Input to filter.
 * @param {Object|string|number} option Can be one of:
 *  - `Object`: An object where you can provide both symbol and fraction options. The key properties that read from the object are: 'symbol' and 'fractions'. For example: {symbol: 'USD', fractions: '0'}.
 *  - `string`: The symbol that is used in the formatted result. Default is the '€' symbol.
 *  - `number`: The number of factions used in the formatted result. Possible values are: '0' or '2'. Default is '2' factions.
 *
 * @returns {string} Formatted number.
 *
 * @example
 <doc:example>
 <doc:source>
 <script>
 function Ctrl($scope) {
   $scope.amount = 1234.56;
 }
 </script>
 <div ng-controller="Ctrl">
 <input type="number" ng-model="amount"> <br>
 default currency symbol (€): {{amount | ingCurrency}}<br>
 custom currency symbol (USD): {{amount | ingCurrency:'USD'}}}<br>
 custom currency fractions (0): {{amount | ingCurrency:0}}<br>
 custom currency symbol and fractions (USD & 0): {{amount | ingCurrency:{symbol:'USD', fractions:0}}}
 </div>
 </doc:source>
 </doc:example>
 */
angular.module('ingGlobal').filter('ingCurrency', [ '$filter', '$locale', function ($filter, $locale) {
    var angularCurrencyFilter = $filter('currency');
    var numberFormats = $locale.NUMBER_FORMATS;

    return function (amount, option) {
        var symbol, fractions;

        if (angular.isString(option)) {
            symbol = option;
        }

        if (angular.isNumber(option)) {
            fractions = option;
        }

        if (angular.isObject(option)) {
            symbol = option.symbol;
            fractions = option.fractions;
        }

        var formattedValue = angularCurrencyFilter(amount, symbol);

        if (angular.isDefined(fractions) && fractions === 0) {
            var decimalSeperator = formattedValue.indexOf(numberFormats.DECIMAL_SEP);

            formattedValue = formattedValue.substring(0, decimalSeperator);
        }

        return formattedValue;
    };

}]);
'use strict';
/**
 * @ngdoc filter
 * @name ingGlobal.filter:dutchZipcode
 * @description
 * Formats a string as a Dutch zipcode if that is possible
 * @param {string} zipcode value to format as iban
 * @returns {string} formatted Dutch zipcode or original value
 *
 * @example
 <doc:example module="ingGlobal">
 <doc:source>
 <script>
 function Ctrl($scope) {
    $scope.zipcode = '1234 ab'
 }
 </script>
 <div ng-controller="Ctrl">
 {{ zipcode | dutchZipcode }}
 </div>
 </doc:source>
 </doc:example>

 */
angular.module('ingGlobal').filter('dutchZipcode', function () {
    return function (value) {
        if (value === undefined || value === null) {
            return value;
        }
        return value.replace(/\s/g, '').toUpperCase();
    };
});


'use strict';
/**
 * @ngdoc filter
 * @name ingGlobal.filter:iban
 * @description
 * Formats a string as an iban if that is possible
 * @param {string} accountnumber value to format as iban
 * @returns {string} formatted iban or original value
 *
 * @example
 <doc:example module="ingGlobal">
 <doc:source>
 <script>
 function Ctrl($scope) {
$scope.accountNumber = 'NL00INGB0000000000'
}
 </script>
 <div ng-controller="Ctrl">
 {{ accountNumber | iban }}
 </div>
 </doc:source>
 </doc:example>

 */
angular.module('ingGlobal').filter('iban', ['utilsService', '$filter', function (utilsService, $filter) {
    return function (value) {
        if (utilsService.isEmpty(value)) {
            return value;
        }
        var iban = (value + '').replace(/\s|\.|,|-/g, ''), len = value.length;
        return len > 12 ? $filter('uppercase')(iban.match(/.{1,4}/g).join('\u0020')) : value;
    };
}]);

'use strict';
/**
 * @ngdoc filter
 * @name ingGlobal.filter:phoneNumber
 * @description
 * Formats a string as a valid dutch (mobile) phone number, if possible.
 * Directive for validating and formatting a dutch phone number.
 * A valid number will result in: **06-12345678**
 *
 * <p>Valid characters: <b>+0-9</b></p>
 * <p>Valid prefixes: <b>+3106, +316, 00316, 003106 & 06.</b></p>
 * <p>Valid length (excluding prefix): <b>8</b></p>
 * @example
 <example module="exampleApp">
   <file name="index.html">
     <div ng-controller="exampleCtrl">
       <span>{{phone | phoneNumber}}</span>
     </div>
   </file>
   <file name="scripts.js">
     angular.module("exampleApp", ['ingGlobal'])
       .controller('exampleCtrl', function($scope) {
         $scope.phone = '+31612345678';
       });
   </file>
 </example>
 */
/* global jQuery */
angular.module('ingGlobal').filter('phoneNumber', ['utilsService',
    function(utilsService) {
        return function(input) {
            if (utilsService.isEmpty(input)) {
                return input;
            }

            // Remove all non digit character (but leave the "+", even if more than one)
            input = input.replace(/[^\d\+]/g, '');

            // After all this fuss, the only allowed inputs at the beginning of the string
            // are +3106, +316, 00316, 003106, 06.
            // Instead of using complicated regex, let's just turn the first part of the string to
            // "06" case per case OK?
            if (input.indexOf('+3106') === 0) {
                input = input.replace('+3106', '06');
            } else if (input.indexOf('+316') === 0) {
                input = input.replace('+316', '06');
            } else if (input.indexOf('00316') === 0) {
                input = input.replace('00316', '06');
            } else if (input.indexOf('003106') === 0) {
                input = input.replace('003106', '06');
            }

            input = input.replace('06', '');
            // Finally format in this way: 06-12345678
            input = '06-' + input;
            return jQuery.trim(input);
        };
    }
]);
angular.module('ingGlobal').config(['$provide', function ($provide) {
  'use strict';

  $provide.decorator('$location', ['$delegate',
    function ($location) {

      // Local query cache. No need to expire this, because a change in the query string would resolve in a page refresh (and an angular reload)
      var query;

      // Decorate the $location service with new functionality to read query string arguments
      $location.query = function () {
        var queryString, split;

        if (!query) {
          query = {};
          // Work with the absolute url
          split = $location.absUrl().split('?');
          if (split.length > 0 && split[1]) {
            // Query string is the part between '?' and '#'
            queryString = split[1].split('#')[0];

            // For each key-value pair
            angular.forEach(queryString.split('&'), function (queryStringKeyValue) {
              // If a key is present without a value, use true as its value (just like $location.search() does)
              var queryStringPair = queryStringKeyValue.split('=');
                query[queryStringPair[0]] = (queryStringPair[1] || true);
            });
          }
        }
        return query;
      };
      return $location;
    }
  ]);
}]);

'use strict';

 /**
 * @ngdoc service
 * @name ingGlobal.businessMonitoring
 *
 * @description
 * Service to add business monitoring to your app.
 *
 * Most monitoring should be implemented automatically by other directives calling this service.
 * The most likely use case for directly using this service is when you want to report custom events.
 * You would use the method `businessMonitoring.sendAction(actionName)` to do so.
 */
angular.module('ingGlobal').service('businessMonitoring', ['$window', '$timeout', '$q', function ($window, $timeout, $q) {
    return {
        /**
         * @ngdoc method
         * @name ingGlobal.businessMonitoring#fireEvent
         * @description Deprecated method for sending methods to the also deprecated S-code-service. Do not use.
         * @methodOf ingGlobal.businessMonitoring
         * @deprecated
         */
        fireEvent: function () {},
        sendPageVisit: sendPageVisit,
        sendAction: sendAction,
        sendFormStep: sendFormStep
    };

    /*
     * Checks whether required objects are present. They might not be when e.g. using a custom Tridion template.
     *
     * @return boolean Whether the required global objects Bootstrapper and wt are available on the page
     */
    function isActive(){
        return angular.isDefined($window.Bootstrapper) && angular.isDefined($window.wt);
    }

    /*
     * If Webtrekk is active, resolve the promise with the callback result. Otherwise, reject.
     */
    function callIfActive(callback, deferred){
      if(isActive()){
        deferred.resolve(callback());
      } else {
        deferred.reject('Webtrekk  is inactive on this page');
      }
    }

    /*
     * If Webtrekk is active, immediately call the callback. If Webtrekk is not active (yet), will retry after a delay
     */
    function callWhenActive(callback){
      var deferred = $q.defer();
      if(isActive()){
        deferred.resolve(callback());
      } else {
        $timeout(function(){
          callIfActive(callback, deferred)
        }, 200);
      }

      return deferred.promise;
    }

    /*
     * Populate the variables Webtrekk always needs with the values automatically available from the Bootstrapper object.
     * @author Martijn Visser
     */
    function populateMetadata(){
        if(!isActive()){
            return;
        }
        var dl_obj = ($window.Bootstrapper.dataManager || {
            getData: function() {}
        }).getData() || {};
        $window.wt.customSessionParameter = $window.wt.customSessionParameter || {};
        $window.wt.customParameter = $window.wt.customParameter || {};
        $window.wt.customCampaignParameter = $window.wt.customCampaignParameter || {};
        $window.wt.customEcommerceParameter = $window.wt.customEcommerceParameter || {};
        $window.wt.contentId = dl_obj.pageName;
        $window.wt.product = dl_obj.form;
        $window.wt.productQuantity = dl_obj.productQuantity;
        $window.wt.productStatus = dl_obj.productStatus;
        $window.wt.orderValue = dl_obj.orderValue;
        $window.wt.orderId = dl_obj.orderId;
        $window.wt.campaignId = dl_obj.MarketingCampaign;
        $window.wt.customerId = dl_obj.iidCookie;
        $window.wt.customSessionParameter[1] = dl_obj.iidCookie;
        $window.wt.customSessionParameter[4] = dl_obj.c_cookiepref;
        $window.wt.customParameter[1] = $window.location.href.split('?')[0];
        $window.wt.customParameter[2] = dl_obj.channel;
        $window.wt.customParameter[3] = dl_obj.segment;
        $window.wt.customParameter[4] = dl_obj.openclosed;
        $window.wt.customParameter[5] = dl_obj.omgeving;
        $window.wt.customParameter[7] = dl_obj.sitespect;
        $window.wt.customParameter[14] = dl_obj.error;
        $window.wt.customParameter[15] = dl_obj.errorType;
        $window.wt.customParameter[16] = dl_obj.formRequestID;
        $window.wt.customParameter[17] = dl_obj.formVersion;
        $window.wt.customParameter[18] = dl_obj.cOti;
        $window.wt.customCampaignParameter[1] = dl_obj.WebtrekkMarketingCampaign;
        $window.wt.customCampaignParameter[2] = dl_obj.cPropCd;
        $window.wt.customCampaignParameter[3] = dl_obj.cOfferType;
        $window.wt.customCampaignParameter[4] = dl_obj.qs_Gclid;
        $window.wt.customEcommerceParameter[6] = dl_obj.formProductResult;
    }

    /**
     * @ngdoc method
     * @methodOf ingGlobal.businessMonitoring
     * @name ingGlobal.businessMonitoring#sendAction
     * @description Tell business monitoring that the user has performed a custom action.
     * @param {string} actionName Name describing the performed action
     */
    function sendAction(actionName){
        return callWhenActive(function(){
            populateMetadata();
            $window.wt.sendinfo({linkId: actionName});
        });
    }

    /**
     * @ngdoc method
     * @methodOf ingGlobal.businessMonitoring
     * @name ingGlobal.businessMonitoring#sendPageVisit
     * @description Tell business monitoring that a page has been visited. Usually, this will be done automatically.
     * For custom page-view-like actions, however, you might want to call this method with a name describing the page
     * that is to be visited.
     * @param {string} pageName Name describing the page that is visited
     */
    function sendPageVisit(pageName){
        return callWhenActive(function(){
            populateMetadata();
            $window.wt.contentId += ':' + pageName;
            $window.wt.sendinfo();
        });
    }

    /**
     * @ngdoc method
     * @methodOf ingGlobal.businessMonitoring
     * @name ingGlobal.businessMonitoring#sendFormStep
     * @description Inform business monitoring whenever the user is progressing through a multi-step form.
     * For example, the Navigator calls this method whenever the user navigates to the next step.
     * @param {string} formName   Name describing the form the user is progressing through
     * @param {string} formStatus Either 'start', when the form was just initialised, 'conf' when the user has completed the form, or an empty string '' otherwise
     * @param {int}    formStep   The step number, e.g. when there are four pages, either 1, 2, 3 or 4
     */
    function sendFormStep(formName, formStatus, formStep){
        return callWhenActive(function(){
          $window.Bootstrapper.form = formName;
          $window.Bootstrapper.formStatus = formStatus;
          $window.Bootstrapper.formStep = formStep;
          populateMetadata();
          $window.wt.sendinfo();
        });
    }
}]);

'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.provider:configurationService
 *
 * @description
 * This provider contains all the configurations of the modules that are included in the application.
 * The configurationService holds per module all the configurations and provides the ability to override them.
 *
 * @example
 * @example
 <example module="exampleApp">
 <file name="index.html">
 <div ng-controller="exampleCtrl">
 <ul>
 <li ng-repeat="(key, value) in configurations">key [{{key}}] - value [{{value}}]</li>
 </ul>
 </div>
 </file>
 <file name="scripts.js">

 var exampleApp = angular.module("exampleApp", ['ingGlobal']);
 exampleApp.config(function(configurationServiceProvider){
    configurationServiceProvider.add('exampleApp', {'type': 'particuliar', 'showX': 'true'});
});

 exampleApp.controller('exampleCtrl', function($scope, configurationService) {
    $scope.configurations = configurationService.configurations('exampleApp');
});
 </file>
 </example>
 **/

angular.module('ingGlobal').provider('configurationService', function () {
    this.configurations = {};

    this.$get = function () {
        var configurations = this.configurations;
        return {
            configuration: function (module, key) {
                return configurations[module][key];
            },
            configurations: function (module) {
                return configurations[module];
            }
        }
    };

    this.add = function (module, objects) {
        var configurations = this.configurations;
        angular.forEach(objects, function (value, key) {
            if (configurations[module] === undefined) {
                configurations[module] = {};
            }
            configurations[module][key] = value;
        });
    };
});

'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.provider:contentService
 *
 * @description
 * The contentService provides content, either by pre-filling it through the add(id, model) function or by
 * calling the content API (to be implemented).
 *
 * @example
 <example module="exampleApp">
 <file name="index.html">
 <div ng-controller="exampleCtrl">
 <h1>{{article.title}}</h1>
 <h2>{{article.subtitle}}</h2>
 <p>{{article.body}}</p>
 </div>
 </file>
 <file name="scripts.js">

 var exampleApp = angular.module("exampleApp", ['ingGlobal']);
 exampleApp.config(function(contentServiceProvider){
    contentServiceProvider.add('article1', {'contents': {'title': 'Article title', 'subtitle': 'Article subtitle', 'body': 'Lorem ipsum dolor sit amet...'}, 'metadata': {}});
    contentServiceProvider.alias('mainArticle', 'article1');
 });

 exampleApp.controller('exampleCtrl', function($scope, contentService) {
    $scope.article = contentService.get('mainArticle.contents');
 });
 </file>
 </example>
 **/
angular.module('ingGlobal').constant('contentServiceKey', 'contentService');

angular.module('ingGlobal').factory('contentService', ['$parse', 'propertyService', 'contentServiceKey', function ($parse, propertyService, contentServiceKey) {
    return {
        get: function(query) {
            var parts = query.split('.'),
                id = parts.shift(),
                path = parts.join('.'),
                object = propertyService.property(contentServiceKey, id);

            if (!object) {
                // Get content from content API?
                return object;
            } else if (!path) {
                return object;
            } else {
                return $parse(path)(object);
            }
        }
    };
}]);

'use strict';

/*global jQuery*/
angular.module('ingGlobal').service('dateUtils', ['expressions', function (expressions) {
    function mod(n, d) {
        return ((n % d) + d) % d;
    }

    function isValid(date) {
        return date && (new Date(date)).toString() !== 'Invalid Date';
    }

    function adjustDays(date, days) {
        var newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    }

    function firstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    function lastDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth()+1, 0);
    }

    function mondayOfWeek(date) {
        var distance = mod(date.getDay() - 1, 7)
        var monday   = adjustDays(date, - distance);
        return monday;
    }

    function sundayOfWeek(date) {
        var distance = mod(Math.abs(date.getDay() - 7), 7)
        var sunday   = adjustDays(date, distance);
        return sunday;
    }

    function compare(date1, date2) {
        var d1  = new Date( date1.getFullYear(), date1.getMonth(), date1.getDate()),
            d2  = new Date( date2.getFullYear(), date2.getMonth(), date2.getDate()),
            cmp = d1 - d2;

        if (cmp < 0) {
            return -1;
        } else if(cmp > 0) {
            return +1;
        } else {
            return 0;
        }
    }

    function datesInRange(start, end) {
        var comparison = compare(start, end);
        if(comparison === 0) {
            return [end];
        } else if (comparison === 1) {
            return [];
        } else {
            var nextStart = adjustDays(start, 1),
                nextRange = datesInRange(nextStart, end);
            return [start].concat(nextRange)
        }
    }

    function parseIngDate(dateAsString) {

        var trimmedFormattedDateString = formatIngDate(jQuery.trim(dateAsString));

        if (expressions.validDate.test(trimmedFormattedDateString)) {
            var date = trimmedFormattedDateString.split('-');

            var day = date[0];
            var month = (date[1] - 1);
            var year = date[2];
            return new Date(year, month, day, 12, 0, 0);
        } else {
            return undefined;
        }
    }

    /**
     *
     * valid:
     *  input: 01012015 ( 8 digits)
     *  output: 01-01-2015
     *
     * invalid:
     *  length != 8
     *  input contains anything else than digits
     *  output: dateAsString (same as input)
     *
     *
     * @param dateAsString
     * @returns {*}
     */
    function formatIngDate(dateAsString) {
        // Extract all numbers from the string
        var dateInNumbers = dateAsString ? dateAsString.match(/\d/g) : undefined;
        if (dateInNumbers) {
            dateInNumbers = dateInNumbers.join('');
            // only format if the length is exactly 8
            if (dateInNumbers.length === 8) {
                return [dateInNumbers.substr(0, 2), dateInNumbers.substr(2, 2), dateInNumbers.substr(4, 4)].join('-');
            }
        }
        return dateAsString;
    }

    return {
        adjustDays: adjustDays,
        firstDayOfMonth: firstDayOfMonth,
        lastDayOfMonth: lastDayOfMonth,
        mondayOfWeek: mondayOfWeek,
        sundayOfWeek: sundayOfWeek,
        compare: compare,
        datesInRange: datesInRange,
        isValid: isValid,
        parseIngDate: parseIngDate,
        formatIngDate: formatIngDate
    };
}]);

'use strict';

/* The expression service.*/
angular.module('ingGlobal').factory('expressions', function () {
    return {
        validDate : /(^(((0?[1-9]|[12][0-8]|19)[-](0?[1-9]|1[012]))|((29|30|31)[-](0?[13578]|1[02]))|((29|30)[-](0?[4,6,9]|11)))[-](1[89]|[2-9][0-9])\d\d$)|(^29[-]0?2[-](19|[2-9][0-9])(04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)|(^29[-]0?2[-](2[048])00|(^29[-]0?2[-](3[26])00)$)/,
        dutchZipcode : /^[1-9]{1}[0-9]{3} ?[a-zA-Z]{2}$/,
        validName : /^[A-Za-z'\- ÇüÜéâÂäàÀåçêÊëËèèïÏîÎìÌÄÅÉôÔöòÒûÛùÙÖÜøØáÁóÓíÍúÚñÑß]+$/,
        validNumber : /^\d+$/,
        validAmount :/^(\d{1,3}(\.\d{3})*|(\d+))(,\d{1,2})?$/,
        validAmount3digits : /^(\d{1,3}(\.\d{3})*|(\d+))(,\d{1,3})?$/,
        validSingleDotSeparator : /^(\d+\.)(\d{1,2})$/,
        validCharsAmount :/^\s*[\d,.\s]+\s*$/,
        trailingCommaAndDigits :/,\d*/,
        leadingZeroAndDot :/^0\./,
        containsDot :/[\.]/g,
        containsComma :/[,]/g,
        currencyMask: /[.\d,]/,
        username: /^[\.\-\w\d]{6,20}$/,
        validIbanInput : /[a-zA-Z]{2}[0-9a-zA-Z. ]+$/,
        validIngIban : /(^(NL)[0-9]{2}INGB[0-9]{10})$/,
        validDutchIban : /(^NL[0-9]{2}[A-Za-z]{4}[0-9]{10})$/,
        alphabet : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        phoneNumber : /^(\+1|\+7|\+20|\+27|\+30|\+31|\+32|\+33|\+34|\+36|\+39|\+40|\+41|\+43|\+44|\+45|\+46|\+47|\+48|\+49|\+51|\+52|\+53|\+54|\+55|\+56|\+57|\+58|\+60|\+61|\+62|\+63|\+64|\+65|\+66|\+81|\+82|\+84|\+86|\+90|\+91|\+92|\+93|\+94|\+95|\+98|\+212|\+213|\+216|\+218|\+220|\+221|\+222|\+223|\+224|\+225|\+226|\+227|\+228|\+229|\+230|\+231|\+232|\+233|\+234|\+235|\+236|\+237|\+238|\+239|\+240|\+241|\+242|\+243|\+244|\+245|\+246|\+247|\+248|\+249|\+250|\+251|\+252|\+253|\+254|\+255|\+256|\+257|\+258|\+260|\+261|\+262|\+263|\+264|\+265|\+266|\+267|\+268|\+269|\+290|\+291|\+297|\+298|\+299|\+350|\+351|\+352|\+353|\+354|\+355|\+356|\+357|\+358|\+359|\+370|\+371|\+372|\+373|\+374|\+375|\+376|\+377|\+378|\+379|\+380|\+381|\+385|\+386|\+387|\+389|\+420|\+421|\+423|\+500|\+501|\+502|\+503|\+504|\+505|\+506|\+507|\+508|\+509|\+590|\+591|\+592|\+593|\+594|\+595|\+596|\+597|\+598|\+599|\+670|\+672|\+673|\+674|\+675|\+676|\+677|\+678|\+679|\+680|\+682|\+683|\+685|\+686|\+687|\+688|\+689|\+690|\+691|\+692|\+850|\+852|\+853|\+855|\+856|\+880|\+886|\+960|\+961|\+962|\+963|\+964|\+965|\+966|\+967|\+968|\+970|\+971|\+972|\+973|\+974|\+975|\+976|\+977|\+992|\+993|\+994|\+995|\+996|\+998)([0-9]*)$/
    };
});



'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.factory:http-interceptor
 *
 * @description
 * This factory handles resource responses and will transform each response to a valid REST response.
 * It checks for 401 error status, which in practice means an invalid sesam session, so we want to present the login page.
 * Also it checks if the response content-type matches the request accept header
 * Partials will only be passed if they end with ".html"
 *
 * Checks:
 * 1. If a session has expired, the page should be reloaded. Middleware will redirect the user to sesam login page.
 * 2. Partial requests should always be ignored.
 * 3. Error responses should be caught and the status code should be set to the original status code which is provided in the response.
 * 4. Any response which content-type does not match the accept header will be rejected.
 *
 */

angular.module('ingGlobal').factory('httpInterceptor', [ '$q', '$window', function ($q, $window) {
    return {
        'responseError': function(rejection){
            if (rejection.status === 401 && rejection.headers()['x-session-expired'] === 'true') {
                // reloading the page will trigger a redirect to sesam login, giving the user a chance to authorize
                $window.location.reload();
            }
            return $q.reject(rejection);
        },
        'response': function (response) {
            var httpStatusCode = response.data.httpStatusCode;
            if (response.status === 204) { // No-Content responses should be returned
                response.data = undefined;
                return response;
            } else if (response.config.url.indexOf('.html') > 0) { // partials should be returned.
                return response;
            } else if (angular.isDefined(httpStatusCode)) { // error objects should contain httpStatus code.
                response.status = httpStatusCode;
                return $q.reject(response);
            } else {
                // note: by default Angular sends the accept header "application/json, text/plain, */*", which basically means 'accept anything'
                // we ignore the wildcard and expect the content-type to be literally specified in the accept header
                /*jshint sub:true*/
                var accept = response.config.headers['Accept'] || response.config.headers['accept'];
                var contentType = response.headers()['content-type'];
                if (angular.isDefined(contentType)) {
                    var parameterIndex = contentType.indexOf(';');
                    if (!angular.equals(parameterIndex, -1)) {
                        contentType = contentType.substr(0, parameterIndex);
                    }
                }
                if(angular.isUndefined(contentType) || angular.equals(accept.indexOf(contentType), -1)) {
                    response.status = 500;
                    return $q.reject(response);
                }

                return response;
            }
        }
    };
}]);

angular.module('ingGlobal').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);

/**
 * @ngdoc service
 * @name ingGlobal.ibanService
 *
 * @description
 * Service that contains IBAN validations for ING specific and standard IBAN validation
 */

'use strict';
angular.module('ingGlobal').factory('ibanService', ['expressions','utilsService', function (expressions, utilsService) {

    /**
     * Validate if the input is a valid ING Iban
     * @param iban The entered Iban
     * @returns {boolean} true if the inserted Iban is a valid ING Iban, otherwise false
     */
    function isValidIngIban(iban) {
        if(utilsService.isEmpty(iban)) {
            throw new Error('Iban cannot be empty');
        }
        iban = stripSeperatorsAndConvertToUppercase(iban);
        return expressions.validIngIban.test(iban) && isValidIban(iban);
    }

    /**
     * Validate if the input is a valid Dutch Iban account
     * @param iban The entered Dutch Iban
     * @returns {boolean} true if the inserted Iban is a valid Dutch Iban, otherwise false
     */
    function isValidDutchIban(iban) {
        if(utilsService.isEmpty(iban)) {
            throw new Error('Iban cannot be empty');
        }
        iban = stripSeperatorsAndConvertToUppercase(iban);
        return expressions.validDutchIban.test(iban) && isValidIban(iban);
    }

    /**
     * Validate if the input is a valid Iban account
     * @param iban The entered Iban
     * @returns {boolean} true if the inserted Iban is a valid Iban, otherwise false
     */
    function isValidIban(iban) {
        if(utilsService.isEmpty(iban)) {
            throw new Error('Iban cannot be empty');
        }
        //Step 1 validate the structure
        iban = stripSeperatorsAndConvertToUppercase(iban);
        var valid = expressions.validIbanInput.test(iban);
        if (valid) {
            //Step 2 Move the first 4 characters to the end
            var ibanInput = iban.slice(4) + iban.slice(0, 4);
            //Step 3 Replace every character by twee digits, e.g. A = 10, B = 11, ..., Z = 35
            var convertedIbanInput = '';
            for (var i = 0; i < ibanInput.length; i++) {
                var character = ibanInput.charAt(i);
                //Validate is the character is a letter character
                if (!angular.equals(character.toUpperCase(), character.toLowerCase())) {
                    var digits = expressions.alphabet.indexOf(character) + 10;
                    convertedIbanInput = convertedIbanInput.concat(digits);
                } else {
                    convertedIbanInput = convertedIbanInput.concat(character);
                }
            }
            //Step 4 Calculate the result of the ibanInput % 97 is 1
            //We use a while loop because the convertedIbanInput is otherwise too large
            while (convertedIbanInput.length > 2) {
                var block = convertedIbanInput.slice(0, 9);
                convertedIbanInput = parseInt(block, 10) % 97 + convertedIbanInput.slice(block.length);
            }
            var result = (convertedIbanInput % 97);
            valid = angular.equals(result, 1);
        }
        return valid;
    }

    /**
     * Strip the characters which needs to be ignored
     * and convert the lowercase characters to uppercase
     * @param iban the iban
     * @returns {*} a stripped and uppercased iban
     */
    function stripSeperatorsAndConvertToUppercase(iban) {
        return angular.uppercase(iban.replace(/\s|\.|,|\-/g,''));
    }

    return {
        isValidIngIban: isValidIngIban,
        isValidDutchIban: isValidDutchIban,
        isValidIban: isValidIban
    };
}]);
'use strict';

/**
 * @ngdoc service
 * @name sp.binding.spKeyBinderConfig
 *
 * @description
 * Service that provides the default options for the spKeyBinder. It also allows you to override
 * the defaults.

 */
angular.module('ingGlobal').provider('ingKeyBinderConfig',function () {
    /**
     * @ngdoc service
     * @name sp.binding.spKeyBinderConfigProvider
     *
     * @description
     * Provider that allows you to override default options.
     */
    this.defaultOptions = {
        'type': 'keyup'
    };

    this.specialKeys = {
        'mousedown': 1,
        'backspace': 8,
        'tab': 9,
        'enter': 13,
        'break': 19,
        'capslock': 20,
        'escape': 27,
        'space': 32,
        'pageup': 33,
        'pagedown': 34,
        'end': 35,
        'home': 36,
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        'insert': 45,
        'delete': 46,
        'numlock': 144,
        'scroll': 145,
        'f1': 112,
        'f2': 113,
        'f3': 114,
        'f4': 115,
        'f5': 116,
        'f6': 117,
        'f7': 118,
        'f8': 119,
        'f9': 120,
        'f10': 121,
        'f11': 122,
        'f12': 123
    };
    /**
     * @ngdoc method
     * @name sp.binding.spKeyBinderConfigProvider#setDefaultTarget
     * @methodOf sp.binding.spKeyBinderConfigProvider
     *
     * @description
     * Override the default target to which the spKeyBinder will register the events.
     * @param {String} target The target.
     */
    this.setDefaultTarget = function (target) {
        this.defaultOptions.target = target;
    };
    /**
     * @ngdoc method
     * @name sp.binding.spKeyBinderConfigProvider#setDefaultType
     * @methodOf sp.binding.spKeyBinderConfigProvider
     *
     * @description
     * Override the default type to which the event will be bound.
     * @param {String} type The type
     */
    this.setDefaultType = function (type) {
        this.defaultOptions.type = type;
    }

    this.$get = ['$document', function ($document) {
        var defaultOptions = this.defaultOptions;
        var specialKeys = this.specialKeys;
        if (angular.isUndefined(defaultOptions.target)) {
            defaultOptions.target = $document; // set the default target to $document.
        }
        return {
            /**
             * @ngdoc method
             * @name sp.binding.spKeyBinderConfig#defaultOptions
             * @methodOf sp.binding.spKeyBinderConfig
             *
             * @description
             * Gets the spKeyBinder default options
             * @returns {Object} defaultOptions The default options
             */
            defaultOptions: function () {
                return defaultOptions;
            },
            /**
             * @ngdoc method
             * @name sp.binding.spKeyBinderConfig#specialKeys
             * @methodOf sp.binding.spKeyBinderConfig
             *
             * @description
             * Gets the spKeyBinder special keys
             * @returns {Object} specialKeys The special keys
             */
            specialKeys: function () {
                return specialKeys;
            }
        }
    }];
})
'use strict';

/**
 * @ngdoc service
 * @name sp.binding.spKeyBinder
 * @requires sp.binding.ingKeyBinderConfig
 *
 * @description
 * The `spKeyBinder` service is a utility Spectingular service that facilitates the binding and unbinding
 * of events to dom element. It makes it possible to bind multiple key combinations to an event and on multiple
 * elements.
 *
 * # General usage
 * The bind and unbind functions of the `spKeyBinder` service have one mandatory argument — the key combination - and one
 * optional argument - a configuration object —.
 * The `spKeyBinder` service is provided with default options from the `ingKeyBinderConfig` provider.
 * By default the event type is `keydown`.
 *
 * ####*Bind the key combination using the  default options.*
 * ```js
 *   spKeyBinder.bind('ctrl+shift+x);
 * ```
 * ####*Bind the key combination using the default targe option and the overriden type.*
 * ```js
 *   spKeyBinder.bind('ctrl+shift+x, {type: 'keyup'});
 * ```
 * ####*Bind the key combination using the overriden type and target.*
 * ```js
 *   spKeyBinder.bind('ctrl+shift+x, {target: 'x', type: 'keyup'});
 * ```
 *
 * @example
 <example module="spKeyBinderExample">
 <file name="index.html">
 <div ng-controller="ctrl">
 <span>Pressing the escape key should trigger a broadcast event</span><br />
 <input type="text" id="x" placeholder="key combination ctrl+shift+x should trigger a broadcast event"/><br />
 <div id="y">Clicking here should trigger a broadcast event</div><br /><br />
 <h1>events</h1>
 <ul>
 <li ng-repeat="event in model.events track by $index">{{event}}</li>
 </ul>
 </div>
 </file>

 <file name="scripts.js">
 angular.module("spKeyBinderExample", ['sp.binding']).
 controller('ctrl', function($scope, spKeyBinder) {
             spKeyBinder.bind('escape');
             spKeyBinder.bind('ctrl+shift+x', {
                target: 'x',
                type: 'keydown'
             });
             spKeyBinder.bind(undefined, {
                target: 'y',
                type: 'click'
             });

             $scope.model = {events: []};
             $scope.$on('keydown-escape', function(event) {
                $scope.model.events.push('keydown-escape');
                $scope.$apply();
             });
             $scope.$on('keydown-ctrl+shift+x', function(event) {
                $scope.model.events.push('keydown-ctrl+shift+x');
                $scope.$apply();
             });
             $scope.$on('click', function(event) {
                $scope.model.events.push('click');
                $scope.$apply();
             });
          });
 </file>
 </example>
 */
angular.module('ingGlobal').factory('ingKeyBinder', ['$rootScope', '$document', 'ingKeyBinderConfig', function ($rootScope, $document, ingKeyBinderConfig) {
    var handlers = {};

    /**
     * Execute the callback with the correct information.
     * @param keyCombination The key combination to which the event will be bound.
     * @param options The options that need to be merged with the default options.
     * @param callback The callback function.
     */
    function execute(keyCombination, options, callback) {
        options = angular.extend({}, ingKeyBinderConfig.defaultOptions(), options); // extend the options
        var element = angular.isString(options.target) ? angular.element(document.querySelector('#' + options.target)) : options.target;


        // check if a key combination was specified.
        if (angular.isUndefined(keyCombination)) {
            keyCombination = 'mousedown';
        }
        callback(keyCombination, options, element);
    }

    /**
     * @ngdoc method
     * @name sp.binding.spKeyBinder#bind
     * @methodOf sp.binding.spKeyBinder
     * @description Bind the event to the given target for the given key combination.
     * @param {string} keyCombination The key combination.
     * @param {Object=} options The options.
     */
    function bind(keyCombination, callback, options) {
        execute(keyCombination, options, function (keyCombination, options, element) {
            var target = options.target === $document ? 'document' : options.target;
            var bind = false;
            // check for type
            if (angular.isUndefined(handlers[options.type])) { // no handler for the given type has been registered yet
                handlers[options.type] = {
                    count: 0 // total number of bind registrations
                };
                handlers[options.type].elements = {};
            }

            // check for element
            if (angular.isUndefined(handlers[options.type].elements[target])) {
                bind = true;
                handlers[options.type].elements[target] = {
                    count: 0,
                    keyCombinations: {}
                };
            }

            // check for key combination
            if (angular.isUndefined(handlers[options.type].elements[target].keyCombinations[keyCombination])) {
                handlers[options.type].count++;
                handlers[options.type].elements[target].keyCombinations[keyCombination] = {}
                handlers[options.type].elements[target].count++;
                handlers[options.type].elements[target].keyCombinations[keyCombination].count = 1;
            } else {
                handlers[options.type].count++;
                handlers[options.type].elements[target].count++;
                handlers[options.type].elements[target].keyCombinations[keyCombination].count++;

            }
            handlers[options.type].elements[target].keyCombinations[keyCombination].callback = callback;

            if (bind) {
                element.on(options.type, function (event) { // do the actual binding
                    var origin = angular.isDefined(event.delegateTarget.id) ? event.delegateTarget.id : 'document';
                    var keyCombinations = handlers[options.type].elements[origin].keyCombinations;

                    for (var kc in keyCombinations) {
                        var keys = kc.split('+');
                        // check the pressed modifiers
                        var modifiers = {
                            shift: keys.indexOf('shift') > -1,
                            ctrl: keys.indexOf('ctrl') > -1,
                            alt: keys.indexOf('alt') > -1
                        };

                        // remove modifiers
                        if( keys.indexOf('shift') > -1) {
                            keys.splice(keys.indexOf('shift'), 1)
                        }

                        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : undefined;
                        var character = String.fromCharCode(keyCode).toLowerCase();
                        var specialKey = keys.length === 1 ? ingKeyBinderConfig.specialKeys()[keys] : undefined;

                        // broadcast the event if the key combination matches
                        if ((modifiers.shift === (event.shiftKey ? true : false)) && // do we require shift and is it pressed?
                            (modifiers.ctrl === (event.ctrlKey ? true : false)) && // do we require ctrl and is it pressed?
                            (modifiers.alt === (event.altKey ? true : false)) && // do we require alt and is it pressed?
                            (
                                keys.indexOf(character) > -1 || // does the character match
                                (angular.isDefined(specialKey) && specialKey === keyCode)) // or does it match a special key
                            ) {
                            var eventName = event.type;
                            // if we have a defined a key combination append it to the event name.
                            if (keyCode !== 1) {
                                eventName = eventName + '-' + kc;
                            }
                            if(angular.isDefined(handlers[options.type].elements[target].keyCombinations[kc].callback)) {
                                handlers[options.type].elements[target].keyCombinations[kc].callback();
                            } else {
                                $rootScope.$broadcast(eventName);
                            }

                        }
                    }
                });
            }
        });
    }

    /**
     * @ngdoc method
     * @name sp.binding.spKeyBinder#unbind
     * @methodOf sp.binding.spKeyBinder
     * @description Unbind the event to the given target for the given key combination.
     * @param {string} keyCombination The key combination.
     * @param {Object=} options The options.
     */
    function unbind(keyCombination, options) {
        execute(keyCombination, options, function (keyCombination, options, element) {
            var target = options.target === $document ? 'document' : options.target;

            if (angular.isDefined(handlers[options.type]) &&
                angular.isDefined(handlers[options.type].elements[target]) &&
                angular.isDefined(handlers[options.type].elements[target].keyCombinations[keyCombination])) {

                handlers[options.type].elements[target].keyCombinations[keyCombination].count--;
                handlers[options.type].elements[target].count--;
                handlers[options.type].count--;

                if (handlers[options.type].elements[target].keyCombinations[keyCombination].count === 0) {
                    delete handlers[options.type].elements[target].keyCombinations[keyCombination].count;
                }
                if (handlers[options.type].elements[target].count === 0) {
                    delete handlers[options.type].elements[target];
                    element.off(options.type);
                }
                if (handlers[options.type].count === 0) {
                    delete  handlers[options.type];
                }
            }
        });
    }

    return {
        handlers: handlers,
        bind: bind,
        unbind: unbind
    };
}]);
'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.loadingQueue
 * @description
 * This service should be used in combination with the ingTabLoading directive. Inject this service in your controller
 * and add $resource result to the loadingQueue. The ingTabLoading directive will automatically toggle the loading view
 * based on resolved promises in the loadingqueue.
 *
 * It is possible to add a single $resource result to the loadingqueue, but it also supports an array with promises
 * or multiple calls to loadingQueue.add() with the same id.
 *
 * @example
 <example>
 <file name="myController.js">
 angular.module('example').controller('myController', function($scope, myService, loadingQueue) {
    $scope.result = myService.query();

    loadingQueue.add('myIdentifierForThisQuery', $scope.result);
 });
 </file>

 <file name="myController.js">
 * @example
 angular.module('example').controller('myController', function($scope, myService1, myService2, loadingQueue) {
    $scope.result1 = myService1.query();
    $scope.result2 = myService2.query();

    loadingQueue.add('myIdentifierForThisQuery', [$scope.result1, $scope.result2]);
 });
 </file>

 <file name="myController.js">
 * @example
 angular.module('example').controller('myController', function($scope, myService1, myService2, loadingQueue) {
    $scope.result1 = myService1.query();
    $scope.result2 = myService2.query();

    loadingQueue.add('myIdentifierForThisQuery', $scope.result1);
    loadingQueue.add('myIdentifierForThisQuery', $scope.result2);
 });
 </file>
 </example>
 */
angular.module('ingGlobal').factory('loadingQueue', ['$filter', function ($filter) {

    var queue = {};

    return {
        /**
         * Add an item to the loading queue.
         * @param id The id that should match the id that is used in the HTML file.
         * @param promise The promise that is returned by the $resource object. This could be a single promise or an array with promises.
         */
        add: function (id, promise) {
            if (angular.isUndefined(queue[id])) {
                // When the item doesn't exist in the queue, then we create it with an array where we can add promises to.
                queue[id] = [];
            }

            if (angular.isArray(promise)) {
                // The promise variable is an array, so we add each single promise to the queue.
                for (var index = 0; index < promise.length; index++) {
                    queue[id].push(promise[index]);
                }
            } else {
                // Add the single promise to the queue.
                queue[id].push(promise);
            }
        },
        /**
         * Get the promise(s) from the queue by id.
         * @param id The id that is used to add one or more promises to the queue.
         * @returns {*} The matched promises.
         */
        getPromiseFromQueue: function (id) {
            return queue[id];
        },
        /**
         * Returns a boolean which is true when all promises for the given id are resolved.
         * @param id The id that is used to add one or more promises to the queue.
         * @returns {boolean} True if all promises are resolved.l
         */
        isReady: function (id) {
            var queueWithPromises = this.getPromiseFromQueue(id) || [];

            var unResolvedPromises = $filter('filter')(queueWithPromises, {$resolved: false});

            return angular.equals(unResolvedPromises.length, 0);
        }
    };

}]);
'use strict';

angular.module('ingGlobal').service('modalService', function () {

    var modalStack = [];

    return {
        /**
         * Pushes an item onto the top of this stack.
         * @param modalId The unique id of the modal.
         */
        pushModalInStack: function (modalId) {
            modalStack.push(modalId);
        },

        /**
         * Removes the object at the top of this modal stack.
         */
        popLastModalFromStack: function () {
            modalStack.splice(modalStack.length - 1, 1);
        },

        /**
         * Looks at the object at the top of the modal stack without removing it from the stack.
         */
        peekForActiveModalFromStack: function () {
            return modalStack[modalStack.length - 1]
        }
    }
});
    'use strict';

/*
    broadcasts 'window-resize' event from rootscope:
    arguments:
        actual document width,
        object with mediaQuery name and the associated width

    Provider API (in module.config):
        setFixedMq: set a fixed media query to always return, regardless of window size, or false to disable.

    API:
        getMqState: return the last known document width and mediaquery as an object
        getBreakPoint: get the width associated with a mediaQuery
        setFixedMq: set a fixed media query to always return, regardless of window size, or false to disable.

*/

angular.module('ingGlobal').
    provider('mqService', function MqServiceProvider() {
        var fixedMq = false,
            mqSizes = {
                zero: 0,
                xs: 480,
                sm: 680,
                md: 768,
                lg: 992,
                xl: 1200
            };

        function setFixedMq(mq) {
            if (false === mq || 'undefined' !== typeof(mqSizes[mq])) {
                fixedMq = mq;
            }
        }
        this.setFixedMq = setFixedMq;

        var currentMq;

        this.$get = ['$window', '$document', '$rootScope', '$timeout', 'viewportSize', function getMqService($window, $document, $rootScope, $timeout, viewportSize) {
                var mediaQuery,
                innerWidth;
            var setMqSize = function () {
                innerWidth = getInnerViewport().width;
                if (fixedMq) {
                    mediaQuery = {name: fixedMq, width: mqSizes[fixedMq]};
                } else {
                    for (var query in mqSizes) {
                        if (mqSizes.hasOwnProperty(query)) {
                            if (innerWidth >= mqSizes[query]) {
                                mediaQuery = {name: query, width: mqSizes[query]};
                            }
                        }
                    }
                }
                // broadcast only on mq change
                if(currentMq !== mediaQuery.name) {
                    $rootScope.$broadcast('mq-changed',mediaQuery);
                    currentMq = mediaQuery.name;
                }
                $rootScope.$broadcast('window-resize', innerWidth, mediaQuery);
            };

            var getInnerViewport = function() {
                return {
                    width: viewportSize.getWidth(),
                    height: viewportSize.getHeight()
                };
            };

            angular.element($window).on('resize', function () {
                setMqSize();

            });

            // init phase, will only be called once
            $timeout(function () {
                setMqSize();
            });

            return {
                getBreakPoint: function(mqName){
                    return mqSizes[mqName];
                },
                getMqState: function() {
                    return {
                        mq: mediaQuery,
                        documentWidth: innerWidth
                    }
                },
                setFixedMq: function(mq) {
                    setFixedMq(mq);
                    setMqSize();
                },
                mqSizes : mqSizes

            };
        }];
    });


'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.provider:propertyService
 *
 * @description
 * This provider contains all the properties of the modules that are included in the application.
 * The propertyService holds per module all the properties and provides the ability to override them.
 *
 * @example
 * @example
 <example module="exampleApp">
 <file name="index.html">
 <div ng-controller="exampleCtrl">
 <ul>
 <li ng-repeat="(key, value) in properties">key [{{key}}] - value [{{value}}]</li>
 </ul>
 </div>
 </file>
 <file name="scripts.js">

 var exampleApp = angular.module("exampleApp", ['ingGlobal']);
 exampleApp.config(function(propertyServiceProvider){
    propertyServiceProvider.add('exampleApp', {'firstName': 'What is your first name?', 'lastName': 'What is your last name?'});
});

 exampleApp.controller('exampleCtrl', function($scope, propertyService) {
    $scope.properties = propertyService.properties('exampleApp');
});
 </file>
 </example>
 **/
angular.module('ingGlobal').provider('propertyService', function () {
    this.properties = {};

    // Utillity method that replaces placeholders in a message with given variables.
    // Variable substution based on MessageFormat standard (see  http://www.userguide-icu-project.org/formatparse/messages).
    // So when message = "Name {0} is {1}", {0} will be replaced by the first element in array, {1} with the second.
    function replaceVariables(message, variables){
        angular.forEach(variables, function (variable, index) {
            message = message.split('{'+index+'}').join(variables[index]); //cheaper and clearer then regEx.
        });

        return message;
    }

    this.$get = function () {
        var properties = this.properties;
        return {
            property: function (module, key) {
                return properties[module][key];
            },
            properties: function (module) {
                return properties[module];
            },
            replaceVariables: replaceVariables
        }
    };

    this.add = function (module, objects) {
        var properties = this.properties;
        angular.forEach(objects, function (value, key) {
            if (properties[module] === undefined) {
                properties[module] = {};
            }
            properties[module][key] = value;
        });
    };


});

'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.factory:safeApply
 *
 * @description
 * This factory checks whether if the `$scope` is already in an `$apply` or `$digest` phase.
 * If not, only then it safely runs `$apply`. Use this method instead of `$scope.$apply()`
 * if you're unsure which phase the `$scope` is in.
 **/
angular.module('ingGlobal').run(['$rootScope', function ($rootScope) {
    $rootScope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
}]);
/* global angular, jQuery */

'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.scrollService
 *
 * @description
 * The scrollService provides the `scrollTo` method that allows you to scroll the viewport to:
 *  * an element on the page
 *  * a certain distance (in pixels) from the bottom
 *
 * It also allows for the scroll to happen after a delay.
 *
 * @example
 <example module="ingGlobal">
 <file name="index.html">
 <div ng-controller="Ctrl">
 <input type="button" class="btn" value="Scroll to paragraph 2 after half a second" id="scrollp2" ng-click="scrollP2()" />
 <input type="button" class="btn" value="Scroll almost to the bottom of the page" id="scrolldown" ng-click="scrollDown()" />
 <p class="l-h-25" id="p1">This is paragraph number 1.</p>
 <p class="l-h-25" id="p2">This is paragraph number 2.</p>
 <p class="l-h-25" id="p3">This is paragraph number 3.</p>
 <p class="l-h-25" id="p4">This is paragraph number 4.</p>
 <p class="l-h-25" id="p5">This is paragraph number 5.</p>
 </div>
 </file>
 <file name="controller.js">
 function Ctrl($scope, scrollService) {
    $scope.scrollP2 = function(){
        scrollService.scrollTo('p2', {delay: 500});
    };
    $scope.scrollDown = function(){
        scrollService.scrollTo(200);
    };
 }
 </file>
 </example>
 **/
angular.module('ingGlobal')
.factory('scrollService', ['viewportSize', function (viewportSize) {
    /**
     * @ngdoc method
     * @name  scrollTo
     * @methodOf ingGlobal.scrollService
     * @description
     * Perform the actual scrolling.
     *
     * @param {string|number} target               If a string, the ID of the element to scroll to. If a number, the number of pixels from the bottom to scroll to.
     * @param {Object=}       [options={delay: 0}] A configuration object with (at the moment) one supported parameter: `delay`, to specify the number of miliseconds to wait before scrolling.
     **/
    var scrollTo = function(target, options){
        options = options || {};
        options.delay = options.delay || 0;
        
        // target can have two values:
        //  - if a string: the id of a DOM element to scroll to
        //  - if a number: the number of pixels from the bottom to scroll to
        if(typeof(target) === 'string'){
            target = jQuery('#' + target).offset().top;
        } else {
            if(typeof(target) !== 'number'){
                // When neither a string nor a number has been passed, we
                // cannot know where to scroll to.
                return;
            }
            
            target = jQuery('body').height() - viewportSize.getHeight() - target;
        }
        
        // html for Firefox and IE, body for Chrome
        jQuery('html, body').delay(options.delay).animate({scrollTop: target}, 'slow');
    };

    return { scrollTo: scrollTo };
}]);

'use strict';

/**
 * @ngdoc service
 * @name ingGlobal.provider:tagManagementService
 *
 * @description
 * This service contains the interface to the Tag Management Service
 *
 **/
angular.module('ingGlobal').factory('tagManagementService', ['$window', function ($window) {
        var digitalData = {
            component: []
        };
        var objectReady = false;
        var sections = [];

        /**
         * Section object for wrapper components into a section
         * @param id
         * @constructor
         */
        function Section(id) {
            this.id = id;
            this.components = [];

            /**
             * add component to section
             * @param id
             */
            this.addComponent = function (id) {
                if (angular.isUndefined(id)) {
                    id = 'tag-management-' + this.id + '-' + (this.components.length + 1);
                }
                var component = new Component(id);
                this.components.push(component);

                this.updateSectionInfo();
                return component;
            };
            /**
             * update the section data, like totalNumberOfSections and totalPositions
             */
            this.updateSectionInfo = function () {
                angular.forEach(sections, function (section) {
                    var componentsCnt = section.components.length;
                    angular.forEach(section.components, function (component, idx) {
                        component.sectionID = section.id;
                        component.totalSections = sections.length;
                        component.componentPosition = idx;
                        component.totalPositions = componentsCnt;
                    })
                })
            };
        }

        /**
         * component object wich represents a part of the page which is tracked. This usually is
         * a angular application.
         * @param id
         * @constructor
         */
        function Component(id) {
            this.event = [];
            this.componentID = id;

            this.addEvent = function (name, action, type) {
                this.event.push({
                    eventInfo: {
                        eventName: name,
                        eventAction: action,
                        timeStamp: new Date(),
                        type: type
                    }
                });
            }
        }

        var service = {
            /**
             * Initializes the service by linking it to the $window.digitalData object.
             * @throws Error if the $window.digitalData does not exist.
             */
            init: function() {
                if  (angular.isUndefined($window.digitalData)) {
                    throw new Error('digitalData object is undefined!, please add this to the window object before calling init().');
                }
                digitalData = $window.digitalData = angular.extend(digitalData, $window.digitalData);
                service.mergeSections();
            },

            /**
             * returns the digitalData object
             * @returns {Window.digitalData}
             */
            getObject: function() {
                return digitalData;
            },
            /**
             *
             * @param id
             * @returns Component
             */
            registerComponent: function (id) {
                if (angular.isUndefined(id)) {
                    throw new Error('id is required!');
                }
                var component = new Component(id);
                digitalData.component.push({componentInfo: component});
                return component;
            },

            /**
             * merge the private section array with the digitalDataObject. This will add the components within
             * the sections to the components array of the digitalDataObject
             */
            mergeSections: function () {
                angular.forEach(sections, function (section) {
                    angular.forEach(section.components, function (component) {
                        var exists = false;
                        angular.forEach(digitalData.component, function (item) {
                            if (!exists) {
                                exists = angular.equals(item.componentInfo.componentID, component.componentID);
                            }
                        });
                        if (!exists) {
                            digitalData.component.push({componentInfo: component});
                        }
                    })
                })
            },

            /**
             * add a event to the pageInfo
             * @param name
             * @param action
             * @param type
             */
            addEvent: function (name, action, type) {
                if (angular.isUndefined(digitalData.event)) {
                    digitalData.event = [];
                }
                digitalData.event.push({
                    eventInfo: {
                        eventName: name,
                        eventAction: action,
                        timeStamp: new Date(),
                        type: type
                    }
                });
            },
            /**
             * Register a section to the private array. Components can be added so they are grouped together.
             * @param id
             * @returns {Section}
             */
            registerSection: function (id) {
                if (angular.isUndefined(id)) {
                    id = sections.length;
                }
                var section = new Section(id);
                sections.push(section);
                return section;
            },

            /**
             * adds a objectReady event, (only when objectReady is not already set)
             */
            objectReady: function () {
                if (!objectReady) {
                    objectReady = true;
                    service.addEvent('Object ready', 'ready', 'digitalDataObject');
                }
            },

            /**
             * add a objectChanges event
             */
            objectChanged: function () {
                service.addEvent('Object changed', 'changed', 'digitalDataObject');
            },

            /**
             * determine if objectReady event has taken place
             * @returns {boolean}
             */
            isReady: function () {
                return objectReady;
            }
        };
        return service;
    }
]);

'use strict';

/**
 * @ngdoc function
 * @name ingGlobal.service:utilsService
 *
 * @description
 * This service contains utility functions
 *
 * @example
 <example module="exampleApp">
 <file name="index.html">
 <div ng-controller="exampleCtrl">
    <div>Random number: <span ng-bind="randomNumber"/></div>
    <div ng-if="isOldNativeAndroid">This is an old native Android browser</div>
 </div>
 </file>
 <file name="scripts.js">
 var exampleApp = angular.module("exampleApp", ['ingGlobal']);

 exampleApp.controller('exampleCtrl', function($scope, utilsService) {
    var emptyValue = '';
    $scope.isEmpty = utilsService.isEmpty(emptyValue);
    $scope.isOldNativeAndroid = utilsService.isOldAndroidBrowser();
    $scope.randomNumber = utilsService.createRandomId();

 });
 </file>
 </example>
 **/

/*global jQuery*/
angular.module('ingGlobal').service('utilsService', ['expressions', '$window', function (expressions, $window) {

    // General Util Functions
    var fn = {};

    fn.isEmpty = function (value) {
        return typeof value === 'undefined' || value === '' || value === null || value !== value;
    };

    fn.parseAmount = function (value) {
        if (typeof value === 'string') {
            return parseFloat(value
                .removeSpaces()
                .replace(expressions.containsDot, '')
                .replace(expressions.containsComma, '.') +
                '');
        }
        return value;
    };

    /**
     * Creates a random identifier (integer consisting of 5 characters).
     * @returns {number}
     */
    fn.createRandomId = function () {
        return Math.floor((Math.random() * 100000) + 1);
    };


    /**
     * Chunk an array into an array of arrays of length |len|
     * @param arr
     * @param len
     * @returns {{Array}} array of arrays.
     */
    fn.chunk = function(arr, len) {
        var chunks = [],
            i = 0,
            n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }

        return chunks;
    };


    /** Viewport. */

    /**
     * Constructs viewport object, indicating for each direction(top, left, right, bottom) where it's located
     * relative to the document.
     * @returns {object}
     */
    fn.getViewportRelativeToDocument = function () {
        var viewport = {
            top: angular.element(document).scrollTop(),
            left: angular.element(document).scrollLeft(),
            right: angular.element(document).scrollLeft() + fn.getViewportWidth(),
            bottom: angular.element(document).scrollTop() + fn.getViewportHeight()
        };
        return viewport;
    };

    /**
     * Gets the viewport height.
     * @returns {number}
     */
    fn.getViewportHeight = function () {
        return document.compatMode === 'CSS1Compat' ? jQuery(window).height() : window.document.body.clientHeight;
    };

    /**
     * Gets the viewport width.
     * @returns {number}
     */
    fn.getViewportWidth = function () {
        return document.compatMode === 'CSS1Compat' ? jQuery(window).width() : window.document.body.clientWidth;
    };

    /**
     * Constructs space Object (for a certain DOM element) with booleans indicating for each direction whether space available in viewport
     * @param {element} displayElem DOM element that needs to be measured against viewport dimensions
     * @param {element} relativeElem DOM element that displayElem needs to be positioned relative to
     * @returns {object}
     */
    fn.getSpaceInViewport = function (displayElem, relativeElem) {
        var viewport = fn.getViewportRelativeToDocument();

        // Wrap elements inside jQuery Object
        displayElem = angular.element(displayElem);
        relativeElem = angular.element(relativeElem);

        var space = {
            top: (viewport.top + displayElem.height()) <= relativeElem.offset().top,
            left: (viewport.left + displayElem.width()) <= relativeElem.offset().left,
            right: (viewport.right - displayElem.width()) >= (relativeElem.offset().left + relativeElem.width()),
            bottom: (viewport.bottom - displayElem.height()) >= (relativeElem.offset().top + relativeElem.height())
        };

        return space;
    };

    /**
     * Indicates if nospace in viewport left.
     * @param {object} space Object (for a certain DOM element) with booleans indicating for each direction whether space is available in viewport
     * @returns {boolean} True if no space at all in viewport
     */
    fn.isNoSpaceInViewport = function (space) {
        return (space.top === false && space.left === false && space.right === false && space.bottom === false);
    };

    /**
     * Indicates if there is space left in all directions of the viewport.
     * @param {object} space Object (for a certain DOM element) with booleans indicating for each direction whether space is available in viewport
     * @returns {boolean} True if space in all directions
     */
    fn.isSpaceInViewportAllDirections = function (space) {
        return (space.top === true && space.left === true && space.right === true && space.bottom === true);
    };

    /** Indicates if the browser is the old stock Android Browser.
     * This old stock Android browser was replaced by Chrome in Android 4.4.
     * The old stock Android browser has some bugs. With this function you can detect this browser.
     * Some of the bugs are:
     * - css overflow-y prevents a normal click behaviour on <label>.
     * - animation of css visibility property does not properly work
     *
     * @returns {boolean} True if browser is old stock Android Browser
     */
     fn.isOldAndroidBrowser = function (){
         /* A full list of all old Android webkit useragents can be found here:
          * http://myip.ms/browse/comp_browseragents/1/browserID/871/browserID_A/1
          *
          * The Android user agent contains the words Android and AppleWebKit with a version number directly after AppleWebKit.
          * When this version number is <537 we have the old Android browser.
          * When the Chrome browser is used, the version will be >=537.
          * See also: http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser
          */

        // Get a part of the userAgent that contains both Android and AppleWebkit/AppleWebKit and also return version number of AppleWebKit
        var androidUserAgentPlusWebkitVersion = $window.navigator.userAgent.match(/Android.*AppleWeb[Kk]?it\/([\d.]+).*/);
        return (angular.isDefined(androidUserAgentPlusWebkitVersion) && androidUserAgentPlusWebkitVersion!==null && androidUserAgentPlusWebkitVersion[1]<537);
    };


    fn.addValidator = function (ngModelController, validator) {
        ngModelController.$parsers.push(function() {
            var value = ngModelController.$viewValue;
            return validator(value) ? value : undefined;
        });

        ngModelController.$formatters.push(function(value) {
            validator(ngModelController.$modelValue);
            return value;
        });
    };

    /** Indicates if the browser has CORS support for authentication
     * IE9 e.g. has limited CORS support, and does not pass this test. More information below
     * http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
     *
     * @returns {boolean} True if browser supports CORS with authentication
     */

    fn.isCorsAuthCapable =  function () {
        return ('withCredentials' in new XMLHttpRequest());
    };


    /**
     * This is how Angular internally detects IE
     * @returns {int||boolean} the IE version or false if not an IE browser
     */

    fn.getIEVersion = function() {
        var msie = parseInt((/msie (\d+)/.exec($window.navigator.userAgent.toLowerCase()) || [])[1], 10);

        if(isNaN(msie)) {
            msie = parseInt((/trident\/.*; rv:(\d+)/.exec($window.navigator.userAgent.toLowerCase()) || [])[1], 10);
        }

        return msie ? msie : false;
    };


    /* Return function object */
    return fn;
}]);

'use strict';

/* The version service.*/
angular.module('ingGlobal').factory('globalVersion', function () {
    return {
        version: '1.0.0-SNAPSHOT'
    };
});
'use strict';


/**
 * @ngdoc service
 * @name ingGlobal.factory:viewportSize
 * @requires $window
 * @requires $document
 *
 * @description
 * Based on viewportSize by Tyson Matanich - https://github.com/tysonmatanich/viewportSize
 *
 * Calculates the width and height of the viewport. Used in mqService.
 *
 * Licensed under the MIT license
 **/

angular.module('ingGlobal').factory('viewportSize', ['$window', '$document', function($window, $document) {
    var document = $document[0],
        documentElement = document.documentElement,
        getSize,
        getWindowSize = function(dimension) {
            return $window['inner' + dimension];
        },
        getDocumentSize = function(dimension) {
            return document.documentElement['client' + dimension];
        },
        getViewportSize = function (Name) {
            if (!getSize) {
                var name = Name.toLowerCase();
                if ($window['inner' + Name] === undefined) {
                    // IE6 & IE7 don't have window.innerWidth or innerHeight
                    getSize = getDocumentSize;
                }
                else if (String($window['inner' + Name]) !== String(documentElement['client' + Name])) {
                    // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

                    // Insert markup to test if a media query will match document.doumentElement["client" + Name]
                    var bodyElement = document.createElement('body');
                    bodyElement.id = 'vpw-test-b';
                    bodyElement.style.cssText = 'overflow:scroll';
                    var divElement = document.createElement('div');
                    divElement.id = 'vpw-test-d';
                    divElement.style.cssText = 'position:absolute;top:-1000px';
                    // Getting specific on the CSS selector so it won't get overridden easily
                    divElement.innerHTML = '<style>@media(' + name + ':' + documentElement['client' + Name] + 'px){body#vpw-test-b div#vpw-test-d{' + name + ':7px!important}}</style>';
                    bodyElement.appendChild(divElement);
                    documentElement.insertBefore(bodyElement, document.head);

                    if (String(divElement['offset' + Name]) === '7') {
                        // Media query matches document.documentElement["client" + Name]
                        getSize = getDocumentSize;
                    }
                    else {
                        // Media query didn't match, use window["inner" + Name]
                        getSize = getWindowSize;
                    }
                    // Cleanup
                    documentElement.removeChild(bodyElement);
                }
                else {
                    // Default to use window["inner" + Name]
                    getSize = getWindowSize;
                }
            }

            return getSize(Name);
        };

    return {
        getHeight: function () {
            return getViewportSize('Height');
        },

        getWidth: function () {
            return getViewportSize('Width');
        }
    };
}]);


