'use strict';
angular.module('ingComponents.forms', [
    'ingComponents.forms.accountIng',
    'ingComponents.forms.bsn',
    'ingComponents.forms.city',
    'ingComponents.forms.street',
    'ingComponents.forms.dutchZipCode',
    'ingComponents.forms.houseNumberAddition',
    'ingComponents.forms.lastName',
    'ingComponents.forms.lastNamePrefix',
    'ingComponents.forms.phonenumber'
]);

'use strict';

angular.module('ingComponents.forms.commons', ['ingGlobal'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.commons', {
            'MSG_Required': 'Graag invullen.'
        });
    }])
    .factory('formCommonsUtils', ['propertyService', function (propertyService) {
        var formCommonsUtils = {};

        formCommonsUtils.getProperties = function (propertyKey) {
            return angular.extend(propertyService.properties('ingComponents.forms.commons'), propertyService.properties(propertyKey));
        };

        return formCommonsUtils;
    }]);

'use strict';

angular.module('ingComponents.forms.accountDutch', ['ingComponents.forms.commons'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.accountDutch',
            {
                'TXT_Label_Account_Dutch': 'Rekeningnummer',
                'TXT_INCORRECT_DUTCH_ACCOUNTNUMBER': 'Vul een geldig Nederlands rekeningnummer in.'
            });
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.ingAccountDutch.directive:ing-account-dutch
 * @restrict E
 * @requires ingGlobal
 * @property id mandatory
 * @property name mandatory
 * @property value ng-model of the current controller
 * @description
 * Directive rendering a label and input field for Dutch specific IBAN component.
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-account-dutch id="accountDutch" value="model.accounting"></ing-account-dutch>
 </div>
 </form>
 */
angular.module('ingComponents.forms.accountDutch')
    .directive('ingAccountDutch', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        return {
            restrict: 'EA',

            compile: function (tElement, tAttrs) {
                var template = '<input type="text" ing-iban-validator restrict="NL"/>',
                    element = new componentBuilderFactory.builder(template, 'accountDutchProperties', 'TXT_Label_Account_Dutch')
                        .notify('ingInvalidIban', 'TXT_INCORRECT_DUTCH_ACCOUNTNUMBER')
                        .build(tAttrs);
                tElement.append(element);
            },

            controller: ['$scope', function ($scope) {
                $scope.accountDutchProperties = formCommonsUtils.getProperties('ingComponents.forms.accountDutch');
            }]
        }
    }]);

'use strict';

angular.module('ingComponents.forms.accountIng', ['ingComponents.forms.commons'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.accountIng',
            {
                'TXT_Label_Account_ING': 'Rekeningnummer (IBAN)',
                'TXT_INCORRECT_ING_ACCOUNTNUMBER': 'Dit is geen geldig ING rekeningnummer'
            });
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.ingAccountIng.directive:ing-account-ing
 * @restrict E
 * @requires ingGlobal
 * @property id mandatory
 * @property name mandatory
 * @property value ng-model of the current controller
 * @description
 * Directive rendering a label and input field for ING specific IBAN component.
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-account-ing id="accountIng" name="accountIng" value="model.accounting"></ing-account-ing>
 </div>
 </form>
 */
angular.module('ingComponents.forms.accountIng')
    .directive('ingAccountIng', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        return {
            restrict: 'EA',

            compile: function (tElement, tAttrs) {
                var template = '<input type="text" ing-placeholder=\"NL00 INGB 0123 4567 89\"  ing-iban-validator restrict="ING"/>',
                    element = new componentBuilderFactory.builder(template, 'accountIngProperties', 'TXT_Label_Account_ING')
                        .notify('ingInvalidIban', 'TXT_INCORRECT_ING_ACCOUNTNUMBER')
                        .build(tAttrs);
                tElement.append(element);
            },

            controller: ['$scope', function ($scope) {
                $scope.accountIngProperties = formCommonsUtils.getProperties('ingComponents.forms.accountIng');
            }]
        }
    }]);

'use strict';

angular.module('ingComponents.forms.bsn', ['ingComponents.forms.commons'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.bsn',
            {
                'FIELD_BSN': 'Burgerservicenummer',
                'TOOLTIP_Title_Bsn': 'Burgerservicenummer',
                'TOOLTIP_Text_Bsn': 'Dit nummer staat op uw paspoort, identiteitskaart of rijbewijs.',
                'MSG_FuncValSingle_BsnInvalid': 'Vul een geldig burgerservicenummer in.',
                'MSG_FuncValSingle_BsnTooShort': 'Het burgerservicenummer heeft 9 cijfers.',
                'MSG_FuncValSingle_BsnTestNumbers': 'Dit is geen geldig burgerservicenummer.'
            });
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.panama.bsn.directive:ing-bsn-component
 * @restrict EA
 * @requires ingGlobal
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for BSN.
 * The BSN directive will validate if the input is a valid BSN
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-bsn-component id="bsn" value="model.bsn" required></ing-bsn-component>
 </div>
 </form>
 */
angular.module('ingComponents.forms.bsn').directive('ingBsnComponent', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'EA',

        compile: function(tElement, tAttrs) {
            var template = '<input type="text" ing-bsn ing-bsn-test-numbers-validator ng-minlength="9" maxlength="9">',
                element = new componentBuilderFactory.builder(template, 'bsnProperties', 'FIELD_BSN')
                    .notify('ingBsnTestNumbers', 'MSG_FuncValSingle_BsnTestNumbers')
                    .notify('minlength', 'MSG_FuncValSingle_BsnTooShort')
                    .notify('ingBsn && !minlength', 'MSG_FuncValSingle_BsnInvalid')
                    .infoPopover('bsnInfoPopover')
                    .small()
                    .build(tAttrs);
            tElement.append(element);
        },

        controller: ['$scope', function ($scope) {
            var bsnProperties = formCommonsUtils.getProperties('ingComponents.forms.bsn');
            $scope.bsnProperties = bsnProperties;


            $scope.bsnInfoPopover = {
                title: bsnProperties.TOOLTIP_Title_Bsn,
                text: bsnProperties.TOOLTIP_Text_Bsn
            }
        }]
    }
}]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.panama.bsn.directive:ing-bsn-test-numbers-validator
 * @restrict A
 *
 * @description
 * Directive for validating a BSN against test numbers.
 *
 *
 * @example
 <example module="ingComponents.panama.bsn">
 <file name="index.html">
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <label ing-form-grid-label for="the_id">Burgerservicenummer</label>
 <div ing-form-grid-field>
 <input type="text" class="form-control" id="the_id" name="the_id" ng-model="model.bsn" ing-bsn-test-numbers-validator/>
 <div ing-notify on-element="the_id" validate="ingBsnTestNumbers">
 <div ing-notification type="error">This number is a test number</div>
 </div>
 </div>
 </div>
 </form>
 </file>
 </example>
 */
