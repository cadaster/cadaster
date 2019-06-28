const R = require('ramda')

const validate = require('./validate')
const createIterator = require('./iterator')

function valueToArray (value) {
  return R.props(value._keys, value)
}

function constructor (group, name, fields) {
  const keys = Object.keys(fields)
  const validators = Array.isArray(fields)
    ? fields
    : R.props(keys, fields)

  function construct () {
    const val = Object.create(group.prototype)

    val._keys = keys
    val._name = name

    validate(group, validators, name, arguments)

    for (let i = 0; i < arguments.length; ++i) {
      val[keys[i]] = arguments[i]
    }

    return val
  }

  group[name] = keys.length === 0
    ? construct()
    : R.curryN(keys.length, construct)

  if (keys !== undefined) {
    group[name + 'Of'] = function (obj) {
      return construct.apply(undefined, R.props(keys, obj))
    }
  }
}

function rawCase (type, cases, value, arg) {
  var wildcard = false
  var handler = cases[value._name]

  if (handler === undefined) {
    handler = cases['_']
    wildcard = true
  }

  if (!type.prototype.isPrototypeOf(value)) {
    throw new TypeError('wrong type passed to case')
  } else if (handler === undefined) {
    throw new Error('non-exhaustive patterns in a function')
  }

  if (handler !== undefined) {
    var args = wildcard === true
      ? [arg]
      : arg !== undefined
        ? valueToArray(value).concat([arg])
        : valueToArray(value)
    return handler.apply(undefined, args)
  }
}

const typeCase = R.curryN(3, rawCase)
const caseOn = R.curryN(4, rawCase)

function Type (desc) {
  const obj = {}

  obj.case = typeCase(obj)
  obj.caseOn = caseOn(obj)

  obj.prototype = {}
  obj.prototype[Symbol ? Symbol.iterator : '@@iterator'] = createIterator
  obj.prototype.case = function (cases) { return obj.case(cases, this) }
  obj.prototype.caseOn = function (cases) { return obj.caseOn(cases, this) }

  for (const key in desc) {
    constructor(obj, key, desc[key])
  }

  return obj
}

module.exports = Type
