# generator-node-cs [![Build Status](https://secure.travis-ci.org/kirstein/generator-node-cs.png?branch=master)](https://travis-ci.org/kirstein/generator-node-cs)

> Generator that helps to set up a simple node project in coffeescript.  
> No bullshit. No boilerplate. Just a good simple foundation to build upon.

# What you get

   * Grunt  
     * test running
     * linting
     * watchers
     * building
     * version bumps

   * Mocha
     * `should.js` by default
     * coveralls support

  * Coffeelint 
  * Out of the box [travis](https://travis-ci.org) support

# Getting Started

### Installing

To install _generator-node-cs_, run:  
```bash
  $ npm install -g generator-node-cs
```

Initialize the generator:
```bash
  $ yo generator-node-cs
```

Start hacking!

### Available grunt tasks

Running spec tests and lint your amazing code  
```bash
  $ grunt test
```

Coverage (you will need to pipe the results)  
```bash
  $ grunt cov > cov.html
```

Building coffeescript to js  
```bash
  $ grunt build
```

Linting your coffeescript (by rules defined in coffeelint.json)  
```bash
  $ grunt lint
```

Watching files for changes. Will trigger `test` job on file changes  
```bash
  $ grunt watch
```

## License

MIT
