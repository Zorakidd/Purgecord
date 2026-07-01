# Changelog

## [1.0.0] - 2025

First release of Purgecord, fork of Undiscord 5.2.6.

### Fixed
* Rate-limit bug in search that sent the script into an infinite loop and effectively killed it
* Reworked token grab for current Discord builds
* Made the selectors for mounting the button more robust

### Changed
* API base is now read dynamically from Discord instead of hardcoded
* Fallback colors for Discord's new "visual refresh" design
* Removed auto-update URLs so your own version doesn't get overwritten

### Misc
* Renamed, own README, wiki and docs