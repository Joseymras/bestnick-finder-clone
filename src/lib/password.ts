// Advanced password / passphrase engine. Runs entirely in the browser — nothing
// generated here is ever sent over the network, logged or stored.

export const CHARSETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/~",
};

const AMBIGUOUS = "Il1O0oB8S5Z2|`'\";:,.";

export interface PasswordOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  /** Drop look-alike characters (I, l, 1, O, 0 …). */
  excludeAmbiguous: boolean;
  /** Never repeat the same character twice in a row. */
  noRepeats: boolean;
  /** Guarantee at least one character from every enabled class. */
  requireEachClass: boolean;
}

export const DEFAULT_OPTIONS: PasswordOptions = {
  length: 20,
  lower: true,
  upper: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: true,
  noRepeats: false,
  requireEachClass: true,
};

/** Cryptographically secure integer in [0, max) with no modulo bias. */
function randomInt(max: number) {
  if (max <= 0) return 0;
  const g = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  if (!g?.getRandomValues) return Math.floor(Math.random() * max);
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let v = 0;
  do {
    g.getRandomValues(buf);
    v = buf[0];
  } while (v >= limit);
  return v % max;
}

function pool(opts: PasswordOptions) {
  let p = "";
  if (opts.lower) p += CHARSETS.lower;
  if (opts.upper) p += CHARSETS.upper;
  if (opts.digits) p += CHARSETS.digits;
  if (opts.symbols) p += CHARSETS.symbols;
  if (!p) p = CHARSETS.lower;
  if (opts.excludeAmbiguous) p = [...p].filter((c) => !AMBIGUOUS.includes(c)).join("");
  return p;
}

function classPools(opts: PasswordOptions) {
  const filter = (s: string) =>
    opts.excludeAmbiguous ? [...s].filter((c) => !AMBIGUOUS.includes(c)).join("") : s;
  const out: string[] = [];
  if (opts.lower) out.push(filter(CHARSETS.lower));
  if (opts.upper) out.push(filter(CHARSETS.upper));
  if (opts.digits) out.push(filter(CHARSETS.digits));
  if (opts.symbols) out.push(filter(CHARSETS.symbols));
  return out.filter(Boolean);
}

