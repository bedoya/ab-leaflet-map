import type { MapConfigOptions } from '@/interfaces';

export function deserializeConfig(raw: any): MapConfigOptions {
    const config: MapConfigOptions = {
        map: {},
        style: {}
    };

    // Map options
    if ('zoom' in raw) config.map!.zoom = raw.zoom;
    if ('minZoom' in raw) config.map!.minZoom = raw.minZoom;
    if ('maxZoom' in raw) config.map!.maxZoom = raw.maxZoom;
    if ('scrollWheelZoom' in raw) config.map!.scrollWheelZoom = raw.scrollWheelZoom;
    if ('zoomControl' in raw) config.map!.zoomControl = raw.zoomControl;
    if ('dragging' in raw) config.map!.dragging = raw.dragging;
    if ('center' in raw) config.map!.center = raw.center;
    if ('bounds' in raw) config.map!.bounds = raw.bounds;

    // Style options
    if ('line-color' in raw) config.style!.color = raw['line-color'];
    if ('line-opacity' in raw) config.style!.opacity = raw['line-opacity'];
    if ('fillColor' in raw) config.style!.fillColor = raw.fillColor;
    if ('fillOpacity' in raw) config.style!.fillOpacity = raw.fillOpacity;
    if (raw.icons?.size) config.style!.iconSize = raw.icons.size;

    return config;
}