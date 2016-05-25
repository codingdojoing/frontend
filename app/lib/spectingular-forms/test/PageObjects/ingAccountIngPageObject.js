var GenericPageObject = require('./ingGenericNumberInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * ingAccountIng fixture that exposes all the components used by the ingAccountIng directive.
 * @param id The id of the ingAccountIng element.
 * @constructor
 */
var AccountIng = function (id) {
    this.id = id;
    this.element = element(by.id(id));

    var genericPageObject = new GenericPageObject(id);
    genericPageObject.extend(this);

    this.invalidIbanError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath('.//div[@validate="ingInvalidIban"]')));
    };
};


module.exports = AccountIng;
