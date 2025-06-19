import ABTile from '@/models/ab-tile';
import {DefaultABTiles} from '@/defaults/ab-tile-defaults';
import {ABTileConfig} from "@/interfaces";

const RegisteredTiles: Record<string, ABTile> = { ...DefaultABTiles };

export function getTile(name?: string): ABTile {
    return RegisteredTiles[name ?? 'osm'] ?? RegisteredTiles['osm'];
}

export function registerTile(id: string, config: ABTileConfig, override = false): void {
    if (!id){
        throw new Error('Tile id is required');
    }
    if (RegisteredTiles[id] && !override) {
        throw new Error(`Tile '${id}' already exists. Use override=true to replace it.`);
    }
    RegisteredTiles[id] = new ABTile(config);
}

export function resetTiles(): void {
    Object.keys(RegisteredTiles).forEach(key => delete RegisteredTiles[key]);
    Object.assign(RegisteredTiles, { ...DefaultABTiles });
}

export function getAvailableTiles(): string[] {
    return Object.keys(RegisteredTiles);
}