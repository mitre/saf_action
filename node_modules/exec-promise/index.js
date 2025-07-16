'use strict'

// ===================================================================

var logSymbols = require('log-symbols')

// ===================================================================

var isString
;(function (toS) {
  var _ = function (ref) {
    ref = toS.call(ref)
    return function (val) {
      return toS.call(val) === ref
    }
  }

  isString = _('')
})(Object.prototype.toString)

// ===================================================================

function prettyFormat (value) {
  if (isString(value)) {
    return value
  }

  if (value instanceof Error) {
    return value.message + '\n' + value.stack
  }

  return JSON.stringify(value, null, 2)
}

function onSuccess (value) {
  if (typeof value === 'number' && value % 1 === 0) {
    return process.exit(value)
  }

  if (value !== undefined) {
    console.log(prettyFormat(value))
  }

  process.exit(0)
}

function onError (error) {
  console.error(logSymbols.error, prettyFormat(error))

  process.exit(1)
}

// ===================================================================

function execPromise (fn) {
  return new Promise(function (resolve) {
    resolve(fn(process.argv.slice(2)))
  }).then(onSuccess, onError)
}
exports = module.exports = execPromise
