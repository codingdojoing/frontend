'use strict';

/**
 * @ngdoc module
 * @name tgComparisonTable
 * @module tgComparisonTable
 */

angular.module('tgComparisonTable', ['ingGlobal', 'ngSanitize', 'tgUtils', 'ngAnimate']);


angular.module('tgComparisonTable').config(['propertyServiceProvider', function(propertyServiceProvider) {
    propertyServiceProvider.add('tgComparisonTable', {
        'marked': 'Gemarkeerd',
        'selectProduct': 'Maak uw keuze',
        'columnAdded':  'Tabel is gewijzigd naar {0} kolommen. {1} is toegevoegd',
        'columnDeleted': 'Tabel is gewijzigd naar {0} kolommen. {1} is verwijderd',
        'columnChanged': 'Kolom {0} is gewijzigd naar {1}'
    });
}]);


'use strict';
/*jshint latedef: nofunc */


/**
  * @ngdoc directive
  * @name tgComparisonTable
  * @module tgComparisonTable
  * @restrict E
 *
  *
 * @description
 * 		<p>
 *     The <code>tg-comparison-table</code> is a markup element useful for rendering a comparison-table component.<br/>

 *
 *		It consists of the following subdirectives:&#42;
 *
 *     <ul>
 *		  <li><code>tg-comparison-caption</code>: Contents will be showed as a header above the table. This text is required for accessibility. In order to hide it visually, provide 'sr-only="true"'  </li>
 *      <li><code>tg-comparison-property</code>: Defines comparison criteria that will land in the leftmost column(for larger screens) or an inbetween horizontal column(for smaller screens) The attribute 'property-id' must be used for linkage between the <i>tg-comparison-property</i> and <i>tg-comparison-object</i> component. </li>
 *      <li><code>tg-comparison-object</code>:  Contains an object that will be compared against the other defined objects.</li>
 *      <li><code>tg-comparison-field</code>:  Sub element of tg-comparison-object that contains the contents for each comparison property.</li>
 *      <li><code>object-heading</code>:  When object-title of tg-comparison-object doesn't suffice, richer content can be defined inside this element.</li>
 *     </ul>
 *
 * 		Next to this,there are two helper directives available that can be placed as attributes on elements inside a table cell :
 *
 *     <ul>
 *		  <li><code>tg-table-interactive-element</code>: Needs to be set on every interactive element inside the table. It will set the right aria-properties, so that the relation between column and header is known by the screen reader user.</li>
 *      <li><code>tg-select-button</code>: By placing this directive on a button or an anchor, it will select the object it resides in. The event '< table-id >.objectSelected'' (including the selected object) will be fired for the outside world as well.</li>
 *     </ul>
 *
 *		</p>
 *
 * &#42; <span class="font-size-xs">Note that these are officially not directives, but more a kind of xml configuration</span>
 *
 * @param {Number}      [<code>tg-comparison-table</code>:product-column-min-width=160]         The minimum width of the left column that contains comparison properties
 * @param {Number}      [<code>tg-comparison-table</code>:property-column-min-width=160]        The minimum width of a product column that contains comparison data
 * @param {String}      [<code>tg-comparison-table</code>:marked-text=Gemarkeerd]             Screen reader text for marked products
 * @param {String}      [<code>tg-comparison-table</code>:select-product-text=Maak uw keuze]  Text in product select box
 * @param {Boolean}      <code>tg-comparison-caption</code>:sr-only         true to visually hide the caption
 * @param {String}      <code>tg-comparison-property</code>:property-id     The id by which comparison objects can reference a comparison-property
 * @param {String}      <code>tg-comparison-object</code>:object-title      The title that will be displayed in the column header of a comparison object
 * @param {Boolean}      <code>tg-comparison-object</code>:marked            Indicator. If set to true, object is marked.(for instance objects that match certain criteria)
 * @param {String}      <code>tg-comparison-field</code>:property-id        The id that refers to a comparison-property
 *
 *
  * @example
  <example module="tgComparisonTable" deps="spectingular-core/spectingular-core.js;theguide-comparison-table/theguide-comparison-table.js;theguide-utils/theguide-utils.js">
      <file name="index.html">

      <tg-comparison-table ng-cloak id="comparisonTable1" marked-text="Aanbevolen" select-product-text="Kies uw product" ng-controller="tgComparisonTableExampleCtrl">

          <tg-comparison-caption>Default Comparison table</tg-comparison-caption>

          <tg-comparison-property property-id="Omschrijving">Omschrijving</tg-comparison-property>
          <tg-comparison-property property-id="Leenbedrag">
              Leenbedrag
              <span ing-info-popover config="popoverConfig"></span>
          </tg-comparison-property>
          <tg-comparison-property property-id="MaximaleDuur">Maximale Duur</tg-comparison-property>
          <tg-comparison-property property-id="prp0"></tg-comparison-property>
          <tg-comparison-property property-id="prp1"></tg-comparison-property>


          <tg-comparison-object object-title="Persoonlijke Lening">
              <tg-comparison-field property-id="Omschrijving">Eenmalig een bedrag lenen tegen een vaste rente</tg-comparison-field>
              <tg-comparison-field property-id="Leenbedrag">${{500 * data.duur}}</tg-comparison-field>
              <tg-comparison-field property-id="MaximaleDuur">
                  <select ng-model="data.duur" class="form-control" name="MaximaleDuur">
                      <option value="12">12 maanden</option>
                      <option value="24">24 maanden</option>
                      <option value="36">36 maanden</option>
                  </select>
              </tg-comparison-field>
              <tg-comparison-field property-id="prp0">
                  <button class="btn btn-primary btn-wrap" tg-table-interactive-element tg-select-button id="b1"> Meer informatie  </button>
              </tg-comparison-field>

              <tg-comparison-field property-id="prp1">
                  <a href="#" tg-table-interactive-element tg-select-button>Meer informatie</a>
              </tg-comparison-field>

          </tg-comparison-object>

          <tg-comparison-object object-title="Doorlopend Krediet">
              <tg-comparison-field property-id="Omschrijving">Eenmalig een bedrag lenen tegen een vaste rente</tg-comparison-field>
              <tg-comparison-field property-id="Leenbedrag">€5.000</tg-comparison-field>
              <tg-comparison-field property-id="MaximaleDuur">Geen maximale duur</tg-comparison-field>

              <tg-comparison-field property-id="prp0">
                  <span class="sr-only">Identificende tekst</span>
                  <button class="btn btn-primary btn-wrap" tg-table-interactive-element tg-select-button data-id="b2" aria-labelledby="Identificeerder-b2">Selecteren</button>
              </tg-comparison-field>

              <tg-comparison-field property-id="prp1">
                  <a href="#" tg-table-interactive-element tg-select-button>Meer informatie</a>
              </tg-comparison-field>

          </tg-comparison-object>

          <tg-comparison-object object-title="Continu Limiet" marked="true">
              <object-heading>
                  <div class="position position-right position-md">
                      <tg-icon font-icon="information-badge" size="md" class="position-component"></tg-icon>
                      Continu Limiet
                  </div>
              </object-heading>
              <tg-comparison-field property-id="Omschrijving">Rood staan op uw Betaalrekening</tg-comparison-field>
              <tg-comparison-field property-id="Leenbedrag">€5.000</tg-comparison-field>
              <tg-comparison-field property-id="MaximaleDuur">Geen maximale duur</tg-comparison-field>
              <tg-comparison-field property-id="prp0">
                  <span class="sr-only">Identificende tekst</span>
                  <button class="btn btn-primary btn-wrap" data-id="b3" aria-labelledby="Identificeerder-b3" tg-select-button>Selecterent</button>
              </tg-comparison-field>

              <tg-comparison-field property-id="prp1">
                  <a href="#" tg-table-interactive-element tg-select-button>Meer informatie</a>
              </tg-comparison-field>

          </tg-comparison-object>

          <tg-comparison-object object-title="No Limits">
              <tg-comparison-field property-id="Leenbedrag">€400.000</tg-comparison-field>
              <tg-comparison-field property-id="Leenbedrag">€500.000</tg-comparison-field>
              <tg-comparison-field property-id="MaximaleDuur">Geen maximale duur</tg-comparison-field>
              <tg-comparison-field property-id="prp0">
                  <span class="sr-only">Identificende tekst</span>
                  <button class="btn btn-primary btn-wrap" data-id="b4" aria-labelledby="Identificeerder-b4" tg-select-button>Gelijk doen</button>
              </tg-comparison-field>
            <tg-comparison-field property-id="prp1">
              <a href="#" tg-table-interactive-element tg-select-button>Meer informatie</a>
            </tg-comparison-field>
          </tg-comparison-object>

      </tg-comparison-table>


      </file>

 		 <file name="Mocker.js">
  				angular.module('tgComparisonTable').controller('tgComparisonTableExampleCtrl', function($window, $scope) {

						$scope.popoverConfig = {
                title: 'Titel',
                text: 'Lorem <b>Ipsum</b>',
                position: 'above-right',
                invokerSrText: 'Meer informatie over item X'
            };

            $scope.data = {
            	duur : 12
            };

        });
  		</file>

  </example>
  *
  */
