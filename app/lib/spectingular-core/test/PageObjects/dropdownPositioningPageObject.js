'use strict';

var dropdownPositioningPage = function () {
    browser.get('directives/dropdownPositioning.html');
};

dropdownPositioningPage.prototype = Object.create({}, {
    dropbox1: { get: function () { return element(by.id('dropbox1')); }},
    dropbox2: { get: function () { return element(by.id('dropbox2')); }},
    dropbox3: { get: function () { return element(by.id('dropbox3')); }},
});

module.exports = dropdownPositioningPage;
