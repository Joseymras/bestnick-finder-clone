// Unicode text styling engine — pure client/server safe, zero dependencies.

const AZ = "abcdefghijklmnopqrstuvwxyz";
const AZU = AZ.toUpperCase();
const DIGITS = "0123456789";

function fromOffsets(upperStart: number, lowerStart: number, digitStart?: number) {
  const map: Record<string, string> = {};
  for (let i = 0; i < 26; i++) {
    map[AZU[i]] = String.fromCodePoint(upperStart + i);
    map[AZ[i]] = String.fromCodePoint(lowerStart + i);
  }
  if (digitStart !== undefined) {
    for (let i = 0; i < 10; i++) map[DIGITS[i]] = String.fromCodePoint(digitStart + i);
  }
  return map;
}

function fromString(upper: string, lower: string, digits?: string) {
  const map: Record<string, string> = {};
  const u = [...upper];
  const l = [...lower];
  for (let i = 0; i < 26; i++) {
    if (u[i]) map[AZU[i]] = u[i];
    if (l[i]) map[AZ[i]] = l[i];
  }
  if (digits) {
    const d = [...digits];
    for (let i = 0; i < 10; i++) if (d[i]) map[DIGITS[i]] = d[i];
  }
  return map;
}

const MAPS: Record<string, Record<string, string>> = {
  bold: fromOffsets(0x1d400, 0x1d41a, 0x1d7ce),
  italic: fromOffsets(0x1d434, 0x1d44e),
  boldItalic: fromOffsets(0x1d468, 0x1d482),
  script: fromOffsets(0x1d49c, 0x1d4b6),
  boldScript: fromOffsets(0x1d4d0, 0x1d4ea),
  fraktur: fromOffsets(0x1d504, 0x1d51e),
  boldFraktur: fromOffsets(0x1d56c, 0x1d586),
  doubleStruck: fromOffsets(0x1d538, 0x1d552, 0x1d7d8),
  sansBold: fromOffsets(0x1d5d4, 0x1d5ee, 0x1d7ec),
  sansItalic: fromOffsets(0x1d608, 0x1d622),
  monospace: fromOffsets(0x1d670, 0x1d68a, 0x1d7f6),
  circled: fromOffsets(0x24b6, 0x24d0),
  squared: fromOffsets(0x1f130, 0x1f130),
  fullwidth: fromOffsets(0xff21, 0xff41, 0xff10),
  smallCaps: fromString(AZU, "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘQʀsᴛᴜᴠᴡxʏᴢ"),
  inverted: fromString("∀ᗺƆᗡƎℲƃHIſʞ˥WNOԀΌᴚS⊥∩ΛMX⅄Z", "ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz", "0ƖᄅƐㄣϛ9ㄥ86"),
  bubbleFilled: fromString(
    "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩",
    "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩",
  ),
  squaredFilled: fromString(
    "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉",
    "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉",
  ),
  superscript: fromString("ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ", "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ", "⁰¹²³⁴⁵⁶⁷⁸⁹"),
  subscript: fromString(AZU, "ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz", "₀₁₂₃₄₅₆₇₈₉"),
  greek: fromString("ΛBᄃDΞFGΉIJKLMПӨPQЯƧΓЦVЩXYZ", "αϐcdεfghijklмnoρqrstυvwxyz"),
  currency: fromString("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "₳฿₵Đ€₣₲Ⱨł♃₭Ⱡ₥₦Ø₱Q Ɽ₴₮ɄV₩ӾɎƵ"),
  cyrillic: fromString("ДБᄃDΣFGЊЇЈЖԼMИФPQЯSΓЦVЩЖЧZ", "аъcdефgнijкlмиорqяsтцvшxчz"),
  tiny: fromString("ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘQʀsᴛᴜᴠᴡxʏᴢ", "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘQʀsᴛᴜᴠᴡxʏᴢ"),
};

function apply(map: Record<string, string>, text: string) {
  return [...text].map((c) => map[c] ?? c).join("");
}

const COMBINING: Record<string, string> = {
  strike: "\u0336",
  underline: "\u0332",
  slash: "\u0338",
  overline: "\u0305",
  wavy: "\u0330",
  sparkle: "\u20e1",
};

function combine(text: string, mark: string) {
  return [...text].map((c) => (c === " " ? c : c + mark)).join("");
}

export interface FancyStyle {
  id: string;
  name: string;
  transform: (input: string) => string;
}

const spaced = (t: string) => [...t].join(" ");

export const FANCY_STYLES: FancyStyle[] = [
  ...Object.entries(MAPS).map(([id, map]) => ({
    id,
    name: id
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (m) => m.toUpperCase())
      .trim(),
    transform: (t: string) => apply(map, t),
  })),
  ...Object.entries(COMBINING).map(([id, mark]) => ({
    id,
    name: id.replace(/^./, (m) => m.toUpperCase()),
    transform: (t: string) => combine(t, mark),
  })),
  { id: "spaced", name: "Spaced Out", transform: spaced },
  { id: "spacedBold", name: "Spaced Bold", transform: (t) => spaced(apply(MAPS.sansBold, t)) },
  { id: "dotted", name: "Dotted", transform: (t) => [...t].join("·") },
  { id: "arrowed", name: "Arrowed", transform: (t) => [...t].join("➶") },
  { id: "mirrored", name: "Mirrored", transform: (t) => [...t].reverse().join("") },
];

