import { ABMarkerOptions } from '@/interfaces';
import { DefaultABMarkerOptions, DefaultABMarkerTypeIcons } from '/src/defaults/ab-marker-defaults';
import { getIconForType } from '@/utils/ab-marker-utils';
import { getPopupHtml, getPopupOptions, generateWazeLink } from '@/utils/ab-popup-utils';
import ABPopup from '@/models/ab-popup';
import { PopupInput } from "@/types";

export default class ABMarker {
    lat: number;
    lng: number;
    type: string;
    iconSize: [number, number];
    popup?: ABPopup;

    constructor(options: Partial<ABMarkerOptions> & Record<string, any>) {
        const { lat, lng } = options;

        if (typeof lat !== 'number' || typeof lng !== 'number') {
            throw new Error('[ABMarker] Marker must include valid "lat" and "lng" numbers.');
        }

        this.lat = lat;
        this.lng = lng;

        const { popup, waze, ...rest } = options;

        const mergedOptions = {
            ...DefaultABMarkerOptions,
            ...rest,
        } as Required<Pick<ABMarkerOptions, 'type' | 'iconSize'>>;
        this.type = mergedOptions.type;
        this.iconSize = mergedOptions.iconSize;

        const hasPopup = popup && typeof popup === 'object';
        const popupOptions = hasPopup ? popup.options : undefined;
        const popupContent = hasPopup ? { ...popup } : undefined;

        const popupHtml = hasPopup && popupContent
            ? getPopupHtml(popupContent as PopupInput)
            : '';

        const wazeHtml = (waze === true) ? generateWazeLink(lat, lng) : '';
        const combinedHtml = `<div>${[popupHtml, wazeHtml].filter(Boolean).join('<br>')}</div>`;

        if (popupHtml.trim() || wazeHtml) {
            const opts = getPopupOptions(popupOptions);
            this.popup = new ABPopup(combinedHtml, opts);
        }
    }

    public getCoordinates(): [number, number] {
        return [this.lat, this.lng];
    }

    public getPopup(): ABPopup | undefined {
        return this.popup;
    }

    public getIcon(): string {
        return getIconForType(this.getType());
    }

    public getIconSize(): [number, number] {
        return this.iconSize;
    }

    public getType(): string {
        return this.type;
    }
}