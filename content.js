// Everything on the site that changes lives in this one file.
// Edit it, commit, push — GitHub Pages rebuilds in about a minute.
window.CC = {
  site: {
    address: "play.campcobblemon.net",
    discord: "https://discord.com/invite/fWGNXbbjsd",
    modrinth: "https://modrinth.com/modpack/camp-cobblemon-modpack",
    map: "https://map.campcobblemon.net",
    paypal: "https://paypal.me/campcobblemon"
  },

  // ISO time Season 2 opens. Before this the home page says "opens…", after it says "is live".
  season2Opens: "2026-09-11T22:00:00-04:00",

  // Costume Bidoof typings, abilities and stats below are from datapack v2.0 (the rebalance).
  // The Pokédex "not live yet" notice retires itself at season2Opens, since the v2.0 datapack
  // goes on with the new world. Only set this true to force it down earlier.
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
      blurb: "Where it started. August to December 2024, just under five months before the first reset.",
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
      end: "2026-09-09T19:00:00-04:00",
      dates: "Dec 27, 2024 – Sep 9, 2026",
      blurb: "Our longest world. Updated in place from 1.6 to 1.7.3 as Cobblemon moved forward. It closed on September 9, 2026 so we could get Season 2 ready.",
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
      start: "2026-09-11T22:00:00-04:00",
      end: "",
      dates: "Sep 11, 2026 –",
      blurb: "A brand new world on modpack 2.0.0, with triple shiny rates on weekends and the new event trophies.",
      logo: "assets/logo.png",
      shots: [],
      shotsNote: "Screenshots will be added after the world opens.",
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
  // Descriptive captions based on the screenshots, not official build titles.
  // Optional creator: "Verified player name" adds a visible credit; omit unknown credits.
  shots: {
    "s0-01": {
      "caption": "Bidoof from the beginning",
      "alt": "A large Bidoof sculpture standing on a raised stone plinth in Season 0."
    },
    "s1-01": {
      "caption": "Riverside stonework",
      "alt": "A lantern-lined stone walkway beside a river and a high arched bridge."
    },
    "s1-02": {
      "caption": "A visitor in the snow",
      "alt": "A costumed Bidoof beside a snowy path beneath trees."
    },
    "s1-03": {
      "caption": "Pokémon on a snowy path",
      "alt": "Several Pokémon among snow-covered trees."
    },
    "s1-04": {
      "caption": "A lantern-lit room",
      "alt": "A pale stone room with hanging lanterns and wall art."
    },
    "s1-05": {
      "caption": "Artwork in the hallway",
      "alt": "Framed pixel art between hanging lanterns in a pale stone hallway."
    },
    "s1-06": {
      "caption": "A little Ditto art",
      "alt": "A pink Ditto picture mounted on a lantern-lit stone wall."
    },
    "s1-07": {
      "caption": "Inside the gathering room",
      "alt": "A long room with dark wooden beams, windows, and tables."
    },
    "s1-08": {
      "caption": "An island after dark",
      "alt": "A small illuminated island beneath a starry night sky."
    },
    "s1-09": {
      "caption": "The underground art wall",
      "alt": "Pictures displayed on a torch-lit wall in an underground room."
    },
    "s1-10": {
      "caption": "Pagoda above the jungle",
      "alt": "A tall red-roofed pagoda rising above dense green treetops."
    },
    "s1-11": {
      "caption": "Red roofs and green treetops",
      "alt": "A red pagoda seen from above the surrounding jungle."
    },
    "s1-12": {
      "caption": "The pagoda from above",
      "alt": "An aerial view of a multi-tiered pagoda above the jungle canopy."
    },
    "s1-13": {
      "caption": "Through the bamboo",
      "alt": "A waterway between dense bamboo leads toward a large domed building."
    },
    "s1-14": {
      "caption": "The hillside at dusk",
      "alt": "A dark, wooded hillside with buildings and tall beacon beams."
    },
    "s1-15": {
      "caption": "A red horizon",
      "alt": "A player view across a red-orange horizon."
    },
    "s1-16": {
      "caption": "Lights along the river",
      "alt": "Illuminated stone buildings beside a river after dark."
    },
    "s1-17": {
      "caption": "Beacons under the aurora",
      "alt": "Colorful beacon beams above a dark tower in a snowy landscape beneath an aurora."
    },
    "s1-18": {
      "caption": "The settlement at night",
      "alt": "An illuminated settlement stretches from snowy ground toward the water."
    },
    "s1-19": {
      "caption": "Farmland after dark",
      "alt": "A lit path winds between crop fields and houses at night."
    },
    "s1-20": {
      "caption": "Moonlight on the water",
      "alt": "A lit waterfront house and bridge beneath the moon."
    },
    "s1-21": {
      "caption": "A path in the evening sun",
      "alt": "A hillside path among trees and buildings in warm evening light."
    },
    "s1-22": {
      "caption": "Hillside flowers",
      "alt": "Beds of colorful flowers arranged along a grassy hillside."
    },
    "s1-23": {
      "caption": "Across the green valley",
      "alt": "A view over green hills, fields, and wooden buildings."
    },
    "s1-24": {
      "caption": "Everything in its place",
      "alt": "Rows of labeled storage drawers line a compact room with a blue floor."
    },
    "s1-25": {
      "caption": "Terraced fields",
      "alt": "Curved terraces of crops run down a hillside beside a path."
    },
    "s1-26": {
      "caption": "A home above the bamboo",
      "alt": "A wooden building on a raised platform above a dense bamboo grove."
    },
    "s1-27": {
      "caption": "Dark towers and pink trees",
      "alt": "A dark-roofed building with pointed towers stands beside pink flowering trees."
    },
    "s1-28": {
      "caption": "A tower in the snow",
      "alt": "A tiered stone tower rises from a snow-covered mountain slope."
    },
    "s1-29": {
      "caption": "Pagoda by the cliff",
      "alt": "A red pagoda stands beside a tall cliff with a large block-art figure."
    },
    "s1-30": {
      "caption": "Building by the water",
      "alt": "Palm-like trees, a gold-colored pyramid, and a tall purple structure beside the water."
    },
    "s1-31": {
      "caption": "Waterfront landmarks",
      "alt": "A wide view of waterfront builds including a gold-colored pyramid and a purple tower."
    },
    "s1-32": {
      "caption": "Pale stone by the river",
      "alt": "A pale stone complex connected by paths beside a river and woodland."
    },
    "s1-33": {
      "caption": "Below the surface",
      "alt": "A purple-lit chamber with a portal at the end of a short walkway."
    },
    "s1-34": {
      "caption": "Rain over camp",
      "alt": "Rain falls across tree-covered builds and tall beacon beams."
    },
    "s1-35": {
      "caption": "A rainy afternoon",
      "alt": "An elevated view of trees and community builds in the rain."
    },
    "s1-36": {
      "caption": "Camp in the evening",
      "alt": "Large trees and community builds beneath a dusky sky and beacon beams."
    },
    "s1-37": {
      "caption": "The big tree",
      "alt": "A large leafy tree with structures around its trunk on a grassy plateau."
    },
    "s1-38": {
      "caption": "Around the river bend",
      "alt": "A broad river bend surrounded by stonework, paths, trees, and builds."
    },
    "s1-39": {
      "caption": "The garden path",
      "alt": "A path curves past colorful planted beds and community builds."
    },
    "s1-40": {
      "caption": "A quiet night at camp",
      "alt": "Trees and stonework beside the water after dark."
    },
    "s1-41": {
      "caption": "A tree beside the river",
      "alt": "A broad leafy tree on a landscaped riverbank near a tall wooden structure."
    },
    "s1-42": {
      "caption": "The riverside cliffs",
      "alt": "A bridge crosses the river below a tall stone cliff topped with a tree and Pokémon builds."
    },
    "s1-43": {
      "caption": "Along the camp paths",
      "alt": "Wide paths connect planted areas and tree-shaped structures."
    },
    "s1-44": {
      "caption": "A landmark among the gardens",
      "alt": "A tall red-and-dark structure rises above landscaped paths and planted beds."
    },
    "s1-45": {
      "caption": "The mushroom house",
      "alt": "A large mushroom-shaped building sits on a landscaped stone mound."
    },
    "s1-46": {
      "caption": "Down the spiral",
      "alt": "A beacon beam runs through a deep circular room ringed with lit balconies."
    },
    "s1-47": {
      "caption": "A room around a beacon",
      "alt": "Looking down into a large circular chamber with layered balconies and a central beacon."
    },
    "s1-48": {
      "caption": "The sheltered waterway",
      "alt": "A narrow, planted waterway runs through an opening beneath a tall stone structure."
    },
    "s1-49": {
      "caption": "Water below the stone arch",
      "alt": "Flowers and lanterns line the water under a massive stone arch."
    },
    "s1-50": {
      "caption": "A lantern-lit passage",
      "alt": "A path winds through a shaded passage lined with timber, plants, and lanterns."
    },
    "s1-51": {
      "caption": "The garden gate",
      "alt": "A small planted gateway and stone path on a grassy terrace."
    },
    "s1-52": {
      "caption": "Windmill on the hill",
      "alt": "A white windmill stands on a grassy hill beside stone walls."
    },
    "s1-53": {
      "caption": "A lane through the village",
      "alt": "A stone lane runs between timber buildings, gardens, and trees."
    },
    "s1-54": {
      "caption": "A window into the build",
      "alt": "A broad window set in a turquoise wall reveals a furnished interior."
    },
    "s1-55": {
      "caption": "The open green",
      "alt": "An open grassy area with paths, small trees, and a tall beacon structure."
    },
    "s1-56": {
      "caption": "A home beside the bamboo",
      "alt": "A wooden house and raised garden beside tall bamboo."
    },
    "s1-57": {
      "caption": "Gardens across the hillside",
      "alt": "Terraced plots, small roofs, and a large framed structure on a green hillside."
    },
    "s1-58": {
      "caption": "Crops along the terraces",
      "alt": "Rows of crops follow a stepped hillside beside paths and stone retaining walls."
    },
    "s1-59": {
      "caption": "A house by the path",
      "alt": "A tall, narrow timber house with a steep roof beside a village path."
    },
    "s1-60": {
      "caption": "A house on the river",
      "alt": "A stone-and-timber house overlooks a calm river surrounded by green hills."
    },
    "s1-61": {
      "caption": "The leafy neighborhood",
      "alt": "Timber houses and paths tucked among trees beside the river."
    },
    "s1-62": {
      "caption": "Towers in the garden",
      "alt": "A dark-roofed building with pointed towers surrounded by greenery and pink trees."
    },
    "s1-63": {
      "caption": "Fields by the shore",
      "alt": "Large rectangular crop fields and a central beacon beside open water."
    },
    "s1-64": {
      "caption": "Homes and farmland",
      "alt": "Timber houses, fenced gardens, and crop fields along broad paths."
    },
    "s1-65": {
      "caption": "The river tower",
      "alt": "A tall stone-and-timber tower beside a broad river at sunset."
    },
    "s1-66": {
      "caption": "A dome beyond the bamboo",
      "alt": "A tall domed building at the end of a narrow waterway framed by bamboo."
    }
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
    { row: 5,  name: "Bidoof (Helldivers)",    group: "bidoof", where: ["The End"], types: ["Steel", "Fighting"], ability: "Justified / Simple (hidden: Moody)", stats: [60, 85, 65, 30, 45, 35], role: "Armored bruiser", rarity: "Ultra Rare", moves: ["Metal Claw", "Rock Smash", "Brick Break", "Iron Head", "Body Press", "Close Combat", "Flash Cannon", "Bulk Up"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in The End. It appears to be in some kind of advanced getup.", designer: "maashous", added: "2025-01-06" },
    { row: 6,  name: "Bidoof (Barbie)",        group: "bidoof", where: ["Desert"], types: ["Fairy"], ability: "Cute Charm / Simple (hidden: Moody)", stats: [65, 35, 50, 75, 55, 40], role: "Special attacker", rarity: "Ultra Rare", moves: ["Baby-Doll Eyes", "Fairy Wind", "Disarming Voice", "Draining Kiss", "Dazzling Gleam", "Moonblast", "Play Rough", "Calm Mind"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in desert areas. It appears to be mimicking some sort of famous female icon.", designer: "maashous", added: "2025-01-06" },
    { row: 7,  name: "Bidoof (Ruby)",          group: "bidoof", where: ["Snowy Peaks", "Stony Peaks", "Jagged Peaks", "Frozen Peaks"], types: ["Rock", "Fire"], ability: "Solid Rock / Simple (hidden: Moody)", stats: [65, 80, 60, 40, 35, 40], role: "Physical wall-breaker", rarity: "Ultra Rare", moves: ["Ember", "Rock Throw", "Flame Charge", "Rock Slide", "Fire Fang", "Stone Edge", "Flamethrower", "Earth Power"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the mountains. It resembles a cheerful, high-spirited renowned idol from a distant land.", designer: "Dogtor Bloo", added: "2025-01-11" },
    { row: 8,  name: "Bidoof (Aqua)",          group: "bidoof", where: ["Snowy Peaks", "Stony Peaks", "Jagged Peaks", "Frozen Peaks"], types: ["Water", "Ice"], ability: "Swift Swim / Simple (hidden: Moody)", stats: [60, 40, 50, 70, 55, 45], role: "Rain sweeper", rarity: "Ultra Rare", moves: ["Water Gun", "Powder Snow", "Aqua Jet", "Icy Wind", "Surf", "Ice Shard", "Hydro Pump", "Scald", "Rain Dance"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the mountains. It resembles a calm, collected famous actor from a distant land.", designer: "Dogtor Bloo", added: "2025-01-11" },
    { row: 9,  name: "Bidoof (Angel)",         group: "bidoof", where: ["Snowy Peaks", "Stony Peaks", "Jagged Peaks", "Frozen Peaks"], types: ["Normal", "Fairy"], ability: "Serene Grace / Simple (hidden: Moody)", stats: [65, 35, 50, 70, 60, 40], role: "Special support", rarity: "Ultra Rare", moves: ["Fairy Wind", "Draining Kiss", "Wish", "Round", "Dazzling Gleam", "Hyper Voice", "Moonblast", "Calm Mind", "Fly"], flavor: "A variation of Bidoof from Camp Cobblemon in a divine angel outfit. It seems to appear when many people are celebrating love for each other.", designer: "rabitt", added: "2025-02-14" },
    { row: 10, name: "Bidoof (King)",          group: "bidoof", where: ["Plains"], types: ["Normal", "Psychic"], ability: "Dazzling / Simple (hidden: Moody)", stats: [70, 70, 60, 30, 50, 40], role: "Physical royal", rarity: "Ultra Rare", moves: ["Quick Attack", "Body Slam", "Zen Headbutt", "Stomping Tantrum", "Double-Edge", "Psychic Fangs", "Bulk Up"], flavor: "A variation of Bidoof from Camp Cobblemon in a noble king outfit. Bidoof looks especially majestic with the shining crown.", designer: "Lazaro", added: "2025-03-03" },
    { row: 11, name: "Bidoof (Queen)",         group: "bidoof", where: ["Plains"], types: ["Normal", "Psychic"], ability: "Queenly Majesty / Simple (hidden: Moody)", stats: [70, 30, 50, 70, 60, 40], role: "Special royal", rarity: "Ultra Rare", moves: ["Confusion", "Round", "Psybeam", "Calm Mind", "Hyper Voice", "Psychic", "Dazzling Gleam"], flavor: "A variation of Bidoof from Camp Cobblemon in an elegant queen outfit. Bidoof looks especially enchanting with the gleaming tiara.", designer: "Lazaro", added: "2025-03-03" },
    { row: 12, name: "Bidoof (Scuba)",         group: "bidoof", where: ["Ocean", "Deep Ocean"], types: ["Water"], ability: "Volt Absorb / Simple (hidden: Moody)", stats: [70, 60, 60, 45, 55, 30], role: "Bulky water", rarity: "Ultra Rare", moves: ["Water Gun", "Bubble", "Aqua Jet", "Waterfall", "Dive", "Aqua Tail", "Liquidation", "Surf", "Rain Dance"], flavor: "A variation of Bidoof from Camp Cobblemon. It appears to be properly equipped with some kind of diving gear.", designer: "Lazaro", added: "2025-03-03" },
    { row: 13, name: "Bidoof (Kratos)",        group: "bidoof", where: ["Frozen Peaks", "Jagged Peaks", "Snowy Slopes"], types: ["Fire", "Ice"], ability: "Defiant / Simple (hidden: Moody)", stats: [60, 85, 55, 30, 50, 40], role: "Slow, heavy hitter", rarity: "Ultra Rare", moves: ["Ember", "Powder Snow", "Fire Fang", "Ice Fang", "Flame Charge", "Ice Shard", "Flare Blitz", "Avalanche", "Close Combat", "Bulk Up"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the freezing mountains. Despite its appearance, it is seething with unbridled rage.", designer: "Bowtie", added: "2025-03-28" },
    { row: 14, name: "Bidoof (Aloy)",          group: "bidoof", where: ["Jungle"], types: ["Grass", "Steel"], ability: "Sniper / Simple (hidden: Moody)", stats: [60, 80, 55, 35, 45, 45], role: "Physical attacker", rarity: "Ultra Rare", moves: ["Vine Whip", "Metal Claw", "Razor Leaf", "Iron Head", "Seed Bomb", "Leaf Blade", "Flash Cannon", "Swords Dance"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in deep jungles. It seems to have come from an odd, distant place where robots animals are the norm.", designer: "Bowtie", added: "2025-03-28" },
    { row: 15, name: "Bidoof (Ratchet & Clank)", group: "bidoof", where: ["Trial Chambers"], types: ["Steel", "Flying"], ability: "Analytic / Simple (hidden: Moody)", stats: [60, 40, 55, 70, 50, 45], role: "Special attacker", rarity: "Ultra Rare", moves: ["Metal Claw", "Gust", "Air Cutter", "Flash Cannon", "Charge Beam", "Air Slash", "Iron Head", "Steel Beam", "Roost", "Volt Switch"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in trial chambers. Seems to resemble a peculiar pair: a lombax and a robot with a knack for adventure.", designer: "Bowtie", added: "2025-03-28" },
    { row: 16, name: "Bidoof (Astro Bot)",     group: "bidoof", where: ["The End"], types: ["Electric"], ability: "Motor Drive / Simple (hidden: Moody)", stats: [60, 40, 60, 55, 55, 50], role: "Fast special attacker", rarity: "Ultra Rare", moves: ["Thunder Shock", "Gust", "Spark", "Air Cutter", "Electro Ball", "Air Slash", "Discharge", "Roost", "Volt Switch"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in The End. This Bidoof is told of being a symbol of celebration among a certain video game company.", designer: "Bowtie", added: "2025-03-28" },
    { row: 17, name: "Bidoof (Sly Cooper)",    group: "bidoof", where: ["Taiga"], types: ["Dark"], ability: "Pickpocket / Simple (hidden: Moody)", stats: [60, 75, 50, 35, 55, 45], role: "Sneaky physical attacker", rarity: "Ultra Rare", moves: ["Thief", "Quick Attack", "Feint Attack", "Bite", "Sucker Punch", "Night Slash", "Knock Off", "Foul Play", "U-turn", "Taunt"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the taigas. It is said this Bidoof is a master thief, coming from a long line of legendary thieves. ", designer: "Bowtie", added: "2025-03-28" },
    { row: 18, name: "Bidoof (Mario)",         group: "bidoof", where: ["Basalt Deltas", "Nether Wastes", "Crimson Forest", "Warped Forest"], types: ["Fire"], ability: "Blaze / Simple (hidden: Moody)", stats: [60, 70, 45, 60, 45, 40], role: "Mixed attacker", rarity: "Ultra Rare", moves: ["Ember", "Rock Smash", "Flame Charge", "Double Kick", "Fire Fang", "High Jump Kick", "Flare Blitz", "Flamethrower"], flavor: " A variation of Bidoof from Camp Cobblemon that can be found in the crimson forests of the Nether. It appears that this Bidoof loves jumping down pipes and stomping Goombas.", designer: "Bowtie", added: "2025-04-19" },
    { row: 19, name: "Bidoof (Luigi)",         group: "bidoof", where: ["Basalt Deltas", "Nether Wastes", "Warped Forest"], types: ["Ice"], ability: "Refrigerate / Simple (hidden: Moody)", stats: [60, 70, 50, 45, 50, 45], role: "Physical attacker (ice balls)", rarity: "Ultra Rare", moves: ["Powder Snow", "Ice Shard", "Ice Fang", "Avalanche", "Icicle Crash", "Double-Edge", "Blizzard", "Ice Beam"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the warped forests of the Nether. A timid Bidoof that tends to look for its partner.", designer: "Bowtie", added: "2025-04-19" },
    { row: 20, name: "Bidoof (Wario)",         group: "bidoof", where: ["Badlands"], types: ["Poison"], ability: "Stench / Simple (hidden: Moody)", stats: [70, 60, 55, 40, 55, 40], role: "Bulky physical attacker", rarity: "Ultra Rare", moves: ["Poison Gas", "Acid", "Bite", "Poison Fang", "Crunch", "Poison Jab", "Knock Off", "Toxic"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the badlands. It likes to only surround itself with money and constantly says 'WAHAHAHAHA'.", designer: "Bowtie", added: "2025-04-19" },
    { row: 21, name: "Bidoof (Waluigi)",       group: "bidoof", where: ["Mushroom Fields"], types: ["Dark", "Poison"], ability: "Prankster / Simple (hidden: Moody)", stats: [60, 45, 55, 60, 55, 45], role: "Trickster / special", rarity: "Ultra Rare", moves: ["Feint Attack", "Acid", "Snarl", "Torment", "Dark Pulse", "Sludge Bomb", "Foul Play", "Nasty Plot", "Taunt"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the mushroom fields. Live, Laugh, Waluigi.", designer: "Bowtie", added: "2025-04-19" },
    { row: 22, name: "Bidoof (Donkey Kong)",   group: "bidoof", where: ["Jungle"], types: ["Fighting", "Grass"], ability: "Gorilla Tactics / Simple (hidden: Moody)", stats: [70, 85, 55, 30, 45, 35], role: "Physical bruiser", rarity: "Ultra Rare", moves: ["Rock Smash", "Vine Whip", "Bullet Seed", "Brick Break", "Seed Bomb", "Hammer Arm", "Wood Hammer", "Bulk Up"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the jungles. It searches the trees of the jungle biome for bananas, which don't spawn.", designer: "Bowtie", added: "2025-04-19" },
    { row: 23, name: "Bidoof (Zelda, Breath of the Wild)", group: "bidoof", where: ["Sunflower Plains"], types: ["Grass"], ability: "Wind Rider / Simple (hidden: Moody)", stats: [60, 45, 50, 65, 55, 45], role: "Special attacker", rarity: "Ultra Rare", moves: ["Vine Whip", "Gust", "Razor Leaf", "Air Cutter", "Magical Leaf", "Air Slash", "Energy Ball", "Leaf Storm", "Roost"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the sunflower plains. Resembles a princess from a faraway land that has discovered ancient technology.", designer: "Bowtie", added: "2025-04-19" },
    { row: 24, name: "Bidoof (Zelda, Echoes of Wisdom)",   group: "bidoof", where: ["Cherry Grove"], types: ["Psychic"], ability: "Magic Bounce / Simple (hidden: Moody)", stats: [60, 35, 50, 75, 55, 45], role: "Special support", rarity: "Ultra Rare", moves: ["Confusion", "Psybeam", "Calm Mind", "Psyshock", "Psychic", "Future Sight", "Reflect", "Light Screen"], flavor: "A variation of Bidoof from Camp Cobblemon that can be found in the cherry groves. Resembles a princess from a faraway land protects her people.", designer: "Bowtie", added: "2025-04-19" },
    { row: 33, name: "Bidoof (Camper)",        group: "bidoof", where: ["Forest", "Taiga", "Plains", "Meadow"], types: ["Normal"], ability: "Intimidate / Simple (hidden: Moody)", stats: [75, 58, 51, 45, 51, 40], role: "Well-rounded camper", rarity: "Rare", moves: ["Camouflage", "Round", "Nature Power", "Body Slam", "Bulk Up", "Double-Edge", "Slack Off", "Rest", "Work Up"], flavor: "A variation of Bidoof from Camp Cobblemon, at home in forests, plains and meadows. It comes prepared for a night outdoors and carries a pack of its own. The camp's favourite.", designer: "tortu152", added: "2026-09-11" },
    { row: 34, name: "Bidoof (Spider-Man)",   group: "bidoof", where: ["Towns and cities", "Villages"], types: ["Bug", "Flying"], ability: "Anticipation / Simple (hidden: Moody)", stats: [55, 75, 55, 35, 45, 55], role: "Fast physical attacker", rarity: "Ultra Rare", moves: ["String Shot", "Quick Attack", "Bug Bite", "Aerial Ace", "Spider Web", "Lunge", "X-Scissor", "Skitter Smack", "U-turn", "Agility"], flavor: "A variation of Bidoof from Camp Cobblemon that turns up wherever people build towns and cities. It wears the mask of a famous web-slinging hero, and senses danger before it arrives.", designer: "tortu152", added: "2026-09-11" },
    { row: 35, name: "Bidoof (Subaru)",       group: "bidoof", where: ["Dark Forest, at night"], types: ["Ghost", "Dragon"], ability: "Sturdy / Simple (hidden: Moody)", stats: [65, 40, 55, 70, 45, 45], role: "Refuses to stay down", rarity: "Ultra Rare", moves: ["Astonish", "Dragon Breath", "Endure", "Hex", "Dragon Pulse", "Destiny Bond", "Shadow Ball", "Protect", "Dragon Dance"], flavor: "A variation of Bidoof from Camp Cobblemon that appears in dark forests at night. It resembles a boy from another world who refuses to stay down, however many times it falls. Trainers swear it already knows how the battle ends.", designer: "tortu152", added: "2026-09-11" },

    { row: 26, name: "Campion Milotic",   group: "campion", species: "Milotic",   dex: "#350", form: "Campion form", types: ["Ground", "Poison"],  rarity: "Ultra Rare", where: ["Mangrove Swamp"], how: "Evolve Feebas at level 60 in a mangrove swamp", ability: "Unaware / Toxic Debris (hidden: Water Absorb)", flavor: "It is rumored that this Milotic was first seen hiding in the mud of the Karp River. When hungry, it uses its tail to lure in its prey.", designer: "Jet / Doctor X / Bife", added: "2025-04-30", stats: [100, 120, 130, 70, 90, 100] },
    { row: 27, name: "Campion Heracross", group: "campion", species: "Heracross", dex: "#214", form: "Campion form", types: ["Bug", "Fire"],       rarity: "Uncommon",   where: ["Wooded Badlands"], ability: "Reckless / Tough Claws (hidden: Iron Fist)", flavor: "Surrounding Camp Cobblemon are hot badlands filled with trees. To survive this climate, Heracross had to adapt to the heat.", designer: "Jet / Doctor X / Bife", added: "2025-04-30", stats: [85, 125, 105, 55, 75, 115] },
    { row: 28, name: "Pachimitsu",        group: "evo",     species: "Pachimitsu", dex: "New evolution", form: "Evolves from Pachirisu", types: ["Electric", "Fairy"], rarity: "Uncommon", where: ["Forest"], how: "Use a Shiny Stone on Pachirisu", ability: "Cute Charm / Intimidate / Volt Absorb / Static (hidden: Pixilate)", flavor: "Camp Cobblemon's very own idol, Pachimitsu dazzles the competition with her fast, ferocious, performances.", designer: "Jet / Bowtie", added: "2025-05-24", stats: [75, 145, 75, 30, 80, 145] },
    { row: 29, name: "Campion Gligar",    group: "campion", species: "Gligar",    dex: "#207", form: "Campion form", types: ["Grass"],             rarity: "Rare",       where: ["Forest", "Taiga"], ability: "Chlorophyll / Hyper Cutter / Harvest (hidden: Technician)", flavor: "After the Nether was taken over by campers, some Gligar migrated back to the Overworld. Their colors changed to blend in more with their surroundings.", designer: "Jet / Doctor X", added: "2025-05-24", stats: [65, 75, 95, 40, 70, 85] },
    { row: 30, name: "Glipine",           group: "evo",     species: "Glipine",   dex: "New evolution", form: "Evolves from Campion Gligar", types: ["Grass", "Dragon"], rarity: "Rare", where: ["Forest", "Taiga"], how: "Use a Leaf Stone on Campion Gligar at night", ability: "Chlorophyll / Hyper Cutter / Harvest (hidden: Technician)", flavor: "This Pokemon uses its wings to create a shape very similar to a spruce tree. It hides from campers by camouflaging itself with the tree-like wings.", designer: "Jet / Doctor X", added: "2025-05-24", stats: [78, 125, 116, 64, 86, 96] },
    { row: 31, name: "Campion Flamigo",   group: "campion", species: "Flamigo",   dex: "#973", form: "Campion form", types: ["Fighting", "Psychic"], rarity: "Rare",     where: ["Ruins", "Arch Ruins (underground)", "Woodland Mansion", "Fresh water (not frozen)"], ability: "Inner Focus / Competitive", flavor: "Campers tell of a Flamigo that stood so still at the water's edge they mistook it for part of the ruins. It is said to know which way an opponent will move before they do, and to have never once lost a staring contest.", designer: "Jet / Bowtie", added: "2025-07-04", stats: [75, 80, 75, 135, 80, 105] },
    { row: 32, name: "Campion Spiritomb", group: "campion", species: "Spiritomb", dex: "#442", form: "Campion form", types: ["Ghost", "Fire"],     rarity: "Rare",       where: ["Near campfires", "Any biome"], ability: "Chlorophyll / Solar Power (hidden: Shadow Tag)", flavor: "Drawn to the warmth of a campfire, it settles into the embers and listens to whatever is said around it. Campers who trade stories late into the night sometimes find one has been listening the entire time.", designer: "Baumbs / Bowtie", added: "2026-08-30", stats: [100, 55, 85, 125, 85, 95] }
  ],

  evolutions: [
    ["Campion Gligar", "Leaf Stone, at night", "Glipine"],
    ["Pachirisu", "Shiny Stone", "Pachimitsu"],
    ["Feebas", "Level 60 in a mangrove swamp", "Campion Milotic"]
  ]
};
