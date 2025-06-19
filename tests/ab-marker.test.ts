import { describe, it, expect, beforeEach } from 'vitest';
import ABMarker from '@/models/ab-marker';
import ABPopup from '@/models/ab-popup';
import { registerMarkerType, getIconForType, getAvailableMarkerTypes, __resetMarkerTypesForTest } from '@/utils/ab-marker-utils';

describe('ABMarker', () => {
    const lat = 5.4914;
    const lng = -73.7612;

    it('throws error if lat/lng are missing or invalid', () => {
        expect(() => new ABMarker({})).toThrow();
        expect(() => new ABMarker({ lat: '5', lng })).toThrow();
        expect(() => new ABMarker({ lat, lng: null })).toThrow();
    });

    it('initializes with default options when no overrides are provided', () => {
        const marker = new ABMarker({ lat, lng });
        expect(marker.getType()).toBe('default');
        expect(marker.getIconSize()).toEqual([50, 50]);
        expect(marker.getPopup()).toBeUndefined(); // no popup or waze
    });

    it('creates popup with only Waze button when popup is not provided', () => {
        const marker = new ABMarker({ lat, lng, waze: true });
        const popup = marker.getPopup();
        expect(popup).toBeInstanceOf(ABPopup);
        expect(popup?.content).toContain('waze.com'); // or use partial match
    });

    it('creates popup with only content input', () => {
        const marker = new ABMarker({
            lat,
            lng,
            popup: {
                content: 'Custom content'
            }
        });
        const popup = marker.getPopup();
        expect(popup).toBeInstanceOf(ABPopup);
        expect(popup?.content).toContain('Custom content');
        expect(popup?.content).not.toContain('waze.com');
    });

    it('creates popup with content and Waze button', () => {
        const marker = new ABMarker({
            lat,
            lng,
            waze: true,
            popup: {
                content: 'Restaurant'
            }
        });
        const popup = marker.getPopup();
        expect(popup).toBeInstanceOf(ABPopup);
        expect(popup?.content).toContain('Restaurant');
        expect(popup?.content).toContain('waze.com');
        expect(popup?.content).toContain('<br>');
    });

    it('does not create popup when neither popup nor waze is provided', () => {
        const marker = new ABMarker({ lat, lng });
        expect(marker.getPopup()).toBeUndefined();
    });
});

describe('Marker Type Registration', () => {

    beforeEach(() => {
        __resetMarkerTypesForTest();
    });

    it('should register a new marker type "forest" with a valid URL', () => {
        const iconForest = 'https://www.svgrepo.com/show/120295/forest.svg';
        registerMarkerType('forest', iconForest);

        const types = getAvailableMarkerTypes();

        expect(types).toContain('forest');
        expect(getIconForType('forest')).toBe(iconForest);
    });

    it('should not register a marker type if icon URL is empty', () => {
        expect(() => registerMarkerType('broken', '')).toThrow('Invalid icon URL');
    });

    it('should not register a marker type if type is empty', () => {
        const iconForest = 'https://www.svgrepo.com/show/120295/forest.svg';
        expect(() => registerMarkerType('', iconForest)).toThrow('Invalid marker type');
    });

    it('should throw if trying to override existing type without override=true', () => {
        const original = 'https://www.svgrepo.com/show/120295/forest.svg';
        const alternate = 'https://www.svgrepo.com/show/72241/forest.svg';

        registerMarkerType('forest', original);

        expect(() => {
            registerMarkerType('forest', alternate, false);
        }).toThrowError("Marker type 'forest' already exists. Use override=true to replace.");
    });

    it('should override an existing type if override is true', () => {
        const iconForest = 'https://www.svgrepo.com/show/120295/forest.svg';

        registerMarkerType('forest', iconForest, true);

        expect(getIconForType('forest')).toBe(iconForest); // Sí se sobrescribe
    });
});