angular.module('tgComparisonTable').directive('tgComparisonTable', [function () {
    return {
        terminal: true,
        restrict: 'E',
        controller: ['$scope', '$element', '$compile', '$attrs', 'mqService', '$timeout', 'tgUtils', 'propertyService', '$window', function ($scope, $element, $compile, $attrs, mqService, $timeout, tgUtils, propertyService, $window) {
            var _this = this;

            this.id = $element.attr('id') || 'table-' + tgUtils.createRandomId();

            this.enableAnimations = enableAnimations;
            this.selectObject = selectObject;

            this.config = {};
            this.viewData = {};
            this.sourceData = {};
            this.state = {};

            ////////////


            _this.config = {
                objectColumnMinWidth: Number($attrs.objectColumnMinWidth) || 160,
                propertyColumnMinWidth: Number($attrs.propertyColumnMinWidth) || 160,
                texts: angular.copy(propertyService.properties('tgComparisonTable'))
            };

            _this.state = {
                animationsEnabled: false,
                columnSwitch: 'init',
                init: true,
                isColGroup: false,
                isMobile: false,
                selected: false,
                showSelectBoxes: false
            };

            _this.sourceData = {
                properties: {
                    'head': {
                        'id': 'columnTitles',
                        'text': ''
                    },
                    'body': []
                },
                objects : []
            };




            /**
             * Code
             */


            // track table to be displayed
            if (angular.isDefined($window.Bootstrap) && $window.Bootstrap.trackEvent) {
                $window.Bootstrap.trackEvent('Comparison table wordt op scherm getoond');
            }


            if($attrs.markedText) {
                _this.config.texts.marked = $attrs.markedText;
            }

            if($attrs.selectProductText) {
                _this.config.texts.selectProduct = $attrs.selectProductText;
            }

            getSourceData();
            setMinWidths();

            // Copy data from source to view
            _this.viewData = angular.copy(_this.sourceData);


            calculateDisplay();

            // Listeners
            $scope.$on('mq-changed', onMqChanged);
            $scope.$watch('table.state.columnSwitch',updateViewDataOnSelect);

            // Compile
            $element.html($compile(angular.element('<tg-comparison-table-template></tg-comparison-table-template>'))($scope));



            /**
             * Public Functions
             */


            /**
             *
             * @param {int} column - zero based index
             */
            function selectObject(column) {
                $scope.$evalAsync(function () {

                    // Unmark all objects
                    for(var i in _this.viewData.objects) {
                        _this.viewData.objects[i].selected = false;
                    }

                    for(var j in _this.sourceData.objects) {
                        _this.sourceData.objects[j].selected = false;
                    }

                    // Mark current object

                    _this.sourceData.objects[tgUtils.angularIndexOf(_this.viewData.objects,_this.viewData.objects[column])].selected = true;
                    _this.viewData.objects[column].selected = true;

                    // Let the outside world know a product has been selected
                    _this.state.selected = true;
                    $scope.$emit(_this.id + '.objectSelected', _this.viewData.objects[column]);
                });
            }



            function enableAnimations() {
                _this.state.animationsEnabled = true;
                $timeout(function() {
                    _this.state.animationsEnabled = false;
                }, 600); // is linked to 'slow' animation !!
            }



            /**
             * Private Functions
             */

            function onMqChanged(e, mq) {
                $scope.$evalAsync(function () {
                    _this.state.isMobile = (mq.width >= mqService.mqSizes.xs) ? false : true;
                    calculateDisplay();
                });
            }


            function getSourceData() {

                function registerProperty(id, content, description) {
                    var prop = {
                        'id': id,
                        'text': content,
                        'description': description
                    };

                    _this.sourceData.properties.body.push(prop);
                }

                function registerObject(title, heading, marked, content) {
                    var obj = {
                        'id' : String(tgUtils.createRandomId()),
                        'title': title,
                        'heading': heading,
                        'marked': marked,
                        'content': content
                    };
                    _this.sourceData.objects.push(obj);
                }


                // Retrieve all data from DOM

                var caption = $element.find('tg-comparison-caption')[0];

                if(caption) {
                    _this.sourceData.caption = {};
                    _this.sourceData.caption.text = caption.innerHTML;
                    _this.sourceData.caption.srOnly = $scope.$eval(caption.getAttribute('sr-only'));
                }

                angular.forEach($element.find('tg-comparison-property'), function (propElem) {
                    registerProperty(propElem.getAttribute('property-id'), propElem.innerHTML, propElem.getAttribute('description'));
                });

                angular.forEach($element.find('tg-comparison-object'), function (objElem) {
                    var fields = {};
                    var heading = angular.element(objElem).find('object-heading').length > 0 ? angular.element(objElem).find('object-heading').html() : objElem.getAttribute('object-title');

                    angular.forEach(angular.element(objElem).find('tg-comparison-field'), function (fieldElem) {
                        fields[fieldElem.getAttribute('property-id')] = fieldElem.innerHTML;
                    });

                    registerObject(objElem.getAttribute('object-title'), heading, $scope.$eval(objElem.getAttribute('marked')), fields);
                });
            }



            function setMinWidths() {
                _this.propertyColumnStyle = {
                    minWidth: _this.config.propertyColumnMinWidth
                };

                _this.objectColumnStyle = {
                    minWidth: _this.config.objectColumnMinWidth
                };
            }



            function calculateDisplay() {
                var columnAmount = _this.sourceData.objects.length;
                var containerWidth = tgUtils.innerWidth($element.parent());
                var numberOfColumnsFit = Math.floor(containerWidth / _this.config.objectColumnMinWidth);
                var newColumnSpan = (numberOfColumnsFit <= columnAmount) ? numberOfColumnsFit : columnAmount;
                var minTableWidth = (columnAmount * _this.config.objectColumnMinWidth ) + _this.config.propertyColumnMinWidth;

                // If only one column (or less) fits, adjust minWidth so that two columns will be shown
                if(newColumnSpan < 2) {
                    newColumnSpan = 2;
                    _this.objectColumnStyle.minWidth = containerWidth / 2;

                } else {
                    _this.objectColumnStyle.minWidth = _this.config.objectColumnMinWidth;
                }

                adjustViewData(_this.state.columnSpan, newColumnSpan);

                _this.state.isColGroup = (minTableWidth > containerWidth);
                _this.state.columnSpan = newColumnSpan;
                _this.state.showSelectBoxes = _this.state.showSelectBoxes ? true : (newColumnSpan < _this.sourceData.objects.length);

            }



            function adjustViewData(oldColumnSpan, newColumnSpan) {
                var title;
                var newData = angular.copy(_this.viewData);

                if(newColumnSpan < newData.objects.length) {

                    title = newData.objects[newColumnSpan].title;
                    newData.objects.splice(newColumnSpan, newData.objects.length);

                    if(!_this.state.init) {
                        _this.state.ariaLiveText = propertyService.replaceVariables(_this.config.texts.columnDeleted,[newColumnSpan, title]);

                        //Let Webtrekk know column has been deleted
                        var focusedElement = document.activeElement;

                        $timeout(function() {
                            var focusedString = focusedElement === document.activeElement ? 'Element met focus is ongewijzigd' : 'Element met focus is gewijzigd!!';
                            if (angular.isDefined($window.Bootstrap) && $window.Bootstrap.trackEvent) {
                                $window.Bootstrap.trackEvent('Kolom in comparison table is verwijderd.' + focusedString);
                            }

                        });
                    }
                }
                else if(newColumnSpan > newData.objects.length) {

                    var columnsToAdd = newColumnSpan - oldColumnSpan;
                    var arrDiff = tgUtils.arrayDiff(_this.sourceData.objects, _this.viewData.objects);

                    for (var i = 0; i < columnsToAdd; i++) {
                        newData.objects.push(arrDiff[i]);

                        title = arrDiff[i].title;
                        _this.state.ariaLiveText = propertyService.replaceVariables(_this.config.texts.columnAdded,[newColumnSpan, title]);
                    }
                }
                _this.state.init = false;

                $scope.$evalAsync(function() {
                    _this.viewData = newData;
                });
            }

            function updateViewDataOnSelect() {
                if( _this.state.columnSwitch === 'init') {
                    return;
                }

                var selected = _this.state.columnSwitch.split('-');
                var column = selected[0];
                var id = selected[1];

                 var newObj = angular.copy(_this.sourceData.objects.filter(function(obj) {
                    return obj.id === id;
                })[0]); // Copy object, so this will work with ng-repeats without track by $index defined(these are needed for animation)

                $scope.$evalAsync(function() {
                    _this.viewData.objects[column] = newObj;
                    _this.state.ariaLiveText = propertyService.replaceVariables(_this.config.texts.columnChanged,[(Number(column) + 1), _this.viewData.objects[column].title]);
                    _this.state.columnSwitch = 'init';
                });
            }

        }],
        controllerAs: 'table'
    };
}]);

