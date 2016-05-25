/**
 * Page object for the ing-ribbon.
 * @constructor
 */

var Ribbon = function () {

};

Ribbon.prototype = Object.create({}, {
    listAElements:   { get: function () { return waitForElementList(element.all(by.repeater('item in splitList.A')));}},
    listAContainer:  { get: function () { return waitForElementList(element.all(by.css('*[ing-split-list-a]')));}},
    listBElements:   { get: function () { return waitForElementList(element.all(by.repeater('item in splitList.B')));}},
    listBContainer:  { get: function () { return waitForElementList(element.all(by.css('*[ing-split-list-b]')));}},
    moreButton:      { get: function () { return waitForElement(element(by.css('*[ing-split-more-item]')));}},

    hasClass: {value: function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes[0].split(' ').indexOf(cls) !== -1;
        });
    }}

});

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
    Ribbon: Ribbon
};