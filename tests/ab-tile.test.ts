import { describe, it, expect } from 'vitest';
import { registerTile, getTile, getAvailableTiles } from '@/utils/ab-tile-utils';
import ABTile from '@/models/ab-tile';

describe('Tile Registry', () => {
    const uniqueId = `testTile_${Date.now()}`;
    const sampleTile = new ABTile({
        name: 'Custom Black',
        url: 'https://tileserver.example.com/{z}/{x}/{y}.png',
        attribution: 'Custom tiles'
    });

    it('should register a new tile successfully', () => {
        registerTile(uniqueId, sampleTile, true);
        const tile = getTile(uniqueId);
        expect(tile).toBeDefined();
        expect(tile?.url).toBe(sampleTile.url);
    });

    it('should return all available tile keys', () => {
        const tiles = getAvailableTiles();
        expect(tiles).toContain(uniqueId);
    });

    it('should not override an existing tile without override=true', () => {
        const duplicateTile = new ABTile({
            name: 'Duplicate',
            url: 'https://tileserver.example.com/other/{z}/{x}/{y}.png'
        });

        expect(() => registerTile(uniqueId, duplicateTile)).toThrow(
            `Tile '${uniqueId}' already exists. Use override=true to replace it.`
        );
    });

    it('should override an existing tile if override=true', () => {
        const newTile = new ABTile({
            name: 'Overridden Black',
            url: 'https://tileserver.example.com/override/{z}/{x}/{y}.png'
        });

        registerTile(uniqueId, newTile, true);
        const updated = getTile(uniqueId);
        expect(updated?.url).toBe(newTile.url);
    });
});
