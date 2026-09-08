# campcobblemon.net

Static site for Camp Cobblemon, hosted on GitHub Pages. No build step — plain HTML, CSS and JS.

## Editing

- **Text and data** — almost everything lives in `content.js`: links, the Season 2 date, seasons, modpack
  highlights, the gallery order, and every custom Pokémon. Edit, commit, push.
- **Rules** — `rules.html`. Keep it in sync with `#rules` in the Discord and update the "last rewritten" line.
- **Gallery photos** — drop a 720×405 JPEG in `assets/season1/thumb/` (or a new season folder) and add its id
  to the list in `content.js`. Optional full-size copy (1600×900) in `assets/season1/large/` — add the id to
  `large` so the lightbox uses it. Add a matching entry under `shots` with a short `caption`,
  descriptive `alt`, and optional `creator` credit. Only add a creator when attribution is known.
- **Pokémon sprites** — `assets/pokemon/r{row}.png` and `r{row}-s.png` (shiny). Add a row in `content.js`.
- **Server status** — read live from `api.mcstatus.io` in the browser; nothing to configure.

## Local preview

Any static server works, e.g. `python -m http.server 8766` from this folder.

## Accessibility and motion

Icons accompany text labels. The footer’s Reduce motion button remembers the visitor’s choice;
their device’s reduced-motion setting always takes precedence. Entrance and sprite animations
are brief, and content remains visible when JavaScript or animation is unavailable.
