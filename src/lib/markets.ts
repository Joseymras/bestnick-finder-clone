// Country x platform programmatic pages: "best nicknames for TikTok in India"
// style queries. Each combination gets its own copy, word pool, examples and
// FAQ so no two pages read the same.

import type { NameFlavor } from "./names";

export interface Country {
  slug: string;
  name: string;
  /** Demonym used in copy, e.g. "Indian". */
  demonym: string;
  flag: string;
  /** Primary local language shown to visitors. */
  language: string;
  /** BCP-47 code used for hreflang hints. */
  langCode: string;
  /** Second language commonly typed in handles. */
  secondLanguage?: string;
  /** Culture-flavoured words the generator mixes in. */
  pool: string[];
  /** Local naming habit, written per country. */
  habit: string;
  /** Platform slugs that matter most in this market, in order. */
  platforms: string[];
}

export interface Platform {
  slug: string;
  name: string;
  /** Field being named. */
  field: string;
  /** Character rules for the field. */
  rules: string;
  /** What performs well on this surface. */
  vibe: string;
  flavor: NameFlavor;
  symbols: boolean;
}

export const PLATFORMS: Platform[] = [
  {
    slug: "tiktok",
    name: "TikTok",
    field: "TikTok username and display name",
    rules:
      "TikTok usernames allow up to 24 characters using letters, numbers, underscores and periods. The display name is separate, allows 30 characters, and accepts decorative Unicode.",
    vibe:
      "Short, sayable handles win on TikTok because viewers read them in half a second while the video plays.",
    flavor: "aesthetic",
    symbols: true,
  },
  {
    slug: "instagram",
    name: "Instagram",
    field: "Instagram handle and name field",
    rules:
      "Handles allow 30 characters — letters, numbers, periods and underscores only. The name field accepts styled Unicode and emoji.",
    vibe: "Lowercase, calm and searchable beats clever spelling on Instagram.",
    flavor: "aesthetic",
    symbols: true,
  },
  {
    slug: "free-fire",
    name: "Free Fire",
    field: "Free Fire in-game nickname",
    rules:
      "Free Fire allows roughly 12–20 characters and accepts decorative Unicode plus bracket symbols, so styled names render correctly in the lobby.",
    vibe: "Sharp, aggressive two-part names with a clan tag read best on the kill feed.",
    flavor: "gamer",
    symbols: true,
  },
  {
    slug: "pubg-bgmi",
    name: "PUBG / BGMI",
    field: "PUBG Mobile or BGMI nickname",
    rules:
      "Names are limited to 14 characters and support most Unicode blocks; a rename card is needed after the first free change.",
    vibe: "Squad-ready names stay under 14 characters so the clan tag still fits.",
    flavor: "clan",
    symbols: true,
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    field: "WhatsApp profile name and About line",
    rules:
      "The profile name allows 25 characters and the About line 139, both accepting emoji and styled Unicode.",
    vibe: "Warm, personal and readable — this name shows up next to every message you send.",
    flavor: "cute",
    symbols: true,
  },
  {
    slug: "facebook",
    name: "Facebook",
    field: "Facebook profile or page name",
    rules:
      "Facebook enforces a real-name policy on profiles and limits renames, so decorative styling belongs on pages, groups and nicknames rather than the legal name field.",
    vibe: "Clean spelling and a recognisable surname keep the account discoverable.",
    flavor: "professional",
    symbols: false,
  },
  {
    slug: "youtube",
    name: "YouTube",
    field: "YouTube channel name and @handle",
    rules:
      "Handles are 3–30 characters, letters, numbers, underscores, periods and hyphens, and must be unique across YouTube.",
    vibe: "A channel name that says the topic out loud earns clicks from search and suggested.",
    flavor: "professional",
    symbols: false,
  },
  {
    slug: "roblox",
    name: "Roblox",
    field: "Roblox username and display name",
    rules:
      "Usernames are 3–20 characters with at most one underscore and no other symbols; display names allow 3–20 characters and can be changed weekly.",
    vibe: "Playful compound words age better than number-padded handles.",
    flavor: "funny",
    symbols: false,
  },
  {
    slug: "discord",
    name: "Discord",
    field: "Discord username and server nickname",
    rules:
      "Usernames are lowercase, 2–32 characters, letters, numbers, periods and underscores. Per-server nicknames accept full Unicode and emoji.",
    vibe: "One lowercase word plus a server nickname with styling is the standard setup.",
    flavor: "oneword",
    symbols: true,
  },
  {
    slug: "snapchat",
    name: "Snapchat",
    field: "Snapchat username and display name",
    rules:
      "Usernames are 3–15 characters and permanent — they can never be edited — while the display name can change any time and accepts emoji.",
    vibe: "Pick something you will still like in five years; the handle is locked forever.",
    flavor: "short",
    symbols: true,
  },
  {
    slug: "telegram",
    name: "Telegram",
    field: "Telegram @username and display name",
    rules:
      "Usernames are 5–32 characters, letters, numbers and underscores, must start with a letter, and are globally unique.",
    vibe: "Short, typeable handles matter because people share them by voice.",
    flavor: "short",
    symbols: true,
  },
  {
    slug: "gaming",
    name: "gaming",
    field: "gaming handle across consoles, PC and mobile",
    rules:
      "Most platforms cap handles between 12 and 16 characters, and only some accept decorative Unicode — keep a plain fallback ready.",
    vibe: "One handle across every game builds recognition faster than a different name per title.",
    flavor: "gamer",
    symbols: true,
  },
];