angular.module('ingComponents.forms.bsn')
    .directive('ingBsnTestNumbersValidator', ['utilsService', function (utilsService) {
            return {
                require: ['ngModel', 'ingBsnTestNumbersValidator'],
                controller: 'ingBsnTestNumbersValidatorCtrl',
                link: function (scope, element, attrs, ctrls) {
                    var ngModelCtrl = ctrls[0];
                    var bsnTestNumbersValidatorCtrl = ctrls[1];
                    utilsService.addValidator(ngModelCtrl, function(value) {
                        var valid = !bsnTestNumbersValidatorCtrl.isTestNumber(value);
                        ngModelCtrl.$setValidity('ingBsnTestNumbers', valid);
                        return valid;
                    });
                }
            };
        }])
    .controller('ingBsnTestNumbersValidatorCtrl', ['$scope', 'utilsService', function ($scope, utilsService) {
        var testNumbersArray = ['000000000', '010000100', '111111110', '999909009', '123456782', '111222333', '333333330', '100011111', '010001001'];
        this.isTestNumber = function(value) {
            if(utilsService.isEmpty(value)) {
                return false;
            }
            return testNumbersArray.indexOf(value) !== -1;
        }
    }]);
'use strict';

/* global angular */
angular.module('ingComponents.forms.city', ['ingComponents.forms.commons']);

angular.module('ingComponents.forms.city').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.city', {
        'FIELD_City': 'Plaats'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.city.directive:ing-city
 * @restrict EA
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for City.
 * All leading and trailing spaces in the input will be trimmed
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-city id="city" value="model.city" required></ing-city>
 </div>
 </form>
 */
angular.module('ingComponents.forms.city').directive('ingCity', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'EA',

        compile: function (tElement, tAttrs) {
            var KEY_LABEL = 'FIELD_City';
            var PROPERTY_SERVICE_PROVIDER = 'cityProperties';
            var TEMPLATE_HTML = '<input type="text" maxlength="150" ing-input-trimmer />';

            var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                .build(tAttrs);
            tElement.append(element);
        },

        controller: ['$scope', function ($scope) {
            $scope.cityProperties = formCommonsUtils.getProperties('ingComponents.forms.city');
        }]
    }
}]);
'use strict';

/* global angular */
angular.module('ingComponents.forms.dateOfBirth', ['ingComponents.forms.commons']);

angular.module('ingComponents.forms.dateOfBirth').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.dateOfBirth', {
        'MSG_Invalid_Date_Of_Birth': 'Deze geboortedatum kan niet kloppen.',
        'MSG_Invalid_Date': 'Hier een geldige datum invullen.',
        'FIELD_Date_Of_Birth': 'Geboortedatum'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.dateOfBirth.directive:ing-date-of-birth
 * @restrict EA
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for DateOfBirth
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-date-of-birth id="dateOfBirth" value="model.dateOfBirth" required></ing-date-of-birth>
 </div>
 </form>
 */
angular.module('ingComponents.forms.dateOfBirth').directive('ingDateOfBirth', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'EA',

        compile: function (tElement, tAttrs) {
            var KEY_LABEL = 'FIELD_Date_Of_Birth';
            var PROPERTY_SERVICE_PROVIDER = 'dateOfBirthProperties';
            var TEMPLATE_HTML = '<input type="text" ing-date ing-date-format ing-placeholder="\'dd-mm-yyyy\'" ing-max-date="dateOfBirthMaxDate" ing-min-date="dateOfBirthMinDate" maxlength="10" />';

            var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                .notify('ingDate', 'MSG_Invalid_Date')
                .notify('ingMaxDate || ingMinDate', 'MSG_Invalid_Date_Of_Birth')
                .small()
                .build(tAttrs);
            tElement.append(element);
        },

        controller: ['$scope', function ($scope) {
            $scope.dateOfBirthProperties = formCommonsUtils.getProperties('ingComponents.forms.dateOfBirth');
            var now = new Date();
            $scope.dateOfBirthMaxDate = (now.getDate() - 1) + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
            $scope.dateOfBirthMinDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + (now.getFullYear() - 120);
        }]
    }
}]);
'use strict';

angular.module('ingComponents.forms.dutchZipCode', ['ingComponents.forms.commons'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.dutchZipCode',
            {
                'LBL_DutchZipCode': 'Postcode',
                'TXT_Invalid_Zip_Code': 'Vul hier een postcode in.'
            });
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.dutchZipCode.directive:ing-dutch-zip-code
 * @restrict E
 * @requires ingGlobal
 * @property id mandatory
 * @property name mandatory
 * @property value ng-model of the current controller
 * @description
 * Directive rendering a label and input field for a dutch zip code
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-dutch-zip-code-component id="ingDutchZipCode" name="ingDutchZipCode" value="model.zipCode"></ing-dutch-zip-code-component>
 </div>
 </form>
 */
angular.module('ingComponents.forms.dutchZipCode')
    .directive('ingDutchZipCodeComponent', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        return {
            restrict: 'EA',

            compile: function (tElement, tAttrs) {
                var template = '<input type="text" ing-dutch-zipcode ng-maxlength="7" maxlength="7"/>',
                    element = new componentBuilderFactory.builder(template, 'dutchZipCodeProperties', 'LBL_DutchZipCode')
                        .notify('ingDutchZipcode', 'TXT_Invalid_Zip_Code')
                        .small()
                        .build(tAttrs);
                tElement.append(element);
            },

            controller: ['$scope', function ($scope) {
                $scope.dutchZipCodeProperties = formCommonsUtils.getProperties('ingComponents.forms.dutchZipCode');
            }]
        }
    }]);

'use strict';

