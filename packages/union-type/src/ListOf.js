const R = require('ramda')

const Type = require('./Type')

function ListOf (T) {
  const List = Type({ List: [Array] })
  const innerType = Type({ T: [T] }).T

  const check = (v, i) => {
    try {
      innerType(v)
    } catch (err) {
      const message = `wrong value ${v} passed at index ${i} in List`
      throw new TypeError(message)
    }
  }

  const validate = List.case({
    List: function (array) {
      array.forEach(check)

      return true
    }
  })

  return R.compose(validate, List.List)
}

module.exports = ListOf
