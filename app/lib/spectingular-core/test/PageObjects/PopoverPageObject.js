var utils = require('./UtilityPageObject');

/**
 * Popover fixture that exposes all the components used by the popover directive.
 * @param id The id of the popover.
 * @constructor
 */
var Popover = function (id) {
    this.id = id;
    this.popover = element(by.id(id));
    this.popoverInvoker = this.popover.element(by.css('[ing-popover-invoker]'));
    this.popoverContent = this.popover.element(by.css('.overlay'));
    this.outsideArea = element(by.id('outsidePopover'));

    /**
     * State
     */

    this.isVisible = function() {
         return utils.isVisible(this.popoverContent);
    };


    /**
     * User interaction
     */

    this.toggle = function () {
        this.popoverInvoker.click();
    };

    this.open = function() {
        if(this.isVisible()) this.popoverInvoker.click();
    };

    this.close = function() {
        if(!this.isVisible()) this.popoverInvoker.click();
    };

	  this.clickOutside = function() {
        this.outsideArea.click();
		};

    /**
     * Data
     */

    this.getContent = function() {
        return this.popoverContent;
    };

    this.containsText = function() {
        //this.popoverContent
    };

};


exports = module.exports = {
    Popover: Popover
};