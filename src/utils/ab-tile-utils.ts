import ABTile from '@/models/ab-tile';
import { DefaultABTiles } from '@/defaults/ab-tile-defaults';

const RegisteredTiles: Record<string, ABTile> = { ...DefaultABTiles };

export function getTile(name?: string): ABTile {
    return RegisteredTiles[name ?? 'osm'] ?? RegisteredTiles['osm'];
}

export function registerTile(id: string, tile: ABTile, override = false): void {
    if (!id){
        throw new Error('Tile id is required');
    }
    if (RegisteredTiles[id] && !override) {
        throw new Error(`Tile '${id}' already exists. Use override=true to replace it.`);
    }
    RegisteredTiles[id] = tile;
}

export function resetTiles(): void {
    Object.keys(RegisteredTiles).forEach(key => delete RegisteredTiles[key]);
    Object.assign(RegisteredTiles, { ...DefaultABTiles });
}

export function getAvailableTiles(): string[] {
    return Object.keys(RegisteredTiles);
}