var utils = require('./UtilityPageObject');

/**
 * ingTabLoading fixture that exposes all the components used by the ingTabLoading directive.
 * @param id The id of the ingEmailInfo element.
 * @constructor
 */
var DefferedSpinner = function (id) {
    this.id = id;
    this.element = element(by.id(id));

    this.isSpinning = function () {
        return utils.isVisible(this.element.element(by.css('.overlay')));
    }
    this.ariaHidden = function() {
        return this.element.element(by.css('.overlay')).getAttribute('aria-hidden');
    }
    this.spinnerText = function() {
        return this.element.element(by.binding('loadingText')).getText();

    }
};

var DefferedVisible = function (id) {
    this.id = id;
    this.element = element(by.id(id));

    this.isVisible = function () {
        return utils.isVisible(this.element);
    }
    this.ariaHidden = function() {
        return this.element.getAttribute('aria-hidden')
    }
    this.ariaBusy = function() {
        return this.element.getAttribute('aria-busy')
    }
};


exports = module.exports = {
    DefferedSpinner: DefferedSpinner,
    DefferedVisible: DefferedVisible
};