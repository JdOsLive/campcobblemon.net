// Everything on the site that changes lives in this one file.
// Edit it, commit, push — GitHub Pages rebuilds in about a minute.
window.CC = {
  site: {
    address: "play.campcobblemon.net",
    discord: "https://discord.com/invite/fWGNXbbjsd",
    modrinth: "https://modrinth.com/modpack/camp-cobblemon-modpack",
    map: "https://map.campcobblemon.net"
  },

  // ISO time Season 2 opens. Before this the home page says "opens…", after it says "is live".
  season2Opens: "2026-09-11T19:00:00-04:00",

  // Oldest first. `shots` are screenshot ids shown on the Seasons page (thumbs live in
  // assets/seasonN/thumb). `download` and `map` are optional links — leave "" to hide the button.
  seasons: [
    {
      id: "s0",
      label: "Season 0",
      cobblemon: "Cobblemon 1.5.0",
      start: "2024-08-07T00:00:00-04:00",
      end: "2024-12-27T00:00:00-05:00",
      dates: "Aug 7, 2024 – Dec 27, 2024",
      blurb: "Where it started. Just under five months before the first reset.",
      logo: "",
      shots: ["s0-01"],
      download: "",
      map: ""
    },
    {
      id: "s1",
      label: "Season 1",
      cobblemon: "Cobblemon 1.6 → 1.7.3",
      start: "2024-12-27T00:00:00-05:00",
      end: "2026-09-11T19:00:00-04:00",
      dates: "Dec 27, 2024 – Sep 11, 2026",
      blurb: "Our longest world. Updated in place from 1.6 to 1.7.3 as Cobblemon moved forward.",
      logo: "assets/season1/logo.png",
      shots: ["s1-42", "s1-60", "s1-17", "s1-37", "s1-12", "s1-28", "s1-19", "s1-36"],
      galleryCount: 56,
      download: "",
      map: ""
    },
    {
      id: "s2",
      label: "Season 2",
      cobblemon: "Cobblemon 1.8",
      start: "2026-09-11T19:00:00-04:00",
      end: "",
      dates: "Sep 11, 2026 –",
      blurb: "A brand new world on modpack 2.0.0, with 3× shiny weekends and the new trophies.",
      logo: "assets/logo.png",
      shots: [],
      shotsNote: "Screenshots once the world opens.",
      download: "",
      map: ""
    }
  ],

  // The full "everything in the pack" list is generated into mods.js (see camp-tools/modlist.py).
  modpack: {
    version: "2.0.0",
    highlights: [
      "Cobblemon 1.8.0", "Minecraft 1.21.1", "Sodium + Iris", "Complementary Reimagined shaders",
      "Distant Horizons", "Xaero's minimap & world map", "Simple Voice Chat", "Litematica",
      "Sophisticated Backpacks", "Storage Drawers", "Roughly Enough Items", "Axiom"
    ],
    ours: [
      { name: "Camp Radio", text: "3× shiny rates every weekend, Friday 7 PM to Sunday midnight ET. Shiny catches and battle results get posted to Discord." },
      { name: "Camp Furnishings", text: "Commissioned trophies for tournaments and events, engraved with the winner's name." }
    ]
  },

  // Home page "From Season 1" — three thumbnails (ids from assets/season1/thumb)
  featured: ["s1-42", "s1-60", "s1-17"],

  gallery: {
    season1: [
      "s1-60", "s1-65", "s1-66", "s1-37", "s1-42", "s1-54", "s1-55", "s1-56", "s1-57", "s1-58",
      "s1-38", "s1-39", "s1-36", "s1-44", "s1-45", "s1-46", "s1-49", "s1-63", "s1-61", "s1-62",
      "s1-59", "s1-53", "s1-51", "s1-50", "s1-48", "s1-43", "s1-41", "s1-52", "s1-64", "s1-26",
      "s1-29", "s1-12", "s1-10", "s1-17", "s1-27", "s1-21", "s1-28", "s1-30", "s1-19", "s1-25",
      "s1-22", "s1-23", "s1-01", "s1-33", "s1-32", "s1-13", "s1-16", "s1-18", "s1-14", "s1-07",
      "s1-24", "s1-06", "s1-08", "s1-09", "s1-34", "s1-47"
    ],
    season0: ["s0-01"]
  },
  // Shots that also have a full-size copy in assets/seasonN/large (the lightbox uses it when present)
  large: ["s0-01", "s1-12", "s1-17", "s1-19", "s1-28", "s1-36", "s1-37", "s1-42", "s1-60"],

  // Costume Bidoofs share these unless a row overrides them.
  bidoofBase: {
    species: "Bidoof", dex: "#399", form: "Costume", types: ["Normal"],
    rarity: "Ultra Rare", stats: [59, 45, 40, 35, 40, 31]
  },

  // row = sprite file number (assets/pokemon/r{row}.png, r{row}-s.png for shiny)
  pokemon: [
    { row: 5,  name: "Bidoof (Helldivers)",    group: "bidoof", spawn: "the End", designer: "maashous", added: "2025-01-06" },
    { row: 6,  name: "Bidoof (Barbie)",        group: "bidoof", spawn: "desert", designer: "maashous", added: "2025-01-06" },
    { row: 7,  name: "Bidoof (Ruby)",          group: "bidoof", spawn: "snowy, stony, jagged and frozen peaks", designer: "Dogtor Bloo", added: "2025-01-11" },
    { row: 8,  name: "Bidoof (Aqua)",          group: "bidoof", spawn: "snowy, stony, jagged and frozen peaks", designer: "Dogtor Bloo", added: "2025-01-11" },
    { row: 9,  name: "Bidoof (Angel)",         group: "bidoof", spawn: "snowy, stony, jagged and frozen peaks", designer: "rabitt", added: "2025-02-14" },
    { row: 10, name: "Bidoof (King)",          group: "bidoof", spawn: "plains", designer: "Lazaro", added: "2025-03-03" },
    { row: 11, name: "Bidoof (Queen)",         group: "bidoof", spawn: "plains", designer: "Lazaro", added: "2025-03-03" },
    { row: 12, name: "Bidoof (Scuba)",         group: "bidoof", spawn: "ocean, deep ocean", designer: "Lazaro", added: "2025-03-03" },
    { row: 13, name: "Bidoof (Kratos)",        group: "bidoof", spawn: "jagged and frozen peaks", designer: "Bowtie", added: "2025-03-28" },
    { row: 14, name: "Bidoof (Aloy)",          group: "bidoof", spawn: "jungle", designer: "Bowtie", added: "2025-03-28" },
    { row: 15, name: "Bidoof (Ratchet & Clank)", group: "bidoof", spawn: "trial chambers", designer: "Bowtie", added: "2025-03-28" },
    { row: 16, name: "Bidoof (Astro Bot)",     group: "bidoof", spawn: "the End", designer: "Bowtie", added: "2025-03-28" },
    { row: 17, name: "Bidoof (Sly Cooper)",    group: "bidoof", spawn: "taiga", designer: "Bowtie", added: "2025-03-28" },
    { row: 18, name: "Bidoof (Mario)",         group: "bidoof", spawn: "basalt deltas, wastes, crimson forest, warped forest", designer: "Bowtie", added: "2025-04-19" },
    { row: 19, name: "Bidoof (Luigi)",         group: "bidoof", spawn: "basalt deltas, wastes, warped forest", designer: "Bowtie", added: "2025-04-19" },
    { row: 20, name: "Bidoof (Wario)",         group: "bidoof", spawn: "badlands", designer: "Bowtie", added: "2025-04-19" },
    { row: 21, name: "Bidoof (Waluigi)",       group: "bidoof", spawn: "mushroom fields", designer: "Bowtie", added: "2025-04-19" },
    { row: 22, name: "Bidoof (Donkey Kong)",   group: "bidoof", spawn: "jungle", designer: "Bowtie", added: "2025-04-19" },
    { row: 23, name: "Bidoof (Zelda, Breath of the Wild)", group: "bidoof", spawn: "sunflower plains", designer: "Bowtie", added: "2025-04-19" },
    { row: 24, name: "Bidoof (Zelda, Echoes of Wisdom)",   group: "bidoof", spawn: "cherry grove", designer: "Bowtie", added: "2025-04-19" },

    { row: 26, name: "Campion Milotic",   group: "campion", species: "Milotic",   dex: "#350", form: "Campion form", types: ["Ground", "Poison"],  rarity: "Ultra Rare", spawn: "mangrove swamp · Feebas evolves at level 60 in a mangrove swamp", designer: "Jet / Doctor X / Bife", added: "2025-04-30", stats: [100, 120, 130, 70, 90, 100] },
    { row: 27, name: "Campion Heracross", group: "campion", species: "Heracross", dex: "#214", form: "Campion form", types: ["Bug", "Fire"],       rarity: "Uncommon",   spawn: "wooded badlands", designer: "Jet / Doctor X / Bife", added: "2025-04-30", stats: [85, 125, 105, 55, 75, 115] },
    { row: 28, name: "Pachimitsu",        group: "evo",     species: "Pachimitsu", dex: "New evolution", form: "Evolves from Pachirisu", types: ["Electric", "Fairy"], rarity: "Uncommon", spawn: "forest · use a Shiny Stone on Pachirisu", designer: "Jet / Bowtie", added: "2025-05-24", stats: [75, 145, 75, 30, 80, 145] },
    { row: 29, name: "Campion Gligar",    group: "campion", species: "Gligar",    dex: "#207", form: "Campion form", types: ["Grass"],             rarity: "Rare",       spawn: "forests, taiga", designer: "Jet / Doctor X", added: "2025-05-24", stats: [65, 75, 95, 40, 70, 85] },
    { row: 30, name: "Glipine",           group: "evo",     species: "Glipine",   dex: "New evolution", form: "Evolves from Campion Gligar", types: ["Grass", "Dragon"], rarity: "Rare", spawn: "forests, taiga · use a Leaf Stone on Campion Gligar at night", designer: "Jet / Doctor X", added: "2025-05-24", stats: [78, 125, 116, 64, 86, 96] },
    { row: 31, name: "Campion Flamigo",   group: "campion", species: "Flamigo",   dex: "#973", form: "Campion form", types: ["Fighting", "Psychic"], rarity: "Rare",     spawn: "ruins and underground arch ruins, woodland mansions, unfrozen freshwater", designer: "Jet / Bowtie", added: "2025-07-04", stats: [75, 80, 75, 135, 80, 105] },
    { row: 32, name: "Campion Spiritomb", group: "campion", species: "Spiritomb", dex: "#442", form: "Campion form", types: ["Ghost", "Fire"],     rarity: "Rare",       spawn: "near campfires, any biome", designer: "Baumbs / Bowtie", added: "2026-08-30", stats: [100, 55, 85, 125, 85, 95] }
  ],

  evolutions: [
    ["Campion Gligar", "Leaf Stone, at night", "Glipine"],
    ["Pachirisu", "Shiny Stone", "Pachimitsu"],
    ["Feebas", "Level 60 in a mangrove swamp", "Campion Milotic"]
  ]
};
