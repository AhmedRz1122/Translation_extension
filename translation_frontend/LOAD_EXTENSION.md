# How to Load the Translation Extension

## Prerequisites
1. The extension has been built (dist folder contains the built files)
2. You have Google Chrome, Microsoft Edge, or another Chromium-based browser installed

## Steps to Load the Extension

### For Google Chrome:
1. Open Google Chrome
2. Navigate to `chrome://extensions/` (or go to Menu → Extensions → Manage Extensions)
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **"Load unpacked"** button
5. Navigate to your project's `dist` folder:
   ```
   D:\Yards\React projects\Translation\translation_frontend\dist
   ```
6. Select the `dist` folder and click **"Select Folder"**
7. The extension should now appear in your extensions list and be ready to use!

### For Microsoft Edge:
1. Open Microsoft Edge
2. Navigate to `edge://extensions/`
3. Enable **Developer mode** (toggle in the bottom-left corner)
4. Click **"Load unpacked"** button
5. Navigate to your project's `dist` folder
6. Select the `dist` folder and click **"Select Folder"**
7. The extension should now be loaded!

## Using the Extension

1. After loading, you should see the extension icon in your browser's toolbar
2. Click on the extension icon to open the translation popup
3. Make sure your backend server is running on `http://localhost:3001` (if using the default configuration)

## Troubleshooting

### Extension won't load:
- Make sure all files are in the `dist` folder:
  - `manifest.json`
  - `popup.html`
  - `bundle.js`
  - Any image assets

### Extension loads but shows errors:
- Check the browser console (Right-click extension icon → Inspect popup)
- Verify the backend server is running if the extension needs to make API calls
- Check that all permissions in `manifest.json` are correct

### Rebuilding the Extension:
If you make changes to the code, rebuild the extension:
```bash
npm run build
```

The webpack config will automatically copy `manifest.json` to the `dist` folder.

## Notes

- **Icons**: The extension currently works without custom icons. Chrome/Edge will use default icons. To add custom icons:
  1. Create an `icons` folder in the `public` directory
  2. Add `icon16.png`, `icon48.png`, and `icon128.png` files
  3. Update `manifest.json` to include icon paths
  4. Rebuild the extension

- **Developer Mode**: Keep Developer mode enabled to test the extension. For production, you'll need to package and publish the extension through the Chrome Web Store or Edge Add-ons store.

