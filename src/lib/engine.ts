// Reusable name-generation engine.
//
// Every generator page on the site is a *configuration* of this engine rather
// than its own hard-coded generator. A page picks a mode (username / nickname /
// clan / tag), a default style and theme, and the visitor tunes the rest.
// Adding a new generator category therefore means adding data, not code.

export type GenMode = "username" | "nickname" | "clan" | "tag";

export type GenStyle =
  | "cool"
  | "cute"
  | "funny"
  | "aesthetic"
  | "unique"
  | "gaming"
  | "professional"
  | "minimal"
  | "dark"
  | "edgy"
  | "soft"
  | "creative"
  | "fantasy"
  | "mysterious"
  | "random";

export type GenTheme =
  | "any"
  | "animals"
  | "space"
  | "nature"
  | "technology"
  | "fantasy"
  | "colors"
  | "food"
  | "sports"
  | "music"
  | "adventure"
  | "mythology"
  | "ocean"
  | "fire"
  | "winter"
  | "night"
  | "luxury"
  | "travel";

export type GenLength = "any" | "short" | "medium" | "long";

export interface GenOptions {
  mode: GenMode;
  style: GenStyle;
  theme: GenTheme;
  length: GenLength;
  /** Append a 2–4 digit number to some results. */
  numbers: boolean;
  /** Wrap or separate results with decorative symbols. */
  symbols: boolean;
  /** How many words to combine. */
  words: 1 | 2 | 3;
  /** Page-specific noun pool that replaces the theme pool (Viking, Fortnite …). */
  customNouns?: string[];
}


export const STYLE_LABELS: Record<Exclude<GenStyle, never>, string> = {
  cool: "Cool",
  cute: "Cute",
  funny: "Funny",
  aesthetic: "Aesthetic",
  unique: "Unique",
  gaming: "Gaming",
  professional: "Professional",
  minimal: "Minimal",
  dark: "Dark",
  edgy: "Edgy",
  soft: "Soft",
  creative: "Creative",
  fantasy: "Fantasy",
  mysterious: "Mysterious",
  random: "Surprise me",
};

export const THEME_LABELS: Record<GenTheme, string> = {
  any: "Any theme",
  animals: "Animals",
  space: "Space",
  nature: "Nature",
  technology: "Technology",
  fantasy: "Fantasy",
  colors: "Colours",
  food: "Food",
  sports: "Sports",
  music: "Music",
  adventure: "Adventure",
  mythology: "Mythology",
  ocean: "Ocean",
  fire: "Fire",
  winter: "Winter",
  night: "Night",
  luxury: "Luxury",
  travel: "Travel",
};

/** Theme nouns — the concrete half of most generated names. */
const THEME_NOUNS: Record<Exclude<GenTheme, "any">, string[]> = {
  animals: ["Wolf", "Lynx", "Falcon", "Otter", "Raven", "Panther", "Viper", "Bison", "Heron", "Fox", "Owl", "Stag"],
  space: ["Nova", "Comet", "Orbit", "Quasar", "Nebula", "Pulsar", "Meteor", "Cosmos", "Lunar", "Astro", "Solstice", "Void"],
  nature: ["Cedar", "Willow", "Fern", "Moss", "Canyon", "Meadow", "Boulder", "Bloom", "Thicket", "Pine", "Clover", "Grove"],
  technology: ["Circuit", "Pixel", "Cipher", "Vector", "Byte", "Proxy", "Kernel", "Relay", "Cache", "Signal", "Nodes", "Syntax"],
  fantasy: ["Rune", "Warden", "Griffin", "Oracle", "Spellbind", "Wyvern", "Talisman", "Sentinel", "Arcane", "Sorcerer", "Relic", "Thorn"],
  colors: ["Crimson", "Indigo", "Amber", "Cobalt", "Ivory", "Onyx", "Scarlet", "Jade", "Sable", "Copper", "Violet", "Ochre"],
  food: ["Mocha", "Waffle", "Peach", "Pretzel", "Honey", "Noodle", "Toffee", "Basil", "Cinnamon", "Mango", "Biscuit", "Pepper"],
  sports: ["Striker", "Sprint", "Rally", "Dunk", "Hurdle", "Slalom", "Captain", "Relay", "Pitcher", "Champ", "Volley", "Marathon"],
  music: ["Tempo", "Echo", "Chorus", "Riff", "Bassline", "Octave", "Lyric", "Vinyl", "Encore", "Reverb", "Cadence", "Anthem"],
  adventure: ["Trail", "Summit", "Compass", "Voyager", "Ridge", "Outpost", "Drifter", "Expedition", "Beacon", "Nomad", "Trek", "Frontier"],
  mythology: ["Titan", "Phoenix", "Valkyr", "Hydra", "Oracle", "Chimera", "Odyssey", "Icarus", "Aegis", "Kraken", "Elysium", "Fates"],
  ocean: ["Tide", "Reef", "Kelp", "Harbour", "Marlin", "Current", "Lagoon", "Anchor", "Abyss", "Coral", "Wave", "Mariner"],
  fire: ["Ember", "Blaze", "Cinder", "Flare", "Forge", "Scorch", "Ash", "Kindle", "Torch", "Furnace", "Spark", "Wildfire"],
  winter: ["Frost", "Glacier", "Snowfall", "Icicle", "Tundra", "Blizzard", "Hail", "Winterfell", "Drift", "Aurora", "Sleet", "Chill"],
  night: ["Midnight", "Dusk", "Shadow", "Eclipse", "Nocturne", "Starlight", "Moonrise", "Lantern", "Silhouette", "Twilight", "Insomnia", "Veil"],
  luxury: ["Velvet", "Marble", "Atelier", "Couture", "Platinum", "Regent", "Estate", "Aurum", "Bespoke", "Monarch", "Silk", "Opal"],
  travel: ["Transit", "Passport", "Terminal", "Skyline", "Wander", "Layover", "Boulevard", "Odyssey", "Roamer", "Metro", "Voyage", "Horizon"],
};

