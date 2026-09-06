(function () {
  var C = window.CC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NY = "America/New_York";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmtDate(iso, opts) {
    var d = new Date(iso.length === 10 ? iso + "T12:00:00Z" : iso);
    return d.toLocaleDateString("en-US", Object.assign({ timeZone: iso.length === 10 ? "UTC" : NY }, opts));
  }

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

  // ---- home: season line, live status, seasons ----------------------------
  var opens = new Date(C.season2Opens);
  var now = Date.now();
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
      var start = new Date(s.start).getTime(), end = s.end ? new Date(s.end).getTime() : Infinity;
      var state = now < start ? "upcoming" : now < end ? "current" : "ended";
      var tag = { upcoming: "Next", current: "Current world", ended: "Ended" }[state];
      return '<div class="card season ' + state + '">' +
        '<span class="tag">' + tag + '</span>' +
        '<h3>' + esc(s.label) + '</h3>' +
        '<span class="dates">' + esc(s.dates) + ' · ' + esc(s.cobblemon) + '</span>' +
        '<p>' + esc(s.blurb) + '</p></div>';
    }).join("");
  }

  var mp = $("#modpack-chips");
  if (mp) {
    mp.innerHTML = C.modpack.highlights.map(function (h) { return '<span class="chip">' + esc(h) + '</span>'; }).join("") +
      C.modpack.ours.map(function (m) { return '<span class="chip ours" title="' + esc(m.text) + '">' + esc(m.name) + ' · ours</span>'; }).join("");
  }
  var mpOurs = $("#modpack-ours");
  if (mpOurs) {
    mpOurs.innerHTML = C.modpack.ours.map(function (m) {
      return '<div class="card"><strong>' + esc(m.name) + '</strong><p>' + esc(m.text) + '</p></div>';
    }).join("");
  }
  $$("[data-modpack-version]").forEach(function (el) { el.textContent = C.modpack.version; });

  var feat = $("#featured");
  if (feat) {
    feat.innerHTML = C.featured.map(function (id) {
      return '<a href="gallery.html"><img src="assets/season1/thumb/' + id + '.jpg" alt="Season 1 build" loading="lazy"></a>';
    }).join("");
  }
  $$("[data-mon-count]").forEach(function (el) { el.textContent = C.pokemon.length; });
  $$("[data-bidoof-count]").forEach(function (el) {
    el.textContent = C.pokemon.filter(function (m) { return m.group === "bidoof"; }).length;
  });

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
        '<dl><dt>Spawns</dt><dd>' + esc(m.spawn) + '</dd>' +
        '<dt>Design</dt><dd>' + esc(m.designer) + '</dd>' +
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
        return (m.name + " " + m.spawn + " " + m.designer + " " + m.types.join(" ")).toLowerCase().indexOf(needle) > -1;
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
    var sets = {
      season1: C.gallery.season1.map(function (id) {
        return {
          thumb: "assets/season1/thumb/" + id + ".jpg",
          full: (C.large.indexOf(id) > -1 ? "assets/season1/large/" : "assets/season1/thumb/") + id + ".jpg"
        };
      }),
      season0: C.gallery.season0.map(function (id) {
        return { thumb: "assets/season0/" + id + "-thumb.jpg", full: "assets/season0/" + id + ".jpg" };
      })
    };
    var cur = "season1", idx = 0;
    $$("[data-set]").forEach(function (b) {
      var n = sets[b.getAttribute("data-set")].length;
      b.textContent = b.textContent + " · " + n;
      b.addEventListener("click", function () {
        cur = b.getAttribute("data-set");
        $$("[data-set]").forEach(function (x) { x.classList.toggle("active", x === b); });
        renderGallery();
      });
    });
    function renderGallery() {
      gal.innerHTML = sets[cur].map(function (s, i) {
        return '<a href="' + s.full + '" data-i="' + i + '"><img src="' + s.thumb + '" alt="" loading="lazy"></a>';
      }).join("");
    }
    var lb = $("#lightbox"), lbImg = $("img", lb), lbCount = $(".lb-count", lb);
    function show(i) {
      var n = sets[cur].length;
      idx = (i + n) % n;
      lbImg.src = sets[cur][idx].full;
      lbCount.textContent = (idx + 1) + " / " + n;
    }
    function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }
    gal.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      open(+a.getAttribute("data-i"));
    });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    renderGallery();
  }
})();
