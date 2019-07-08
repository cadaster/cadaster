const R = require('ramda')

const isObject = function (value) {
  var type = typeof value
  return !!value && (type === 'object' || type === 'function')
}

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
    case Number:
    case Boolean:
    case Array:
    case Function:
      return R.is(ctor)
    case Object:
      return isObject
    case undefined:
      return group
    default:
      return ctor
  }
}

function validate (group, validators, name, args) {
  if (args.length > validators.length) {
    const tagline = `too many arguments supplied to constructor ${name}`
    const summary = `expected ${validators.length} but got ${args.length}`

    throw new TypeError(`${tagline} (${summary})`)
  }

  const check = (v, i) => {
    const isValid = predForCtor(group, validators[i])

    const A = isValid.prototype === undefined || !isValid.prototype.isPrototypeOf(v)
    const B = typeof isValid !== 'function' || !isValid(v)

    if (A && B) {
      const strVal = typeof v === 'string' ? "'" + v + "'" : v // put the value in quotes if it's a string
      throw new TypeError(`wrong value ${strVal} passed as N${i} argument to constructor ${name}`)
    }
  }

  Array
    .from(args)
    .forEach(check)
}

module.exports = validate
