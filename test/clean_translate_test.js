'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.clean_translate = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  missing: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/missing_keys');
    var expected = grunt.file.read('test/expected/missing_keys');
    test.equal(actual, expected, 'should list missing keys.');

    test.done();
  },
  stale: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/stale_keys');
    var expected = grunt.file.read('test/expected/stale_keys');
    test.equal(actual, expected, 'should list stale keys.');

    test.done();
  }
};
