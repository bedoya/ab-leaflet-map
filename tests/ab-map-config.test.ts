import { describe, it, expect } from 'vitest';
import ABMapConfig from '@/models/ab-map-config';
import { deserializeConfig } from '@/utils/ab-map-config-utils';

describe('ABMapConfig', () => {
    it('should correctly apply settings from input JSON', () => {
        const rawConfig = {
            zoom: 16,
            'line-color': 'rgb(255, 102, 0)',
            'line-opacity': 0.7,
            icons: { size: [50, 50], anchor: [20, 40] },
            waze: true,
        };

        const parsedConfig = deserializeConfig(rawConfig);
        const config = new ABMapConfig(parsedConfig);

        expect(config.getZoom()).toBe(16);
        expect(config.getColor()).toBe('rgb(255, 102, 0)');
        expect(config.getOpacity()).toBe(0.7);
        expect(config.getIconSize()).toEqual([50, 50]);

        expect(config.getCenter()).toEqual([5.063, -73.705]);
        expect(config.getFillOpacity()).toBe(0.2);
    });
});