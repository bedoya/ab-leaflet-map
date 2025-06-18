import { ABMarkerOptions } from "@/interfaces";

export const DefaultABMarkerOptions: Partial<ABMarkerOptions> = {
    type: 'default',
    iconSize: [30, 30],
    draggable: false,
    keyboard: true,
    title: '',
    alt: '',
    zIndexOffset: 0,
    opacity: 1.0,
    riseOnHover: false,
    riseOffset: 250,
    pane: 'markerPane',
    bubblingMouseEvents: true,
};

export const DefaultABMarkerTypeIcons: Record<string, string> = {
    house: new URL('@/assets/icons/icon-house.svg', import.meta.url).href,
    restaurant: new URL('@/assets/icons/icon-restaurant.svg', import.meta.url).href,
    waterfall: new URL('@/assets/icons/icon-waterfall.svg', import.meta.url).href,
    default: new URL('@/assets/icons/icon-default.svg', import.meta.url).href,
};
