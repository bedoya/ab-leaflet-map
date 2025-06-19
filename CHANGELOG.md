# Changelog

## \[1.1.0] - 2025-06-19

### Added

* Support for custom tile layers using `registerTile(id, config, override)`.
* Ability to specify map tile via `tile` parameter or via `config.tile`.
* Default tiles include OpenStreetMap, Carto, Stamen, and Esri imagery.
* Warning system if `attribution` field is omitted when registering a tile.
* Full documentation and examples for tile usage and registration.
* Tests for tile registry, override, and validation behaviors.

### Changed

* `registerTile` now takes a plain configuration object instead of an `ABTile` instance.
* `attribution` field is now required for all tile registrations.

## \[1.0.0] - 2025-06-18

### Added

* First stable release 🎉
* Exported `ABLeafletMap`, `registerMarkerType`, `getAvailableMarkerTypes` from root
* Dynamic marker type registration with icon validation
* Improved Waze integration with proper asset bundling
* GeoJSON markers with customizable styles and proper popup positioning
* Internal refactor to decouple Leaflet from marker logic

### Planned

* Support for internationalization and localized popups

## \[0.2.0] - 2025-06-18

### Added

* `registerMarkerType(type, iconUrl, override)` for dynamically adding new marker types.
* `getIconForType(type)` and `getAvailableMarkerTypes()` utilities.

### Fixed

* Marker icons failed to load in Laravel/Vite integrations — now uses proper Vite-compatible imports.
* Waze icon path corrected and bundled with Vite asset loader.
* GeoJSON popups now display above markers with vertical offset.
