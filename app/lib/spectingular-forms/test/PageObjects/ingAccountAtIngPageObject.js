var defaultPageObject = require('./defaultPageObject');

/**
 * AccountAtIng fixture that exposes all the components used by the AccountAtIng directive.
 * @param id The id of the AccountAtIng element.
 * @constructor
 */
var AccountAtIng = function (id) {

    this.id = id;
    this.element = element(by.id(id) + 'FormRow');

    this.inputElement = function () {
        return new AccountAtIngInputField(id, this.element);
    };

};

var AccountAtIngInputField = function (id, elm) {
    this.id = id;

    this.enterYes = function () {
        element(by.xpath('//input[@id=\'' + this.id + '0\']/../span[1]')).click();
    };

    this.enterNo = function () {
        element(by.xpath('//input[@id=\'' + this.id + '1\']/../span[1]')).click();
    };

    this.isVisible = function () {
        return new defaultPageObject.InputPageObject(elm).isVisible();
    };
};

module.exports = AccountAtIng;
