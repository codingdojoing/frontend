var genericPageObject = require('./ingGenericInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * ingDutchZipCodeComponent fixture that exposes all the components used by the ingDutchZipCodeComponent directive.
 * @param id The id of the ingDutchZipCodeComponent element.
 * @constructor
 */
var IngDutchZipCodeComponent = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    var genericPageObjectObject = new genericPageObject(id);
    genericPageObjectObject.extend(this);

    this.invalidDutchZipcodeError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath(".//div[@validate='ingDutchZipcode']")));
    };
};

module.exports = IngDutchZipCodeComponent;
