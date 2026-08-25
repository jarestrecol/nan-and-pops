# 🍦 Nan & Pops Ice Cream Shop Website

Official website for **Nan & Pops Ice Cream Shop**, a family-friendly ice cream parlor located in Longwood, Florida. This project is a fully static, high-performance website built with **vanilla HTML, CSS, and JavaScript**, without frameworks, build tools, or backend dependencies.

The site showcases products, rotating flavors, customer testimonials, location information, online ordering options, and brand storytelling.

---

# Features

- Fully responsive design (mobile-first)
- Single-page navigation with anchor links
- Product filtering by category
- Auto-scrolling carousels with drag support
- Scroll-triggered animations using `IntersectionObserver`
- Optimized WebP image assets
- Multiple ordering integrations:
  - DoorDash
  - Uber Eats
  - Square Pickup Orders
  - Gift Cards
- Google Maps integration
- Google Reviews links
- Social media integration
- Lightweight and framework-free

---

# Tech Stack

| Technology | Purpose |
|------------|----------|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript (Vanilla) | Interactivity and animations |
| WebP | Image optimization |
| MP4 | Marketing videos |

No framework, bundler, transpiler, backend, or database is used.

---

# Project Structure

```text
/
├── index.html
├── styles.css
├── styles.min.css
├── script.js
├── script.min.js
├── img/
│   ├── logo.webp
│   ├── waffle 3.webp
│   ├── banana.webp
│   ├── ...
│   └── ~50 optimized WebP images
│
└── video/
    ├── video1.mp4
    ├── video2.mp4
    ├── video3.mp4
    └── video4.mp4
```

---

# Development

Since this is a static website, you can open `index.html` directly in a browser.

For local development, use a lightweight HTTP server:

```bash
npx serve .
```

or

```bash
python -m http.server 8080
```

Then visit:

```text
http://localhost:3000
```

or

```text
http://localhost:8080
```

depending on the server used.

---

# Architecture

The entire website is a single-page application built with standard browser technologies.

Navigation is handled through anchor links:

```text
#home
#flavors
#gallery
#why-us
#story
#testimonials
#visit
```

## Main Sections

### Home
Hero section with direct ordering options.

### Products
Filterable product catalog including:

- Classics
- Scoop Only
- Specialties
- Bubble Waffle
- Coffee

### Flavor Gallery
Rotating flavor collection with dozens of seasonal and specialty flavors.

### Why Choose Us
Feature carousel highlighting:

- Family-friendly environment
- Pet-friendly space
- Accessibility
- Parking availability
- Children's activities

### Story
Brand introduction and ownership story.

### Testimonials
Customer reviews displayed in an auto-scrolling carousel.

### Visit Us
Store location, contact information, operating hours, and directions.

---

# JavaScript Functionality

The site's interactivity is contained within `script.js`.

## Mobile Navigation

Features:

- Hamburger menu
- Menu overlay
- Responsive navigation behavior
- Accessible menu toggle state

---

## Product Filtering

Product tabs dynamically filter menu items using:

```html
data-category=""
```

Supported categories:

```text
all
scoop
specialities
waffle
coffee
```

---

## Scroll Animations

Animations are powered by:

```javascript
IntersectionObserver
```

Common animation classes:

```text
fade-in
slide-in
animate-fade-up
```

Elements animate as they enter the viewport.

---

## Carousels

Two auto-scrolling carousel systems are implemented:

### Why Choose Us

Displays feature cards and benefits.

### Testimonials

Displays customer reviews.

Features include:

- Automatic scrolling
- Drag-to-scroll
- Touch support
- Auto-scroll pause during interaction

---

# Performance Optimizations

The project includes several front-end optimization strategies.

## Resource Hints

```html
preconnect
dns-prefetch
```

Used for:

- Google Fonts
- Font Awesome CDN

---

## Image Optimization

### LCP Image Preloading

```html
<link rel="preload" as="image" href="img/logo.webp">
```

The site logo is preloaded to improve Largest Contentful Paint (LCP).

---

## Lazy Loading

Most images use:

```html
loading="lazy"
decoding="async"
```

to reduce initial page load time.

---

## Non-Blocking Assets

Google Fonts and Font Awesome are loaded asynchronously when possible to avoid render blocking.

---

# Image Guidelines

## Preferred Format

All new images should be saved as:

```text
.webp
```

Existing assets already use WebP format.

Avoid adding PNG or JPG files unless absolutely necessary.

---

## Compression

The repository includes a simple image optimization workflow.

Install dependencies:

```bash
npm install imagemin imagemin-mozjpeg imagemin-pngquant
```

Compress images:

```bash
node -e "
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['img/*.{jpg,png}'], {
  destination: 'img',
  plugins: [
    imageminMozjpeg(),
    imageminPngquant()
  ]
});
"
```

---

# Minified Assets

The production site references:

```html
styles.min.css
script.min.js
```

These files are loaded by `index.html`.

When modifying:

```text
styles.css
script.js
```

you must manually update and overwrite:

```text
styles.min.css
script.min.js
```

There is currently no automated build or minification pipeline.

---

# Editing Guidelines

## CSS

Source file:

```text
styles.css
```

Characteristics:

- Mobile-first approach
- Responsive layout
- Primary breakpoint at:

```css
1023px
```

---

## JavaScript

Source file:

```text
script.js
```

Keep the code:

- Framework-free
- Dependency-free
- Compatible with modern browsers

---

## HTML

Source file:

```text
index.html
```

The page is intentionally maintained as a single-file structure.

When adding new sections:

1. Maintain anchor navigation consistency.
2. Use semantic HTML.
3. Preserve accessibility attributes.
4. Continue lazy-loading non-critical media.

---

# Accessibility

Current accessibility considerations include:

- Semantic HTML structure
- Alternative text on images
- ARIA labels for navigation controls
- Keyboard-accessible links and buttons
- High-contrast action buttons

When adding new features, preserve accessibility standards.

---

# Deployment

Because the project is fully static, it can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 Static Hosting
- Traditional web hosting

No server-side configuration is required.

---

# Contact Information

**Nan & Pops Ice Cream Shop**

📍 351 N Ronald Reagan Blvd STE 1005  
Longwood, FL 32750

📞 +1 (321) 203-4006

📧 Nanpopsicecreamshopllc@gmail.com

---

# Notes for Contributors

- Keep the site lightweight and dependency-free.
- Prefer WebP for all new image assets.
- Preserve the existing visual identity and color palette.
- Update minified files after every CSS or JavaScript change.
- Avoid introducing frameworks, build systems, or unnecessary tooling.
- Prioritize performance, accessibility, and mobile usability.
