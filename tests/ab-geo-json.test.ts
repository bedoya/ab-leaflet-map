import { describe, it, expect } from 'vitest';
import ABGeoJson from '@/models/ab-geo-json';
import { Feature, FeatureCollection, Geometry } from '@/interfaces';

describe('ABGeoJson', () => {
    it('should return the same FeatureCollection if passed one', () => {
        const input: FeatureCollection = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [0, 0]
                    },
                    properties: {}
                }
            ]
        };

        const abGeoJson = new ABGeoJson(input);
        const result = abGeoJson.getCollection();

        expect(result).toEqual(input);
    });

    it('should wrap a single Feature in a FeatureCollection', () => {
        const feature: Feature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [1, 2]
            },
            properties: {
                name: 'Test Point'
            }
        };

        const abGeoJson = new ABGeoJson(feature);
        const result = abGeoJson.getCollection();

        expect(result.type).toBe('FeatureCollection');
        expect(result.features).toHaveLength(1);
        expect(result.features[0]).toEqual(feature);
    });

    it('should wrap a raw Geometry in a FeatureCollection', () => {
        const geometry: Geometry = {
            type: 'LineString',
            coordinates: [
                [1, 2],
                [3, 4]
            ]
        };

        const abGeoJson = new ABGeoJson({ geometry });
        const result = abGeoJson.getCollection();

        expect(result.type).toBe('FeatureCollection');
        expect(result.features).toHaveLength(1);
        expect(result.features[0].geometry).toEqual(geometry);
    });
});