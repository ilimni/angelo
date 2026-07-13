/**
 * ILIMNI — Computer Appreciation Review Experience
 * app.js — generic rendering engine driven entirely by content.js
 *
 * Nothing here hardcodes a question. Every interaction type has one
 * renderer + one checker; adding a new item to missionContent (or a new
 * `type` handler here) is the only thing ever required to extend the app.
 */

(function () {
  "use strict";

  /* ============================================================
     0. DATA — pulled straight from content.js (window globals)
     ============================================================ */
  var ALL_QUESTIONS = (typeof missionContent !== "undefined" ? missionContent : []);
  var GAMIFICATION = (typeof gamification !== "undefined" ? gamification : { xpPerLevel: 150, badges: [], encouragingMessages: [], confettiOnMissionComplete: true });

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
      if (progress) progress.completed = isMissionComplete(m, candidateState);
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
      earnedBadges: []
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
        reconcileMissionProgress(state);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  var SCREENS = ["welcome", "auth", "name", "missions", "question", "summary", "certificate"];
  function showScreen(name) {
    SCREENS.forEach(function (s) {
      var node = $("#screen-" + s);
      if (node) node.classList.toggle("is-active", s === name);
    });
    $("#app-header").hidden = (name === "welcome" || name === "auth" || name === "name");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============================================================
     4. HEADER (xp, student pill, mission tabs, theme)
     ============================================================ */
  function renderHeader() {
    $("#xp-counter-value").textContent = state.xp;
    $("#student-pill").textContent = state.studentName ? ("👤 " + state.studentName) : "";
    var signoutBtn = $("#btn-signout");
    if (signoutBtn) signoutBtn.hidden = !(window.firebaseAuth && firebaseAuth.currentUser);
    var syncBtn = $("#btn-sync-account");
    if (syncBtn) {
      var isSignedIn = !!(window.firebaseAuth && firebaseAuth.currentUser);
      syncBtn.hidden = isSignedIn || !state.studentName;
    }
    var tabs = $("#mission-tabs");
    tabs.innerHTML = "";
    MISSIONS.forEach(function (m) {
      var btn = el("button", {
        class: "mission-tab" + (state.currentMission === m ? " is-active" : ""),
        type: "button",
        text: "Mission " + m,
        onclick: function () { goToMissionSelect(); }
      });
      tabs.appendChild(btn);
    });
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var btn = $("#theme-toggle");
    btn.setAttribute("aria-pressed", state.theme === "dark");
    btn.innerHTML = state.theme === "dark" ? "<span aria-hidden='true'>☀️</span>" : "<span aria-hidden='true'>🌙</span>";
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
  $("#btn-welcome-signin").addEventListener("click", function () {
    setAuthMode("login");
    showScreen("auth");
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
    setButtonLoading($("#btn-auth-submit"), loading, mode === "signup" ? "Create account" : "Log in", mode === "signup" ? "Creating account..." : "Signing in...");
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

  function modalFocusableElements() {
    return $$("button:not([disabled]), input:not([disabled])", $("#password-reset-modal")).filter(function (node) {
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
    var focusable = modalFocusableElements();
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

  function goToMissionSelect() {
    $("#missions-greeting").textContent = state.studentName
      ? ("Welcome back, " + state.studentName + " 👋")
      : "Choose a mission";
    var list = $("#mission-list");
    list.innerHTML = "";

    MISSIONS.forEach(function (m) {
      var stats = missionStats(m);
      var sections = Array.from(new Set(itemsForMission(m).map(function (q) { return q.section; })));
      var statusLabel = stats.pct === 100 ? "Completed" : (stats.pct > 0 ? "In progress" : "Not started");
      var statusClass = stats.pct === 100 ? "done" : (stats.pct > 0 ? "progress" : "new");

      var card = el("div", { class: "mission-card", tabindex: "0", role: "button", "aria-label": "Open Mission " + m }, [
        el("div", { class: "mission-card__icon", "aria-hidden": "true" }, [document.createTextNode(m === 1 ? "🧠" : "🗂️")]),
        el("div", { class: "mission-card__title", text: "Mission " + m }),
        el("div", { class: "mission-card__desc", text: sections.slice(0, 3).join(" · ") + (sections.length > 3 ? "…" : "") }),
        el("div", { class: "mission-card__bar-track" }, [
          el("div", { class: "mission-card__bar-fill", style: "width:" + stats.pct + "%" })
        ]),
        el("div", { class: "mission-card__footer" }, [
          el("span", { text: stats.completedCount + " / " + stats.total + " items" }),
          el("span", { class: "mission-card__status mission-card__status--" + statusClass, text: statusLabel })
        ])
      ]);
      card.addEventListener("click", function () { startMission(m); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); startMission(m); } });
      list.appendChild(card);
    });

    renderBadgesCard();
    renderHeader();
    showScreen("missions");
  }

  function renderBadgesCard() {
    var earned = computeEarnedBadges();
    var wrap = $("#badges-card");
    var row = $("#badge-row");
    row.innerHTML = "";
    if (!earned.length) { wrap.hidden = true; return; }
    wrap.hidden = false;
    earned.forEach(function (b) {
      row.appendChild(el("span", { class: "badge-chip" }, [
        document.createTextNode("🏅 " + b.label)
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
      hintBtn.innerHTML = "<span aria-hidden='true'>💭</span> Show hint";
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
      ? "<span aria-hidden='true'>💭</span> Hide hint"
      : "<span aria-hidden='true'>💭</span> Show hint";
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
          el("div", { class: "hotspot-item__icon", text: "🖼️" }),
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
    var iconMap = { Keyboard: "⌨️", Monitor: "🖥️", Mouse: "🖱️", Speakers: "🔊", Speaker: "🔊" };

    q.options.forEach(function (opt) {
      var tile = el("button", { class: "hotspot-item", type: "button" }, [
        el("div", { class: "hotspot-item__icon", "aria-hidden": "true", text: iconMap[opt] || "🔹" }),
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
    state.completedQuestions[q.id] = { correct: correct, xp: xpAwarded, skipped: skipped, answer: answer };
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
        feedback.textContent = "✅ " + pickEncouragement(true);
      } else if (correct === false) {
        feedback.className = "feedback-banner feedback-banner--incorrect";
        feedback.textContent = "❌ Not quite — here's why:";
      } else {
        feedback.className = "feedback-banner feedback-banner--neutral";
        feedback.textContent = "✅ Thanks for reflecting!";
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

  function pickEncouragement(correct) {
    var msgs = GAMIFICATION.encouragingMessages || [];
    if (!msgs.length) return correct ? "Correct!" : "Keep going!";
    return msgs[Math.floor(Math.random() * msgs.length)];
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
    toast("Progress saved");
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
      toast("Complete every item before finishing this mission.");
      renderQuestionScreen();
      return;
    }
    if (state.missionProgress[m]) state.missionProgress[m].completed = true;
    else state.missionProgress[m] = { started: true, completed: true };
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

    $("#summary-mission-title").textContent = "Mission " + m + " Complete!";
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
    return (GAMIFICATION.badges || []).filter(isBadgeEarned);
  }

  function isBadgeEarned(badge) {
    var criteria = badge.criteria || "";
    var sectionMatch = criteria.match(/Complete all (.+?) section items correctly/i);
    if (sectionMatch) {
      var section = sectionMatch[1].trim();
      var items = ALL_QUESTIONS.filter(function (q) { return q.section === section; });
      if (!items.length) return false;
      return items.every(function (q) {
        var rec = state.completedQuestions[q.id];
        return rec && !rec.skipped && (rec.correct === true || rec.correct === null);
      });
    }
    var missionMatch = criteria.match(/Finish all Mission (\d+) items/i);
    if (missionMatch) {
      var mission = parseInt(missionMatch[1], 10);
      var mItems = itemsForMission(mission);
      if (!mItems.length) return false;
      return mItems.every(function (q) { return !!state.completedQuestions[q.id]; });
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
      var rec = state.completedQuestions[target.q.id];
      return rec && rec.correct === true;
    });
  }

  /* ============================================================
     14. CERTIFICATE
     ============================================================ */
  function goToCertificate() {
    $("#cert-name").textContent = state.studentName || "Student";
    $("#cert-xp").textContent = state.xp;
    var badgesWrap = $("#cert-badges");
    badgesWrap.innerHTML = "";
    computeEarnedBadges().forEach(function (b) {
      badgesWrap.appendChild(el("span", { class: "badge-chip", text: "🏅 " + b.label }));
    });
    var today = new Date();
    $("#cert-date").textContent = "Issued " + today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    showScreen("certificate");
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
    applyTheme();
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
