# Learning Experience Cleanup Archive

This log preserves items removed from learner-facing surfaces during the Learning Experience Cleanup Sprint. They are archived for future curriculum review; they have not been discarded.

## Dashboard component preserved

The former full `LearningJourney` renderer was mounted directly on the mission dashboard (`#learning-journey-root`). The reusable renderer and event contract remain in `learning/learning-journey.js`; its mount point moved to the dedicated Learning Journey screen. The dashboard now uses the compact `#btn-open-learning-journey` entry card.

## Recognition data model archived

These legacy recognition definitions were removed from the active `gamification.badges` list because their titles claim broad curriculum-level competence not yet evidenced. Their complete records are retained as `archivedRecognitionBadges` in `learning/content.js`.

- Computer Fundamentals Graduate
- Windows Navigator
- Keyboard Commander
- Smart Computer User
- Digital Problem Solver
- Digital Investigator

## Timeline event system preserved

The event contract still accepts mission unlock, reflection, and other event types. The Learning Journey presentation now filters it to the five most recent meaningful events, omitting routine unlock and reflection activity.
