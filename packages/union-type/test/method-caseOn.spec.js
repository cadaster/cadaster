import test from 'ava'

import Type from '..'

// tests

test('behavior', t => {
  const Mod = Type({
    Append: [Number],
    Remove: [Number],
    Slice: [Number, Number],
    Sort: []
  })

  const update = Mod.caseOn({
    Append: function (number, list) {
      return list.concat([number])
    },
    Remove: function (number, list) {
      const idx = list.indexOf(number)
      return list.slice(0, idx).concat(list.slice(idx + 1))
    },
    Slice: function (begin, end, list) {
      return list.slice(begin, end)
    },
    Sort: function (list) {
      return list.sort()
    }
  })

  // note: passes argument along to case functions
  t.deepEqual(update(Mod.Append(3), [1, 2]), [1, 2, 3])
  t.deepEqual(update(Mod.Remove(2), [1, 2, 3, 4]), [1, 3, 4])
  t.deepEqual(update(Mod.Slice(1, 3), [1, 2, 3, 4]), [2, 3])
  t.deepEqual(update(Mod.Sort, [1, 3, 2]), [1, 2, 3])

  // partially applied to same action does not affect each other
  var append3 = update(Mod.Append(3))
  t.deepEqual(append3([1, 2]), [1, 2, 3])
  t.deepEqual(append3([5, 4]), [5, 4, 3])
})

test('default', t => {
  const Action = Type({
    Jump: [],
    Move: [Number]
  })

  const Context = { x: 1, y: 2 }

  const update = Action.caseOn({
    _: ctx => ctx
  })

  // does not extract fields when matching _
  t.deepEqual(update(Action.Jump, Context), Context)
  t.deepEqual(update(Action.Move(5), Context), Context)
})