angular.module('ingComponents.forms.email', ['ingComponents.forms.commons', 'ingComponents.email'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.email',
            {
                'TXT_Label_Email': 'E-mailadres',
                'TXT_Tooltip_Title': 'E-mailadres',
                'TXT_Tooltip_Text': 'Op dit e-mailadres krijgt u een bevestiging van uw verzoek.',
                'TXT_Max_50_Error': 'Vul een korter e-mailadres in: 50 tekens is het maximum.',
                'TXT_Invalid_Mail': 'Vul hier een e-mailadres in.'
            });
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.ingEmail.directive:ing-email
 * @restrict EA
 * @requires ingGlobal, ingComponents.email
 * @property id mandatory
 * @property name mandatory
 * @property value ng-model of the current controller
 * @description
 * Directive rendering a label and input field for the Email component
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-email id="mail" value="model.mail"></ing-email>
 </div>
 </form>
 */
angular.module('ingComponents.forms.email')
    .directive('ingEmail', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        return {
            restrict: 'EA',

            compile: function (tElement, tAttrs) {
                var template = '<input type="text" ing-email-validation maxlength="50"/>',
                    element = new componentBuilderFactory.builder(template, 'emailProperties', 'TXT_Label_Email')
                        .notify('ingEmailValidation', 'TXT_Invalid_Mail')
                        .infoPopover('emailPopover')
                        .build(tAttrs);
                tElement.append(element);
            },

            controller: ['$scope', function ($scope) {
                $scope.emailProperties = formCommonsUtils.getProperties('ingComponents.forms.email');

                $scope.emailPopover = {
                    title: $scope.emailProperties.TXT_Tooltip_Title,
                    text: $scope.emailProperties.TXT_Tooltip_Text
                }
            }]
        }
    }]);

'use strict';
angular.module('ingComponents.forms.commons').filter('emptyInputFormatter', function () {
    return function inputValue(value) {
        if (value === undefined || value === null || value === '') {
            return '-';
        }
        return value;
    };
});
'use strict';
angular.module('ingComponents.forms.commons').filter('onlyDigits', function () {
    return function inputValue(value) {
        if (value === undefined || value === null) {
            return value;
        }

        return value.replace(/[^0-9]/g, '');
    };
});
'use strict';

/* global angular */
angular.module('ingComponents.forms.houseNumber',['ingComponents.forms.commons']).config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.houseNumber', {
        'MSG_InvalidNumber': 'Vul een geldig huisnummer in.',
        'FIELD_HOUSE_NUMBER': 'Huisnummer'
    });
}]);

'use strict';
angular.module('ingComponents.forms.houseNumber').directive('ingHouseNumber', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'E',
        compile: function (tElement, tAttrs) {
            var KEY_LABEL = 'FIELD_HOUSE_NUMBER';
            var PROPERTY_SERVICE_PROVIDER = 'propertiesHouseNumber';
            var TEMPLATE_HTML = '<input type="text" ing-number ing-only-digits ng-maxlength="5" maxlength="5" ng-trim="false"/>';

            var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                .notify('ingOnlyDigits', 'MSG_InvalidNumber')
                .notify('ingNumber', 'MSG_InvalidNumber')
                .small()
                .build(tAttrs);
            tElement.append(element);
        },
        controller: ['$scope', function ($scope) {
            $scope.propertiesHouseNumber = formCommonsUtils.getProperties('ingComponents.forms.houseNumber');
        }]
    };
}]);
'use strict';

/* global angular */
angular.module('ingComponents.forms.houseNumberAddition', ['ingComponents.forms.commons'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.houseNumberAddition', {
            'label': 'Toevoeging huisnummer'
        });
}]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.houseNumberAddition.directive:ing-house-number-addition
 * @restrict E
 * @requires ingGlobal
 * @property id mandatory
 * @property name mandatory
 * @property value ng-model of the current controller
 * @description
 * Directive rendering a label and input field with validation for the ING house number addition component.
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-house-number-addition id="houseNumberAddition" name="houseNumberAddition" value="model.houseNumberAddition"></ing-house-number-addition>
 </form>
 */
angular.module('ingComponents.forms.houseNumberAddition')
    .directive('ingHouseNumberAddition', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        var PROPERTY_SERVICE_PROVIDER = 'propertiesHouseNumberAddition';

        return {
            restrict: 'EA',

            compile: function (tElement, tAttrs) {
                var TEMPLATE_HTML = '<input type="text" maxlength="6" ing-input-trimmer"/>';
                var KEY_LABEL = 'label';

                var element = new componentBuilderFactory.builder(
                    TEMPLATE_HTML,
                    PROPERTY_SERVICE_PROVIDER,
                    KEY_LABEL)
                    .small()
                    .build(tAttrs);

                tElement.append(element);
            },
            controller: ['$scope', function ($scope) {
                $scope[PROPERTY_SERVICE_PROVIDER] = formCommonsUtils.getProperties('ingComponents.forms.houseNumberAddition');
            }]
        };
    }]);
'use strict';

angular.module('ingComponents.forms.initials',['ingComponents.forms.commons']).config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.initials', {
        'FIELD_Initials': 'Voorletters'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.initials.directive:ing-initials
 * @restrict E
 * @requires ingGlobal
 * @property id mandatory
 * @property name mandatory
 * @property value ng-model of the current controller
 * @description
 * Directive rendering a label and input field that formats the initials of an individual to uppercase (dot-separated).
 * Accepts max 12 characters as input and trims the input to max 6 intials separated by dots. Also prevents illegal input
 * from being typed in the input field.
 *
 * @example
 <example module="ingComponents.initials">
 <file name="index.html">
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-initials id="initialsId" name="initialsName" value="model.initials"></ing-initials>
 </form>
 </file>
 </example>
 */
angular.module('ingComponents.forms.initials').directive('ingInitials', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return  {
        restrict: 'E',
        compile: function (tElement, tAttrs) {
            var KEY_LABEL = 'FIELD_Initials';
            var PROPERTY_SERVICE_PROVIDER = 'initialsProperties';
            var TEMPLATE_HTML = '<input type="text" ing-input-validation="[a-zA-Z\\.]" initials-helper maxlength="12"/>';

            var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                .build(tAttrs);
            tElement.append(element);
        },
        controller: ['$scope', function ($scope) {
            $scope.initialsProperties = formCommonsUtils.getProperties('ingComponents.forms.initials');
        }]
    };
}])

    .directive('initialsHelper', function () {
        return {
            restrict: 'A',
            require: '^ngModel',
            scope: {
                initials: '=ngModel'
            },
            controller: ['$scope', function ($scope) {
                $scope.updateInitials = function () {
                    var viewValue = $scope.initials || '';
                    var letters = viewValue.match(/[a-zA-Z]/g);
                    if (letters) {
                        var withDots = letters.map(angular.uppercase).join('.') + '.';

                        $scope.$apply(function () {
                            $scope.initials = withDots.substr(0, 12);
                        });
                    }
                };
            }],

            link: function (scope, element) {
                // format input after field leave
                element.bind('blur', scope.updateInitials);
                element.bind('keypress', function(event){
                    if(event.keyCode === 8 || event.keyCode === 46){
                        // Backspace and delete are always allowed
                        return;
                    }
                    var characters = event.currentTarget.value.match(/[a-zA-Z]/g);
                    if(characters && characters.length >= 6) {
                        // No more than 6 characters allowed
                        event.preventDefault();
                    }
                });
            }
        }
    });
