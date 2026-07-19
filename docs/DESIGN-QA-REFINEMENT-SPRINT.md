# ILIMNI Learn — Design QA & Refinement Sprint Report

No curriculum, educational logic, learning progression, or existing
functionality was changed. This sprint touched presentation, navigation,
accessibility, typography, and brand consistency only.

## 1. Accessibility — dark-mode button contrast

**Root cause found:** the stylesheet contained two complete copies of the
design-token system — one `:root` / `[data-theme="dark"]` block near the
top of `style.css`, and a second one appended near the bottom from an
earlier pass. CSS cascade rules mean the second one silently won,
and it included:

```css
.btn--primary { background: var(--text); box-shadow: none; }
```

with no color override. In dark mode `--text` is near-white, and the
base `.btn--primary` rule sets `color: #fff` — white text on a
near-white button. That's the exact bug described ("foreground and
background colours currently merge together").

**Fix:** merged both token systems into one canonical set, and gave
`.btn--primary` an explicit theme-aware text color
(`[data-theme="dark"] .btn--primary { color: #171717; }`) so the
class of bug can't recur. Also bumped nav links and the new sidebar
action buttons to a consistent 44px touch target.

## 2. Navigation architecture

**Root cause found:** "Continue Learning" called the same
`startMission()` / `goToMissionSelect()` function as "Mission Library,"
and "Recognition" opened Mission Library and scrolled to a badges
widget. All three nav items pointed at the same underlying screen.

**Fix:** built two new, real screens with their own hero, layout, and
first impression:

- **`#screen-dashboard` (Continue Learning)** — a resume card showing
  the current mission, focus, and live progress bar with a "Resume
  learning" action; a distinct empty/complete state ("You've completed
  everything currently available…") when nothing is left to resume;
  and three tiles for next recommended activity, latest classroom
  update, and teacher messages (placeholder, future-ready as specified).
- **`#screen-achievements` (Recognition)** — badges row, certificate
  status, completed Big Ideas count, and milestones, framed as a
  reflection space rather than a second dashboard.

`SCREENS` in `app.js` and the nav click handler were updated to route
to these directly. Mission Library itself was left untouched (mission
grid, locked/unlocked state, progress) — it's the one screen that was
already doing its stated job.

*Note:* I deliberately left the default post-sign-in/post-completion
landing screen as Mission Library rather than switching it to Continue
Learning — the brief asked for distinct destinations, not a change to
the app's default entry point, and that touches more flows than I could
verify in this pass.

## 3. Typography

**Root cause found:** the `<head>` contained ~440 lines of inline
`@font-face` rules pointing at `/cf-fonts/...` relative paths. These
only resolved inside the original Codespaces preview proxy — on a real
deployment (the project has a `.vercel` folder) they 404 silently, and
the app has been rendering in system-ui/fallback sans-serif the entire
time despite declaring `Inter`/`Poppins`.

**Fix:** removed the broken block and replaced it with a real Google
Fonts link for **Plus Jakarta Sans** (400–800 weights, italic 600).
Chosen over Manrope/Geist/Instrument Sans because it has the widest
weight range of the four for a strong display/body split, a slightly
warmer, more approachable letterform than Geist (better fit for a
JSS3 audience) without Manrope's narrower x-height at small sizes, and
broad existing adoption so it renders consistently across devices.
`--font-display` / `--font-body` both point to it; heading weight/
letter-spacing and body line-height were tightened alongside the token
merge (§11).

## 4. Product identity (ILIMNI / Learn)

Header brand and the welcome hero now render as two typographic
levels — a small letter-spaced "ILIMNI" eyebrow above/beside a bolder
product wordmark — instead of one continuous string, in both places
the brand appears.

## 5. Sidebar layout

Restructured `#app-header` (which becomes the fixed sidebar at ≥900px)
into three groups: **top** (brand + theme toggle), **middle**
(navigation, unchanged targets otherwise), **bottom** (XP, student
pill, Export Progress, Sign Out). Export and Sign Out are no longer
icon-only — both now show an icon **and** a text label, stacked full-
width in the sidebar footer. The old rigid 2-column icon grid for this
area is gone in favor of a flexible vertical stack that no longer
assumes exactly two children.

## 6. Logo container