/** Style adjectives — the tone half. */
const STYLE_WORDS: Record<Exclude<GenStyle, "random">, string[]> = {
  cool: ["Rapid", "Prime", "Vivid", "Sharp", "Chrome", "Turbo", "Bold", "Swift", "Neon", "Apex"],
  cute: ["Bubbly", "Fluffy", "Sweetie", "Tiny", "Cuddle", "Sunny", "Puffy", "Bunny", "Sprinkle", "Dimple"],
  funny: ["Wobbly", "Clumsy", "Grumpy", "Squeaky", "Sleepy", "Chunky", "Awkward", "Sneaky", "Jolly", "Cheeky"],
  aesthetic: ["Linen", "Muted", "Softly", "Pastel", "Faded", "Dreamy", "Airy", "Hazy", "Petal", "Quiet"],
  unique: ["Odd", "Rare", "Singular", "Unruled", "Offbeat", "Uncommon", "Peculiar", "Novel", "Oblique", "Curious"],
  gaming: ["Clutch", "Headshot", "Respawn", "Sniper", "Rogue", "Toxic", "Ranked", "Meta", "Combo", "Frag"],
  professional: ["Clear", "Precise", "Refined", "Modern", "Direct", "Studio", "Works", "Consult", "Method", "Practice"],
  minimal: ["Plain", "Solo", "Mono", "Bare", "Simple", "Flat", "Neat", "Lone", "Core", "Base"],
  dark: ["Grim", "Hollow", "Fallen", "Bleak", "Umbral", "Sable", "Nether", "Ashen", "Dread", "Ruin"],
  edgy: ["Rebel", "Riot", "Feral", "Savage", "Vandal", "Reckless", "Brutal", "Wicked", "Rupture", "Havoc"],
  soft: ["Gentle", "Hush", "Tender", "Mellow", "Feather", "Downy", "Cosy", "Whisper", "Lull", "Calm"],
  creative: ["Sketch", "Palette", "Draft", "Prism", "Collage", "Mixtape", "Studio", "Kaleido", "Inkwell", "Muse"],
  fantasy: ["Elder", "Mythic", "Astral", "Arcane", "Silver", "Eternal", "Fabled", "Highborn", "Wandering", "Enchanted"],
  mysterious: ["Silent", "Unknown", "Cryptic", "Veiled", "Faint", "Hidden", "Nameless", "Distant", "Obscure", "Phantom"],
};

const SEPARATORS = ["", "", "", "_", ".", "-"];
const AESTHETIC_SEPARATORS = ["", ".", "_"];
const SYMBOL_WRAPS: [string, string][] = [
  ["✧", "✧"],
  ["彡", "彡"],
  ["ᴳ", "ツ"],
  ["★", "★"],
  ["꧁", "꧂"],
  ["「", "」"],
];

const CLAN_UNITS = [
  "Legion", "Syndicate", "Dynasty", "Order", "Squad", "Empire", "Cartel", "Guild", "Vanguard",
  "Regiment", "Collective", "Brigade", "Pact", "Alliance", "Crew", "Faction", "Coalition", "Circle",
];

const ALL_STYLES = Object.keys(STYLE_WORDS) as Exclude<GenStyle, "random">[];
const ALL_THEMES = Object.keys(THEME_NOUNS) as Exclude<GenTheme, "any">[];

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]!;
}

