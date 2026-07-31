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
  sans: fromOffsets(0x1d5a0, 0x1d5ba, 0x1d7e2),
  sansBoldItalic: fromOffsets(0x1d63c, 0x1d656),
  parenthesized: fromString(
    "🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩",
    "⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵",
  ),
  negativeCircled: fromString(
    "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩",
    "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
  ),
  katakana: fromString("ﾑ乃匚刀乇下厶卄工丁长乚从𠘨口尸Q尺丂ㄒㄩ√山乂丫乙", "ﻝ乃ᄃ𝓭乇fム廾ﺎﻝズﻝጠ𝓷ㅇρ𝓺尺丂ㄒㄩᐯ山ﻯㄚ乂"),
  runic: fromString("ᚨᛒᚦᛞᛖᚠᚷᚺᛁᛃᚴᛚᛗᚾᛟᛈᛩᚱᛊᛏᚢᚡᚳᚷᛇᛉ", "ᚨᛒᚦᛞᛖᚠᚷᚺᛁᛃᚴᛚᛗᚾᛟᛈᛩᚱᛊᛏᚢᚡᚳᚷᛇᛉ"),
  cuteMix: fromString("ᗩᗷᑕᗪᗴᖴǤᕼᏆᒍᏦᒪᗰᑎOᑭQᖇᔕTᑌᐯᗯXYᘔ", "ᗩᗷᑕᗪᗴᖴǤᕼᏆᒍᏦᒪᗰᑎOᑭQᖇᔕTᑌᐯᗯXYᘔ"),
  starry: fromString("ᐊᗺᑕᗞᗱᖴᏻᕼᛁᒎᛕᒐᗰᑎ⊙ᑭᛍᖇᏕᛏᑌᐯᗯ᙭ᖯᙇ", "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ"),
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
  { id: "zalgo", name: "Zalgo Glitch", transform: (t) => zalgo(t, 3) },
  { id: "zalgoHeavy", name: "Zalgo Heavy", transform: (t) => zalgo(t, 7) },
  { id: "vaporwave", name: "Vaporwave", transform: (t) => spaced(apply(MAPS.fullwidth, t)) },
  { id: "sparkleJoin", name: "Sparkle Join", transform: (t) => [...t].join("˚") },
  { id: "heartJoin", name: "Heart Join", transform: (t) => [...t].join("♡") },
  { id: "starJoin", name: "Star Join", transform: (t) => [...t].join("✧") },
  { id: "altCaps", name: "AlTeRnAtInG", transform: (t) => [...t].map((c, i) => (i % 2 ? c.toLowerCase() : c.toUpperCase())).join("") },
];

const ZALGO_MARKS = [
  "\u0300", "\u0301", "\u0302", "\u0303", "\u0308", "\u030a", "\u030f", "\u0316", "\u0317",
  "\u031c", "\u0323", "\u0325", "\u032d", "\u0331", "\u0335", "\u033f", "\u0350", "\u035b",
];

/** Deterministic glitch marks so SSR and the client render identical text. */
function zalgo(text: string, intensity: number) {
  let seed = 7;
  return [...text]
    .map((c) => {
      if (c === " ") return c;
      let out = c;
      for (let i = 0; i < intensity; i++) {
        seed = (seed * 1103515245 + 12345) % 2147483647;
        out += ZALGO_MARKS[seed % ZALGO_MARKS.length];
      }
      return out;
    })
    .join("");
}

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
  { id: "butterfly", name: "Butterfly", wrap: (t) => `🦋${t}🦋` },
  { id: "sparkles", name: "Sparkles", wrap: (t) => `✧･ﾟ${t}･ﾟ✧` },
  { id: "moon", name: "Moon", wrap: (t) => `☾ ${t} ☽` },
  { id: "cherry", name: "Cherry", wrap: (t) => `🍒${t}🍒` },
  { id: "ghost", name: "Ghost", wrap: (t) => `👻${t}👻` },
  { id: "dragon", name: "Dragon", wrap: (t) => `🐉${t}🐉` },
  { id: "angelWings", name: "Angel Wings", wrap: (t) => `𓆩${t}𓆪` },
  { id: "tribal", name: "Tribal", wrap: (t) => `꧅${t}꧅` },
  { id: "cyber", name: "Cyber", wrap: (t) => `「${t}」` },
  { id: "y2k", name: "Y2K", wrap: (t) => `⋆｡°✩ ${t} ✩°｡⋆` },
  { id: "esports", name: "Esports", wrap: (t) => `⌁${t}⌁` },
  { id: "flower", name: "Flower", wrap: (t) => `✿${t}✿` },
  { id: "diamond", name: "Diamond", wrap: (t) => `❖ ${t} ❖` },
  { id: "matrix", name: "Matrix", wrap: (t) => `⟦${t}⟧` },
  { id: "aura", name: "Aura", wrap: (t) => `⋆˚࿔ ${t} ࿔˚⋆` },
  { id: "royal", name: "Royal", wrap: (t) => `♔${t}♔` },
];

