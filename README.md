# Marvel Snap Web Helper

Allows you to see extra contextual information (card text, location text) on mouse over. Only available in /r/MarvelSnap posts for now.

### Getting Started

1. Clone https://github.com/ScarpMetal/marvel-snap-web-helper
2. `pnpm install`
3. `pnpm run build`
4. Go to `chrome://extensions/` in Google Chrome
5. At the top right, turn on Developer mode.
6. Click Load unpacked.
7. Find and select the the `dist/` folder in the root of this project (generated from step 3).

### Making Changes

0. `pnpm run build:watch` (only do this once at the start)
1. Make code changes
2. If you made changes to any file outside of `src/`, restart the build script
3. Go to `chrome://extensions/` in Google Chrome
4. Click the reload icon in the bottom right of the extension card
5. Refresh any other pages you were testing
6. Repeat from step 1

### Using the Extension

1. Go to https://www.reddit.com/r/MarvelSnap/
2. Select any post and scroll down to the comments
3. Any text related to a card or location should have a dashed underline
4. Mouse over the text and you should see a popover with the card information
