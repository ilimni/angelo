/*
 * Legacy display adapter for the canonical Learning Intelligence Big Ideas
 * registry. Keep this global array for current learner-facing cards.
 */
var bigIdeas = (typeof LIL_BIG_IDEAS === "undefined" ? [] : LIL_BIG_IDEAS).map(function (idea) {
  return {
    id: idea.id,
    legacyId: idea.legacyId,
    missionId: idea.relatedMissions && idea.relatedMissions.length === 1 ? idea.relatedMissions[0] : null,
    title: idea.title,
    idea: idea.statement,
    statement: idea.statement,
    explanation: idea.explanation,
    tags: idea.tags.slice()
  };
});
