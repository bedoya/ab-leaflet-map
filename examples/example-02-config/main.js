import { ABLeafletMap } from '../../dist/ab-leaflet-map.es.js';

const configData = {
    center: [10.5, -74.8],
    zoom: 8,
};

const map = new ABLeafletMap('#map', { config: configData });
map.render();
