import { describe, it, expect } from 'vitest';
import { registerTile, getTile, getAvailableTiles } from '@/utils/ab-tile-utils';

describe('Tile Registry', () => {
    const uniqueId = `testTile_${Date.now()}`;
    const tileConfig = {
        name: 'Custom Black',
        url: 'https://tileserver.example.com/{z}/{x}/{y}.png',
        attribution: 'Custom tiles'
    };

    it('should register a new tile successfully', () => {
        registerTile(uniqueId, tileConfig, true);
        const tile = getTile(uniqueId);
        expect(tile).toBeDefined();
        expect(tile?.url).toBe(tileConfig.url);
    });

    it('should return all available tile keys', () => {
        const tiles = getAvailableTiles();
        expect(tiles).toContain(uniqueId);
    });

    it('should not override an existing tile without override=true', () => {
        const duplicateTile = {
            name: 'Duplicate',
            url: 'https://tileserver.example.com/other/{z}/{x}/{y}.png',
            attribution: 'Duplicate tiles'
        };

        expect(() => registerTile(uniqueId, duplicateTile)).toThrow(
            `Tile '${uniqueId}' already exists. Use override=true to replace it.`
        );
    });

    it('should override an existing tile if override=true', () => {
        const newTile = {
            name: 'Overridden Black',
            url: 'https://tileserver.example.com/override/{z}/{x}/{y}.png',
            attribution: 'Overridden attribution'
        };

        registerTile(uniqueId, newTile, true);
        const updated = getTile(uniqueId);
        expect(updated?.url).toBe(newTile.url);
    });

    it('should warn if attribution is empty', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const emptyAttributionTile = {
            name: 'No Attribution Tile',
            url: 'https://tileserver.example.com/noattrib/{z}/{x}/{y}.png',
            attribution: ''
        };

        registerTile('noAttribTile', emptyAttributionTile, true);
        expect(warnSpy).toHaveBeenCalledWith(
            `[ABTile] The tile "No Attribution Tile" has an empty attribution. Consider crediting the tile provider.`
        );

        warnSpy.mockRestore();
    });
});
