# ab-leaflet-map

`ab-leaflet-map` is a JavaScript library for creating interactive maps using the [Leaflet](https://leafletjs.com/) library. This package allows you to easily render maps, configure their properties, and add markers and GeoJSON objects (`LineStrings`, `Polygons`, or `Points`) to visualize points of interest.

## Installation

You can install the package using npm:

```bash
npm install ab-leaflet-map
```

### Running the Examples

To run the examples provided in this package:

1. Build the project:

```bash
npm run build
```

2. Serve the examples:

```bash
npm run serve
```

3. Open your browser and navigate to http\://localhost:5173/examples/index.html. The port may vary depending on your configuration.

---

## Usage

Import the package and create a map by passing a container element. You can also pass configuration, markers, geojson, or specify the tile to be used.

### Basic Example

```ts
import { ABLeafletMap } from 'ab-leaflet-map';

const map = new ABLeafletMap('#map');
map.render();
```

### Configuring the Map

```ts
const config = {
  center: [10.5, -74.8],
  zoom: 8,
};

const map = new ABLeafletMap('#map', { config });
map.render();
```

### Using Different Tiles

```ts
const map = new ABLeafletMap('#map', { tile: 'cartoDark' });
```

Or from the config object:

```ts
const map = new ABLeafletMap('#map', {
  config: {
    tile: 'stamenToner',
  }
});
```

#### Registering Custom Tiles

If you'd like to add your own tile service:

```ts
import { registerTile } from 'ab-leaflet-map';

registerTile('customBlack', {
  name: 'Custom Black',
  url: 'https://tileserver.example.com/{z}/{x}/{y}.png',
  attribution: 'Custom tiles by Tileserver Inc.',
});
```

> ⚠️ Attribution is required. Even if the tile is open source, you should always credit the provider appropriately.

---

## Adding Markers

```ts
const markers = [
  {
    type: 'restaurant',
    lat: 5.4914,
    lng: -73.7612,
    waze: true,
  },
  {
    type: 'waterfall',
    lat: 5.4961,
    lng: -73.7972,
    iconSize: [50, 50],
    popup: {
      content: `<div>Link to <a href='https://google.com'>Google</a></div>`
    },
  },
  {
    type: 'house',
    lat: 5.5003,
    lng: -73.7719,
    iconSize: [25, 25],
    popup: {
      text: 'Click here for more info',
      link: 'https://google.com',
      class: 'text-blue-500',
      options: {
        maxWidth: 180,
        offset: [20, -20]
      }
    },
    waze: true,
  }
];

const map = new ABLeafletMap('#map', { config, markers });
map.render();
```

## Adding GeoJSON Features

```ts
const geometry = {
  type: 'Polygon',
  coordinates: [
    [
      [-73.6982, 5.0399],
      [-73.6975, 5.0394],
      [-73.6972, 5.0399],
      [-73.6982, 5.0399],
    ],
  ]
};

const map = new ABLeafletMap('#map', {
  config: { center: [5.04, -73.698], zoom: 18 },
  geojson: geometry,
});
map.render();
```

---

## Exported Functions

- `ABLeafletMap`: Main class to create and render maps.
- `registerMarkerType(type, iconUrl, override)`: Register a new custom marker.
- `getAvailableMarkerTypes()`: List of all registered marker types.
- `registerTile(id, tileConfig, override)`: Register a new tile from configuration.
- `getAvailableTiles()`: List of all registered tiles.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## Acknowledgements

Special thanks to:

- [Leaflet](https://leafletjs.com/) for the mapping engine
- OpenStreetMap, Stamen, Carto, and other tile providers for their open tile services