'use strict';

/* global angular */
angular.module('ingComponents.forms.lastName', ['ingComponents.forms.commons']);

angular.module('ingComponents.forms.lastName').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.lastName', {
        'FIELD_LastName': 'Achternaam',
        'MSG_FirstCharLowerCaseWarning': 'Weet u zeker dat de naam met een kleine letter begint?'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.panama.bsn.directive:ing-last-name
 * @restrict EA
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for LastName.
 * All leading and trailing spaces in the input will be trimmed
 * A warning will show if the name begins with a lowercase character
 *
 * @example
 <example module="ingComponents.panama.lastName">
 <file name="index.html">
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-last-name id="lastName" value="model.lastName" required></ing-last-name>
 </div>
 </form>
 </file>
 </example>
 */
angular.module('ingComponents.forms.lastName')
    .directive('ingLastName', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        return {
            restrict: 'EA',

            compile: function (tElement, tAttrs) {
                var KEY_LABEL = 'FIELD_LastName';
                var PROPERTY_SERVICE_PROVIDER = 'lastNameProperties';
                var TEMPLATE_HTML = '<input type="text" maxlength="25" lower-case-validator ' +
                    'ing-input-trimmer ing-input-validation="{{lastNamePattern}}"/>';

                var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                    .build(tAttrs);
                tElement.append(element);
            },

            controller: ['$scope', function ($scope) {
                $scope.lastNamePattern = '[A-Za-z\u00C4\u00C5\u00C7\u00C9\u00D1\u00D6\u00DF\u00DC\u00E5\u00E2\u00E4\u00E0\u00E1\u00E9\u00EA\u00EB\u00E8\u00E7\u00EF\u00ED\u00EE\u00F1\u00F2\u00F3\u00F4\u00F6\u00FA\u00F9\u00FC\u00FB\u00F8\'-]|\\s';
                $scope.lastNameProperties = formCommonsUtils.getProperties('ingComponents.forms.lastName');
            }]
        }
    }]);
'use strict';
angular.module('ingComponents.forms.lastName')
    .directive('lowerCaseValidator', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            require: '^ingValidationGroup',
            link: function (scope, element, attrs, valGroupCtrl) {
                var el = angular.element(
                    '<div ng-show="state==\'warning\'">' +
                    '<div ing-notification type="warning">' +
                    '<span id="warning-lowercase" ng-bind="lowercaseWarning"></span>' +
                    '</div>' +
                    '</div>');
                $compile(el)(scope);
                element.after(el);

                element.bind('change', function () {
                    // Set the state to warning if the first char is lowercase
                    var isFirstCharLowerCase = scope.isFirstCharLowerCase(this.value);
                    scope.$apply(function () {
                        scope.state = isFirstCharLowerCase ? 'warning' : false;
                        valGroupCtrl.scope.showWarning = isFirstCharLowerCase;
                    });
                });
            },

            controller: ['$scope', 'propertyService', function ($scope, propertyService) {
                $scope.lowercaseWarning = propertyService.property('ingComponents.forms.lastName', 'MSG_FirstCharLowerCaseWarning');

                $scope.isFirstCharLowerCase = function (value) {
                    if (angular.isDefined(value) && value.length) {
                        var firstChar = value.charAt(0);
                        return /[a-z]/.test(firstChar);
                    }
                    return false;
                };
            }]
        }
    }]);

'use strict';

/* global angular */
angular.module('ingComponents.forms.lastNamePrefix', ['ingComponents.forms.commons']);

angular.module('ingComponents.forms.lastNamePrefix').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.lastNamePrefix', {
        'FIELD_LastName_Prefix': 'Tussenvoegsel',
        'MSG_Invalid_LastName_Prefix': 'Het tussenvoegsel niet afkorten: dus ‘van der’ in plaats van ‘v/d’'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.panama.directive:ing-last-name-prefix
 * @restrict EA
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for LastNamePrefix.
 *
 * @example
 <example module="ingComponents.panama.lastNamePrefix">
 <file name="index.html">
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-last-name-prefix id="lastNamePrefix" value="model.lastNamePrefix" required></ing-last-name-prefix>
 </div>
 </form>
 </file>
 </example>
 */
angular.module('ingComponents.forms.lastNamePrefix')
    .directive('ingLastNamePrefix', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        return {
            restrict: 'EA',

            compile: function (tElement, tAttrs) {
                var KEY_LABEL = 'FIELD_LastName_Prefix';
                var PROPERTY_SERVICE_PROVIDER = 'lastNamePrefixProperties';
                var TEMPLATE_HTML = '<input type="text" maxlength="10" last-name-prefix-validator/>';

                var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                    .small()
                    .notify('lastNamePrefixValidity', 'MSG_Invalid_LastName_Prefix')
                    .build(tAttrs);
                tElement.append(element);
            },

            controller: ['$scope', function ($scope) {
                $scope.lastNamePrefixProperties = formCommonsUtils.getProperties('ingComponents.forms.lastNamePrefix');
            }]
        }
    }]);
/**
  * @ngdoc service
  * @name ingComponents.forms.lastNamePrefix.lastNamePrefixService
  *
  * @description
  * Service that contains the standard allowed prefix list
  */

