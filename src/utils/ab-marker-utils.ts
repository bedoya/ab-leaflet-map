import { DefaultABMarkerTypeIcons } from '@/defaults/ab-marker-defaults';

import type { ABMarkerInput, ABMarkerOptions } from '@/interfaces';
import  {MarkerError } from "@/errors/ab-marker";

const MarkerTypeIcons: Record<string, string> = { ...DefaultABMarkerTypeIcons };

export function registerMarkerType(
    type: string,
    iconUrl: string,
    override = false
): void {
    if (!type) throw new MarkerError('ERR_INVALID_TYPE', 'Invalid marker type');
    if (!iconUrl) throw new MarkerError('ERR_INVALID_ICON_URL', 'Invalid icon URL');

    if (MarkerTypeIcons[type] && !override) {
        throw new MarkerError(
            'ERR_TYPE_EXISTS',
            `Marker type '${type}' already exists. Use override=true to replace.`
        );
    }

    MarkerTypeIcons[type] = iconUrl;
}

export function getRegisteredMarkerIcons(): Readonly<Record<string, string>> {
    return { ...MarkerTypeIcons };
}

export function getIconForType(type: string): string {
    return MarkerTypeIcons[type] ?? MarkerTypeIcons['default'];
}

export function getAvailableMarkerTypes(): string[] {
    return Object.keys(MarkerTypeIcons);
}

function cleanABMarkerInput(raw: Record<string, any>): ABMarkerOptions {
    const allowedKeys: (keyof ABMarkerInput)[] = ['type', 'lat', 'lng', 'iconSize', 'popup'];
    const cleaned: Partial<ABMarkerOptions> = {};

    for (const key of allowedKeys) {
        if (raw[key] !== undefined) {
            cleaned[key] = raw[key];
        }
    }

    return cleaned as ABMarkerOptions;
}

export function __resetMarkerTypesForTest(): void {
    for (const k of Object.keys(MarkerTypeIcons)) {
        delete MarkerTypeIcons[k];
    }
    Object.assign(MarkerTypeIcons, DefaultABMarkerTypeIcons);
}

export function convertToValidMarkerOptions( item: Partial<ABMarkerOptions> & { waze?: boolean; [key: string]: any }): ABMarkerOptions {
    const { lat, lng } = item;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
        throw new Error('[convertToValidMarker] Marker must include valid lat and lng values.');
    }

    // Construcción del objeto limpio
    return cleanABMarkerInput({ ...item });
}
