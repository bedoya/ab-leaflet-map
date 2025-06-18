import { ABLeafletMap } from '../../dist/index.js'

const geometry = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [-73.6982, 5.0399],
            [-73.6975, 5.0395],
            [-73.6973, 5.0399],
            [-73.698, 5.0404],
            [-73.6982, 5.0399]]],
      },
      'properties': {
        'name': 'Linderos de la finca',
        'style': {
          'color': '#2c3e50',
          'weight': 2,
          'fillColor': '#3498db',
          'fillOpacity': 0.3,
        },
      },
    },
    {
      'type': 'Feature',
      'geometry': { 'type': 'Point', 'coordinates': [-73.6977, 5.0401] },
      'properties': {
        'name': 'Mirador natural',
        'description': 'Vista panor\u00e1mica del embalse',
      },
    },
    {
      'type': 'Feature',
      'geometry': { 'type': 'Point', 'coordinates': [-73.6974, 5.0397] },
      'properties': {
        'name': 'Bosque de encenillos',
        'description': 'Vegetaci\u00f3n nativa protegida',
      },
    }],
}

const features = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-73.6978, 5.0399],
    },
    properties: {
      name: 'Center point',
      style: {
        color: '#FFFF00',
        radius: 8,
        fillColor: '#FFFF00',
        fillOpacity: 1,
        stroke: false,
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [-73.6980, 5.0397],
        [-73.6975, 5.0400],
        [-73.6970, 5.0403],
      ],
    },
    properties: {
      name: 'Road route',
      style: {
        color: '#FFA500',
        weight: 4,
        opacity: 0.9,
      },
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-73.698217978044, 5.0399321913733],
          [-73.697513549485, 5.0394780437462],
          [-73.69727151482, 5.0399006256328],
          [-73.697972608505, 5.0404077750656],
          [-73.698217978044, 5.0399321913733],
        ]],
    },
    properties: {
      name: 'Polygon area',
      style: {
        color: '#FF0000',
        weight: 2,
        fillOpacity: 0.1,
      },
    },
  },
]

const map = new ABLeafletMap('#map', {
  config: { center: [5.04, -73.698], zoom: 18 },
  geojson: geometry,
})
map.render()