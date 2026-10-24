/* "Suggest a form": post Pokémon form ideas and vote on them.
   Ideas and votes live in Counselor Bidoof's API (forms.py in the bot repo), served at
   api.campcobblemon.net. There's no login: a vote is one per browser, kept as a random token. */
(function () {
  var UI = window.CCUI, C = window.CC || {};
  var list = document.getElementById("ideas");
  if (!list || !UI) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = UI.esc, icon = UI.icon;
  var API = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? "http://127.0.0.1:8095" : "https://api.campcobblemon.net";

  var TYPE = {
    Normal: "#A8A77A", Fire: "#EE8130", Water: "#6390F0", Electric: "#F7D02C", Grass: "#7AC74C", Ice: "#96D9D6",
    Fighting: "#C22E28", Poison: "#A33EA1", Ground: "#E2BF65", Flying: "#A98FF3", Psychic: "#F95587", Bug: "#A6B91A",
    Rock: "#B6A136", Ghost: "#735797", Dragon: "#6F35FC", Dark: "#705746", Steel: "#B7B7CE", Fairy: "#D685AD"
  };
  var TYPES = Object.keys(TYPE);
  var STAT = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
  var KIND = {
    campian: { label: "Campian form", base: "Pokémon to give a Campian form", rel: "Campian form of", how: "Where it lives",
               hint: "A new look and typing for an existing Pokémon, adapted to the land around camp." },
    mega: { label: "Mega form", base: "Mega Evolution of", rel: "Mega Evolution of", how: "Mega Stone",
            hint: "A Mega Evolution for a fully evolved Pokémon. Megas usually get 100 more base stat points (HP stays the same) and one ability." },
    evo: { label: "New evolution", base: "Evolves from", rel: "Evolves from", how: "How it evolves",
           hint: "A brand-new Pokémon that a fully evolved one turns into." },
    preevo: { label: "New pre-evolution", base: "Evolves into", rel: "Evolves into", how: "How it evolves",
              hint: "A brand-new baby or first stage that evolves into an existing Pokémon." },
    fakemon: { label: "Fakemon", base: "", rel: "", how: "Where it lives",
               hint: "A completely new Pokémon of your own design." }
  };

  // ---- species: everything in Cobblemon (species.js) plus our own custom Pokémon ----
  var species = (window.CC_SPECIES || []).map(function (s) {
    return { name: s[0], dex: s[1], types: s[2], stats: s[3], into: s[4], from: s[5], abilities: s[6], special: s[7] === "L" };
  });
  (C.pokemon || []).forEach(function (m) {
    if (m.group === "bidoof") return;
    var abilities = (m.ability || "").replace(/\(hidden:\s*/, "/ ").replace(/\)/, "").split("/").map(function (a) { return a.trim(); }).filter(Boolean);
    species.push({ name: m.name, dex: 0, types: m.types, stats: m.stats, into: [], from: "", abilities: abilities, special: false, custom: true, row: m.row });
  });
  var byName = {};
  species.forEach(function (s) { byName[s.name.toLowerCase()] = s; });
  var abilityNames = {};
  species.forEach(function (s) { s.abilities.forEach(function (a) { abilityNames[a] = 1; }); });
  $("#species-list").innerHTML = species.map(function (s) { return '<option value="' + esc(s.name) + '">'; }).join("");
  $("#ability-list").innerHTML = Object.keys(abilityNames).sort().map(function (a) { return '<option value="' + esc(a) + '">'; }).join("");

  function total(stats) { return stats.reduce(function (a, b) { return a + b; }, 0); }
  function ink(hex) {
    var rgb = [1, 3, 5].map(function (i) {
      var c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    var l = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? "#000000" : "#ffffff";
  }
  function typeBadge(t) { var c = TYPE[t] || "#888888"; return '<span class="type" style="background:' + c + ';color:' + ink(c) + '">' + esc(t) + '</span>'; }
  function kindTag(kind) { return '<span class="tag kind-tag kind-' + kind + '">' + KIND[kind].label + '</span>'; }
  function modelTag(idea) { return idea.model ? '<span class="tag model-tag">3D model</span>' : ''; }
  function mb(bytes) { return (bytes / 1048576).toFixed(bytes < 1048576 ? 2 : 1) + " MB"; }
  function ago(iso) {
    var mins = Math.max(0, (Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return Math.floor(mins) + " min ago";
    if (mins < 1440) { var h = Math.floor(mins / 60); return h + (h === 1 ? " hour ago" : " hours ago"); }
    var d = Math.floor(mins / 1440);
    return d < 30 ? d + (d === 1 ? " day ago" : " days ago") : UI.fmtDate(iso, { month: "short", day: "numeric", year: "numeric" });
  }

  // ---- the browser's voting token ----
  var voter = "";
  try {
    voter = localStorage.getItem("camp-voter") || "";
    if (!/^[A-Za-z0-9-]{16,64}$/.test(voter)) {
      voter = window.crypto && crypto.randomUUID ? crypto.randomUUID() :
        Array.prototype.map.call(crypto.getRandomValues(new Uint8Array(16)), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
      localStorage.setItem("camp-voter", voter);
    }
  } catch (e) { voter = ""; /* storage blocked: browsing works, voting says why it can't */ }

  function api(path, opts) {
    return fetch(API + path, opts).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (body) {
        if (!r.ok) throw new Error(body.error || "Something went wrong (" + r.status + ").");
        return body;
      });
    });
  }

  // ---- idea cards (also used for the live preview) ----
  var PREFIX = { campian: "Campian ", mega: "Mega " };
  function relLine(idea) {
    if (idea.kind === "fakemon") return "Original Pokémon";
    return idea.base ? KIND[idea.kind].rel + " " + idea.base : "";
  }
  function statsLine(idea) {
    if (!idea.stats.length) return "";
    var base = idea.kind !== "fakemon" && byName[(idea.base || "").toLowerCase()], t = total(idea.stats);
    if (!base) return '<div class="how">Stat total ' + t + '</div>';
    var diff = t - total(base.stats);
    return '<div class="how">Stat total ' + t + ' <span class="faint">(' + (diff >= 0 ? "+" : "") + diff + " vs " + esc(base.name) + ")</span></div>";
  }
  function excerpt(text, n) { text = (text || "").replace(/\s+/g, " ").trim(); return text.length > n ? text.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : text; }
  function artHtml(idea, preview) {
    var first = idea.art && idea.art[0];
    if (first) return '<div class="art idea-art"><img src="' + esc(preview ? first : first.thumb) + '" alt="Concept art for ' + esc(idea.name) + '" loading="lazy"></div>';
    var base = byName[(idea.base || "").toLowerCase()];
    if (base && base.row) return '<div class="art idea-art no-art"><img src="assets/pokemon/r' + base.row + '.png" alt=""><span>No art yet</span></div>';
    return '<div class="art idea-art no-art">' + icon("sparkle") + '<span>No art yet</span></div>';
  }
  function card(idea, preview) {
    var voteBtn = preview ? '' :
      '<button class="pill small vote' + (idea.voted ? ' active' : '') + '" type="button" data-vote="' + idea.id + '" aria-pressed="' + !!idea.voted + '" aria-label="' +
      (idea.voted ? "Remove your vote for " : "Vote for ") + esc(idea.name) + ", " + idea.votes + (idea.votes === 1 ? " vote" : " votes") + '">' +
      icon("arrow-up") + '<span class="vote-count">' + idea.votes + '</span></button>';
    return '<article class="card mon idea"' + (preview ? '' : ' id="idea-' + idea.id + '"') + '>' +
      artHtml(idea, preview) +
      '<div><div class="idea-tags">' + kindTag(idea.kind) + modelTag(idea) + '</div><h3>' + esc(idea.name || "Unnamed") + '</h3><div class="sub">' + esc(relLine(idea)) + '</div></div>' +
      '<div class="types">' + idea.types.map(typeBadge).join("") + '</div>' +
      (idea.notes ? '<p class="idea-pitch">' + esc(excerpt(idea.notes, 150)) + '</p>' : '') +
      statsLine(idea) +
      (idea.abilities.filter(Boolean).length ? '<div class="ability"><span class="lbl">Ability</span>' + esc(idea.abilities.slice(0, 2).filter(Boolean).join(" / ")) + '</div>' : '') +
      '<dl><dt>By</dt><dd>' + esc(idea.designer || "Anonymous") + '</dd>' +
      (preview ? '' : '<dt>Posted</dt><dd class="mono">' + esc(ago(idea.created)) + '</dd>') + '</dl>' +
      (preview ? '' : '<div class="card-actions"><button class="pill small" type="button" data-idea="' + idea.id + '">' + icon("book") + 'Details</button>' + voteBtn + '</div>') +
      '</article>';
  }
  function statBars(stats, base) {
    return '<div class="stats">' + stats.map(function (v, i) {
      var d = base ? v - base.stats[i] : 0;
      return '<span>' + STAT[i] + '</span><span class="bar"><i style="width:' + Math.min(100, v / 160 * 100) + '%"></i></span><b>' + v +
        (base && d ? '<em class="' + (d > 0 ? "up" : "down") + '">' + (d > 0 ? "+" : "") + d + '</em>' : '') + '</b>';
    }).join("") + '<span>Total</span><span></span><b>' + total(stats) + '</b></div>';
  }
  function detail(idea) {
    var base = idea.kind !== "fakemon" && byName[(idea.base || "").toLowerCase()] || null;
    var ab = idea.abilities;
    var abilities = [ab[0], ab[1]].filter(Boolean).join(" / ") + (ab[2] ? " (hidden: " + ab[2] + ")" : "");
    var arts = idea.art.length ? idea.art.map(function (a, i) {
      return '<a class="idea-full" href="' + esc(a.full) + '" target="_blank" rel="noopener"><img src="' + esc(a.full) + '" alt="Concept art ' + (i + 1) + ' for ' + esc(idea.name) + '"></a>';
    }).join("") : artHtml(idea);
    return '<div class="detail idea-detail">' +
      '<div class="arts">' + arts + '</div>' +
      '<div class="info">' +
        '<div>' + kindTag(idea.kind) + modelTag(idea) + '</div>' +
        '<h2>' + esc(idea.name) + '</h2>' +
        '<div class="sub">' + esc(relLine(idea)) + '</div>' +
        '<div class="types">' + idea.types.map(typeBadge).join("") + '</div>' +
        (idea.flavor ? '<p class="idea-flavor">' + esc(idea.flavor).replace(/\n/g, "<br>") + '</p>' : '') +
        '<div class="row"><span class="lbl">The idea</span>' + esc(idea.notes).replace(/\n/g, "<br>") + '</div>' +
        (idea.stats.length ? '<div class="row"><span class="lbl">Base stats' + (base ? ' (compared with ' + esc(base.name) + ')' : '') + '</span>' + statBars(idea.stats, base) + '</div>' : '') +
        (abilities ? '<div class="row"><span class="lbl">Abilities</span>' + esc(abilities) + '</div>' : '') +
        (idea.how ? '<div class="row"><span class="lbl">' + KIND[idea.kind].how + '</span>' + esc(idea.how) + '</div>' : '') +
        (idea.model ? '<div class="row"><span class="lbl">3D model</span><a href="' + esc(idea.model.url) + '" download>' + icon("download") +
          esc(idea.model.name) + '</a> <span class="faint mono">' + mb(idea.model.size) + '</span></div>' : '') +
        '<div class="row"><span class="lbl">Suggested by</span>' + esc(idea.designer) + ' <span class="faint">· ' + esc(ago(idea.created)) + '</span></div>' +
        '<div class="actions">' +
          '<button class="pill vote' + (idea.voted ? ' active' : '') + '" type="button" data-vote="' + idea.id + '" aria-pressed="' + !!idea.voted + '">' +
          icon("arrow-up") + (idea.voted ? "Voted" : "Vote") + ' · <span class="vote-count">' + idea.votes + '</span></button> ' +
          '<button class="pill" type="button" data-copy-link="' + idea.id + '">' + icon("copy") + 'Copy link</button>' +
        '</div>' +
      '</div></div>';
  }

  // ---- the list ----
  var sort = "top", kindFilter = "", ideas = [], more = false, loading = false;
  var status = $("#ideas-status"), moreBtn = $("#ideas-more");
  function render() {
    list.innerHTML = ideas.length ? ideas.map(function (i) { return card(i); }).join("") :
      loading ? "" : '<div class="empty dex-empty"><h3>No ideas here yet</h3><p>Be the first: suggest a form below, or roll a random one to get started.</p>' +
      '<a class="pill" href="#suggest">' + icon("apply") + 'Suggest a form</a></div>';
    moreBtn.hidden = !more;
  }
  function load(reset) {
    if (loading) return;
    loading = true;
    if (reset) { ideas = []; status.textContent = "Loading ideas..."; render(); }
    var q = "?sort=" + sort + "&kind=" + kindFilter + "&offset=" + ideas.length + "&limit=24" + (voter ? "&voter=" + voter : "");
    api("/forms" + q).then(function (res) {
      ideas = ideas.concat(res.ideas);
      more = res.more;
      status.textContent = res.total ? res.total + (res.total === 1 ? " idea" : " ideas") + (kindFilter ? " of this kind" : "") : "";
      if (!kindFilter) $("[data-idea-count]").textContent = res.total;
    }).catch(function () {
      status.textContent = "Couldn't load ideas right now. Try again in a minute.";
    }).then(function () { loading = false; render(); });
  }
  $$("[data-sort]").forEach(function (b) {
    b.addEventListener("click", function () {
      sort = b.getAttribute("data-sort");
      $$("[data-sort]").forEach(function (x) { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
      load(true);
    });
  });
  $$("[data-kind]").forEach(function (b) {
    b.addEventListener("click", function () {
      kindFilter = b.getAttribute("data-kind");
      $$("[data-kind]").forEach(function (x) { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
      load(true);
    });
  });
  moreBtn.addEventListener("click", function () { load(false); });

  // ---- votes, details and links (one handler for the list and the dialog) ----
  var modal = $("#idea-modal"), openIdea = null;
  function findIdea(id) { return ideas.filter(function (i) { return i.id === id; })[0] || (openIdea && openIdea.id === id ? openIdea : null); }
  function showIdea(idea) {
    openIdea = idea;
    UI.openModal(modal, detail(idea));
    if (location.hash !== "#idea-" + idea.id) history.replaceState(null, "", "#idea-" + idea.id);
  }
  function syncVote(idea) {
    [list, modal].forEach(function (scope) {
      $$('[data-vote="' + idea.id + '"]', scope).forEach(function (b) {
        b.classList.toggle("active", idea.voted);
        b.setAttribute("aria-pressed", idea.voted);
        $(".vote-count", b).textContent = idea.votes;
        if (scope === modal) b.childNodes[1].nodeValue = (idea.voted ? "Voted" : "Vote") + " · ";
        else b.setAttribute("aria-label", (idea.voted ? "Remove your vote for " : "Vote for ") + idea.name + ", " + idea.votes + (idea.votes === 1 ? " vote" : " votes"));
      });
    });
  }
  document.addEventListener("click", function (e) {
    var v = e.target.closest("[data-vote]"), d = e.target.closest("[data-idea]"), c = e.target.closest("[data-copy-link]");
    if (v) {
      var idea = findIdea(+v.getAttribute("data-vote"));
      if (!idea) return;
      if (!voter) { status.textContent = "Your browser is blocking storage, so votes can't be saved here."; return; }
      var want = !idea.voted;
      idea.voted = want; idea.votes += want ? 1 : -1; syncVote(idea);  // optimistic
      api("/forms/" + idea.id + "/vote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ voter: voter, vote: want }) })
        .then(function (res) { idea.votes = res.votes; idea.voted = res.voted; syncVote(idea); })
        .catch(function (err) {
          idea.voted = !want; idea.votes += want ? -1 : 1; syncVote(idea);
          status.textContent = err.message;
        });
    } else if (d) {
      var found = findIdea(+d.getAttribute("data-idea"));
      if (found) showIdea(found);
    } else if (c) {
      var url = location.origin + location.pathname + "#idea-" + c.getAttribute("data-copy-link");
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
        c.lastChild.nodeValue = "Link copied";
      }).catch(function () { window.prompt("Copy this link:", url); });
    }
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal || e.target.closest(".modal-close")) {
      openIdea = null;
      if (/^#idea-\d+$/.test(location.hash)) history.replaceState(null, "", location.pathname);
    }
  });
  function openFromHash() {
    var m = /^#idea-(\d+)$/.exec(location.hash);
    if (!m) return;
    api("/forms/" + m[1] + (voter ? "?voter=" + voter : "")).then(showIdea).catch(function () {
      status.textContent = "That idea isn't available anymore.";
    });
  }
  window.addEventListener("hashchange", openFromHash);

  // ---- the form ----
  var form = $("#suggest-form"), formStatus = $("#form-status");
  var f = {
    base: $("#f-base"), name: $("#f-name"), type1: $("#f-type1"), type2: $("#f-type2"),
    ab: [$("#f-ab1"), $("#f-ab2"), $("#f-ab3")], how: $("#f-how"), flavor: $("#f-flavor"), notes: $("#f-notes"),
    designer: $("#f-designer"), art: $("#f-art"), useStats: $("#f-use-stats"), model: $("#f-model")
  };
  var modelFile = null;
  f.type1.innerHTML = TYPES.map(function (t) { return '<option>' + t + '</option>'; }).join("");
  f.type2.innerHTML = '<option value="">None</option>' + TYPES.map(function (t) { return '<option>' + t + '</option>'; }).join("");
  var statBox = $("#stat-edit");
  statBox.innerHTML = STAT.map(function (s, i) {
    return '<label for="f-stat' + i + '">' + s + '</label><input class="search" id="f-stat' + i + '" type="number" min="1" max="255" step="1" value="50" inputmode="numeric">' +
      '<span class="bar"><i></i></span><span class="delta" data-delta="' + i + '"></span>';
  }).join("") + '<span class="stat-total-lbl">Total</span><b class="stat-total" id="stat-total"></b>';
  var statInputs = $$("input", statBox);
  var artFiles = [];
  try { f.designer.value = localStorage.getItem("camp-designer") || ""; } catch (e) { /* optional */ }

  function kind() { return ($("input[name=kind]:checked", form) || {}).value || "campian"; }
  function baseOf() { return byName[f.base.value.trim().toLowerCase()] || null; }
  function stats() { return statInputs.map(function (i) { return Math.max(1, Math.min(255, parseInt(i.value, 10) || 1)); }); }
  function draft() {
    var b = baseOf(), k = kind();
    return {
      kind: k, base: k === "fakemon" ? "" : b ? b.name : f.base.value.trim(), name: f.name.value.trim(),
      types: [f.type1.value].concat(f.type2.value && f.type2.value !== f.type1.value ? [f.type2.value] : []),
      stats: f.useStats.checked ? stats() : [], abilities: f.ab.map(function (i) { return i.value.trim(); }),
      how: f.how.value.trim(), flavor: f.flavor.value.trim(), notes: f.notes.value.trim(),
      designer: f.designer.value.trim() || "Anonymous"
    };
  }
  function refresh() {
    var k = kind(), b = baseOf();
    $("#base-field").hidden = k === "fakemon";
    if (k !== "fakemon") $("#f-base-label").textContent = KIND[k].base;
    $("#f-how-label").textContent = KIND[k].how;
    $("#stats-box").hidden = !f.useStats.checked;
    $("#kind-hint").textContent = KIND[k].hint;
    $$(".kind-choice label").forEach(function (l) { l.classList.toggle("active", $("input", l).checked); });
    f.name.placeholder = PREFIX[k] ? PREFIX[k] + (b ? b.name : "...") : "Your new Pokémon's name";
    f.how.placeholder = k === "mega" ? "e.g. " + (b ? megaStone(b.name) : "Snoverite") : k === "campian" || k === "fakemon" ? "Biome, e.g. Badlands" :
      k === "evo" ? "e.g. Level 36, or use a Fire Stone" : "e.g. Evolves at level 18";
    var s = stats();
    statInputs.forEach(function (input, i) {
      input.nextElementSibling.firstChild.style.width = Math.min(100, s[i] / 160 * 100) + "%";
      var d = b ? s[i] - b.stats[i] : 0, cell = $('[data-delta="' + i + '"]', statBox);
      cell.textContent = b && d ? (d > 0 ? "+" : "") + d : "";
      cell.className = "delta" + (d > 0 ? " up" : d < 0 ? " down" : "");
    });
    $("#stat-total").textContent = total(s);
    $("#stat-hint").textContent = b && k !== "fakemon" ? b.name + "'s total is " + total(b.stats) + "." : "";
    $("#f-base-hint").textContent = f.base.value.trim() && !b ? "Pick one from the list." : b ? b.types.join(" / ") + " · base total " + total(b.stats) : "";
    var d = draft();
    d.art = artFiles.map(function (a) { return a.url; });
    d.model = modelFile ? { name: modelFile.name, size: modelFile.size } : null;
    if (!d.name && PREFIX[k] && b) d.name = PREFIX[k] + b.name;
    if (!d.notes) d.notes = "";
    $("#preview").innerHTML = card(d, true);
  }
  // Picking a base fills in its typing, stats and abilities, unless you've already changed them.
  var touched = {};
  function fillFromBase(b, force) {
    if (!b) return;
    if (force || !touched.types) { f.type1.value = b.types[0]; f.type2.value = b.types[1] || ""; }
    if (force || !touched.stats) statInputs.forEach(function (input, i) { input.value = b.stats[i]; });
    if (force || !touched.abilities) f.ab.forEach(function (input, i) { input.value = b.abilities[i] || ""; });
    if (PREFIX[kind()] && (force || !touched.name)) f.name.value = PREFIX[kind()] + b.name.replace(/^(Campian|Mega) /, "");
  }
  var basePicked = false;  // true when the visitor chose the base (Roll then keeps it), false when Roll did
  f.base.addEventListener("change", function () { basePicked = !!baseOf(); fillFromBase(baseOf()); refresh(); });
  f.base.addEventListener("input", function () { basePicked = !!baseOf(); refresh(); });
  [f.type1, f.type2].forEach(function (el) { el.addEventListener("change", function () { touched.types = true; refresh(); }); });
  statInputs.forEach(function (el) { el.addEventListener("input", function () { touched.stats = true; refresh(); }); });
  f.ab.forEach(function (el) { el.addEventListener("input", function () { touched.abilities = true; refresh(); }); });
  f.name.addEventListener("input", function () { touched.name = true; refresh(); });
  [f.how, f.flavor, f.notes, f.designer].forEach(function (el) { el.addEventListener("input", refresh); });
  f.useStats.addEventListener("change", function () {
    // Turning stats on starts from the base Pokémon's, if one is picked.
    if (f.useStats.checked && !touched.stats && baseOf() && kind() !== "fakemon") statInputs.forEach(function (input, i) { input.value = baseOf().stats[i]; });
    refresh();
  });
  $$("input[name=kind]", form).forEach(function (r) {
    r.addEventListener("change", function () {
      if (PREFIX[r.value] && !touched.name && baseOf()) f.name.value = PREFIX[r.value] + baseOf().name.replace(/^(Campian|Mega) /, "");
      else if (!PREFIX[r.value] && /^(Campian|Mega) /.test(f.name.value) && !touched.name) f.name.value = "";
      refresh();
    });
  });

  // concept art
  var artPicker = $("#art-picker");
  function renderArt() {
    $$(".art-thumb", artPicker).forEach(function (n) { n.remove(); });
    artFiles.forEach(function (a, i) {
      var node = document.createElement("div");
      node.className = "art-thumb";
      node.innerHTML = '<img src="' + a.url + '" alt="Concept art ' + (i + 1) + '"><button type="button" aria-label="Remove image ' + (i + 1) + '" data-remove-art="' + i + '">×</button>';
      artPicker.insertBefore(node, $(".art-add", artPicker));
    });
    $(".art-add", artPicker).hidden = artFiles.length >= 3;
    refresh();
  }
  f.art.addEventListener("change", function () {
    var problems = [];
    Array.prototype.forEach.call(f.art.files, function (file) {
      if (artFiles.length >= 3) { problems.push("Only 3 images fit."); return; }
      if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) { problems.push(file.name + " isn't a PNG, JPG, WebP or GIF."); return; }
      if (file.size > 8 * 1024 * 1024) { problems.push(file.name + " is over 8 MB."); return; }
      artFiles.push({ file: file, url: URL.createObjectURL(file) });
    });
    f.art.value = "";
    formStatus.className = "form-status" + (problems.length ? " error" : "");
    formStatus.textContent = problems.join(" ");
    renderArt();
  });
  artPicker.addEventListener("click", function (e) {
    var b = e.target.closest("[data-remove-art]");
    if (!b) return;
    var gone = artFiles.splice(+b.getAttribute("data-remove-art"), 1)[0];
    URL.revokeObjectURL(gone.url);
    renderArt();
  });

  // 3D model (one file)
  function renderModel() {
    $("#model-name").hidden = $("#model-remove").hidden = !modelFile;
    $("#model-add").hidden = !!modelFile;
    $("#model-name").textContent = modelFile ? modelFile.name + " · " + mb(modelFile.size) : "";
    refresh();
  }
  f.model.addEventListener("change", function () {
    var file = f.model.files[0], problem = "";
    f.model.value = "";
    if (!file) return;
    if (!/\.(bbmodel|zip)$/i.test(file.name)) problem = "The model must be a Blockbench .bbmodel file or a .zip.";
    else if (file.size > 15 * 1024 * 1024) problem = file.name + " is over 15 MB.";
    else modelFile = file;
    formStatus.className = "form-status" + (problem ? " error" : "");
    formStatus.textContent = problem;
    renderModel();
  });
  $("#model-remove").addEventListener("click", function () { modelFile = null; renderModel(); $("#model-add").focus(); });

  // ---- random ideas ----
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function rand(lo, hi) { return lo + Math.random() * (hi - lo); }
  function round5(n) { return Math.round(n / 5) * 5; }
  var BIOMES = ["Badlands", "Mangrove Swamp", "Cherry Grove", "Deep Dark", "Snowy Slopes", "Mushroom Fields", "Jungle", "Savanna",
    "Stony Peaks", "Dripstone Caves", "Lush Caves", "Beach", "Taiga", "Birch Forest", "Desert", "Frozen Ocean", "Warm Ocean",
    "Swamp", "Meadow", "Dark Forest", "Flower Forest", "Ice Spikes", "Windswept Hills"];
  var STONES = ["Fire Stone", "Water Stone", "Thunder Stone", "Leaf Stone", "Moon Stone", "Sun Stone", "Shiny Stone", "Dusk Stone", "Dawn Stone", "Ice Stone"];
  var ITEMS = ["Metal Coat", "King's Rock", "Dragon Scale", "Razor Claw", "Razor Fang", "Protector", "Reaper Cloth", "Oval Stone"];
  var ROOTS = {
    Normal: ["fluff", "bun", "plum"], Fire: ["pyr", "blaz", "cind", "ember"], Water: ["aqu", "tid", "ripp", "mar"],
    Electric: ["volt", "spark", "zap"], Grass: ["fern", "moss", "thorn", "leaf"], Ice: ["fros", "rime", "glac"],
    Fighting: ["brawl", "jab", "grap"], Poison: ["tox", "smog", "venom"], Ground: ["dun", "quak", "terr"],
    Flying: ["gust", "aer", "sky"], Psychic: ["psy", "astr", "mind"], Bug: ["chit", "silk", "skitt"],
    Rock: ["crag", "bould", "peb"], Ghost: ["wisp", "gloom", "haunt"], Dragon: ["drak", "wyrm", "scal"],
    Dark: ["umbr", "nox", "shad"], Steel: ["ferr", "chrom", "rivet"], Fairy: ["pix", "fae", "glim"]
  };
  var TRAITS = ["It is fiercely loyal to the Trainer who raised it.", "It sleeps through the day and forages after dark.",
    "Campers say it hums quietly when it is content.", "It marks its territory with scratches on tree bark.",
    "It gathers in small groups around warm stones at night.", "It is rarely seen, but its tracks are easy to spot after rain.",
    "It shares food with smaller Pokémon in its territory.", "It grows restless before a storm."];
  function newName(b, kindValue, types) {
    var raw = b.name.replace(/^Campian /, "").replace(/[^A-Za-z]/g, "");
    var head = raw.slice(0, Math.max(3, Math.min(5, Math.ceil(raw.length / 2)))).toLowerCase();
    var tail = raw.slice(-Math.min(4, Math.floor(raw.length / 2))).toLowerCase();
    var root = pick(ROOTS[pick(types)] || ["neo"]);
    var name = kindValue === "evo"
      ? pick([head + pick(["ion", "ard", "ax", "ora", "oth", "esk", "adon", "eon"]), root + tail])
      : pick([head + pick(["let", "lin", "by", "ling", "kit", "ip"]), root + pick(["lit", "ling", "by"])]);
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return byName[name.toLowerCase()] ? name + "o" : name;
  }
  function megaStone(name) { var n = name.replace(/^(Campian|Mega) /, "").replace(/[^A-Za-z]/g, ""); return n.replace(/[aeiouy]$/i, "") + "ite"; }
  function otherType(exclude) { return pick(TYPES.filter(function (t) { return exclude.indexOf(t) < 0; })); }
  function roll() {
    var k = kind();
    if (k === "fakemon") return rollFakemon();
    var pool = species.filter(function (s) {
      if (s.special || s.custom) return false;
      if (k === "evo") return !s.into.length && total(s.stats) < 540;
      if (k === "mega") return !s.into.length && total(s.stats) >= 400 && total(s.stats) < 600;
      if (k === "preevo") return !s.from && total(s.stats) >= 330;
      return true;
    });
    var chosen = baseOf();
    var b = basePicked && chosen && !chosen.custom ? chosen : pick(pool), types, st = b.stats.slice(), ab = b.abilities.slice(0, 3);
    while (ab.length < 3) ab.push("");
    var abilityPool = Object.keys(abilityNames);
    if (k === "campian") {
      var fresh = otherType(b.types), r = Math.random();
      types = r < 0.45 ? [b.types[0], fresh] : r < 0.75 ? [fresh] : [fresh, otherType(b.types.concat([fresh]))];
      for (var n = 0; n < 3; n++) {  // move points between stats; the total stays the same
        var amount = round5(rand(5, 25)), from = Math.floor(Math.random() * 6), to = Math.floor(Math.random() * 6);
        if (from !== to && st[from] - amount >= 20) { st[from] -= amount; st[to] += amount; }
      }
      ab = [pick(b.abilities), pick(abilityPool), pick(abilityPool)];
      if (ab[1] === ab[0]) ab[1] = "";
    } else if (k === "mega") {
      types = Math.random() < 0.6 ? b.types.slice() : [b.types[0], otherType(b.types)];
      var top = [1, 2, 3, 4, 5].sort(function (x, y) { return st[y] - st[x]; });
      [40, 30, 20, 10].forEach(function (n, j) { st[top[j]] += n; });  // HP stays; the best stats grow most
      st = st.map(function (v) { return Math.min(255, v); });
      ab = [Math.random() < 0.5 ? pick(b.abilities) : pick(abilityPool), "", ""];
    } else if (k === "evo") {
      types = b.types.length === 1 && Math.random() < 0.6 ? [b.types[0], otherType(b.types)] :
        b.types.length === 2 && Math.random() < 0.3 ? [b.types[0], otherType(b.types)] : b.types.slice();
      var target = Math.min(600, Math.max(total(st) + 40, round5(total(st) * rand(1.12, 1.26)))), extra = target - total(st);
      var order = st.map(function (v, i) { return i; }).sort(function (x, y) { return st[y] - st[x]; });
      var weights = st.map(function (v, i) { return i === order[0] || i === order[1] ? 2 : 1; }), wsum = 8;
      st = st.map(function (v, i) { return Math.min(255, v + Math.round(extra * weights[i] / wsum)); });
      if (Math.random() < 0.4) ab[2] = pick(abilityPool);
    } else {
      types = Math.random() < 0.75 ? [b.types[0]] : b.types.slice();
      var factor = rand(0.62, 0.75);
      st = st.map(function (v) { return Math.max(15, Math.min(255, Math.round(v * factor + rand(-6, 6)))); });
    }
    var name = PREFIX[k] ? PREFIX[k] + b.name : newName(b, k, types);
    var biome = pick(BIOMES), lvl = Math.round(rand(16, 48));
    var how = k === "campian" ? biome : k === "mega" ? megaStone(b.name) :
      k === "evo" ? pick(["Level " + lvl, "Use a " + pick(STONES) + " on " + b.name, "Level up while holding a " + pick(ITEMS), "Level up in a " + biome]) :
      pick(["Evolves into " + b.name + " at level " + lvl, "Evolves into " + b.name + " with high friendship", "Hatches from an Egg, evolves at level " + lvl]);
    var flavor = k === "mega" ? "When " + b.name + " Mega Evolves, " + pick(["its body hardens like armor.", "it glows with a fierce light.",
        "it grows larger and far more aggressive.", "its markings change color."]) + " " + pick(TRAITS)
      : k === "campian"
      ? "To survive in the " + biome.toLowerCase() + " around camp, " + b.name + " took on the " + types.filter(function (t) { return b.types.indexOf(t) < 0; }).concat(types)[0] + " type. " + pick(TRAITS)
      : k === "evo" ? "When " + b.name + " grows strong enough, it becomes " + name + ". " + pick(TRAITS)
      : name + " stays close to its parents until it evolves into " + b.name + ". " + pick(TRAITS);
    f.base.value = b.name; f.name.value = name;
    f.type1.value = types[0]; f.type2.value = types[1] || "";
    statInputs.forEach(function (input, i) { input.value = st[i]; });
    f.ab.forEach(function (input, i) { input.value = ab[i] || ""; });
    f.how.value = how; f.flavor.value = flavor;
    var changed = types.filter(function (t) { return b.types.indexOf(t) < 0; });
    f.notes.value = k === "mega" ? "A Mega Evolution for " + b.name + (types.join() !== b.types.join() ? " that becomes " + types.join("/") : "") +
        ", triggered by the " + megaStone(b.name) + "."
      : k === "campian"
      ? "A Campian form of " + b.name + (changed.length ? " that's " + types.join("/") + " instead of " + b.types.join("/") : "") + ", adapted to the " + biome.toLowerCase() + " around camp."
      : k === "evo" ? "A new evolution for " + b.name + ". It's " + types.join("/") + " and evolves by: " + how.charAt(0).toLowerCase() + how.slice(1) + "."
      : "A new baby stage for " + b.name + ". It's " + types.join("/") + ".";
    f.useStats.checked = true;
    touched = { types: true, stats: true, abilities: true, name: true };
    formStatus.className = "form-status";
    formStatus.textContent = "Rolled " + name + ". Change anything you like, then post it.";
    refresh();
  }
  function rollFakemon() {
    var t1 = pick(TYPES), types = Math.random() < 0.55 ? [t1, otherType([t1])] : [t1];
    var root = pick(ROOTS[t1]), end = pick(["ling", "ox", "aro", "ette", "ink", "um", "ara", "eon", "it", "on"]);
    var name = (root + end).charAt(0).toUpperCase() + (root + end).slice(1);
    if (byName[name.toLowerCase()]) name += "a";
    var target = round5(rand(300, 540)), weights = STAT.map(function () { return rand(0.6, 1.6); });
    var wsum = weights.reduce(function (a, b) { return a + b; }, 0);
    var st = weights.map(function (w) { return Math.max(20, Math.min(160, round5(target * w / wsum))); });
    var abilityPool = Object.keys(abilityNames), biome = pick(BIOMES);
    f.base.value = ""; f.name.value = name;
    f.type1.value = types[0]; f.type2.value = types[1] || "";
    f.useStats.checked = true;
    statInputs.forEach(function (input, i) { input.value = st[i]; });
    f.ab.forEach(function (input, i) { input.value = i < 2 || Math.random() < 0.7 ? pick(abilityPool) : ""; });
    if (f.ab[1].value === f.ab[0].value) f.ab[1].value = "";
    f.how.value = biome;
    f.flavor.value = name + " lives in the " + biome.toLowerCase() + ". " + pick(TRAITS);
    f.notes.value = "A " + types.join("/") + " Pokémon from the " + biome.toLowerCase() + ".";
    touched = { types: true, stats: true, abilities: true, name: true };
    formStatus.className = "form-status";
    formStatus.textContent = "Rolled " + name + ". Change anything you like, then post it.";
    refresh();
  }
  $("[data-roll]").addEventListener("click", roll);
  $("[data-roll-head]").addEventListener("click", function () {
    var kinds = ["campian", "mega", "evo", "preevo", "fakemon"];
    $("input[value=" + pick(kinds) + "]", form).checked = true;
    roll();
    $("#suggest").scrollIntoView({ behavior: document.documentElement.getAttribute("data-motion") === "reduced" ? "auto" : "smooth" });
  });
  function clearForm(keepStatus) {
    ["base", "name", "how", "flavor", "notes"].forEach(function (k) { f[k].value = ""; });
    f.ab.forEach(function (i) { i.value = ""; });
    f.type1.value = "Normal"; f.type2.value = "";
    statInputs.forEach(function (i) { i.value = 50; });
    f.useStats.checked = false;
    artFiles.forEach(function (a) { URL.revokeObjectURL(a.url); });
    artFiles = []; touched = {}; modelFile = null; basePicked = false; renderModel();
    if (!keepStatus) { formStatus.textContent = ""; formStatus.className = "form-status"; }
    renderArt();
  }
  $("[data-clear]").addEventListener("click", function () { clearForm(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = draft(), b = baseOf(), submit = $("#f-submit");
    var problem = !d.name ? ["Give it a name.", f.name] :
      !d.notes ? ["Describe your idea.", f.notes] :
      d.kind !== "fakemon" && d.base && !b ? ["Pick the Pokémon it's based on from the list, or leave it empty.", f.base] : null;
    if (problem) { formStatus.className = "form-status error"; formStatus.textContent = problem[0]; problem[1].focus(); return; }
    try { localStorage.setItem("camp-designer", f.designer.value.trim()); } catch (err) { /* optional */ }
    var body = new FormData();
    body.append("idea", JSON.stringify(d));
    artFiles.forEach(function (a) { body.append("art", a.file, a.file.name); });
    if (modelFile) body.append("model", modelFile, modelFile.name);
    submit.disabled = true; submit.textContent = "Posting...";
    formStatus.className = "form-status"; formStatus.textContent = "";
    api("/forms", { method: "POST", body: body }).then(function (idea) {
      clearForm(true);
      formStatus.className = "form-status ok";
      formStatus.innerHTML = "Posted! <a href=\"#idea-" + idea.id + "\">See " + esc(idea.name) + "</a> in the list.";
      sort = "new"; kindFilter = "";
      $$("[data-sort]").forEach(function (x) { x.classList.toggle("active", x.getAttribute("data-sort") === "new"); x.setAttribute("aria-pressed", x.getAttribute("data-sort") === "new"); });
      $$("[data-kind]").forEach(function (x) { x.classList.toggle("active", !x.getAttribute("data-kind")); x.setAttribute("aria-pressed", !x.getAttribute("data-kind")); });
      load(true);
    }).catch(function (err) {
      formStatus.className = "form-status error";
      formStatus.textContent = err.message === "Failed to fetch" ? "Couldn't reach the suggestion box. Try again in a minute." : err.message;
    }).then(function () { submit.disabled = false; submit.textContent = "Post idea"; });
  });

  refresh();
  load(true);
  openFromHash();
})();