export const DECORATIONS: { id: string; name: string; wrap: (t: string) => string }[] = [
  { id: "wings", name: "Wings", wrap: (t) => `꧁${t}꧂` },
  { id: "swirl", name: "Swirl", wrap: (t) => `༄${t}༄` },
  { id: "flourish", name: "Flourish", wrap: (t) => `❦ ${t} ❦` },
  { id: "stars", name: "Stars", wrap: (t) => `✦ ${t} ✦` },
  { id: "hearts", name: "Hearts", wrap: (t) => `♡${t}♡` },
  { id: "fire", name: "Fire", wrap: (t) => `🔥${t}🔥` },
  { id: "crown", name: "Crown", wrap: (t) => `♛ ${t} ♛` },
  { id: "brackets", name: "Brackets", wrap: (t) => `『${t}』` },
  { id: "corner", name: "Corner", wrap: (t) => `【${t}】` },
  { id: "arrow", name: "Arrows", wrap: (t) => `↢${t}↣` },
  { id: "cross", name: "Cross", wrap: (t) => `†${t}†` },
  { id: "wave", name: "Wave", wrap: (t) => `≋${t}≋` },
  { id: "lightning", name: "Lightning", wrap: (t) => `⚡${t}⚡` },
  { id: "skull", name: "Skull", wrap: (t) => `☠${t}☠` },
  { id: "petals", name: "Petals", wrap: (t) => `｡ﾟ${t}ﾟ｡` },
  { id: "glitch", name: "Glitch", wrap: (t) => `▄︻${t}══━一` },
];

export function stylize(input: string, limit = 60): { name: string; value: string }[] {
  const text = input.trim() || "Nickname";
  const out: { name: string; value: string }[] = [];
  for (const s of FANCY_STYLES) out.push({ name: s.name, value: s.transform(text) });
  for (const d of DECORATIONS) out.push({ name: d.name, value: d.wrap(text) });
  // Combined: decoration + font
  const fonts = ["boldScript", "fraktur", "smallCaps", "doubleStruck", "sansBold"];
  for (const d of DECORATIONS.slice(0, 8)) {
    for (const f of fonts) {
      out.push({ name: `${d.name} + ${f}`, value: d.wrap(apply(MAPS[f], text)) });
    }
  }
  return out.slice(0, limit);
}

export const SYMBOL_GROUPS: { name: string; slug: string; symbols: string[] }[] = [
  {
    name: "Hearts",
    slug: "hearts",
    symbols: "♡ ♥ ❤ ❣ ❥ ღ ᰔ ♤ ᥫ᭡ 💗 💖 ❦ ❧ ♡̆̈ ⓥ 🫀".split(" "),
  },
  {
    name: "Stars",
    slug: "stars",
    symbols: "★ ☆ ✡ ✦ ✧ ⭑ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ✰ ⋆ 🌟".split(" "),
  },
  {
    name: "Crowns & Royalty",
    slug: "crowns",
    symbols: "♔ ♕ ♛ ♚ 👑 ♖ ♗ ♘ ♙ ⚜ 🏆 🥇".split(" "),
  },
  {
    name: "Arrows",
    slug: "arrows",
    symbols: "→ ← ↔ ⇒ ⇐ ↣ ↢ ➵ ➶ ➷ ➹ ➺ ➻ ⤳ ⇝ ↯".split(" "),
  },
  {
    name: "Brackets & Frames",
    slug: "brackets",
    symbols: "『』 【】 «» ⌈⌉ ⌊⌋ 〖〗 〘〙 ⦑⦒ ❨❩ ❰❱ ⟦⟧ ꧁꧂".split(" "),
  },
  {
    name: "Lines & Dividers",
    slug: "lines",
    symbols: "▀ ▄ ▬ ─ ━ ═ ≡ ≋ ⌇ ⌁ ┅ ┈ ╌ ⋯ ⸻".split(" "),
  },
  {
    name: "Weapons & Gaming",
    slug: "gaming",
    symbols: "⚔ ⚒ 🗡 🔫 ⛨ 🛡 ☠ ⚡ 💀 🎮 🕹 ✠ ⛧ ⚉".split(" "),
  },
  {
    name: "Flowers & Nature",
    slug: "nature",
    symbols: "✿ ❀ ❁ ✾ ✽ ❃ ❋ ⚘ 🌸 🌺 ☘ ✤ ⚛ ❆ ❅ ❄".split(" "),
  },
  {
    name: "Music",
    slug: "music",
    symbols: "♪ ♫ ♬ ♩ ♭ ♮ ♯ 🎵 🎶 🎧 🎤 🎼".split(" "),
  },
  {
    name: "Zodiac",
    slug: "zodiac",
    symbols: "♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ☉ ☽ ☾ ✵".split(" "),
  },
  {
    name: "Currency",
    slug: "currency",
    symbols: "₳ ฿ ₵ € ₣ ₲ ₭ ₥ ₦ ₱ ₴ ₮ ₩ ¥ $ ¢".split(" "),
  },
  {
    name: "Faces & Kaomoji",
    slug: "kaomoji",
    symbols: "(◕‿◕) (｡◕‿◕｡) ʕ•ᴥ•ʔ (≧◡≦) ¯\\_(ツ)_/¯ (◔_◔) (づ｡◕‿‿◕｡)づ ʘ‿ʘ (•_•) ᕙ(⇀‸↼)ᕗ".split(" "),
  },
];
