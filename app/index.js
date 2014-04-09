'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var url = require('url');
var GitHub = require('github');

var getGithubOptions = function() {
  var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
  var res = {
    version: '3.0.0'
  };
  if (proxy) {
    var proxyUrl = url.parse(proxy);
    res.proxy = {
      host: proxyUrl.hostname,
      port: proxyUrl.port
    };
  }
  return res;
};

var github = new GitHub(getGithubOptions());
var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw new Error(err.message + '\n\nCannot fetch your github profile. Make sure you\'ve typed it correctly.');

    }
    cb(JSON.parse(JSON.stringify(res)));

  });

};

var NodeCsGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(this.yeoman);
    this.log(chalk.magenta('Node coffeescript generator. No bullshit.'));

    var prompts = [{
      name: 'moduleName',
      message: 'Module name',
      default: path.basename(process.cwd())
    }, {
      name: 'description',
      message: 'Module description'
    }, {
      name: 'licence',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUser',
      message: 'GitHub username'
    }];

    this.prompt(prompts, function (props) {
      this.githubUser = props.githubUser;
      this.moduleName = props.moduleName;
      this.slugName = this._.slugify(this.moduleName);
      this.licence = props.licence || '';
      this.description = props.description || '';
      done();
    }.bind(this));
  },

  userInfo: function () {
    var done = this.async();

    if (!this.githubUser) {
      this.log(chalk.yellow('No github user set.'));
      this.realname = '';
      this.email = '';
      this.githubUrl = '';
      return done();
    }

    githubUserInfo(this.githubUser, function (res) {
      /* jshint camelcase: false */
      this.realname = res.name;
      this.email = res.email;
      this.githubUrl = res.html_url;
      done();

    }.bind(this));
  },

  dist: function () {
    this.mkdir('dist');
  },

  src: function () {
    this.mkdir('src');
    this.copy('src/src.coffee', 'src/' + this.slugName + '.coffee');
  },

  test: function () {
    this.mkdir('test');
    this.template('test/test.spec.coffee', 'test/' + this.slugName + '.spec.coffee');
  },

  setup: function () {
    this.copy('_coffeelint.json', 'coffeelint.json');
    this.copy('_travis.yml', '.travis.yml');
    this.copy('_gitignore', '.gitignore');

    this.template('_Gruntfile.coffee', 'Gruntfile.coffee');
    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');
  }

});

module.exports = NodeCsGenerator;
