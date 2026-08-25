# Cursor AI Rules for APHGames Web

This directory contains comprehensive guidelines for AI agents working on this project.

## Quick Start

**CRITICAL**: Before making any changes, read `project-overview.mdt` first, which links to the full PRD.

## Rule Files Overview

### 📋 [project-overview.mdt](./project-overview.mdt)
**READ THIS FIRST**

Core project information and guidelines:
- Links to PRD.md (primary reference)
- Documentation maintenance requirements (MUST update PRD.md and README.md)
- External asset management (examples, slides)
- Multilingual architecture
- Configuration files overview
- Version management

### ⚛️ [react-typescript-conventions.mdt](./react-typescript-conventions.mdt)
React and TypeScript development standards:
- Code style (TABS not spaces!)
- ESLint configuration
- SSR safety pattern (critical for Docusaurus)
- CSS Modules pattern
- APHCanvas component usage
- Component patterns and best practices

### 📝 [documentation-guidelines.mdt](./documentation-guidelines.mdt)
Documentation creation and maintenance:
- Markdown and MDX usage
- Frontmatter structure
- Interactive examples documentation
- Tutorial structure
- Code blocks and syntax highlighting
- Localization in documentation
- PRD and README maintenance

### 🚀 [build-deployment.mdt](./build-deployment.mdt)
Build process and deployment:
- Local development workflow
- External data download process
- Build commands and configuration
- CI/CD pipeline
- Caching strategy
- Troubleshooting build issues

## Critical Rules

### 1. Documentation Updates (MANDATORY)

**ALWAYS** update documentation when making changes:

- **Update PRD.md** (`/docs/PRD.md`) for:
  - Architecture changes
  - New features
  - Configuration changes
  - Dependency updates
  - Code pattern changes

- **Update README.md** for:
  - Setup changes
  - Major feature additions
  - Build command changes
  - Deployment URL changes

### 2. Code Style (MANDATORY)

- **Use TABS, not spaces** for indentation
- Follow Airbnb style guide (ESLint enforced)
- Run `npm run lint` before committing

### 3. SSR Safety (MANDATORY)

All browser-dependent components MUST check for window:

```tsx
export default (props) => {
  if (typeof window !== 'undefined') {
    return <ComponentRenderer {...props} />;
  }
  return null;
};
```

### 4. External Assets (MANDATORY)

- **NEVER** commit files in `static/examples/` or `static/slides/`
- **ALWAYS** update version in `web.config.js` when upgrading
- **ALWAYS** run `npm run download_data` before building

### 5. Localization (MANDATORY)

- Test BOTH Czech and English versions
- Use frontmatter to exclude content per locale if needed
- Maintain parallel structure across locales

## Quick Reference Commands

```bash
# Development
npm run start_cs          # Czech dev server
npm run start_en          # English dev server

# External Data
npm run download_data     # Download examples & slides

# Building
npm run build_cs          # Build Czech version
npm run build_en          # Build English version
npm run serve             # Serve built site

# Quality
npm run lint              # Run ESLint
```

## File Structure Quick Reference

```
aphgames_web/
├── .cursor/rules/        # AI agent guidelines (you are here!)
├── docs/
│   ├── PRD.md            # 📋 Primary reference document
│   ├── learning/         # Learning materials & examples
│   └── courses/          # Course materials
├── src/
│   ├── APHCanvas.tsx     # Core interactive examples component
│   ├── components/       # React components
│   ├── pages/            # Custom pages (index, gallery, artifacts)
│   └── css/              # SCSS modules
├── static/
│   ├── examples/         # Downloaded at build (gitignored)
│   ├── slides/           # Downloaded at build (gitignored)
│   └── img/              # Images and assets
├── scripts/
│   └── download_data.js  # Downloads external assets
├── i18n/                 # Translations (cs, en)
├── web.config.js         # Project configuration
├── docusaurus.config.js  # Docusaurus configuration
├── package.json          # Dependencies & scripts
└── README.md             # Project readme
```

## Common Tasks

### Adding an Interactive Example
1. Ensure example exists in external repo
2. Create doc in `docs/learning/examples/{category}/`
3. Import and use `APHCanvas` component
4. Test rendering
5. Update PRD.md if new category

### Adding Documentation
1. Create `.md` file in `docs/learning/`
2. Add frontmatter (title, description)
3. Write content (MDX supported)
4. Test both locales
5. Update PRD.md if significant

### Updating External Assets
1. Update version in `web.config.js`
2. Run `npm run download_data`
3. Test locally
4. Update PRD.md with new version
5. Document in CHANGELOG.md

### Making Code Changes
1. Read relevant rule file(s)
2. Make changes following conventions
3. Run `npm run lint`
4. Test both locales
5. Update documentation (PRD.md, README.md)
6. Commit with descriptive message

## Pre-Commit Checklist

Before committing ANY changes:

- [ ] Followed code conventions (tabs, ESLint, SSR safety)
- [ ] Ran `npm run lint` (no errors)
- [ ] Tested both locales if applicable
- [ ] Updated PRD.md (if architecture/features changed)
- [ ] Updated README.md (if setup/major changes)
- [ ] Updated CHANGELOG.md (if version changed)
- [ ] Interactive examples work (if modified)
- [ ] Documentation is accurate and current

## Getting Help

### Reference Documents
1. **Primary**: `/docs/PRD.md` - Comprehensive project documentation
2. **Project**: `/README.md` - Quick start and overview
3. **Rules**: Files in `.cursor/rules/` - Detailed guidelines

### External Resources
- **Docusaurus**: https://docusaurus.io/docs
- **React**: https://reactjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **Examples Repo**: https://github.com/APHGames/examples
- **Slides Repo**: https://github.com/APHGames/slides

## Rule Updates

These rules should be updated when:
- Project patterns change significantly
- New conventions are established
- Build process changes
- Major architecture changes
- Common pitfalls are discovered

When updating rules:
1. Update relevant rule file(s)
2. Update this README if structure changes
3. Update PRD.md to reflect rule changes
4. Keep rules clear, concise, and actionable

---

**Last Updated**: February 12, 2026

**Note**: These rules are designed to help AI agents maintain code quality, consistency, and comprehensive documentation. Following these guidelines ensures the project remains maintainable and well-documented.
