# exec-promise

[![Build Status](https://img.shields.io/travis/JsCommunity/exec-promise/master.svg)](http://travis-ci.org/JsCommunity/exec-promise)
[![Dependency Status](https://david-dm.org/JsCommunity/exec-promise/status.svg?theme=shields.io)](https://david-dm.org/JsCommunity/exec-promise)
[![devDependency Status](https://david-dm.org/JsCommunity/exec-promise/dev-status.svg?theme=shields.io)](https://david-dm.org/JsCommunity/exec-promise#info=devDependencies)

> Testable CLIs with promises

**Features**

- executes the passed function with command line arguments
- wait for completion (sync or promise) before stopping Node
- in case of exception: pretty print the value and exit with exit code 1
- in case of returned value (not undefined):
    - if valid exit code (integer), exit Node with it
    - otherwise, pretty print it

## Introduction

**TODO**

- executables should be testable
- the execution flow should be predictable and followable (promises)

## Install

Download [manually](https://github.com/JsCommunity/exec-promise/releases) or with package-manager.

#### [npm](https://npmjs.org/package/exec-promise)

```
npm install --save exec-promise
```

This library requires promises support, for Node versions prior to 0.12 [see
this page](https://github.com/JsCommunity/js-promise-toolbox#usage) to
enable them.

## Example

### ES 2015

```javascript
import execPromise from 'exec-promise'

// - The command line arguments are passed as first parameter.
// - Node will exists as soon as the promise is settled (with a code
//   different than 0 in case of an error).
// - All errors are catched and properly displayed with a stack
//   trace.
// - Any returned value (i.e. not undefined) will be prettily
//   displayed
execPromise(async args => {
  // ... do what you want here!
})
```

### ES5

```javascript
module.exports = function (args) {
  if (args.indexOf('-h') !== -1) {
    return 'Usage: my-program [-h | -v]'
  }

  if (args.indexOf('-v') !== -1) {
    var pkg = require('./package')
    return 'MyProgram version ' + pkg.version
  }

  var server = require('http').createServer()
  server.listen(80)

  // The program will run until the server closes or encounters an
  // error.
  return require('event-to-promise')(server, 'close')
}

// Executes the exported function if this module has been called
// directly.
if (!module.parent) {
  require('exec-promise')(module.exports)
}
```

## Contributing

Contributions are *very* welcome, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/JsCommunity/human-format/issues)
  you've encountered;
- fork and create a pull request.

## License

ISC © [Julien Fontanet](http://julien.isonoe.net)