angular.module('tgComparisonTable').directive('tgComparisonTableTemplate', [ function () {
    return {
        restrict: 'E',
        template:
            '<div id="{{table.id}}-update" aria-live="assertive" aria-atomic="false" aria-relevant="additions">' +
                '<div class="sr-only" tg-sr-trigger="table.state.ariaLiveText"></div>' +
            '</div>' +

            '<form>' +
                '<div aria-atomic="false" aria-live="off" ng-class="{\'l-ml-n1 l-mr-n1\': table.state.isMobile}">' +
                    '<table class="table table-b h-bor-b-0">' +
                        '<caption ng-class="{ \'l-pl-1 l-pr-1\' : table.state.isMobile , \'sr-only\' : table.viewData.caption.srOnly}" class="heading-b-xl" ng-bind-html="table.viewData.caption.text"></caption>' +
                        '<thead>' +
                            '<tr class="h-bor-b-1">' +
                                '<th ng-if="!table.state.isColGroup" class="l-w-1" ng-style="table.propertyColumnStyle"></th>' +
                                '<th ng-class="{\'animate-fade\': table.state.animationsEnabled}" class="duration-in-slow duration-out-none l-w-1" id="{{table.id}}-object-{{$index}}" ng-repeat="object in table.viewData.objects" ng-style="table.objectColumnStyle">' +
                                    '<span ng-if="object.marked" class="sr-only">{{table.config.texts.marked}}</span>' +
                                    '<div tg-compile="object.heading"></div>' +
                                '</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '<tr ng-if="table.state.showSelectBoxes">' +
                                '<th ng-if="!table.state.isColGroup"></th>' +
                                '<td headers="{{table.id}}-object-{{$index}}" ng-init="colIndex = $index" ng-repeat="object in table.viewData.objects" ng-class="{\'animate-fade\':table.state.animationsEnabled, \'h-bg-b \': (object.marked && !table.state.selected) || object.selected }" class="duration-in-slow duration-out-none">' +
                                    '<select name="sel-{{$index}}" class="form-control" aria-labelledby="{{table.id}}-object-{{$index}} track by $index" ng-model="table.state.columnSwitch" ng-change="table.enableAnimations()">' +
                                        '<option value="init" disabled class="ng-hide">{{table.config.texts.selectProduct}}</option>' +
                                        '<option ng-repeat="object in table.sourceData.objects" value="{{colIndex}}-{{object.id}}">{{object.title}}</option>' +
                                    '</select>' +
                                '</td>' +
                            '</tr>' +
                            '<tr ng-if="table.state.isColGroup && rowHeader.text" ng-repeat-start="rowHeader in table.viewData.properties.body" class="thead-sub">' +
                                '<td ng-class="{\'animate-fade\':table.state.animationsEnabled}" class="duration-in-slow duration-out-none" colspan="{{table.state.columnSpan}}" id="{{table.id}}-property-{{rowIndex}}" tg-compile="rowHeader.text"></td>' +
                            '</tr>' +
                            '<tr ng-init="rowIndex = $index" ng-repeat-end>' +
                                '<th ng-if="!table.state.isColGroup && rowHeader.text" id="{{table.id}}-property-{{rowIndex}}" tg-compile="rowHeader.text"></th>' +
                                '<td ng-if="!table.state.isColGroup && !rowHeader.text"></td>' +
                                '<td ng-class="{\'animate-fade\':table.state.animationsEnabled, \'h-bg-b\': (object.marked && !table.state.selected) || object.selected}" class="duration-in-slow duration-out-none" headers="{{(rowHeader.text ? table.id + \'-property-\' + rowIndex + \' \' : \'\') + table.id + \'-object-\' + $index }}" ng-repeat="object in table.viewData.objects" tg-compile="object.content[rowHeader.id]"></td>' +
                            '</tr>' +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
            '</form>'
    };
}]);


