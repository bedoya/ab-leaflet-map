import { ABLeafletMap } from '../../dist/ab-leaflet-map.es.js'

const config = {
  center: [5.5, -73.8],
  zoom: 14,
}

const markers = [{
    type: 'restaurant',
    lat: 5.4914,
    lng: -73.7612,
    waze: true
  },
  {
    type: 'waterfall',
    lat: 5.4961,
    lng: -73.7972,
    iconSize: [
      50,
      50
    ],
    popup: {
      content: "<div>This is some text added to the example which also has a link to <a href='https://google.com'>Google</a>. This link will open in the same window because it doesn't have a <strong>target=\"_blank\"</strong> element</div>"
    }
  },
  {
    type: 'house',
    lat: 5.5003,
    lng: -73.7719,
    iconSize: [
      25,
      25
    ],
    popup: {
      text: 'This element has a link to Google, but the entire text is the link. This element is created using the text, link and class keys of the JSON object.',
      link: 'https://google.com',
      class: 'w-full text-blue-300 hover:text-blue-500 transition duration-300 no-underline',
      options: {
        maxWidth: 180,
        closeButton: true,
        offset: [
          20,
          -20
        ],
      }
    },
    waze: true
  }];

const map = new ABLeafletMap('#map', { config: config, markers: markers })
map.render();