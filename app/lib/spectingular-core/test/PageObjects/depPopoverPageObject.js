var utils = require('./UtilityPageObject');

/**
 * Popover fixture that exposes all the components used by the popover directive.
 * @param id The id of the popover.
 * @constructor
 */
var Popover = function (id) {
    this.id = id;
    this.element = element(by.id(id));

    this.isPopoverVisible = function() {
        return angular.equals(this.element.css('visibility'), 'visible');
    }

};