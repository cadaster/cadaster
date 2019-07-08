import test from 'ava'

import Type from '..'

test('predicate', t => {
  const isEmail = str => {
    const re = /.+@.+\..+/
    return re.test(str)
  }

  const Contact = Type({ Email: [isEmail] })
  const email = Contact.Email('nyx@gmail.com')
  t.is(email[0], 'nyx@gmail.com')

  // throws if field value does not pass validator
  t.throws(() => Contact.Email(45), TypeError)
})

test('primitive constructors', t => {
  // String
  const Name = Type({ Name: [String] })
  t.is(Name.Name('Nyx')[0], 'Nyx')

  t.throws(() => Name.Name(1), TypeError)

  // Number
  const Age = Type({ Age: [Number] })
  t.is(Age.Age(25)[0], 25)

  t.throws(() => Age.Age('ok'), TypeError)

  // Boolean
  const Exists = Type({ Exists: [Boolean] })
  t.is(Exists.Exists(true)[0], true)
  t.is(Exists.Exists(false)[0], false)

  t.throws(() => Exists.Exists(12)[0], TypeError)
})

test('nested types', t => {
  const Point = Type({ Point: [Number, Number] })
  const Shape = Type({
    Circle: [Number, Point],
    Rectangle: [Point, Point]
  })

  const p0 = Point.Point(0, 0)
  const p1 = Point.Point(1, 1)

  const square = Shape.Rectangle(p0, p1)
  t.is(square[0], p0)
  t.is(square[1], p1)

  // throw if field value is not of correct type
  t.notThrows(() => Shape.Circle(1, p0))
  t.throws(() => Shape.Circle(1, [0, 0]), TypeError)
})
