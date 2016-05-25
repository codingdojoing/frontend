exports = module.exports = {
    isVisible: function (element) {
        var d = protractor.promise.defer();
        element.getCssValue('display').then(function (display) {
            d.fulfill(display !== 'none');
        });
        return d.promise;
    },
    isActive: function (element) {
        var d = protractor.promise.defer();
        element.getAttribute('class').then(function (classes) {
            d.fulfill(classes.indexOf('active') > -1);
        });
        return d.promise;
    },
    hasClasses: function (element, classesToMatch) {
        var d = protractor.promise.defer();
        element.getAttribute('class').then(function (classes) {
            var result = true;
            for (i = 0; i < classesToMatch.length; i++) {
                if (classes.indexOf(classesToMatch[i]) === -1) {
                    result = false;
                }
            }
            d.fulfill(result);
        });
        return d.promise;
    },
    hasClass: function (element, className) {
        var d = protractor.promise.defer();
        element.getAttribute('class').then(function (classes) {
            d.fulfill(classes.indexOf(className) > -1);
        });
        return d.promise;
    },
    tagName: function (element) {
        var d = protractor.promise.defer();
        element.getTagName().then(function (tagName) {
            d.fulfill(tagName);
        });
        return d.promise;
    },
    getText: function (element) {
        var d = protractor.promise.defer();
        element.getText().then(function (text) {
            d.fulfill(text);
        });
        return d.promise;
    },
    getAttribute: function (element, attribute) {
        var d = protractor.promise.defer();
        element.getAttribute(attribute).then(function (value) {
            d.fulfill(value);
        });
        return d.promise;
    },
    enterValue: function (element, value) {
        var d = protractor.promise.defer();
        element.sendKeys(value).then(function () {
            d.fulfill();
        });
        return d.promise;
    },
    clear: function (element) {
        var d = protractor.promise.defer();
        element.clear().then(function () {
            d.fulfill();
        });
        return d.promise;
    }
};