'use strict';
angular.module('ingComponents.forms.lastNamePrefix')
    .factory('lastNamePrefixService', function () {

        var allowedPrefixList = ['\'S', '\'s', '\'T', '\'t', 'A', 'a', 'Aan', 'aan', 'Aan \'t', 'aan \'t', 'Aan de', 'aan de', 'Aan den', 'aan den', 'Aan der', 'aan der', 'Aan het', 'aan het', 'Aan t', 'aan t', 'Af', 'af', 'Al', 'al', 'Am', 'am', 'Am de', 'am de', 'Auf', 'auf', 'Auf dem', 'auf dem', 'Auf den', 'auf den', 'Auf der', 'auf der', 'Auf ter', 'auf ter', 'Aus', 'aus', 'Aus \'m', 'aus \'m', 'Aus dem', 'aus dem', 'Aus den', 'aus den', 'Aus der', 'aus der', 'Aus m', 'aus m', 'Ben', 'ben', 'Bij', 'bij', 'Bij \'t', 'bij \'t', 'Bij de', 'bij de', 'Bij den', 'bij den', 'Bij het', 'bij het', 'Bij t', 'bij t', 'Bin', 'bin', 'Boven d', 'boven d', 'Boven d\'', 'boven d\'', 'D', 'd', 'D\'', 'd\'', 'Da', 'da', 'Dal', 'dal', 'Dal\'', 'dal\'', 'Dalla', 'dalla', 'Das', 'das', 'De', 'de', 'De die', 'de die', 'De die le', 'de die le', 'De l', 'de l', 'De l\'', 'de l\'', 'De la', 'de la', 'De las', 'de las', 'De le', 'de le', 'De van der', 'de van der', 'Deca', 'deca', 'Degli', 'degli', 'Dei', 'dei', 'Del', 'del', 'Della', 'della', 'Den', 'den', 'Der', 'der', 'Des', 'des', 'Di', 'di', 'Die le', 'die le', 'Do', 'do', 'Don', 'don', 'Dos', 'dos', 'Du', 'du', 'El', 'el', 'Het', 'het', 'I', 'i', 'Im', 'im', 'In', 'in', 'In \'t', 'in \'t', 'In de', 'in de', 'In den', 'in den', 'In der', 'in der', 'In het', 'in het', 'In t', 'in t', 'L', 'l', 'L\'', 'l\'', 'La', 'la', 'Las', 'las', 'Le', 'le', 'Les', 'les', 'Lo', 'lo', 'Los', 'los', 'Of', 'of', 'Onder', 'onder', 'Onder \'t', 'onder \'t', 'Onder de', 'onder de', 'Onder den', 'onder den', 'Onder het', 'onder het', 'Onder t', 'onder t', 'Op', 'op', 'Op \'t', 'op \'t', 'Op de', 'op de', 'Op den', 'op den', 'Op der', 'op der', 'Op gen', 'op gen', 'Op het', 'op het', 'Op t', 'op t', 'Op ten', 'op ten', 'Over', 'over', 'Over \'t', 'over \'t', 'Over de', 'over de', 'Over den', 'over den', 'Over het', 'over het', 'Over t', 'over t', 'S', 's', 'S\'', 's\'', 'T', 't', 'Te', 'te', 'Ten', 'ten', 'Ter', 'ter', 'Tho', 'tho', 'Thoe', 'thoe', 'Thor', 'thor', 'To', 'to', 'Toe', 'toe', 'Tot', 'tot', 'Uijt', 'uijt', 'Uijt \'t', 'uijt \'t', 'Uijt de', 'uijt de', 'Uijt den', 'uijt den', 'Uijt te de', 'uijt te de', 'Uijt ten', 'uijt ten', 'Uit', 'uit', 'Uit \'t', 'uit \'t', 'Uit de', 'uit de', 'Uit den', 'uit den', 'Uit het', 'uit het', 'Uit t', 'uit t', 'Uit te de', 'uit te de', 'Uit ten', 'uit ten', 'Unter', 'unter', 'Van', 'van', 'Van \'t', 'van \'t', 'Van de', 'van De', 'van de', 'Van de l', 'van de l', 'Van de l\'', 'van de l\'', 'Van Den', 'Van den', 'van den', 'Van Der', 'Van der', 'van der', 'Van gen', 'van gen', 'Van het', 'van het', 'Van la', 'van la', 'Van t', 'van t', 'Van ter', 'van ter', 'Van van de', 'van van de', 'Ver', 'ver', 'Vom', 'vom', 'Von', 'von', 'Von \'t', 'von \'t', 'Von dem', 'von dem', 'Von den', 'von den', 'Von der', 'von der', 'Von t', 'von t', 'Voor', 'voor', 'Voor \'t', 'voor \'t', 'Voor de', 'voor de', 'Voor den', 'voor den', 'Voor in \'t', 'voor in \'t', 'Voor in t', 'voor in t', 'Vor', 'vor', 'Vor der', 'vor der', 'Zu', 'zu', 'Zum', 'zum', 'Zur', 'zur'];

        function isValidPrefix(prefix) {
            return allowedPrefixList.indexOf(prefix) !== -1;
        }

        return {
            isValidPrefix: isValidPrefix
        };
    });
'use strict';
angular.module('ingComponents.forms.lastNamePrefix')
    .directive('lastNamePrefixValidator', ['utilsService', function (utilsService) {
        return {
            restrict: 'A',
            require: '^ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                function validate(value) {
                    var valid = scope.isValidPrefix(value);
                    modelCtrl.$setValidity('lastNamePrefixValidity', valid);
                    return valid;
                }

                utilsService.addValidator(modelCtrl, validate);
            },

            controller: ['$scope', 'propertyService', 'lastNamePrefixService', function ($scope, propertyService, lastNamePrefixService) {
                $scope.isValidPrefix = function (value) {
                    return !value || value === '' || lastNamePrefixService.isValidPrefix(value);
                };
            }]
        }
    }]);

'use strict';
/**
 * @name ingComponents.directive:ing-input-trimmer
 * @restrict A
 *
 * @description
 * This directive takes care of:
 * - trimming the input when user leaves the field
 *
 * @example
 <input type="text" name="myInput" ing-input-trimmer  ng-model="model.input" />
 */
angular.module('ingComponents.forms.commons')
    .directive('ingInputTrimmer', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                // Trim all spaces before and after value
                element.bind('change', function () {
                    modelCtrl.$setViewValue(this.value.trim());
                    modelCtrl.$render();
                });
            }
        }
    });
'use strict';
angular.module('ingComponents.forms.commons').directive('ingOnlyDigits', ['utilsService', '$filter', function (utilsService, $filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function () {
                var val = ctrl.$viewValue;
                if (utilsService.isEmpty(val)) {
                    return val;
                }
                var value = $filter('onlyDigits')(val);
                if (!angular.equals(val, value)) {
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                }
                return value;
            });
        }
    };
}]);
'use strict';

