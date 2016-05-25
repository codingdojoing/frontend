var defaultPageObject = require('./defaultPageObject');

/**
 * Tussenvoegsel fixture
 * @param id The id of the Tussenvoegsel element.
 * @constructor
 */
var Tussenvoegsel = function (id) {

    this.id = id;

    this.inputElement = function () {
        return new defaultPageObject.InputPageObject(element(by.id(id)));
    };

};

module.exports = Tussenvoegsel;
