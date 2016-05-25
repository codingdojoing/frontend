var utils = require('./UtilityPageObject');
var defaultPageObject = require('./defaultPageObject');

/**
 * Generic fixture should be used for all input elements. Depending on the given id it can select
 * all the relevant related items such as label, ispresent, errors etc.
 *
 * @param id The id of the element.
 */
var IngGenericInput = function (id) {

    this.id = id;
    this.element = element(by.id(id));

    this.isPresent = function () {
        return utils.isPresent(this.element);
    };

    this.inputElement = function () {
        return new defaultPageObject.InputPageObject(this.element.element(by.xpath('.//input')));
    };

    this.labelElementWithTooltip = function () {
        return new defaultPageObject.LabelPageObject(this.element.element(by.xpath('./div/div[1]/div/label')));
    };

    this.labelElement = function () {
        return new defaultPageObject.LabelPageObject(this.element.element(by.xpath('./div/div[1]/label')));
    };

    this.readOnlyRepresentation = function () {
        return new defaultPageObject.ReadonlyPageObject(this.element.element(by.xpath(".//p[1]")));
    };

    this.requiredError = function () {
        return new defaultPageObject.ErrorMessagePageObject(this.element.element(by.xpath(".//div[@validate='ingRequired']")));
    };

    this.tooltip = function () {
        return new defaultPageObject.TooltipPageObject(this.element);
    };

    this.extend = function (obj) {
        for (var i in this) {
            if (this.hasOwnProperty(i)) {
                obj[i] = this[i];
            }
        }
    }
};

module.exports = IngGenericInput;
