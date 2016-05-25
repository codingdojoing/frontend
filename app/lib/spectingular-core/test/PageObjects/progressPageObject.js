var utils = require('./UtilityPageObject');

var ProgressBar = function (id) {
    this.id = id;
    this.element = element(by.id(id)).element(by.css('ing-progress-bar'));
    this.wrapper = element(by.id(id)).element(by.css('.progress'));

    this.isDisplayed = function () {
        return utils.isVisible(this.element.element(by.css('.progress-bar')));
    };

};

var ProgressRadial = function (id) {
    this.id = id;
    this.element = element(by.id(id));

    this.isDisplayed = function () {
        return utils.isVisible(this.element.element(by.css('.progress-dial')));
    };

};

exports = module.exports = {
    ProgressBar: ProgressBar,
    ProgressRadial: ProgressRadial
};
