(function () {
    'use strict';

    angular.module('tgUtils', []);

})();

'use strict';
/*jshint latedef: nofunc */

angular.module('tgUtils').directive('tgCompile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var compileScope = scope.$eval(attrs.compileScope);


            scope.$watch(function() {
                return scope.$eval(attrs.tgCompile);
            },function(str) {
                element.html(str);
                $compile(element.contents())(compileScope || scope);
            });
        }

    };
}]);
/*jshint latedef: nofunc, bitwise:false */
/**/

/**
 * @ngdoc function
 * @name tgUtils.service:tgUtils
 *
 * @description
 * This service contains utility functions, meant as a private service for the Guide components
 *
 **/


(function () {
    'use strict';

    angular.module('tgUtils').service('tgUtils', ['$timeout', '$window', function ($timeout, $window) {

        this.createRandomId = createRandomId;
        this.throttle = throttle;

        // Browser detection
        this.getIEVersion = getIEVersion;
        this.isOldAndroidBrowser = isOldAndroidBrowser;

        // Element node related
        this.arrayDiff = arrayDiff;
        this.angularIndexOf = angularIndexOf;
        this.chunk = chunk;
        this.collectionHas = collectionHas;
        this.innerWidth = innerWidth;
        this.outerWidth = outerWidth;
        this.parent = parentFn;


        /////////////


        /**
         *
         * @param {Function} fn - function to be throttled
         * @param {Number} threshold - timeout between checks for function execution. When throttle is  in ms ()
         * @param {Object} scope - context in which fn is applied
         * @returns {Function} function that needs to be captured in and called from implementing application
         */

        function throttle(fn, threshold, scope) {
            threshold = threshold ? threshold : 250;

            var last, deferTimer;

            return function throttleFunction() {
                var context = scope || this;

                var now = +new Date(),
                    args = arguments;

                if (last && (now < last + threshold)) {
                    $timeout.cancel(deferTimer);
                    deferTimer = $timeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        }


        /**
         * Chunk an array into an array of arrays of length |len|
         * @param arr
         * @param len
         * @returns {{Array}} array of arrays.
         */
        function chunk(arr, len) {
            var chunks = [],
                i = 0,
                n = arr.length;

            while (i < n) {
                chunks.push(arr.slice(i, i += len));
            }

            return chunks;
        }


        /**
         *  Some additional tooling to jQLite
         */

        /**
         * Returns the differences between array 'a' and 'b' in a new array
         * @param {array} a - array a
         * @param {array} b - array b
         * @returns {array}
         */
        function arrayDiff(a, b) {
            return a.filter(function (i) {
                return angularIndexOf(b, i) < 0;
            });
        }

        /**
         * Returns whether element collection 'a' contains element 'b'
         * @param {array} a - array of elements
         * @param {element node} b - element to be found
         * @returns {boolean}
         */
        function collectionHas(a, b) { //helper function (see below)
            for (var i = 0, len = a.length; i < len; i++) {
                if (a[i] === b) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Equivalent of jQuery parent()
         * @param {elem} jQ elem
         */
        function parentFn(elm, selector) {
            var all = document.querySelectorAll(selector);
            var cur = elm[0].parentNode;

            while (cur && !collectionHas(all, cur)) { //keep going up until you find a match
                cur = cur.parentNode; //go up
            }
            return cur; //will return null if not found
        }


        /**
         * Replaces the jQuery outerWidth method, that takes margins into account as well.
         * See: http://youmightnotneedjquery.com/
         * @param el {elementNode} node to read from
         * @returns {int} the element width
         */
        function outerWidth(el) {
            el = getRawElement(el);
            var style = getComputedStyle(el);
            return el.offsetWidth + (parseInt(style.marginLeft ? style.marginLeft : 0, 10) + parseInt(style.marginRight ? style.marginRight : 0, 10));
        }


        /**
         * Equivalent of jQuery width()
         * @param {elem} jQ elem
         * @returns {int} the element width
         */
        function innerWidth(el) {
            el = getRawElement(el);
            var cStyle = getComputedStyle(el, null);
            return el.clientWidth - (Number(cStyle.getPropertyValue('padding-left').slice(0, -2)) + Number(cStyle.getPropertyValue('padding-right').slice(0, -2)));
        }

        function getRawElement(el) {
            return el[0] || el;
        }


        /**
         * Same functionality as indexOf, but ignoring properties with the $ prefix
         * @param {object|array} obj
         * @param prop - property of obj that needs to be 'angular equal'
         */
        function angularIndexOf(obj, prop) {
            for (var i in obj) {
                if (angular.equals(obj[i], prop)) {
                    return Number(i);
                }
            }
            return -1;
        }


        /**
         * Creates a random identifier (integer consisting of 5 characters).
         * @returns {number}
         */
        function createRandomId() {
            return Math.floor((Math.random() * 100000) + 1);
        }


        /** Indicates if the browser is the old stock Android Browser.
         * This old stock Android browser was replaced by Chrome in Android 4.4.
         * The old stock Android browser has some bugs. With this function you can detect this browser.
         * Some of the bugs are:
         * - css overflow-y prevents a normal click behaviour on <label>.
         * - animation of css visibility property does not properly work
         *
         * @returns {boolean} True if browser is old stock Android Browser
         */
        function isOldAndroidBrowser() {
            /* A full list of all old Android webkit useragents can be found here:
             * http://myip.ms/browse/comp_browseragents/1/browserID/871/browserID_A/1
             *
             * The Android user agent contains the words Android and AppleWebKit with a version number directly after AppleWebKit.
             * When this version number is <537 we have the old Android browser.
             * When the Chrome browser is used, the version will be >=537.
             * See also: http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser
             */

            // Get a part of the userAgent that contains both Android and AppleWebkit/AppleWebKit and also return version number of AppleWebKit
            var androidUserAgentPlusWebkitVersion = $window.navigator.userAgent.match(/Android.*AppleWeb[Kk]?it\/([\d.]+).*/);
            return (angular.isDefined(androidUserAgentPlusWebkitVersion) && androidUserAgentPlusWebkitVersion !== null && androidUserAgentPlusWebkitVersion[1] < 537);
        }


        /**
         * This is how Angular internally detects IE
         * @returns {int||boolean} the IE version or false if not an IE browser
         */

        function getIEVersion() {
            var msie = parseInt((/msie (\d+)/.exec($window.navigator.userAgent.toLowerCase()) || [])[1], 10);

            if (isNaN(msie)) {
                msie = parseInt((/trident\/.*; rv:(\d+)/.exec($window.navigator.userAgent.toLowerCase()) || [])[1], 10);
            }

            return msie ? msie : false;
        }


    }]);
})();


