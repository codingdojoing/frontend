var genericInputPageObject = require('./ingGenericNumberInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * ingAccountDutch fixture that exposes all the components used by the ingAccountDutch directive.
 * @param id The id of the ingAccountDutch element.
 * @constructor
 */
var AccountDutch = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    var genericPageObjectObject = new genericInputPageObject(id);
    genericPageObjectObject.extend(this);

    this.invalidIbanError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath('.//div[@validate="ingInvalidIban"]')));
    };
};


module.exports = AccountDutch;
