var defaultPageObject = require('./defaultPageObject');

/**
 * Gender fixture that exposes all the components used by the Gender directive.
 * @param id The id of the Gender element.
 * @constructor
 */
var Gender = function (id) {

    this.id = id;
    this.element = element(by.id(id + 'FormRow'));

    this.inputElement = function () {
        return new GenderInputField(id, this.element);
    };

};

var GenderInputField = function (id, elm) {

    this.genderId = id;
    this.elm = elm;
    this.enterMale = function () {
        element(by.xpath('//input[@id=\'' + this.genderId + 'M\']/../span[1]')).click();
    };

    this.enterFemale = function () {
        element(by.xpath('//input[@id=\'' + this.genderId + 'F\']/../span[1]')).click();
    };

    this.isVisible = function () {
        return new defaultPageObject.InputPageObject(this.elm).isVisible();
    };
};
module.exports = Gender;
