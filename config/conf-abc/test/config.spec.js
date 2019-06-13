import test from 'ava'

import config from '..'

test('fields', t => {
  t.not(config.a, undefined)
  t.not(config.b, undefined)
  t.not(config.c, undefined)
})