export function stylize(input: string, limit = 60): { name: string; value: string }[] {
  const text = input.trim() || "Nickname";
  const out: { name: string; value: string }[] = [];
  for (const s of FANCY_STYLES) out.push({ name: s.name, value: s.transform(text) });
  for (const d of DECORATIONS) out.push({ name: d.name, value: d.wrap(text) });
  // Combined: decoration + font
  const fonts = ["boldScript", "fraktur", "smallCaps", "doubleStruck", "sansBold", "cuteMix", "katakana"];
  for (const d of DECORATIONS) {
    for (const f of fonts) {
      out.push({ name: `${d.name} + ${f}`, value: d.wrap(apply(MAPS[f], text)) });
    }
  }
  const seen = new Set<string>();
  return out.filter((o) => (seen.has(o.value) ? false : (seen.add(o.value), true))).slice(0, limit);
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
  {
    name: "Trending emojis",
    slug: "trending-emojis",
    symbols: "🔥 💯 ✨ 🥶 🫶 🩷 🖤 🫧 🪩 🦋 🐉 👾 🎯 🧿 🪐 🛸 🫥 🤍 💫 🥷".split(" "),
  },
  {
    name: "Sparkles & Y2K",
    slug: "sparkles-y2k",
    symbols: "⋆ ˚ ࿔ ✩ ✫ ⁺ ‧ ₊ ˖ ⭒ ⭑ ๋ ࣭ ˚｡ ⋆｡°✩ ✧･ﾟ ｡ﾟ ⊹ ࿐".split(" "),
  },
  {
    name: "Aesthetic core",
    slug: "aesthetic-core",
    symbols: "𓆩 𓆪 ࿇ ᥫ᭡ ⌗ ⌇ ໒ ୨୧ ˚ෆ ꒰ ꒱ ᰔᩚ ⋒ ᨒ ๛ ᭄ ꫂ ᜊ".split(" "),
  },
  {
    name: "Tech & AI",
    slug: "tech-ai",
    symbols: "⌘ ⌥ ⎋ ⏻ ⏼ ⌬ ⚙ ⌗ ⏣ ⌁ ⎔ ⏧ 🤖 💻 🛰 🧠 ⚡ ▨".split(" "),
  },
  {
    name: "Blocks & Bars",
    slug: "blocks",
    symbols: "█ ▓ ▒ ░ ▌ ▐ ▁ ▂ ▃ ▄ ▅ ▆ ▇ ■ □ ▪ ▫ ◾".split(" "),
  },
  {
    name: "Animals",
    slug: "animals",
    symbols: "🐺 🦊 🐯 🦁 🐍 🦅 🐬 🦈 🐝 🦂 🐙 🦖 🐈‍⬛ 🐾 ʕ•ᴥ•ʔ ᓚᘏᗢ".split(" "),
  },
  {
    name: "Esports & Sports",
    slug: "esports",
    symbols: "🎮 🕹 🏆 🥇 🎯 ⚽ 🏀 🏎 🥊 ♟ ⚔ 🛡 ⌁ 🔫 💣 🧨".split(" "),
  },
  {
    name: "Weather & Space",
    slug: "space",
    symbols: "☀ ☁ ☂ ☃ ❄ ❅ ❆ ☄ ✵ ✴ ☽ ☾ 🌙 🌌 🌠 🪐 ⭐ 🌞".split(" "),
  },
  {
    name: "Food & Cute",
    slug: "food",
    symbols: "🍒 🍑 🍓 🍭 🍬 🧋 🍰 🧁 🍩 🥛 🍯 🌸 🎀 🩰 🫧 🍡".split(" "),
  },
  {
    name: "Hands & Faces",
    slug: "hands",
    symbols: "✌ ☝ ✍ 👑 🫶 🤍 🖤 🩶 👀 🫡 🥶 🤌 ✊ 🤙 🫰 ✋".split(" "),
  },
  {
    name: "Chess & Cards",
    slug: "chess",
    symbols: "♔ ♕ ♖ ♗ ♘ ♙ ♚ ♛ ♜ ♝ ♞ ♟ ♠ ♣ ♥ ♦".split(" "),
  },
  {
    name: "Punctuation & Rare",
    slug: "rare",
    symbols: "‽ ⁂ ※ ⁑ ⸸ ⸙ ⸎ ❡ ‾ ⁓ ⁘ ⁙ ⌖ ⍟ ⍣ ⌾".split(" "),
  },
];

