var utils = require('./UtilityPageObject');

/**
* toggle fixture that exposes all the components used by the toggle directive.
* @constructor
*/

var Toggle = function (id) {
    this.id = id;
    this.container = element(by.id(id));
    this.invoker = this.container.element(by.css('[ing-toggle-invoker]'));
    this.content = this.container.element(by.css('[ing-toggle-content]'));
    this.outside = element(by.id('outside'));
    /**
     * State
     */

    this.hasAttrValue = function(element, attr, val) {
        var d = protractor.promise.defer();
        element.getAttribute(attr).then(function (attrVal) {
            d.fulfill(val.indexOf(attrVal) > -1);
        });
        return d.promise;
    };

    /**
     * User interaction
     */

    this.getInvoker = function () {
        return this.invoker;
    };

    this.toggle = function () {
        this.invoker.click();
    };

    this.clickOutside = function() {
        this.outside.click();
    };

};

var waitForElement = function(e) {
    browser.driver.wait(function() {
        // Return a condition. Code will continue to run until is true
        return  e.isPresent().then(function(bl) {
            return bl;
        }, function(err) {
            throw err;
        });
    }, 1500, 'Error: Timed out waiting for element to appear');
    return e;
};

var waitForElementList = function(e) {
    browser.driver.wait(function() {
        // Return a condition. Code will continue to run until is true
        return  e.get(0).isPresent().then(function(bl) {
            return bl;
        }, function(err) {
            throw err;
        });
    }, 1500, 'Error: Timed out waiting for elements to appear');
    return e;
};

exports = module.exports = {
    Toggle: Toggle
};