import * as L from 'leaflet';

import ABMapConfig from './models/ab-map-config';
import ABMarker from './models/ab-marker';
import ABGeoJson from "@/models/ab-geo-json";

import {MapConfigOptions, ABMarkerOptions, ABGeoJsonStyle, ABLeafletMapParams} from "./interfaces";

import { deserializeConfig } from '@/utils/ab-map-config-utils';
import { convertToValidMarkerOptions, getIconForType } from "@/utils/ab-marker-utils";
import { FeatureCollection } from 'geojson';

export class ABLeafletMap {
    private readonly map!: L.Map;

    private config: ABMapConfig;
    private markers: ABMarker[];
    private geojson?: ABGeoJson;

    constructor(
        elem: HTMLElement | string,
        {
            config = {},
            markers,
            geojson
        }: ABLeafletMapParams = {}) {
        const container = typeof elem === 'string' ? document.querySelector(elem) : elem;

        if (!(container instanceof HTMLElement)) {
            throw new Error('[ABLeafletMap] Invalid element or selector.');
        }

        this.config = new ABMapConfig(deserializeConfig(config));
        this.markers = Array.isArray(markers) ?
            markers.map((item) => new ABMarker(item)) :
            [];

        if (geojson) {
            this.geojson = new ABGeoJson(geojson);
        }

        this.map = L.map(container).setView(this.config.getCenter(), this.config.getZoom());
    }

    private initBaseLayer(): void {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(this.map);
    }

    private addMarkerToMap(marker: ABMarker): void {
        const leafletMarker = L.marker(marker.getCoordinates(), {
            icon: L.icon({
                iconUrl: marker.getIcon(),
                iconSize: marker.getIconSize(),
                className: `ab-marker-${marker.getType()}`
            }),
        });

        const popup = marker.getPopup();

        if (popup) {
            leafletMarker.bindPopup(popup.getContent());
        }

        leafletMarker.addTo(this.map);
    }

    private addGeoJsonToMap(): void {
        if (!this.geojson) return;

        const collection = this.geojson.getCollection();

        L.geoJSON(collection, {
            style: (feature) => feature?.properties?.style || {},
            pointToLayer: (feature, latlng) => {
                if (feature?.properties?.style) {
                    return L.circleMarker(latlng, feature.properties.style);
                }
                return L.marker(latlng);
            }
        }).addTo(this.map);
    }

    public render(): void {
        this.initBaseLayer();
        if (this.markers && this.markers.length) {
            this.markers.forEach(marker => this.addMarkerToMap(marker));
        }
        this.addGeoJsonToMap();
    }
}

