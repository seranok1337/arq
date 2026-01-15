# Arq - Local Music Library

Arq is a folder-based fully local music library.

## Status:

In development. Many must-have features from the original concept are missing, but they will be added in the future.

## WIP:

- Song caching
- Track downloads via link from the most popular platforms (Youtube, Spotify, etc.)
- Performance improvements
- Folder-based playlists
- Song tags
- Other features i may find after using this on my own.

## Under the hood:

- React.JS,
- Zustand,
- Electron,
- Electron-Builder.

### Misc UI crap:

- TailwindCSS
- Sonner
- Lucide-React

## Setup:

Download ready build from Releases tab. Launch it.

By default, your OS's music directory should be selected as the current directory. You are able to change it by editing the following config file via the following paths:

Linux:
```
/home/USER/Arq/config.json
```
Windows:
```
%APPDATA%/Arq/config.json
```
MacOS:
```
~/Library/Application Support/Arq/config.json
```
