# ab-leaflet-map

`ab-leaflet-map` is a JavaScript library for creating interactive maps using the [Leaflet](https://leafletjs.com/) library. This package allows you to easily render maps, configure their properties, and add markers and GeoJSON objects (`Line Strings`, `Polygons` or `Points`) to visualize points of interest.

## Installation

You can install the package using npm:

```bash
npm install ab-leaflet-map
```
### Running the examples

To run the examples provided in this package, follow these steps:

1. Build the project:

```bash
npm run build
```

2. Serve the examples:

```bash
npm run serve
```

3. Open your browser and navigate to http://localhost:5173/examples/index.html. Note that the exact port (5173) may vary based on your npm configuration.

## Usage

To get started with ab-leaflet-map, import it into your JavaScript file and create a new map instance by specifying a container element. Optionally, you can pass a configuration object to customize the map's initial state.

### Basic Example
```bash
import { ABLeafletMap } from 'ab-leaflet-map';

const map = new ABLeafletMap('#map');
map.render();
```

### Configuring the Map

You can pass a configuration object as the second parameter to set the initial center and zoom level of the map.

```bash
import { ABLeafletMap } from 'ab-leaflet-map';

const configData = {
    center: [10.5, -74.8],
    zoom: 8,
};

const map = new ABLeafletMap('#map', { config: configData });
map.render();
```

### Adding Markers

You can also paint markers on the map to indicate various locations. Markers can include custom icons, popups, and additional properties. Add a `waze` property to the markers to add a **Send to Waze** button in your map.

```bash
import { ABLeafletMap } from 'ab-leaflet-map';

const config = {
    center: [5.5, -73.8],
    zoom: 14,
};

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
            content: `<div>This text is added to the example with a link to <a href='https://google.com'>Google</a>. This link will open in the same window because it doesn\'t have a <strong>target="_blank"</strong> element</div>`
        },
    },
    {
        type: 'house',
        lat: 5.5003,
        lng: -73.7719,
        iconSize: [25, 25],
        popup: {
            text: 'This element has a link to Google, but the entire text is the link.',
            link: 'https://google.com',
            class: 'w-full text-blue-300 hover:text-blue-500 transition duration-300 no-underline',
            options: {
                maxWidth: 180,
                closeButton: true,
                offset: [20, -20],
            }
        },
        waze: true,
    }
];

const map = new ABLeafletMap('#map', { config: config, markers: markers });
map.render();
```

### Adding GeoJSON Features:

Painting `GeoJSON Features`
You can paint `GeoJSON` features by passing a `geojson` parameter to the class. The features JSON object must be transformable into a GeoJSON `FeatureCollection`. This can be either a `FeatureCollection`, a `Feature`, an `array of Features`, or a `Geometry`.

Here’s an example of how to do it:

```bash
import { ABLeafletMap } from 'ab-leaflet-map';

const geometry = {
    type: 'Polygon',
    coordinates: [
        [
            [-73.698217978044, 5.0399321913733],
            [-73.697513549485, 5.0394780437462],
            [-73.69727151482, 5.0399006256328],
            [-73.697972608505, 5.0404077750656],
            [-73.698217978044, 5.0399321913733],
        ],
    ],
};

const map = new ABLeafletMap('#map', {
    config: { center: [5.04, -73.698], zoom: 18 },
    geojson: geometry,
});
map.render();
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## Acknowledgements

**Leaflet** for providing an excellent mapping library.