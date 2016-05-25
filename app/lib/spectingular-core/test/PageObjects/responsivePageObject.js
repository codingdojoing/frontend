/**
 * responsiveness fixture that allows you to set the window width to activate mediaQueries used in the application
 *
 * @constructor
 */
var Mq = function () {
    var width;
    var height = 800;

    var mqSizes = {
        zero: 0,
        xs: 480,
        sm: 680,
        md: 768,
        lg: 992,
        xl: 1200
    }

    var correction = 20; //Extra px. probably needed for scrollbar

    function resize() {
        browser.driver.manage().window().setSize(width, height);
    }

    this.setXs = function() {
        width = mqSizes.xs + correction;
        resize();
    };

    this.setSm = function() {
        width = mqSizes.sm + correction;
        resize();
    };

    this.setMd = function() {
        width = mqSizes.md + correction;
        resize();
    };

    this.setLg = function() {
        width = mqSizes.lg + correction;
        resize();
    };

    this.setXl = function() {
        width = mqSizes.xl + correction;
        resize();
    };
};

exports = module.exports = {
    Mq: Mq
};