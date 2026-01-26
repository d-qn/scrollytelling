# SvelteKit Scrollytelling Boilerplate

A production-ready, mobile-first boilerplate for building immersive scrollytelling stories with SvelteKit, TailwindCSS, and Datawrapper.

This project was originally built for newsrooms but is adaptable for any storytelling need.

## 🚀 Features

- **Responsive Scrollytelling**:
    - **Standalone Mode**: Split-screen on desktop (Text left, Chart right), overlapping on mobile.
    - **Embed Mode**: Full-width graphics with centered text overlay, perfect for CMS integration (iframe).
- **Datawrapper Integration**:
    - Seamless `postMessage` support for reactive charts.
    - **Smart Preloading**: Charts are kept in memory to prevent reloading/flickering during scroll.
- **Theming**: Easy customization via Tailwind tokens.
- **Static Output**: Builds to pure HTML/CSS/JS via `adapter-static`.

## 🛠️ Quick Start

### 1. Installation
```bash
npm install
```

### 2. Development
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```
The output (in `build/`) can be hosted on any static server (S3, Vercel, Netlify, FTP).

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to match your brand identity. Keys usually start with `theme-`.

```javascript
// tailwind.config.js
theme: {
    colors: {
        'theme-bg': '#ffffff',      // Main background
        'theme-primary': '#005578', // Main accent color
        'theme-text': '#000000',    // Body text
        // ...
    }
}
```

### Fonts
1. Install your font (e.g., via `@fontsource`).
2. Update `src/routes/+layout.svelte` to import the font file.
3. Update `src/app.css` to apply it globally.

## 📝 Creating a Story

The narrative is driven by `src/data/story.json`.

```json
{
  "format": "standalone", // or "embed"
  "title": "My Story",
  "steps": [
    {
      "content": "<h2>Step 1</h2><p>Description...</p>",
      "vizType": "datawrapper",
      "vizProps": {
        "chartId": "ABCDE",
        "state": { "highlight": "region-1" }
      }
    }
  ]
}
```

### Supported Viz Types
- `datawrapper`: Renders a Datawrapper chart by ID.
- `image`: Renders a full-screen image (`src` prop).
- `custom`: Renders a generic placeholder (extensible in `VizContainer.svelte` to mapped Svelte components).

## 📄 License
Released under the **GNU GPLv3** license.
You are free to use this for commercial purposes, but any modifications to the *source code* of this tool must be open-sourced if distributed.

See [LICENSE](LICENSE) for details.
