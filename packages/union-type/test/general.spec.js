import test from 'ava'

import Type from '..'

import * as R from 'ramda'

// tests

test('basic usage', t => {
  const isNumber = R.is(Number)

  // return type w/ constructor
  const Point = Type({ Point: [isNumber, isNumber] })
  t.is(typeof Point.Point, 'function', 'return type construct')

  // constructor create object with fields in array
  const point = Point.Point(5, 10)
  t.is(point[0], 5)
  t.is(point[1], 10)

  // iterator support
  t.deepEqual([...point], [5, 10], 'spread as iterator')
})

test('records', t => {
  // create types from object descriptions
  const Geometry = Type({ Point: { x: Number, y: Number } })

  // create value from arguments
  const point = Geometry.Point(1, 2)
  t.is(point.x, 1)
  t.is(point.y, 2)

  // create type from object
  const point2 = Geometry.PointOf({ x: 3, y: 4 })
  t.is(point2.x, 3)
  t.is(point2.y, 4)

  // not add numerical properties to records
  t.is(point[0], undefined)
  t.is(point[1], undefined)

  // iterator support
  t.deepEqual([...point], [1, 2], 'spread as iterator')
})

test('argument count', t => {
  const { Name } = Type({ Name: [String, String] })

  // exact number
  t.is(Name('Nyx', 'Jan')[0], 'Nyx')

  // curried
  t.is(typeof Name('Nyx'), 'function')
  t.is(Name('Nyx')('Jan')[0], 'Nyx')

  // throw on too many args
  t.throws(() => Name('Nyx', 'B.', 'Jan'), Error, 'many args')
})
