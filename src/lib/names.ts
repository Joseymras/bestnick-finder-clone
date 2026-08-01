// Name pools + generators used by the random nickname & username tools.

export const ADJECTIVES = [
  "Silent", "Toxic", "Royal", "Savage", "Frozen", "Cosmic", "Rapid", "Shadow", "Golden", "Crimson",
  "Rogue", "Wicked", "Noble", "Feral", "Lucid", "Neon", "Velvet", "Iron", "Solar", "Lunar",
  "Mystic", "Rebel", "Turbo", "Hyper", "Phantom", "Electric", "Wild", "Quiet", "Brave", "Ghost",
  "Sacred", "Broken", "Endless", "Prime", "Vivid", "Arctic", "Ember", "Onyx", "Astral", "Blazing",
];

export const NOUNS = [
  "Wolf", "Reaper", "Blade", "Sniper", "Storm", "Titan", "Falcon", "Viper", "Knight", "Rider",
  "Hunter", "Ghost", "Bishop", "Raven", "Panther", "Dragon", "Comet", "Nomad", "Pilot", "Ranger",
  "Samurai", "Angel", "Demon", "Warden", "Legend", "Bandit", "Pirate", "Wizard", "Phoenix", "Lynx",
  "Otter", "Koala", "Bloom", "Echo", "Pixel", "Cipher", "Vortex", "Nova", "Drift", "Circuit",
];

export const SOFT_NOUNS = [
  "Peach", "Cloud", "Berry", "Honey", "Moon", "Petal", "Latte", "Bunny", "Sugar", "Daisy",
  "Cherry", "Sunset", "Velour", "Mocha", "Angel", "Pearl", "Lily", "Marsh", "Cotton", "Dream",
];

export const SYLLABLES_A = ["ka", "zo", "mi", "ra", "vel", "nyx", "sol", "ari", "thal", "bre", "dre", "lu", "sha", "tor", "vy", "qui"];
export const SYLLABLES_B = ["ron", "ven", "lith", "dor", "mar", "sen", "vix", "nar", "quel", "ther", "zar", "lyn", "dan", "rix", "mus", "eth"];

export const LEET: Record<string, string> = { a: "4", e: "3", i: "1", o: "0", s: "5", t: "7", g: "9", b: "8" };

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const DARK_ADJECTIVES = [
  "Grim", "Hollow", "Fallen", "Cursed", "Bleak", "Silent", "Vile", "Ashen", "Dread", "Umbral",
  "Sable", "Nether", "Void", "Ruin", "Morbid", "Wraith", "Obsidian", "Thorn", "Blood", "Nocturne",
];

export const DARK_NOUNS = [
  "Requiem", "Grave", "Hex", "Crypt", "Fang", "Omen", "Sorrow", "Abyss", "Reign", "Scythe",
  "Widow", "Sever", "Malice", "Eclipse", "Wither", "Shroud", "Thrall", "Bane", "Rift", "Dirge",
];

export const KAWAII_WORDS = [
  "mochi", "boba", "puff", "nana", "yumi", "miku", "pudding", "sakura", "kuma", "usagi",
  "milky", "candy", "pochi", "hoshi", "neko", "mimi", "peachy", "toffee", "buni", "cutie",
];

export const FUNNY_WORDS = [
  "Noodle", "Waffle", "Pickle", "Potato", "Wombat", "Muffin", "Gravy", "Sock", "Banana", "Sloth",
  "Toast", "Nugget", "Yeet", "Bonk", "Snack", "Goblin", "Chonk", "Turnip", "Burrito", "Wiggle",
];

export const MYTHIC_WORDS = [
  "Aether", "Valen", "Thoron", "Elyra", "Draven", "Seraph", "Kaelis", "Morrigan", "Auren", "Ravok",
  "Ilyra", "Zephyr", "Orios", "Nyxara", "Vaeloth", "Sylvane", "Threnos", "Kaldros", "Ember", "Solari",
];

export const CLAN_WORDS = [
  "Legion", "Syndicate", "Dynasty", "Order", "Squad", "Empire", "Union", "Cartel", "Coalition", "Guild",
  "Regiment", "Vanguard", "Collective", "Brigade", "Circle", "Pact", "Alliance", "Crew", "Faction", "Clan",
];

export const ANIME_WORDS = [
  "Kenji", "Ryu", "Akira", "Hikari", "Sora", "Rin", "Yuki", "Kaito", "Hana", "Shin",
  "Zoro", "Kira", "Ayame", "Tsuki", "Reiji", "Nami", "Haru", "Kuro", "Shiro", "Aoi",
];

export const PRO_WORDS = [
  "studio", "labs", "works", "media", "digital", "consult", "creative", "collective", "group", "co",
];

export const DECOR_PREFIX = ["彡", "★", "×", "꧁", "「", "✧", "亗", "ᴶ", "☂", "-ˋˏ"];
export const DECOR_SUFFIX = ["彡", "★", "×", "꧂", "」", "✧", "亗", "ツ", "☂", "ˎˊ-"];

export type NameFlavor =
  | "gamer"
  | "aesthetic"
  | "fantasy"
  | "professional"
  | "dark"
  | "cute"
  | "funny"
  | "clan"
  | "anime"
  | "oneword"
  | "short"
  | "random";

const ALL_FLAVORS: NameFlavor[] = [
  "gamer", "aesthetic", "fantasy", "professional", "dark", "cute", "funny", "clan", "anime",
  "oneword", "short",
];

