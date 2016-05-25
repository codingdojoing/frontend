var FeedbackForm = require('./ingFeedbackFormPageObject').FeedbackForm;

var FeedbackButton = function (id) {
    this.id = id;
    this.element = element(by.id(id));
    this.inlineButton = element(by.id('feedback-button-inline'));
    this.modalButton = element(by.id('feedback-button-modal'));
    this.thanksMessage = element(by.id('id-feedback-thanks-message'));
    this.modalForm = new FeedbackForm('feedback-modal-form');
    this.inlineForm = new FeedbackForm('feedback-inline-form');
    this.closeModalButton = element(by.id('ing-close-modal'));
};

exports = module.exports = {
    FeedbackButton: FeedbackButton
};
