import { defaultMapOptions, defaultMapStyle } from '@/defaults/ab-map-config-default';
import type { MapOptions, MapStyleOptions, MapConfigOptions } from '@/interfaces';

export default class ABMapConfig {
    private map: Required<MapOptions>;
    private style: Required<MapStyleOptions>;

    constructor(userConfig: MapConfigOptions = {}) {
        this.map = {
            ...defaultMapOptions,
            ...userConfig.map,
        };

        this.style = {
            ...defaultMapStyle,
            ...userConfig.style,
        };
    }

    getCenter(): [number, number] {
        return this.map.center;
    }

    getZoom(): number {
        return this.map.zoom;
    }

    getMinZoom(): number {
        return this.map.minZoom;
    }

    getMaxZoom(): number {
        return this.map.maxZoom;
    }

    hasZoomControl(): boolean {
        return this.map.zoomControl;
    }

    isScrollWheelZoomEnabled(): boolean {
        return this.map.scrollWheelZoom;
    }

    isDraggingEnabled(): boolean {
        return this.map.dragging;
    }

    getBounds(): [[number, number], [number, number]] {
        return this.map.bounds;
    }

    // ----- Style config getters -----
    getColor(): string {
        return this.style.color;
    }

    getFillColor(): string {
        return this.style.fillColor;
    }

    getOpacity(): number {
        return this.style.opacity;
    }

    getFillOpacity(): number {
        return this.style.fillOpacity;
    }

    getIconSize(): [number, number] {
        return this.style.iconSize;
    }
}