export const PLATFORM_MAP: Record<string, Platform> = Object.fromEntries(
  PLATFORMS.map((p) => [p.slug, p]),
);

const CORE = ["tiktok", "instagram", "free-fire", "whatsapp", "gaming", "youtube"];

export const COUNTRIES: Country[] = [
  {
    slug: "india",
    name: "India",
    demonym: "Indian",
    flag: "🇮🇳",
    language: "Hindi",
    langCode: "hi-IN",
    secondLanguage: "English",
    pool: ["Raja", "Rani", "Veer", "Shanti", "Chhora", "Bindaas", "Desi", "Shera", "Jugaad", "Baadshah", "Titli", "Noor"],
    habit:
      "Hinglish handles dominate: a Hindi word written in Latin script next to an English one, often finished with a city tag like 07 for a pin code or a state abbreviation.",
    platforms: ["tiktok", "instagram", "free-fire", "pubg-bgmi", "whatsapp", "youtube", "snapchat", "telegram"],
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    demonym: "Indonesian",
    flag: "🇮🇩",
    language: "Bahasa Indonesia",
    langCode: "id-ID",
    pool: ["Senja", "Bintang", "Ombak", "Rindu", "Gagah", "Manis", "Langit", "Nusa", "Bara", "Cahaya"],
    habit:
      "Indonesian handles love soft two-syllable nature words — senja, langit, ombak — and gamers add a squad tag in square brackets.",
    platforms: ["tiktok", "instagram", "free-fire", "whatsapp", "gaming", "youtube"],
  },
  {
    slug: "philippines",
    name: "the Philippines",
    demonym: "Filipino",
    flag: "🇵🇭",
    language: "Filipino",
    langCode: "fil-PH",
    secondLanguage: "English",
    pool: ["Ganda", "Kulit", "Tala", "Alon", "Bagsik", "Idol", "Bes", "Liwanag", "Sipag", "Haribon"],
    habit:
      "Taglish is the norm — a Filipino word plus an English one, frequently with a doubled syllable like Kulit-Kulit for a playful read.",
    platforms: ["tiktok", "facebook", "instagram", "gaming", "roblox", "youtube"],
  },
  {
    slug: "brazil",
    name: "Brazil",
    demonym: "Brazilian",
    flag: "🇧🇷",
    language: "Portuguese",
    langCode: "pt-BR",
    pool: ["Saudade", "Fogo", "Onda", "Bruxo", "Mano", "Vitoria", "Chama", "Selva", "Alma", "Trovao"],
    habit:
      "Brazilian handles keep accents off the username field but put them back in the display name, and gaming tags lean hard on strength words like Trovão and Chama.",
    platforms: ["tiktok", "instagram", "free-fire", "gaming", "youtube", "whatsapp"],
  },
  {
    slug: "pakistan",
    name: "Pakistan",
    demonym: "Pakistani",
    flag: "🇵🇰",
    language: "Urdu",
    langCode: "ur-PK",
    secondLanguage: "English",
    pool: ["Sitara", "Jazba", "Shahzada", "Chand", "Zara", "Barq", "Malang", "Roshni", "Sher", "Junoon"],
    habit:
      "Urdu words transliterated into Latin script carry beautifully — jazba, junoon, roshni — and often sit beside an English adjective.",
    platforms: ["tiktok", "instagram", "free-fire", "pubg-bgmi", "whatsapp", "youtube"],
  },
  {
    slug: "bangladesh",
    name: "Bangladesh",
    demonym: "Bangladeshi",
    flag: "🇧🇩",
    language: "Bengali",
    langCode: "bn-BD",
    pool: ["Rupali", "Megh", "Joy", "Nodi", "Shanto", "Agun", "Tara", "Bijoy", "Kobi", "Shopno"],
    habit:
      "Bengali sound patterns — megh, nodi, shopno — transliterate cleanly and stay short enough for a 14-character game field.",
    platforms: ["tiktok", "facebook", "free-fire", "whatsapp", "gaming", "instagram"],
  },
  {
    slug: "nigeria",
    name: "Nigeria",
    demonym: "Nigerian",
    flag: "🇳🇬",
    language: "English",
    langCode: "en-NG",
    secondLanguage: "Pidgin",
    pool: ["Naija", "Oga", "Sabi", "Zenith", "Ajala", "Gbedu", "Kings", "Ese", "Wahala", "Sharp"],
    habit:
      "Nigerian handles mix Pidgin energy with a title word — Oga, Kings, Chief — and often carry the state or city as a suffix.",
    platforms: ["tiktok", "instagram", "whatsapp", "youtube", "gaming", "facebook"],
  },
  {
    slug: "united-states",
    name: "the United States",
    demonym: "American",
    flag: "🇺🇸",
    language: "English",
    langCode: "en-US",
    pool: ["Maverick", "Rogue", "Aspen", "Blaze", "Harbor", "Rowdy", "Nova", "Ridge", "Echo", "Sable"],
    habit:
      "US handles are the most competitive on earth, so short one-word names are gone — compound words and unusual noun pairs are where availability still lives.",
    platforms: ["tiktok", "instagram", "discord", "roblox", "youtube", "snapchat"],
  },
  {
    slug: "united-kingdom",
    name: "the United Kingdom",
    demonym: "British",
    flag: "🇬🇧",
    language: "English",
    langCode: "en-GB",
    pool: ["Brixton", "Moor", "Pip", "Thistle", "Grim", "Lark", "Fenn", "Chap", "Slate", "Bramble"],
    habit:
      "British handles favour dry, understated words and place names over hype vocabulary, which also keeps them available.",
    platforms: ["tiktok", "instagram", "discord", "gaming", "youtube", "snapchat"],
  },
  {
    slug: "mexico",
    name: "Mexico",
    demonym: "Mexican",
    flag: "🇲🇽",
    language: "Spanish",
    langCode: "es-MX",
    pool: ["Lobo", "Sol", "Cielo", "Fuego", "Chido", "Reina", "Bravo", "Luna", "Nopal", "Rayo"],
    habit:
      "Mexican Spanish handles drop accents in the username and keep them in the display name, and diminutives like -ito or -ita read as friendly rather than childish.",
    platforms: ["tiktok", "instagram", "free-fire", "whatsapp", "gaming", "youtube"],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    demonym: "Vietnamese",
    flag: "🇻🇳",
    language: "Vietnamese",
    langCode: "vi-VN",
    pool: ["Mun", "Bao", "Linh", "Kiet", "Suong", "Hoa", "Long", "Mai", "Vu", "Tho"],
    habit:
      "Diacritics are stripped in username fields but kept in display names, and single-syllable names stack neatly into two-word handles.",
    platforms: ["tiktok", "facebook", "free-fire", "gaming", "youtube", "instagram"],
  },
  {
    slug: "turkey",
    name: "Turkey",
    demonym: "Turkish",
    flag: "🇹🇷",
    language: "Turkish",
    langCode: "tr-TR",
    pool: ["Yildiz", "Kartal", "Deniz", "Alev", "Cesur", "Ruzgar", "Ay", "Bora", "Efe", "Zafer"],
    habit:
      "Turkish handles run on strong single nouns — kartal, bora, zafer — and dotted/undotted i differences are worth checking before you commit.",
    platforms: ["tiktok", "instagram", "pubg-bgmi", "gaming", "discord", "youtube"],
  },
  {
    slug: "egypt",
    name: "Egypt",
    demonym: "Egyptian",
    flag: "🇪🇬",
    language: "Arabic",
    langCode: "ar-EG",
    pool: ["Nour", "Sahara", "Malik", "Amir", "Zahra", "Rimal", "Fares", "Layl", "Basma", "Sahm"],
    habit:
      "Arabic handles are usually written in Latin transliteration for platform compatibility, with the Arabic spelling in the display name.",
    platforms: ["tiktok", "instagram", "free-fire", "whatsapp", "gaming", "youtube"],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    demonym: "Saudi",
    flag: "🇸🇦",
    language: "Arabic",
    langCode: "ar-SA",
    pool: ["Faisal", "Reem", "Najd", "Sahm", "Ghaith", "Anwar", "Rakan", "Lulu", "Sadeem", "Aseel"],
    habit:
      "Gulf handles favour classical Arabic names with a short English suffix, and right-to-left display names need testing before you save them.",
    platforms: ["tiktok", "snapchat", "instagram", "gaming", "youtube", "whatsapp"],
  },
  {
    slug: "russia",
    name: "Russia",
    demonym: "Russian",
    flag: "🇷🇺",
    language: "Russian",
    langCode: "ru-RU",
    pool: ["Zima", "Volk", "Mir", "Sokol", "Groza", "Vesna", "Kray", "Buran", "Zvezda", "Taiga"],
    habit:
      "Latin transliteration keeps handles usable across platforms while Cyrillic stays in the display name, and winter vocabulary is a genuine local signature.",
    platforms: ["tiktok", "discord", "gaming", "telegram", "youtube", "instagram"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    demonym: "Thai",
    flag: "🇹🇭",
    language: "Thai",
    langCode: "th-TH",
    pool: ["Ploy", "Nam", "Fah", "Kwan", "Chang", "Rak", "Mek", "Beam", "Som", "Dao"],
    habit:
      "Thai nicknames are already short by tradition — Ploy, Beam, Nam — so handles are usually that nickname plus one English word.",
    platforms: ["tiktok", "instagram", "free-fire", "gaming", "youtube", "discord"],
  },
  {
    slug: "spain",
    name: "Spain",
    demonym: "Spanish",
    flag: "🇪🇸",
    language: "Spanish",
    langCode: "es-ES",
    pool: ["Marea", "Duende", "Hierro", "Vega", "Sombra", "Brisa", "Toro", "Norte", "Nieve", "Ola"],
    habit:
      "Peninsular Spanish handles read more literary than Latin American ones, leaning on single evocative nouns rather than hype words.",
    platforms: ["tiktok", "instagram", "gaming", "discord", "youtube", "whatsapp"],
  },
  {
    slug: "germany",
    name: "Germany",
    demonym: "German",
    flag: "🇩🇪",
    language: "German",
    langCode: "de-DE",
    pool: ["Nebel", "Falke", "Stahl", "Wald", "Blitz", "Rabe", "Frost", "Hain", "Kiez", "Zorn"],
    habit:
      "German compounding is a gift for handles: two short nouns fuse into one available word, and umlauts get written as ae, oe and ue.",
    platforms: ["tiktok", "instagram", "discord", "gaming", "youtube", "roblox"],
  },
  {
    slug: "france",
    name: "France",
    demonym: "French",
    flag: "🇫🇷",
    language: "French",
    langCode: "fr-FR",
    pool: ["Brume", "Corbeau", "Lune", "Velours", "Orage", "Marine", "Givre", "Rive", "Sable", "Eclat"],
    habit:
      "French handles drop accents in usernames, and soft nouns like brume or velours give the aesthetic look without English cliché.",
    platforms: ["tiktok", "instagram", "discord", "gaming", "youtube", "snapchat"],
  },
  {
    slug: "japan",
    name: "Japan",
    demonym: "Japanese",
    flag: "🇯🇵",
    language: "Japanese",
    langCode: "ja-JP",
    pool: ["Sora", "Yuki", "Kage", "Hikari", "Rin", "Kaze", "Tsuki", "Hana", "Ryu", "Mochi"],
    habit:
      "Romaji handles travel best internationally while kana sits in the display name, and two-mora words like Rin or Sora stay memorable.",
    platforms: ["tiktok", "instagram", "discord", "gaming", "youtube", "telegram"],
  },
  {
    slug: "south-korea",
    name: "South Korea",
    demonym: "Korean",
    flag: "🇰🇷",
    language: "Korean",
    langCode: "ko-KR",
    pool: ["Haneul", "Byul", "Dal", "Nari", "Baram", "Ssal", "Jini", "Areum", "Bom", "Nunbit"],
    habit:
      "Romanised Korean nature words — haneul, byul, bom — are short, soft and still widely available outside Korea.",
    platforms: ["tiktok", "instagram", "discord", "gaming", "youtube", "roblox"],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    demonym: "Malaysian",
    flag: "🇲🇾",
    language: "Malay",
    langCode: "ms-MY",
    pool: ["Hujan", "Bayu", "Permata", "Rimba", "Suria", "Damai", "Kilat", "Mutiara", "Awan", "Teguh"],
    habit:
      "Malay handles share vocabulary with Indonesian but skew slightly more formal, and mixed Malay-English pairs are extremely common.",
    platforms: ["tiktok", "instagram", "free-fire", "gaming", "whatsapp", "youtube"],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    demonym: "South African",
    flag: "🇿🇦",
    language: "English",
    langCode: "en-ZA",
    secondLanguage: "Zulu",
    pool: ["Kasi", "Sharp", "Umoya", "Veld", "Braai", "Zulu", "Karoo", "Lekker", "Sipho", "Thandi"],
    habit:
      "Local slang like lekker, sharp and kasi instantly signals where you are from and rarely collides with global handles.",
    platforms: ["tiktok", "instagram", "whatsapp", "gaming", "youtube", "discord"],
  },
  {
    slug: "italy",
    name: "Italy",
    demonym: "Italian",
    flag: "🇮🇹",
    language: "Italian",
    langCode: "it-IT",
    pool: ["Fumo", "Onda", "Lupo", "Vento", "Neve", "Rosso", "Sera", "Bosco", "Fiamma", "Perla"],
    habit:
      "Italian nouns end in vowels, so they flow into a second word without a separator and read well aloud.",
    platforms: ["tiktok", "instagram", "gaming", "discord", "youtube", "whatsapp"],
  },
];

export const COUNTRY_MAP: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.slug, c]),
);

