import type { MapOptions, MapStyleOptions } from '@/interfaces';

export const defaultMapOptions: Required<MapOptions> = {
    center: [5.063, -73.705],
    zoom: 13,
    minZoom: 3,
    maxZoom: 18,
    zoomControl: true,
    scrollWheelZoom: true,
    dragging: true,
    bounds: [[-90, -180], [90, 180]],
};

export const defaultMapStyle: Required<MapStyleOptions> = {
    color: '#ff6600',
    fillColor: '#ff6600',
    opacity: 1.0,
    fillOpacity: 0.2,
    iconSize: [32, 32],
};