const maybe = (p: number) => Math.random() < p;
const num = () => String(Math.floor(Math.random() * 90) + 10);

export function generateName(flavor: NameFlavor = "random", firstLetters = ""): string {
  const f = flavor === "random" ? pick(ALL_FLAVORS) : flavor;
  let name = "";
  switch (f) {
    case "gamer":
      name = `${pick(ADJECTIVES)}${pick(NOUNS)}${maybe(0.4) ? num() : ""}`;
      break;
    case "aesthetic":
      name = `${pick(SOFT_NOUNS).toLowerCase()}${maybe(0.5) ? "." : "_"}${pick(SOFT_NOUNS).toLowerCase()}`;
      break;
    case "fantasy":
      name = cap(pick(SYLLABLES_A) + pick(SYLLABLES_B) + (maybe(0.4) ? pick(SYLLABLES_B) : ""));
      break;
    case "dark":
      name = `${pick(DARK_ADJECTIVES)}${pick(DARK_NOUNS)}`;
      break;
    case "cute":
      name = `${pick(KAWAII_WORDS)}${maybe(0.5) ? "." : ""}${pick(KAWAII_WORDS)}`;
      break;
    case "funny":
      name = `${pick(FUNNY_WORDS)}${pick(FUNNY_WORDS)}${maybe(0.3) ? num() : ""}`;
      break;
    case "clan":
      name = `${pick(DARK_ADJECTIVES)} ${pick(CLAN_WORDS)}`;
      break;
    case "anime":
      name = `${pick(ANIME_WORDS)}${maybe(0.5) ? pick(SYLLABLES_B) : ""}`;
      name = cap(name);
      break;
    case "oneword":
      name = cap(pick(MYTHIC_WORDS));
      break;
    case "short":
      name = (pick(SYLLABLES_A) + pick(SYLLABLES_B)).slice(0, 5);
      name = cap(name);
      break;
    default:
      name = `${pick(ADJECTIVES).toLowerCase()}.${pick(PRO_WORDS)}`;
  }
  if (firstLetters) {
    const p = firstLetters.trim();
    name = p + name.slice(0, Math.max(3, name.length - p.length));
  }
  return name;
}

/** Wraps a name in decorative symbols the way gaming handles usually look. */
export function decorate(name: string) {
  const i = Math.floor(Math.random() * DECOR_PREFIX.length);
  return `${DECOR_PREFIX[i]}${name}${DECOR_SUFFIX[i]}`;
}

export function generateBatch(count: number, flavor: NameFlavor = "random", firstLetters = "") {
  const set = new Set<string>();
  let guard = 0;
  while (set.size < count && guard++ < count * 25) set.add(generateName(flavor, firstLetters));
  return [...set];
}

export function mixNames(a: string, b: string, count = 24): string[] {
  const x = a.trim().replace(/\s+/g, "");
  const y = b.trim().replace(/\s+/g, "");
  if (!x || !y) return [];
  const out = new Set<string>();
  const chunksX = [x.slice(0, Math.ceil(x.length / 2)), x.slice(0, 3), x.slice(-3), x];
  const chunksY = [y.slice(Math.floor(y.length / 2)), y.slice(0, 3), y.slice(-3), y];
  for (const cx of chunksX) {
    for (const cy of chunksY) {
      out.add(cap(cx.toLowerCase()) + cy.toLowerCase());
      out.add(cap(cy.toLowerCase()) + cx.toLowerCase());
      out.add(`${cx.toLowerCase()}_${cy.toLowerCase()}`);
      out.add(`${cx.toLowerCase()}.${cy.toLowerCase()}`);
    }
  }
  return [...out].filter((n) => n.length > 3 && n.length < 20).slice(0, count);
}

export function usernameVariants(base: string, count = 30): string[] {
  const b = base.trim().replace(/\s+/g, "").toLowerCase();
  if (!b) return [];
  const out = new Set<string>();
  const leet = [...b].map((c) => LEET[c] ?? c).join("");
  out.add(b);
  out.add(leet);
  out.add(`the${cap(b)}`);
  out.add(`${b}official`);
  out.add(`real${b}`);
  out.add(`its${b}`);
  out.add(`${b}hq`);
  out.add(`${b}x`);
  out.add(`x${b}x`);
  out.add(`${b}_`);
  out.add(`_${b}_`);
  for (const adj of ADJECTIVES.slice(0, 12)) out.add(adj.toLowerCase() + b);
  for (const n of NOUNS.slice(0, 12)) out.add(b + n.toLowerCase());
  for (let i = 0; i < 6; i++) out.add(`${b}${Math.floor(Math.random() * 9000) + 100}`);
  return [...out].slice(0, count);
}

export function generatePassword(len: number, opts: { upper: boolean; digits: boolean; symbols: boolean }) {
  let pool = "abcdefghijkmnopqrstuvwxyz";
  if (opts.upper) pool += "ABCDEFGHJKLMNPQRSTUVWXYZ";
  if (opts.digits) pool += "23456789";
  if (opts.symbols) pool += "!@#$%^&*-_=+?";
  const arr = new Uint32Array(len);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(arr);
  else for (let i = 0; i < len; i++) arr[i] = Math.floor(Math.random() * 4294967296);
  return [...arr].map((v) => pool[v % pool.length]).join("");
}