export interface MarketPage {
  slug: string;
  country: Country;
  platform: Platform;
  h1: string;
  title: string;
  description: string;
  keyword: string;
  intro: string;
  examples: string[];
  sections: { h2: string; body: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const SUFFIXES = ["", "x", "yt", "ff", "07", "_", "official"];

function examplesFor(c: Country, p: Platform): string[] {
  const out: string[] = [];
  const pool = c.pool;
  for (let i = 0; i < 8; i++) {
    const a = pool[i % pool.length];
    const b = pool[(i * 3 + 4) % pool.length];
    const suffix = SUFFIXES[i % SUFFIXES.length];
    const joiner = p.slug === "discord" || p.slug === "instagram" ? "." : "";
    let name = `${a}${joiner}${b}`;
    if (p.slug === "instagram" || p.slug === "discord" || p.slug === "telegram") {
      name = name.toLowerCase();
    }
    if (suffix) name = `${name}${joiner && suffix === "_" ? "" : ""}${suffix}`;
    out.push(name.slice(0, p.slug === "pubg-bgmi" ? 14 : 20));
  }
  return Array.from(new Set(out));
}

function buildPage(c: Country, p: Platform): MarketPage {
  const inName = `in ${c.name}`;
  const keyword = `best ${p.name === "gaming" ? "gaming" : p.name} nicknames ${inName}`;
  const h1 = `Best ${p.name === "gaming" ? "Gaming" : p.name} Nicknames ${inName === "in the United States" ? "in the USA" : inName}`;

  return {
    slug: `${p.slug}-${c.slug}`,
    country: c,
    platform: p,
    h1,
    title: `${h1} (${new Date().getFullYear()}) — Free Generator`,
    description: `Generate ${c.demonym} ${p.name} nickname ideas in ${c.language}${
      c.secondLanguage ? ` and ${c.secondLanguage}` : ""
    }. Copy, style and export names that fit ${p.name}'s rules — free, no signup.`,
    keyword,
    intro: `Looking for a ${p.name} name that actually sounds ${c.demonym}? This generator mixes ${c.language} vocabulary with the naming habits people in ${c.name} already use, then checks the result against ${p.name}'s field limits so you can paste it straight in.`,
    examples: examplesFor(c, p),
    sections: [
      {
        h2: `What makes a good ${p.name} name ${inName}`,
        body: [
          `${c.habit}`,
          `${p.vibe} Combine the two and you get a name that reads as local to a ${c.demonym} audience while still working for anyone who lands on your profile from abroad.`,
        ],
      },
      {
        h2: `${p.name} name rules you need to know`,
        body: [
          p.rules,
          p.symbols
            ? `Decorative Unicode works here, so you can style the name with our fancy text tool before saving it. Keep a plain-text fallback in case the field rejects a character.`
            : `This surface strips most decorative characters, so build the name from plain letters and numbers and save styling for your bio.`,
        ],
      },
      {
        h2: `${c.language} words that work well in handles`,
        body: [
          `These are the words our ${c.name} pool draws from. Each one is short, easy to type on a phone keyboard and recognisable to local viewers: ${c.pool.join(", ")}.`,
          c.secondLanguage
            ? `Because ${c.secondLanguage} is widely used in ${c.name}, mixed-language handles are normal and often more available than pure ${c.language} ones.`
            : `Pairing one ${c.language} word with one English word usually finds an available handle faster than two local words.`,
        ],
      },
      {
        h2: `How to pick and lock your name`,
        body: [
          `Generate a batch, tick the names you like, then export the shortlist before you rename anything. Handles get taken quickly in high-traffic markets like ${c.name}, so having five backups saves you a second session.`,
        ],
        list: [
          `Say it out loud — if a friend cannot repeat it after hearing it once, shorten it.`,
          `Check the same handle on your other platforms so your accounts match.`,
          `Avoid numbers that look like a birth year unless you want your age public.`,
          `Test the name in ${p.name} before deleting your old one.`,
          `Keep a plain version without symbols for search and for people typing it manually.`,
        ],
      },
    ],
    faqs: [
      {
        q: `What is the best ${p.name} nickname for ${c.demonym} users?`,
        a: `The best name is short, sayable in ${c.language}, and unique enough to be available. Two-word combinations from local vocabulary — like ${examplesFor(c, p).slice(0, 3).join(", ")} — perform better than number-padded handles.`,
      },
      {
        q: `Can I use ${c.language} characters in my ${p.name} name?`,
        a: p.symbols
          ? `Yes in the display name, which accepts Unicode. The username field is safer in Latin letters, so transliterate there and keep the local script for display.`
          : `The username field only accepts Latin letters, numbers and limited punctuation, so transliterate. Your display or bio text can carry the local script.`,
      },
      {
        q: `Is this ${p.name} nickname generator free ${inName}?`,
        a: `Yes. Every generator on the site is free, needs no account, and runs entirely in your browser, so nothing you type is uploaded.`,
      },
      {
        q: `How many characters can a ${p.name} name have?`,
        a: p.rules,
      },
    ],
    related: c.platforms
      .filter((s) => s !== p.slug)
      .slice(0, 3)
      .map((s) => `${s}-${c.slug}`),
  };
}

export const MARKET_PAGES: MarketPage[] = COUNTRIES.flatMap((c) =>
  (c.platforms.length ? c.platforms : CORE)
    .map((s) => PLATFORM_MAP[s])
    .filter(Boolean)
    .map((p) => buildPage(c, p)),
);

export const MARKET_MAP: Record<string, MarketPage> = Object.fromEntries(
  MARKET_PAGES.map((m) => [m.slug, m]),
);

export function pagesForCountry(slug: string): MarketPage[] {
  return MARKET_PAGES.filter((m) => m.country.slug === slug);
}
