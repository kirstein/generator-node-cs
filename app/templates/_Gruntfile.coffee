module.exports = (grunt) ->

  # Require all grunt plugins at once
  require('load-grunt-tasks')(grunt)

  ###
  # tasks
  ###
  grunt.registerTask 'test',    [ 'mochacov:spec' ]
  grunt.registerTask 'cov',     [ 'mochacov:cov' ]
  grunt.registerTask 'default', [ 'test' ]
  grunt.registerTask 'build',   [ 'clean', 'coffee:dist' ]

  ###
  # config
  ###
  grunt.initConfig
    # Coverage tests
    mochacov :
      travis :
        options : coveralls : serviceName : 'travis-ci'
      spec :
        options : reporter : 'spec'
      cov  :
        options : reporter : 'html-cov'
      options :
        compilers : [ 'coffee:coffee-script/register' ]
        files     : [ 'test/**/*.spec.coffee' ]
        require   : [ 'should' ]
        growl     : true
        ui        : 'tdd'

    # Watch for file changes.
    watch:
      lib:
        files : [ '**/*.coffee' ]
        tasks : [ 'test' ]
        options :
          nospawn : true

    clean: [ 'dist']

    coffee:
      options:
        join: true
      dist:
        files:
          'dist/<%= slugName %>.js' : 'src/**/*.coffee'

