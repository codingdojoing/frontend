require('node-path')(module, [browser.params.dependencyPath]);
var StarRating = require('spectingular-core/test/PageObjects/starratingPageObject').StarRating;

var FeedbackForm = function (id) {
    this.id = id;
    this.element = element(by.id(id));
    this.opinion = this.element.element(by.id('id-explanation-field'));
    this.formError = this.element.element(by.css('#id-http-error div'));
    this.ratingError = this.element.element(by.css('#id-stars-error div'));
    this.submitButton = this.element.element(by.css('#id-submit-feedback'));
    this.thanksMessage = this.element.element(by.id('id-thanks-for-feedback'));

    this.starRating = new StarRating('id-stars');

    this.setOpinion = function (opinionText) {
        this.opinion.clear();
        this.opinion.sendKeys(opinionText);
    };

    this.getOpinion = function () {
        return this.opinion.getAttribute('value');
    };

};

exports = module.exports = {
    FeedbackForm: FeedbackForm
};
