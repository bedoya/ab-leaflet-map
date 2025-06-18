import { describe, it, expect } from 'vitest';
import { generateWazeLink } from '@/utils/ab-popup-utils';
import wazeIcon from '@/assets/logos/logo-waze.svg';

describe('generateWazeLink', () => {
    const lat = 5.1234;
    const lng = -73.5678;
    const html = generateWazeLink(lat, lng);

    it('should generate a valid Waze URL', () => {
        expect(html).toContain(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`);
    });

    it('should include the text "Enviar a Waze"', () => {
        expect(html).toContain('Enviar a Waze');
    });

    it('should include an image tag with the Waze icon', () => {
        expect(html).toContain(`<img src="${wazeIcon}"`);
    });
});