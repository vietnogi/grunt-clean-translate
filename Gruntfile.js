/*
 * grunt-clean-translate
 * https://github.com/vietnogi/grunt-clean-translate
 *
 * Copyright (c) 2014 Alex Tran
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    clean_translate: {
      en: {
        options: {
          translationFile: 'test/fixtures/en.json',
          matches: [
            new RegExp('translate="(.*)"', 'gi'),
            new RegExp("'(.*)' \\\| translate", 'gi'),
            new RegExp("i18n.t\\\('(.*)'", 'gi')
          ]
        },
        files: {
          'tmp': ['test/fixtures/testing.js', 'test/fixtures/123.html']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-debug-task');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'clean_translate', 'nodeunit']);

  // By default, lint and run all tests.
  //grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('default', ['test']);
};
