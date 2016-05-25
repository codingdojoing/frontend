/**
 * @ngdoc module
 * @name tgFullCover
 * @module tgFullCover
 */

angular.module('tgFullCover', []);
'use strict';

/**
 * @ngdoc directive
 * @name tgFullCover
 * @module tgFullCover
 * @restrict E
 *
 * @description
 * <p>
 *     The <code>tg-full-cover</code> renders a full-cover component with a container inside.<br />
 *     The full-cover (together with container) is the base for every page.<br />
 * </p>
 *
 *
 * @param {a | b | c | d}      [color=a]        Background of the full-cover. a=white, b=gray-lightest, c=gray-lighter, d=orange
 * @param {String}      aria-labelledby         ID of a heading element containing the title of this section (which might be hidden with .sr-only). <ing-notification type="warning" block>Make sure you reference an unique ID that exists on the page. Screenreaders use this to give an overview of the different sections on the page.</ing-notification>
 * @param {Boolean}     [arrow=false]           Show an arrow on the bottom
 * @param {Boolean}     [omit-container=false]  Remove the default container. Used for brandbar and comparator.
 *
 * @example
 <example module="tgFullCover" deps="theguide-full-cover/theguide-full-cover.js">
    <file name="index.html">
        <tg-full-cover aria-labelledby="cover1">
            <h2 id="cover1" class="heading-b-hg">The header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat totam unde voluptas.</p>
        </tg-full-cover>
 </file>
 </example>
 *
 * @example
 <example module="tgFullCover" deps="theguide-full-cover/theguide-full-cover.js">
 <file name="index.html">
 <h1>Basic usage</h1>
 <tg-full-cover color="a" aria-labelledby="cover1">
 <h2 id="cover1" class="heading-b-hg">White</h2>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat totam unde voluptas.</p>
 </tg-full-cover>

 <h2 class="l-mt-5">Different colors with arrows</h2>
 <tg-full-cover color="b" arrow="true" aria-labelledby="cover2">
 <h3 id="cover2" class="heading-b-hg">Gray with arrow</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat totam unde voluptas.</p>
 </tg-full-cover>
 <tg-full-cover color="d" arrow="true" aria-labelledby="cover3">
 <h3 id="cover3" class="heading-b-hg h-text-f">Orange with arrow</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat totam unde voluptas.</p>
 </tg-full-cover>

 </file>
 </example>
 *
 */


angular.module('tgFullCover').directive('tgFullCover', [function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            arrow: '=',
            omitContainer: '=' //only for internal use
        },
        link: function (scope, element, attrs) {
            var col = attrs.color || 'a';
            scope.colorClass = 'h-bg-' + col;
            scope.arrowColor = 'arrow-' + col;
        },
        template:
                '<section role="region" class="full-cover {{colorClass}}" ng-class="{\'arrow-container\': arrow }">' +
                    '<div ng-class="{container:!omitContainer}" ng-transclude></div>' +
                    '<div ng-if="arrow" class="arrow arrow-down {{arrowColor}} arrow-marker"></div>' +
                '</section>'

    };
}]);

