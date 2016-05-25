var genericPageObject = require('./ingGenericInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * ingDateOfBirth fixture that exposes all the components used by the ingDateOfBirth directive.
 * @param id The id of the ingDateOfBirth element.
 * @constructor
 */
var IngDateOfBirth = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    var genericPageObjectObject = new genericPageObject(id);
    genericPageObjectObject.extend(this);

    this.invalidDateError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath(".//div[@validate='ingDate']")));
    };

    this.invalidDateOfBirthError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath(".//div[@validate='ingMaxDate || ingMinDate']")));
    };
};

module.exports = IngDateOfBirth;