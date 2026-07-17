/**
 * ILIMNI — Digital Literacy & Computing Foundations Review Experience
 * app.js — generic rendering engine driven entirely by learning/content.js
 *
 * Nothing here hardcodes a question. Every interaction type has one
 * renderer + one checker; adding a new item to missionContent (or a new
 * `type` handler here) is the only thing ever required to extend the app.
 */

(function () {
  "use strict";

  /* ============================================================
     0. DATA — pulled straight from learning/content.js (window globals)
     ============================================================ */
  var ALL_QUESTIONS = (typeof missionContent !== "undefined" ? missionContent : []);
  var GAMIFICATION = (typeof gamification !== "undefined" ? gamification : { xpPerLevel: 150, badges: [], encouragingMessages: [], confettiOnMissionComplete: true });
  var BIG_IDEAS = (typeof bigIdeas !== "undefined" ? bigIdeas : []);
  var MISSION_DETAILS = (typeof missionDetails !== "undefined" ? missionDetails : {});
  // The learning pathway extends beyond the missions currently available in
  // this experience. Journey progress must describe the curriculum, not just
  // the subset rendered on the dashboard.
  var CURRICULUM_TOTAL_MISSIONS = 18;

  var MISSIONS = Array.from(new Set(ALL_QUESTIONS.map(function (q) { return q.mission; })))
    .sort(function (a, b) { return a - b; });

  function itemsForMission(m) {
    return ALL_QUESTIONS.filter(function (q) { return q.mission === m; });
  }

  function isMissionComplete(m, candidateState) {
    var progressState = candidateState || state;
    var items = itemsForMission(m);
    return items.length > 0 && items.every(function (q) {
      return !!progressState.completedQuestions[q.id];
    });
  }

  function reconcileMissionProgress(candidateState) {
    MISSIONS.forEach(function (m) {
      var progress = candidateState.missionProgress[m];
      // A completed mission is durable. Older records may predate a content
      // change and therefore not contain every current question record; do not
      // turn those legitimate completions back into incomplete missions.
      if (progress) progress.completed = !!progress.completed || isMissionComplete(m, candidateState);
    });
  }

  /* ============================================================
     0b. RESULTS SYNC — sends results to a Google Sheet via a
     Google Apps Script Web App endpoint. See README-results-sync.md
     for setup instructions. Leave the placeholder in place to
     disable syncing (the app works fine without it).
     ============================================================ */
  var RESULTS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzoJWKqK5i-2Ye8rG4FXMCBW1eCam3HZuK2y85xUe_MZIVLUBqXXQ9mq6K7p1mZf1Q/exec";

  function resultsSyncEnabled() {
    return !!RESULTS_WEBHOOK_URL && RESULTS_WEBHOOK_URL.indexOf("PASTE_") !== 0;
  }

  function sendResultsToSheet(payload) {
    if (!resultsSyncEnabled()) return;
    if (typeof fetch !== "function") return;
    fetch(RESULTS_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      // text/plain avoids a CORS preflight against Apps Script, which
      // doesn't handle OPTIONS requests. The script parses JSON.parse
      // on the body regardless of this header.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    }).catch(function (err) {
      // Non-fatal: local progress (localStorage) is unaffected.
      console.warn("ILIMNI: could not sync results to Google Sheet.", err);
    });
  }

  /* ============================================================
     1. STORAGE
     ============================================================ */
  var STORAGE_KEY = "ilimni_progress_v1";

  function defaultState() {
    return {
      studentName: "",
      xp: 0,
      currentMission: MISSIONS[0] || 1,
      currentIndexByMission: {},   // { missionNum: index }
      completedQuestions: {},      // { id: { correct: bool|null, xp: number, skipped: bool, answer: any } }
      reflectionAnswers: {},       // { id: text }
      missionProgress: {},         // { missionNum: { started: bool, completed: bool } }
      theme: "light",
      earnedBadges: [],
      latestBigIdeaId: null,
      // Legacy ID list is retained for existing learner records. Rich unlock
      // records support the My Big Ideas collection and future metadata.
      collectedBigIdeaIds: [],
      bigIdeaUnlocks: {},
      archivedBigIdeaUnlocks: [],
      // Firebase-ready event records use LearningJourney.EVENT_TYPES.
      // Classroom systems can append events here without dashboard changes.
      learningJourneyEvents: []
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      var merged = Object.assign(defaultState(), parsed);
      merged.currentIndexByMission = parsed.currentIndexByMission || {};
      merged.completedQuestions = parsed.completedQuestions || {};
      merged.reflectionAnswers = parsed.reflectionAnswers || {};
      merged.missionProgress = parsed.missionProgress || {};
      merged.earnedBadges = parsed.earnedBadges || [];
      merged.collectedBigIdeaIds = parsed.collectedBigIdeaIds || [];
      merged.bigIdeaUnlocks = parsed.bigIdeaUnlocks || {};
      merged.archivedBigIdeaUnlocks = parsed.archivedBigIdeaUnlocks || [];
      merged.learningJourneyEvents = parsed.learningJourneyEvents || [];
      reconcileMissionProgress(merged);
      return merged;
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    syncStateToCloud();
  }

  /* ============================================================
     1b. CLOUD SYNC — mirrors state to Firestore when signed in.
     Guests (no Firebase user) stay localStorage-only. The Sheets
     webhook above is unrelated and keeps working independently.
     ============================================================ */
  var cloudSyncTimer = null;
  function syncStateToCloud() {
    if (!window.firebaseAuth || !window.firebaseDb) return;
    var user = firebaseAuth.currentUser;
    if (!user) return;
    clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(function () {
      firebaseDb.collection("students").doc(user.uid).set(state).catch(function (err) {
        console.warn("ILIMNI: could not sync progress to Firestore.", err);
      });
    }, 600);
  }

  function loadStateFromCloud(uid) {
    return firebaseDb.collection("students").doc(uid).get().then(function (doc) {
      if (doc.exists) {
        var cloud = doc.data();
        state = Object.assign(defaultState(), cloud);
        state.currentIndexByMission = cloud.currentIndexByMission || {};
        state.completedQuestions = cloud.completedQuestions || {};
        state.reflectionAnswers = cloud.reflectionAnswers || {};
        state.missionProgress = cloud.missionProgress || {};
        state.earnedBadges = cloud.earnedBadges || [];
        state.collectedBigIdeaIds = cloud.collectedBigIdeaIds || [];
        state.bigIdeaUnlocks = cloud.bigIdeaUnlocks || {};
        state.archivedBigIdeaUnlocks = cloud.archivedBigIdeaUnlocks || [];
        state.learningJourneyEvents = cloud.learningJourneyEvents || [];
        reconcileMissionProgress(state);
        var badgesMigrated = migrateCompletedMissionBadges(state);
        var ideasMigrated = archiveLegacyBigIdeas(state);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (badgesMigrated || ideasMigrated) {
          // Persist the one-time backfill immediately for signed-in learners.
          // The migration only adds missing badge ids; it never changes XP,
          // answers, certificates, or mission progress.
          firebaseDb.collection("students").doc(uid).set(state).catch(function (err) {
            console.warn("ILIMNI: could not backfill earned badges.", err);
          });
        }
      } else {
        firebaseDb.collection("students").doc(uid).set(state).catch(function (err) {
          console.warn("ILIMNI: could not create cloud progress doc.", err);
        });
      }
    });
  }

  var state = loadState();

  /* ============================================================
     2. DOM HELPERS
     ============================================================ */
  function $(sel) { return document.querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") node.addEventListener(k.slice(2), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }
  function icon(name, className) {
    return el("i", { class: "ui-icon" + (className ? " " + className : ""), "data-lucide": name, "aria-hidden": "true" });
  }
  // Shared visual wrapper for Lucide icons. It keeps glyphs consistent while
  // each surface can opt into a ring, glow, ribbon, or level marker.
  function IconContainer(iconName, options) {
    options = options || {};
    var variant = options.variant || "new";
    var container = el("span", {
      class: "icon-container icon-container--" + variant + (options.size ? " icon-container--" + options.size : "") + (options.glow ? " icon-container--glow" : "") + (options.active ? " icon-container--active" : ""),
      style: "--progress:" + (options.progress || 0) + "%",
      "aria-hidden": "true"
    }, [
      el("span", { class: "icon-container__ring" }),
      icon(iconName, "icon-container__icon")
    ]);
    if (options.completed) {
      container.appendChild(el("span", { class: "icon-container__badge" }, [icon("check", "ui-icon--sm")]));
    }
    if (options.ribbon) container.appendChild(el("span", { class: "icon-container__ribbon", text: options.ribbon }));
    if (options.level) container.appendChild(el("span", { class: "icon-container__level", text: options.level }));
    return container;
  }
  function refreshIcons() {
    if (window.refreshIcons) window.refreshIcons();
  }
  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function shuffleCopy(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var sa = a.slice().sort(), sb = b.slice().sort();
    return sa.every(function (v, i) { return v === sb[i]; });
  }
  function normalizeText(s) {
    return String(s == null ? "" : s).toLowerCase().replace(/\s+/g, "").replace(/[.]$/g, "");
  }

  /* ============================================================
     2b. BIG IDEAS — data selection shared by every experience
     ============================================================ */
  function hashText(text) {
    var hash = 0;
    for (var i = 0; i < text.length; i++) hash = ((hash << 5) - hash) + text.charCodeAt(i) | 0;
    return Math.abs(hash);
  }

  function utcDateKey() {
    var now = new Date();
    return [now.getUTCFullYear(), String(now.getUTCMonth() + 1).padStart(2, "0"), String(now.getUTCDate()).padStart(2, "0")].join("-");
  }

  function pickBigIdea(candidates, seed) {
    if (!candidates.length) return null;
    return candidates[hashText(seed) % candidates.length];
  }

  function getTodaysBigIdea() {
    return pickBigIdea(BIG_IDEAS, "today-" + utcDateKey());
  }

  function getBigIdeaForMission(missionId) {
    var detail = MISSION_DETAILS[missionId];
    if (detail && detail.bigIdeaId) return getBigIdeaById(detail.bigIdeaId);
    var missionIdeas = BIG_IDEAS.filter(function (idea) {
      return idea.missionId === missionId || (idea.relatedMissions || []).indexOf(missionId) !== -1;
    });
    // Mission associations should remain stable between visits. The unlock
    // record then preserves the selected idea and its date permanently.
    return pickBigIdea(missionIdeas.length ? missionIdeas : BIG_IDEAS, "mission-" + missionId);
  }

  function getBigIdeaById(id) {
    // `legacyId` keeps Big Ideas remembered by earlier versions resolvable.
    return BIG_IDEAS.find(function (idea) { return idea.id === id || idea.legacyId === id; }) || null;
  }

  function renderTodaysBigIdea() {
    var idea = getTodaysBigIdea();
    if (!idea) return;
    $("#today-big-idea-title").textContent = idea.title;
    $("#today-big-idea").textContent = idea.idea;
    $("#today-big-idea-explanation").textContent = idea.explanation;
  }

  function renderLatestBigIdeaCard() {
    var card = $("#latest-big-idea-card");
    var idea = getBigIdeaById(state.latestBigIdeaId);
    card.hidden = !idea;
    if (!idea) return;
    $("#latest-big-idea-heading").textContent = idea.title;
    $("#latest-big-idea").textContent = idea.idea;
    $("#latest-big-idea-explanation").textContent = idea.explanation;
    var journalStatus = $("#latest-big-idea-journal");
    var collected = isBigIdeaCollected(idea.id);
    journalStatus.textContent = collected ? "Saved in My Big Ideas" : "Choose Save to My Big Ideas when this idea is offered after a mission.";
    journalStatus.classList.toggle("is-collected", collected);
  }

  var toastTimer = null;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2400);
  }

  /* ============================================================
     3. SCREEN NAVIGATION
     ============================================================ */
  var SCREENS = ["welcome", "auth", "name", "missions", "journey", "ideas", "journal", "question", "summary", "certificate"];
  function showScreen(name) {
    SCREENS.forEach(function (s) {
      var node = $("#screen-" + s);
      if (node) node.classList.toggle("is-active", s === name);
    });
    $("#app-header").hidden = (name === "welcome" || name === "auth" || name === "name");
    var navScreen = name === "missions" || name === "question" || name === "summary" ? "missions" : name;
    $$(".primary-nav__link").forEach(function (link) {
      var active = link.getAttribute("data-nav-target") === navScreen;
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============================================================
     4. HEADER (learning navigation, progress, theme)
     ============================================================ */
  function renderHeader() {
    var xpCounter = $("#xp-counter");
    xpCounter.innerHTML = "";
    xpCounter.appendChild(IconContainer("zap", { variant: "xp", size: "compact", glow: state.xp > 0, active: state.xp > 0 }));
    xpCounter.appendChild(el("span", { id: "xp-counter-value", text: state.xp }));
    xpCounter.appendChild(document.createTextNode(" XP"));
    var studentPill = $("#student-pill");
    studentPill.innerHTML = "";
    if (state.studentName) {
      studentPill.appendChild(IconContainer("user-round", { variant: "student", size: "compact" }));
      studentPill.appendChild(document.createTextNode(state.studentName));
    }
    var signoutBtn = $("#btn-signout");
    if (signoutBtn) signoutBtn.hidden = !(window.firebaseAuth && firebaseAuth.currentUser);
    var syncBtn = $("#btn-sync-account");
    if (syncBtn) {
      var isSignedIn = !!(window.firebaseAuth && firebaseAuth.currentUser);
      syncBtn.hidden = isSignedIn || !state.studentName;
    }
    refreshIcons();
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var btn = $("#theme-toggle");
    btn.setAttribute("aria-pressed", state.theme === "dark");
    btn.innerHTML = "<i class='ui-icon' data-lucide='" + (state.theme === "dark" ? "sun" : "moon") + "' aria-hidden='true'></i>";
    refreshIcons();
  }

  $("#theme-toggle").addEventListener("click", function () {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme();
    saveState();
  });

  /* ============================================================
     5. WELCOME → NAME
     ============================================================ */
  $("#btn-start").addEventListener("click", function () {
    showScreen("auth");
  });
  $("#btn-view-journey").addEventListener("click", function () {
    renderLearningJourney();
    showScreen("journey");
  });

  var syncAccountBtn = $("#btn-sync-account");
  if (syncAccountBtn) {
    syncAccountBtn.addEventListener("click", function () {
      setAuthMode("signup");
      showScreen("auth");
    });
  }

  /* ============================================================
     5b. AUTH — sign up / log in / guest
     ============================================================ */
  var authMode = "signup";
  var authRequestInProgress = false;
  var resetRequestInProgress = false;
  var resetEmail = "";
  var passwordResetOpener = null;

  function setButtonLoading(button, loading, idleLabel, loadingLabel) {
    button.disabled = loading;
    button.textContent = loading ? loadingLabel : idleLabel;
  }

  function setAuthRequestLoading(loading, mode) {
    setButtonLoading($("#btn-auth-submit"), loading, mode === "signup" ? "Create account" : "Log in", "Preparing your learning space...");
    $("#auth-tab-signup").disabled = loading;
    $("#auth-tab-login").disabled = loading;
    $("#btn-auth-guest").disabled = loading;
    $("#btn-forgot-password").disabled = loading;
  }

  function setAuthMode(mode) {
    authMode = mode;
    $("#auth-tab-signup").classList.toggle("is-active", mode === "signup");
    $("#auth-tab-login").classList.toggle("is-active", mode === "login");
    $("#auth-title").textContent = mode === "signup" ? "Sign up" : "Log in";
    setAuthRequestLoading(false, mode);
    $("#input-password").setAttribute("autocomplete", mode === "signup" ? "new-password" : "current-password");
    $("#btn-forgot-password").hidden = mode !== "login";
    $("#auth-error").hidden = true;
  }
  $("#auth-tab-signup").addEventListener("click", function () { setAuthMode("signup"); });
  $("#auth-tab-login").addEventListener("click", function () { setAuthMode("login"); });

  function authErrorMessage(err) {
    var code = (err && err.code) || "";
    if (code === "auth/email-already-in-use") return "That email already has an account — try Log in instead.";
    if (code === "auth/weak-password") return "Choose a stronger password with at least 6 characters.";
    if (code === "auth/invalid-email") return "That email address doesn't look right.";
    if (code === "auth/wrong-password" || code === "auth/user-not-found" || code === "auth/invalid-credential") return "Email or password is incorrect.";
    if (code === "auth/too-many-requests") return "Too many attempts. Please wait a moment, then try again.";
    if (code === "auth/network-request-failed") return "We couldn't connect. Check your internet connection and try again.";
    return "Something went wrong. Please try again.";
  }

  $("#form-auth").addEventListener("submit", function (e) {
    e.preventDefault();
    if (authRequestInProgress) return;
    var email = $("#input-email").value.trim();
    var password = $("#input-password").value;
    var errEl = $("#auth-error");
    errEl.hidden = true;
    if (!window.firebaseAuth) {
      errEl.textContent = "Sign-in isn't available right now — try Continue as guest.";
      errEl.hidden = false;
      return;
    }
    authRequestInProgress = true;
    var requestMode = authMode;
    setAuthRequestLoading(true, requestMode);
    var action = requestMode === "signup"
      ? firebaseAuth.createUserWithEmailAndPassword(email, password)
      : firebaseAuth.signInWithEmailAndPassword(email, password);
    action.then(function (cred) {
      return loadStateFromCloud(cred.user.uid);
    }).then(function () {
      authRequestInProgress = false;
      setAuthRequestLoading(false, requestMode);
      applyTheme();
      renderHeader();
      if (state.studentName) goToMissionSelect();
      else showScreen("name");
    }).catch(function (err) {
      authRequestInProgress = false;
      setAuthRequestLoading(false, requestMode);
      errEl.textContent = authErrorMessage(err);
      errEl.hidden = false;
    });
  });

  function modalFocusableElements(modal) {
    return $$("button:not([disabled]), input:not([disabled])", modal).filter(function (node) {
      return !node.closest("[hidden]");
    });
  }

  function openPasswordResetModal() {
    passwordResetOpener = document.activeElement;
    resetEmail = $("#input-email").value.trim();
    $("#input-password-reset-email").value = resetEmail;
    $("#password-reset-form-wrap").hidden = false;
    $("#password-reset-success").hidden = true;
    $("#password-reset-error").hidden = true;
    $("#password-reset-modal").hidden = false;
    $("#input-password-reset-email").focus();
  }

  function closePasswordResetModal() {
    if (resetRequestInProgress) return;
    $("#password-reset-modal").hidden = true;
    if (passwordResetOpener) passwordResetOpener.focus();
  }

  function showPasswordResetSuccess() {
    $("#password-reset-form-wrap").hidden = true;
    $("#password-reset-success").hidden = false;
    $("#password-reset-success-title").focus();
  }

  function setResetControlsDisabled(disabled) {
    $("#btn-close-password-reset").disabled = disabled;
    $("#btn-send-password-reset").disabled = disabled;
    $("#btn-resend-password-reset").disabled = disabled;
    $("#btn-back-to-login").disabled = disabled;
  }

  function sendPasswordReset(button) {
    if (resetRequestInProgress) return;
    var error = $("#password-reset-error");
    resetEmail = $("#input-password-reset-email").value.trim() || resetEmail;
    error.hidden = true;
    if (!window.firebaseAuth) {
      error.textContent = "Password reset isn't available right now. Please try again later.";
      error.hidden = false;
      return;
    }
    resetRequestInProgress = true;
    button = button || $("#btn-send-password-reset");
    setResetControlsDisabled(true);
    setButtonLoading(button, true, "", "Sending email...");
    firebaseAuth.sendPasswordResetEmail(resetEmail).then(function () {
      resetRequestInProgress = false;
      setResetControlsDisabled(false);
      setButtonLoading($("#btn-send-password-reset"), false, "Send reset email", "");
      setButtonLoading($("#btn-resend-password-reset"), false, "Resend Email", "");
      showPasswordResetSuccess();
    }).catch(function (err) {
      resetRequestInProgress = false;
      setResetControlsDisabled(false);
      setButtonLoading($("#btn-send-password-reset"), false, "Send reset email", "");
      setButtonLoading($("#btn-resend-password-reset"), false, "Resend Email", "");
      error.textContent = authErrorMessage(err);
      error.hidden = false;
    });
  }

  $("#btn-toggle-password").addEventListener("click", function () {
    var input = $("#input-password");
    var showing = input.type === "text";
    input.type = showing ? "password" : "text";
    this.setAttribute("aria-pressed", String(!showing));
    this.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
  $("#btn-forgot-password").addEventListener("click", openPasswordResetModal);
  $("#btn-close-password-reset").addEventListener("click", closePasswordResetModal);
  $("#form-password-reset").addEventListener("submit", function (e) { e.preventDefault(); sendPasswordReset($("#btn-send-password-reset")); });
  $("#btn-resend-password-reset").addEventListener("click", function () { sendPasswordReset(this); });
  $("#btn-back-to-login").addEventListener("click", closePasswordResetModal);
  document.addEventListener("keydown", function (e) {
    if ($("#password-reset-modal").hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closePasswordResetModal(); return; }
    if (e.key !== "Tab") return;
    var focusable = modalFocusableElements($("#password-reset-modal"));
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  var bigIdeaModalOpener = null;
  var bigIdeaModalTimer = null;
  var activeBigIdea = null;
  var activeBigIdeaMission = null;
  function setCompletionActionsDisabled(disabled) {
    ["#btn-back-missions", "#btn-continue-next", "#btn-view-certificate"].forEach(function (selector) {
      var button = $(selector);
      if (button) button.disabled = disabled;
    });
  }

  function openBigIdeaModal(idea, missionId) {
    if (!idea) return;
    activeBigIdea = idea;
    activeBigIdeaMission = missionId || idea.missionId || null;
    bigIdeaModalOpener = document.activeElement;
    $("#big-idea-modal-title").textContent = idea.title;
    $("#big-idea-modal-idea").textContent = idea.idea;
    $("#big-idea-modal-explanation").textContent = idea.explanation;
    $("#big-idea-modal").hidden = false;
    $("#btn-continue-big-idea").focus();
  }

  function closeBigIdeaModal() {
    $("#big-idea-modal").hidden = true;
    setCompletionActionsDisabled(false);
    if (bigIdeaModalOpener && document.contains(bigIdeaModalOpener)) bigIdeaModalOpener.focus();
  }

  function missionTitle(missionId) {
    var detail = MISSION_DETAILS[missionId] || {};
    return detail.title ? "Mission " + missionId + ": " + detail.title : "Mission " + missionId;
  }

  function isBigIdeaCollected(id, candidateState) {
    var progressState = candidateState || state;
    return !!(progressState.bigIdeaUnlocks && progressState.bigIdeaUnlocks[id]) || (progressState.collectedBigIdeaIds || []).indexOf(id) !== -1;
  }

  function saveBigIdeaForMission(missionId, candidateState) {
    var progressState = candidateState || state;
    var idea = getBigIdeaForMission(missionId);
    if (!idea || isBigIdeaCollected(idea.id, progressState)) return null;
    if (!progressState.bigIdeaUnlocks || typeof progressState.bigIdeaUnlocks !== "object") progressState.bigIdeaUnlocks = {};
    progressState.bigIdeaUnlocks[idea.id] = {
      id: idea.id,
      mission: missionId,
      missionTitle: missionTitle(missionId),
      savedAt: new Date().toISOString()
    };
    if (!Array.isArray(progressState.collectedBigIdeaIds)) progressState.collectedBigIdeaIds = [];
    progressState.collectedBigIdeaIds.push(idea.id);
    return idea;
  }

  // Earlier versions filled the notebook automatically. Preserve that data in
  // the learner record, then begin the notebook at the learner's current
  // stage so every future entry is a deliberate choice.
  function archiveLegacyBigIdeas(candidateState) {
    var progressState = candidateState || state;
    if (progressState.bigIdeasResetForPersonalNotebook) return false;
    var prior = Object.keys(progressState.bigIdeaUnlocks || {}).map(function (id) { return progressState.bigIdeaUnlocks[id]; });
    (progressState.collectedBigIdeaIds || []).forEach(function (id) {
      if (!progressState.bigIdeaUnlocks || !progressState.bigIdeaUnlocks[id]) prior.push({ id: id, legacyIdOnly: true });
    });
    if (prior.length || (progressState.collectedBigIdeaIds || []).length) {
      progressState.archivedBigIdeaUnlocks = (progressState.archivedBigIdeaUnlocks || []).concat(prior);
    }
    progressState.bigIdeaUnlocks = {};
    progressState.collectedBigIdeaIds = [];
    progressState.latestBigIdeaId = null;
    progressState.bigIdeasResetForPersonalNotebook = true;
    return true;
  }

  $("#btn-continue-big-idea").addEventListener("click", closeBigIdeaModal);
  $("#btn-save-big-idea").addEventListener("click", function () {
    if (activeBigIdea && saveBigIdeaForMission(activeBigIdeaMission)) {
      state.latestBigIdeaId = activeBigIdea.id;
      saveState();
      toast("This idea is now saved in My Big Ideas.");
    }
    closeBigIdeaModal();
  });
  document.addEventListener("keydown", function (e) {
    var modal = $("#big-idea-modal");
    if (modal.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeBigIdeaModal(); return; }
    if (e.key !== "Tab") return;
    var focusable = modalFocusableElements(modal);
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  $("#btn-auth-guest").addEventListener("click", function () {
    if (state.studentName) goToMissionSelect();
    else showScreen("name");
  });

  var signoutBtnEl = document.getElementById("btn-signout");
  if (signoutBtnEl) {
    signoutBtnEl.addEventListener("click", function () {
      if (!window.firebaseAuth) return;
      firebaseAuth.signOut().then(function () {
        state = defaultState();
        localStorage.removeItem(STORAGE_KEY);
        applyTheme();
        renderHeader();
        showScreen("welcome");
        toast("Signed out");
      });
    });
  }

  $("#form-name").addEventListener("submit", function (e) {
    e.preventDefault();
    var val = $("#input-name").value.trim();
    if (!val) {
      $("#name-error").hidden = false;
      return;
    }
    $("#name-error").hidden = true;
    state.studentName = val;
    saveState();
    renderHeader();
    goToMissionSelect();
  });

  /* ============================================================
     6. MISSION SELECT
     ============================================================ */
  function missionStats(m) {
    var items = itemsForMission(m);
    var completed = items.filter(function (q) { return state.completedQuestions[q.id]; });
    var correct = items.filter(function (q) {
      var c = state.completedQuestions[q.id];
      return c && c.correct === true;
    });
    return {
      total: items.length,
      completedCount: completed.length,
      correctCount: correct.length,
      pct: items.length ? Math.round((completed.length / items.length) * 100) : 0
    };
  }

  function isMissionLocked(m) {
    return MISSIONS.some(function (earlierMission) {
      return earlierMission < m && !isMissionComplete(earlierMission);
    });
  }

  var MISSION_ICON_MAP = {
    1: "monitor", 2: "keyboard", 3: "mouse-pointer-2", 4: "accessibility",
    5: "compass", 6: "file", 7: "folder", 8: "globe-2", 9: "brain-circuit", 10: "shield-check"
  };

  function achievementIconName(label) {
    var name = String(label || "").toLowerCase();
    if (name.indexOf("curious") !== -1) return "lightbulb";
    if (name.indexOf("fast") !== -1) return "zap";
    if (name.indexOf("access") !== -1) return "accessibility";
    if (name.indexOf("problem") !== -1) return "puzzle";
    if (name.indexOf("detective") !== -1) return "search-check";
    if (name.indexOf("consistency") !== -1) return "calendar-check";
    return "award";
  }

  // Shared, icon-led empty state for learning surfaces that have no data yet.
  function createEmptyState(iconName, title, description) {
    return el("div", { class: "empty-state", role: "status" }, [
      IconContainer(iconName, { variant: "explore", size: "compact", active: true }),
      el("div", {}, [el("strong", { text: title }), el("span", { text: description })])
    ]);
  }

  function renderCertificatePreview() {
    var preview = $("#certificate-preview");
    if (!preview) return;
    var allComplete = MISSIONS.length > 0 && MISSIONS.every(function (m) { return isMissionComplete(m); });
    preview.hidden = allComplete;
  }

  /* ============================================================
     LEARNING JOURNEY — derives today’s journal from learner state while
     accepting externally supplied (Firebase/classroom) event records.
     Event contract: id, type, title, description, mission, section, status,
     timestamp, relatedLink. See learning/learning-journey.js for the fixed type list.
     ============================================================ */
  function missionName(m) {
    var detail = MISSION_DETAILS[m] || {};
    return "Mission " + m + (detail.title ? ": " + detail.title : "");
  }

  function buildLearningJourneyModel() {
    var completedMissions = MISSIONS.filter(function (m) { return isMissionComplete(m); });
    var active = MISSIONS.find(function (m) { return !isMissionComplete(m) && !isMissionLocked(m); }) || MISSIONS[MISSIONS.length - 1];
    var activeItems = itemsForMission(active);
    var nextQuestion = activeItems.find(function (q) { return !state.completedQuestions[q.id]; }) || activeItems[0];
    var events = (state.learningJourneyEvents || []).slice();
    completedMissions.forEach(function (m) {
      var answers = itemsForMission(m).map(function (q) { return state.completedQuestions[q.id]; }).filter(Boolean);
      var latest = answers.map(function (answer) { return answer.completedAt; }).filter(Boolean).sort().pop();
      events.push({ id: "mission-completed-" + m, type: "MISSION_COMPLETED", title: missionName(m) + " completed", description: "You completed the activities in this mission.", mission: m, section: (MISSION_DETAILS[m] || {}).title || "Digital Literacy & Computing Foundations", status: "COMPLETED", timestamp: latest || "", relatedLink: "mission:" + m });
    });
    collectedBigIdeas().forEach(function (entry) {
      events.push({ id: "big-idea-" + entry.idea.id, type: "BIG_IDEA_DISCOVERED", title: "Big Idea saved: " + entry.idea.title, description: entry.idea.idea, mission: entry.unlock.mission, section: "My Big Ideas", status: "SAVED", timestamp: entry.unlock.savedAt || "", relatedLink: "ideas" });
    });
    computeEarnedBadges().forEach(function (badge) {
      events.push({ id: "recognition-" + (badge.id || badge.label), type: "RECOGNITION_EARNED", title: "Recognition added: " + badge.label, description: "This recognition records completed activities.", status: "EARNED", timestamp: "", relatedLink: null });
    });
    events.push({ id: "weekend-activity", type: "WEEKEND_ACTIVITY_AVAILABLE", title: "Weekend Activity: Keyboard Practice", description: "An optional short keyboard activity.", status: "AVAILABLE", timestamp: "", relatedLink: "weekend" });
    if (completedMissions.length === MISSIONS.length && MISSIONS.length) events.push({ id: "certificate-awarded", type: "CERTIFICATE_AWARDED", title: "Course certificate ready", description: "You completed every mission in this learning pathway.", status: "AWARDED", timestamp: "", relatedLink: "certificate" });
    var milestones = [];
    if (completedMissions.length === CURRICULUM_TOTAL_MISSIONS) milestones.push({ title: "Completed the learning pathway", description: "You completed every mission in this curriculum." });
    return { progress: { section: (nextQuestion && nextQuestion.section) || "Digital Literacy & Computing Foundations", currentMission: active ? missionName(active) : "Continue your learning pathway", currentFocus: (nextQuestion && nextQuestion.title) || "New missions will be added to your pathway.", completedMissions: completedMissions.length, totalMissions: CURRICULUM_TOTAL_MISSIONS, percent: CURRICULUM_TOTAL_MISSIONS ? Math.round(completedMissions.length / CURRICULUM_TOTAL_MISSIONS * 100) : 0 }, events: events, milestones: milestones };
  }

  function navigateLearningJourneyEvent(event) {
    var link = event.relatedLink || "";
    if (link.indexOf("mission:") === 0) { startMission(Number(link.split(":")[1])); return; }
    if (link === "ideas") { renderBigIdeasPage(); showScreen("ideas"); return; }
    if (link === "weekend") { var launch = $("#btn-weekend-treat"); if (launch) launch.click(); return; }
    if (link === "certificate") { goToCertificate(); return; }
    if (link === "journal") { renderJournalPage(); showScreen("journal"); }
  }

  function renderLearningJourney() {
    if (window.LearningJourney) window.LearningJourney.render($("#learning-journey-root"), buildLearningJourneyModel(), navigateLearningJourneyEvent);
  }

  function goToMissionSelect() {
    // Progress checks are also a migration point for guests and for any older
    // local record that was loaded before a learner next signs in.
    if (migrateCompletedMissionBadges(state)) saveState();
    $("#missions-greeting").textContent = state.studentName
      ? ("Welcome back, " + state.studentName)
      : "Choose a mission";
    var list = $("#mission-list");
    list.innerHTML = "";

    if (!MISSIONS.length) {
      list.appendChild(createEmptyState("book-open", "Your learning path is being prepared", "New missions will appear here when they are ready."));
    }
    MISSIONS.forEach(function (m) {
      var stats = missionStats(m);
      var missionDetail = MISSION_DETAILS[m] || {};
      var missionTitle = "Mission " + m + (missionDetail.title ? ": " + missionDetail.title : "");
      var sections = Array.from(new Set(itemsForMission(m).map(function (q) { return q.section; })));
      var locked = isMissionLocked(m);
      var statusLabel = locked ? "Available soon" : (stats.pct === 100 ? "Completed" : (stats.pct > 0 ? "Ready to continue" : "Ready to explore"));
      var statusClass = locked ? "locked" : (stats.pct === 100 ? "done" : (stats.pct > 0 ? "progress" : "new"));
      var iconName = MISSION_ICON_MAP[m] || "book-open";
      var iconOptions = {
        variant: statusClass,
        progress: stats.pct,
        glow: statusClass === "done" || statusClass === "progress",
        active: statusClass === "progress",
        completed: statusClass === "done",
        level: String(m)
      };

      var cardAttrs = {
        class: "mission-card mission-card--" + statusClass,
        type: "button",
        style: "--mission-index:" + (m - 1),
        "aria-label": (locked ? missionTitle + " is locked" : "Open " + missionTitle) + ", " + statusLabel
      };
      if (locked) cardAttrs.disabled = "disabled";
      var card = el("button", cardAttrs, [
        el("div", { class: "mission-card__top" }, [
          IconContainer(iconName, iconOptions),
          el("div", { class: "mission-card__heading" }, [
            el("div", { class: "mission-card__title", text: missionTitle }),
            el("div", { class: "mission-card__desc", text: sections.slice(0, 3).join(" · ") + (sections.length > 3 ? "…" : "") })
          ])
        ]),
        el("div", { class: "mission-card__progress-label" }, [
          el("span", { text: "Learning progress" }),
          el("span", { text: stats.pct + "%" })
        ]),
        el("div", { class: "mission-card__bar-track" }, [
          el("div", { class: "mission-card__bar-fill", style: "width:" + stats.pct + "%" })
        ]),
        el("div", { class: "mission-card__footer" }, [
          el("span", { text: stats.completedCount + " / " + stats.total + " items" }),
          el("span", { class: "mission-card__status mission-card__status--" + statusClass, text: statusLabel })
        ])
      ]);
      if (!locked) card.addEventListener("click", function () { startMission(m); });
      list.appendChild(card);
    });

    renderBadgesCard();
    renderCertificatePreview();
    renderLatestBigIdeaCard();
    renderBigIdeasDashboardCard();
    renderLearningJourney();
    renderHeader();
    refreshIcons();
    showScreen("missions");
  }

  function collectedBigIdeas() {
    return Object.keys(state.bigIdeaUnlocks || []).map(function (id) {
      var unlock = state.bigIdeaUnlocks[id];
      var idea = getBigIdeaById(id);
      return idea && unlock ? { idea: idea, unlock: unlock } : null;
    }).filter(Boolean).sort(function (a, b) {
      return String(b.unlock.savedAt || "").localeCompare(String(a.unlock.savedAt || ""));
    });
  }

  function renderBigIdeasDashboardCard() {
    var count = collectedBigIdeas().length;
    $("#my-big-ideas-count").textContent = count ? count + " " + (count === 1 ? "Idea Collected" : "Ideas Collected") : "Your discoveries will appear here as you complete missions.";
  }

  function renderBigIdeasPage() {
    var ideas = collectedBigIdeas();
    var list = $("#big-ideas-list");
    list.innerHTML = "";
    $("#big-ideas-empty").hidden = !!ideas.length;
    ideas.forEach(function (entry, index) {
      var unlockedMission = entry.unlock.missionTitle || missionTitle(entry.idea.missionId) || "this mission";
      list.appendChild(el("article", { class: "big-ideas-collection__item", style: "--idea-index:" + index }, [
        IconContainer("lightbulb", { variant: "achievement", size: "compact", glow: true }),
        el("div", { class: "big-ideas-collection__content" }, [
          el("h3", { text: entry.idea.idea }),
          el("p", { text: entry.idea.explanation }),
          el("p", { class: "big-ideas-collection__meta", text: "Discovered during " + unlockedMission }),
          el("p", { class: "big-ideas-collection__date", text: "Added after completing " + unlockedMission })
        ])
      ]));
    });
    refreshIcons();
  }

  function renderJournalPage() {
    var list = $("#journal-list");
    var entries = Object.keys(state.reflectionAnswers || {}).map(function (id) {
      var question = ALL_QUESTIONS.find(function (q) { return q.id === id; });
      return question ? { question: question, text: state.reflectionAnswers[id], timestamp: (state.completedQuestions[id] || {}).completedAt } : null;
    }).filter(Boolean).sort(function (a, b) { return String(b.timestamp || "").localeCompare(String(a.timestamp || "")); });
    list.innerHTML = "";
    $("#journal-empty").hidden = !!entries.length;
    entries.forEach(function (entry) {
      list.appendChild(el("article", { class: "big-ideas-collection__item" }, [
        IconContainer("notebook-pen", { variant: "achievement", size: "compact" }),
        el("div", { class: "big-ideas-collection__content" }, [el("h3", { text: entry.question.title }), el("p", { text: entry.text }), el("p", { class: "big-ideas-collection__meta", text: missionName(entry.question.mission) + " · " + entry.question.section })])
      ]));
    });
    refreshIcons();
  }

  $("#btn-open-big-ideas").addEventListener("click", function () { renderBigIdeasPage(); showScreen("ideas"); });
  $("#btn-back-from-big-ideas").addEventListener("click", goToMissionSelect);
  $("#btn-back-from-journal").addEventListener("click", goToMissionSelect);
  $("#btn-open-learning-journey").addEventListener("click", function () { renderLearningJourney(); showScreen("journey"); });
  $("#btn-back-from-learning-journey").addEventListener("click", goToMissionSelect);

  function renderBadgesCard() {
    var earned = computeEarnedBadges();
    var wrap = $("#badges-card");
    var row = $("#badge-row");
    row.innerHTML = "";
    wrap.classList.toggle("card--badges-empty", !earned.length);
    if (!earned.length) {
      wrap.hidden = false;
      row.appendChild(el("div", { class: "achievement-empty" }, [
        IconContainer("map", { variant: "explore", size: "compact", active: true }),
        el("div", {}, [
          el("strong", { text: "Your achievement path is ready" }),
          el("span", { text: "Your first learning achievement will appear here after you complete a mission." })
        ])
      ]));
      return;
    }
    wrap.hidden = false;
    earned.forEach(function (b, index) {
      row.appendChild(el("span", { class: "badge-chip badge-chip--achievement", style: "--achievement-index:" + index }, [
        IconContainer(achievementIconName(b.label), { variant: "achievement", size: "compact", glow: true, completed: true }),
        el("span", { text: b.label })
      ]));
    });
  }

  function startMission(m) {
    reconcileMissionProgress(state);
    state.currentMission = m;
    if (!state.missionProgress[m]) state.missionProgress[m] = { started: true, completed: false };
    else state.missionProgress[m].started = true;
    if (state.currentIndexByMission[m] == null) state.currentIndexByMission[m] = 0;
    saveState();
    renderQuestionScreen();
  }

  /* ============================================================
     7. QUESTION SCREEN — generic dispatch
     ============================================================ */
  var currentItems = [];
  var currentIndex = 0;
  var currentQuestion = null;
  var answerState = { value: null, ready: false, locked: false };

  function renderQuestionScreen() {
    currentItems = itemsForMission(state.currentMission);
    currentIndex = state.currentIndexByMission[state.currentMission] || 0;
    if (currentIndex >= currentItems.length) currentIndex = currentItems.length - 1;
    renderHeader();
    renderQuestion();
    showScreen("question");
  }

  function renderQuestion() {
    currentQuestion = currentItems[currentIndex];
    if (!currentQuestion) { goToSummary(); return; }

    answerState = { value: null, ready: false, locked: false };

    var pct = Math.round(((currentIndex) / currentItems.length) * 100);
    $("#q-progress-bar").style.width = pct + "%";
    $("#q-progress-track").setAttribute("aria-valuenow", pct);
    $("#q-progress-text").textContent = (currentIndex + 1) + " of " + currentItems.length;
    $("#q-mission-label").textContent = "Mission " + currentQuestion.mission;
    $("#q-section-label").textContent = currentQuestion.section;
    $("#q-type-label").textContent = typeLabel(currentQuestion.type) + " · " + (currentQuestion.difficulty || "");
    $("#q-title").textContent = currentQuestion.title;
    $("#q-question").textContent = currentQuestion.question;

    // hint
    var hintWrap = $("#q-hint-wrap");
    var hintBtn = $("#btn-hint");
    var hintText = $("#hint-text");
    if (currentQuestion.hint) {
      hintWrap.hidden = false;
      hintText.hidden = true;
      hintText.textContent = currentQuestion.hint;
      hintBtn.setAttribute("aria-expanded", "false");
      hintBtn.innerHTML = "<i class='ui-icon ui-icon--sm' data-lucide='lightbulb' aria-hidden='true'></i> Show hint";
    } else {
      hintWrap.hidden = true;
    }

    $("#q-feedback").hidden = true;
    $("#q-explanation-wrap").hidden = true;

    var existing = state.completedQuestions[currentQuestion.id];
    var interactionRoot = $("#q-interaction");
    interactionRoot.innerHTML = "";

    var submitBtn = $("#btn-submit");
    var nextBtn = $("#btn-next");
    submitBtn.disabled = true; // default until the renderer reports a ready answer

    var renderer = RENDERERS[currentQuestion.type] || RENDERERS._fallback;
    renderer(currentQuestion, interactionRoot, onAnswerChange, existing);

    if (existing) {
      lockAndReveal(currentQuestion, existing.answer, existing.correct, false);
      submitBtn.hidden = true;
      nextBtn.hidden = false;
    } else {
      submitBtn.hidden = false;
      nextBtn.hidden = true;
    }

    $("#btn-prev").disabled = currentIndex === 0;
    refreshIcons();
  }

  function typeLabel(type) {
    var map = {
      mcq: "Multiple choice", "true-false": "True or False", ordering: "Ordering",
      matching: "Matching", sorting: "Sorting", reflection: "Reflection",
      scenario: "Scenario", "fill-blank": "Fill in the blank", "image-id": "Image identification",
      hotspot: "Hotspot", "drag-drop": "Drag & drop", "guess-reveal": "Guess before reveal"
    };
    return map[type] || type;
  }

  function onAnswerChange(value, ready) {
    answerState.value = value;
    answerState.ready = ready;
    $("#btn-submit").disabled = !ready || answerState.locked;
  }

  /* ---- hint toggle ---- */
  $("#btn-hint").addEventListener("click", function () {
    var t = $("#hint-text");
    var expanded = t.hidden;
    t.hidden = !expanded;
    this.setAttribute("aria-expanded", String(expanded));
    this.innerHTML = expanded
      ? "<i class='ui-icon ui-icon--sm' data-lucide='lightbulb-off' aria-hidden='true'></i> Hide hint"
      : "<i class='ui-icon ui-icon--sm' data-lucide='lightbulb' aria-hidden='true'></i> Show hint";
    refreshIcons();
  });

  /* ============================================================
     8. RENDERERS — one per interaction type
     Each renderer(question, root, onChange, existingRecord) builds DOM
     into `root` and calls onChange(value, ready) whenever the current
     answer changes. `getCurrentAnswer` is read from answerState.value.
     ============================================================ */
  var RENDERERS = {};

  // ---- shared: simple option-list (mcq, true-false, scenario, image-id, guess-reveal) ----
  function renderOptionList(q, root, onChange) {
    var list = el("div", { class: "option-list" });
    var selected = null;

    if (q.type === "image-id") {
      root.appendChild(el("div", { class: "hotspot-board", style: "margin-bottom:16px;grid-template-columns:1fr;" }, [
        el("div", { class: "hotspot-item", style: "cursor:default;" }, [
          el("div", { class: "hotspot-item__icon" }, [icon("image")]),
          el("div", { text: "Picture reference — read the question for what's shown" })
        ])
      ]));
    }

    q.options.forEach(function (opt, i) {
      var btn = el("button", { class: "option-btn", type: "button" }, [
        el("span", { class: "option-btn__marker", text: String.fromCharCode(65 + i) }),
        el("span", { text: opt })
      ]);
      btn.addEventListener("click", function () {
        selected = opt;
        $$(".option-btn", list).forEach(function (b) { b.classList.remove("is-selected"); });
        btn.classList.add("is-selected");
        onChange(selected, true);
      });
      list.appendChild(btn);
    });
    root.appendChild(list);
  }
  RENDERERS.mcq = renderOptionList;
  RENDERERS["true-false"] = renderOptionList;
  RENDERERS.scenario = renderOptionList;
  RENDERERS["image-id"] = renderOptionList;

  // ---- guess-before-reveal ----
  RENDERERS["guess-reveal"] = function (q, root, onChange) {
    var wrap = el("div", { class: "guess-wrap" });
    var list = el("div", { class: "option-list" });
    var selected = null;
    q.options.forEach(function (opt) {
      var btn = el("button", { class: "option-btn", type: "button" }, [
        el("span", { class: "option-btn__marker", text: "?" }),
        el("span", { text: opt })
      ]);
      btn.addEventListener("click", function () {
        selected = opt;
        $$(".option-btn", list).forEach(function (b) { b.classList.remove("is-selected"); });
        btn.classList.add("is-selected");
        onChange(selected, true);
      });
      list.appendChild(btn);
    });
    wrap.appendChild(list);
    wrap.appendChild(el("div", { class: "guess-reveal-box", text: "Make your guess, then hit Submit to reveal the answer." }));
    root.appendChild(wrap);
  };

  // ---- ordering (reorder via up/down + drag) ----
  RENDERERS.ordering = function (q, root, onChange) {
    var order = q.options.slice();
    var list = el("ul", { class: "order-list" });

    function draw() {
      list.innerHTML = "";
      order.forEach(function (item, idx) {
        var li = el("li", { class: "order-item", draggable: "true" }, [
          el("span", { class: "order-item__handle", "aria-hidden": "true", text: "⠿" }),
          el("span", { text: (idx + 1) + ". " + item }),
          el("div", { class: "order-item__controls" }, [
            el("button", {
              type: "button", "aria-label": "Move up", text: "↑",
              onclick: function () { if (idx > 0) { swap(idx, idx - 1); } }
            }),
            el("button", {
              type: "button", "aria-label": "Move down", text: "↓",
              onclick: function () { if (idx < order.length - 1) { swap(idx, idx + 1); } }
            })
          ])
        ]);
        li.dataset.idx = idx;
        li.addEventListener("dragstart", function () { li.classList.add("is-dragging"); li.dataset.dragIdx = idx; });
        li.addEventListener("dragend", function () { li.classList.remove("is-dragging"); });
        li.addEventListener("dragover", function (e) { e.preventDefault(); li.classList.add("is-dragover"); });
        li.addEventListener("dragleave", function () { li.classList.remove("is-dragover"); });
        li.addEventListener("drop", function (e) {
          e.preventDefault();
          li.classList.remove("is-dragover");
          var from = parseInt(list.querySelector(".is-dragging") ? list.querySelector(".is-dragging").dataset.idx : idx, 10);
          swap(from, idx);
        });
        list.appendChild(li);
      });
    }
    function swap(i, j) {
      var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
      draw();
      onChange(order.slice(), true);
    }
    draw();
    root.appendChild(list);
    root.appendChild(el("p", { class: "reflection-note", text: "Use the ↑/↓ buttons or drag to reorder, then Submit." }));
    onChange(order.slice(), true);
  };

  // ---- matching (generic 2-key option objects) ----
  RENDERERS.matching = function (q, root, onChange) {
    var keys = Object.keys(q.options[0]);
    var keyA = keys[0], keyB = keys[1];
    var pool = shuffleCopy(q.options.map(function (o) { return o[keyB]; }));
    var picks = new Array(q.options.length).fill(null);

    var grid = el("div", { class: "match-grid" });
    q.options.forEach(function (opt, idx) {
      var row = el("div", { class: "match-row" });
      row.appendChild(el("div", { class: "match-term", text: opt[keyA] }));
      var select = el("select", { class: "match-select" });
      select.appendChild(el("option", { value: "", text: "Choose a match…" }));
      pool.forEach(function (val) {
        select.appendChild(el("option", { value: val, text: val }));
      });
      select.addEventListener("change", function () {
        picks[idx] = select.value || null;
        onChange(picks.slice(), picks.every(function (p) { return !!p; }));
      });
      row.appendChild(select);
      grid.appendChild(row);
    });
    root.appendChild(grid);
    onChange(picks.slice(), false);
  };

  // ---- sorting (drag chips into named buckets) ----
  RENDERERS.sorting = function (q, root, onChange) {
    var categories = Object.keys(q.correctAnswer);
    var placement = {}; // item -> category or null

    var pool = el("div", { class: "sort-pool" });
    var bucketsWrap = el("div", { class: "sort-buckets" });
    var bucketEls = {};

    categories.forEach(function (cat) {
      var bucket = el("div", { class: "sort-bucket" }, [
        el("div", { class: "sort-bucket__label", text: cat }),
        el("div", { class: "sort-bucket__items" })
      ]);
      bucket.dataset.cat = cat;
      bucket.addEventListener("dragover", function (e) { e.preventDefault(); bucket.classList.add("is-dragover"); });
      bucket.addEventListener("dragleave", function () { bucket.classList.remove("is-dragover"); });
      bucket.addEventListener("drop", function (e) {
        e.preventDefault();
        bucket.classList.remove("is-dragover");
        var item = e.dataTransfer.getData("text/plain");
        placeItem(item, cat);
      });
      bucketEls[cat] = bucket;
      bucketsWrap.appendChild(bucket);
    });

    function makeChip(item) {
      var chip = el("span", { class: "sort-chip", draggable: "true", text: item });
      chip.addEventListener("dragstart", function (e) { e.dataTransfer.setData("text/plain", item); chip.classList.add("is-dragging"); });
      chip.addEventListener("dragend", function () { chip.classList.remove("is-dragging"); });
      chip.addEventListener("click", function () {
        // click-to-pick fallback: cycle through buckets, then back to pool
        var cur = placement[item];
        var idx = cur ? categories.indexOf(cur) : -1;
        var next = idx + 1 < categories.length ? categories[idx + 1] : null;
        placeItem(item, next);
      });
      return chip;
    }

    pool.addEventListener("dragover", function (e) { e.preventDefault(); });
    pool.addEventListener("drop", function (e) {
      e.preventDefault();
      var item = e.dataTransfer.getData("text/plain");
      placeItem(item, null);
    });

    function placeItem(item, cat) {
      placement[item] = cat;
      redraw();
      var allPlaced = q.options.every(function (i) { return !!placement[i]; });
      onChange(Object.assign({}, placement), allPlaced);
    }

    function redraw() {
      pool.innerHTML = "";
      categories.forEach(function (cat) { bucketEls[cat].querySelector(".sort-bucket__items").innerHTML = ""; });
      q.options.forEach(function (item) {
        var chip = makeChip(item);
        var cat = placement[item];
        if (cat) bucketEls[cat].querySelector(".sort-bucket__items").appendChild(chip);
        else pool.appendChild(chip);
      });
    }

    q.options.forEach(function (item) { placement[item] = null; });
    redraw();

    root.appendChild(el("p", { class: "reflection-note", style: "margin-bottom:8px;", text: "Drag each item into a bucket (or tap a chip to cycle through buckets)." }));
    root.appendChild(pool);
    root.appendChild(bucketsWrap);
    onChange({}, false);
  };

  // ---- hotspot (click-select correct subset from tiles) ----
  RENDERERS.hotspot = function (q, root, onChange) {
    var board = el("div", { class: "hotspot-board" });
    var selected = [];
    var iconMap = { Keyboard: "keyboard", Monitor: "monitor", Mouse: "mouse", Speakers: "volume-2", Speaker: "volume-2" };

    q.options.forEach(function (opt) {
      var tile = el("button", { class: "hotspot-item", type: "button" }, [
        el("div", { class: "hotspot-item__icon", "aria-hidden": "true" }, [icon(iconMap[opt] || "circle")]),
        el("div", { text: opt })
      ]);
      tile.addEventListener("click", function () {
        var i = selected.indexOf(opt);
        if (i === -1) { selected.push(opt); tile.classList.add("is-selected"); }
        else { selected.splice(i, 1); tile.classList.remove("is-selected"); }
        onChange(selected.slice(), selected.length > 0);
      });
      board.appendChild(tile);
    });
    root.appendChild(el("p", { class: "reflection-note", style: "margin-bottom:8px;", text: "Click every tile that applies — you can click more than one." }));
    root.appendChild(board);
    onChange([], false);
  };

  // ---- fill in the blank ----
  RENDERERS["fill-blank"] = function (q, root, onChange) {
    var row = el("div", { class: "blank-input-row" });
    var input = el("input", { type: "text", class: "blank-input", placeholder: "Type your answer…", autocomplete: "off" });
    input.addEventListener("input", function () {
      onChange(input.value, input.value.trim().length > 0);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !$("#btn-submit").disabled) { e.preventDefault(); $("#btn-submit").click(); }
    });
    row.appendChild(input);
    root.appendChild(row);
    onChange("", false);
  };

  // ---- drag & drop into a sentence blank ----
  RENDERERS["drag-drop"] = function (q, root, onChange) {
    var parts = q.question.split(/_{2,}/);
    var sentence = el("p", { class: "dragdrop-sentence" });
    sentence.appendChild(document.createTextNode(parts[0] || ""));
    var target = el("span", { class: "dragdrop-blank-target", text: "drop here" });
    sentence.appendChild(target);
    sentence.appendChild(document.createTextNode(parts[1] || ""));

    var filled = null;
    target.addEventListener("dragover", function (e) { e.preventDefault(); });
    target.addEventListener("drop", function (e) {
      e.preventDefault();
      place(e.dataTransfer.getData("text/plain"));
    });
    target.addEventListener("click", function () { if (filled) { place(null); } });

    var chipsWrap = el("div", { class: "dragdrop-options" });
    var chipEls = {};
    q.options.forEach(function (opt) {
      var chip = el("span", { class: "dragdrop-chip", draggable: "true", text: opt });
      chip.addEventListener("dragstart", function (e) { e.dataTransfer.setData("text/plain", opt); });
      chip.addEventListener("click", function () { place(opt); });
      chipEls[opt] = chip;
      chipsWrap.appendChild(chip);
    });

    function place(opt) {
      filled = opt;
      target.textContent = opt || "drop here";
      target.classList.toggle("is-filled", !!opt);
      Object.keys(chipEls).forEach(function (k) { chipEls[k].classList.toggle("is-used", k === opt); });
      onChange(opt, !!opt);
    }

    root.appendChild(sentence);
    root.appendChild(el("p", { class: "reflection-note", style: "margin-bottom:8px;", text: "Drag a word into the blank, or just tap one." }));
    root.appendChild(chipsWrap);
    onChange(null, false);
  };

  // ---- reflection / free text ----
  RENDERERS.reflection = function (q, root, onChange, existing) {
    var ta = el("textarea", { class: "reflection-textarea", placeholder: "Type your thoughts here — there's no wrong answer." });
    if (existing) ta.value = existing.answer || "";
    else if (state.reflectionAnswers[q.id]) ta.value = state.reflectionAnswers[q.id];
    ta.addEventListener("input", function () {
      onChange(ta.value, ta.value.trim().length > 0);
    });
    root.appendChild(ta);
    root.appendChild(el("p", { class: "reflection-note", text: "Reflections are personal — any honest answer earns full XP." }));
    onChange(ta.value, ta.value.trim().length > 0);
  };

  RENDERERS._fallback = function (q, root) {
    root.appendChild(el("p", { text: "This interaction type (" + q.type + ") isn't recognised yet, but here are the options:" }));
    renderOptionList(q, root, function () {});
  };

  /* ============================================================
     9. ANSWER CHECKING — per type
     Returns { correct: true|false|null } — null means "not graded"
     (reflection), which always earns XP for participating.
     ============================================================ */
  function checkAnswer(q, answer) {
    switch (q.type) {
      case "mcq":
      case "true-false":
      case "scenario":
      case "image-id":
      case "guess-reveal":
      case "drag-drop":
        return { correct: answer === q.correctAnswer };

      case "ordering":
        return { correct: JSON.stringify(answer) === JSON.stringify(q.correctAnswer) };

      case "fill-blank":
        return { correct: normalizeText(answer) === normalizeText(q.correctAnswer) };

      case "hotspot":
        return { correct: sameSet(answer || [], q.correctAnswer || []) };

      case "matching": {
        var keys = Object.keys(q.options[0]);
        var keyB = keys[1];
        var ok = q.options.every(function (opt, idx) { return answer[idx] === opt[keyB]; });
        return { correct: ok };
      }

      case "sorting": {
        var ok2 = true;
        Object.keys(q.correctAnswer).forEach(function (cat) {
          q.correctAnswer[cat].forEach(function (item) {
            if (answer[item] !== cat) ok2 = false;
          });
        });
        return { correct: ok2 };
      }

      case "reflection":
        return { correct: null };

      default:
        return { correct: answer === q.correctAnswer };
    }
  }

  /* ============================================================
     10. SUBMIT / LOCK / REVEAL
     ============================================================ */
  $("#btn-submit").addEventListener("click", function () {
    if (answerState.locked || !answerState.ready) return;
    var result = checkAnswer(currentQuestion, answerState.value);
    submitAnswer(currentQuestion, answerState.value, result.correct, false);
  });

  $("#btn-skip").addEventListener("click", function () {
    if (state.completedQuestions[currentQuestion.id]) { goNext(); return; }
    submitAnswer(currentQuestion, null, null, true);
  });

  function submitAnswer(q, answer, correct, skipped) {
    var xpAwarded = 0;
    if (!skipped) {
      xpAwarded = (correct === false) ? Math.round(q.xp * 0.4) : q.xp;
    }
    state.completedQuestions[q.id] = { correct: correct, xp: xpAwarded, skipped: skipped, answer: answer, completedAt: new Date().toISOString() };
    state.xp += xpAwarded;
    if (q.type === "reflection") state.reflectionAnswers[q.id] = answer;
    saveState();
    renderHeader();
    lockAndReveal(q, answer, correct, skipped, xpAwarded);
  }

  function lockAndReveal(q, answer, correct, skipped, xpAwarded) {
    answerState.locked = true;
    $$(".option-btn", $("#q-interaction")).forEach(function (b) {
      b.disabled = true;
      if (b.textContent.replace(/^[A-Z]\s*/, "").trim() === "" ) return;
    });
    // visually mark correctness where applicable
    revealCorrectness(q, answer);

    var feedback = $("#q-feedback");
    feedback.hidden = skipped;
    if (!skipped) {
      if (correct === true) {
        feedback.className = "feedback-banner feedback-banner--correct";
        feedback.innerHTML = "<i class='ui-icon' data-lucide='circle-check-big' aria-hidden='true'></i> " + escapeHtml(pickEncouragement(q, "correct"));
      } else if (correct === false) {
        feedback.className = "feedback-banner feedback-banner--incorrect";
        feedback.innerHTML = "<i class='ui-icon' data-lucide='circle-x' aria-hidden='true'></i> " + escapeHtml(pickEncouragement(q, "retry")) + " Here's why:";
      } else {
        feedback.className = "feedback-banner feedback-banner--neutral";
        feedback.innerHTML = "<i class='ui-icon' data-lucide='circle-check-big' aria-hidden='true'></i> " + escapeHtml(pickEncouragement(q, "correct"));
      }
    }

    $("#explain-text").textContent = q.explanation || "";
    var factBlock = $("#funfact-block");
    if (q.funFact) { factBlock.hidden = false; $("#funfact-text").textContent = q.funFact; } else factBlock.hidden = true;
    var worldBlock = $("#realworld-block");
    if (q.realWorldExample) { worldBlock.hidden = false; $("#realworld-text").textContent = q.realWorldExample; } else worldBlock.hidden = true;

    var xpBanner = $("#xp-earned-banner");
    if (skipped) xpBanner.textContent = "Skipped — no XP earned for this one.";
    else xpBanner.textContent = "+" + (xpAwarded != null ? xpAwarded : (state.completedQuestions[q.id] || {}).xp || 0) + " XP earned";

    $("#q-explanation-wrap").hidden = false;
    $("#btn-submit").hidden = true;
    $("#btn-next").hidden = false;
    $("#btn-skip").hidden = true;
    refreshIcons();
  }

  function revealCorrectness(q, answer) {
    var root = $("#q-interaction");
    if (["mcq", "true-false", "scenario", "image-id", "guess-reveal"].indexOf(q.type) !== -1) {
      $$(".option-btn", root).forEach(function (btn) {
        var label = btn.querySelector("span:last-child").textContent;
        if (label === q.correctAnswer) btn.classList.add("is-correct");
        else if (label === answer) btn.classList.add("is-incorrect");
      });
    } else if (q.type === "fill-blank") {
      var input = root.querySelector(".blank-input");
      if (input) {
        input.disabled = true;
        var ok = normalizeText(answer) === normalizeText(q.correctAnswer);
        input.classList.add(ok ? "is-correct" : "is-incorrect");
        if (!ok) {
          root.appendChild(el("p", { class: "reflection-note", text: "Correct answer: " + q.correctAnswer }));
        }
      }
    } else if (q.type === "drag-drop") {
      var target = root.querySelector(".dragdrop-blank-target");
      if (target) {
        var ok2 = answer === q.correctAnswer;
        target.classList.add(ok2 ? "is-correct" : "is-incorrect");
        if (!ok2) target.textContent = q.correctAnswer;
      }
      $$(".dragdrop-chip", root).forEach(function (c) { c.style.pointerEvents = "none"; });
    } else if (q.type === "ordering") {
      $$(".order-item", root).forEach(function (li, idx) {
        var text = li.querySelector("span:nth-child(2)").textContent.replace(/^\d+\.\s*/, "");
        li.classList.add(text === q.correctAnswer[idx] ? "is-correct-pos" : "is-incorrect-pos");
        $$("button", li).forEach(function (b) { b.disabled = true; });
        li.setAttribute("draggable", "false");
      });
    } else if (q.type === "hotspot") {
      $$(".hotspot-item", root).forEach(function (tile) {
        var label = tile.querySelector("div:last-child").textContent;
        var wasSelected = (answer || []).indexOf(label) !== -1;
        var shouldBe = q.correctAnswer.indexOf(label) !== -1;
        if (shouldBe && wasSelected) tile.classList.add("is-correct");
        else if (!shouldBe && wasSelected) tile.classList.add("is-incorrect");
        else if (shouldBe && !wasSelected) tile.classList.add("is-missed");
        tile.disabled = true;
      });
    } else if (q.type === "matching") {
      var keys = Object.keys(q.options[0]);
      var keyB = keys[1];
      $$(".match-select", root).forEach(function (sel, idx) {
        sel.disabled = true;
        sel.classList.add(answer[idx] === q.options[idx][keyB] ? "is-correct" : "is-incorrect");
      });
    } else if (q.type === "sorting") {
      $$(".sort-chip", root).forEach(function (chip) {
        chip.setAttribute("draggable", "false");
        chip.style.cursor = "default";
        var item = chip.textContent;
        var correctCat = Object.keys(q.correctAnswer).find(function (cat) { return q.correctAnswer[cat].indexOf(item) !== -1; });
        var placedCat = answer[item];
        chip.classList.add(placedCat === correctCat ? "is-correct" : "is-incorrect");
      });
    }
  }

  function pickEncouragement(q, outcome) {
    var messages = GAMIFICATION.encouragingMessages || [];
    // Retain support for older content files that use one flat message list.
    if (Array.isArray(messages)) {
      if (!messages.length) return outcome === "retry" ? "Keep going!" : "Correct!";
      return messages[Math.floor(Math.random() * messages.length)];
    }

    var group = messages[outcome] || {};
    var typeGroups = {
      "mcq": "selection",
      "true-false": "selection",
      "scenario": "selection",
      "image-id": "selection",
      "guess-reveal": "selection",
      "ordering": "arrangement",
      "matching": "arrangement",
      "sorting": "arrangement",
      "drag-drop": "arrangement",
      "hotspot": "arrangement",
      "fill-blank": "written",
      "reflection": "reflection"
    };
    var messagesForType = group[typeGroups[q.type]] || group.general || [];
    if (!messagesForType.length) return outcome === "retry" ? "Keep going!" : "Correct!";
    return messagesForType[Math.floor(Math.random() * messagesForType.length)];
  }

  /* ============================================================
     11. NAVIGATION — prev / next / save & exit
     ============================================================ */
  $("#btn-prev").addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      state.currentIndexByMission[state.currentMission] = currentIndex;
      saveState();
      renderQuestion();
    }
  });

  $("#btn-next").addEventListener("click", goNext);

  function goNext() {
    if (currentIndex < currentItems.length - 1) {
      currentIndex++;
      state.currentIndexByMission[state.currentMission] = currentIndex;
      saveState();
      $("#btn-skip").hidden = false;
      renderQuestion();
    } else {
      goToSummary();
    }
  }

  $("#btn-save-exit").addEventListener("click", function () {
    saveState();
    toast("Your progress is saved. You can return whenever you're ready.");
    goToMissionSelect();
  });

  /* ============================================================
     12. MISSION SUMMARY
     ============================================================ */
  function goToSummary() {
    var m = state.currentMission;
    var items = itemsForMission(m);
    if (!isMissionComplete(m)) {
      var firstIncomplete = items.findIndex(function (q) { return !state.completedQuestions[q.id]; });
      state.currentIndexByMission[m] = firstIncomplete;
      if (state.missionProgress[m]) state.missionProgress[m].completed = false;
      saveState();
      toast("Take a moment to complete each activity before finishing this mission.");
      renderQuestionScreen();
      return;
    }
    if (state.missionProgress[m]) state.missionProgress[m].completed = true;
    else state.missionProgress[m] = { started: true, completed: true };
    // Offer a teacher-approved idea, but only save it if the learner chooses
    // to remember it in their personal notebook.
    var missionBigIdea = getBigIdeaForMission(m);
    var newlyUnlockedBigIdea = !!missionBigIdea && !isBigIdeaCollected(missionBigIdea.id);
    // Award immediately for new completions; the same idempotent helper also
    // backfills historical completions when progress is loaded or checked.
    migrateCompletedMissionBadges(state);
    saveState();

    var completed = items.filter(function (q) { return state.completedQuestions[q.id] && !state.completedQuestions[q.id].skipped; });
    var correct = completed.filter(function (q) { return state.completedQuestions[q.id].correct === true || state.completedQuestions[q.id].correct === null; });
    var missionXp = items.reduce(function (sum, q) {
      var rec = state.completedQuestions[q.id];
      return sum + (rec ? rec.xp : 0);
    }, 0);
    var attempted = items.filter(function (q) { return state.completedQuestions[q.id]; });
    var completionPct = items.length ? Math.round((attempted.length / items.length) * 100) : 0;
    var accuracyPct = completed.length ? Math.round((correct.length / completed.length) * 100) : 0;

    var missionDetail = MISSION_DETAILS[m] || {};
    $("#summary-mission-title").textContent = missionDetail.completionTitle || ("You completed Mission " + m + ".");
    var insight = $("#summary-mission-insight");
    if (insight) {
      insight.textContent = missionDetail.completionInsight || "";
      insight.hidden = !missionDetail.completionInsight;
    }
    $("#summary-xp").textContent = missionXp;
    $("#summary-completion").textContent = completionPct + "%";
    $("#summary-accuracy").textContent = accuracyPct + "%";

    var reflections = items.filter(function (q) { return q.type === "reflection" && state.reflectionAnswers[q.id]; });
    var reflWrap = $("#summary-reflections-wrap");
    var reflList = $("#summary-reflections");
    reflList.innerHTML = "";
    if (reflections.length) {
      reflWrap.hidden = false;
      reflections.forEach(function (q) {
        reflList.appendChild(el("div", { class: "summary-reflection-item" }, [
          el("strong", { text: q.title }),
          el("span", { text: state.reflectionAnswers[q.id] })
        ]));
      });
    } else {
      reflWrap.hidden = true;
    }

    var isLastMission = MISSIONS.indexOf(m) === MISSIONS.length - 1;
    var allMissionsDone = MISSIONS.every(function (mm) { return state.missionProgress[mm] && state.missionProgress[mm].completed; });
    $("#btn-continue-next").hidden = !(!isLastMission);
    $("#btn-view-certificate").hidden = !(isLastMission && allMissionsDone);

    sendResultsToSheet({
      event: "mission_complete",
      studentName: state.studentName || "",
      mission: m,
      missionXp: missionXp,
      totalXp: state.xp,
      completionPct: completionPct,
      accuracyPct: accuracyPct,
      timestamp: new Date().toISOString(),
      // Per-question breakdown for THIS mission only (not the full cumulative
      // history — that was re-sending every prior mission's report on every
      // completion, needlessly bloating the payload and risking Google
      // Sheets' 50,000-character-per-cell limit as more missions get added).
      // This is what makes it possible to reconstruct progress if local/cloud
      // state is ever lost, without depending on someone clicking Export.
      report: buildExportReport(m)
    });

    if (GAMIFICATION.confettiOnMissionComplete) fireConfetti();
    renderHeader();
    showScreen("summary");
    setCompletionActionsDisabled(newlyUnlockedBigIdea);
    clearTimeout(bigIdeaModalTimer);
    // Let the completion screen's XP and achievement feedback settle before
    // presenting the lesson that the learner should carry forward.
    if (newlyUnlockedBigIdea) bigIdeaModalTimer = setTimeout(function () { openBigIdeaModal(missionBigIdea, m); }, 600);
  }

  $("#btn-back-missions").addEventListener("click", goToMissionSelect);
  $("#btn-back-missions-from-cert").addEventListener("click", goToMissionSelect);
  $("#btn-continue-next").addEventListener("click", function () {
    var idx = MISSIONS.indexOf(state.currentMission);
    var next = MISSIONS[idx + 1];
    if (next != null) startMission(next);
    else goToMissionSelect();
  });
  $("#btn-view-certificate").addEventListener("click", goToCertificate);

  function fireConfetti() {
    var host = $("#summary-confetti");
    host.innerHTML = "";
    var colors = ["#5b5bf6", "#ff8a5b", "#22b573", "#f6b93b", "#ef5673"];
    for (var i = 0; i < 40; i++) {
      var piece = el("span", { class: "confetti-piece" });
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[i % colors.length];
      piece.style.animationDuration = (1.6 + Math.random() * 1.2) + "s";
      piece.style.animationDelay = (Math.random() * 0.4) + "s";
      host.appendChild(piece);
    }
    setTimeout(function () { host.innerHTML = ""; }, 3200);
  }

  /* ============================================================
     13. BADGES — derived generically from gamification.badges
     ============================================================ */
  var STOPWORDS = ["the", "and", "items", "all", "complete", "correctly", "answer", "finish", "vs", "a", "of"];

  function computeEarnedBadges() {
    return (GAMIFICATION.badges || []).filter(function (badge) {
      return isBadgeEarned(badge, state);
    });
  }

  function hasCompletedMission(mission, candidateState) {
    var progressState = candidateState || state;
    return isMissionComplete(mission, progressState) || !!(progressState.missionProgress[mission] && progressState.missionProgress[mission].completed);
  }

  function isBadgeEarned(badge, candidateState) {
    var progressState = candidateState || state;
    var criteria = badge.criteria || "";
    var sectionMatch = criteria.match(/Complete all (.+?) section items correctly/i);
    if (sectionMatch) {
      var section = sectionMatch[1].trim();
      var items = ALL_QUESTIONS.filter(function (q) { return q.section === section; });
      if (!items.length) return false;
      return items.every(function (q) {
        var rec = progressState.completedQuestions[q.id];
        return rec && !rec.skipped && (rec.correct === true || rec.correct === null);
      });
    }
    var missionMatch = criteria.match(/Finish all Mission (\d+) items/i);
    if (missionMatch) {
      var mission = parseInt(missionMatch[1], 10);
      var mItems = itemsForMission(mission);
      if (!mItems.length) return false;
      return hasCompletedMission(mission, progressState);
    }
    // generic keyword-overlap fallback for free-form criteria
    var fragments = criteria.split(/\band\b/i).map(function (f) { return f.trim(); }).filter(Boolean);
    if (!fragments.length) return false;
    return fragments.every(function (frag) {
      var words = frag.toLowerCase().replace(/[^a-z0-9.\s]/g, " ").split(/\s+/)
        .filter(function (w) { return w.length > 2 && STOPWORDS.indexOf(w) === -1; });
      var target = ALL_QUESTIONS.map(function (q) {
        var score = words.reduce(function (s, w) { return s + (q.title.toLowerCase().indexOf(w) !== -1 ? 1 : 0); }, 0);
        return { q: q, score: score };
      }).sort(function (a, b) { return b.score - a.score; })[0];
      if (!target || target.score === 0) return true; // no matching item found — don't block on it
      var rec = progressState.completedQuestions[target.q.id];
      return rec && rec.correct === true;
    });
  }

  // Lightweight, idempotent migration. `earnedBadges` is an audit-friendly
  // record of awards, while the UI continues to derive eligibility from the
  // canonical progress data. This means adding an award cannot affect XP,
  // certificates, answers, or mission completion.
  function migrateCompletedMissionBadges(candidateState) {
    var progressState = candidateState || state;
    var awards = Array.isArray(progressState.earnedBadges) ? progressState.earnedBadges : [];
    var existingIds = awards.map(function (award) {
      return typeof award === "string" ? award : award && award.id;
    });
    var changed = !Array.isArray(progressState.earnedBadges);

    (GAMIFICATION.badges || []).forEach(function (badge) {
      // Only backfill mission awards. Other achievement types continue to be
      // evaluated live by their own criteria and are not broadened by this
      // historical-completion migration.
      var missionMatch = (badge.criteria || "").match(/Finish all Mission (\d+) items/i);
      if (missionMatch && hasCompletedMission(parseInt(missionMatch[1], 10), progressState) && existingIds.indexOf(badge.id) === -1) {
        awards.push(badge.id);
        existingIds.push(badge.id);
        changed = true;
      }
    });
    if (changed) progressState.earnedBadges = awards;
    return changed;
  }

  /* ============================================================
     14. CERTIFICATE
     ============================================================ */
  function goToCertificate() {
    $("#cert-name").textContent = state.studentName || "Student";
    $("#cert-xp").textContent = state.xp;
    var badgesWrap = $("#cert-badges");
    badgesWrap.innerHTML = "";
    computeEarnedBadges().forEach(function (b, index) {
      badgesWrap.appendChild(el("span", { class: "badge-chip badge-chip--achievement", style: "--achievement-index:" + index }, [
        IconContainer(achievementIconName(b.label), { variant: "achievement", size: "compact", glow: true, completed: true }),
        el("span", { text: b.label })
      ]));
    });
    var certificateIcon = $("#certificate-icon");
    certificateIcon.innerHTML = "";
    certificateIcon.appendChild(IconContainer("award", { variant: "certificate", glow: true, ribbon: "ILIMNI" }));
    var today = new Date();
    $("#cert-date").textContent = "Issued " + today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    showScreen("certificate");
    refreshIcons();
  }

  $("#btn-print").addEventListener("click", function () { window.print(); });
  $("#btn-restart").addEventListener("click", function () {
    if (!confirm("This clears all progress, XP, and reflections. Continue?")) return;
    localStorage.removeItem(STORAGE_KEY);
    var restartUser = window.firebaseAuth && firebaseAuth.currentUser;
    state = defaultState();
    if (restartUser && window.firebaseDb) {
      firebaseDb.collection("students").doc(restartUser.uid).set(state).catch(function () {});
    }
    applyTheme();
    renderHeader();
    showScreen("welcome");
  });

  /* ============================================================
     15b. EXPORT — human-readable report of a tester's answers
     ============================================================ */
  function formatAnswerForExport(q, answer) {
    if (answer == null) return "(no answer)";
    switch (q.type) {
      case "ordering":
        return Array.isArray(answer) ? answer.join(" → ") : String(answer);
      case "hotspot":
        return Array.isArray(answer) && answer.length ? answer.join(", ") : "(none selected)";
      case "matching": {
        var keys = Object.keys(q.options[0]);
        var keyA = keys[0];
        return q.options.map(function (opt, idx) {
          return opt[keyA] + " → " + (answer[idx] || "(unanswered)");
        }).join("; ");
      }
      case "sorting":
        return Object.keys(answer || {}).map(function (item) {
          return item + ": " + (answer[item] || "(unplaced)");
        }).join("; ");
      case "reflection":
        return String(answer);
      default:
        return String(answer);
    }
  }

  function formatCorrectAnswerForExport(q) {
    switch (q.type) {
      case "ordering":
        return q.correctAnswer.join(" → ");
      case "hotspot":
        return q.correctAnswer.join(", ");
      case "matching": {
        var keys = Object.keys(q.options[0]);
        var keyA = keys[0], keyB = keys[1];
        return q.options.map(function (opt) { return opt[keyA] + " → " + opt[keyB]; }).join("; ");
      }
      case "sorting":
        return Object.keys(q.correctAnswer).map(function (cat) {
          return cat + ": " + q.correctAnswer[cat].join(", ");
        }).join(" | ");
      default:
        return String(q.correctAnswer);
    }
  }

  function buildExportReport(missionFilter) {
    var lines = [];
    lines.push("ILIMNI — Review Results");
    lines.push("Student: " + (state.studentName || "(no name entered)"));
    lines.push("Total XP: " + state.xp);
    lines.push("Exported: " + new Date().toLocaleString());
    lines.push("");

    var missionsToInclude = missionFilter ? [missionFilter] : MISSIONS;

    missionsToInclude.forEach(function (m) {
      var stats = missionStats(m);
      lines.push("========================================");
      lines.push("MISSION " + m + " — " + stats.completedCount + "/" + stats.total + " attempted, " + stats.correctCount + " correct");
      lines.push("========================================");

      itemsForMission(m).forEach(function (q) {
        var rec = state.completedQuestions[q.id];
        lines.push("");
        lines.push("[" + q.section + "] " + q.title + " (" + typeLabel(q.type) + ")");
        lines.push("Q: " + q.question);

        if (!rec) {
          lines.push("-> Not attempted");
          return;
        }
        if (rec.skipped) {
          lines.push("-> Skipped (no XP earned)");
          return;
        }

        lines.push("Tester's answer: " + formatAnswerForExport(q, rec.answer));

        if (q.type === "reflection") {
          lines.push("Result: Reflection submitted (+" + rec.xp + " XP)");
        } else {
          lines.push("Correct answer: " + formatCorrectAnswerForExport(q));
          lines.push("Result: " + (rec.correct ? "CORRECT" : "INCORRECT") + " (+" + rec.xp + " XP)");
        }
      });
      lines.push("");
    });

    return lines.join("\n");
  }

  $("#btn-export").addEventListener("click", function () {
    var report = buildExportReport();
    var blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var namePart = (state.studentName || "ilimni").trim().replace(/\s+/g, "_").replace(/[^\w-]/g, "");
    var a = el("a", { href: url, download: namePart + "_results.txt" });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    sendResultsToSheet({
      event: "export",
      studentName: state.studentName || "",
      totalXp: state.xp,
      report: report,
      timestamp: new Date().toISOString()
    });

    toast(resultsSyncEnabled() ? "Results exported & saved" : "Results exported");
  });

  /* ============================================================
     15. INIT
     ============================================================ */
  function init() {
    $$(".primary-nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        var target = link.getAttribute("data-nav-target");
        if (target === "dashboard" || target === "missions") { goToMissionSelect(); return; }
        if (target === "journey") { renderLearningJourney(); showScreen("journey"); return; }
        if (target === "ideas") { renderBigIdeasPage(); showScreen("ideas"); return; }
        if (target === "weekend") { $("#btn-weekend-treat").click(); return; }
        if (target === "achievements") {
          goToMissionSelect();
          setTimeout(function () { var badges = $("#badges-card"); if (badges && !badges.hidden) badges.scrollIntoView({ behavior: "smooth", block: "center" }); else toast("Your learning achievements will appear here as you complete missions."); }, 0);
          return;
        }
        if (target === "certificates") {
          var complete = MISSIONS.length > 0 && MISSIONS.every(function (m) { return isMissionComplete(m); });
          if (complete) goToCertificate();
          else { goToMissionSelect(); toast("Your certificate will be ready after you complete each mission."); }
        }
      });
    });
    // Backfill locally stored completions before the learner sees progress.
    // Signed-in records receive the same check in loadStateFromCloud.
    if (migrateCompletedMissionBadges(state)) {
      // Do not queue a cloud write before Firebase has finished loading the
      // signed-in learner's authoritative record.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    if (archiveLegacyBigIdeas(state)) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    applyTheme();
    renderTodaysBigIdea();
    renderHeader();
    if (window.firebaseAuth) {
      firebaseAuth.onAuthStateChanged(function (user) {
        if (user) {
          loadStateFromCloud(user.uid).then(function () {
            renderHeader();
            if (state.studentName) goToMissionSelect();
            else showScreen("name");
          });
        } else {
          renderHeader();
          if (state.studentName) goToMissionSelect();
          else showScreen("welcome");
        }
      });
    } else if (state.studentName) {
      goToMissionSelect();
    } else {
      showScreen("welcome");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
