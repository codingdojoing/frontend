/* globals by, require, element, browser, protractor */

/**
 * Slider fixture that exposes all the components used by the slider directive.
 * @param id The id of the slider.
 * @constructor
 */
var Draggable = function (id) {
    this.id = id;
    this.element = element(by.id(id));
    
    this.drag = function(xOffset, yOffset){
        return browser.actions().dragAndDrop(this.element, {x: xOffset, y: yOffset}).perform();
    };
};

module.exports = Draggable;