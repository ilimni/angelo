# Learner Experience Components

This update is presentation and interaction only. It does not change mission content, curriculum metadata, answer checking, XP rules, certificates, authentication, or Firebase collection locations.

## Modified files

- `app.js` — adds Wisdom Journal ID persistence, Big Idea collection behaviour, latest-Idea journal status, and reusable empty-state rendering.
- `index.html` — uses Lucide icons for Big Idea surfaces, adds the latest-Idea explanation/journal status, and adds an elegant certificate-empty state.
- `style.css` — refines reusable Big Idea, empty-state, and Lucide icon presentation while retaining the existing mission-card component system.
- `LEARNER-EXPERIENCE.md` — documents the presentation components and their responsibilities.

## Reusable components

- **Big Idea cards and modal:** Landing uses the date-rotated Big Idea; the dashboard uses the learner’s latest Big Idea; mission completion opens the existing accessible modal after completion feedback.
- **Wisdom Journal foundation:** `state.collectedBigIdeaIds` stores canonical `BIG-*` IDs. “I’ll Remember This” is idempotent, saved through the existing local/Firebase state flow, and needs no full journal UI yet.
- **Mission icon containers:** Existing `IconContainer` variants provide the shared glass treatment, gradients, hover lift, completion rings, progress rings, status badges, and sparkles without replacing Lucide icons.
- **Empty state:** `createEmptyState()` supplies an icon-led fallback for an empty mission list. The certificate preview gives learners a clear, warm no-certificate-yet state.

## Accessibility and motion

Big Idea controls remain native buttons with an Escape key close, focus trap, and focus return. Dynamic journal feedback uses a polite live region. Existing `prefers-reduced-motion` handling disables animation and transition movement globally.
