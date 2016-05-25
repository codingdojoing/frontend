var defaultPageObject = require('./defaultPageObject');
var genericPageObject = require('./ingGenericInputPageObject');

/**
 * ingBsnComponent fixture that exposes all the components used by the ingBsnComponent directive.
 * @param id The id of the bsn component element.
 * @constructor
 */
var Bsn = function (id) {

    this.id = id;
    this.element = element(by.id(id));
    var genericPageObjectObject = new genericPageObject(id);
    genericPageObjectObject.extend(this);

    this.invalidBsnError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath('.//div[@validate="ingBsn && !minlength"]')));
    };

    this.invalidLengthError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath('.//div[@validate="minlength"]')));
    };

    this.bsnTestNumberError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath('.//div[@validate="ingBsnTestNumbers"]')));
    };
};


module.exports = Bsn;
