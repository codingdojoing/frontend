/* globals by, require, element, browser, protractor */

var utils = require('./UtilityPageObject');

var Handle = function(element, parent){
    this.element = element;
    var slider = parent;
    
    this.moveHorizontally = function(steps){
        var element = this.element.element(by.css('.ing-slider-handle'));
        return slider.getStepWidth()
        .then(function(stepWidth){
            var movement = steps * stepWidth;
            // It is not possible to move half pixels, so round the value
            // -- we assume it to snap to the desired value.
            movement = Math.round(movement);
            return browser.actions().dragAndDrop(element, {x: movement , y: 0}).perform();
        });
    };
    
    this.moveRight = function(steps){
        steps = steps || 1;
        return this.moveHorizontally(steps);
    };
    
    this.moveLeft = function(steps){
        steps = steps || 1;
        steps *= -1;
        return this.moveHorizontally(steps);
    };
};

var Bar = function(element, parent){
    this.element = element;
    var slider = parent;
    
    this.getFilledSteps = function(){
        return this.getBarSteps('filled');
    };
    this.getRemainingSteps = function(){
        return this.getBarSteps('remaining');
    };
    this.getBarSteps = function(bar){
        return protractor.promise.all([
            slider.getMax(),
            slider.getMin(),
            slider.getStep(),
            element.element(by.css('.slider-range')).getWebElement().getSize(),
            slider.getSize()
        ]).then(function(vals){
            var max = vals[0], min = vals[1], step = vals[2], filledWidth = vals[3].width, sliderWidth = vals[4].width;
            // stepRatio is fraction of the bar that should we filled to represent a single step
            var stepRatio = step / (max - min);
            // filledRatio is the fraction of the bar that is actually filled
            var filledRatio = (filledWidth / sliderWidth);
            // filledSteps is the amount of steps that the part of the bar that is filled represents.
            // Since filledRatio might be a little bit off from the value it should be (since you cannot
            // fill half pixels), we need to round this to whole numbers to get the actual number of steps
            // it represents.
            var filledSteps = Math.round(filledRatio / stepRatio);
            return filledSteps;
        });
    };
};

/**
 * Slider fixture that exposes all the components used by the slider directive.
 * @param id The id of the slider.
 * @constructor
 */
var Slider = function (id) {
    this.id = id;
    this.element = element(by.id(id));
    
    this.handle = new Handle(this.element.element(by.tagName('ing-slider-handle')),
                             this);

    this.getHandle = function() {
        return this.handle;
    };
    
    this.bar = new Bar(this.element.element(by.tagName('ing-slider-bar')),
                       this);

    this.getBar = function() {
        return this.bar;
    };
    
    this.getModelInput = function(){
        return element(by.id('modelInput'));
    };
    
    this.getMax = function(){
        return this.element.getWebElement().getAttribute('max')
        .then(function(max){
            return parseFloat(max);
        });
    };
    
    this.getMin = function(){
        return this.element.getWebElement().getAttribute('min')
        .then(function(min){
            return parseFloat(min);
        });
    };
    
    this.getStep = function(){
        return this.element.getWebElement().getAttribute('step')
        .then(function(step){
            return parseFloat(step);
        });
    };
    
    this.getSize = function(){
        return this.element.element(by.css('.slider-wrapper')).getWebElement().getSize();
    };
    
    this.getStepWidth = function(){
        return protractor.promise.all([
            this.getMax(),
            this.getMin(),
            this.getStep(),
            this.getSize()
        ]).then(function(vals){
            var max = vals[0], min = vals[1], step = vals[2], dimensions = vals[3];
            var stepRatio = step / (max - min);
            return stepRatio * dimensions.width;
        });
    };
    
    this.getValue = function(){
        return element(by.id('sliderValue')).getText();
    };
};

module.exports = {
    Slider: Slider
};