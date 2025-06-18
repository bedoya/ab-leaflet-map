# Changelog

## [Unreleased]
### Planned
- Support for custom GeoJSON popups via user-defined templates.
- Improved marker clustering.
- TypeScript type refinements for ABMarkerOptions.

## [0.2.0] - 2025-06-18
### Added
- `registerMarkerType(type, iconUrl, override)` for dynamically adding new marker types.
- `getIconForType(type)` and `getAvailableMarkerTypes()` utilities.

### Fixed
- Marker icons failed to load in Laravel/Vite integrations — now uses proper Vite-compatible imports.
- Waze icon path corrected and bundled with Vite asset loader.
- GeoJSON popups now display above markers with vertical offset.
