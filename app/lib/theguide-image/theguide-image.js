/**
 * @ngdoc module
 * @name tgImage
 * @module tgImage
 */

angular.module('tgImage', ['tgUtils']);
///<reference path="../../references.js" />

/*jshint latedef: nofunc */
'use strict';
(function () {
    /**
     * @ngdoc directive
     * @name tgImage
     * @module tgImage
     * @restrict E
     *
     * @description
     * <p>
     *     The <code>tg-image</code> is a directive that supports lazy loading of images
     * </p>
     *
     *
     * @param {String}      image-src           The src attribute for the img tag
     * @param {String}      image-alt           The alt attribute for the img tag
     * @param {String}      [image-classes]     Additional classes that can be put on the img tag like <code>img-circle</code>, <code>img-rounded</code>, <code>img-rounded-sm</code>, <code>img-rounded-lg</code>, <code>img-thumbnail</code>, <code>img-thumbnail-sm</code> and <code>img-thumbnail-lg</code>
     * @param {Boolean}     [static=false]      When true, image will not be responsive, but will use image-width and image-height as fixed dimensions
     * @param {Number}      [image-width]       The width and aspect ratio of the placeholder image. When static is false (which it is by default), the image is responsive and its dimensions are dependant on its container. Use the original width of the image.
     * @param {Number}      [image-height]      The height and aspect ratio of the placeholder image. When static is false (which it is by default), the image is responsive and its dimensions are dependant on its container. Use the original height of the image.
     *
     *
     * @example
     <example module="tgImage" deps="theguide-image/theguide-image.js;theguide-utils/theguide-utils.js">
     <file name="index.html">
     <tg-image image-src="/img/16-9-theme-a.jpg" image-alt="Voorbeeld plaatje 1"></tg-image>
     </file>
     </example>

     * @example
     * For an example of the placeholder: Please throttle your internet connection, for instance via Chrome Developer Tools
     <example module="tgImage" deps="theguide-image/theguide-image.js;theguide-utils/theguide-utils.js">
     <file name="index.html">
     <tg-image image-width="400" image-height="300" image-src="/img/16-9-theme-b.jpg" image-alt="Voorbeeld plaatje 2"></tg-image>
     </file>
     </example>

     *
     */

        // TODO: use bind-once in ang 1.4

    angular.module('tgImage')
        .directive('tgImage', ['tgImageService', 'tgUtils', '$window', function (tgImageService, tgUtils, $window) {
            return {
                restrict: 'E',
                scope: true,
                transclude: true,
                link: {
                    post: function (scope, element, attrs) {

                        // Constants
                        var config = {
                            lazyLoadingPreloadThreshold : 200
                        };

                        // State
                        scope.inViewport = false;

                        // Img tag properties
                        scope.imageSrc = attrs.imageSrc;
                        scope.imageAlt = attrs.imageAlt;
                        scope.imageClasses = attrs.imageClasses;
                        scope.static = scope.$eval(attrs.static);

                        // Set values to be passed to placeholder
                        scope.imageWidth = attrs.imageWidth;
                        scope.imageHeight = attrs.imageHeight;


                        angular.element($window).on('scroll resize', checkImageThrottled);

                        scope.$on('placeholder.rendered', function(e) {
                            e.stopPropagation();
                            checkImage();
                        });

                        var throttleFn = tgUtils.throttle(checkImage);

                        function checkImageThrottled() {
                            throttleFn();
                        }

                        function checkImage() {
                            if(tgImageService.isInsideViewport(element, config.lazyLoadingPreloadThreshold)) {
                                scope.$evalAsync(function() {
                                    scope.inViewport = true;
                                });

                                angular.element($window).off('scroll resize', checkImageThrottled);
                            }
                        }

                    }
                },
                template:
                    '<tg-placeholder ng-if="!imageLoaded" placeholder-width="{{imageWidth}}" placeholder-height="{{imageHeight}}" static="{{static}}" placeholder-alt="{{imageAlt}}"></tg-placeholder>' +
                    '<img tg-image-ready ng-show="imageLoaded" class="{{static ? \'\' : \'img-responsive\'}} {{imageClasses}}" alt="{{imageAlt}}">'
            };
        }]);

    angular.module('tgImage')
        .directive('tgPlaceholder', ['tgImageService', '$timeout', function (tgImageService, $timeout) {
            return {
                restrict: 'E',
                template:
                '<div class="h-bg-c" ng-class="{\'position position-content-center position-content-middle position-xxxl\' : hasPlaceholder}" ng-style="placeHolderWidth">' +
                    '<div ng-if="hasPlaceholder" class="position-component position-component-center position-component-middle">' +
                       '<span class="icon icon-loading-image-placeholder icon-gray-dark aria-hidden="true""></span>' +
                    '</div>' +
                    '<div ng-style="placeHolderHeight"></div>' +
                '</div>',
                link: function(scope, element, attrs) {

                    // Constants
                    var config = {
                        minHeight: 130 //min-height determined by UX based on placeholder image
                    };

                    var height = attrs.placeholderHeight;
                    scope.width = attrs.placeholderWidth;
                    scope.static = scope.$eval(attrs.static);
                    scope.imageAlt = attrs.placeholderAlt;

                    scope.hasPlaceholder = scope.width > config.minHeight || height > config.minHeight;

                    scope.placeHolderHeight = {'padding-top': ( height / scope.width) * 100 + '%', 'width': '100%' };
                    scope.placeHolderWidth = {'position':'relative',  'width': scope.static ? scope.width + 'px' : '100%' };

                    // Be sure the image has rendered
                    $timeout(function() {
                        scope.$emit('placeholder.rendered');
                    });

                }
            };
        }]);


    angular.module('tgImage')
        .directive('tgImageReady', [function () {
            return {
                replace: false,
                scope: false,
                link: function(scope, element) {

                    scope.imageLoaded = false;

                    function onReady() {
                        scope.$evalAsync(function() {
                            scope.imageLoaded = true;
                        });

                        element.off('load');
                    }

                    element.on('load', function() {
                        onReady();
                    });

                    var unWatch = scope.$watch('inViewport', function(inViewport) {
                        if(inViewport) {
                            element.attr('src', scope.imageSrc);

                            if(element[0].complete || element[0].clientWidth > 0 || element[0].clientHeight > 0) {
                                onReady();
                            }
                            unWatch();
                        }
                    });


                }
            };
    }]);


})();

/*jshint latedef: nofunc, bitwise:false */
'use strict';
(function () {
    // TODO: move these functions to more generic services

    angular
        .module('tgImage')
        .service('tgImageService', [function () {

            this.isInsideViewport = isInsideViewport;

            //////////////

            function getViewportHeight() {
                return document.documentElement.clientHeight;
            }

            /**
             * @param {element} element - jQLite elem
             * @param {int} yOffset - the y threshold for which elements outside the viewport should be considered 'inside' (a negative value can be applied as well for elements that need to have margin to the end of the viewport)
             * @returns {boolean}
             */
            function isInsideViewport(element, yOffset) {
                yOffset = yOffset || 0;
                element = element[0] || element;
                return element.getBoundingClientRect().top < (getViewportHeight() + yOffset );
            }


        }]);
    })();



