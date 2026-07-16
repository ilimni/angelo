/* ILIMNI Weekend Treat — a self-contained reward adventure, not mission content. */
(function () {
  "use strict";

  var host = document.getElementById("weekend-app");
  var launch = document.getElementById("btn-weekend-treat");
  if (!host || !launch) return;

  var STORE = "ilimni_keyboard_detective_v1";
  var keys = ["Ctrl", "Alt", "Shift", "Windows", "Enter", "Backspace", "Spacebar", "Arrow Keys", "Home", "End"];
  var groups = {
    "Alphabet Keys": ["A", "G", "Z"], "Function Keys": ["F1", "F5"], "Modifier Keys": ["Ctrl", "Alt", "Shift"],
    "Navigation Keys": ["Home", "End", "←"], "Numeric Keypad": ["Num 7", "Num +"], "Special Keys": ["Enter", "Backspace", "Spacebar"]
  };
  var shortcuts = [
    ["You have written a brilliant paragraph and want a spare copy.", "Ctrl + C", ["Ctrl + V", "Ctrl + A", "Alt + Tab"]],
    ["Your copied paragraph needs to appear in a new document.", "Ctrl + V", ["Ctrl + C", "Windows + D", "Ctrl + A"]],
    ["You want to highlight everything in this document at once.", "Ctrl + A", ["Alt + Tab", "Ctrl + V", "Windows + D"]],
    ["Your teacher calls you to compare two open windows.", "Alt + Tab", ["Ctrl + C", "Windows + D", "Ctrl + A"]],
    ["The desktop is hiding beneath lots of open windows.", "Windows + D", ["Alt + Tab", "Ctrl + V", "Ctrl + C"]]
  ];
  var myths = [
    ["A typewriter is a computer.", false, "A typewriter writes, but it does not process information like a computer."],
    ["Modifier keys usually work together with another key.", true, "Exactly — Ctrl, Alt and Shift add a superpower to another key."],
    ["QWERTY is the only keyboard layout.", false, "There are other layouts, including AZERTY and Dvorak. QWERTY is simply the most common."],
    ["Touchpads can scroll using two fingers.", true, "Yes! Your laptop touchpad is full of handy gestures."]
  ];
  var boss = [
    ["Keyboard", "Which key begins a new line?", "Enter", ["Shift", "Home"]],
    ["Mouse", "Which device moves the pointer?", "Mouse", ["Keyboard", "Speaker"]],
    ["Desktop", "Where do you find icons and wallpaper?", "Desktop", ["Taskbar", "Recycle Bin"]],
    ["Taskbar", "Where can you see open apps near the bottom of Windows?", "Taskbar", ["Title bar", "Desktop"]],
    ["Shortcuts", "Which shortcut copies selected work?", "Ctrl + C", ["Ctrl + V", "Alt + Tab"]]
  ];
  var state = load();

  function load() { try { return Object.assign({ stage: "intro", xp: 0, stars: 0, done: false, seen: {} }, JSON.parse(localStorage.getItem(STORE) || "{}")); } catch (e) { return { stage: "intro", xp: 0, stars: 0, done: false, seen: {} }; } }
  function save() { localStorage.setItem(STORE, JSON.stringify(state)); }
  function student() { try { return (JSON.parse(localStorage.getItem("ilimni_progress_v1") || "{}").studentName || "Agent Angelo"); } catch (e) { return "Agent Angelo"; } }
  function escape(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function hideOtherScreens() { document.querySelectorAll(".screen").forEach(function (el) { el.classList.toggle("is-active", el.id === "screen-weekend"); }); document.getElementById("app-header").hidden = false; window.scrollTo({ top: 0, behavior: "smooth" }); }
  function back() { document.getElementById("screen-weekend").classList.remove("is-active"); document.getElementById("screen-missions").classList.add("is-active"); }
  function progress() { var labels = { intro: 0, keys: 1, groups: 2, shortcuts: 3, myths: 4, boss: 5, celebration: 6, certificate: 6 }; return Math.round((labels[state.stage] || 0) / 6 * 100); }
  function shell(title, eyebrow, body, controls) {
    host.innerHTML = '<div class="weekend-shell"><div class="weekend-top"><button class="btn btn--ghost btn--sm" id="weekend-back" type="button">← Missions</button><span class="weekend-score"><i class="ui-icon ui-icon--sm" data-lucide="star" aria-hidden="true"></i> ' + state.stars + ' <b>·</b> <i class="ui-icon ui-icon--sm" data-lucide="zap" aria-hidden="true"></i> ' + state.xp + ' Weekend XP</span></div><div class="weekend-progress" aria-label="Adventure progress"><i style="width:' + progress() + '%"></i></div><div class="weekend-card"><p class="weekend-eyebrow">' + eyebrow + '</p><h2 id="weekend-title">' + title + '</h2>' + body + (controls ? '<div class="weekend-controls">' + controls + '</div>' : '') + '</div></div>';
    document.getElementById("weekend-back").addEventListener("click", back);
    if (window.refreshIcons) window.refreshIcons();
  }
  function reward(message) { state.xp += 20; state.stars++; save(); var box = host.querySelector(".weekend-feedback"); if (box) { box.innerHTML = '<i class="ui-icon" data-lucide="sparkles" aria-hidden="true"></i> ' + message + ' <b>+20 XP</b>'; if (window.refreshIcons) window.refreshIcons(); } }
  function advance(stage) { state.stage = stage; save(); render(); }

  function render() {
    hideOtherScreens();
    if (state.stage === "intro") return intro();
    if (state.stage === "keys") return keyChallenge();
    if (state.stage === "groups") return groupChallenge();
    if (state.stage === "shortcuts") return shortcutChallenge(state.shortcutIndex || 0);
    if (state.stage === "myths") return mythChallenge(state.mythIndex || 0);
    if (state.stage === "boss") return bossChallenge(state.bossIndex || 0);
    if (state.stage === "celebration") return celebration();
    certificate();
  }
  function intro() {
    shell("Keyboard Detective", "Weekend Treat · 15–20 minutes", '<div class="detective-hero"><div class="detective-orb" aria-hidden="true"><i class="ui-icon" data-lucide="keyboard"></i></div><p>Principal at <b>WEB79 ICT Training Centre</b> has found clues hidden around the computer lab. Your mission, <b>' + escape(student()) + '</b>: uncover them and repair the lab computer.</p><p class="weekend-dialogue">“No scary tests here, Agent. Just sharp eyes and clever clicks.”</p><div class="weekend-route"><span>Find keys</span><span>Sort clues</span><span>Shortcut hero</span><span>Repair lab</span></div></div>', '<button class="btn btn--primary btn--lg" id="weekend-start" type="button">Accept the case →</button>');
    document.getElementById("weekend-start").onclick = function () { advance("keys"); };
  }
  function keyChallenge() {
    var remaining = keys.filter(function (k) { return !state.seen[k]; });
    if (!remaining.length) return advance("groups");
    var target = remaining[0];
    var layout = ["Esc", "F1", "F2", "Home", "End", "Backspace", "Ctrl", "Alt", "Shift", "Windows", "Enter", "Arrow Keys", "Spacebar"];
    shell("Find the keys", "Clue 1 of 5 · " + (keys.length - remaining.length + 1) + "/" + keys.length, '<p class="weekend-prompt">The next evidence tag says: <strong>find <mark>' + target + '</mark></strong>.</p><p class="weekend-feedback" role="status">The keyboard is waiting for your detective tap.</p><div class="keyboard-board" role="group" aria-label="Keyboard keys">' + layout.map(function (k) { return '<button type="button" class="keycap ' + (k === "Spacebar" ? "keycap--space" : "") + '" data-key="' + k + '">' + k + '</button>'; }).join("") + '</div>', '');
    host.querySelectorAll("[data-key]").forEach(function (btn) { btn.onclick = function () { if (btn.dataset.key !== target) { host.querySelector(".weekend-feedback").textContent = "That clue is elsewhere — inspect the keyboard again!"; return; } btn.classList.add("is-found"); state.seen[target] = true; reward("That key was hiding in plain sight!"); setTimeout(keyChallenge, 520); }; });
  }
  function groupChallenge() {
    var entries = Object.keys(groups).reduce(function (a, name) { return a.concat(groups[name].map(function (key) { return [key, name]; })); }, []);
    var current = state.groupIndex || 0;
    if (current >= entries.length) { delete state.groupIndex; save(); return advance("shortcuts"); }
    var item = entries[current];
    shell("Keyboard groups", "Clue 2 of 5 · Sort the evidence", '<p class="weekend-prompt">Drag <strong class="key-token" draggable="true" id="drag-key">' + item[0] + '</strong> to its keyboard family — or choose a family below.</p><p class="weekend-feedback" role="status">Every key belongs somewhere useful.</p><div class="group-zones">' + Object.keys(groups).map(function (name) { return '<button class="group-zone" type="button" data-group="' + name + '">' + name + '</button>'; }).join("") + '</div>', '');
    function choose(name) { if (name !== item[1]) { host.querySelector(".weekend-feedback").textContent = "Almost! Try another clue — think about what " + item[0] + " does."; return; } state.groupIndex = current + 1; reward("Excellent observation! " + item[0] + " joins " + name + "."); setTimeout(groupChallenge, 460); }
    host.querySelectorAll("[data-group]").forEach(function (zone) { zone.onclick = function () { choose(zone.dataset.group); }; zone.ondragover = function (e) { e.preventDefault(); zone.classList.add("is-dragover"); }; zone.ondragleave = function () { zone.classList.remove("is-dragover"); }; zone.ondrop = function (e) { e.preventDefault(); choose(zone.dataset.group); }; });
  }
  function shortcutChallenge(index) {
    if (index >= shortcuts.length) { delete state.shortcutIndex; save(); return advance("myths"); }
    var q = shortcuts[index], options = q.slice(1).reduce(function (a, v) { return a.concat(v); }, []);
    shell("Shortcut Hero", "Clue 3 of 5 · Scene " + (index + 1) + "/" + shortcuts.length, '<div class="scenario-card"><i class="ui-icon" data-lucide="laptop" aria-hidden="true"></i><p>' + q[0] + '</p></div><p class="weekend-feedback" role="status">Which helpful move would you use?</p><div class="choice-grid">' + options.map(function (o) { return '<button class="shortcut-choice" type="button" data-answer="' + o + '">' + o + '</button>'; }).join("") + '</div>', '');
    host.querySelectorAll("[data-answer]").forEach(function (b) { b.onclick = function () { if (b.dataset.answer !== q[1]) { host.querySelector(".weekend-feedback").textContent = "Nice idea, detective. Try a shortcut that fits this moment."; return; } b.classList.add("is-right"); state.shortcutIndex = index + 1; reward("Shortcut hero move unlocked!"); setTimeout(function () { shortcutChallenge(index + 1); }, 460); }; });
  }
  function mythChallenge(index) {
    if (index >= myths.length) { delete state.mythIndex; save(); return advance("boss"); }
    var q = myths[index];
    shell("Truth or myth?", "Clue 4 of 5 · " + (index + 1) + "/" + myths.length, '<div class="myth-card"><i class="ui-icon" data-lucide="search-check" aria-hidden="true"></i><p>“' + q[0] + '”</p></div><p class="weekend-feedback" role="status">Trust your computer detective instincts.</p><div class="truth-buttons"><button type="button" data-value="true">✓ Truth</button><button type="button" data-value="false">✕ Myth</button></div>', '');
    host.querySelectorAll("[data-value]").forEach(function (b) { b.onclick = function () { if ((b.dataset.value === "true") !== q[1]) { host.querySelector(".weekend-feedback").textContent = "The lab computer makes a silly beep. Read the clue once more!"; return; } state.mythIndex = index + 1; reward(q[2]); setTimeout(function () { mythChallenge(index + 1); }, 900); }; });
  }
  function bossChallenge(index) {
    if (index >= boss.length) { delete state.bossIndex; save(); return advance("celebration"); }
    var q = boss[index], options = [q[2]].concat(q[3]);
    shell("Repair the computer", "Boss challenge · Repair " + (index + 1) + "/5", '<div class="repair-meter" aria-label="Computer repair progress"><span style="width:' + (index / 5 * 100) + '%"></span></div><div class="repair-scene"><div class="lab-computer" aria-hidden="true"><i class="ui-icon" data-lucide="monitor-cog"></i></div><p><b>' + q[0] + '</b> is flickering. ' + q[1] + '</p></div><p class="weekend-feedback" role="status">One quick fix at a time.</p><div class="choice-grid">' + options.map(function (o) { return '<button class="shortcut-choice" type="button" data-fix="' + o + '">' + o + '</button>'; }).join("") + '</div>', '');
    host.querySelectorAll("[data-fix]").forEach(function (b) { b.onclick = function () { if (b.dataset.fix !== q[2]) { host.querySelector(".weekend-feedback").textContent = "That part still rattles. Try another repair clue!"; return; } state.bossIndex = index + 1; reward(q[0] + " repaired!"); setTimeout(function () { bossChallenge(index + 1); }, 520); }; });
  }
  function celebration() {
    state.done = true; save();
    shell("Case solved!", "The computer powers on", '<div class="celebration-burst" aria-hidden="true"><i class="ui-icon" data-lucide="sparkles"></i> <i class="ui-icon" data-lucide="monitor-check"></i> <i class="ui-icon" data-lucide="sparkles"></i></div><p class="weekend-lead">The lab computer glows back to life. Principal WEB79 salutes <b>' + escape(student()) + '</b>: you found every clue and repaired every part.</p><div class="unlock-card"><i class="ui-icon" data-lucide="award" aria-hidden="true"></i><div><b>Weekend Badge unlocked</b><small>Keyboard Detective</small></div></div><p class="weekend-dialogue">“You revised a whole week of computer skills without even noticing. That is expert detective work.”</p>', '<button class="btn btn--primary btn--lg" id="weekend-cert" type="button">Reveal my certificate →</button>');
    document.getElementById("weekend-cert").onclick = function () { advance("certificate"); };
  }
  function certificate() {
    shell("Keyboard Detective Certificate", "Weekend Treat complete", '<div class="weekend-certificate"><div aria-hidden="true"><i class="ui-icon ui-icon--xl" data-lucide="trophy"></i></div><p>This certifies that</p><h3>' + escape(student()) + '</h3><p>has solved the WEB79 computer-lab mystery and earned the title</p><h4>Keyboard Detective</h4><p class="cert-small">Weekend XP earned: ' + state.xp + ' · Issued ' + new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }) + '</p></div>', '<button class="btn btn--ghost" id="weekend-print" type="button">Print certificate</button><button class="btn btn--primary" id="weekend-return" type="button">Back to missions</button>');
    document.getElementById("weekend-print").onclick = function () { window.print(); };
    document.getElementById("weekend-return").onclick = back;
  }
  launch.addEventListener("click", function () { render(); });
  if (state.done) launch.querySelector("small").textContent = "Completed · view your Keyboard Detective badge and certificate";
})();
