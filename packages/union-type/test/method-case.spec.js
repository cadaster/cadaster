import test from 'ava'

import Type from '..'

const Geometry = Type({
  Line: { length: Number },
  Circle: { radius: Number },
  Rectangle: {
    length: Number,
    width: Number
  }
})

// tests

test('behavior', t => {
  // work on types
  const areaOf = Geometry.case({
    Line: () => 0,
    Circle: (r) => 2 * Math.PI * r,
    Rectangle: (x, y) => x * y
  })

  t.is(areaOf(Geometry.Line(1)), 0)
  // try record type
  t.is(areaOf(Geometry.CircleOf({ radius: 1 })), 2 * Math.PI)
  t.is(areaOf(Geometry.Rectangle(2, 3)), 6)
})

test('default case', t => {
  // call back to placeholder

  const isSquare = Geometry.case({
    Rectangle: (x, y) => x === y,
    _: () => false
  })

  t.is(isSquare(Geometry.Rectangle(3, 3)), true)
  t.is(isSquare(Geometry.Rectangle(2, 3)), false)
  t.is(isSquare(Geometry.Line(1)), false)
  t.is(isSquare(Geometry.Circle(1)), false)

  // throws on incorrect type
  t.throws(() => isSquare([10, 10]), TypeError)
})

test('exhaustive', t => {
  // throws if no case handler found
  const lengthOf = Geometry.case({
    Line: (x) => x
  })

  t.throws(() => lengthOf(Geometry.Circle(2)))
})
