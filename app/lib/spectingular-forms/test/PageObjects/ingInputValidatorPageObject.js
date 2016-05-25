var genericInputPageObject = require('./ingGenericNumberInputPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * ingInputValidator fixture that exposes all the components used by the ingInputValidator directive.
 * @param id The id of the ingInputValidator element.
 * @constructor
 */
var InputValidator = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    var genericPageObjectObject = new genericInputPageObject(id);
    genericPageObjectObject.extend(this);

};


module.exports = InputValidator;
