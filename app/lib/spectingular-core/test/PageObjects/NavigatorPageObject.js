var utils = require('./UtilityPageObject');

/**
 * Navigator fixture that exposes all components used by the navigator.
 * 
 * @param {string} id DOM id of the navigator root element
 * @returns {Navigator} Navigator fixture
 */
var Navigator = function(id) {
    this.id = id;
    this.node = element(by.id(id));
    
    this.header = function() {
        return new NavigatorHeader(this.node.element(by.css('.pagination-wrapper.pagination-steps-wrapper')));
    };
    
    this.footer = function() {
        return new NavigatorFooter(this.node.all(by.css('.row:last-of-type')).last());
    };
    
    this.current = function() {
        return new NavigatorContent(this.node.all(by.css('.panel-body > div')).first());
    };
    
    this.next = function() {
        this.footer().nextButton().click();
    };
    
    this.previous = function() {
        this.footer().previousButton().click();
    };
};

/**
 * Navigator fixture that exposes all components used by the content body.
 * 
 * @param {element} _node Navigator content DOM element
 * @returns {NavigatorContent} NavigatorContent
 */
var NavigatorContent = function(_node) {
    this.node = _node;
    
    this.find = function(locator) {
        return this.node.element(locator);
    };
};

/**
 * Navigator fixture that exposes all components used by the header.
 * 
 * @param {element} _node The navigator header DOM element.
 * @returns {NavigatorHeader} NavigatorHeader fixture.
 */
var NavigatorHeader = function(_node) {
    this.node = _node;
    
    this.breadcrumbs = function() {
        return new NavigatorBreadcrumbs(this.node);
    };
    
    this.finished = function() {
        return new NavigatorFinished(this.node);
    };
};

/**
 * Navigator fixture that exposes all components used by the navigator breadcrumbs.
 * 
 * @param {element} _header The navigator header DOM element.
 * @returns {NavigatorBreadcrumbs} NavigatorBreadcrumbs fixture.
 */
var NavigatorBreadcrumbs = function(_header) {
    this.node = _header.all(by.repeater('step in steps'));
    
    this.count = function() {
        return this.node.count();
    };

    this.get = function(index) {
        return new NavigatorBreadcrumb(this.node.get(index));
    };
    
    this.each = function(fn) {
        this.node.each(function(element) {
            fn(new NavigatorBreadcrumb(element));
        });
    };
};

/**
 * Navigator fixture that exposes all components used by a single navigator breadcrumb.
 * 
 * @param {element} _node Breadcrumb DOM element.
 * @returns {NavigatorBreadcrumb} NavigatorBreadcrumb fixture.
 */
var NavigatorBreadcrumb = function(_node) {
    this.node = _node;
    
    this.element = function() {
        return this.node.element(by.css('.pagination-element'));
    };
    
    this.hasClass = function(clazz) {
        return utils.hasClass(this.node, clazz);
    };
    
    this.tagName = function() {
        return this.element().getTagName();
    };
    
    this.indexText = function() {
        return this.element().element(by.css('.pagination-type')).getText();
    };

    this.text = function() {
        return this.element().element(by.css('.pagination-text')).getText();
    };
};

/**
 * Navigator fixture that exposes all components used by the navigator finished step.
 *
 * @param {element} _header The navigator header DOM element.
 * @returns {NavigatorFinished} NavigatorFinished fixture.
 */
var NavigatorFinished = function(_header) {
    this.node = _header.element(by.css('.pagination-complete'));

    this.hasClass = function(clazz) {
        return utils.hasClass(this.node, clazz);
    };

    this.isPresent = function() {
        return this.node.isPresent();
    };

    this.text = function() {
        return this.node.getText();
    };

    this.icon = function() {
        return this.node.element(by.css('.icon'));
    };

    this.iconIsPresent = function() {
        return this.icon().isPresent();
    };

    this.iconHasClass = function(clazz) {
        return utils.hasClass(this.icon(), clazz);
    };
};

/**
 * Navigator fixture that exposes all components used by the footer.
 * 
 * @param {element} _node The navigator footer DOM element.
 * @returns {NavigatorFooter} NavigatorFooter fixture.
 */
var NavigatorFooter = function(_node) {
    this.node = _node;
    
    this.nextButton = function() {
        return this.node.element(by.css('button.btn.btn-primary'));
    };
    
    this.previousButton = function() {
        return this.node.element(by.css('button.btn.btn-secondary'));
    };
};

exports = module.exports = {
    Navigator: Navigator
};
