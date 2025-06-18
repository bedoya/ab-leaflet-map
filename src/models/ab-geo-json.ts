import { FeatureCollection, Feature, Geometry, ABGeoJsonStyle } from '@/interfaces';
export default class ABGeoJson {
    private readonly collection: FeatureCollection;

    constructor(input: Record<string, any> | Record<string, any>[]){
        this.collection = this.makeInputCollection(input);
    }

    private makeInputCollection(input: Record<string, any> | Record<string, any>[]): FeatureCollection {
        if (this.isFeatureCollection(input)) {
            return input as FeatureCollection;
        }

        if (this.isFeature(input)) {
            return {
                type: 'FeatureCollection',
                features: [input as Feature],
            };
        }

        if (Array.isArray(input)) {
            if (input.every(item => this.isFeature(item))) {
                return {
                    type: 'FeatureCollection',
                    features: input as Feature[],
                };
            }

            return {
                type: 'FeatureCollection',
                features: input.map(item => this.buildFeature(item)),
            };
        }

        if (this.isGeometry(input.geometry)) {
            return {
                type: 'FeatureCollection',
                features: [this.buildFeatureFromGeometry(input.geometry)],
            };
        }

        return {
            type: 'FeatureCollection',
            features: [this.buildFeature(input)],
        };
    }

    private isGeometry(obj: any): obj is Geometry {
        return (
            obj &&
            typeof obj.type === 'string' &&
            Array.isArray(obj.coordinates)
        );
    }

    private isFeature(obj: any): obj is Feature {
        return obj && obj.type === 'Feature' && obj.geometry?.type && obj.geometry?.coordinates;
    }

    private isFeatureCollection(obj: any): obj is FeatureCollection {
        return obj && obj.type === 'FeatureCollection' && Array.isArray(obj.features);
    }

    private buildFeature(item: any): Feature {
        let geometry: Geometry;

        if (this.isGeometry(item)) {
            geometry = item;
        }
        else {
            geometry = {
                type: item.geometryType ?? 'Point',
                coordinates: item.coordinates ?? [item.lng, item.lat]
            };
        }

        const properties = {
            ...item.properties,
            style: item.style as ABGeoJsonStyle,
        };

        return {
            type: 'Feature',
            geometry,
            properties
        };
    }

    private buildFeatureFromGeometry(geometry: Geometry): Feature {
        return {
            type: 'Feature',
            geometry,
            properties: {},
        };
    }

    public getCollection(): FeatureCollection {
        return this.collection;
    }
}