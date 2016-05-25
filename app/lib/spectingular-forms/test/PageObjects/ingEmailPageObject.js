var genericPageObject = require('./ingGenericInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * IngMail fixture that exposes all the components used by the IngCity directive.
 * @param id The id of the IngCity element.
 * @constructor
 */
var IngEmail = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    var genericPageObjectObject = new genericPageObject(id);
    genericPageObjectObject.extend(this);

    this.invalidEmailError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath(".//div[@validate='ingEmailValidation']")));
    };
};

module.exports = IngEmail;
