const Type = require('@cadaster/union-type')

// types

const Geometry = Type({
  Point: {
    coordinates: Array
  }
})

Geometry.fromFeature = feature => {
  const { geometry: { coordinates } } = feature
  return Geometry.Point(coordinates)
}

const Feature = Type({
  Feature: {
    geometry: Object,
    properties: Object
  }
})

Feature.from = body => {
  const geometry = Geometry.from(body.geometry)
  const properties = body.properties

  return Feature.Feature(geometry, properties)
}

const FeatureCollection = Type({
  FeatureCollection: {
    features: Type.ListOf(Feature)
  }
})

module.exports = {
  FeatureCollection,
  Feature,
  Geometry
}
