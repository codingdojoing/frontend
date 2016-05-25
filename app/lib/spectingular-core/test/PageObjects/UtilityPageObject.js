exports = module.exports = {
    map: function (promise, f) {
        var d = protractor.promise.defer();
        promise.then(function(x) {
            d.fulfill(f(x));
        });
        return d.promise;
    },
    isVisible: function (element) {
			var defer = protractor.promise.defer();
			element.isPresent().then(function (isPresent) {
				if (isPresent) {
					element.isDisplayed().then(function (isDisplayed) {
						defer.fulfill(isDisplayed);
					});
				} else {
					defer.fulfill(false);
				}
			});
			return defer;
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
    hasNoClass: function (element, className) {
        var d = protractor.promise.defer();
        element.getAttribute('class').then(function (classes) {
            d.fulfill(classes.indexOf(className) === -1);
        });
        return d.promise;
    },
    tagName: function (element) {
        var d = protractor.promise.defer();
        element.getTagName().then(function (tagName) {
            d.fulfill(tagName);
        });
        return d.promise;
    }
};