angular.module('ingComponents.forms.pasnummer', ['ingComponents.forms.commons'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.pasnummer',
            {
                'FIELD_Pasnummer': 'Pasnummer',
                'TOOLTIP_Title_Pasnummer': 'Pasnummer',
                'TOOLTIP_Text_Pasnummer': 'Het pasnummer staat op de voorkant van uw pas.',
                'MSG_Pasnummer_Invalid': 'Dit nummer klopt niet: een pasnummer heeft 3 cijfers, 1 letter en nog eens 3 cijfers. Bijvoorbeeld 123A456.'
            });
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.panama.bsn.directive:ing-pasnummer
 * @restrict EA
 * @requires ingGlobal
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for Pasnummer.
 * The Pasnummer directive will validate if the input is a valid pasnummer
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-pasnummer id="pasnummer" value="model.pasnummer" required></ing-pasnummer>
 </div>
 </form>
 */
angular.module('ingComponents.forms.pasnummer').directive('ingPasnummer', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'EA',

        compile: function(tElement, tAttrs) {
            var template = '<input type="text" ng-pattern="/^[\\d]{3}[A-z][\\d]{3}$/" ing-input-validation="^[0-9\\w]+$" maxlength="7">',
                element = new componentBuilderFactory.builder(template, 'pasnummerProperties', 'FIELD_Pasnummer')
                    .notify('pattern', 'MSG_Pasnummer_Invalid')
                    .infoPopover('pasnummerInfoPopover')
                    .small()
                    .build(tAttrs);
            tElement.append(element);
        },

        controller: ['$scope', function ($scope) {
            var pasnummerProperties = formCommonsUtils.getProperties('ingComponents.forms.pasnummer');
            $scope.pasnummerProperties = pasnummerProperties;

            $scope.pasnummerInfoPopover = {
                title: pasnummerProperties.TOOLTIP_Title_Pasnummer,
                text: pasnummerProperties.TOOLTIP_Text_Pasnummer
            }
        }]
    }
}]);
'use strict';

angular.module('ingComponents.forms.pasvervaldatum', ['ingComponents.forms.commons', 'ngSanitize'])
    .config(['propertyServiceProvider', function (propertyServiceProvider) {
        propertyServiceProvider.add('ingComponents.forms.pasvervaldatum',
            {
                'FIELD_PASVERVALDATUM': 'Pas geldig t/m',
                'TOOLTIP_Title_PasVervalDatum': 'Geldig t/m',
                'TOOLTIP_Text_PasVervalDatum': 'Dit staat op de voorkant van uw pas',
                'MSG_FuncValSingle_PasVervalDatumInvalid': 'Klopt deze datum? Dan is uw pas verlopen. Op <a href="https://www.ing.nl/particulier/betalen/passen/betaalpas/index.html" target="_blank">ING.nl</a> kunt u een nieuwe pas aanvragen',
                'MSG_FuncValSingle_PasVervalError': 'Deze datum klopt niet. De datum moet bestaan uit een maand, een streepje en een jaartal. Bijvoorbeeld 01-2017.'
            });
    }]);
'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.panama.pasvervaldatum.directive:ing-pas-verval-datum
 * @restrict EA
 * @requires ingGlobal
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for pas vervaldatum.
 * The directive will check if the card is still valid and notify the customer in
 * case is has expired.
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-pas-verval-datum id="pasvervaldatum" value="model.pasvervaldatum"></ing-pas-verval-datum>
 </div>
 </form>
 */
angular.module('ingComponents.forms.pasvervaldatum').directive('ingPasVervalDatum', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'EA',
        require: 'ngModel',

        compile: function (tElement, tAttrs) {
            var template = '<input type="text" pas-verval-datum-format ng-pattern="/^(1[0-2]|0[1-9])-(1[89]|[2-9][0-9])\\d\\d$/" ing-input-validation="^[0-9\\-]+$"  pas-verval-min-date maxlength="7">',
                element = new componentBuilderFactory.builder(template, 'pasvervaldatumProperties', 'FIELD_PASVERVALDATUM')
                    .notify('pattern', 'MSG_FuncValSingle_PasVervalError')
                    .notifyHtml('pasVervalMinDate', 'MSG_FuncValSingle_PasVervalDatumInvalid')
                    .infoPopover('pasvervaldatumInfoPopover')
                    .small()
                    .build(tAttrs);
            tElement.append(element);
        },

        controller: ['$scope', function ($scope) {
            var pasvervaldatumProperties = formCommonsUtils.getProperties('ingComponents.forms.pasvervaldatum');

            $scope.pasvervaldatumProperties = pasvervaldatumProperties;
            $scope.pasvervaldatumInfoPopover = {
                title: pasvervaldatumProperties.TOOLTIP_Title_PasVervalDatum,
                text: pasvervaldatumProperties.TOOLTIP_Text_PasVervalDatum
            }
        }]
    }
}]);
'use strict';
angular.module('ingComponents.forms.pasvervaldatum').directive('pasVervalDatumFormat', function () {
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function (scope, element, attrs, ctrl) {

            var formatPassDate = function (dateAsString) {
                // Extract all numbers from the string
                var dateInNumbers = dateAsString ? dateAsString.match(/\d/g) : undefined;
                if (dateInNumbers) {
                    dateInNumbers = dateInNumbers.join('');

                    if (dateInNumbers.length === 6) {
                        return [dateInNumbers.substr(0, 2), dateInNumbers.substr(2, 4)].join('-');
                    }
                }
                return dateAsString;
            };
            ctrl.$parsers.push(function () {
                var value = formatPassDate(ctrl.$viewValue);
                if (value !== ctrl.$viewValue) {
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                }
                return value;
            });

            ctrl.$formatters.push(function () {
                return formatPassDate(ctrl.$modelValue);
            });
        }
    }
});
'use strict';
angular.module('ingComponents.forms.pasvervaldatum')
    .directive('pasVervalMinDate', ['utilsService', function (utilsService) {
        return {
            require: ['ngModel', 'pasVervalMinDate'],
            controller: 'pasVervalMinDateCtrl',

            link: function (scope, element, attrs, ctrls) {
                var modelCtrl = ctrls[0];
                var pasVervalController = ctrls[1];

                function validate(value) {
                    var valid = pasVervalController.isValidPasVervalDate(value);
                    modelCtrl.$setValidity('pasVervalMinDate', valid);
                    return valid;
                }

                utilsService.addValidator(modelCtrl, validate);
            }
        };
    }])

    .controller('pasVervalMinDateCtrl', ['$scope', 'utilsService', 'expressions', function ($scope, utilsService, expressions) {

        // rather not public, but better testable (mockable) and does no harm when invoked by clients
        this.getMinimalDate = function() {
            var now = new Date();
            return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
        };

        /**
         * Checks if the given value is a date, and if so it checks if it is not in the past.
         * @param value The input that will be checked
         * @returns {boolean} If the input can not be parsed to a date, true will be returned (i.e. this validation will be ignored)
         * Only if the date is in the past, this validation will return false.
         */
        this.isValidPasVervalDate = function (value) {
            /*
             * pick a number that is higher than first of the month so the validation always
             * succeeds in case we are in the same month and year
             */
            var notFirstOfMonth = 15;
            var valid;

            if (utilsService.isEmpty(value) || !expressions.validDate.test(notFirstOfMonth + '-' + value.trim())) {
                valid = true;
            } else {
                var dateTokens = value.split('-');
                var minDate = this.getMinimalDate();
                var enteredDate = new Date(dateTokens[1], dateTokens[0] - 1, notFirstOfMonth, 0, 0, 0);
                valid = minDate <= enteredDate;
            }
            return valid;
        };
    }]);
