# APHGames Web - Product Requirements Document

## Project Overview

**APHGames Web** is a multilingual educational static website for game development learning materials. It serves as the primary learning hub for game programming students, providing interactive examples, presentation slides, tutorials, and documentation.

### Core Purpose

- Deliver comprehensive game development education materials
- Provide interactive, browser-based examples built on Pixi.js
- Host and organize presentation slides for courses
- Showcase student projects in a gallery
- Archive historical game development articles

### Target Audience

- Game development students (primarily Czech Technical University)
- Self-learners interested in game programming
- Instructors teaching game development courses

## Technical Architecture

### Technology Stack

**Framework & Build**
- **Docusaurus 2.0.0-beta.17**: Static site generator framework
- **React 17**: UI component library
- **TypeScript 4.4.2**: Type-safe development
- **Sass**: CSS preprocessing with SCSS modules
- **Node.js 18**: Build environment

**External Dependencies**
- **COLF.IO Engine**: Custom game engine built on Pixi.js (externally maintained)
- **RevealJS**: Presentation framework for slides (externally maintained)
- **MDX**: Markdown with React components

**Build & Deployment**
- **GitHub Actions**: CI/CD automation
- **AWS S3**: Static hosting
- **npm**: Package management

### Project Structure

```
aphgames_web/
├── .github/workflows/       # CI/CD deployment workflows
│   ├── deploy_cs.yml        # Czech version deployment
│   └── deploy_en.yml        # English version deployment
├── blog/                    # Blog posts (minimal usage)
├── docs/                    # Documentation content (Markdown + TSX)
│   ├── brand.md             # Brand guidelines
│   ├── courses/             # Course-specific materials
│   │   └── aph.md           # NI-APH course info
│   └── learning/            # Learning materials
│       ├── 01-intro.md      # Introduction page
│       ├── 02-resources.md  # Learning resources
│       ├── cheatsheets/     # Quick reference guides
│       ├── examples/        # Interactive example documentation
│       ├── tutorials/       # Tutorial guides
│       ├── misc/            # Miscellaneous content
│       ├── lectures.tsx     # Slides listing component
│       └── resources.tsx    # Resources listing component
├── i18n/                    # Internationalization
│   ├── cs/                  # Czech translations
│   └── en/                  # English translations
├── plugins/                 # Custom Docusaurus plugins
│   └── docusaurus-search-local/  # Local search plugin
├── scripts/                 # Build scripts
│   └── download_data.js     # Downloads external assets
├── src/                     # React source code
│   ├── components/          # Reusable React components
│   ├── css/                 # SCSS stylesheets (CSS modules)
│   ├── internals/           # Internal utilities, data, themes
│   │   ├── aph-colors.js/scss   # Color palette
│   │   ├── gallery-data.ts      # Gallery data structure
│   │   ├── resources-data.ts    # Resources data structure
│   │   ├── prism-aph-light.js   # Code theme (light)
│   │   └── prism-aph-dark.js    # Code theme (dark)
│   ├── pages/               # Custom pages
│   │   ├── index.tsx        # Homepage
│   │   ├── gallery.tsx      # Student projects gallery
│   │   └── artifacts.tsx    # Historical articles archive (CS only)
│   ├── theme/               # Docusaurus theme customizations
│   │   ├── DocPaginator/    # Disabled pagination
│   │   └── NavbarItem/      # Custom navbar links
│   ├── types/               # TypeScript type definitions
│   └── APHCanvas.tsx        # Core component for interactive examples
├── static/                  # Static assets
│   ├── examples/            # Downloaded at build time (gitignored)
│   ├── slides/              # Downloaded at build time (gitignored)
│   ├── fonts/               # Custom fonts (Source Sans Pro, Inconsolata)
│   └── img/                 # Images organized by purpose
├── .eslintrc.json           # ESLint configuration (Airbnb style)
├── babel.config.js          # Babel configuration
├── docusaurus.config.js     # Main Docusaurus configuration
├── package.json             # Dependencies and npm scripts
├── sidebars.js              # Documentation sidebar structure
├── tsconfig.json            # TypeScript configuration
└── web.config.js            # Project-specific configuration
```

## Core Features

### 1. Multilingual Support

**Implementation**
- Separate builds for Czech (`cs`) and English (`en`)
- Locale determined at build time via CLI flag (`--locale`)
- Each locale has dedicated:
  - Build scripts: `npm run build_cs`, `npm run build_en`
  - Deployment workflows
  - Translation files in `i18n/{locale}/`
  - Deployment domain: `aphgames.cz` (CS), `aphgames.io` (EN)

