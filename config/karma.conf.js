module.exports = function (config) {
    config.set({

            // base path, that will be used to resolve files and exclude
            basePath: '../',

            // frameworks to use
            frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
                'app/lib/jquery/jquery.min.js',
                'app/lib/angular/angular.js',
                'app/lib/angular-animate/angular-animate.js',
                'app/lib/angular-cookies/angular-cookies.js',
                'app/lib/angular-loader/angular-loader.js',
                'app/lib/angular-sanitize/angular-sanitize.js',
                'app/lib/angular-touch/angular-touch.js',
                'app/lib/angular-mocks/angular-mocks.js',
                'app/lib/spectingular-core/spectingular-core.min.js',
                'app/lib/spectingular-components/spectingular-components.min.js',
                'app/lib/spectingular-forms/js/components.forms.min.js',
                'app/lib/angular-resource/angular-resource.min.js',
                'app/lib/theguide-full-cover/theguide-full-cover.min.js',
                'app/lib/theguide-icon/theguide-icon.min.js',
                'app/lib/theguide-comparison-table/theguide-comparison-table.min.js',
                'app/lib/theguide-utils/theguide-utils.min.js',
                'app/lib/theguide-image/theguide-image.min.js',
                'app/js/*.js',
                'app/js/**/*.js',
                'app/js/**/**/*.js',
                'test/mocks/**/*.js',
                'test/unit/**/*Spec.js',
                'app/partials/**/*.html'
            ],

            plugins: [
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-coverage',
                'karma-chrome-launcher',
                'karma-phantomjs-launcher',
                'karma-ng-html2js-preprocessor'
            ],

            // list of files to exclude
            exclude: [
                'app/js/etc/**/*.js',
                'app/js/directives/generated/*.js',
                'app/js/services/generated/panama-core.js',
                'app/js/services/generated/requestleaseApplicationLogic.js'

            ],

            ngHtml2JsPreprocessor: {
                // strip this  the file path
                stripPrefix: 'app/',
                moduleName: 'templates'
            },

            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress', 'junit', 'coverage'],

            preprocessors: {
                'app/partials/**/*.html': 'ng-html2js',
                'app/js/*/*.js': 'coverage',
                'app/js/*.js': 'coverage'
            },

            coverageReporter: {
                reporters:[
                    {type: 'html', dir: 'reports/coverage'},
                    {type: 'text'}
                    ]
            },

            // the default configuration
            junitReporter: {
                outputFile: 'reports/junit/test-results.xml',
                suite: ''
            },

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            browsers: ['PhantomJS'],

            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,

            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: true
        }
    );
};
