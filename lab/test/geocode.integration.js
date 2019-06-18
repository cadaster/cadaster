import test from 'ava'

import Adapter from '@cadaster/adapter-geojson-fulltext'

// assets

const GEOJSON_DATA = require('./abcd.geo.json')

// hypothetic usage

const adapter = new Adapter({ data: GEOJSON_DATA })

function locateWith (address) {
  const head = arr => arr[0]

  return adapter
    .search({ address })
    .then(result => head(result.members))
}

/**
 * Show result as string
 *
 * @returns {String} - Info on position or 'Unknown'
 */

function compileReportFor (address) {
  const toText = ({ location }) => {
    const { coordinates } = location.geometry
    const [ long, lat ] = coordinates
    return `(${long},${lat})`
  }

  const resolve = location =>
    location
      ? toText(location)
      : 'Unknown'

  return locateWith(address)
    .then(resolve)
}

// tests

test('main cases', async t => {
  const [{ geometry, properties }] = GEOJSON_DATA.features
  const [ long, lat ] = geometry.coordinates
  const address = properties.name

  await compileReportFor(address)
    .then(report => {
      t.is(report, `(${long},${lat})`)
    })

  await compileReportFor('xxxyyyzzz')
    .then(report => {
      t.is(report, 'Unknown')
    })
})

// more realistic usage

test('ok/unknown case separation', async t => {
  const safeStringify = address => {
    const ensafe = res => {
      if (res !== 'Unknown') return res

      const err = new Error('Unknown')
      return Promise.reject(err)
    }

    return compileReportFor(address)
      .then(ensafe)
  }

  await t.notThrowsAsync(() => safeStringify('black'))
  await t.throwsAsync(() => safeStringify('xxxyyyzzz'))
})

// known issues

test.todo('input validation')
test.todo('safe results')
