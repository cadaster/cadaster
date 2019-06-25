const R = require('ramda')

const isObject = function (value) {
  var type = typeof value
  return !!value && (type === 'object' || type === 'function')
}

const isArray = Array.isArray

/** Get predicate for given constructor
   *
   * @param {Any} group
   * @param {Function} ctor
   *
   * @returns {Function}
   */

function predForCtor (group, ctor) {
  switch (ctor) {
    case String:
      return R.is(String)
    case Number:
      return R.is(Number)
    case Boolean:
      return R.is(Boolean)
    case Array:
      return R.is(Array)
    case Function:
      return R.is(Function)
    case Object:
      return isObject
    case undefined:
      return group
    default:
      return ctor
  }
}

var numToStr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']

var validate = function (group, validators, name, args) {
  var validator, v, i
  if (args.length > validators.length) {
    throw new TypeError('too many arguments supplied to constructor ' + name +
      ' (expected ' + validators.length + ' but got ' + args.length + ')')
  }
  for (i = 0; i < args.length; ++i) {
    v = args[i]
    validator = predForCtor(group, validators[i])
    if (Type.check === true &&
        (validator.prototype === undefined || !validator.prototype.isPrototypeOf(v)) &&
        (typeof validator !== 'function' || !validator(v))) {
      var strVal = typeof v === 'string' ? "'" + v + "'" : v // put the value in quotes if it's a string
      throw new TypeError('wrong value ' + strVal + ' passed as ' + numToStr[i] + ' argument to constructor ' + name)
    }
  }
}

function valueToArray (value) {
  var i; var arr = []
  for (i = 0; i < value._keys.length; ++i) {
    arr.push(value[value._keys[i]])
  }
  return arr
}

function constructor (group, name, fields) {
  const keys = Object.keys(fields)
  const validators = isArray(fields)
    ? fields
    : R.props(keys, fields)

  function construct () {
    var val = Object.create(group.prototype); var i
    val._keys = keys
    val._name = name
    if (Type.check === true) {
      validate(group, validators, name, arguments)
    }
    for (i = 0; i < arguments.length; ++i) {
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
  if (Type.check === true) {
    if (!type.prototype.isPrototypeOf(value)) {
      throw new TypeError('wrong type passed to case')
    } else if (handler === undefined) {
      throw new Error('non-exhaustive patterns in a function')
    }
  }
  if (handler !== undefined) {
    var args = wildcard === true ? [arg]
      : arg !== undefined ? valueToArray(value).concat([arg])
        : valueToArray(value)
    return handler.apply(undefined, args)
  }
}

var typeCase = R.curryN(3, rawCase)
var caseOn = R.curryN(4, rawCase)

function createIterator () {
  return {
    idx: 0,
    val: this,
    next: function () {
      var keys = this.val._keys
      return this.idx === keys.length
        ? { done: true }
        : { value: this.val[keys[this.idx++]] }
    }
  }
}

function Type (desc) {
  var obj = {}
  obj.case = typeCase(obj)
  obj.caseOn = caseOn(obj)

  obj.prototype = {}
  obj.prototype[Symbol ? Symbol.iterator : '@@iterator'] = createIterator
  obj.prototype.case = function (cases) { return obj.case(cases, this) }
  obj.prototype.caseOn = function (cases) { return obj.caseOn(cases, this) }

  for (let key in desc) {
    constructor(obj, key, desc[key])
  }

  return obj
}

Type.check = true

module.exports = Type

module.exports.ListOf = function (T) {
  var List = Type({ List: [Array] })
  var innerType = Type({ T: [T] }).T
  var validate = List.case({
    List: function (array) {
      try {
        for (var n = 0; n < array.length; n++) {
          innerType(array[n])
        }
      } catch (e) {
        throw new TypeError('wrong value ' + array[n] + ' passed to location ' + numToStr[n] + ' in List')
      }
      return true
    }
  })
  return R.compose(validate, List.List)
}
