/*
 * grunt-clean-translate
 * https://github.com/vietnogi/grunt-clean-translate
 *
 * Copyright (c) 2014 Alex Tran
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  function getFlattenKeys (data) {
    var result = {};

    function recurse (cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = 0;
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty) {
          result[prop] = 0;
        }
      }
    }

    recurse(data, "");

    return result;
  }

  function getStaleKeys (translationKeys) {
    var staleKeys = [];

    Object.keys(translationKeys).forEach(function (key) {
      if (translationKeys[key] == 0) {
        staleKeys.push(key);
      }
    });

    return staleKeys;
  }


  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('clean_translate', 'GUse to determine which translatioon keys are missing or stale.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      translationFile: null,
      matches: []
    });

    // Read translation file
    var translationKeys = getFlattenKeys(grunt.file.readJSON(options.translationFile));
    var missingKeys = [];
    if (!translationKeys) {
      grunt.log.warn('Translation file "' + options.translationFile + '" not found.');
      return false;
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).every(function (filepath) {
        var content = grunt.file.read(filepath);

        options.matches.every(function (regex) {
          content.replace(regex, function (matched, tKey) {
            if (translationKeys[tKey] === undefined) {
              missingKeys.push(tKey);
            }
            else {
              translationKeys[tKey] += 1;
            }

            return matched;
          });

          return true;
        });

        return true;
      });

      // Write the destination file.
      grunt.file.write(f.dest + '/missing_keys', missingKeys.join("\n"));

      grunt.file.write(f.dest + '/stale_keys', getStaleKeys(translationKeys).join("\n"));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
