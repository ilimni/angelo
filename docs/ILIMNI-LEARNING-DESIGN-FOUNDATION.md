# ILIMNI Learning Design Foundation

## Intent

This foundation shifts the portal from a dense learning dashboard toward a calm, editorial learning space. The instructional model, questions, mission order, scoring, and activity logic are unchanged.

## Decisions

- **Identity:** the ILIMNI icon is now the interface mark. “ILIMNI Learning” supplies the product branch identity; the full horizontal mark is no longer used in the app shell or hero.
- **Colour:** neutral black, white, and grey surfaces do the main work. Purple is reserved for orientation and discovery. Semantic tokens cover discovery, understanding, recognition, success, warning, danger, and information in both themes.
- **Typography:** the display scale, line-height, text measure, and vertical rhythm were increased. The hero now leads with “Learn to Think, Not Just Click.” and supporting copy explains the philosophy rather than a feature list.
- **Navigation:** desktop uses a fixed left rail. “Continue Learning” resumes the next available mission, while “Mission Library” remains the deliberate browsing view—no duplicate destination wearing two hats. Weekend Activities is now only reachable from its dedicated navigation item.
- **Surfaces and motion:** cards are flatter, borders quieter, spacing more generous, and interactions use small elevation only. Existing animated treatments honour reduced-motion preferences.
- **Responsive access:** the tablet/mobile shell removes nonessential status controls, preserves a scrollable navigation strip, and converts navigation to icon buttons at small widths while retaining accessible labels.

## Brand assets

- `assets/branding/ilimni-favicon.svg` is a Learning-specific mark: the ILIMNI glyph sits with an open-book cue in the product purple, with no decorative rounded rectangle.
- `assets/branding/ilimni-og.svg` is a product preview showing message, product identity, and a quiet learning-space interface.

## Validation performed

- JavaScript syntax checks passed for `app.js` and `learning/weekend-treat.js`.
- `git diff --check` passed.
- Asset references used by the updated page resolve to files in `assets/branding/`.

Manual browser checks still recommended before release: keyboard tab order and focus in both themes, 320px/768px/1440px layouts, and actual social-card rendering on the deployed absolute Open Graph URL.
