/* globals by, require, element, browser, protractor */

var utils = require('./UtilityPageObject');

var Tab = function(parent, element){
    var fingertab = parent;
    this.element = element;

    this.shouldBeActive = function(){
        return expect(this.element.getAttribute('class')).toContain('active');
    };

    this.shouldBeInactive = function(){
        return expect(this.element.getAttribute('class')).not.toContain('active');
    };

    this.selectTab = function(){
        return this.element.click();
    };
};

/**
 * Fingertab fixture that exposes all the components used by the fingertab directive.
 * @param id The id of the fingertab.
 * @constructor
 */
var Fingertab = function (id) {
    this.id = id;
    this.fingerTab = element(by.id(id));

    this.getTab = function(index){
        return new Tab(this.fingerTab, this.fingerTab.element(by.css('.row-'+index)));
    };
};

module.exports = Fingertab;
