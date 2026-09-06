(function () {
  var C = window.CC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NY = "America/New_York";
  var now = Date.now();

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmtDate(iso, opts) {
    var d = new Date(iso.length === 10 ? iso + "T12:00:00Z" : iso);
    return d.toLocaleDateString("en-US", Object.assign({ timeZone: iso.length === 10 ? "UTC" : NY }, opts));
  }
  // screenshot ids look like "s1-42": season folder from the prefix, full-size copy only if listed in C.large
  function shotFolder(id) { return "assets/season" + id.split("-")[0].slice(1); }
  function thumbOf(id) { return shotFolder(id) + "/thumb/" + id + ".jpg"; }
  function fullOf(id) { return (C.large.indexOf(id) > -1 ? shotFolder(id) + "/large/" : shotFolder(id) + "/thumb/") + id + ".jpg"; }
  function shotLink(id, i) {
    return '<a href="' + fullOf(id) + '" data-i="' + i + '"><img src="' + thumbOf(id) + '" alt="" loading="lazy"></a>';
  }
  function seasonState(s) {
    var start = new Date(s.start).getTime(), end = s.end ? new Date(s.end).getTime() : Infinity;
    return now < start ? "upcoming" : now < end ? "current" : "ended";
  }
  var TAG = { upcoming: "Next", current: "Current world", ended: "Ended" };

  // ---- shared: nav, links, address ----------------------------------------
  var page = location.pathname.split("/").pop() || "index.html";
  $$(".nav a[href]").forEach(function (a) {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });
  $$("[data-link]").forEach(function (a) {
    if (C.site[a.getAttribute("data-link")]) a.href = C.site[a.getAttribute("data-link")];
  });
  $$("[data-address]").forEach(function (el) { el.textContent = C.site.address; });
  $$("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(C.site.address).then(function () {
        var old = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = old; }, 1200);
      });
    });
  });

  // ---- shared: lightbox -------------------------------------------------------
  var lb = $("#lightbox"), lbList = [], lbIdx = 0;
  function lbShow(i) {
    var n = lbList.length;
    lbIdx = (i + n) % n;
    $("img", lb).src = lbList[lbIdx];
    $(".lb-count", lb).textContent = (lbIdx + 1) + " / " + n;
  }
  function openLightbox(list, i) {
    lbList = list;
    lbShow(i);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() { lb.classList.remove("open"); document.body.style.overflow = ""; }
  if (lb) {
    $(".lb-close", lb).addEventListener("click", closeLightbox);
    $(".lb-prev", lb).addEventListener("click", function () { lbShow(lbIdx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { lbShow(lbIdx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
      if (e.key === "ArrowRight") lbShow(lbIdx + 1);
    });
  }

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

  var st = $("#status");
  if (st) {
    var text = $(".status-text", st), players = $(".status-players", st);
    fetch("https://api.mcstatus.io/v2/status/java/" + C.site.address)
      .then(function (r) { return r.json(); })
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
      .catch(function () { text.textContent = "Status unavailable"; players.textContent = ""; });
  }

  var seasonsEl = $("#seasons");
  if (seasonsEl) {
    seasonsEl.innerHTML = C.seasons.map(function (s) {
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
      return '<a href="gallery.html"><img src="' + thumbOf(id) + '" alt="Season 1 build" loading="lazy"></a>';
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
      openLightbox(s.shots.map(fullOf), +a.getAttribute("data-i"));
    });
    if (location.hash) {
      var target = $(location.hash);
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
    function ink(hex) {
      var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? "#1b1b1b" : "#ffffff";
    }
    function badge(label, color) {
      return '<span class="type" style="background:' + color + ';color:' + ink(color) + '">' + esc(label) + '</span>';
    }
    var mons = C.pokemon.map(function (m) {
      return Object.assign({}, m.group === "bidoof" ? C.bidoofBase : {}, m);
    });
    var filter = "all", shiny = false, q = "";

    function card(m) {
      var total = m.stats.reduce(function (a, b) { return a + b; }, 0);
      var sub = m.dex.charAt(0) === "#" ? m.form + " · " + m.species + " " + m.dex : m.dex + " · " + m.form;
      return '<article class="card mon">' +
        '<div class="art"><img src="assets/pokemon/r' + m.row + (shiny ? "-s" : "") + '.png" alt="' + esc(m.name) + '" loading="lazy"></div>' +
        '<div><h3>' + esc(m.name) + '</h3><div class="sub">' + esc(sub) + '</div></div>' +
        '<div class="types">' + m.types.map(function (t) { return badge(t, TYPE[t] || "#888"); }).join("") +
        badge(m.rarity, RARITY[m.rarity] || "#9aab9f") + '</div>' +
        '<div class="where"><span class="lbl">Found in</span>' +
        m.where.map(function (w) { return '<span class="biome">' + esc(w) + '</span>'; }).join("") + '</div>' +
        (m.how ? '<div class="how"><span class="lbl">Or</span>' + esc(m.how) + '</div>' : '') +
        '<dl><dt>Design</dt><dd>' + esc(m.designer) + '</dd>' +
        '<dt>Added</dt><dd>' + fmtDate(m.added, { month: "short", day: "numeric", year: "numeric" }) + '</dd></dl>' +
        '<details><summary>Base stats · ' + total + '</summary><div class="stats">' +
        m.stats.map(function (v, i) {
          return '<span>' + STAT[i] + '</span><span class="bar"><i style="width:' + Math.min(100, v / 160 * 100) + '%"></i></span><b>' + v + '</b>';
        }).join("") + '</div></details></article>';
    }
    function render() {
      var needle = q.trim().toLowerCase();
      var shown = mons.filter(function (m) {
        if (filter !== "all" && m.group !== filter) return false;
        if (!needle) return true;
        return (m.name + " " + m.where.join(" ") + " " + (m.how || "") + " " + m.designer + " " + m.types.join(" ")).toLowerCase().indexOf(needle) > -1;
      });
      dex.innerHTML = shown.length ? shown.map(card).join("") : '<p class="empty">Nothing matches that.</p>';
    }
    $$("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        filter = b.getAttribute("data-filter");
        $$("[data-filter]").forEach(function (x) { x.classList.toggle("active", x === b); });
        render();
      });
    });
    var shinyBox = $("#shiny");
    if (shinyBox) shinyBox.addEventListener("change", function () { shiny = shinyBox.checked; render(); });
    var search = $("#search");
    if (search) search.addEventListener("input", function () { q = search.value; render(); });
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
        $$("[data-set]").forEach(function (x) { x.classList.toggle("active", x === b); });
        renderGallery();
      });
    });
    function renderGallery() { gal.innerHTML = C.gallery[cur].map(shotLink).join(""); }
    gal.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      openLightbox(C.gallery[cur].map(fullOf), +a.getAttribute("data-i"));
    });
    renderGallery();
  }
})();
