var utils = require('./UtilityPageObject');

/**
 * Wizard fixture that exposes all the components used by the wizard directive.
 * @param id The id of the wizard.
 * @constructor
 */
var Wizard = function (id) {
    this.id = id;
    this.element = element(by.id(id));

    this.header = function () {
        return this.element.element(by.css('.panel-heading'));
    }

    this.content = function () {
        return this.element.element(by.css('.ing-wizard-content'));
    }

    this.breadcrumb = function () {
        return new WizardBreadcrumb(this.header().element(by.css('.pagination-steps')));
    }

    this.steps = function () {
        return new WizardSteps(this.content().element(by.css('.ing-wizard-steps')));
    }

    this.footer = function () {
        return new WizardFooter(this.content().element(by.css('.ing-wizard-footer')));
    }

    this.navigatorNext = function () {
        return this.footer().navigator(1);
    }

    this.navigatorPrevious = function () {
        return this.footer().navigator(0);
    }

    this.hasClass = function (classToMatch) {
        return utils.hasClass(this.element, classToMatch);
    }
}

/**
 * Gets the wizard breadcrumb.
 * @param breadcrumb The breadcrumb element.
 * @constructor
 */
var WizardBreadcrumb = function (breadcrumb) {
    this.element = breadcrumb;

    this.numberOfItems = function () {
        return this.element.all(by.css('li')).count();
    }

    this.item = function (index) {
        return new WizardBreadcrumbItem(this.element.all(by.css('li')).get(index));
    }
}

/**
 * Gets a specific wizard breadcrumb item.
 * @param item The breadcrumb item.
 * @constructor
 */
var WizardBreadcrumbItem = function (item) {
    this.element = item;

    this.clickable = function () {
        var d = protractor.promise.defer();
        utils.hasClasses(this.element.element(by.css('a')), ['ng-hide']).then(function (result) {
            d.fulfill(!result);
        });
        return d.promise;
    }

    this.visible = function () {
        return utils.isVisible(this.element);
    }

    this.active = function () {
        return utils.isActive(this.element);
    }

    this.hasClasses = function (classesToMatch) {
        return utils.hasClasses(this.element, classesToMatch);
    }
}

/**
 * Gets the wizard steps.
 * @param steps The steps.
 * @constructor
 */
var WizardSteps = function (steps) {
    this.element = steps;

    this.count = function () {
        return this.element.all(by.css('.ing-wizard-step')).count();
    }

    this.step = function (index) {
        return new WizardStep(this.element.all(by.css('.ing-wizard-step ')).get(index));
    }
}

/**
 * Gets a specific wizard step.
 * @param step The step.
 * @constructor
 */
var WizardStep = function (step) {
    this.element = step;

    this.id = function () {
        return this.element.getAttribute('id');
    }

    this.hasClass = function (classToMatch) {
        return utils.hasClass(this.element, classToMatch);
    }

    this.hasClasses = function (classesToMatch) {
        return utils.hasClasses(this.element, classesToMatch);
    }
}

/**
 * Gets the wizard footer.
 * @param footer The footer.
 * @constructor
 */
var WizardFooter = function (footer) {
    this.element = footer;

    this.navigator = function (index) {



        return new WizardNavigator(this.element.all(by.tagName('button')).get(index));
    }

    this.hasClass = function (classToMatch) {
        return utils.hasClass(this.element, classToMatch);
    }
}

/**
 * Gets a specific wizard navigator.
 * @param navigator The navigator.
 * @constructor
 */
var WizardNavigator = function (navigator) {
    this.element = navigator;

    this.visible = function () {
        return utils.isVisible(this.element);
    }

    this.navigate = function () {
        this.element.click();
    }
}

exports = module.exports = {
    Wizard: Wizard
};