**Configuration**
- Current locale parsed from `process.argv` in `docusaurus.config.js`
- Translations stored in `i18n/{locale}/code.json`
- Content can be excluded per locale using frontmatter: `exclude_cs`, `exclude_en`
- Sidebar items automatically filtered by locale

### 2. Interactive Examples System

**Architecture**
The examples system integrates a custom Pixi.js-based game engine (COLF.IO) into documentation pages.

**Component: APHCanvas.tsx**
- React component that loads and runs interactive examples
- Loads examples from `static/examples/examples` bundle (downloaded at build time)
- Exposes examples via `window.APH` global namespace
- Each example is a class with `init(canvasElement)` and `destroy()` lifecycle methods

**Usage in Documentation**
```tsx
import APHCanvas from '@site/src/APHCanvas.tsx'
<APHCanvas name="ExampleName" width={800} height={600} />
```

**Supported Props**
- `name`: Example class name (required)
- `width`, `height`: Canvas dimensions
- `transparent`: Transparent background
- `backgroundColor`: Background color (number)
- `resizeToScreen`: Auto-resize to screen
- `antialias`: Enable antialiasing
- `resolution`: Display scale
- `gameLoopThreshold`, `gameLoopFixedTick`, `speed`: Game loop configuration
- `canvasId`: Custom canvas ID (for multiple canvases)

**External Data Management**
- Examples are maintained in separate repository: https://github.com/APHGames/examples
- Version controlled via `examples_version` in `web.config.js` (currently 6.4.0)
- Downloaded at build time via `npm run download_data`
- Extracted to `static/examples/` (gitignored)

### 3. Presentation Slides System

**Architecture**
RevealJS-based HTML presentations integrated into the documentation.

**Component: lectures.tsx**
- Reads `static/slides/slides-info.json` metadata file
- Renders slide links grouped by categories
- Filters slides by current locale
- Provides direct links to slide HTML files

**Slide Features**
- Standard view: `/slides/{filename}.html`
- PDF export mode: `?print-pdf` query parameter
- Presentation mode: `?presentation` query parameter

**External Data Management**
- Slides maintained in separate repository: https://github.com/APHGames/slides
- Version controlled via `slides_version` in `web.config.js` (currently 6.15.0)
- Downloaded at build time via `npm run download_data`
- Extracted to `static/slides/` (gitignored)

### 4. Student Projects Gallery

**Location**: `/gallery` route

**Implementation**
- Custom React page: `src/pages/gallery.tsx`
- Data source: `src/internals/gallery-data.ts`
- Shared URL across locales: https://gallery.aphgames.io

**Data Structure**
Gallery items contain:
- Project title and description
- Student names and years
- Screenshots/media
- Project links

### 5. Historical Articles Archive (Czech Only)

**Location**: `/artifacts` route (CS locale only)

**Implementation**
- Custom React page: `src/pages/artifacts.tsx`
- Data source: Downloaded from `https://raw.githubusercontent.com/APHGames/support/main/scripts/scripts/tiscali-grabber/data_filtered.json`
- Archives historical articles from `games.tiscali.cz`

**Conditional Loading**
- Only available in Czech version
- Navbar item conditionally added in `docusaurus.config.js` for CS locale

### 6. Search Functionality

**Plugin**: `@cmfcmf/docusaurus-search-local` (customized in `plugins/`)

**Configuration**
- Indexes: docs pages, blog posts, regular pages
- Parent categories included (3 levels deep)
- Lunr.js backend with custom tokenization
- Czech language support (using `ru` locale as fallback)

**Boost Settings**
- Title boost: 5x
- Content boost: 1x
- Parent categories boost: 2x

### 7. Documentation System

**Content Organization**
- Markdown files with MDX support (React components in Markdown)
- Automatic sidebar generation from filesystem structure
- Frontmatter metadata: `title`, `description`, `exclude_cs`, `exclude_en`

**Content Categories**
- **Learning Materials** (`docs/learning/`)
  - Introduction and resources
  - Interactive examples (Pixi.js, Three.js, physics, graphics, AI, multiplayer, games)
  - Tutorials (Pixi.js intro, Three.js intro, Matter.js, ECS)
  - Cheatsheets (JavaScript, TypeScript, Git, data structures)
- **Courses** (`docs/courses/`)
  - NI-APH course information
- **Brand Guidelines** (`docs/brand.md`)

## Build & Deployment Pipeline

### Build Process

