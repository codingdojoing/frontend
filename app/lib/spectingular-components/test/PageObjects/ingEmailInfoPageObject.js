var utils = require('./UtilityPageObject');

/**
 * ingEmailInfo fixture that exposes all the components used by the ingEmailInfo directive.
 * @param id The id of the ingEmailInfo element.
 * @constructor
 */
var EmailInfo = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    this.currentEmailAddressLabel = function () {
        return new EmailInfoCurrentEmailAddressLabel(this.element.element(by.css('.control-label span')));
    };

    this.emailAddressDisplay = function () {
        return new EmailInfoEmailAddressDisplay(this.element.element(by.css('.form-control-static')));
    };

    this.emailAddressChangeLink = function () {
        return new EmailInfoEmailAddressChangeLink(this.element.element(by.css('#emailChangeLink')));
    };

    this.emailAddressInputField = function () {
        return new EmailInfoEmailAddressInputField(this.element.element(by.css('#emailInput')));
    };

    this.emailAddressCancelLink = function () {
        return new EmailInfoEmailAddressCancelLink(this.element.element(by.css('#emailCancelLink')));
    };

    this.emailAddressSaveButton = function () {
        return new EmailInfoSaveButton(this.element.element(by.css('#saveEmailAddress')));
    };

    this.emailAddressError = function () {
        return new EmailInfoError(this.element.element(by.css('#errorNotification')));
    };

    this.emailAddressSuccesMessage = function () {
        return new EmailInfoSuccesMessage(this.element.element(by.css('#succesNotification')));
    };

    this.emailAddressWarning = function () {
        return new EmailInfoWarning(this.element.element(by.css('#undeliverableNotification')));
    };

    this.emailAddressAddNewEmailLink = function () {
        return new EmailInfoEmailAddressAddNewEmailLink(this.element.element(by.css('#enterNewEmailAddress')));
    };

    this.modal = function () {
        return new EmailInfoModal(element(by.css('.overlay-content')));
    };

    this.newEmailAddressLabel = function () {
        return new EmailInfoNewEmailAddressLabel(element(by.css('#newEmailAdressLabel')));
    };

    this.newEmailAddressInputField = function () {
        return new EmailInfoNewEmailAddressInputField(element(by.css('#emailAddress')));
    };

    this.newEmailCommercialOffersCheckbox = function () {
        return new EmailInfoNewEmailCommercialOffersCheckbox(element(by.css('#emailOffersCheckbox')));
    };

    this.newEmailCancelLink = function () {
        return new EmailInfoNewEmailCancelLink(element(by.css('#emailcancelLink')));
    };

    this.newEmailSaveButton = function () {
        return new EmailInfoNewEmailSaveButton(element(by.css('#emailSaveButton')));
    };

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.changeAndSaveEmailAddress = function(newEmailAddress) {
        this.emailAddressChangeLink().click();
        this.emailAddressInputField().clear();
        this.emailAddressInputField().enterValue(newEmailAddress);
        this.emailAddressSaveButton().click();
    };

    this.enterAndSaveNewEmailAddress = function(newEmailAddress) {
        this.emailAddressAddNewEmailLink().click();
        this.newEmailAddressInputField().clear();
        this.newEmailAddressInputField().enterValue(newEmailAddress);
        this.newEmailSaveButton().click();
    };

};

var EmailInfoCurrentEmailAddressLabel = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

};

var EmailInfoEmailAddressDisplay = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var EmailInfoEmailAddressChangeLink = function (element) {
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

var EmailInfoEmailAddressCancelLink = function (element) {
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
var EmailInfoSaveButton = function (element) {
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

var EmailInfoEmailAddressInputField = function (element) {
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

var EmailInfoError = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var EmailInfoSuccesMessage = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var EmailInfoWarning = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var EmailInfoEmailAddressAddNewEmailLink = function (element) {
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

var EmailInfoModal = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

};

var EmailInfoNewEmailAddressLabel = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

};

var EmailInfoNewEmailAddressInputField = function (element) {
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

var EmailInfoNewEmailCommercialOffersCheckbox = function (element) {
    this.element = element;

    this.getText = function (attribute) {
        return utils.getText(this.element);
    };

};

var EmailInfoNewEmailSaveButton = function (element) {
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

var EmailInfoNewEmailCancelLink = function (element) {
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
    EmailInfo: EmailInfo
};