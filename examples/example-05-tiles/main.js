import { ABLeafletMap } from '../../dist/index.js';

document.addEventListener('DOMContentLoaded', () => {

  const el = document.getElementById('map-default');
  console.log('map-default:', el);

  const map1 = new ABLeafletMap('map-default');
  map1.render();

  const map2 = new ABLeafletMap('map-param', {
    tile: 'cartoDark',
  });
  map2.render();

  const map3 = new ABLeafletMap('map-config', {
    config: {
      tile: 'esriSat',
    }
  });
  map3.render();
});