export function generatePassword(opts: PasswordOptions = DEFAULT_OPTIONS): string {
  const p = pool(opts);
  const len = Math.max(4, Math.min(128, opts.length));
  const chars: string[] = [];

  const pushFrom = (source: string) => {
    let c = source[randomInt(source.length)];
    let guard = 0;
    while (opts.noRepeats && chars.length && c === chars[chars.length - 1] && guard++ < 40) {
      c = source[randomInt(source.length)];
    }
    chars.push(c);
  };

  if (opts.requireEachClass) for (const cp of classPools(opts)) if (chars.length < len) pushFrom(cp);
  while (chars.length < len) pushFrom(p);

  // Fisher–Yates so the guaranteed class characters are not always up front.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

/** Short, high-entropy, human-typeable words for passphrases. */
export const PASSPHRASE_WORDS = [
  "amber","anchor","atlas","aurora","basil","beacon","birch","bison","bloom","bolt","brass","breeze",
  "cactus","canyon","cedar","cipher","citrus","cobalt","comet","copper","coral","cosmos","crimson","crystal",
  "delta","dune","ember","falcon","fern","flint","forge","fossil","galaxy","garnet","glacier","granite",
  "harbor","hazel","helix","indigo","ivory","jasper","jungle","kelp","lagoon","lantern","lattice","lichen",
  "lunar","magnet","maple","marble","meadow","mesa","meteor","mint","mosaic","nebula","nickel","nomad",
  "oasis","onyx","opal","orbit","otter","paprika","pebble","pepper","pine","pixel","plasma","prairie",
  "quartz","quill","radar","raven","reef","ripple","rhythm","saffron","sage","sailor","sequoia","shadow",
  "silver","socket","solar","spruce","stellar","summit","talon","tangent","thistle","thunder","tidal","timber",
  "topaz","torrent","tundra","turbine","umbra","valley","velvet","vertex","vesper","violet","walnut","willow",
  "wombat","zenith","zephyr","zodiac",
];

export interface PassphraseOptions {
  words: number;
  separator: string;
  capitalize: boolean;
  addNumber: boolean;
  addSymbol: boolean;
}

export function generatePassphrase(opts: PassphraseOptions): string {
  const parts: string[] = [];
  for (let i = 0; i < Math.max(2, Math.min(12, opts.words)); i++) {
    const w = PASSPHRASE_WORDS[randomInt(PASSPHRASE_WORDS.length)];
    parts.push(opts.capitalize ? w[0].toUpperCase() + w.slice(1) : w);
  }
  let out = parts.join(opts.separator);
  if (opts.addNumber) out += String(randomInt(90) + 10);
  if (opts.addSymbol) out += "!@#$%&*?"[randomInt(8)];
  return out;
}

export function generatePin(digits: number) {
  return Array.from({ length: Math.max(3, Math.min(16, digits)) }, () => randomInt(10)).join("");
}

/** Entropy in bits, discounted for the patterns real attackers exploit. */
export function entropyBits(value: string): number {
  if (!value) return 0;
  let space = 0;
  if (/[a-z]/.test(value)) space += 26;
  if (/[A-Z]/.test(value)) space += 26;
  if (/[0-9]/.test(value)) space += 10;
  if (/[^A-Za-z0-9]/.test(value)) space += 25;
  let bits = value.length * Math.log2(Math.max(space, 2));

  const lower = value.toLowerCase();
  // Repeated characters and simple sequences add far less than raw length says.
  if (/(.)\1{2,}/.test(value)) bits *= 0.75;
  if (/(0123|1234|2345|3456|4567|5678|6789|abcd|bcde|qwer|asdf|zxcv)/.test(lower)) bits *= 0.7;
  if (/^(19|20)\d{2}$/.test(value)) bits *= 0.4;
  const common = ["password", "admin", "letmein", "welcome", "iloveyou", "qwerty", "dragon", "monkey"];
  if (common.some((c) => lower.includes(c))) bits *= 0.35;
  // A dictionary passphrase is stronger than its character mix implies.
  const words = lower.split(/[^a-z]+/).filter((w) => w.length > 2);
  if (words.length >= 3 && words.every((w) => PASSPHRASE_WORDS.includes(w))) {
    bits = Math.max(bits, words.length * Math.log2(PASSPHRASE_WORDS.length));
  }
  return Math.round(bits);
}

export interface Strength {
  bits: number;
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  crackTime: string;
  advice: string[];
}

/** 10 billion offline guesses per second — a realistic modern GPU rig. */
const GUESSES_PER_SECOND = 1e10;

function humanTime(seconds: number): string {
  if (!isFinite(seconds)) return "effectively forever";
  const units: [number, string][] = [
    [1, "second"], [60, "minute"], [3600, "hour"], [86400, "day"],
    [2_592_000, "month"], [31_536_000, "year"], [31_536_000_000, "millennium"],
  ];
  if (seconds < 1) return "instantly";
  let chosen = units[0];
  for (const u of units) if (seconds >= u[0]) chosen = u;
  const n = seconds / chosen[0];
  if (chosen[1] === "millennium" && n > 1000) {
    return `${n.toExponential(1)} millennia`;
  }
  const rounded = n >= 10 ? Math.round(n) : Math.round(n * 10) / 10;
  return `${rounded.toLocaleString()} ${chosen[1]}${rounded === 1 ? "" : "s"}`;
}

export function strengthOf(value: string): Strength {
  const bits = entropyBits(value);
  const seconds = Math.pow(2, Math.min(bits, 1024)) / 2 / GUESSES_PER_SECOND;
  const score: Strength["score"] = bits < 28 ? 0 : bits < 40 ? 1 : bits < 60 ? 2 : bits < 90 ? 3 : 4;
  const label = ["Very weak", "Weak", "Fair", "Strong", "Fortress"][score];

  const advice: string[] = [];
  if (value.length < 16) advice.push("Aim for 16+ characters — length beats complexity.");
  if (!/[A-Z]/.test(value)) advice.push("Mix in uppercase letters.");
  if (!/[0-9]/.test(value)) advice.push("Add digits away from the ends.");
  if (!/[^A-Za-z0-9]/.test(value)) advice.push("Add symbols for a wider search space.");
  if (/(.)\1{2,}/.test(value)) advice.push("Avoid three or more repeated characters.");
  if (score >= 4 && !advice.length) advice.push("Excellent — store it in a password manager and enable 2FA.");

  return { bits, score, label, crackTime: humanTime(seconds), advice };
}

/**
 * Check a password against the Have I Been Pwned breach corpus using
 * k-anonymity: only the first five characters of the SHA-1 hash ever leave the
 * browser, so the password itself is never transmitted.
 */
export async function breachCount(value: string): Promise<number | null> {
  try {
    const g = globalThis.crypto;
    if (!g?.subtle || !value) return null;
    const digest = await g.subtle.digest("SHA-1", new TextEncoder().encode(value));
    const hash = [...new Uint8Array(digest)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
    const res = await fetch(`https://api.pwnedpasswords.com/range/${hash.slice(0, 5)}`);
    if (!res.ok) return null;
    const body = await res.text();
    const suffix = hash.slice(5);
    for (const line of body.split("\n")) {
      const [tail, count] = line.trim().split(":");
      if (tail === suffix) return Number(count);
    }
    return 0;
  } catch {
    return null;
  }
}
