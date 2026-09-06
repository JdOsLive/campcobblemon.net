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

  // Costume Bidoof typings, abilities and stats below are from datapack v2.0 (the rebalance).
  // Flip to true once that datapack is on the server — it removes the "not live yet" notice on the Pokédex.
  doofRebalanceLive: false,

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
  // where = biomes / places it spawns naturally (shown as chips). how = the other way to get it, if any.
  pokemon: [
    { row: 5,  name: "Bidoof (Helldivers)",    group: "bidoof", where: ["The End"], types: ["Steel", "Fighting"], ability: "Justified / Simple (hidden: Moody)", stats: [60, 85, 65, 30, 45, 35], role: "Armored bruiser", moves: ["Metal Claw", "Rock Smash", "Brick Break", "Iron Head", "Body Press", "Close Combat", "Flash Cannon", "Bulk Up"], designer: "maashous", added: "2025-01-06" },
    { row: 6,  name: "Bidoof (Barbie)",        group: "bidoof", where: ["Desert"], types: ["Fairy"], ability: "Cute Charm / Simple (hidden: Moody)", stats: [65, 35, 50, 75, 55, 40], role: "Special attacker", moves: ["Baby-Doll Eyes", "Fairy Wind", "Disarming Voice", "Draining Kiss", "Dazzling Gleam", "Moonblast", "Play Rough", "Calm Mind"], designer: "maashous", added: "2025-01-06" },
    { row: 7,  name: "Bidoof (Ruby)",          group: "bidoof", where: ["Snowy Peaks", "Stony Peaks", "Jagged Peaks", "Frozen Peaks"], types: ["Rock", "Fire"], ability: "Solid Rock / Simple (hidden: Moody)", stats: [65, 80, 60, 40, 35, 40], role: "Physical wall-breaker", moves: ["Ember", "Rock Throw", "Flame Charge", "Rock Slide", "Fire Fang", "Stone Edge", "Flamethrower", "Earth Power"], designer: "Dogtor Bloo", added: "2025-01-11" },
    { row: 8,  name: "Bidoof (Aqua)",          group: "bidoof", where: ["Snowy Peaks", "Stony Peaks", "Jagged Peaks", "Frozen Peaks"], types: ["Water", "Ice"], ability: "Swift Swim / Simple (hidden: Moody)", stats: [60, 40, 50, 70, 55, 45], role: "Rain sweeper", moves: ["Water Gun", "Powder Snow", "Aqua Jet", "Icy Wind", "Surf", "Ice Shard", "Hydro Pump", "Scald", "Rain Dance"], designer: "Dogtor Bloo", added: "2025-01-11" },
    { row: 9,  name: "Bidoof (Angel)",         group: "bidoof", where: ["Snowy Peaks", "Stony Peaks", "Jagged Peaks", "Frozen Peaks"], types: ["Normal", "Fairy"], ability: "Serene Grace / Simple (hidden: Moody)", stats: [65, 35, 50, 70, 60, 40], role: "Special support", moves: ["Fairy Wind", "Draining Kiss", "Wish", "Round", "Dazzling Gleam", "Hyper Voice", "Moonblast", "Calm Mind", "Fly"], designer: "rabitt", added: "2025-02-14" },
    { row: 10, name: "Bidoof (King)",          group: "bidoof", where: ["Plains"], types: ["Normal", "Psychic"], ability: "Dazzling / Simple (hidden: Moody)", stats: [70, 70, 60, 30, 50, 40], role: "Physical royal", moves: ["Quick Attack", "Body Slam", "Zen Headbutt", "Stomping Tantrum", "Double-Edge", "Psychic Fangs", "Bulk Up"], designer: "Lazaro", added: "2025-03-03" },
    { row: 11, name: "Bidoof (Queen)",         group: "bidoof", where: ["Plains"], types: ["Normal", "Psychic"], ability: "Queenly Majesty / Simple (hidden: Moody)", stats: [70, 30, 50, 70, 60, 40], role: "Special royal", moves: ["Confusion", "Round", "Psybeam", "Calm Mind", "Hyper Voice", "Psychic", "Dazzling Gleam"], designer: "Lazaro", added: "2025-03-03" },
    { row: 12, name: "Bidoof (Scuba)",         group: "bidoof", where: ["Ocean", "Deep Ocean"], types: ["Water", "Ground"], ability: "Water Absorb / Simple (hidden: Moody)", stats: [70, 60, 60, 45, 55, 30], role: "Bulky water", moves: ["Water Gun", "Mud-Slap", "Aqua Jet", "Bulldoze", "Water Pulse", "Aqua Tail", "Liquidation", "Earthquake", "Surf", "Scald"], designer: "Lazaro", added: "2025-03-03" },
    { row: 13, name: "Bidoof (Kratos)",        group: "bidoof", where: ["Jagged Peaks", "Frozen Peaks"], types: ["Fighting"], ability: "Defiant / Simple (hidden: Moody)", stats: [60, 85, 55, 30, 45, 45], role: "Glass cannon", moves: ["Rock Smash", "Shadow Sneak", "Double Kick", "Brick Break", "Shadow Claw", "Close Combat", "Reversal", "Bulk Up"], designer: "Bowtie", added: "2025-03-28" },
    { row: 14, name: "Bidoof (Aloy)",          group: "bidoof", where: ["Jungle"], types: ["Grass", "Steel"], ability: "Sniper / Simple (hidden: Moody)", stats: [60, 80, 55, 35, 45, 45], role: "Physical attacker", moves: ["Vine Whip", "Metal Claw", "Razor Leaf", "Iron Head", "Seed Bomb", "Leaf Blade", "Flash Cannon", "Swords Dance"], designer: "Bowtie", added: "2025-03-28" },
    { row: 15, name: "Bidoof (Ratchet & Clank)", group: "bidoof", where: ["Trial Chambers"], types: ["Steel", "Flying"], ability: "Analytic / Simple (hidden: Moody)", stats: [60, 40, 55, 75, 45, 45], role: "Special attacker", moves: ["Metal Claw", "Gust", "Air Cutter", "Flash Cannon", "Charge Beam", "Air Slash", "Iron Head", "Steel Beam", "Roost", "Volt Switch"], designer: "Bowtie", added: "2025-03-28" },
    { row: 16, name: "Bidoof (Astro Bot)",     group: "bidoof", where: ["The End"], types: ["Electric"], ability: "Motor Drive / Simple (hidden: Moody)", stats: [60, 40, 60, 55, 55, 50], role: "Fast special attacker", moves: ["Thunder Shock", "Gust", "Spark", "Air Cutter", "Electro Ball", "Air Slash", "Discharge", "Roost", "Volt Switch"], designer: "Bowtie", added: "2025-03-28" },
    { row: 17, name: "Bidoof (Sly Cooper)",    group: "bidoof", where: ["Taiga"], types: ["Dark", "Ghost"], ability: "Pickpocket / Simple (hidden: Moody)", stats: [60, 50, 65, 35, 65, 45], role: "Sneaky physical attacker", moves: ["Thief", "Astonish", "Feint Attack", "Shadow Sneak", "Sucker Punch", "Shadow Claw", "Knock Off", "Foul Play", "U-turn", "Phantom Force"], designer: "Bowtie", added: "2025-03-28" },
    { row: 18, name: "Bidoof (Mario)",         group: "bidoof", where: ["Basalt Deltas", "Nether Wastes", "Crimson Forest", "Warped Forest"], types: ["Fire"], ability: "Blaze / Simple (hidden: Moody)", stats: [60, 70, 45, 60, 45, 40], role: "Mixed attacker", moves: ["Ember", "Rock Smash", "Flame Charge", "Double Kick", "Fire Fang", "High Jump Kick", "Flare Blitz", "Flamethrower"], designer: "Bowtie", added: "2025-04-19" },
    { row: 19, name: "Bidoof (Luigi)",         group: "bidoof", where: ["Basalt Deltas", "Nether Wastes", "Warped Forest"], types: ["Ghost"], ability: "Cursed Body / Simple (hidden: Moody)", stats: [60, 45, 50, 70, 50, 45], role: "Special attacker", moves: ["Astonish", "Shadow Sneak", "Hex", "Shadow Claw", "Shadow Ball", "Phantom Force", "Will-O-Wisp", "Thunderbolt"], designer: "Bowtie", added: "2025-04-19" },
    { row: 20, name: "Bidoof (Wario)",         group: "bidoof", where: ["Badlands"], types: ["Poison"], ability: "Stench / Simple (hidden: Moody)", stats: [70, 60, 55, 30, 55, 50], role: "Bulky physical attacker", moves: ["Poison Gas", "Acid", "Bite", "Poison Fang", "Crunch", "Poison Jab", "Knock Off", "Toxic"], designer: "Bowtie", added: "2025-04-19" },
    { row: 21, name: "Bidoof (Waluigi)",       group: "bidoof", where: ["Mushroom Fields"], types: ["Dark", "Poison"], ability: "Prankster / Simple (hidden: Moody)", stats: [60, 45, 55, 60, 55, 45], role: "Trickster / special", moves: ["Feint Attack", "Acid", "Snarl", "Torment", "Dark Pulse", "Sludge Bomb", "Foul Play", "Nasty Plot", "Taunt"], designer: "Bowtie", added: "2025-04-19" },
    { row: 22, name: "Bidoof (Donkey Kong)",   group: "bidoof", where: ["Jungle"], types: ["Fighting", "Grass"], ability: "Gorilla Tactics / Simple (hidden: Moody)", stats: [70, 85, 55, 30, 45, 35], role: "Physical bruiser", moves: ["Rock Smash", "Vine Whip", "Bullet Seed", "Brick Break", "Seed Bomb", "Hammer Arm", "Wood Hammer", "Bulk Up"], designer: "Bowtie", added: "2025-04-19" },
    { row: 23, name: "Bidoof (Zelda, Breath of the Wild)", group: "bidoof", where: ["Sunflower Plains"], types: ["Grass"], ability: "Wind Rider / Simple (hidden: Moody)", stats: [60, 45, 50, 65, 55, 45], role: "Special attacker", moves: ["Vine Whip", "Gust", "Razor Leaf", "Air Cutter", "Magical Leaf", "Air Slash", "Energy Ball", "Leaf Storm", "Roost"], designer: "Bowtie", added: "2025-04-19" },
    { row: 24, name: "Bidoof (Zelda, Echoes of Wisdom)",   group: "bidoof", where: ["Cherry Grove"], types: ["Psychic"], ability: "Magic Bounce / Simple (hidden: Moody)", stats: [60, 35, 50, 75, 55, 45], role: "Special support", moves: ["Confusion", "Psybeam", "Calm Mind", "Psyshock", "Psychic", "Future Sight", "Reflect", "Light Screen"], designer: "Bowtie", added: "2025-04-19" },

    { row: 26, name: "Campion Milotic",   group: "campion", species: "Milotic",   dex: "#350", form: "Campion form", types: ["Ground", "Poison"],  rarity: "Ultra Rare", where: ["Mangrove Swamp"], how: "Evolve Feebas at level 60 in a mangrove swamp", ability: "Unaware / Toxic Debris (hidden: Water Absorb)", designer: "Jet / Doctor X / Bife", added: "2025-04-30", stats: [100, 120, 130, 70, 90, 100] },
    { row: 27, name: "Campion Heracross", group: "campion", species: "Heracross", dex: "#214", form: "Campion form", types: ["Bug", "Fire"],       rarity: "Uncommon",   where: ["Wooded Badlands"], ability: "Reckless / Tough Claws (hidden: Iron Fist)", designer: "Jet / Doctor X / Bife", added: "2025-04-30", stats: [85, 125, 105, 55, 75, 115] },
    { row: 28, name: "Pachimitsu",        group: "evo",     species: "Pachimitsu", dex: "New evolution", form: "Evolves from Pachirisu", types: ["Electric", "Fairy"], rarity: "Uncommon", where: ["Forest"], how: "Use a Shiny Stone on Pachirisu", ability: "Cute Charm / Intimidate / Volt Absorb / Static (hidden: Pixilate)", designer: "Jet / Bowtie", added: "2025-05-24", stats: [75, 145, 75, 30, 80, 145] },
    { row: 29, name: "Campion Gligar",    group: "campion", species: "Gligar",    dex: "#207", form: "Campion form", types: ["Grass"],             rarity: "Rare",       where: ["Forest", "Taiga"], ability: "Chlorophyll / Hyper Cutter / Harvest (hidden: Technician)", designer: "Jet / Doctor X", added: "2025-05-24", stats: [65, 75, 95, 40, 70, 85] },
    { row: 30, name: "Glipine",           group: "evo",     species: "Glipine",   dex: "New evolution", form: "Evolves from Campion Gligar", types: ["Grass", "Dragon"], rarity: "Rare", where: ["Forest", "Taiga"], how: "Use a Leaf Stone on Campion Gligar at night", ability: "Chlorophyll / Hyper Cutter / Harvest (hidden: Technician)", designer: "Jet / Doctor X", added: "2025-05-24", stats: [78, 125, 116, 64, 86, 96] },
    { row: 31, name: "Campion Flamigo",   group: "campion", species: "Flamigo",   dex: "#973", form: "Campion form", types: ["Fighting", "Psychic"], rarity: "Rare",     where: ["Ruins", "Arch Ruins (underground)", "Woodland Mansion", "Fresh water (not frozen)"], ability: "Inner Focus / Competitive", designer: "Jet / Bowtie", added: "2025-07-04", stats: [75, 80, 75, 135, 80, 105] },
    { row: 32, name: "Campion Spiritomb", group: "campion", species: "Spiritomb", dex: "#442", form: "Campion form", types: ["Ghost", "Fire"],     rarity: "Rare",       where: ["Near campfires", "Any biome"], ability: "Chlorophyll / Solar Power (hidden: Shadow Tag)", designer: "Baumbs / Bowtie", added: "2026-08-30", stats: [100, 55, 85, 125, 85, 95] }
  ],

  evolutions: [
    ["Campion Gligar", "Leaf Stone, at night", "Glipine"],
    ["Pachirisu", "Shiny Stone", "Pachimitsu"],
    ["Feebas", "Level 60 in a mangrove swamp", "Campion Milotic"]
  ]
};
