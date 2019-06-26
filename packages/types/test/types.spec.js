import test from 'ava'

import T from '..'

test('members', t => {
  t.not(T.FeatureCollection)
  t.not(T.Feature)
  t.not(T.Geometry)
})

test('toString', t => {
  const geometry = T.Geometry.Point([10, 10])
  const properties = { label: 'address 11', score: 0.1 }

  const feature = T.Feature.Feature(geometry, properties)

  const collection = T.FeatureCollection.FeatureCollection([feature])

  const res = T.FeatureCollection.toString(collection)

  t.deepEqual(JSON.parse(res), {
    '_keys': [
      'features'
    ],
    '_name': 'FeatureCollection',
    'features': [
      {
        '_keys': [
          'geometry',
          'properties'
        ],
        '_name': 'Feature',
        'geometry': {
          '_keys': [
            'coordinates'
          ],
          '_name': 'Point',
          'coordinates': [
            10,
            10
          ]
        },
        'properties': {
          'label': 'address 11',
          'score': 0.1
        }
      }
    ]
  })
})
