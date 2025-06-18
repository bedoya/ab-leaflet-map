import { ABLeafletMap } from '../../dist/ab-leaflet-map.es.js'

const geometry = {
  type: 'Polygon',
  coordinates: [
    [
      [-73.698217978044, 5.0399321913733],
      [-73.697513549485, 5.0394780437462],
      [-73.69727151482, 5.0399006256328],
      [-73.697972608505, 5.0404077750656],
      [-73.698217978044, 5.0399321913733],
    ],
  ],
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
  geojson: features,
})
map.render()