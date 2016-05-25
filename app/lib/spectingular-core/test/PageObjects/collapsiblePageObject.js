/**
 * Collapsible fixture that exposes all the components used by the collapsible directive
 *
 * @param the index of the collapsible in the group
 * @constructor
 */
var utils = require('./UtilityPageObject');


var Collapsible = function (index) {

    var group = element.all(by.css('.panel-group'));


    this.numberOfOpenCollapisibles = function(){
        return group.all(by.css('.collapsible-details.in')).count();
    };

    this.numberOfClosedCollapisibles = function(){
        return group.all(by.css('.collapsible-details')).count();
    }

    /* @param the index of the collapsible in the group */
    this.hasDefaultStyling = function(index){
        return utils.hasClass(group.all(by.css('.panel')).get(index), 'panel-default');
    }

    /* @param the index of the collapsible in the group */
    this.toggleDetails = function(index) {
        group.all(by.css('.collapsible-header')).get(index).click()
    };

    /* @param the index of the collapsible in the group */
    this.isCollapsibleOpen = function(index){
        return utils.hasClass(group.all(by.css('.collapsible-details')).get(index), 'in');
    }



};

exports = module.exports = {
    Collapsible: Collapsible
};