1. **Install Dependencies**
   ```bash
   npm ci
   ```

2. **Download External Data**
   ```bash
   npm run download_data
   ```
   This script (`scripts/download_data.js`):
   - Downloads examples ZIP from GitHub releases (version 6.4.0)
   - Downloads slides ZIP from GitHub releases (version 6.15.0)
   - Downloads Tiscali articles JSON
   - Extracts ZIPs to `static/examples/` and `static/slides/`

3. **Build Static Site**
   ```bash
   npm run build_cs  # Czech version
   npm run build_en  # English version
   ```
   - Docusaurus builds locale-specific static site
   - Outputs to `build/` directory
   - Bundles React components with the site

### Development Workflow

**Local Development**
```bash
npm run start_cs   # Czech version on localhost:3000
npm run start_en   # English version on localhost:3000
```

**Quality Checks**
```bash
npm run lint       # ESLint for src, i18n, docs
```

### CI/CD Pipeline (GitHub Actions)

**Workflow Files**
- `.github/workflows/deploy_cs.yml`: Czech version deployment
- `.github/workflows/deploy_en.yml`: English version deployment

**Deployment Steps** (both workflows)
1. Checkout repository
2. Setup Node.js 18 and npm 8
3. Install dependencies (`npm ci`)
4. Download external data (`npm run download_data`)
5. Build locale-specific site (`npm run build_cs` or `npm run build_en`)
6. Deploy to AWS S3 bucket (locale-specific buckets)
7. Set cache headers: `index.html` has `max-age=0` for immediate updates

**Deployment URLs**
- Czech: https://aphgames.cz
- English: https://aphgames.io
- Gallery: https://gallery.aphgames.io (shared)

### Version Management

**Project Version**: 6.2.6 (in `package.json`)

**External Asset Versions** (in `web.config.js`)
- Examples: 6.4.0
- Slides: 6.15.0

**Version History**
See `CHANGELOG.md` for detailed version history.

## Configuration Files

### web.config.js

Central configuration for project-specific settings:
- **URLs**: Locale-specific deployment URLs
- **External repositories**: GitHub URLs for examples and slides
- **Versions**: External asset version numbers
- **Social links**: GitHub, YouTube
- **Metadata**: Owner, organization

### docusaurus.config.js

Main Docusaurus configuration:
- **Locale parsing**: Reads `--locale` from CLI arguments
- **i18n setup**: Single locale per build
- **Custom fields**: Exposes web.config values to React components
- **Navbar**: Locale-specific navigation items
- **Theme**: Dark mode only (color mode switch disabled)
- **Plugins**: Search, SASS support
- **Sidebar**: Auto-generated with locale filtering

### .eslintrc.json

ESLint configuration:
- **Base**: Airbnb style guide with TypeScript support
- **Indentation**: Tabs (not spaces)
- **Disabled rules**: max-len, radix, react/no-danger, jsx-a11y (selected rules)
- **Ignored**: JavaScript files (only TypeScript/TSX linted)

## Code Patterns & Conventions

### React Component Patterns

**SSR Safety**
All browser-dependent components check for window existence:
```tsx
export default (props) => {
  if (typeof window !== 'undefined') {
    return <ComponentRenderer {...props} />;
  }
  return null;
};
```

**CSS Modules**
All styles use SCSS modules:
```tsx
import styles from './component.module.scss';
<div className={styles.container} />
```

**Lazy Loading**
Locale-specific components use `@docusaurus/react-loadable`:
```tsx
import Loadable from '@docusaurus/react-loadable';
const Component = Loadable({
  loader: () => import('./ComponentCS'),
  loading: () => null,
});
```

### TypeScript Conventions

- **Strict mode**: Enabled in `tsconfig.json`
- **Type definitions**: Custom types in `src/types/`
- **Module aliases**: `@site/` alias for root directory

### File Naming Conventions

- React components: PascalCase with `.tsx` extension
- CSS modules: `*.module.scss`
- Markdown docs: kebab-case with `.md` or `.tsx` extension
- Configuration files: kebab-case with appropriate extension

### Markdown + MDX Usage

**Frontmatter Structure**
```md
---
title: Page Title
description: Page description
exclude_cs: true  # Optional: exclude from Czech build
exclude_en: true  # Optional: exclude from English build
---
```

**Importing React Components**
```tsx
import APHCanvas from '@site/src/APHCanvas.tsx'
<APHCanvas name="ExampleName" />
```

## Styling System

### Color Palette

**Source**: `src/internals/aph-colors.js` and `aph-colors.scss`

