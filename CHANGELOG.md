# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-06-18

### Added
- First stable release 🎉
- Exported `ABLeafletMap`, `registerMarkerType`, `getAvailableMarkerTypes` from root
- Dynamic marker type registration with icon validation
- Improved Waze integration with proper asset bundling
- GeoJSON markers with customizable styles and proper popup positioning
- Internal refactor to decouple Leaflet from marker logic

### Planned
- Upcoming support for **internationalization** and **localized popups** in `v1.1.0`.

---

## [0.2.0] - 2025-06-18
### Added
- `registerMarkerType(type, iconUrl, override)` for dynamically adding new marker types.
- `getIconForType(type)` and `getAvailableMarkerTypes()` utilities.

### Fixed
- Marker icons failed to load in Laravel/Vite integrations — now uses proper Vite-compatible imports.
- Waze icon path corrected and bundled with Vite asset loader.
- GeoJSON popups now display above markers with vertical offset.
