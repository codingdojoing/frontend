var genericPageObject = require('./ingGenericInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * IngGenericNumberInput fixture that extends from the genericInputPageObject and adds the invalidNumberError check
 * @constructor
 */
var IngGenericNumberInput = function (id) {
    this.id = id;
    this.element = element(by.id(id));

    var genericPageObjectObject = new genericPageObject(id);
    genericPageObjectObject.extend(this);

    this.invalidNumberError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath(".//div[@validate='ingNumber']")));
    };

    this.extend = function (obj) {
        for (var i in this) {
            if (this.hasOwnProperty(i)) {
                obj[i] = this[i];
            }
        }
    }
};

module.exports = IngGenericNumberInput;
