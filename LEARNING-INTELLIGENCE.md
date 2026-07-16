# Learning Intelligence Layer (LIL)

The Learning Intelligence Layer is a data-only, additive architecture for ILIMNI. It attaches an invisible `learningIntelligence` object to every existing question after `content.js` loads. The renderer still uses the original question fields, so question flow, XP, certificates, authentication, local progress, Firebase documents, and learner-facing content are unchanged.

## Runtime flow

`content.js` → LIL taxonomies → `learning-intelligence.js` enriches each question → legacy Big Ideas display adapter → `app.js`.

The platform therefore has a stable instructional vocabulary that can later be joined with student attempts, teacher assignments, reports, adaptive recommendations, and tutoring prompts without changing the current progress schema.

## Question contract

Every item in `missionContent` receives this shape:

```js
learningIntelligence: {
  competencyIds: ["COMP-..."],
  bigIdeaIds: ["BIG-..."],
  misconceptionIds: ["MIS-..."],
  activityIds: ["ACT-..."],
  learningObjective: "...",
  cognitiveLevel: "Understand | Apply | Analyse | Evaluate",
  instructionalStrategy: "STR-...",
  questionPurpose: "formative-practice | metacognitive-reflection",
  classroomOrigin: { source: "...", mission: 1, section: "...", questionId: "..." },
  difficulty: "easy | medium | hard",
  estimatedTime: 60,
  tags: ["..."]
}
```

`LearningIntelligence.validateQuestions(missionContent)` is available in the browser console or future build checks. It reports any question missing a required field.

## Files created

- `learning-intelligence/competencies.js` — extensible `COMP-*` competency registry.
- `learning-intelligence/big-ideas.js` — canonical `BIG-*` registry; each record has id, title, statement, explanation, and tags.
- `learning-intelligence/misconceptions.js` — `MIS-*` misconceptions and their corrective ideas.
- `learning-intelligence/activities.js` — reusable `ACT-*` classroom learning objects with the requested curriculum links.
- `learning-intelligence/instructional-strategies.js` — reusable `STR-*` instructional strategy registry.
- `learning-intelligence/learning-intelligence.js` — schema contract, non-destructive question enrichment, and validation helpers.
- `LEARNING-INTELLIGENCE.md` — this architecture guide and authoring contract.

`bigIdeas.js` remains in place as a compatibility adapter for current Big Idea cards. It derives their existing `idea` display property from the canonical registry and resolves historic IDs through `legacyId`.

## Authoring future missions

Mission 6 is the first mission authored directly against the LIL contract. Future missions should follow the same pattern: explicit question metadata overrides the LIL defaults, so no renderer changes are needed:

```js
{
  id: "m6-example-01",
  mission: 6,
  // existing learner-facing fields...
  learningIntelligence: {
    competencyIds: ["COMP-009"],
    bigIdeaIds: ["BIG-004"],
    misconceptionIds: [],
    activityIds: ["ACT-..."],
    learningObjective: "Learner can ...",
    cognitiveLevel: "Apply",
    instructionalStrategy: "STR-006",
    questionPurpose: "formative-practice",
    classroomOrigin: { source: "ILIMNI Digital Literacy & Computing Foundations", mission: 6, section: "...", questionId: "m6-example-01" },
    difficulty: "medium",
    estimatedTime: 90,
    tags: ["..."]
  }
}
```

Add new taxonomy records before referencing their IDs. Future analytics should record attempts separately (for example by student ID, question ID, and timestamp) and join to these immutable content IDs; do not add analytics fields to the existing `completedQuestions` records until a deliberate data migration is designed.
