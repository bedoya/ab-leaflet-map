import { describe, it, expect, beforeEach } from 'vitest';
import { resetTiles } from '@/utils/ab-tile-utils';
import { ABLeafletMap } from '@/ab-leaflet-map';
import * as L from 'leaflet';

globalThis.L = L;

describe('ABLeafletMap', () => {
    let container: HTMLElement;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="map" style="width: 800px; height: 600px;"></div>
        `;
        container = document.getElementById('map')!;

        resetTiles?.();
    });

    it('should initialize and render a Leaflet map in the container', () => {
        const map = new ABLeafletMap(container);
        map.render();

        const leafletPane = container.querySelector('.leaflet-pane');
        expect(leafletPane).toBeTruthy();
    });
});
