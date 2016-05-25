/**
 * Collapsible fixture that exposes all the components used by the collapsible directive
 *
 * @param the index of the collapsible in the group
 * @constructor
 */
var StarRating = function (id) {

    var node = element(by.id(id));
    var self = this;

    function countByCss(selector) {
        return node.all(by.css(selector)).count();
    }

    this.getStarElement = function(index) {
        return node.element(by.name("star-"+index));
    }

    this.countFullStars = function () {
        return countByCss('span.icon.icon-orange');
    };

    this.countHalfStars = function () {
        return countByCss('span.stacked-icon.icon-orange');
    };

    this.countStarsForSize = function(size) {
        return countByCss(' .icon-'+size);
    };

    this.getRating = function () {
        return protractor.promise.all([self.countFullStars(), self.countHalfStars()])
            .then(function(results){
                var fullStars = results[0], halfStars = results[1];
                var rating = fullStars + (.5 * halfStars);
                return rating > 0 ? rating : undefined;
            });
    };

};

exports = module.exports = {
    StarRating: StarRating
};