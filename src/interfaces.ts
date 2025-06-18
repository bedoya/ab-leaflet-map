export interface ABLeafletMapParams {
    config?: MapConfigOptions;
    markers?: any[];
    geojson?: any;
}

export interface ABMarkerLocation {
    lat: number;
    lng: number;
}

export interface ABMarkerOptions {
    draggable?: boolean;
    keyboard?: boolean;
    title?: string;
    alt?: string;
    zIndexOffset?: number;
    opacity?: number;
    riseOnHover?: boolean;
    riseOffset?: number;
    pane?: string;
    bubblingMouseEvents?: boolean;

    type?: string;
    iconSize?: [number, number];
}

export interface ABMarkerInput extends ABMarkerLocation, ABMarkerOptions {
    popup?: {
        content: string
        options?: ABPopupOptions
    };
    waze?: boolean;
}

export interface MapStyleOptions {
    color?: string;
    fillColor?: string;
    opacity?: number;
    fillOpacity?: number;
    iconSize?: [number, number];
}

export interface MapOptions {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    zoomControl?: boolean;
    scrollWheelZoom?: boolean;
    dragging?: boolean;
    bounds?: [[number, number], [number, number]];
}

export interface MapConfigOptions {
    map?: MapOptions;
    style?: MapStyleOptions;
}

export interface ABPopupOptions {
    maxWidth?: number;
    minWidth?: number;
    autoClose?: boolean;
    closeOnClick?: boolean;
    closeButton?: boolean;
    offset?: [number, number];
    className?: string;
    openOnInit?: boolean;
}

type GeometryType = 'Point' | 'LineString' | 'Polygon';

export interface Geometry {
    type: GeometryType;
    coordinates: any;
}

export interface Feature {
    type: 'Feature';
    geometry: Geometry;
    properties?: Record<string, any>;
}

export interface FeatureCollection {
    type: 'FeatureCollection';
    features: Feature[];
}

export interface ABGeoJsonStyle {
    color?: string;
    fillColor?: string;
    strokeWidth?: number;
    opacity?: number;
    fillOpacity?: number;
    radius?: number;
}