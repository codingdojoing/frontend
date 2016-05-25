var utils = require('./UtilityPageObject');

/**
 * ingCorrespondenceAddressInfo fixture that exposes all the components used by the ingCorrespondenceAddressInfo directive.
 * @param id The id of the ingCorrespondenceAddressInfo element.
 * @constructor
 */
var CorrespondenceAddressInfo = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    this.currentAddressLabel = function () {
        return new CorrespondenceAddressInfoCurrentAddressLabel(this.element.element(by.css('.control-label span')));
    };

    this.currentAddressAddressLines = function () {
        return new CorrespondenceAddressInfoCurrentAddressAddressLines(this.element.all(by.repeater('addressLine in data.addressLines')));
    };

    this.currentAddressAddressLines = function () {
        return new CorrespondenceAddressInfoCurrentAddressAddressLines(this.element.all(by.repeater('addressLine in data.addressLines')));
    };

    this.changeLink = function () {
        return this.element.element(by.css('#addressChangeLink'));
    };

    this.changeLinkDescription = function () {
        return this.element.element(by.css('#addressChangeLinkDescription'));
    };

    this.notification = function (statePrefix) {
        return this.element.element(by.css('#' + statePrefix + 'Notification'));
    };

    this.changeAddressMessage = function () {
        return this.element.element(by.css('#changeAddressMessage'));
    };

    this.helpBlock = function () {
        return this.element.element(by.id('showDescription'));
    };

    this.getText = function () {
        return utils.getText(this.element);
    };

};

var CorrespondenceAddressInfoCurrentAddressLabel = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

};

var CorrespondenceAddressInfoCurrentAddressAddressLines = function (elements) {
    this.elements = elements;
};

exports = module.exports = {
    CorrespondenceAddressInfo: CorrespondenceAddressInfo
};