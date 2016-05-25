// module declaration
angular.module('tgSplitList', ['tgToggle', 'tgUtils', 'ingGlobal']);
'use strict';

angular.module('tgSplitList').directive('tgSplitFocusElement', [ 'ingKeyBinderConfig', function(ingKeyBinderConfig) {
    return {
        restrict: 'A',
        priority: 0,
        require:['^tgSplitList', '?^tgSplitMoreItem', '?^tgSplitItem', 'tgSplitFocusElement', '?^^tgToggle', '?^^tgSplitListB'],
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
                throw new Error('Please define where the tg-split-focus-element is part of (place \'tg-split-item\' or \'tg-split-more-item\' on its parent).');
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

// Allow child elements to register themselves to their containing measurement element (usually a li)
angular.module('tgSplitList').controller('SplitItemController', ['$scope', '$element', 'tgUtils', function($scope, $element, u) {
    var _this = this;

    this.api = {
        hide : function() {
            $element.css('display', 'none');
        },
        show : function() {
            $element.css('display', '');
        },
        getClientWidth: function() {
            return $element[0].clientWidth;
        },
        getOuterWidth: function() {
            return u.outerWidth($element);
        },
        setClientWidth: function(x) {
            $element.css('width', x ? (x + 'px') : '');
        },
        isActiveElement: function() {
            //   //IE gives elements inside anchor focus  // TODO: use tgUtils.collectionHas()
            return ($element[0] === document.activeElement) || $element[0].contains(document.activeElement); //u.collectionHas($element[0], document.activeElement);
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
'use strict';

// Only task of these directives is to register themselves on controller of ing-divided-list, so that ing-divided-list can access the items without knowing about their DOM structure.
angular.module('tgSplitList').directive('tgSplitItem', [function() {
    return {
        restrict: 'A',
        priority: 1,
        scope:true,
        require:['^tgSplitList', 'tgSplitItem', '?^tgSplitListA', '?^tgSplitListB'],
        link: function(scope, elem, attrs, ctrls) {
            var listCtrl = ctrls[0], itemCtrl = ctrls[1], listA = ctrls[2], listB = ctrls[3];

            if(!listA && !listB) {
                throw new Error('Please define which list(\'a\' or \'b\') the current item is part of (place \'tg-split-list-a\' or \'tg-split-list-b\' directive on its parent)');
            }

            scope.$on('splitList.init', function addItem() {
                listCtrl.addItem(itemCtrl.api, listB ? 'b' : 'a');
            });

        },
        controller:'SplitItemController'
    }
}]);

'use strict';

angular.module('tgSplitList').directive('tgSplitMoreItem', [function() {
    return {
        restrict: 'A',
        priority: 1,
        scope:true,
        require:['^tgSplitList', 'tgSplitMoreItem'], // use in conjunction with ng-repeat, so scope.$index can be used
        link: function(scope, elem, attrs, ctrls) {
            var listCtrl = ctrls[0], moreCtrl = ctrls[1];

            scope.$on('splitList.init', function addMoreBtn() {
                listCtrl.addMoreBtn(moreCtrl.api);
            });
        },
        controller:'SplitItemController'
    }
}]);

'use strict';

angular.module('tgSplitList').directive('tgSplitListA', [function() {
    return {
        restrict: 'A',
        require: '^tgSplitList',
        controller: function() {} // Lets child directives detect their parent
    }
}]);

'use strict';

angular.module('tgSplitList').directive('tgSplitListB', [function() {
    return {
        restrict: 'A',
        require: ['^tgSplitList', '^tgToggle'],
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



/**
*
* @ngdoc directive
* @name tgSplitList.directive:tg-split-list
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
*   <li>The main directive, tg-split-list, will initialize and send an init event to its child directives </li>
*   <li>The tg-split-focus-element registers it_this on their parent(tg-split-item) controller. It will expose accessibility functions and a reference to it_this(the focusable elem) </li>
*   <li>The tg-split-item will register it_this on its own turn on the tg-split list controller. It will expose a reference to its element and the content of its focusable child </li>
*   <li>The tg-split-list will now hold a data object with reference to the objects exposed by tg-split-item for list A, list B and the more button. All data needed for measurement computations and maintaining focus between lists will be kept here </li>
*   <li>The document.activeElement will be watched to be able to keep an active state reference inside the main directive controller </li>
*   <li>All data are in place: depending on how much space is available on screen, the list will be split in a 'A' and 'B' list </li>
* </ul>
*
* When the data for the original list (list parameter for tg-split-list-directive) changes, initialization will take place again
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
*  <li>The lists should be marked with the attribute directives <b>tg-split-list-a</b> (the 'normal' list) and <b>tg-split-list-b</b> (everything that will be under 'more') </li>
*  <li>Every list item that should be used as a measurement unit (mostly li elements) should be marked with the <b>tg-split-item</b> attribute directive </li>
*  <li>The more button has a distinct attribute directive: <b>tg-split-more-item</b> which is used as a measurement unit for the more button </li>
*  <li>Every focusable element inside a split-item(mostly anchors and buttons) will be used to detect which element currently has focus, and needs to be marked with the <b>tg-split-focus-element</b> attribute directive </li>
* </ul>
*
*
* ## Dependencies
*
* ### Directives
* <ul>
*  <li><a href="#/spectingular/theguide-split-list.directive:tg-toggle">tg-toggle</a></li>
*  <li><a xhref="#/spectingular/theguide-split-list.directive:tg-toggle">tg-toggle-invoker</a></li>
*  <li><a href="#/spectingular/theguide-split-list.directive:tg-toggle-content">tg-toggle-content</a>(attr sr-only="true" is required)</li>
* </ul>
*
* ### Services
* <ul>
*  <li><a xhref="#/spectingular/theguide-split-list.provider:mqService">mqService</a></li>
*  <li><a href="#/spectingular/theguide-split-list.service:accessibilityService">accessibilityService</a></li>
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
<example module="tgSplitList">

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
          <div tg-split-list list="content" class="l-h-25 l-mb-5">
              <div tg-toggle class="dropdown open">

                  <ul tg-split-list-a class="nav nav-list nav-pills nav-primary">
                      <li tg-split-item ng-repeat="item in splitList.A" class="nav-item">
                          <a tg-split-focus-element>{{item.text}}</a>
                      </li>
                      <li tg-split-more-item class="nav-item dropdown">
                          <a tg-split-focus-element tg-toggle-invoker class="dropdown-toggle">
                              Meer
                              <span aria-hidden="true" class="icon icon-arrow-a-down l-mr-0"></span>
                          </a>
                      </li>
                  </ul>

                  <div tg-split-list-b tg-toggle-content overlay="true" sr-only="true" class="dropdown-menu dropdown-menu-a dropdown-menu-lg dropdown-menu-right arrow-sm">
                      <ul class="list-unstyled l-mb-0" role="presentation">
                          <li tg-split-item ng-repeat="item in splitList.B" class="dropdown-menu-item">
                              <a tg-split-focus-element class="dropdown-menu-element" >
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

angular.module('tgSplitList').directive('tgSplitList', [function() {
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
        controller: ['$element', '$timeout', '$scope', '$attrs', '$document', '$window', 'mqService', 'ingKeyBinderConfig', function( $element, $timeout, $scope, $attrs, $document, $window, mqService, ingKeyBinderConfig) {
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
                                Data stored in this list originates from child directives of tg-split-list-a */
                listB : [],  // See listA. Data stored in this list originates from child directives of tg-split-list-b
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
                    return;
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
                    _this.state._moreVisible = _this.state.startIndexB > -1 && _this.state._focusedIndex >= _this.state.startIndexB;
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


