/**
 * Use this file when debugging locally using your IDE (e.g. Intellij)
 * For jenkins use protractor.conf.js instead
 */
exports.config = {
    // Selector for the element housing the angular app - this defaults to
    // body, but is necessary if ng-app is on a descendant of <body>
    rootElement: 'body',

    specs: ['../test/protractor/**/*Spec.js'],
    chromeDriver: '../test/bin/chromedriver',
    params: {
        libPath: '../../../app/lib',
        dependencyPath: './app/lib'
    },
    capabilities: {
        browserName: 'chrome'
//        applicationCacheEnabled: false
    },
    seleniumServerJar: '../test/bin/selenium-server-standalone-2.39.0.jar',
    baseUrl: 'http://localhost:' + (process.env.app_port ),

    framework: 'jasmine2',

    onPrepare: function () {
        var jasmineReporters = require('jasmine-reporters');
        directory = 'results/e2e/';

        var mkdirp = require('mkdirp');
        mkdirp(directory);

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: directory,
            filePrefix: ''
        }));
    },

    //onPrepare: function() {
    //    require('jasmine-reporters');
    //    var ScreenShotReporter = require('protractor-screenshot-reporter');
    //    jasmine.getEnv().addReporter(new ScreenShotReporter({
    //        baseDirectory: 'screenshots', takeScreenShotsOnlyForFailedSpecs: true
    //    }));
    //
    //    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('results/protractor/', true, true, ''));
    //},
    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    }
};
