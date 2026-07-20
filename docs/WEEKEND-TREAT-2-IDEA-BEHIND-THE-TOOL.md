# Weekend Treat 2 — "The Idea Behind the Tool"

## What was added

A second, independent Weekend Treat, reachable alongside the existing
Keyboard Practice activity through a new small "Weekend Treats" picker
screen (shown when the Weekend Activities nav item is clicked). The
picker lists both activities in chronological order — Keyboard
Practice first, The Idea Behind the Tool second — each showing its
own completion status and launching independently. Both treats'
progress is stored separately (`ilimni_keyboard_detective_v1` and
the new `ilimni_idea_behind_tool_v1`), so nothing about the existing
activity's saved state, content, or flow was touched.

The new treat has five short stages: a brief story, a self-directed
exploration checklist, one reflection question, one Big Idea, and a
plain completion acknowledgement — no certificate, trophy, or new
learner identity, per the brief.

## Why each part aligns with classroom teaching

**Story (a different computer, unfamiliar Settings app).** Grounded
in Day 6, where the class discussed *transitioning from old to new*
UI — the observation that Windows 11 still carries "foundations of
Windows 7" even though it looks different. The story's core move
(stop, ask "what am I trying to do?", then explore) mirrors what
actually happened in Day 5: the learner found the Accessibility
settings *himself*, by exploring, before it was ever explained to
him.

**Practical challenge.** The brief's example list included
"locating Bluetooth," which does not appear anywhere in the three
teacher-note documents, so it was not used — inventing it would have
broken educational fidelity. In its place, four tasks were built
directly from what the notes describe as actually taught or explored:
- *Find Accessibility settings* — Day 5, explored hands-on.
- *Find High Contrast* — Day 6, "I saw the high contrast mode and had
  to explain it to him" / the Contrast add-on.
- *Find Control Panel and compare it with Settings* — Day 6, "We
  explored some stuffs in settings... and then control panel. We
  tried to differentiate between the two."
- *Use the search bar instead of clicking through menus* — Day 6's
  "search bars can be your best friend" add-on.

Each task is self-reported (a "found it" button) rather than
auto-graded, since these are real actions on the learner's own
computer that the app can't verify — and per the brief, this avoids
rewarding rote button-memorization with a scored quiz mechanic.

**Reflection.** Uses the exact question the brief proposed
("remembering where something was" vs. "understanding what it was
for"), which is a direct restatement of Day 6's core observation:
"it's more important to understand a concept so one can use different
tools with ease." No option is marked right or wrong — both buttons
use the same neutral selected-state styling (this required a small
fix, see below).

**Big Idea.** "Understanding a concept helps you use many different
tools" — Day 6, Add-on 3 ("concept vs tools"): "we talked about how
it's more important to understand a concept so one can use different
tools with ease. Even different OS." Exactly one Big Idea was added,
as instructed, and it is not wired into the platform's mission-linked
Big Ideas registry (`learning/intelligence/big-ideas.js`) — that
registry is curriculum content tied to missions, and this is
explicitly an optional, self-contained treat, so it gets its own
simple display instead of touching that system.

**Recognition.** A single line — "you practised thinking beyond
buttons" — with no certificate, trophy, or title, matching the brief's
explicit restraint on this point.

## A bug caught and fixed along the way

While building the reflection screen, I initially reused the existing
`.truth-buttons` component (from the Truth-or-Myth activity), which
hardcodes its first button green and its second button red — correct
for a true/false quiz, but it would have made "Remembering" look
*correct* and "Understanding" look *wrong* for a question that
explicitly has no wrong answer. Caught this before shipping and
switched to the neutral multiple-choice styling instead, verified via
computed color values in a real browser (neutral black/white for
unselected, brand purple for selected — no red or green).

## Files modified

- `learning/weekend-treat.js` — added the picker hub and the five new
  stage functions; the existing Keyboard Practice functions were not
  rewritten. The only shared-code change was parameterizing `shell()`
  and `progress()` to accept an explicit state object (so the second
  treat can use the same rendering function instead of a duplicate),
  and splitting `back()` into `backToMissions()` (the picker's own
  exit) and `back()` (now points to the picker instead of straight to
  Missions, so both treats sit under one coherent hub). This is a
  navigational change scoped entirely to the Weekend Treat feature —
  no changes to `SCREENS`, `data-nav-target`, or `showScreen()` in
  `app.js`.
- `style.css` — retokenized the previously-unused `.weekend-invite`
  component (it existed in the stylesheet but nothing in the app
  referenced it) to the current design tokens instead of its old
  hardcoded hex colors, added styles for the exploration checklist
  (`.explore-list`, `.explore-item`, `.explore-item__tip`), and added
  a neutral `.is-chosen` selected state.

## QA performed

All checked in a real headless browser (not just read from the code):
- Picker shows both treats in order, each launches independently.
- Full walkthrough of the new treat (story → all 4 exploration tasks
  → reflection → Big Idea → acknowledgement) completes with no JS
  errors.
- Existing Keyboard Practice treat re-verified end to end (intro →
  key-finding → wrong-answer feedback) — byte-for-byte the same
  behavior as before.
- Mid-progress state (3 stars, 60 XP, stage "shortcuts") resumes
  correctly through the new picker — no progress lost.
- The two treats' localStorage keys confirmed independent — starting
  the new treat does not touch the keyboard treat's saved data.
- Full nav sweep across every destination (Continue Learning, Learning
  Journey, Mission Library, Big Ideas, Weekend Activities, Recognition)
  — no new console errors beyond the sandbox's expected blocked
  Firebase CDN request.
- `node --check` on `app.js` and `learning/weekend-treat.js`, and CSS
  brace-balance check — all pass.
