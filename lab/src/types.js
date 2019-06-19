// FeatureCollection
// geocoder :: String
// features :: [Feature]

// Feature
// id :: Maybe String
// geometry :: Geometry
// properties :: Record { address :: Address,
//                        score :: Score }
const R = require('ramda')

const Type = require('union-type')

const Position = Type({
  Coordinates: {
    longitude: Number,
    latitude: Number
  }
})

const Geometry = Type({
  Point: [Position]
})

Geometry.from = body => {
  const longitude = 10
  const latitude = 10
  const coordinates = Position.Coordinates(longitude, latitude)
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

FeatureCollection.from = (body) => {
  const features = R.map(Feature.from, body.features)
  return FeatureCollection.FeatureCollection(features)
}

module.exports = {
  FeatureCollection,
  Feature
}
