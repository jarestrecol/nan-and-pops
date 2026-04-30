# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for "Nan & Pops," an ice cream shop. Built with vanilla HTML/CSS/JS — no framework, no bundler, no backend.

## Development

Open `index.html` directly in a browser. For a local dev server:

```bash
npx serve .
# or
python -m http.server 8080
```

## Image Optimization

The only npm dependency is image compression:

```bash
npm install
node -e "const imagemin = require('imagemin'); const imageminMozjpeg = require('imagemin-mozjpeg'); const imageminPngquant = require('imagemin-pngquant'); imagemin(['img/*.{jpg,png}'], { destination: 'img', plugins: [imageminMozjpeg(), imageminPngquant()] })"
```

Prefer WebP format for all new images — existing assets in `img/` are all `.webp`.

## Minified Files

`styles.min.css` and `script.min.js` are the files referenced by `index.html`. When editing `styles.css` or `script.js`, manually minify and overwrite the `.min` counterparts (no automated build step exists).

## Architecture

Everything lives at the root. Single page with anchor-based navigation (`#home`, `#flavors`, `#gallery`, `#location`, etc.).

- **`index.html`** — full page markup (~994 lines)
- **`styles.css`** — source CSS (~2,165 lines), mobile-first with a 1023px breakpoint
- **`script.js`** — source JS (~170 lines): hamburger menu, IntersectionObserver animations, flavor tab filtering, auto-carousel with mouse/touch drag
- **`img/`** — ~50 WebP product/flavor/team images
- **`video/`** — 4 MP4 marketing videos (`video1.mp4`–`video4.mp4`)

## Key JS Patterns

- Flavor gallery tabs filter by category (Classics, Scoop Only, Specialties, Bubble Waffle, Coffee)
- Carousels for testimonials and "Why Choose Us" use `setInterval` auto-scroll with mouse drag override
- Scroll animations use `IntersectionObserver` with `fade-in`/`slide-in` CSS classes
