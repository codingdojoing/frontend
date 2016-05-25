var utils = require('./UtilityPageObject');

/**
 * ingServicePhoneInfo fixture that exposes all the components used by the ingServicePhoneInfo directive.
 * @param id The id of the ingServicePhoneInfo element.
 * @constructor
 */
var ServicePhoneInfo = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    this.currentServicePhoneLabel = function () {
        return new ServicePhoneInfoCurrentServicePhoneLabel(this.element.element(by.css('.control-label span')));
    };

    this.servicePhoneDisplay = function () {
        return new ServicePhoneInfoServicePhoneDisplay(this.element.element(by.css('.form-control-static')));
    };

    this.servicePhoneChangeLink = function () {
        return new ServicePhoneInfoServicePhoneChangeLink(this.element.element(by.css('#phoneChangeLink')));
    };

    this.servicePhoneInputField = function () {
        return new ServicePhoneInfoServicePhoneInputField(this.element.element(by.css('#servicePhoneInput')));
    };

    this.servicePhoneCancelLink = function () {
        return new ServicePhoneInfoServicePhoneCancelLink(this.element.element(by.css('#phoneCancelLink')));
    };

    this.servicePhoneSaveButton = function () {
        return new ServicePhoneInfoSaveButton(this.element.element(by.css('#savePhoneNumber')));
    };

    this.servicePhoneError = function () {
        return new ServicePhoneInfoError(this.element.element(by.css('#errorNotification')));
    };

    this.servicePhoneSuccesMessage = function () {
        return new ServicePhoneInfoSuccesMessage(this.element.element(by.css('#succesNotification')));
    };

    this.servicePhoneAddNewServicePhoneLink = function () {
        return new ServicePhoneInfoServicePhoneAddNewServicePhoneLink(this.element.element(by.css('#enterNewPhoneNumber')));
    };

    this.modal = function () {
        return new ServicePhoneInfoModal(element(by.css('.overlay-content')));
    };

    this.newServicePhoneLabel = function () {
        return new ServicePhoneInfoNewServicePhoneLabel(element(by.css('#newPhoneNumberLabel')));
    };

    this.newServicePhoneInputField = function () {
        return new ServicePhoneInfoNewServicePhoneInputField(element(by.css('#servicePhoneNumber')));
    };

    this.newServicePhoneCommercialOffersCheckbox = function () {
        return new ServicePhoneInfoNewServicePhoneCommercialOffersCheckbox(element(by.css('#servicePhoneOffersCheckbox')));
    };

    this.newServicePhoneCancelLink = function () {
        return new ServicePhoneInfoNewServicePhoneCancelLink(element(by.css('#phoneNumberCancelLink')));
    };

    this.newServicePhoneSaveButton = function () {
        return new ServicePhoneInfoNewServicePhoneSaveButton(element(by.css('#phoneNumberSaveButton')));
    };

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.changeAndSaveServicePhoneNumber = function(newServicePhone) {
        this.servicePhoneChangeLink().click();
        this.servicePhoneInputField().clear();
        this.servicePhoneInputField().enterValue(newServicePhone);
        this.servicePhoneSaveButton().click();
    };

    this.enterAndSaveNewServicePhoneNumber = function(newServicePhone) {
        this.servicePhoneAddNewServicePhoneLink().click();
        this.newServicePhoneInputField().clear();
        this.newServicePhoneInputField().enterValue(newServicePhone);
        this.newServicePhoneSaveButton().click();
    };

};

var ServicePhoneInfoCurrentServicePhoneLabel = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

};

var ServicePhoneInfoServicePhoneDisplay = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var ServicePhoneInfoServicePhoneChangeLink = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.click = function () {
        this.element.click();
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var ServicePhoneInfoServicePhoneCancelLink = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.click = function () {
        this.element.click();
    };
};
var ServicePhoneInfoSaveButton = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.click = function () {
        this.element.click();
    };

};

var ServicePhoneInfoServicePhoneInputField = function (element) {
    this.element = element;

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.hasClass = function (classToMatch) {
        return utils.hasClass(this.element, classToMatch);
    };

    this.enterValue = function (value) {
        return utils.enterValue(this.element, value);
    };

    this.clear = function () {
        return utils.clear(this.element);
    };

};

var ServicePhoneInfoError = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var ServicePhoneInfoSuccesMessage = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var ServicePhoneInfoServicePhoneAddNewServicePhoneLink = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.click = function () {
        this.element.click();
    };

};

var ServicePhoneInfoModal = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var ServicePhoneInfoNewServicePhoneLabel = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

};

var ServicePhoneInfoNewServicePhoneInputField = function (element) {
    this.element = element;

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.hasClass = function (classToMatch) {
        return utils.hasClass(this.element, classToMatch);
    };

    this.enterValue = function (value) {
        return utils.enterValue(this.element, value);
    };

    this.clear = function () {
        return utils.clear(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var ServicePhoneInfoNewServicePhoneCommercialOffersCheckbox = function (element) {
    this.element = element;

    this.getText = function (attribute) {
        return utils.getText(this.element);
    };

};

var ServicePhoneInfoNewServicePhoneSaveButton = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.click = function () {
        this.element.click();
    };

};

var ServicePhoneInfoNewServicePhoneCancelLink = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.getAttribute = function (attribute) {
        return utils.getAttribute(this.element, attribute);
    };

    this.click = function () {
        this.element.click();
    };

};

exports = module.exports = {
    ServicePhoneInfo: ServicePhoneInfo
};