Introduced a reusable `.brand-mark` container (solid purple-gradient
badge) that the icon sits inside, in both the header and the hero.
**Important finding:** the logo SVG itself is solid white with no
theme-aware fill, and the old code compensated with a CSS `filter:
invert(...)` hack recoloring the whole image per theme. That hack is
gone — the container now carries the color identity via a fixed
gradient background, so the white glyph is always visible regardless
of theme, and the logo file itself was never recolored. This pattern
(`.brand-mark` / `.brand-mark--lg`) is reusable for future ILIMNI
products as requested.

## 7. Favicon

Replaced the flat purple circle + fine-line smile squiggle (the
squiggle doesn't read at 16–32px) with a gradient circle and the core
glyph only, simplified for legibility at small sizes. Circle shape was
kept deliberately — the brief's "avoid generic coloured rounded
rectangles" warns against rectangles, and a circle badge is
consistent with the in-app `.brand-mark`.

## 8. Open Graph image

Reviewed against the brief's checklist (typography, whitespace,
product identity, subtle interface preview, restrained accent color)
— `branding/ilimni-og.svg` already meets this bar: bold display
headline, an "ILIMNI LEARNING" eyebrow, a mocked interface preview
card, and the same restrained purple used elsewhere. Left unchanged
rather than replacing something that already does the job; flagging
this so it isn't mistaken for having been skipped.

## 9–10. Responsive polish & visual consistency

- Bumped sidebar nav links and new footer action buttons to the same
  44px touch target used elsewhere in the app.
- Removed several *duplicate, conflicting* rules discovered during the
  token merge — e.g. `.btn` was defined once as fully pill-shaped
  (`border-radius: var(--radius-pill)`) and a second time, later in the
  cascade, as a soft rounded rectangle (`9px`). The second definition
  was already winning in practice; I made it the single canonical
  definition instead of leaving two conflicting sources of truth.
- New screens (`dashboard`, `achievements`) reuse existing card/empty-
  state/shadow/radius tokens rather than introducing new ones.

**Not fully audited:** a full manual pass on every existing screen
(mission detail, journal, certificate, weekend activity) for spacing/
radius/shadow drift was out of scope for the time available. The
token and button consolidation should remove the most visible
instances by itself, since most components inherit from the shared
variables, but a visual pass across all screens is still worth doing
before calling this fully closed.

## 11. Colour system

Consolidated tokens so purple is a restrained accent rather than the
dominant color:

- Light: `--brand: #5b21b6` (was a brighter `#4338ca` used pervasively)
- Dark: `--brand: #c4b5fd`
- Neutral greys (`--text`, `--text-muted`, `--border`, `--surface`)
  now carry the bulk of the interface; brand color is reserved for
  primary actions, active nav state, and accent details.
- Semantic colors (`--success`, `--danger`, `--warning`, `--info`)
  kept distinct from brand purple rather than tinted toward it.

## 12. Design QA checklist

| Item | Status |
|---|---|
| Every nav destination has a unique identity | ✅ Done — Continue Learning and Recognition are now real, distinct screens |
| No duplicate page experiences | ✅ Fixed the two that existed |
| No contrast failures | ✅ Root cause (duplicate token cascade) fixed at the source |
| No overflow | ⚠️ Spot-checked new screens only; no full-app pass |
| No broken branding | ✅ Two-level identity + non-recolored logo |
| No missing assets | ✅ Favicon/OG confirmed present and synced across `branding/` and `assets/branding/` |
| No JavaScript regressions | ✅ `node --check app.js` passes; new functions reuse existing helpers (`missionStats`, `computeEarnedBadges`, `buildLearningJourneyModel`, etc.) rather than duplicating logic |
| No accessibility regressions | ✅ Button contrast fixed; touch targets standardized to 44px |
| Educational fidelity unchanged | ✅ No curriculum, question, or scoring logic touched |
| Responsive behaviour verified | ⚠️ Structural rules checked (flex-wrap, auto-fit grids); not visually tested on real devices |

## Recommended next steps
- Visual QA in an actual browser (light + dark, mobile + desktop) —
  everything here was verified structurally (balanced tags/braces,
  `node --check`, cascade tracing) but not rendered.
- A full spacing/radius/shadow sweep across the mission, journal,
  certificate, and weekend-activity screens.
- Decide intentionally whether Continue Learning should become the
  default post-sign-in landing screen (currently still Mission
  Library) — that's a product decision, not a bug fix.