**Theme**: Dark mode only
- Dark background with light text
- Custom syntax highlighting (Prism themes)
- Consistent color scheme across all pages

### Typography

**Fonts**
- **Body**: Source Sans Pro (Google Fonts)
- **Code**: Inconsolata (Google Fonts)
- Font files stored in `static/fonts/`

**Code Highlighting**
- Custom Prism themes: `prism-aph-light.js`, `prism-aph-dark.js`
- Default language: JavaScript
- Supports multiple languages via Prism

## External Dependencies

### Repositories

**Examples Repository**
- URL: https://github.com/APHGames/examples
- Purpose: Interactive Pixi.js examples (COLF.IO engine)
- Integration: Downloaded at build time, loaded via `window.APH` namespace
- Current version: 6.4.0

**Slides Repository**
- URL: https://github.com/APHGames/slides
- Purpose: RevealJS presentation slides
- Integration: Downloaded at build time, linked from lectures page
- Current version: 6.15.0

**Support Repository**
- URL: https://github.com/APHGames/support
- Purpose: Historical articles data
- Integration: JSON file downloaded at build time

### Third-Party Services

**AWS S3**
- Static site hosting
- Separate buckets for Czech and English versions
- Custom cache headers for index.html

**GitHub**
- Source code hosting
- GitHub Actions for CI/CD
- GitHub Releases for external assets distribution

## Browser Compatibility

**Production Targets** (Browserslist)
- `>0.5%` market share
- Not dead browsers
- Not Opera Mini

**Development Targets**
- Latest Chrome
- Latest Firefox
- Latest Safari

## Accessibility

**Current State**
- Some jsx-a11y rules disabled in ESLint
- Dark mode only (no light mode toggle)
- Keyboard navigation for interactive examples (arrow keys, space blocked for canvas)

## Performance Considerations

**Static Site Generation**
- Pre-rendered HTML for all pages
- No server-side rendering at runtime
- Fast initial page loads

**Code Splitting**
- Locale-specific components lazy-loaded
- Docusaurus automatic code splitting

**Asset Optimization**
- SVG images used where possible
- Custom font loading
- Examples bundled in single module

**Caching Strategy**
- Aggressive caching for static assets
- `index.html` with `max-age=0` for immediate updates

## Known Limitations

1. **Color Mode**: Dark mode only, no light mode support
2. **Browser APIs**: Some features require modern browsers (window, canvas)
3. **Docusaurus Version**: Beta version (2.0.0-beta.17) may have stability issues
4. **External Dependencies**: Build depends on external GitHub repositories availability
5. **Locale Switching**: Requires full navigation to different domain (not SPA-style)
6. **Iframe Content**: Not accessible in interactive examples

## Maintenance & Updates

### Updating External Assets

**Examples**
1. Update `examples_version` in `web.config.js`
2. Ensure GitHub release exists with matching version
3. Rebuild and deploy

**Slides**
1. Update `slides_version` in `web.config.js`
2. Ensure GitHub release exists with matching version
3. Rebuild and deploy

### Adding New Content

**Documentation Pages**
1. Create Markdown file in appropriate `docs/` subdirectory
2. Add frontmatter with title and description
3. Optionally exclude from specific locale with `exclude_cs` or `exclude_en`
4. Sidebar automatically updated

**Interactive Examples**
1. Add example to external examples repository
2. Create documentation page in `docs/learning/examples/`
3. Import and use `APHCanvas` component with example name

**Gallery Items**
1. Update `src/internals/gallery-data.ts`
2. Add project metadata (title, description, students, year, images, links)
3. Rebuild and deploy

### Dependency Updates

**Regular Updates**
- Monitor for Docusaurus stable release
- Update React and TypeScript as needed
- Keep ESLint and dev dependencies current

**Breaking Changes**
- Test thoroughly in development before deploying
- Check Docusaurus migration guides for major updates
- Verify examples and slides compatibility

## Future Enhancements (Potential)

- Light mode support
- Blog usage expansion
- Enhanced search capabilities
- More interactive example types
- Student project submission system
- Video content integration
- Real-time collaboration features
- Progressive Web App (PWA) features

## Support & Contact

**Owner**: Adam Vesecký
**Organization**: DoDoLab
**GitHub**: https://github.com/APHGames
**YouTube**: https://www.youtube.com/@aphgames

---

**Last Updated**: February 12, 2026

This document should be kept up to date as the project evolves. Any significant architectural changes, new features, or major refactoring should be reflected here.
