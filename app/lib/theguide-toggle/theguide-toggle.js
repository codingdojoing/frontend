/**
 * @ngdoc module
 * @name tgToggle
 * @module tgToggle
 */

(function() {

  'use strict';

  angular.module('tgToggle', []);

})();
'use strict';

/*jshint latedef: nofunc */




/**
* ngdoc directive
* @name theguide-toggle.directive:ing-toggle-content
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
* See <a href="#/spectingular/theguide-toggle.directive:ing-toggle">ing-toggle</a>
*
*/

(function(){

angular.module('tgToggle').directive('tgToggleContent', ['$document', '$animate', tgToggleContentDirective]);


function tgToggleContentDirective($document, $animate) {

    return {
        restrict: 'A',
        require: ['^tgToggle', 'tgToggleContent'],
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


            function escapeHandler(e) {
                if((e.keyCode || e.which) === 27) {
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


        if(angular.version.major <= 1 && angular.version.major <= 3) {
            $animate[action](element, hideClass, function() {
                element.removeClass('ng-animate'); // Clean up what ng-animate leaves in some cases
            });
        } else {
            $animate[action](element, hideClass, { tempClasses: 'ng-hide-animate'});
        }

        // Accessibility

        if(!srOnly) {
            element.attr('aria-hidden', hide);
            element.attr('aria-expanded', !hide);
        }

    }


}


angular.module('tgToggle').controller('toggleContentController',[function() {

    this.show = function() {};
    this.hide = function() {};

    /////////////////

}]);


}());
'use strict';

/*jshint latedef: nofunc */

(function(){

angular.module('tgToggle').directive('tgToggleInvoker', [tgToggleInvokerDirective]);


function tgToggleInvokerDirective() {
    return {
        restrict: 'A',
        require: '^tgToggle',
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
'use strict';

/**
* ngdoc directive
* @name tgToggle.directive:tg-toggle
* @restrict A
*
* @description
* This is a purely functional directive that should be placed on an element wrapping child elements with directives tg-toggle-invoker and tg-toggle-content.
* It keeps track of the open state of the dropdown, which can be controlled externally as well.
* It doesn't have knowledge of markup and can be configured to be visually hidden, whilst accessible for screen readers.
*
* @param {boolean} sr-only - default will be false. When true, list is hidden via class sr-only, which will make content visually hidden, but accessible for screen readers. Also appropriate aria values will (or will not be) set.
*
* ## Child directives
* <ul>
*  <li><b>tg-toggle-invoker</b> </li>
*  <li><a href="#/spectingular/theguide-toggle.directive:tg-toggle-content"><b>tg-toggle-content</b> </a></li>
* </ul>
*
* @example
<example module="tgToggle">
    <file name="example.html">
        <div ng-include="'collapsibles.html'"></div>
         <div ng-include="'dropdown.html'"></div>
         <div ng-include="'collapseMenu.html'"></div>
    </file>

<file name="dropdown.html">


<div class="panel panel-shadow-a panel--tg">

     <div class="panel-heading">
         <div class="heading-b-xl">Dropdown</div>
         <p class="l-mb-0">Configuration <kbd>tg-toggle-content</kbd> : <code>overlay="true"</code></p>
     </div>

     <div class="panel-body l-pt-0 l-pb-2">

          <hr>

          <div id="dropdown" tg-toggle>
             <div class="dropdown">
                 <button tg-toggle-invoker class="btn btn-default dropdown-toggle" type="button" id="toggleButton">
                     <span class="position position-right position-xs">
                         <span aria-hidden="true" class="position-component position-component-middle icon dropdown-toggle-icon"></span>
                         Toggle
                     </span>
                 </button>
                 <div tg-toggle-content close-on-esc="true" close-on-click-outside="true" class="animation">
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
        <p class="l-mb-0">Configuration <kbd>tg-toggle-content</kbd> : <code>close-on-esc="true" sr-only="true"</code></p>
    </div>

<div class="panel-body l-pt-0 l-pb-2">
    <hr>

     <nav role="navigation" aria-labelledby="ribbon-heading-small">
          <div class="ribbon ribbon-a ribbon-sm">
              <div class="example-ribbon-container">
                  <div tg-toggle class="dropdown ribbon-dropdown open">

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

                              <div tg-toggle-invoker class="btn btn-transparent ribbon-element ribbon-element-more dropdown-toggle">
                                  <div class="ribbon-element-icon">
                                      <span class="icon icon-more ribbon-element-icon-element" aria-hidden="true"></span>
                                  </div>
                                  <div class="ribbon-element-text">
                                      Meer <span aria-hidden="true" class="icon dropdown-toggle-icon"></span>
                                  </div>
                              </div>

                          </div>

                      </div>

                      <ul tg-toggle-content close-on-esc="true" sr-only="true" class="animation dropdown-menu dropdown-menu-right dropdown-menu-default dropdown-menu-lg ribbon-dropdown-menu ribbon-dropdown-menu-arrow arrow-border arrow-up" role="presentation">
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

     <tr tg-toggle class="collapsible">
         <td tg-toggle-invoker>
             <div>Content 1 heading</div>
             <button  class="btn btn-unstyled collapsible-header" style="left: 5px;">
                 <span class="sr-only">Toon en verberg details transactie voor Content 1</span>
             </button>
             <div tg-toggle-content>
                 <div class="example-dropdown-content">
                     Collapsible content 1
                 </div>
             </div>
         </td>
     </tr>

     <tr tg-toggle class="collapsible">
         <td tg-toggle-invoker>
             <div>Content 2 heading</div>
             <button class="btn btn-unstyled collapsible-header" style="left: 5px;">
                 <span class="sr-only">Toon en verberg details transactie voor Content 2</span>
             </button>
             <div tg-toggle-content>
                 <div class="example-dropdown-content">
                     Collapsible content 2
                 </div>
             </div>
         </td>
     </tr>

     <tr class="collapsible" tg-toggle>
         <td tg-toggle-invoker>
             <div>Content 3 heading</div>
             <button class="btn btn-unstyled collapsible-header" style="left: 5px;">
                 <span class="sr-only">Toon en verberg details transactie voor Content 3</span>
             </button>
             <div tg-toggle-content>
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

angular.module('tgToggle').directive('tgToggle', [tgToggleDirective]);


function tgToggleDirective() {

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



