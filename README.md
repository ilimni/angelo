# ILIMNI Learning

Static learning portal prepared for a future framework migration. The application remains a browser-loaded static site; script order in `index.html` is intentional.

## Structure

- `assets/branding/` — logos, favicon, and social-sharing image.
- `learning/` — learner-facing content, journey, optional practice, and compatibility adapter.
- `learning/intelligence/` — data-only learning intelligence registries and enrichment layer.
- `services/` — external-service initialization.
- `docs/` — educational and learning-experience records.

## Migration report — July 2026

Moved branding assets to `assets/branding/`; learning content and feature scripts to `learning/`; intelligence files to `learning/intelligence/`; Firebase initialization to `services/`; and the four project documents to `docs/`. Updated all source references, including page images, favicon, Apple touch icon, Open Graph image, script tags, and documentation paths.

Validation performed: repository-wide path search, local static-resource existence checks, JavaScript syntax checks, SVG internal-reference checks, and source-versus-generated-output review. The app still uses ordered classic scripts and browser globals; that order is the main consideration for a future Next.js migration, where those boundaries can be converted incrementally into modules without changing learning content or behaviour.
