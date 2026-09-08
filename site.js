(function () {
  var C = window.CC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NY = "America/New_York";
  var now = Date.now();
  var motionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var motionPreference = "full";
  try { if (localStorage.getItem("camp-motion") === "reduced") motionPreference = "reduced"; } catch (e) { /* Preferences may be unavailable in private browsing. */ }
  function applyMotionPreference() {
    var reduced = motionQuery.matches || motionPreference === "reduced";
    document.documentElement.setAttribute("data-motion", reduced ? "reduced" : "full");
    $$("[data-motion-toggle]").forEach(function (button) {
      button.hidden = false;
      button.setAttribute("aria-pressed", String(reduced));
      button.disabled = motionQuery.matches;
      $("span", button).textContent = motionQuery.matches ? "Reduced motion (device setting)" : "Reduce motion";
    });
  }
  $$("[data-motion-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      motionPreference = motionPreference === "full" ? "reduced" : "full";
      try { localStorage.setItem("camp-motion", motionPreference); } catch (e) { /* The choice still applies for this page. */ }
      applyMotionPreference();
    });
  });
  if (motionQuery.addEventListener) motionQuery.addEventListener("change", applyMotionPreference);
  applyMotionPreference();

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function icon(name) {
    return '<svg class="icon" aria-hidden="true" focusable="false"><use href="assets/icons.svg#' + name + '"></use></svg>';
  }
  function fmtDate(iso, opts) {
    var d = new Date(iso.length === 10 ? iso + "T12:00:00Z" : iso);
    return d.toLocaleDateString("en-US", Object.assign({ timeZone: iso.length === 10 ? "UTC" : NY }, opts));
  }
  // screenshot ids look like "s1-42": season folder from the prefix, full-size copy only if listed in C.large
  function shotFolder(id) { return "assets/season" + id.split("-")[0].slice(1); }
  function thumbOf(id) { return shotFolder(id) + "/thumb/" + id + ".jpg"; }
  function fullOf(id) { return (C.large.indexOf(id) > -1 ? shotFolder(id) + "/large/" : shotFolder(id) + "/thumb/") + id + ".jpg"; }
  function shotInfo(id) {
    return (C.shots || {})[id] || { caption: "Season " + id.split("-")[0].slice(1) + " screenshot " + id.split("-")[1], alt: "Camp Cobblemon community screenshot." };
  }
  function shotCaption(id) {
    var info = shotInfo(id);
    return '<span class="shot-title">' + esc(info.caption) + '</span><span class="shot-meta">Season ' + id.split("-")[0].slice(1) + (info.creator ? ' · Built by ' + esc(info.creator) : '') + '</span>';
  }
  function shotLink(id, i) {
    return '<a href="' + fullOf(id) + '" data-i="' + i + '" aria-label="View ' + esc(shotInfo(id).caption) + '"><figure><img src="' + thumbOf(id) + '" alt="' + esc(shotInfo(id).alt) + '" loading="lazy" width="720" height="405"><figcaption>' + shotCaption(id) + '</figcaption></figure></a>';
  }
  function seasonState(s) {
    var start = new Date(s.start).getTime(), end = s.end ? new Date(s.end).getTime() : Infinity;
    return now < start ? "upcoming" : now < end ? "current" : "ended";
  }
  var TAG = { upcoming: "Next", current: "Current world", ended: "Ended" };

  // ---- shared: nav, links, address ----------------------------------------
  var page = location.pathname.split("/").pop() || "index.html";
  $$(".nav a[href]").forEach(function (a) {
    if (a.getAttribute("href") === page) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
  var menuButton = $(".nav-toggle"), navigation = $("#primary-nav");
  if (menuButton && navigation) {
    menuButton.hidden = false;
    document.documentElement.classList.add("nav-enhanced");
    function closeMenu() {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
    menuButton.addEventListener("click", function () {
      var expanded = menuButton.getAttribute("aria-expanded") !== "true";
      navigation.classList.toggle("open", expanded);
      menuButton.setAttribute("aria-expanded", String(expanded));
    });
    $(".site-header").addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMenu(); menuButton.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-header")) closeMenu();
    });
    document.addEventListener("focusin", function (e) {
      if (!e.target.closest(".site-header")) closeMenu();
    });
  }
  $$("[data-link]").forEach(function (a) {
    if (C.site[a.getAttribute("data-link")]) a.href = C.site[a.getAttribute("data-link")];
  });
  $$("[data-address]").forEach(function (el) { el.textContent = C.site.address; });
  $$("[data-copy]").forEach(function (btn) {
    var resetTimer;
    btn.addEventListener("click", function () {
      var feedback = $("#copy-feedback");
      function failed() {
        clearTimeout(resetTimer);
        btn.textContent = C.site.address;
        if (feedback) {
          feedback.className = "copy-error";
          feedback.textContent = "Couldn't copy automatically. Select and copy the server address: " + C.site.address;
        }
        btn.title = "Select and copy this address: " + C.site.address;
        var range = document.createRange();
        range.selectNodeContents(btn);
        var selection = window.getSelection();
        if (selection) { selection.removeAllRanges(); selection.addRange(range); }
      }
      if (!navigator.clipboard || !navigator.clipboard.writeText) { failed(); return; }
      navigator.clipboard.writeText(C.site.address).then(function () {
        clearTimeout(resetTimer);
        btn.textContent = "Copied!";
        if (feedback) { feedback.className = "sr-only"; feedback.textContent = "Server address copied."; }
        resetTimer = setTimeout(function () { btn.textContent = C.site.address; }, 1600);
      }).catch(failed);
    });
  });

  // Keep keyboard focus inside an open dialog and return it to its trigger.
  var dialogTriggers = new WeakMap();
  function activateDialog(el) {
    if (!el.classList.contains("open")) {
      var trigger = document.activeElement;
      var attr = trigger.hasAttribute("data-detail") ? "data-detail" : trigger.hasAttribute("data-compare") ? "data-compare" : null;
      dialogTriggers.set(el, { element: trigger, attribute: attr, row: attr ? trigger.getAttribute(attr) : null });
    }
    el.classList.add("open");
    document.body.style.overflow = "hidden";
    $$(".site-header, main, .site-footer, .skip-link").forEach(function (background) { background.inert = true; });
    ($("button", el) || el).focus();
  }
  function deactivateDialog(el) {
    el.classList.remove("open");
    if (!$(".modal.open, .lightbox.open")) {
      document.body.style.overflow = "";
      $$(".site-header, main, .site-footer, .skip-link").forEach(function (background) { background.inert = false; });
    }
    var trigger = dialogTriggers.get(el);
    if (trigger) {
      var target = trigger.element.isConnected ? trigger.element : trigger.attribute ? $("#dex [" + trigger.attribute + "='" + trigger.row + "']") : null;
      if (target) target.focus();
    }
    dialogTriggers.delete(el);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var dialog = $(".modal.open, .lightbox.open");
    if (!dialog) return;
    var focusable = $$("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex='0']", dialog);
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (!first) { e.preventDefault(); dialog.focus(); return; }
    if (!dialog.contains(document.activeElement) || (e.shiftKey && document.activeElement === first)) {
      e.preventDefault(); (e.shiftKey ? last : first).focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // ---- shared: lightbox -------------------------------------------------------
  var lb = $("#lightbox"), lbList = [], lbIdx = 0;
  function lbShow(i) {
    var n = lbList.length;
    lbIdx = (i + n) % n;
    var id = lbList[lbIdx];
    $("img", lb).src = fullOf(id);
    $("img", lb).alt = shotInfo(id).alt;
    $(".lb-caption", lb).innerHTML = shotCaption(id);
    $(".lb-count", lb).textContent = (lbIdx + 1) + " / " + n;
  }
  function openLightbox(list, i) {
    lbList = list;
    lbShow(i);
    activateDialog(lb);
  }
  function closeLightbox() { deactivateDialog(lb); }
  if (lb) {
    $(".lb-close", lb).addEventListener("click", closeLightbox);
    $(".lb-prev", lb).addEventListener("click", function () { lbShow(lbIdx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { lbShow(lbIdx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") { e.preventDefault(); lbShow(lbIdx - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); lbShow(lbIdx + 1); }
    });
  }

  // ---- shared: modals ------------------------------------------------------------
  function openModal(el, html) {
    $(".modal-body", el).innerHTML = html;
    activateDialog(el);
    $(".modal-card", el).scrollTop = 0;
  }
  function closeModal(el) {
    deactivateDialog(el);
  }
  $$(".modal").forEach(function (el) {
    $(".modal-close", el).addEventListener("click", function () { closeModal(el); });
    el.addEventListener("click", function (e) { if (e.target === el) closeModal(el); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    $$(".modal.open").forEach(closeModal);
  });

  // ---- home ---------------------------------------------------------------------
  var opens = new Date(C.season2Opens);
  $$("[data-season-line]").forEach(function (el) {
    if (now < opens.getTime()) {
      el.textContent = "Season 2 opens " +
        opens.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: NY }) +
        " at " + opens.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: NY }) +
        " ET on a brand new world.";
    } else {
      el.textContent = "Season 2 is live on a brand new world. It opened " +
        opens.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: NY }) + ".";
    }
  });

  // ---- shiny weekend (Friday 7 PM -> Sunday midnight, Eastern; same window Camp Radio uses) ----
  var shinyStrip = $("#shiny-strip"), shinyStatus = $("#shiny-status"), shinyBadge = $("#shiny-badge");
  if (shinyStrip || shinyBadge) {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: NY, weekday: "short", hour: "numeric", minute: "numeric", hour12: false })
      .formatToParts(new Date());
    var get = function (t) { return (parts.filter(function (p) { return p.type === t; })[0] || {}).value; };
    var dayIdx = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[get("weekday")];
    var nowMin = dayIdx * 1440 + (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
    var START = 4 * 1440 + 19 * 60, END = 7 * 1440;
    var on = nowMin >= START;
    function span(mins) {
      var d = Math.floor(mins / 1440), h = Math.round((mins % 1440) / 60);
      if (d >= 1) return d + (d === 1 ? " day" : " days") + (h ? " " + h + " h" : "");
      return h <= 1 ? "under an hour" : "about " + h + " hours";
    }
    var text = on ? "On now — " + span(END - nowMin) + " left" : "Next one Friday 7 PM ET — in " + span(START - nowMin);
    if (shinyStrip) { shinyStrip.classList.toggle("on", on); shinyStatus.textContent = text; }
    if (shinyBadge) shinyBadge.hidden = !on;
  }

  var st = $("#status");
  if (st) {
    var text = $(".status-text", st), players = $(".status-players", st);
    var statusController = new AbortController();
    var statusTimeout = setTimeout(function () { statusController.abort(); }, 8000);
    fetch("https://api.mcstatus.io/v2/status/java/" + C.site.address, { signal: statusController.signal })
      .then(function (r) { if (!r.ok) throw new Error("Status request failed"); return r.json(); })
      .then(function (d) {
        if (d.online) {
          st.classList.add("online");
          text.textContent = "Server online";
          players.textContent = d.players.online + " / " + d.players.max + " playing";
        } else {
          st.classList.add("offline");
          text.textContent = "Server offline";
          players.textContent = "";
        }
      })
      .catch(function () { text.textContent = "Status unavailable"; players.textContent = ""; })
      .finally(function () { clearTimeout(statusTimeout); });
  }

  var seasonsEl = $("#seasons");
  if (seasonsEl) {
    seasonsEl.innerHTML = C.seasons.slice().reverse().map(function (s) {
      var state = seasonState(s);
      return '<a class="card season ' + state + '" href="seasons.html#' + s.id + '">' +
        '<span class="tag">' + TAG[state] + '</span>' +
        '<h3>' + esc(s.label) + '</h3>' +
        '<span class="dates">' + esc(s.dates) + ' · ' + esc(s.cobblemon) + '</span>' +
        '<p>' + esc(s.blurb) + '</p></a>';
    }).join("");
  }

  var mp = $("#modpack-chips");
  if (mp) {
    mp.innerHTML = C.modpack.highlights.map(function (h) { return '<span class="chip">' + esc(h) + '</span>'; }).join("");
  }
  var mpOurs = $("#modpack-ours");
  if (mpOurs) {
    mpOurs.innerHTML = C.modpack.ours.map(function (m) {
      return '<div class="card"><strong>' + esc(m.name) + '</strong><p>' + esc(m.text) + '</p></div>';
    }).join("");
  }
  $$("[data-modpack-version]").forEach(function (el) { el.textContent = C.modpack.version; });

  var ml = $("#modlist");
  if (ml && window.CC_MODS) {
    var groups = [["mod", "Mods"], ["resourcepack", "Resource packs"], ["shader", "Shaders"], ["datapack", "Data packs"]];
    ml.innerHTML = groups.map(function (g) {
      var items = CC_MODS.items.filter(function (m) { return m.type === g[0]; });
      if (!items.length) return "";
      return '<h3>' + g[1] + ' <span class="faint">· ' + items.length + '</span></h3><ul>' + items.map(function (m) {
        var name = m.url ? '<a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.name) + '</a>' : esc(m.name);
        return '<li>' + name + (m.ours ? ' <span class="ours-tag">ours</span>' : '') + '</li>';
      }).join("") + '</ul>';
    }).join("");
    $$("[data-mod-count]").forEach(function (el) { el.textContent = CC_MODS.items.length; });
  }

  var feat = $("#featured");
  if (feat) {
    feat.innerHTML = C.featured.map(function (id) {
      return '<a href="gallery.html" aria-label="Explore the gallery: ' + esc(shotInfo(id).caption) + '"><img src="' + thumbOf(id) + '" alt="' + esc(shotInfo(id).alt) + '" loading="lazy" width="720" height="405"></a>';
    }).join("");
  }
  $$("[data-mon-count]").forEach(function (el) { el.textContent = C.pokemon.length; });
  $$("[data-bidoof-count]").forEach(function (el) {
    el.textContent = C.pokemon.filter(function (m) { return m.group === "bidoof"; }).length;
  });

  // ---- seasons page ---------------------------------------------------------------
  var sl = $("#season-list");
  if (sl) {
    var ordered = C.seasons.slice().reverse();
    sl.innerHTML = ordered.map(function (s) {
      var state = seasonState(s);
      var links = [];
      if (s.download) links.push('<a class="btn btn-outline" href="' + esc(s.download) + '">Download the world</a>');
      if (s.map) links.push('<a class="btn btn-outline" href="' + esc(s.map) + '" target="_blank" rel="noopener">Map</a>');
      if (s.galleryCount) links.push('<a class="more" href="gallery.html">All ' + s.galleryCount + ' photos in the gallery →</a>');
      var shots = s.shots.length
        ? '<div class="grid-gallery" data-season="' + s.id + '">' + s.shots.map(shotLink).join("") + '</div>'
        : (s.shotsNote ? '<p class="faint">' + esc(s.shotsNote) + '</p>' : "");
      return '<section class="season-full ' + state + '" id="' + s.id + '">' +
        '<div class="season-head">' +
        (s.logo ? '<img class="season-logo" src="' + s.logo + '" alt="">' : '') +
        '<div class="season-copy">' +
        '<span class="tag">' + TAG[state] + '</span>' +
        '<h2>' + esc(s.label) + '</h2>' +
        '<p class="dates">' + esc(s.dates) + ' · ' + esc(s.cobblemon) + '</p>' +
        '<p class="blurb">' + esc(s.blurb) + '</p>' +
        (links.length ? '<div class="actions">' + links.join("") + '</div>' : '') +
        '</div></div>' + shots + '</section>';
    }).join("");
    sl.addEventListener("click", function (e) {
      var a = e.target.closest(".grid-gallery a");
      if (!a) return;
      e.preventDefault();
      var id = a.parentNode.getAttribute("data-season");
      var s = C.seasons.filter(function (x) { return x.id === id; })[0];
      openLightbox(s.shots, +a.getAttribute("data-i"));
    });
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  }

  // ---- pokédex --------------------------------------------------------------
  var dex = $("#dex");
  if (dex) {
    var TYPE = {
      Normal: "#A8A77A", Fire: "#EE8130", Water: "#6390F0", Electric: "#F7D02C", Grass: "#7AC74C", Ice: "#96D9D6",
      Fighting: "#C22E28", Poison: "#A33EA1", Ground: "#E2BF65", Flying: "#A98FF3", Psychic: "#F95587", Bug: "#A6B91A",
      Rock: "#B6A136", Ghost: "#735797", Dragon: "#6F35FC", Dark: "#705746", Steel: "#B7B7CE", Fairy: "#D685AD"
    };
    var RARITY = { "Ultra Rare": "#d685ad", Rare: "#7fa5e0", Uncommon: "#7fc79a", Common: "#9aab9f" };
    var STAT = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
    // attacking type -> defending type -> multiplier (anything missing is 1×)
    var CHART = {
      normal: { rock: .5, ghost: 0, steel: .5 },
      fire: { fire: .5, water: .5, grass: 2, ice: 2, bug: 2, rock: .5, dragon: .5, steel: 2 },
      water: { fire: 2, water: .5, grass: .5, ground: 2, rock: 2, dragon: .5 },
      electric: { water: 2, electric: .5, grass: .5, ground: 0, flying: 2, dragon: .5 },
      grass: { fire: .5, water: 2, grass: .5, poison: .5, ground: 2, flying: .5, bug: .5, rock: 2, dragon: .5, steel: .5 },
      ice: { fire: .5, water: .5, grass: 2, ice: .5, ground: 2, flying: 2, dragon: 2, steel: .5 },
      fighting: { normal: 2, ice: 2, poison: .5, flying: .5, psychic: .5, bug: .5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: .5 },
      poison: { grass: 2, poison: .5, ground: .5, rock: .5, ghost: .5, steel: 0, fairy: 2 },
      ground: { fire: 2, electric: 2, grass: .5, poison: 2, flying: 0, bug: .5, rock: 2, steel: 2 },
      flying: { electric: .5, grass: 2, fighting: 2, bug: 2, rock: .5, steel: .5 },
      psychic: { fighting: 2, poison: 2, psychic: .5, dark: 0, steel: .5 },
      bug: { fire: .5, grass: 2, fighting: .5, poison: .5, flying: .5, psychic: 2, ghost: .5, dark: 2, steel: .5, fairy: .5 },
      rock: { fire: 2, ice: 2, fighting: .5, ground: .5, flying: 2, bug: 2, steel: .5 },
      ghost: { normal: 0, psychic: 2, ghost: 2, dark: .5 },
      dragon: { dragon: 2, steel: .5, fairy: 0 },
      dark: { fighting: .5, psychic: 2, ghost: 2, dark: .5, fairy: .5 },
      steel: { fire: .5, water: .5, electric: .5, ice: 2, rock: 2, steel: .5, fairy: 2 },
      fairy: { fire: .5, fighting: 2, poison: .5, dragon: 2, dark: 2, steel: .5 }
    };
    var TYPE_NAMES = Object.keys(TYPE);
    function eff(att, defTypes) {
      var row = CHART[att.toLowerCase()] || {}, m = 1;
      defTypes.forEach(function (t) { var v = row[t.toLowerCase()]; if (v !== undefined) m *= v; });
      return m;
    }
    function ink(hex) {
      var rgb = [1, 3, 5].map(function (start) {
        var channel = parseInt(hex.slice(start, start + 2), 16) / 255;
        return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
      });
      var luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
      return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? "#000000" : "#ffffff";
    }
    function badge(label, color) {
      return '<span class="type" style="background:' + color + ';color:' + ink(color) + '">' + esc(label) + '</span>';
    }
    function typeBadge(t) { return badge(t, TYPE[t] || "#888888"); }
    function mult(m) { return m === 0.25 ? "¼×" : m === 0.5 ? "½×" : m + "×"; }

    var mons = C.pokemon.map(function (m, i) {
      var o = Object.assign({}, m.group === "bidoof" ? C.bidoofBase : {}, m);
      o.order = i;
      o.total = o.stats.reduce(function (a, b) { return a + b; }, 0);
      o.isNew = now - new Date(o.added + "T12:00:00Z").getTime() < 45 * 864e5;
      return o;
    });
    var byRow = {};
    mons.forEach(function (m) { byRow[m.row] = m; });
    var filter = "all", shiny = false, q = "", sort = "default", compare = [];

    var notice = $("#doof-notice");
    if (notice && !C.doofRebalanceLive) notice.hidden = false;

    function sprite(m, s) { return "assets/pokemon/r" + m.row + (s ? "-s" : "") + ".png"; }
    function subLine(m) { return m.dex.charAt(0) === "#" ? m.form + " · " + m.species + " " + m.dex : m.dex + " · " + m.form; }
    function typeBadges(m) { return m.types.map(typeBadge).join(""); }
    function whereChips(m) {
      return '<div class="where"><span class="lbl">Found in</span>' +
        m.where.map(function (w) { return '<span class="biome">' + esc(w) + '</span>'; }).join("") + '</div>';
    }
    function statBars(m, other) {
      return '<div class="stats">' + m.stats.map(function (v, i) {
        var win = other && v > other.stats[i] ? ' class="win"' : "";
        return '<span>' + STAT[i] + '</span><span class="bar"><i style="width:' + Math.min(100, v / 160 * 100) + '%"></i></span><b' + win + '>' + v + '</b>';
      }).join("") + '<span>Total</span><span></span><b>' + m.total + '</b></div>';
    }
    function newTag(m) { return m.isNew ? '<span class="new-tag">New</span>' : ""; }

    function card(m) {
      var inCompare = compare.indexOf(m.row) > -1;
      return '<article class="card mon" data-row="' + m.row + '">' +
        '<div class="art"><img src="' + sprite(m, shiny) + '" alt="' + esc(m.name) + '" loading="lazy"></div>' +
        '<div><h3>' + esc(m.name) + newTag(m) + '</h3><div class="sub">' + esc(subLine(m)) + '</div></div>' +
        '<div class="types">' + typeBadges(m) + badge(m.rarity, RARITY[m.rarity] || "#9aab9f") + '</div>' +
        whereChips(m) +
        (m.how ? '<div class="how"><span class="lbl">Or</span>' + esc(m.how) + '</div>' : '') +
        (m.ability ? '<div class="ability"><span class="lbl">Ability</span>' + esc(m.ability.split(" (hidden")[0]) + '</div>' : '') +
        '<dl><dt>Design</dt><dd>' + esc(m.designer) + '</dd>' +
        '<dt>Added</dt><dd>' + fmtDate(m.added, { month: "short", day: "numeric", year: "numeric" }) + '</dd></dl>' +
        '<div class="card-actions"><button class="pill small" data-detail="' + m.row + '" aria-label="Details for ' + esc(m.name) + '">' + icon("book") + 'Details</button>' +
        '<button class="pill small' + (inCompare ? ' active' : '') + '" data-compare="' + m.row + '" aria-label="Compare ' + esc(m.name) + '" aria-pressed="' + inCompare + '">' + icon("compare") + (inCompare ? "Comparing" : "Compare") + '</button></div>' +
        '</article>';
    }
    function visible() {
      var needle = q.trim().toLowerCase();
      var list = mons.filter(function (m) {
        if (filter !== "all" && m.group !== filter) return false;
        if (!needle) return true;
        var hay = [m.name, m.form, m.types.join(" "), m.where.join(" "), m.how || "", m.ability || "", m.designer].join(" ");
        return hay.toLowerCase().indexOf(needle) > -1;
      });
      if (sort === "newest") list.sort(function (a, b) { return b.added.localeCompare(a.added) || a.order - b.order; });
      else if (sort === "stats") list.sort(function (a, b) { return b.total - a.total || a.order - b.order; });
      else if (sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
      else list.sort(function (a, b) { return a.order - b.order; });
      return list;
    }
    function render() {
      var active = document.activeElement;
      var focusAttribute = active && dex.contains(active) && (active.hasAttribute("data-compare") ? "data-compare" : active.hasAttribute("data-detail") ? "data-detail" : null);
      var focusRow = focusAttribute ? active.getAttribute(focusAttribute) : null;
      var shown = visible();
      dex.innerHTML = shown.length ? shown.map(card).join("") : '<div class="empty dex-empty"><h3>No Pokémon found</h3><p>Try another name, type, or biome, or reset your filters to see everyone.</p><button class="pill" data-reset-filters type="button">' + icon("reset") + 'Reset filters</button></div>';
      var results = $("#dex-results");
      if (results) results.textContent = shown.length + " of " + mons.length + " Pokémon";
      var reset = $(".reset-filters");
      if (reset) reset.disabled = filter === "all" && !q && sort === "default" && !shiny;
      if (focusAttribute) {
        var replacement = $("[" + focusAttribute + "='" + focusRow + "']", dex);
        if (replacement) replacement.focus();
      }
    }

    // detail view
    function row(label, html) { return '<div class="row"><span class="lbl">' + label + '</span>' + html + '</div>'; }
    function matchupList(m, test) {
      var out = [];
      TYPE_NAMES.forEach(function (t) {
        var e = eff(t, m.types);
        if (test(e)) out.push(typeBadge(t) + (e === 4 || e === 0.25 ? ' <span class="faint">' + mult(e) + '</span>' : ""));
      });
      return out.length ? '<div class="types">' + out.join("") + '</div>' : '<span class="faint">nothing</span>';
    }
    function detailHtml(m) {
      var inCompare = compare.indexOf(m.row) > -1;
      return '<div class="detail">' +
        '<div class="arts"><div class="art"><img src="' + sprite(m, false) + '" alt=""></div><div class="cap">Normal</div>' +
        '<div class="art"><img src="' + sprite(m, true) + '" alt=""></div><div class="cap">Shiny</div></div>' +
        '<div class="info">' +
        '<div><h2>' + esc(m.name) + newTag(m) + '</h2><div class="sub">' + esc(subLine(m)) + '</div></div>' +
        '<div class="types">' + typeBadges(m) + badge(m.rarity, RARITY[m.rarity] || "#9aab9f") + '</div>' +
        (m.flavor ? '<p class="dex-text">' + esc(m.flavor) + '</p>' : "") +
        (m.role ? row("Role", esc(m.role)) : "") +
        (m.ability ? row("Abilities", esc(m.ability)) : "") +
        row("Found in", '<div class="types">' + m.where.map(function (w) { return '<span class="biome">' + esc(w) + '</span>'; }).join("") + '</div>') +
        (m.how ? row("Or", esc(m.how)) : "") +
        (m.moves ? row("Signature moves", '<div class="moves">' + m.moves.map(function (x) { return '<span class="biome">' + esc(x) + '</span>'; }).join("") + '</div>') : "") +
        row("Base stats", statBars(m)) +
        row("Weak to", matchupList(m, function (e) { return e >= 2; })) +
        row("Resists", matchupList(m, function (e) { return e > 0 && e < 1; })) +
        row("Immune to", matchupList(m, function (e) { return e === 0; })) +
        row("Design", esc(m.designer) + ' · added ' + fmtDate(m.added, { month: "long", day: "numeric", year: "numeric" })) +
        '<div class="actions"><button class="pill' + (inCompare ? ' active' : '') + '" data-compare="' + m.row + '">' + (inCompare ? "Remove from compare" : "Add to compare") + '</button></div>' +
        '</div></div>';
    }

    // compare view
    function bestHit(att, def) {
      var best = -1, bt = "";
      att.types.forEach(function (t) { var e = eff(t, def.types); if (e > best) { best = e; bt = t; } });
      return { mult: best, type: bt };
    }
    function compareHtml(a, b) {
      function side(m, other) {
        return '<div class="side"><div class="art"><img src="' + sprite(m, shiny) + '" alt=""></div>' +
          '<h3>' + esc(m.name) + '</h3><div class="types">' + typeBadges(m) + '</div>' +
          (m.ability ? '<div class="ability">' + esc(m.ability) + '</div>' : '') + statBars(m, other) + '</div>';
      }
      var ab = bestHit(a, b), ba = bestHit(b, a);
      var lines = [
        '<strong>' + esc(a.name) + '</strong>’s ' + ab.type + ' moves hit ' + esc(b.name) + ' for <strong>' + mult(ab.mult) + '</strong>.',
        '<strong>' + esc(b.name) + '</strong>’s ' + ba.type + ' moves hit ' + esc(a.name) + ' for <strong>' + mult(ba.mult) + '</strong>.',
        a.stats[5] === b.stats[5] ? 'Same Speed — it comes down to the roll.'
          : '<strong>' + esc(a.stats[5] > b.stats[5] ? a.name : b.name) + '</strong> moves first (' + Math.max(a.stats[5], b.stats[5]) + ' vs ' + Math.min(a.stats[5], b.stats[5]) + ' Speed).'
      ];
      return '<h2 style="margin-bottom:18px">Head to head</h2><div class="compare">' + side(a, b) + side(b, a) + '</div>' +
        '<div class="verdict">' + lines.map(function (l) { return '<div>' + l + '</div>'; }).join("") +
        '<div class="faint">Type matchups only — abilities, items and moves still decide it.</div></div>';
    }

    var tray = $("#compare-tray"), trayNames = $("#compare-names"), trayOpen = $("#compare-open");
    function updateTray() {
      tray.hidden = compare.length === 0;
      trayNames.textContent = compare.map(function (r) { return byRow[r].name; }).join(" vs ");
      trayOpen.disabled = compare.length < 2;
    }
    function toggleCompare(rowId) {
      var i = compare.indexOf(rowId);
      if (i > -1) compare.splice(i, 1);
      else {
        if (compare.length === 2) compare.shift();
        compare.push(rowId);
      }
      updateTray();
      render();
      if ($("#mon-modal").classList.contains("open")) openModal($("#mon-modal"), detailHtml(byRow[rowId]));
      if (compare.length === 2 && i === -1 && !$("#mon-modal").classList.contains("open")) {
        openModal($("#compare-modal"), compareHtml(byRow[compare[0]], byRow[compare[1]]));
      }
    }
    document.addEventListener("click", function (e) {
      var d = e.target.closest("[data-detail]");
      if (d) { openModal($("#mon-modal"), detailHtml(byRow[+d.getAttribute("data-detail")])); return; }
      var c = e.target.closest("[data-compare]");
      if (c) toggleCompare(+c.getAttribute("data-compare"));
    });
    trayOpen.addEventListener("click", function () {
      if (compare.length === 2) openModal($("#compare-modal"), compareHtml(byRow[compare[0]], byRow[compare[1]]));
    });
    $("#compare-clear").addEventListener("click", function () { compare = []; updateTray(); render(); });

    $$("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        filter = b.getAttribute("data-filter");
        $$("[data-filter]").forEach(function (x) { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", String(x === b)); });
        render();
      });
    });
    var shinyBox = $("#shiny");
    if (shinyBox) shinyBox.addEventListener("change", function () { shiny = shinyBox.checked; render(); });
    var search = $("#search");
    if (search) search.addEventListener("input", function () { q = search.value; render(); });
    var sortSel = $("#sort");
    if (sortSel) sortSel.addEventListener("change", function () { sort = sortSel.value; render(); });
    document.addEventListener("click", function (e) {
      if (!e.target.closest("[data-reset-filters]")) return;
      filter = "all"; q = ""; sort = "default"; shiny = false;
      search.value = ""; sortSel.value = "default"; shinyBox.checked = false;
      $$("[data-filter]").forEach(function (b) {
        var selected = b.getAttribute("data-filter") === "all";
        b.classList.toggle("active", selected); b.setAttribute("aria-pressed", String(selected));
      });
      render(); search.focus();
    });
    render();

    var evos = $("#evolutions");
    if (evos) {
      evos.innerHTML = C.evolutions.map(function (e) {
        return '<tr><td>' + esc(e[0]) + '</td><td class="how">' + esc(e[1]) + '</td><td>' + esc(e[2]) + '</td></tr>';
      }).join("");
    }
  }

  // ---- gallery ---------------------------------------------------------------
  var gal = $("#gallery");
  if (gal) {
    var cur = "season1";
    $$("[data-set]").forEach(function (b) {
      b.textContent = b.textContent + " · " + C.gallery[b.getAttribute("data-set")].length;
      b.addEventListener("click", function () {
        cur = b.getAttribute("data-set");
        $$("[data-set]").forEach(function (x) { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", String(x === b)); });
        renderGallery();
      });
    });
    function renderGallery() {
      gal.innerHTML = C.gallery[cur].map(shotLink).join("");
      var results = $("#gallery-results");
      if (results) results.textContent = C.gallery[cur].length + (C.gallery[cur].length === 1 ? " photo" : " photos") + " from Season " + cur.slice(-1);
    }
    gal.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      openLightbox(C.gallery[cur], +a.getAttribute("data-i"));
    });
    renderGallery();
  }

  // ---- events (written by the Discord bot into events.json) -------------------
  var evUp = $("#events-upcoming"), evPast = $("#events-past");
  if (evUp) {
    var MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };
    function eventCard(e) {
      var d = new Date(e.date);
      var when = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: NY }) +
        " · " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: NY }) + " ET";
      var results = (e.results || []).map(function (r) {
        return '<li><span class="medal">' + (MEDAL[r.place] || r.place + ".") + '</span>' + esc(r.player) +
          (r.note ? ' <span class="faint">— ' + esc(r.note) + '</span>' : '') + '</li>';
      }).join("");
      return '<article class="card event">' +
        '<div class="when">' + when + (e.status === "cancelled" ? ' · cancelled' : '') + '</div>' +
        '<h3>' + esc(e.name) + '</h3>' +
        '<div class="meta">' + esc(e.type) + (e.host ? ' · hosted by ' + esc(e.host) : '') + '</div>' +
        (e.description ? '<p>' + esc(e.description) + '</p>' : '') +
        (results ? '<ol>' + results + '</ol>' : '') +
        (e.trophy ? '<div class="trophy">' + esc(e.trophy) + '</div>' : '') +
        (e.link ? '<a class="more" href="' + esc(e.link) + '" target="_blank" rel="noopener">Details in Discord →</a>' : '') +
        '</article>';
    }
    function loadEvents() {
    evUp.innerHTML = '<p class="empty" role="status">Loading events…</p>';
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 8000);
    fetch("events.json", { cache: "no-store", signal: controller.signal })
      .then(function (r) { if (!r.ok) throw new Error("Events unavailable"); return r.json(); })
      .then(function (d) {
        var events = (d.events || []).filter(function (e) { return e.status !== "cancelled"; });
        var up = events.filter(function (e) { return e.status !== "done" && new Date(e.date).getTime() >= now - 6 * 3600e3; })
          .sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
        var past = events.filter(function (e) { return up.indexOf(e) < 0; })
          .sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
        evUp.innerHTML = up.length ? up.map(eventCard).join("")
          : '<p class="empty">Nothing on the calendar right now. Events are announced in the Discord and show up here the same minute.</p>';
        evPast.innerHTML = past.length ? past.map(eventCard).join("")
          : '<p class="empty">No results recorded yet — Season 2 starts the record.</p>';
      })
      .catch(function () {
        evUp.innerHTML = '<div class="empty"><p role="alert">Couldn’t load the event list. Please try again.</p><button class="pill" id="retry-events" type="button">Try again</button></div>';
        $("#retry-events").addEventListener("click", loadEvents);
      })
      .finally(function () { clearTimeout(timeout); });
    }
    loadEvents();
  }
  if ("IntersectionObserver" in window) {
    var arrivalObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("arrived");
        arrivalObserver.unobserve(entry.target);
      });
    }, { threshold: 0.05 });
    $$(".section, .season-full").forEach(function (section) { arrivalObserver.observe(section); });
  }
})();
