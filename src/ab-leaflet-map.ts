import * as L from 'leaflet';

import ABMapConfig from '@/models/ab-map-config';
import ABMarker from '@/models/ab-marker';
import ABGeoJson from "@/models/ab-geo-json";

import { ABLeafletMapParams } from "./interfaces";

import { deserializeConfig } from '@/utils/ab-map-config-utils';
import { getIconForType } from "@/utils/ab-marker-utils";
import { DefaultABTiles } from "@/defaults/ab-tile-defaults";
import {getTile} from "@/utils/ab-tile-utils";

export class ABLeafletMap {
    private readonly map!: L.Map;

    private config: ABMapConfig;
    private markers: ABMarker[];
    private geojson?: ABGeoJson;
    private tile;

    constructor(
        elem: HTMLElement | string,
        {
            config = {},
            markers,
            geojson,
            tile
        }: ABLeafletMapParams = {}) {
        const container = typeof elem === 'string'
            ? document.querySelector(elem.startsWith('#') || elem.startsWith('.') ? elem : `#${elem}`)
            : elem;


        if (!(container instanceof HTMLElement)) {
            throw new Error('[ABLeafletMap] Invalid element or selector.');
        }

        this.tile = tile || config?.tile || 'osm';
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
        const tile = getTile(this.tile);
        L.tileLayer(tile.getUrl(), tile.getOptions()).addTo(this.map);
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
            pointToLayer: (feature, latlng) => this.getMarkerForFeature(feature, latlng),
            onEachFeature: (feature, layer) => {
                if (feature?.properties?.description) {
                    layer.bindPopup(feature.properties.description, {
                        offset: L.point(0, -30),
                        autoPan: true,
                        autoPanPaddingTopLeft: L.point(0, 20),
                        autoPanPaddingBottomRight: L.point(0, 20),
                    });
                }
            }
        }).addTo(this.map);
    }

    private getMarkerForFeature(feature: any, latlng: L.LatLng): L.Marker {
        const type = feature?.properties?.type || 'default';
        const icon = L.icon({
            iconUrl: getIconForType(type),
            iconSize: [30, 30],
            iconAnchor: [15, 30],
        });

        return L.marker(latlng, { icon });
    }

    public render(): void {
        this.initBaseLayer();
        if (this.markers && this.markers.length) {
            this.markers.forEach(marker => this.addMarkerToMap(marker));
        }
        this.addGeoJsonToMap();
    }
}