'use strict';

angular.module('ingComponents.forms.phonenumber',['ingComponents.forms.commons']).config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.phonenumber', {
        'FIELD_PhoneNumber': 'Telefoonnummer',
        'MSG_PhoneInvalid': 'Vul een geldig telefoonnummer in'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.phonenumber.directive:ing-phonenumber
 * @restrict E
 * @requires ingGlobal
 * @property id mandatory
 * @property name mandatory
 * @property value ng-model of the current controller
 * @property allowed-country-codes A comma separated list of allowed country codes. If none specified 31 will be used.
 * @description
 * Directive rendering a label and input field that validates the entered phonenumber. Is build upon the existing ing-phone directive.
 *
 * @example
 <example module="ingComponents.phonenumber">
 <file name="index.html">
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-phonenumber id="phonenumberId" name="phonenumberName" value="model.phonenumber"></ing-phonenumber>
 </form>
 </file>
 </example>
 */
angular.module('ingComponents.forms.phonenumber').directive('ingPhoneNumber', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
        return  {
            restrict: 'E',
            compile: function (tElement, tAttrs) {
                var KEY_LABEL = 'FIELD_PhoneNumber';
                var PROPERTY_SERVICE_PROVIDER = 'phoneNumberProperties';
                var allowedCountyCodes = tAttrs.allowedcountrycodes || '';
                var TEMPLATE_HTML = '<input type="text" ing-phone="" ing-input-validation="^[ 0-9\\+()-]+$" allowed-country-codes="' + allowedCountyCodes + '"/>';

                var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                    .notify('ingPhone', 'MSG_PhoneInvalid')
                    .build(tAttrs);
                tElement.append(element);
            },
            controller: ['$scope', function ($scope) {
                $scope.phoneNumberProperties = formCommonsUtils.getProperties('ingComponents.forms.phonenumber');
            }]
        };
    }]);


'use strict';

angular.module('ingComponents.forms.printbutton',[]);

'use strict';

angular.module('ingComponents.forms.printbutton')
    .directive('ingPrintBtn', function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'endpoint': '@',
                'data': '=',
                'template': '@',
                'version': '@?',
                'label' : '@label'
            },

            template: '<form action="{{getPrintUrl()}}" method="post" id="print">' +
            '<input type="hidden" name="data" value="{{data}}"/>' +
            '<input type="hidden" name="XSRF_TOKEN" value="{{xsrfToken}}"/>' +
            '<button id="pdfLink" type="submit" class="btn btn-primary">{{label}}</button>' +
            '</form>',

            controller: 'PrintButtonCtrl'
        }
    }).controller('PrintButtonCtrl', ['$scope', '$http', '$sce',
        function ($scope, $http, $sce) {
            $http.get($scope.endpoint + '/status', {
                withCredentials: true
            }).success(function () {
                $scope.xsrfToken = $scope.getCookie('XSRF-TOKEN');
            });
            $scope.getCookie = function (name) {
                name += '=';
                for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--) {
                    if (!ca[i].indexOf(name)) {
                        return ca[i].replace(name, '');
                    }
                }
            };
            $scope.getPrintUrl = function () {
                var printUrl = $scope.endpoint + '/' + $scope.template;
                if (angular.isDefined($scope.version)) {
                    printUrl = printUrl + '?version=' + $scope.version;
                }
                return $sce.trustAsResourceUrl(printUrl);
            }
        }]);

'use strict';

/* global angular */
angular.module('ingComponents.forms.street', ['ingComponents.forms.commons']);

angular.module('ingComponents.forms.street').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.street', {
        'FIELD_Street': 'Straat'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.street.directive:ing-street
 * @restrict EA
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive rendering a label and input field for Street.
 * All leading and trailing spaces in the input will be trimmed
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-street id="street" value="model.street" required></ing-street>
 </div>
 </form>
 */
angular.module('ingComponents.forms.street').directive('ingStreet', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'EA',

        compile: function (tElement, tAttrs) {
            var KEY_LABEL = 'FIELD_Street';
            var PROPERTY_SERVICE_PROVIDER = 'streetProperties';
            var TEMPLATE_HTML = '<input type="text" maxlength="150" ing-input-trimmer />';

            var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                .build(tAttrs);
            tElement.append(element);
        },

        controller: ['$scope', function ($scope) {
            $scope.streetProperties = formCommonsUtils.getProperties('ingComponents.forms.street');
        }]
    }
}]);
'use strict';

/* global angular */
angular.module('ingComponents.forms.username', ['ingComponents.forms.commons']);

angular.module('ingComponents.forms.username').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.forms.username', {
        'MSG_Invalid_Username' : 'Vul een geldige gebruikersnaam in.',
        'FIELD_Username': 'Gebruikersnaam'
    });
}]);

'use strict';
/**
 * @ngdoc directive
 * @name ingComponents.forms.username.directive:ing-username
 * @restrict EA
 * @property id mandatory
 * @property value model on the scope of the current controller
 * @description
 * Directive for rendering a username with a default label
 *
 * @example
 <form name="form" class="form-horizontal">
 <div ing-validation-group class="form-group">
 <ing-username id="username" value="model.username" required></ing-username>
 </div>
 </form>
 */
