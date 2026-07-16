/*
 * ILIMNI Learning Intelligence Layer (LIL)
 *
 * Content remains the source of learner-facing behaviour. This module adds
 * non-rendered instructional data to those existing objects after they load.
 * It deliberately never reads or writes progress, XP, certificates, auth, or
 * Firebase data.
 */
(function (global) {
  "use strict";

  var requiredFields = [
    "competencyIds", "bigIdeaIds", "misconceptionIds", "activityIds",
    "learningObjective", "cognitiveLevel", "instructionalStrategy",
    "questionPurpose", "classroomOrigin", "difficulty", "estimatedTime", "tags"
  ];

  var missionDefaults = {
    1: { competencyIds: ["COMP-001", "COMP-011", "COMP-012"], bigIdeaIds: ["BIG-001", "BIG-006"], activityIds: ["ACT-001"], tags: ["computer-basics", "input-process-output"] },
    2: { competencyIds: ["COMP-007", "COMP-008", "COMP-009"], bigIdeaIds: ["BIG-003", "BIG-005"], activityIds: ["ACT-002"], tags: ["files", "folders", "search"] },
    3: { competencyIds: ["COMP-003"], bigIdeaIds: ["BIG-001"], activityIds: ["ACT-003"], tags: ["keyboard", "shortcuts"] },
    4: { competencyIds: ["COMP-004", "COMP-014"], bigIdeaIds: ["BIG-001"], activityIds: ["ACT-004"], tags: ["mouse", "problem-solving"] },
    5: { competencyIds: ["COMP-002", "COMP-005", "COMP-006", "COMP-009", "COMP-010"], bigIdeaIds: ["BIG-001", "BIG-002", "BIG-004"], activityIds: ["ACT-005"], tags: ["windows", "navigation", "accessibility"] }
  };

  var strategyByType = {
    "reflection": "STR-003", "matching": "STR-007", "sorting": "STR-008",
    "ordering": "STR-009", "scenario": "STR-006", "drag-drop": "STR-011",
    "hotspot": "STR-005", "fill-blank": "STR-004", "true-false": "STR-004",
    "mcq": "STR-004"
  };
  var levelByType = {
    "reflection": "Evaluate", "matching": "Understand", "sorting": "Analyse",
    "ordering": "Apply", "scenario": "Apply", "drag-drop": "Apply",
    "hotspot": "Apply", "fill-blank": "Apply", "true-false": "Understand", "mcq": "Understand"
  };

  function includesText(q, text) {
    return (q.title + " " + q.section + " " + q.question).toLowerCase().indexOf(text) !== -1;
  }

  function misconceptionIdsFor(q) {
    var ids = [];
    if (includesText(q, "extension") || includesText(q, "file name")) ids.push("MIS-001", "MIS-006");
    if (includesText(q, "application") || includesText(q, "open file") || includesText(q, "compatib")) ids.push("MIS-002");
    if (includesText(q, "task manager")) ids.push("MIS-003");
    if (includesText(q, "control panel") || includesText(q, "settings")) ids.push("MIS-004");
    if (includesText(q, "touchscreen")) ids.push("MIS-005");
    if (includesText(q, "accessibility") || includesText(q, "high contrast")) ids.push("MIS-007");
    return ids.filter(function (id, index) { return ids.indexOf(id) === index; });
  }

  function objectiveFor(q) {
    return "Learner can " + ({
      "reflection": "explain their thinking about", "matching": "match concepts involved in",
      "sorting": "classify elements involved in", "ordering": "sequence the steps or concepts in",
      "scenario": "choose an appropriate response to", "drag-drop": "apply knowledge to",
      "hotspot": "identify relevant elements in", "fill-blank": "supply the correct answer for"
    }[q.type] || "demonstrate understanding of") + " “" + q.title + "”.";
  }

  function metadataForQuestion(q) {
    var defaults = missionDefaults[q.mission] || { competencyIds: [], bigIdeaIds: [], activityIds: [], tags: [] };
    return {
      competencyIds: defaults.competencyIds.slice(),
      bigIdeaIds: defaults.bigIdeaIds.slice(),
      misconceptionIds: misconceptionIdsFor(q),
      activityIds: defaults.activityIds.slice(),
      learningObjective: objectiveFor(q),
      cognitiveLevel: levelByType[q.type] || "Understand",
      instructionalStrategy: strategyByType[q.type] || "STR-004",
      questionPurpose: q.type === "reflection" ? "metacognitive-reflection" : "formative-practice",
      classroomOrigin: { source: "ILIMNI Digital Literacy & Computing Foundations", mission: q.mission, section: q.section, questionId: q.id },
      difficulty: q.difficulty,
      estimatedTime: q.type === "reflection" ? 180 : (q.difficulty === "easy" ? 60 : q.difficulty === "medium" ? 90 : 120),
      tags: defaults.tags.concat([q.type, "mission-" + q.mission])
    };
  }

  function enrichQuestions(questions) {
    (questions || []).forEach(function (q) {
      // Explicit metadata authored on a future question always wins over defaults.
      q.learningIntelligence = Object.assign(metadataForQuestion(q), q.learningIntelligence || {});
    });
    return questions;
  }

  function validateQuestionMetadata(question) {
    var metadata = question && question.learningIntelligence;
    return requiredFields.filter(function (field) {
      return !metadata || metadata[field] === undefined || metadata[field] === null;
    });
  }

  function validateQuestions(questions) {
    return (questions || []).map(function (question) {
      return { questionId: question.id, missing: validateQuestionMetadata(question) };
    }).filter(function (result) { return result.missing.length; });
  }

  global.LearningIntelligence = {
    schemaVersion: "1.0.0",
    requiredQuestionFields: requiredFields.slice(),
    registries: {
      competencies: global.LIL_COMPETENCIES || [], bigIdeas: global.LIL_BIG_IDEAS || [],
      misconceptions: global.LIL_MISCONCEPTIONS || [], activities: global.LIL_ACTIVITIES || [],
      instructionalStrategies: global.LIL_INSTRUCTIONAL_STRATEGIES || []
    },
    enrichQuestions: enrichQuestions,
    validateQuestionMetadata: validateQuestionMetadata,
    validateQuestions: validateQuestions
  };

  // Additive hydration preserves all legacy content fields and the mission list.
  // `missionContent` is declared with `const` in content.js, so it is a
  // global lexical binding rather than necessarily a `window` property.
  if (typeof missionContent !== "undefined") enrichQuestions(missionContent);
})(window);
