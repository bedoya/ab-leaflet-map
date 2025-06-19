import {ABTileConfig} from "@/interfaces";

export default class ABTile {
    name: string;
    url: string;
    attribution?: string;
    maxZoom?: number;
    minZoom?: number;
    tileSize?: number;
    subdomains?: string | string[];
    detectRetina?: boolean;

    constructor(config: ABTileConfig) {
        this.name = config.name;
        this.url = config.url;
        this.attribution = config.attribution;

        if (!this.attribution.trim()) {
            console.warn(`[ABTile] The tile "${this.name}" has an empty attribution. Consider crediting the tile provider.`);
        }

        this.maxZoom = config.maxZoom;
        this.minZoom = config.minZoom;
        this.tileSize = config.tileSize;
        this.subdomains = config.subdomains;
        this.detectRetina = config.detectRetina;
    }

    public getName(): string {
        return this.name;
    }

    public getUrl(): string {
        return this.url;
    }

    getOptions() {
        const options: Record<string, any> = {};

        if (this.attribution) options.attribution = this.attribution;
        if (this.maxZoom != null) options.maxZoom = this.maxZoom;
        if (this.minZoom != null) options.minZoom = this.minZoom;
        if (this.tileSize != null) options.tileSize = this.tileSize;
        if (this.subdomains) options.subdomains = this.subdomains;
        options.detectRetina = this.detectRetina === true;

        return options;
    }

}