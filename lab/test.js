import test from 'ava'

test('failing', t => {
  t.fail('shoud not run on root test')
})
