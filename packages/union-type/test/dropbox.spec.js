import test from 'ava'

import * as R from 'ramda'

import Type from '..'

test('array of types', t => {
  const Point = Type({ Point: [Number, Number] })
  const Shape = Type({ Shape: [Type.ListOf(Point)] }).Shape

  t.throws(() => {
    Shape([1, Point.Point(1, 2), 3])
  }, /wrong value 1 passed at index 0 in List/)

  t.throws(() => {
    Shape([Point.Point(1, 2), Point.Point('3', 1)])
  }, /wrong value/)

  Shape([Point.Point(1, 2), Point.Point(1, 2)])
  Shape([])

  t.throws(() => Shape('not a List'), /wrong value/)
})

test('custom prototype methods', t => {
  const Maybe = Type({
    Just: [R.T],
    None: []
  })

  Maybe.prototype.map = function (fn) {
    return Maybe.case({
      None: () => Maybe.None,
      Just: (v) => Maybe.Just(fn(v))
    }, this)
  }

  const just1 = Maybe.Just(1)
  const just4 = just1.map(R.add(3))
  t.is(just4[0], 4)

  const nothing = Maybe.None
  const alsoNothing = nothing.map(R.add(3))
  t.is(alsoNothing._name, 'None')
})

test('recursive data types', t => {
  // eslint-disable-next-line no-use-before-define
  var List = Type({ Nil: [], Cons: [R.T, List] })

  // can create single element list
  t.notThrows(() => List.Cons(1, List.Nil))

  // can get head
  const list = List.Cons(1, List.Cons(2, List.Cons(3, List.Nil)))

  const toString = List.case({
    Cons: (head, tail) => head + ' : ' + toString(tail),
    Nil: () => 'Nil'
  })

  t.is(toString(list), '1 : 2 : 3 : Nil')
})

test('case instance method', t => {
  const Maybe = Type({
    Just: [Number],
    None: []
  })

  const mod = {
    Just: x => x + 2,
    None: () => 0
  }

  t.is(Maybe.Just(1).case(mod), 3)
})
