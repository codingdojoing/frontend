module.exports = function (config) {
    config.set({

            // base path, that will be used to resolve files and exclude
            basePath: '../',

            // frameworks to use
            frameworks: ['ng-scenario'],

            // list of files / patterns to load in the browser
            files: [
                'test/e2e/**/*Spec.js'
            ],

            plugins: [
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-coverage',
                'karma-chrome-launcher',
                'karma-phantomjs-launcher',
                'karma-ng-scenario'
            ],

            // list of files to exclude
            exclude: [
            ],

            proxies: {
                '/': 'http://localhost:8000/'
            },

            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress', 'coverage'],

            preprocessors: {
                'app/js/**/*.js': 'coverage'
            },

            coverageReporter: {
                type: 'html',
                dir: 'coverage'
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
            browsers: ['Chrome'],

            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,

            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: true
        }
    )
    ;
}
;
