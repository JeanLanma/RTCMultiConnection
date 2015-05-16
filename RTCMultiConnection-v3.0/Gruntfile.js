'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt, {
        pattern: 'grunt-*',
        config: 'package.json',
        scope: 'devDependencies'
    });

    // configure project
    grunt.initConfig({
        // make node configurations available
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                separator: ''
            },
            dist: {
                src: [
                    'head.js',
                    'RTCMultiConnection.js',
                    'MultiPeersHandler.js',
                    'RTCPeerConnection.js',
                    'getUserMedia.js',
                    'globals.js',
                    'BandwidthHandler.js',
                    'DetectRTC.js',
                    'FileProgressBarHandler.js',
                    'getScreenId.js',
                    'IceServersHandler.js',
                    'OnIceCandidateHandler.js',
                    'Plugin.EveryWhere.js',
                    'StreamsHandler.js',
                    'TextSenderReceiver.js',
                    'TranslationHandler.js',
                    'tail.js'
                ],
                dest: 'Single-File/RTCMultiConnection.js',
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'Single-File/RTCMultiConnection.min.js': ['Single-File/RTCMultiConnection.js']
                }
            }
        },
        jsbeautifier: {
            files: ['Single-File/RTCMultiConnection.js', '*.js', 'Gruntfile.js'],
            options: {
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                },
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: '%VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }
    });

    // enable plugins

    // set default tasks to run when grunt is called without parameters
    // http://gruntjs.com/api/grunt.task
    grunt.registerTask('default', ['concat', 'jsbeautifier', 'uglify']);
};
