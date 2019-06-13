import test from 'ava'

import { isFunction, isNumber } from './_helpers'

import xxx from '..'

test('signature', t => {
  t.true(isFunction(xxx), 'is function')
  t.true(isNumber(xxx()), 'returns number')
})

test('behavior', t => {
  t.is(xxx(), xxx.ZERO, 'valid result')
})
