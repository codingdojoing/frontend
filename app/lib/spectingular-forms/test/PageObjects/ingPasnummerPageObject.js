var genericPageObject = require('./ingGenericInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * IngPasnummer fixture that exposes all the components used by the IngPasnummer directive.
 * @param id The id of the IngPAsnummer element.
 * @constructor
 */
var IngPasnummer = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    var genericPageObjectObject = new genericPageObject(id);
    genericPageObjectObject.extend(this);

    this.invalidPasnummerError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath(".//div[@validate='pattern']")));
    };
};

module.exports = IngPasnummer;