function digits() {
  return Math.random() < 0.5
    ? String(Math.floor(Math.random() * 90) + 10)
    : String(Math.floor(Math.random() * 900) + 100);
}

const LENGTH_RANGES: Record<GenLength, [number, number]> = {
  any: [4, 20],
  short: [3, 8],
  medium: [8, 13],
  long: [13, 20],
};

/**
 * Basic quality gate. Rejects results that are too short/long for the chosen
 * length, hard to read, or contain accidental character pile-ups.
 */
function passesQuality(name: string, length: GenLength) {
  const bare = name.replace(/[^A-Za-z0-9]/g, "");
  const [min, max] = LENGTH_RANGES[length];
  if (bare.length < min || bare.length > max) return false;
  if (/(.)\1\1/.test(bare)) return false; // triple letters
  if (/[._-]{2}/.test(name)) return false; // double separators
  if (!/[aeiouAEIOU]/.test(bare)) return false; // unpronounceable
  return true;
}

function styleWords(style: GenStyle) {
  return STYLE_WORDS[style === "random" ? pick(ALL_STYLES) : style];
}

function themeNouns(theme: GenTheme, custom?: string[]) {
  if (custom && custom.length) return custom;
  return THEME_NOUNS[theme === "any" ? pick(ALL_THEMES) : theme];
}


function buildOne(o: GenOptions): string {
  const adj = pick(styleWords(o.style));
  const noun = pick(themeNouns(o.theme, o.customNouns));
  const extra = pick(themeNouns(o.theme, o.customNouns));
  const lower = o.style === "aesthetic" || o.style === "soft" || o.style === "professional";
  const sep = lower ? pick(AESTHETIC_SEPARATORS) : pick(SEPARATORS);



  let core: string;
  if (o.mode === "tag") {
    core = (adj.slice(0, 1) + noun.slice(0, 2)).toUpperCase();
    return core;
  }

  if (o.mode === "clan") {
    const shape = Math.random();
    if (shape < 0.4) core = `${adj} ${pick(CLAN_UNITS)}`;
    else if (shape < 0.7) core = `${noun} ${pick(CLAN_UNITS)}`;
    else core = `${adj} ${noun}s`;
    if (o.numbers && Math.random() < 0.25) core = `${core} ${digits()}`;
    return o.symbols && Math.random() < 0.5
      ? (([a, b]) => `${a}${core}${b}`)(pick(SYMBOL_WRAPS))
      : core;
  }

  if (o.words === 1) {
    core = Math.random() < 0.5 ? noun : adj;
  } else if (o.words === 2) {
    core = Math.random() < 0.7 ? `${adj}${sep}${noun}` : `${noun}${sep}${adj}`;
  } else {
    core = `${adj}${sep}${noun}${sep}${extra}`;
  }

  if (lower) core = core.toLowerCase();
  if (o.numbers && Math.random() < 0.55) core = `${core}${digits()}`;
  if (o.symbols && Math.random() < 0.6) {
    const [a, b] = pick(SYMBOL_WRAPS);
    core = `${a}${core}${b}`;
  }
  return core;
}

/**
 * Generates `count` unique, quality-filtered names for the given options.
 * Duplicates are never returned within a single call.
 */
export function generateNames(options: GenOptions, count = 24): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  let guard = 0;
  const relaxed: GenOptions = { ...options, length: "any" };

  while (out.length < count && guard < count * 60) {
    guard += 1;
    // After a lot of misses, relax the length filter so the UI never stalls.
    const opts = guard > count * 25 ? relaxed : options;
    const name = buildOne(opts);
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    if (!passesQuality(name, opts.length)) continue;
    seen.add(key);
    out.push(name);
  }
  return out;
}

/** Deterministic example set for server-rendered SEO copy (no randomness). */
export function exampleNames(options: GenOptions, count = 12): string[] {
  const adjs = styleWords(options.style);
  const nouns = themeNouns(options.theme === "any" ? "space" : options.theme);
  const out: string[] = [];
  for (let i = 0; out.length < count && i < adjs.length * nouns.length; i++) {
    const adj = adjs[i % adjs.length]!;
    const noun = nouns[(i * 3 + 1) % nouns.length]!;
    let name =
      options.mode === "clan"
        ? `${adj} ${CLAN_UNITS[i % CLAN_UNITS.length]}`
        : `${adj}${noun}`;
    if (options.style === "aesthetic" || options.style === "soft") {
      name = options.mode === "clan" ? name : `${adj.toLowerCase()}.${noun.toLowerCase()}`;
    }
    if (!out.includes(name)) out.push(name);
  }
  return out;
}
