// Based on Gruntfile.js from generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    var settings = undefined;
    try {
        settings = require('./settings.json');
    } catch (e) {
        grunt.log.warn('settings.json not found, using random available ports')
    }

    //Determine the connectHost
    var connectHost = '0.0.0.0';
    /*var connectHost = 'localhost';*/
    if (grunt.option('connectHost')) {
        connectHost = grunt.option('connectHost');
    } else if (settings && settings.hostname) {
        connectHost = settings.hostname;
    }
    //Determine Selenium address
    var seleniumAddress = 'http://' + connectHost + ':' + '<%= panama.ports.test %>';
    if (grunt.option('selAddress')) {
        seleniumAddress = grunt.option('selAddress');
    }

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        portPickIndie: {
            options: {
                port: 7000,
                extra: 5
            }
        },

        panama: {
            ports: {
                /* use random ports if settings.json was not found */
                connect: settings && settings.connect ? settings.connect : '<%= grunt.config.get("port-pick-1") %>',
                livereload: settings && settings.livereload ? settings.livereload : undefined,
                proxy: settings && settings.proxy ? settings.proxy : '<%= grunt.config.get("port-pick-3") %>',
                test: settings && settings.test ? settings.test : '<%= grunt.config.get("port-pick-4") %>',
                collector: settings && settings.collector ? settings.collector : '<%= grunt.config.get("port-pick-5") %>'
            }
        },

        // Project settings
        project: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist',
            instrumentedE2E: '.tmp/instrumented',
            coverageE2E: 'test/coverage/e2e'
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= project.app %>/js/**/*.js'],
                tasks: ['newer:jshint:all']
            },
            jsTest: {
                files: ['test/spec/**/*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= project.app %>/css/{,*/}*.css'],
                tasks: ['newer:copy:styles']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= project.app %>/**/*.html',
                    '<%= project.app %>/js/**/*.js',
                    '.tmp/css/{,*/}*.css',
                    '<%= project.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: '<%= panama.ports.connect %>',
                // Change hostname to '0.0.0.0' in settings.json to access the server from outside.
                hostname: connectHost,
                livereload: '<%= panama.ports.livereload %>'
            },
            proxies: [
                {
                    context: 'my-api',
                    host: 'localhost',
                    port: '<%= panama.ports.proxy %>',
                    https: false,
                    changeOrigin: false,
                    xforward: false
                }
            ],
            server: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= project.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: '<%= panama.ports.test %>',
                    base: [
                        '.tmp',
                        'test',
                        '<%= project.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= project.dist %>'
                }
            }
        },

        // Format all json, javascript and html code in the project
        jsbeautifier: {
            files: ['config/*.json'],
            javascript: ['app/js/**/*.js', 'test/**/*.js', '!app/js/etc/*.js'],
            html: ['app/**/*.html'],
            options: {
                js: {
                    'jslint-happy': true
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= project.app %>/js/**/*.js',
                '!<%= project.app %>/js/etc/**/*.js'
            ]
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= project.dist %>/*',
                            '!<%= project.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            styles: {
                expand: true,
                cwd: '<%= project.app %>/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ]
        },
        // Test settings
        karma: {
            unit: {
                configFile: 'config/karma.conf.js',
                singleRun: true
            }
        }


    });


    grunt.registerTask('serve', function () {
        grunt.task.run([
            'findRandomPorts',
            'clean:server',
            'concurrent:server',
            'configureProxies:server',
            'connect:server',
            'watch'
        ]);
    });


    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'findRandomPorts',
        'clean:server',
        'concurrent:test',
        'connect:test',
        'karma:unit'
    ]);


    grunt.registerTask('default', [
        'serve'
    ]);

    grunt.registerTask('findRandomPorts', function () {
        // Find random ports if no settings file is specified
        if (!settings) {
            grunt.task.run(['portPickIndie', 'setLiveReloadPort']);
        }
    });

    grunt.registerTask('setLiveReloadPort', function () {
        // if we load panama.ports.livereload directly in the config, the port is stored a string.
        // the livereload plugin can't handle this so we need to set in this task, as a number
        grunt.config.set('panama.ports.livereload', grunt.config.get('port-pick-2'));
    });

};