angular.module('ingComponents.forms.username').directive('ingUsernameComponent', ['componentBuilderFactory', 'formCommonsUtils', function (componentBuilderFactory, formCommonsUtils) {
    return {
        restrict: 'EA',

        compile: function (tElement, tAttrs) {
            var KEY_LABEL = 'FIELD_Username';
            var PROPERTY_SERVICE_PROVIDER = 'usernameProperties';
            var TEMPLATE_HTML = '<input type="text" ing-username maxlength="20" />';

            var element = new componentBuilderFactory.builder(TEMPLATE_HTML, PROPERTY_SERVICE_PROVIDER, KEY_LABEL)
                .notify('ingUsername', 'MSG_Invalid_Username')
                .build(tAttrs);
            tElement.append(element);
        },

        controller: ['$scope', function ($scope) {
            $scope.usernameProperties = formCommonsUtils.getProperties('ingComponents.forms.username');
        }]
    }
}]);
'use strict';
angular.module('ingComponents.forms.commons')
    .factory('componentBuilderFactory', ['utilsService', function (utilsService) {
        /**
         * Construct a new component builder
         * @param template The template which contains the component specific html
         * @param propertiesScopeName The name of the properties object on the scope
         * @param labelKey The key of the label in the propertyServiceProvider
         * @param requiredErrorKey The key of the label in the propertyServiceProvider that contains the required message
         */
        function Builder(template, propertiesScopeName, labelKey, requiredErrorKey) {
            var self = this;
            this.template = template;
            this.notifies = [];
            this.infoPopoverScopeName = '';
            this.small = false;
            this.requiredErrorKey = utilsService.isEmpty(requiredErrorKey) ? 'MSG_Required' : requiredErrorKey;

            function formatPropertyExpression(key) {
                return '{{' + propertiesScopeName + '[\'' + key + '\']}}';
            }

            function setNotification(key, validate, html) {
                var binding = html ? 'ng-bind-html' : 'ng-bind';
                var msg = angular.element('<span />').attr(binding, propertiesScopeName + '.' + key),
                    notify = angular.element('<div ing-notify />').attr('validate', validate),
                    notification = angular.element('<div ing-notification type="error" />');

                notification.append(msg);
                notify.append(notification);

                self.notifies.push(notify);
                return self;
            }

            /**
             * Add an ing-notify with given validate property and message (it assumes all messages are attached to `propertiesScopeName`
             * @param validate The validation property that will be rendered in the validate attribute of the ing notify directive
             * @param key The key of the message in the propertyServiceProvider that contains the validation message
             * @returns {Builder}
             */
            this.notify = function (validate, key) {
                var htmlNotification = false;
                return setNotification(key, validate, htmlNotification);
            };

            /**
             * Add an ing-notify with html tag support with given validate property and message (it assumes all messages are attached to `propertiesScopeName`
             * Make sure your component injects the ngSanitize dependency if you call this method.
             * @param validate The validation property that will be rendered in the validate attribute of the ing notify directive
             * @param key The key of the message in the propertyServiceProvider that contains the validation message
             * @returns {Builder}
             */
            this.notifyHtml = function (validate, key) {
                var htmlNotification = true;
                return setNotification(key, validate, htmlNotification);
            };

            /**
             * Add an infoPopOver to the component
             * @param infoPopoverScopeName The name of the config object on the scope
             * The config object must contain a title and a text
             */
            this.infoPopover = function (infoPopoverScopeName) {
                self.infoPopoverScopeName = infoPopoverScopeName;
                return self;
            };

            /**
             * Configure the builder to use css classes for smaller components
             * Otherwise the max width will be used
             * @returns {Builder}
             */
            this.small = function() {
                self.small = true;
                return self;
            };

            /**
             * Build the DOM element using the given attributes.
             * @param attrs The attrs of the compile function of the directive
             * @returns {*}
             */
            this.build = function (attrs) {
                if (angular.isUndefined(attrs.id)) {
                    throw new Error('attribute "id" is required');
                }
                // Validate if the value attribute is available
                if (!('value' in attrs)) {
                    throw new Error('attribute "value" is required');
                }

                var id = attrs.id + '-input',
                    name = id,
                    label = angular.isDefined(attrs.label) ? attrs.label : formatPropertyExpression(labelKey),
                    required = angular.isDefined(attrs.required),
                    element;

                var formRow = angular.element('<div ing-form-row />')
                    .attr('label', label)
                    .attr('for', name);

                // Return a simple p if the read-only attribute is passed to the directive
                if(angular.isDefined(attrs.readOnly)){
                    element = angular.element('<p class="form-control-static"/>')
                        .attr('ng-bind', attrs.value + ' | emptyInputFormatter')
                        .attr('id', id);
                    formRow.append(element);
                    return formRow;
                }

                // Add posibility to override the tooltip by defining a tooltip attribute on directive
                self.infoPopoverScopeName = attrs.tooltip || self.infoPopoverScopeName;
                // If tooltip is in the attributes but it's defined as empty, don't show it
                if (!utilsService.isEmpty(self.infoPopoverScopeName) && !('tooltip' in attrs && attrs.tooltip === '')) {
                    formRow.attr('info-popover', self.infoPopoverScopeName);
                }

                element = angular.element(template)
                    .attr('id', id)
                    .attr('name', name)
                    .attr('ng-model', attrs.value);
                element.addClass('form-control');

                if (required) {
                    element.attr('ing-required', '');
                    self.notify('ingRequired', self.requiredErrorKey);
                }

                if(attrs.placeholder){
                    element.attr('ing-placeholder', attrs.placeholder);
                }

                // If events are defined (call/on) for this element, add them
                angular.forEach(['ngFocus', 'ngEnter', 'ngBlur'], function(event) {
                    if(event in attrs) {
                        var eventSnakeStyle = event.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2');
                        element.attr(eventSnakeStyle, attrs[event]);
                    }
                });

                //Validate if the component type is small
                if (self.small === true) {
                    var row = angular.element('<div class="row"/>');
                    var colRow = angular.element('<div class="col-lg-6 col-xs-12"/>');
                    colRow.append(element);
                    row.append(colRow);
                    formRow.append(row);
                } else {
                    formRow.append(element);
                }

                angular.forEach(self.notifies, function (notify) {
                    notify.attr('on-element', name);
                    formRow.append(notify);
                });
                return formRow;
            };
        }

        return {
            builder: Builder
        }
    }]);
'use strict';
angular.module('ingComponents.forms.commons')
    .directive('ingInputValidation', function(){
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                $scope.isValidChar = function (pattern, character) {
                    if (character === 0) {
                        return true;
                    }
                    var letter = String.fromCharCode(character);
                    return (letter.match(pattern) !== null);
                };
            }],
            link: function (scope, element, attrs) {
                 if(attrs.ingInputValidation === '') {
                    throw new Error('Please define a pattern as a constructor arg');
                }

                // only allow certain characters
                element.bind('keypress', function (event) {
                    if (event && scope.isValidChar(attrs.ingInputValidation, event.charCode)) {
                        return true;
                    }
                    event.preventDefault();
                    return false;
                });
            }
        }
    });



