var utils = require('./UtilityPageObject');
/**
 * Default fixture for an TextInput / TextArea
 * @param element The element to work with
 * @constructor
 */
var InputPageObject = function (element) {
    this.element = element;

    this.setValue = function (value) {
        return utils.setValue(this.element, value);
    };

    this.getValue = function () {
        return utils.getAttribute(this.element, 'value');
    };

    this.clear = function () {
        return utils.clear(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

    this.isPresent = function () {
        return utils.isPresent(this.element);
    };
};


/**
 * Default fixture for a readOnly component
 * @param element The element to work with
 * @constructor
 */
var ReadonlyPageObject = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

    this.isPresent = function () {
        return utils.isPresent(this.element);
    };
};

/**
 * Default fixture for a readOnly component
 * @param element The element to work with
 * @constructor
 */
var LabelPageObject = function (element) {
    this.element = element;

    this.getText = function () {
        return utils.getText(this.element);
    };

    this.isPresent = function () {
        return utils.isPresent(this.element);
    };
};

/**
 * Default fixture for an ingNotify
 * @param element The element to work with
 * @constructor
 */
var ErrorMessagePageObject = function (element) {
    this.element = element
    this.textElement = this.element.element(by.xpath('.//span[@class="ng-binding ng-scope"]'));

    this.isVisible = function () {
        return utils.isVisible(this.element);
    };

    this.isPresent = function () {
        return utils.isPresent(this.element);
    };

    this.getText = function () {
        return utils.getText(this.textElement);
    };
};


/**
 * Tooltip fixture
 * @param element The element to work with
 * @constructor
 */
var TooltipPageObject = function (element) {
    this.element = element;
    this.rootElement = this.element.element(by.xpath('./div/div[1]/div[1]/span'));

    this.click = function () {
        return this.rootElement.click();
    };

    this.getTitle = function () {
        return this.rootElement.element(by.xpath('./div/div/div/h3')).getInnerHtml();
    };

    this.getText = function () {
        return this.rootElement.element(by.xpath('./div/div/div/span')).getInnerHtml();
    };
};

module.exports = {
    InputPageObject: InputPageObject,
    ErrorMessagePageObject: ErrorMessagePageObject,
    ReadonlyPageObject: ReadonlyPageObject,
    LabelPageObject: LabelPageObject,
    TooltipPageObject: TooltipPageObject
};
