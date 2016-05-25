var utils = require('./UtilityPageObject');

/**
 * RichSelect fixture that exposes all the components used by the rich select directive.
 * @param id The id of the rich select.
 * @constructor
 */
var RichSelect = function (id) {
    var self = this;
    this.element = element(by.id(id));

    function realPageObject() {
        var d = protractor.promise.defer();
        utils.hasNoClass(self.element, 'dropdown-block').then(function (isDisplayedInBulletStyle) {
            d.fulfill(isDisplayedInBulletStyle ? new RichSelectBulletStyle(self.element) : new RichSelectListStyle(self.element));
        });
        return d.promise;
    }

    this.isListStyle = function () {
        return utils.map(realPageObject(), function (realPageObject) {
            return realPageObject.isListStyle();
        });
    };

    this.isBulletStyle = function () {
        return utils.map(realPageObject(), function (realPageObject) {
            return realPageObject.isBulletStyle();
        });
    };

    this.hasItemAtIndex = function (index) {
        return utils.map(realPageObject(), function (realPageObject) {
            return realPageObject.hasItemAtIndex(index);
        });
    };

    this.openDropDown = function () {
        return utils.map(realPageObject(), function (realPageObject) {
            return realPageObject.getOpenButton().click();
        });
    };

    this.getElement = function () {
        return self.element;
    };

    this.getItemAtIndex = function (index) {
        return new RichSelectItem(self.element.$('input[type="radio"][value="' + index + '"]'));
    };

    this.getSelectedItem = function () {
        return new RichSelectItem(self.element.$('input[type="radio"]:checked'));
    };
};

var RichSelectBulletStyle = function (element) {

    this.hasItemAtIndex = function (index) {
        return element.element(by.css('.list-group-item [value="' + index + '"]')).isPresent();
    };

    this.getItemAtIndex = function (index) {
        return element.element(by.css('.list-group-item [value="' + index + '"]'));
    };

    this.getOpenButton = function () {
        throw new Error("Bullet style can't be opened.");
    };

    this.isVisible = function () {
        return element.isVisible();
    };

    this.isPresent = function () {
        return element.isPresent();
    };

    this.isDisplayed = function () {
        return element.isDisplayed();
    };

    this.isListStyle = function () {
        return false;
    };

    this.isBulletStyle = function () {
        return true;
    };
};

var RichSelectListStyle = function (element) {

    this.hasItemAtIndex = function (index) {
        return element.element(by.css('.dropdown-menu-item [value="' + index + '"]')).isPresent();
    };

    this.getItemAtIndex = function (index) {
        return element.element(by.css('.dropdown-menu-item [value="' + index + '"]'));
    };

    this.getOpenButton = function () {
        return element.element(by.css('button.dropdown-toggle'));
    };

    this.isVisible = function () {
        return element.isVisible();
    };

    this.isPresent = function () {
        return element.isPresent();
    };

    this.isDisplayed = function () {
        return element.isDisplayed();
    };

    this.isListStyle = function () {
        return true;
    };

    this.isBulletStyle = function () {
        return false;
    };
};

var RichSelectItem = function (element) {

    this.element = element;
    this.clickableItem = element.element(by.xpath('..'));
    this.item = element.element(by.xpath('../*/div[@ing-rich-select-item-template]'));

    this.getProp1 = function () {
        return this.item.element(by.css('.h-bold > span:nth-of-type(2)'));
    };

    this.getProp2 = function () {
        return this.item.element(by.css('.h-bold > span:nth-of-type(1) > span:nth-of-type(2)'));
    };

    this.getProp3 = function () {
        return this.item.element(by.css('.h-bold > span:nth-of-type(1) >  span:nth-of-type(1)'));
    };

    this.getProp4 = function () {
        return this.item.element(by.css('.h-line-height-0 > div:nth-of-type(1) > span'));
    };

    this.getProp5 = function () {
        return this.item.element(by.css('.h-line-height-0 > div:nth-of-type(2) > span'));
    };

    this.getImage = function () {
        return this.item.element(by.css('img'));
    };

    this.getIcon = function () {
        return this.item.element(by.css('i'));
    };

    this.select = function () {
        return this.clickableItem.click();
    };

    this.getItem = function () {
        return this.item;
    };

    this.isVisible = function () {
        return element.isVisible();
    };

    this.isPresent = function () {
        return element.isPresent();
    };

    this.isDisplayed = function () {
        return element.isDisplayed();
    };
};

exports = module.exports = {
    RichSelect: RichSelect
};