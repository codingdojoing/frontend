var utils = require('./UtilityPageObject');

var PlaceholderInput = function(id) {
	this.id = id;
	this.inputField = element(by.id(id));

	/**
	 * State
	 */

	/**
	 * User interaction
	 */
	this.type = function(value) {
		this.inputField.clear();
		this.inputField.sendKeys(value);
		return this;
	};

	this.focus = function() {
		this.inputField.click();
	};

	/**
	 * Data
	 */
	this.value = function () {
		return this.inputField.getAttribute('value');
	};
};

exports = module.exports = {
	PlaceholderInput: PlaceholderInput
};