'use strict';
/*jshint latedef: nofunc */

angular.module('tgComparisonTable').directive('tgCompile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var compileScope = scope.$eval(attrs.compileScope);

            scope.$watch(function() {
                return scope.$eval(attrs.tgCompile);
            },function(str) {
                element.html(str);
                $compile(element.contents())(compileScope || scope);
            });
        }

    };
}]);
'use strict';
/*jshint latedef: nofunc */

angular.module('tgComparisonTable').directive('tgSelectButton', ['tgUtils', function (tgUtils) {
    return {
        restrict: 'A',
        require: '^^tgComparisonTable',
        link: function (scope, element, attrs, ctrl) {

            element.on('click', function(){
                var headers = tgUtils.parent(element, 'th, td').getAttribute('headers');
                var headersSplit = headers.split('-');
                ctrl.selectObject(headersSplit[headersSplit.length-1]);
            });

        }
    };
}]);
'use strict';
/*jshint latedef: nofunc */

angular.module('tgComparisonTable').directive('tgSrTrigger', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            scope.$watch(function() {
                return scope.$eval(attrs.tgSrTrigger);
            }, refreshContent);

            function refreshContent(newVal, oldVal) {
                if(newVal !== oldVal) {
                    element.html('');
                    element.html(angular.element('<div>' + newVal + '</div>'));
                }
            }
        }
    };
}]);

'use strict';
/*jshint latedef: nofunc */

angular.module('tgComparisonTable').directive('tgTableInteractiveElement', ['tgUtils', function(tgUtils) {
    return {
        restrict: 'A',
        require: '^^tgComparisonTable',
        link: function(scope, element, attrs) {

            if(!attrs.id) {
                element.attr('id', 'tableInteractiveElement-' + tgUtils.createRandomId());
            }

            if(!attrs.ariaLabelledby) {
                var currentCell = tgUtils.parent(element, 'th, td');
                // the cell must have a headers field with the right id's
                var ids = currentCell.getAttribute('headers');
                element.attr('aria-labelledby', ids +' ' + element.attr('id'));
            }

        }
    };
}]);

