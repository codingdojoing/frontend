var utils = require('./UtilityPageObject');


/**
 * INGTan fixture.
 * 
 * You can use this to write test for all possible scenario's.
 * 
 * Please see ingTan.html for the corresponding httpbackend calls.
 * 
 * 
 * @param id The id of the div where the tan is in.
 * @constructor
 */
var IngTan = function (id) {

    this.id = id;
    this.element = element(by.id(id));


    //Only for component testing
    this.postCount = this.element.element(by.id('postCount'));

    this.myIdScopeField = this.element.element(by.model('myid'));
    //end
    this.form =  this.element.element(by.id('authorizeTanForm'));

    this.ingTanInputField =  this.element.element(by.id('gauthorizeValidationInput'));

    this.ingTanInputFieldLabel =  this.element.element(by.id('gauthorizeValidationInputLabel'));

    this.ingTanVolgNummerLabel =  this.element.element(by.id('tanSequenceNumberLabel'));

    this.ingTanVolgNummer =  this.element.element(by.id('tanSequenceNumber'));

    this.noTanReceivedLink =  this.element.element(by.id('noTanReceivedLink'));

    this.ingTanExplanation = this.element.element(by.id('tanExplanation'));

    this.noTanReceivedExplanation = this.element.element(by.id('callMeNow'));

    this.submitButton = this.element.element(by.id('verzendenButton'));

    this.ingTanNotification = this.element.element(by.id('ingTanNotification'));

    this.validationIngRequired = this.element.element(by.css('div[validate="ingRequired"]'));

    this.validationIngNumber =  this.element.element(by.css('div[validate="ingNumber"]'));

    this.validationMinLength = this.element.element(by.css('div[validate="!ingNumber && minlength"]'));

    this.validationIngTanValidate =  this.element.element(by.css('div[validate="ingTanValidate"]'));

    this.tanSuccessMessage =  this.element.element(by.id('tanSuccessMessage'));


    /**
     * Function to check if the tan directive is initialized correctly.
     */
    this.isTanInitialized = function(){

        expect(this.ingTanVolgNummerLabel.getText()).toContain('Volgnummer');
        expect(this.ingTanVolgNummer.getText()).toEqual('2');

        expect(this.ingTanInputField.isDisplayed()).toBeTruthy();

        expect(this.ingTanInputFieldLabel.getText()).toContain('TAN-code');
        expect(this.noTanReceivedLink.isDisplayed()).toBeTruthy();
        expect(this.ingTanExplanation.getText()).toEqual('De TAN-code ontvangt u in een sms-bericht via uw mobiele telefoon. Controleer de opdrachtgegevens in het sms-bericht met de gegevens op het scherm voordat u op verzenden klikt.');

    };

    /**
     * Function to fill in the tan.
     * It doesn't submit it.
     * See submitCorrectTan, submitWrongTan
     * @param tanCode
     */
    this.fillTan = function(tanCode) {
        this.ingTanInputField.clear();
        this.ingTanInputField.sendKeys(tanCode);
    };

    /**
     * Function to fill in the tan and submit it.
     * 
     * @param tanCode 
     */
    this.submitTan = function(tanCode) {
        this.fillTan(tanCode+'\n');
    };

    /**
     * function to check if the no tanreceived message is not shown.
     * And the link to trigger it does.
     */
    this.noTanReceivedMessageNotDisplayedWhenClicked = function() {
        expect(this.noTanReceivedLink.isDisplayed()).toBeTruthy();
        expect(this.noTanReceivedExplanation.isDisplayed()).toBeFalsy();
    };

    /**
     * Function to check if the no tan received message IS shown.
     * And the link to trigger it doesn't.
     */
    this.noTanReceivedMessageDisplayedWhenClicked = function() {
        expect(this.noTanReceivedLink.isDisplayed()).toBeTruthy();
        expect(this.noTanReceivedLink.click());

        expect(this.noTanReceivedExplanation.isDisplayed()).toBeTruthy();
        expect(this.noTanReceivedExplanation.getText()).toContain('Neem contact met ons op via 020 22 888 88');
    };

    /**
     * Function to check if a notification is shown that the TAN-function is blocked.
     */
    this.ingTanNotificationTanBlockedIsShown = function() {
        expect(this.ingTanNotification.isDisplayed()).toBeTruthy();
        expect(this.ingTanNotification.getText()).toContain('TAN-functie is geblokkeerd');
    };


    /**
     * Function to check if a notification is show about the 75 Tan code.
     */
    this.ingTanNotificationTan75List = function() {
        expect(this.ingTanNotification.isDisplayed()).toBeTruthy();
        expect(this.ingTanNotification.getText()).toContain('TAN-lijst');
    };

    /**
     * Function to check if a notification is show about an unexpected error.
     */
    this.ingTanNotificationUnexpectedError = function() {
        expect(this.ingTanNotification.isDisplayed()).toBeTruthy();
        expect(this.ingTanNotification.getText()).toContain('Sorry, er is iets fout gegaan');
    };



    /**
     * Function to check if the ING tan validation is correctly shown.
     * @param boolean, indicate it should be displayed or not
     */
    this.ingTanValidationMessageIsShow = function(boolean) {
        if (boolean === undefined) {
            boolean = true;
        }
        expect(this.validationIngTanValidate.isDisplayed()).toBe(boolean);
        if (boolean) {
            expect(this.validationIngTanValidate.getText()).toContain('De door u ingevoerde TAN-code is onjuist. Het is belangrijk dat u de TAN-code invult die hoort bij het volgnummer dat u hierboven ziet.');
        }
    };

    /**
     * Function to check if the ING-required validation is shown.
     * @param boolean, indicate it should be displayed or not
     */
    this.ingTanValidationIngRequiredIsShow = function(boolean) {
        if (boolean === undefined) {
            boolean = true;
        }
        expect(this.validationIngRequired.isDisplayed()).toBe(boolean);
        if (boolean) {
            expect(this.validationIngRequired.getText()).toContain('Vul een TAN-code in, kies daarna Verzenden.');
        }
    };

    /**
     * Function to check if the Number validation works.
     * @param boolean, indicate it should be displayed or not
     */
    this.ingTanValidationIngNumber = function(boolean) {
        if (boolean === undefined) {
            boolean = true;
        }
        expect(this.validationIngNumber.isDisplayed()).toBe(boolean);
        if (boolean) {
            expect(this.validationIngNumber.getText()).toContain('U heeft de TAN-code niet juist ingevuld. De TAN-code dient uit 6 cijfers te bestaan. Vul de TAN-code opnieuw in.');
        }
    };

    /**
     * Function to check if the Min Length validation works.
     * @param boolean, indicate it should be displayed or not
     */
    this.ingTanValidationMinLength = function(boolean) {
        if (boolean === undefined) {
            boolean = true;
        }
        expect(this.validationMinLength.isDisplayed()).toBe(boolean);
        if (boolean) {
            expect(this.validationMinLength.getText()).toContain('U heeft de TAN-code niet juist ingevuld. De TAN-code dient uit 6 cijfers te bestaan. Vul de TAN-code opnieuw in.');
        }
    };





};

exports = module.exports = {
    IngTan: IngTan
};