import { ABLeafletMap } from '../../dist/index.js';

const configData = {
    center: [10.5, -74.8],
    zoom: 8,
};

const map = new ABLeafletMap('#map', { config: configData });
map.render();
