/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('node-cs generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('node-cs:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.gitignore',
      '.travis.yml',
      'Gruntfile.coffee',
      'coffeelint.json',
      'package.json',
      'README.md',
      'src/super-awesome.coffee',
      'test/super-awesome.spec.coffee'
    ];

    helpers.mockPrompt(this.app, {
      'moduleName': 'super awesome'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
