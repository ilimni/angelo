/*
 * Learning Journey
 * A presentation-only subsystem. Its input is a progress summary and a list
 * of journey events, so the dashboard, Firestore, or a classroom service can
 * all supply the same contract without changing this renderer.
 */
(function (global) {
  "use strict";

  var EVENT_TYPES = [
    "LIVE_CLASS_COMPLETED", "MISSION_UNLOCKED", "MISSION_COMPLETED",
    "WEEKEND_ACTIVITY_AVAILABLE", "BIG_IDEA_DISCOVERED", "REFLECTION_SUBMITTED",
    "RECOGNITION_EARNED", "CERTIFICATE_AWARDED", "TEACHER_FEEDBACK"
  ];
  var META = {
    LIVE_CLASS_COMPLETED: { icon: "presentation", label: "Classroom" },
    MISSION_UNLOCKED: { icon: "lock-keyhole-open", label: "Next step" },
    MISSION_COMPLETED: { icon: "circle-check-big", label: "Completed" },
    WEEKEND_ACTIVITY_AVAILABLE: { icon: "calendar-days", label: "Weekend activity" },
    BIG_IDEA_DISCOVERED: { icon: "lightbulb", label: "Big Idea" },
    REFLECTION_SUBMITTED: { icon: "notebook-pen", label: "Reflection" },
    RECOGNITION_EARNED: { icon: "award", label: "Recognition" },
    CERTIFICATE_AWARDED: { icon: "scroll-text", label: "Certificate" },
    TEACHER_FEEDBACK: { icon: "message-square", label: "Teacher feedback" }
  };

  function node(tag, attrs, children) {
    var element = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "class") element.className = attrs[key];
      else if (key === "text") element.textContent = attrs[key];
      else element.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) { if (child) element.appendChild(child); });
    return element;
  }
  function icon(name) { return node("i", { class: "ui-icon", "data-lucide": name, "aria-hidden": "true" }); }
  function dateText(timestamp) {
    var date = timestamp ? new Date(timestamp) : null;
    if (!date || isNaN(date.getTime())) return "Recently";
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  function render(root, model, onNavigate) {
    if (!root) return;
    var progress = model.progress || {};
    var events = (model.events || []).filter(function (event) { return EVENT_TYPES.indexOf(event.type) !== -1; })
      .sort(function (a, b) { return String(b.timestamp || "").localeCompare(String(a.timestamp || "")); });
    root.innerHTML = "";
    var section = node("section", { class: "learning-journey-panel", "aria-labelledby": "learning-journey-title" });
    section.appendChild(node("div", { class: "learning-journey-panel__heading" }, [
      node("div", {}, [node("p", { class: "learning-journey-panel__eyebrow", text: "Your learning journal" }), node("h2", { id: "learning-journey-title", text: "Learning Journey" })]),
      node("p", { class: "learning-journey-panel__intro", text: "A calm view of what you have learned and where to go next." })
    ]));
    var card = node("section", { class: "journey-progress-card", "aria-label": "Current learning progress" });
    card.appendChild(node("div", { class: "journey-progress-card__top" }, [
      node("div", {}, [node("span", { class: "journey-progress-card__label", text: "Section" }), node("strong", { text: progress.section || "Learning pathway" })]),
      node("div", { class: "journey-progress-card__mission" }, [icon("map-pin"), node("span", { text: progress.currentMission || "Your next mission" })])
    ]));
    card.appendChild(node("p", { class: "journey-progress-card__focus", text: progress.currentFocus || "Choose a mission to continue learning." }));
    var bar = node("div", { class: "journey-progress-card__track", role: "progressbar", "aria-label": "Mission completion progress", "aria-valuemin": "0", "aria-valuemax": String(progress.totalMissions || 0), "aria-valuenow": String(progress.completedMissions || 0) }, [node("span", { style: "width:" + Math.max(0, Math.min(100, progress.percent || 0)) + "%" })]);
    card.appendChild(bar);
    card.appendChild(node("p", { class: "journey-progress-card__count", text: (progress.completedMissions || 0) + " of " + (progress.totalMissions || 0) + " Missions Completed" }));
    section.appendChild(card);
    var timeline = node("div", { class: "journey-timeline", role: "list", "aria-label": "Learning Journey events" });
    if (!events.length) timeline.appendChild(node("p", { class: "journey-timeline__empty", text: "Your learning story will appear here as you explore." }));
    events.forEach(function (event) {
      var meta = META[event.type];
      var item = node(event.relatedLink ? "button" : "article", { class: "journey-event journey-event--" + String(event.status || "upcoming").toLowerCase(), role: "listitem" });
      if (event.relatedLink) { item.type = "button"; item.setAttribute("aria-label", event.title + ". Open related learning area."); item.addEventListener("click", function () { onNavigate(event); }); }
      item.appendChild(node("span", { class: "journey-event__marker", "aria-hidden": "true" }, [icon(meta.icon)]));
      var content = node("div", { class: "journey-event__content" }, [node("div", { class: "journey-event__meta" }, [node("span", { text: meta.label }), node("time", { text: dateText(event.timestamp), datetime: event.timestamp || "" })]), node("h3", { text: event.title })]);
      if (event.description) content.appendChild(node("p", { text: event.description }));
      content.appendChild(node("span", { class: "journey-event__status", text: String(event.status || "UPCOMING").replace(/_/g, " ") }));
      item.appendChild(content); timeline.appendChild(item);
    });
    section.appendChild(timeline); root.appendChild(section);
    if (global.refreshIcons) global.refreshIcons();
  }
  global.LearningJourney = { EVENT_TYPES: EVENT_TYPES, render: render };
})(window);
