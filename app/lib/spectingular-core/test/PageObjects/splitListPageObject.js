/**
 * Page object for the ing-splitlist.
 * @constructor
 */

var Splitlist = function (url) {
    browser.get(url);
};

Splitlist.prototype = Object.create({}, {
    splitlist:      {value: function (id) { return waitForElement(element(by.id('splitlist'+ id)));}},

    listAElements:  { value: function (id) { return waitForElementList(this.splitlist(id).all(by.repeater('item in splitList.A')));}},
    listAContainer: { value: function (id) { return waitForElementList(this.splitlist(id).all(by.css('*[ing-split-list-a]')));}},
    listBElements:  { value: function (id) { return waitForElementList(this.splitlist(id).all(by.repeater('item in splitList.B')));}},
    listBContainer: { value: function (id) { return waitForElementList(this.splitlist(id).all(by.css('*[ing-split-list-b]')));}},
    moreButton:     { value: function (id) { return waitForElement(this.splitlist(id).all(by.css('*[ing-split-more-item]')).get(0).element(by.css('*[ing-split-focus-element]')));}},

    hasClass: {value: function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes[0].split(' ').indexOf(cls) !== -1;
        });
    }},
    hasStyle: {value: function (element, styleName) {
        var d = protractor.promise.defer();
        element.getAttribute('style').then(function (styles) {
            d.fulfill(styles.indexOf(styleName) > -1);
        });
        return d.promise;
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
    Splitlist: Splitlist
};