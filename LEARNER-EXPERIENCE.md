# Learner Experience Components

This update adds a learner-facing Big Idea collection without changing answer checking, XP rules, certificates, authentication, or Firebase collection locations.

## Modified files

- `app.js` — automatically unlocks, migrates, and persists dated Big Idea records; renders the collection and its dashboard entry point.
- `index.html` — adds the My Big Ideas dashboard card and accessible dedicated collection screen.
- `style.css` — adds calm notebook-style collection cards while retaining the existing design system.
- `LEARNER-EXPERIENCE.md` — documents the presentation components and their responsibilities.

## Reusable components

- **Big Idea cards and modal:** Landing uses the date-rotated Big Idea; the dashboard uses the learner’s latest Big Idea; a newly unlocked mission idea opens an accessible modal after completion feedback.
- **My Big Ideas collection:** `state.bigIdeaUnlocks` stores each idea’s internal ID, mission metadata, and unlock timestamp. The legacy `collectedBigIdeaIds` list remains for backward compatibility. Historical mission completions are backfilled once on load or progress check.
- **Mission icon containers:** Existing `IconContainer` variants provide the shared glass treatment, gradients, hover lift, completion rings, progress rings, status badges, and sparkles without replacing Lucide icons.
- **Empty state:** `createEmptyState()` supplies an icon-led fallback for an empty mission list. The certificate preview gives learners a clear, warm no-certificate-yet state.

## Accessibility and motion

Big Idea controls remain native buttons with an Escape key close, focus trap, and focus return. Collection updates use a polite live region. Existing `prefers-reduced-motion` handling disables animation and transition movement globally.
