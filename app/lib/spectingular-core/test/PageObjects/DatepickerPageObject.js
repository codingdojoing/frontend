var utils = require('./UtilityPageObject');

var DatePicker = function (id) {
    this.id = id;
    this.datepicker = element(by.id(id));
    this.inputField = this.datepicker.element(by.model('date'));
    this.popoverInvoker = this.datepicker.element(by.css('a[ing-popover-invoker]'));
    this.monthSelect = this.datepicker.element(by.model('month'));
    this.yearSelect = this.datepicker.element(by.model('year'));
    this.focusCount = element(by.css('span#focusCountSpan'));

    this.currentDate = function () {
        return this.inputField.getAttribute('value');
    };

    this.selectedMonth = function () {
        return this.monthSelect.getAttribute('value');
    };

    this.selectedYear = function () {
        return this.yearSelect.$('option:checked').getAttribute('text');
    };

    this.getFocusCount = function() {
        return this.focusCount.getText();
    };

    this.isOpened = function () {
        return utils.map(this.datepicker.element(by.css('.overlay')).getAttribute('class'), function (allClasses) {
            return (allClasses.indexOf('ng-hide') < 0);
        })
    };

    this.isClosed = function () {
        return utils.map(this.isOpened(), function (x) {
            return !x;
        });
    };

    this.focusInputField = function() {
        this.inputField.click();
    };

    this.focusCalendarButton = function() {
        this.popoverInvoker.click();
    };

    this.toggle = function () {
        popoverInvoker.click();
    };

    this.open = function () {
        var popoverInvoker = this.popoverInvoker;
        return utils.map(this.isClosed(), function (closed) {
            if (closed) {
                popoverInvoker.click();
            }

            return this;
        });
    };

    this.close = function () {
        var popoverInvoker = this.popoverInvoker;
        return utils.map(this.isOpened(), function (opened) {
            if (opened) {
                popoverInvoker.click();
            }

            return this;
        });
    };

    this.typeDate = function (date) {
        // Maybe Convert date to string when typeof(date) == Date?

        // Put it in the input field
        this.inputField.clear();
        this.inputField.sendKeys(date);
        return this;
    };

    this.sendKeyValueToDate = function (key) {
        this.inputField.sendKeys(key);
        return this;
    };

    this.pickDate = function (date) {
        var day = parseInt(date.substr(0, 2), 10);
        var month = parseInt(date.substr(3, 2), 10);
        var year = parseInt(date.substr(6, 4), 10);
        var that = this;

        this.open();

        var monthOption = this.datepicker.element(by.model('month')).element(by.css('option:nth-child(' + month + ')'));
        monthOption.click();

        // The DatePicker does not list all the years since year 1, but rather something like [2005, 2006, 2007, 2008].
        // So if we want to select 2007, we need to select the element at index 2. We can calculate the correct
        // index by subtracting the first listed year from the desired year, e.g. 2007-2005.
        var firstYear = this.datepicker.element(by.model('year')).element(by.css('option:first-child')).getText();
        firstYear.then(function (firstYear) {
            firstYear = parseInt(firstYear, 10);
            year = year - (firstYear - 1);
            var yearOption = that.datepicker.element(by.model('year')).element(by.css('option:nth-child(' + year + ')'));
            yearOption.click();
            var dayButton = that.datepicker.all(by.css('.btn.day:not(.previousMonth)')).get(day - 1);
            dayButton.click();
        });

        return this;
    }

    this.selectDay = function(day) {
        this.open();
        var dayButton = this.datepicker.all(by.css('.btn.day:not(.previousMonth)')).get(day - 1);
        return dayButton;
    }

};


exports = module.exports = {
    DatePicker: DatePicker
};
