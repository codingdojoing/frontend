var utils = require('./UtilityPageObject');

/**
 * Modal fixture that exposes all the components used by the modal directive.
 * @param id The id of the modal.
 * @constructor
 */
var Modal = function (id) {
    this.id = id;
    this.element = element(by.id(id));
    var self = this;

    this.visible = function () {
        return utils.isVisible(self.element);
    };

    this.isInlineModal = function () {
        return utils.hasClass(self.element.element(by.xpath('../../..')), 'overlay-inline');
    };

    this.isDefaultModal = function () {
        return utils.hasClass(self.element.element(by.xpath('../../..')), 'overlay-fixed');
    };

    this.doReverseTab = function (el) {
        el.sendKeys(
            protractor.Key.SHIFT, protractor.Key.TAB
        );
    };

    this.doTab = function (el) {
        el.sendKeys(
            protractor.Key.TAB
        );
    };

    this.close = function () {
        element(by.xpath('//*[@id="' + id + '"]/../../button')).click();
    };

    this.title = $('#' + id + ' h3');
    this.footerCloseButton = $('#' + id + ' .panel-footer .close');
    this.footerPrimaryButton = $('#' + id + ' .panel-footer .btn-primary');

    this.firstFocusElement = $('#' + id + ' #in1');
    this.secondFocusElement = $('#' + id + ' #in2');
    this.outsideFocusElement = $('#outsideFocus');
    this.closeElement = $('#ing-close-modal');
    this.textarea = $('#' + id + ' #textarea');

    this.focusableElementsTrip = [
        this.firstFocusElement,
        this.secondFocusElement,
        this.textarea,
        this.footerPrimaryButton,
        this.footerCloseButton,
        this.closeElement,
        this.firstFocusElement
    ];
};

exports = module.exports = {
    Modal: Modal
};