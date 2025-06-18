import { describe, it, expect } from 'vitest';
import ABMarker from '@/models/ab-marker';
import ABPopup from '@/models/ab-popup';

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
        expect(marker.getIconSize()).toEqual([30, 30]);
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