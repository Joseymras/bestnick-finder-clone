// Deep keyword landing pages. Each entry supplies its own angle, examples and
// FAQ specifics; the builder expands them into long-form, page-unique copy.

import { SITE } from "./content";

export type LandingTool = "names" | "fancy" | "username" | "mixer" | "symbols";

interface LandingSpec {
  slug: string;
  h1: string;
  keyword: string;
  /** One-sentence promise used in the meta description. */
  promise: string;
  /** 2–3 sentences of page-specific framing. Hand written per page. */
  angle: string;
  /** What the reader is naming. */
  subject: string;
  /** Who they are. */
  audience: string;
  /** Where the name will be used. */
  surface: string;
  /** Character-limit / rules note specific to the surface. */
  rules: string;
  /** Five concrete, page-specific tips. */
  tips: string[];
  examples: string[];
  tool: LandingTool;
  flavor: "gamer" | "aesthetic" | "fantasy" | "professional";
  related: string[];
}

const SPECS: LandingSpec[] = [
  {
    slug: "aesthetic-usernames",
    h1: "Aesthetic Username Ideas",
    keyword: "aesthetic usernames",
    promise: "Soft, lowercase aesthetic username ideas for Instagram, TikTok and Pinterest.",
    angle:
      "Aesthetic handles work by restraint. They are almost always lowercase, built from two gentle nouns, and joined by a single period or underscore — the visual equivalent of a muted colour palette. The moment you add numbers or hard consonants the effect collapses.",
    subject: "an aesthetic username",
    audience: "people curating a soft, cohesive online presence",
    surface: "Instagram, TikTok and Pinterest",
    rules:
      "Instagram allows 30 characters, letters, numbers, periods and underscores. Aesthetic handles rarely need more than 15.",
    tips: [
      "Stay entirely lowercase — capitals break the soft look instantly.",
      "Pair one nature word with one texture word: cloud, linen, peach, marsh, velour.",
      "Use a single separator. Two periods reads as a typo, not a style.",
      "Avoid numbers unless they carry meaning, like a birth year you actually use.",
      "Say it aloud — if it sounds calm, it looks calm.",
    ],
    examples: ["peach.linen", "cloud_marsh", "velourbloom", "honey.dusk", "petal_soft", "moss.latte"],
    tool: "names",
    flavor: "aesthetic",
    related: ["soft-aesthetic-names", "cute-usernames", "instagram-username-ideas"],
  },
  {
    slug: "cool-usernames-for-boys",
    h1: "Cool Username Ideas for Boys",
    keyword: "cool usernames for boys",
    promise: "Strong, sharp username ideas for gaming, social and messaging apps.",
    angle:
      "The handles that read as genuinely cool are short and consonant-heavy — one or two syllables that land hard. Long compound names built from three adjectives look like a first attempt, which is exactly the impression you are trying to avoid.",
    subject: "a cool username",
    audience: "boys and young men picking a handle they will keep",
    surface: "games, Discord and social apps",
    rules:
      "Most games cap names between 12 and 16 characters, so build something that survives truncation.",
    tips: [
      "Two syllables beats four. Short names get remembered and shouted.",
      "Hard consonants — k, x, v, z — carry more weight than soft ones.",
      "Skip the year. A name with 2011 in it dates you the moment it stops being current.",
      "Check it as a handle on every platform before you commit anywhere.",
      "If a friend cannot spell it back after hearing it once, simplify.",
    ],
    examples: ["Kaverex", "Vexdrift", "NoxRider", "Halcyn", "Draveth", "Zephkor"],
    tool: "names",
    flavor: "gamer",
    related: ["edgy-usernames", "dark-usernames", "one-word-usernames"],
  },
  {
    slug: "cool-usernames-for-girls",
    h1: "Cool Username Ideas for Girls",
    keyword: "cool usernames for girls",
    promise: "Distinctive username ideas for girls — from soft and pretty to sharp and competitive.",
    angle:
      "There is no single register here, and that is the point. A handle for a competitive shooter and a handle for a photography account are solving different problems, so pick the room you are walking into first and generate for that.",
    subject: "a username",
    audience: "girls and young women choosing a handle",
    surface: "Instagram, TikTok, Discord and games",
    rules:
      "Handles are permanent-ish. Changing later costs you every tag, mention and search someone has saved.",
    tips: [
      "Decide the register first: soft, playful, or competitive. Do not mix two.",
      "One personal element — initials, a flower, a place — makes a random name yours.",
      "Underscores read softer than periods; periods read cleaner than numbers.",
      "Reserve the same handle everywhere on the same afternoon.",
      "Avoid anything tied to a fandom you might leave in a year.",
    ],
    examples: ["lunavere", "sable.rose", "mirrastorm", "vaelrie", "cottonlark", "novaquinn"],
    tool: "names",
    flavor: "aesthetic",
    related: ["aesthetic-usernames", "baddie-usernames", "cute-usernames"],
  },
  {
    slug: "matching-usernames-for-couples",
    h1: "Matching Usernames for Couples",
    keyword: "matching usernames for couples",
    promise: "Paired username ideas for couples, best friends and duos — built from both names.",
    angle:
      "Matching handles work best as a pair that only makes sense together: one takes the first half of the idea, the other takes the second. Identical names with a 1 and a 2 appended are the version everyone regrets.",
    subject: "a matching pair of usernames",
    audience: "couples, duos and best friends",
    surface: "Instagram, TikTok and co-op games",
    rules: "Both handles need to be free on the same platform, so check them together.",
    tips: [
      "Split one phrase across two handles rather than numbering the same word.",
      "Blend the two real names into a single word, then split that word in half.",
      "Keep the same separator and the same casing across both handles.",
      "Pick something that still works if you are described individually.",
      "Reserve both at the same time or the pairing breaks.",
    ],
    examples: [
      "sun.andmoon / moon.andsun",
      "yourfavduo1",
      "kaira.mine / mine.kaira",
      "lockandkey_a / lockandkey_b",
      "twohalves.left / twohalves.right",
    ],
    tool: "mixer",
    flavor: "aesthetic",
    related: ["cute-usernames", "aesthetic-usernames", "funny-usernames"],
  },
  {
    slug: "instagram-username-ideas",
    h1: "Instagram Username Ideas",
    keyword: "instagram username ideas",
    promise: "Available-sounding Instagram handle ideas plus the rules Instagram actually enforces.",
    angle:
      "Instagram handles are searchable, which makes them a discovery asset rather than decoration. A handle that contains a word people already search — your city, your craft, your niche — quietly earns you profile visits your display name never will.",
    subject: "an Instagram username",
    audience: "creators, brands and everyday users",
    surface: "Instagram",
    rules:
      "Up to 30 characters. Letters, numbers, periods and underscores only. Periods cannot start, end or repeat.",
    tips: [
      "Put a searchable word in the handle if the account has a topic.",
      "Keep the display name human and the handle plain — they do different jobs.",
      "Periods break better than underscores when a handle is read aloud.",
      "Test the handle in a URL: instagram.com/yourhandle should look clean.",
      "Claim the same string on TikTok and YouTube before you announce it.",
    ],
    examples: ["lensbyaria", "the.marsh.co", "quietfilmclub", "ari.shoots", "dailygrainfilm"],
    tool: "username",
    flavor: "aesthetic",
    related: ["tiktok-username-ideas", "aesthetic-usernames", "bio-symbols-copy-paste"],
  },
  {
    slug: "tiktok-username-ideas",
    h1: "TikTok Username Ideas",
    keyword: "tiktok username ideas",
    promise: "TikTok handle ideas that are easy to say in a video and easy to type in search.",
    angle:
      "TikTok handles are spoken far more often than they are read — in your own videos, in duets, in comments telling someone else to go follow you. If a handle cannot survive being said out loud once, it is costing you followers every day.",
    subject: "a TikTok username",
    audience: "TikTok creators",
    surface: "TikTok",
    rules: "Up to 24 characters, letters, numbers, underscores and periods.",
    tips: [
      "Say it in a sentence: 'follow me at ___'. If you have to spell it, change it.",
      "Avoid l/I and 0/O collisions — they are unreadable in the app's font.",
      "Niche words in the handle help the search box, not just the algorithm.",
      "Short handles fit the on-screen overlay without wrapping.",
      "Match your Instagram handle exactly if you cross-post.",
    ],
    examples: ["notyourchefagain", "marsh.eats", "dailypanic", "quiet.hours", "brewwithari"],
    tool: "username",
    flavor: "aesthetic",
    related: ["instagram-username-ideas", "youtube-channel-name-ideas", "funny-usernames"],
  },
  {
    slug: "youtube-channel-name-ideas",
    h1: "YouTube Channel Name Ideas",
    keyword: "youtube channel name ideas",
    promise: "Channel name ideas that stay searchable as your content grows.",
    angle:
      "The trap with channel names is naming the video you are making this month instead of the channel you want in three years. A name that describes a format outlives a name that describes a topic you will exhaust.",
    subject: "a YouTube channel name",
    audience: "new and rebranding YouTubers",
    surface: "YouTube",
    rules:
      "Channel names can be changed, but the handle and existing subscriber recognition make it expensive.",
    tips: [
      "Name the format or the perspective, not the current topic.",
      "Two words is the sweet spot for thumbnails and voice search.",
      "Check that the .com and the matching handle are both free.",
      "Avoid 'TV', 'HD' and 'Official' — they read as filler.",
      "Test it in a sentence: 'this week on ___' should sound natural.",
    ],
    examples: ["Slow Build", "The Marsh Method", "Second Take", "Quiet Workshop", "Field Notes Daily"],
    tool: "names",
    flavor: "professional",
    related: ["business-name-ideas", "tiktok-username-ideas", "professional-username-ideas"],
  },
  {
    slug: "twitch-username-ideas",
    h1: "Twitch Username Ideas",
    keyword: "twitch username ideas",
    promise: "Stream-ready Twitch names that work in chat, on alerts and in raid messages.",
    angle:
      "A Twitch name lives inside a scrolling chat window, so it competes with dozens of other names for a quarter of a second of attention. Distinctive letter shapes matter more here than clever meaning.",
    subject: "a Twitch username",
    audience: "streamers building a channel",
    surface: "Twitch",
    rules: "4–25 characters, letters, numbers and underscores. No periods, no hyphens.",
    tips: [
      "Pick a name that looks distinct in a fast-scrolling chat, not just on a page.",
      "Underscores are your only separator, so use at most one.",
      "Leave room for emote prefixes if you plan to build channel emotes.",
      "Make sure a raid message reading your name aloud sounds good.",
      "Avoid names that another streamer already owns on YouTube.",
    ],
    examples: ["VexOnAir", "marshplays", "NoxLatency", "quiet_frames", "ArcadeOwl"],
    tool: "username",
    flavor: "gamer",
    related: ["valorant-name-ideas", "clan-name-generator", "cool-usernames-for-boys"],
  },
  {
    slug: "roblox-username-ideas",
    h1: "Roblox Username Ideas",
    keyword: "roblox username ideas",
    promise: "Roblox name ideas that pass the filter and are still available.",
    angle:
      "Roblox usernames are heavily filtered and almost entirely taken, which is why the successful pattern is an invented word rather than two real ones. Made-up names sail past both problems at once.",
    subject: "a Roblox username",
    audience: "Roblox players",
    surface: "Roblox",
    rules:
      "3–20 characters, letters, numbers and a single underscore. The moderation filter rejects a lot of real-word combinations.",
    tips: [
      "Invented words beat real words — they are far more likely to be free.",
      "One underscore maximum, and never at the start or end.",
      "Avoid anything that could read as a real name; the filter is strict.",
      "Generate a batch of twenty and test them in the signup field in one sitting.",
      "Remember the first name change is the only cheap one.",
    ],
    examples: ["Zephkora", "Bloxvane", "Nirralux", "Quenvo", "Draviko", "Solmara"],
    tool: "names",
    flavor: "fantasy",
    related: ["minecraft-username-ideas", "one-word-usernames", "short-usernames"],
  },
  {
    slug: "minecraft-username-ideas",
    h1: "Minecraft Username Ideas",
    keyword: "minecraft username ideas",
    promise: "Minecraft name ideas that fit the 16-character limit and read well above your head.",
    angle:
      "Your Minecraft name renders as a floating nameplate that other players read from a distance, in a pixel font, at an angle. Short and high-contrast beats clever every single time.",
    subject: "a Minecraft username",
    audience: "Minecraft players and server regulars",
    surface: "Minecraft Java and Bedrock",
    rules: "3–16 characters, letters, numbers and underscores only.",
    tips: [
      "Aim for 8–12 characters so the nameplate stays readable at range.",
      "Avoid lookalike pairs like rn/m and l/I in the pixel font.",
      "Underscores read as gaps from a distance — use one at most.",
      "Names free up over time, so re-check a favourite occasionally.",
      "Pick something that also works as your server or realm name.",
    ],
    examples: ["Coalveil", "Emberpick", "Loomcraft", "Deepslate_", "Runeboar", "Oakvane"],
    tool: "names",
    flavor: "fantasy",
    related: ["roblox-username-ideas", "clan-name-generator", "short-usernames"],
  },
  {
    slug: "steam-name-ideas",
    h1: "Steam Name Ideas",
    keyword: "steam name ideas",
    promise: "Steam display name ideas, including how far you can push symbols and styled text.",
    angle:
      "Steam is unusually permissive: the display name accepts full Unicode, so styled fonts and symbol frames render properly in your friends list. That freedom is also the trap — a name nobody can type is a name nobody can search for.",
    subject: "a Steam display name",
    audience: "Steam users and PC gamers",
    surface: "Steam",
    rules:
      "Display names accept most Unicode characters, including styled fonts and symbols. Your account name stays plain.",
    tips: [
      "Style the display name, keep the underlying account name plain and typeable.",
      "One symbol pair either side of the name is the ceiling before it looks cluttered.",
      "Test how it renders in the small friends-list font, not just here.",
      "Very unusual glyphs can show as boxes on some friends' machines.",
      "Keep a plain version noted somewhere for support tickets.",
    ],
    examples: ["꧁Vexdrift꧂", "𝕹𝖔𝖝𝖗𝖎𝖉𝖊𝖗", "☾ halcyn ☽", "ᴠᴀᴇʟᴛʜ", "⟦ Zephkor ⟧"],
    tool: "fancy",
    flavor: "gamer",
    related: ["small-caps-generator", "bio-symbols-copy-paste", "valorant-name-ideas"],
  },
  {
    slug: "valorant-name-ideas",
    h1: "Valorant Name Ideas",
    keyword: "valorant name ideas",
    promise: "Valorant name and tagline ideas that fit Riot's limits.",
    angle:
      "Valorant splits your identity in two: a display name and a short tagline after the hash. The best setups treat them as one phrase broken across the divider rather than a name with a random suffix bolted on.",
    subject: "a Valorant name",
    audience: "Valorant players",
    surface: "Valorant and the Riot ID system",
    rules:
      "Riot IDs are 3–16 characters with a 3–5 character tagline. Changes are limited, so pick carefully.",
    tips: [
      "Design the name and the tagline as one idea split in half.",
      "Short names sit better on the killfeed and the scoreboard.",
      "Riot filters aggressively — avoid anything borderline.",
      "Taglines are a great place for your role or your region.",
      "Your name change budget is limited; test the string before you spend it.",
    ],
    examples: ["Vexdrift#OPS", "halcyn#SMOKE", "NoxEntry#DUEL", "Sableye#EU", "quietaim#FLASH"],
    tool: "names",
    flavor: "gamer",
    related: ["twitch-username-ideas", "clan-name-generator", "cool-usernames-for-boys"],
  },
  {
    slug: "clan-name-generator",
    h1: "Clan Name Generator",
    keyword: "clan name generator",
    promise: "Clan names and matching tags for competitive squads in any game.",
    angle:
      "A clan name has to survive being abbreviated. Whatever you pick, the community will reduce it to three or four letters within a week, so choose a name whose abbreviation you actually like.",
    subject: "a clan name",
    audience: "squad leaders and competitive teams",
    surface: "Free Fire, PUBG, CoD and Valorant",
    rules:
      "Most games allow a 3–5 character clan tag shown before every member's name, plus a longer clan name.",
    tips: [
      "Choose the tag first, then build the full name around it.",
      "Three hard letters make the strongest tag: VEX, NOX, KRX.",
      "Avoid tags that collide with an established esports org.",
      "Make sure the tag reads correctly in all-caps, because it always will be.",
      "Keep the full name under twenty characters for roster screens.",
    ],
    examples: ["Nightfall Order · NFO", "Vexed Collective · VEX", "Iron Requiem · IRQ", "Null Signal · NUL"],
    tool: "names",
    flavor: "gamer",
    related: ["guild-name-generator", "team-name-generator", "valorant-name-ideas"],
  },
  {
    slug: "guild-name-generator",
    h1: "Guild Name Generator",
    keyword: "guild name generator",
    promise: "Fantasy guild names for MMOs, RPGs and tabletop campaigns.",
    angle:
      "Guild names carry lore in a way clan tags do not. The reliable formula is an abstract noun paired with a concrete one — Ashen Compact, Silent Ledger — which sounds like an organisation with a history rather than a group of friends.",
    subject: "a guild name",
    audience: "MMO guild leaders and tabletop groups",
    surface: "MMOs, RPGs and Discord servers",
    rules: "Most MMOs allow 20–24 characters including spaces for guild names.",
    tips: [
      "Pair an abstract noun with a concrete one for instant lore.",
      "Avoid apostrophes — many games strip or reject them.",
      "Read the name as a guild-invite message before you commit.",
      "Check the abbreviation is not already taken on your server.",
      "Leave room for a rank suffix if your game shows one.",
    ],
    examples: ["Ashen Compact", "Silent Ledger", "The Hollow Choir", "Emberwrit", "Order of Dim Lanterns"],
    tool: "names",
    flavor: "fantasy",
    related: ["clan-name-generator", "team-name-generator", "roblox-username-ideas"],
  },
  {
    slug: "team-name-generator",
    h1: "Team Name Generator",
    keyword: "team name generator",
    promise: "Team names for esports rosters, quiz nights, sports sides and work groups.",
    angle:
      "A team name is read by other people far more than by your own team — in brackets, on scoreboards, in group chats. Aim for something a commentator could say twice in one sentence without stumbling.",
    subject: "a team name",
    audience: "captains and organisers",
    surface: "esports brackets, leagues and work tools",
    rules: "Bracket software commonly truncates names past 20 characters.",
    tips: [
      "Two words, both easy to pronounce, no inside joke that needs explaining.",
      "Check how it looks truncated to twenty characters.",
      "Avoid a name that only works while a specific member is on the roster.",
      "Test the abbreviation, because the bracket will generate one for you.",
      "Make sure it is clean enough for an official broadcast.",
    ],
    examples: ["Late Rotate", "Copper Circuit", "The Second Wave", "Nine Lives Nine", "Quiet Riot Club"],
    tool: "names",
    flavor: "professional",
    related: ["clan-name-generator", "guild-name-generator", "business-name-ideas"],
  },
  {
    slug: "anime-username-ideas",
    h1: "Anime Username Ideas",
    keyword: "anime username ideas",
    promise: "Anime-inspired handles that do not lock you to one series.",
    angle:
      "Naming yourself after a single character ties your identity to a fandom you may drift away from. Names built from the aesthetic — the syllables, the imagery, the mood — age far better than names built from a cast list.",
    subject: "an anime-inspired username",
    audience: "anime fans and cosplay accounts",
    surface: "Discord, Instagram, X and MyAnimeList",
    rules: "Character names are usually taken; invented syllables are not.",
    tips: [
      "Borrow the sound, not the character name.",
      "Two-syllable Japanese-style syllables read well in any script.",
      "Avoid series-specific words that will date the handle.",
      "Combine a soft syllable with a hard one for balance.",
      "Check pronunciation with someone outside the fandom.",
    ],
    examples: ["Yurenka", "shiroame", "Kaenlith", "hoshi.vel", "Ryuzen", "amaneko"],
    tool: "names",
    flavor: "fantasy",
    related: ["aesthetic-usernames", "cute-usernames", "soft-aesthetic-names"],
  },
  {
    slug: "one-word-usernames",
    h1: "One Word Username Ideas",
    keyword: "one word usernames",
    promise: "Single-word handles with no numbers, no underscores and no filler.",
    angle:
      "A one-word handle signals that you got there early or chose well, which is why they are the most sought-after format on every platform. Since the dictionary is exhausted, the realistic route is an invented word that sounds like it could have been one.",
    subject: "a one-word username",
    audience: "anyone who wants a clean, unpunctuated handle",
    surface: "every platform",
    rules: "Real one-word handles are almost universally taken on major platforms.",
    tips: [
      "Invent a word rather than hunting for a free real one.",
      "Six to nine letters is the range that still sounds like a word.",
      "Alternate consonants and vowels so it stays pronounceable.",
      "Avoid double letters that invite typos.",
      "Register it everywhere the same day you find it free.",
    ],
    examples: ["Halcyn", "Vaeloru", "Quenar", "Sarivel", "Noxwren", "Ilvara"],
    tool: "names",
    flavor: "fantasy",
    related: ["short-usernames", "cool-usernames-for-boys", "roblox-username-ideas"],
  },
  {
    slug: "short-usernames",
    h1: "Short Username Ideas",
    keyword: "short usernames",
    promise: "Three to six character handles that still fit strict game name limits.",
    angle:
      "Short handles are the only format that survives every character limit you will ever meet, from a five-character Valorant tagline to a scoreboard that truncates at eight. The scarcity is real, but invented short words are still findable.",
    subject: "a short username",
    audience: "players fighting strict character limits",
    surface: "games with tight name fields",
    rules: "Many games enforce a minimum of three characters and a maximum of eight to twelve.",
    tips: [
      "Four to six characters is the practical sweet spot.",
      "Drop vowels from a longer word you already like.",
      "Avoid ambiguity: no 1/l, no 0/O.",
      "Short names get typed constantly, so test it on a phone keyboard.",
      "Have three backups — short handles go fast.",
    ],
    examples: ["Vexk", "Nrra", "Zolt", "Kyve", "Brix", "Onyx"],
    tool: "names",
    flavor: "gamer",
    related: ["one-word-usernames", "minecraft-username-ideas", "valorant-name-ideas"],
  },
  {
    slug: "dark-usernames",
    h1: "Dark Username Ideas",
    keyword: "dark usernames",
    promise: "Shadowy, gothic handles that stay readable and platform-safe.",
    angle:
      "Dark names fail when they overreach. One evocative word carries far more menace than a stack of grim adjectives, and it clears content filters that the stacked version will not.",
    subject: "a dark username",
    audience: "players and posters who want a shadowed identity",
    surface: "games, Discord and X",
    rules: "Most platforms filter overtly violent terms; imagery beats explicitness.",
    tips: [
      "Suggest rather than state — imagery clears filters, explicit words do not.",
      "Latinate and archaic words age better than slang.",
      "One dark word plus one neutral word reads more sinister than two dark words.",
      "Skip edgy numbers; they undercut the tone.",
      "Read it back in a year and check you still want to be introduced with it.",
    ],
    examples: ["Nocturnvale", "Ashenrite", "Gravemoor", "Hollowlark", "Duskrend", "Mournvex"],
    tool: "names",
    flavor: "gamer",
    related: ["edgy-usernames", "cool-usernames-for-boys", "guild-name-generator"],
  },
  {
    slug: "cute-usernames",
    h1: "Cute Username Ideas",
    keyword: "cute usernames",
    promise: "Sweet, warm handles for socials, messaging and cosy game profiles.",
    angle:
      "Cute reads as sincere when it is specific. A named food, a small animal, a weather word — these land warmly, while a generic pile of diminutives just reads as filler.",
    subject: "a cute username",
    audience: "people who want a warm, friendly handle",
    surface: "Instagram, Discord and cosy games",
    rules: "Lowercase with a single separator is the standard shape.",
    tips: [
      "Be specific: 'mochi' beats 'sweet', 'wren' beats 'birdie'.",
      "Keep it lowercase and short.",
      "One diminutive suffix is plenty.",
      "Pair a food word with a texture word for instant warmth.",
      "Avoid baby talk you will outgrow.",
    ],
    examples: ["mochi.wren", "peachfuzz", "bun.and.jam", "sootling", "cocoafern", "tinypocket"],
    tool: "names",
    flavor: "aesthetic",
    related: ["soft-aesthetic-names", "aesthetic-usernames", "matching-usernames-for-couples"],
  },
  {
    slug: "funny-usernames",
    h1: "Funny Username Ideas",
    keyword: "funny usernames",
    promise: "Genuinely funny handles that still work when you are not joking.",
    angle:
      "The risk with a funny handle is that it is funny once and permanent forever. The versions that survive are gently absurd rather than punchline-shaped, so they still work when the context is serious.",
    subject: "a funny username",
    audience: "people who want a handle with personality",
    surface: "Discord, X and games",
    rules: "A joke that needs context does not travel; a mood does.",
    tips: [
      "Aim for absurd, not for a punchline you will hear a thousand times.",
      "Avoid jokes about current events; they expire.",
      "Understatement outlasts exaggeration.",
      "Read it in a serious sentence and check you can live with it.",
      "Keep it clean enough for a broadcast or a job search.",
    ],
    examples: ["notyourchefagain", "mildlyferal", "loadingforever", "profoundlyokay", "thirdbreakfast"],
    tool: "names",
    flavor: "aesthetic",
    related: ["cute-usernames", "tiktok-username-ideas", "cool-usernames-for-girls"],
  },
  {
    slug: "baddie-usernames",
    h1: "Baddie Username Ideas",
    keyword: "baddie usernames",
    promise: "Confident, high-gloss handles with attitude for Instagram and TikTok.",
    angle:
      "The baddie register is confidence expressed through economy — a short, hard word with no explanation attached. Adding qualifiers dilutes exactly the quality you are going for.",
    subject: "a baddie username",
    audience: "creators building a bold, high-gloss presence",
    surface: "Instagram and TikTok",
    rules: "Short and unpunctuated reads strongest; separators soften the effect.",
    tips: [
      "One word, no separators, no numbers.",
      "Hard consonants and short vowels do the heavy lifting.",
      "Skip adjectives that explain the vibe — let the sound carry it.",
      "Lowercase reads more assured than capitals here.",
      "Make sure the same string is free on both apps.",
    ],
    examples: ["venoire", "sablewrath", "kryssa", "noirvel", "vexira", "onyxa"],
    tool: "names",
    flavor: "aesthetic",
    related: ["dark-usernames", "cool-usernames-for-girls", "edgy-usernames"],
  },
  {
    slug: "soft-aesthetic-names",
    h1: "Soft Aesthetic Name Ideas",
    keyword: "soft aesthetic names",
    promise: "Gentle, muted name ideas for soft-aesthetic profiles and moodboards.",
    angle:
      "Soft aesthetic names are built almost entirely from texture and weather words. The trick is choosing two that do not compete: one should set the scene and the other should soften it.",
    subject: "a soft aesthetic name",
    audience: "people curating a muted, gentle profile",
    surface: "Pinterest, Instagram and Tumblr",
    rules: "Lowercase, two words, one separator — deviating breaks the register.",
    tips: [
      "One scene word plus one texture word.",
      "Weather and fabric words are the richest source.",
      "Never capitalise. Never add numbers.",
      "Keep both words in the same syllable range.",
      "If it sounds dramatic, it is not soft.",
    ],
    examples: ["linen.dusk", "hush.meadow", "palefern", "milk.and.mist", "quiet.bloom"],
    tool: "names",
    flavor: "aesthetic",
    related: ["aesthetic-usernames", "cute-usernames", "anime-username-ideas"],
  },
  {
    slug: "edgy-usernames",
    h1: "Edgy Username Ideas",
    keyword: "edgy usernames",
    promise: "Sharp, hard-edged handles without the misspellings that date them.",
    angle:
      "Deliberate misspellings were the shortcut to edgy a decade ago and are now the fastest way to look dated. Real words with hard edges achieve the same effect and remain typeable.",
    subject: "an edgy username",
    audience: "players who want a hard-edged handle",
    surface: "games and Discord",
    rules: "Misspellings cost you searchability and age badly.",
    tips: [
      "No replaced letters. No xX wrappers.",
      "Use words with genuinely hard consonants instead.",
      "Two syllables maximum.",
      "Keep it typeable — you will spell it out constantly.",
      "Sharp is not the same as offensive; filters catch the latter.",
    ],
    examples: ["Sablewrit", "Ruinvex", "Coldkiln", "Brimstake", "Nullkore", "Ironvane"],
    tool: "names",
    flavor: "gamer",
    related: ["dark-usernames", "cool-usernames-for-boys", "clan-name-generator"],
  },
  {
    slug: "professional-username-ideas",
    h1: "Professional Username Ideas",
    keyword: "professional username ideas",
    promise: "Clean handles for LinkedIn, GitHub, portfolios and work email.",
    angle:
      "A professional handle has one job: to be unmistakably you and completely unremarkable. Anything memorable is a liability here, because it will be read by people deciding whether to take you seriously.",
    subject: "a professional username",
    audience: "job seekers, freelancers and developers",
    surface: "LinkedIn, GitHub and portfolio sites",
    rules: "Stick to letters, one separator, and no numbers unless disambiguating.",
    tips: [
      "Real name plus discipline is the most reliable pattern.",
      "One separator, always the same one, across every platform.",
      "Numbers only to disambiguate a common name.",
      "Check it reads cleanly inside a URL and an email address.",
      "Use the identical string on your résumé and every profile.",
    ],
    examples: ["ariamarsh", "a.marsh.dev", "marsh-design", "ariamarshcodes", "amarshwrites"],
    tool: "username",
    flavor: "professional",
    related: ["business-name-ideas", "youtube-channel-name-ideas", "team-name-generator"],
  },
  {
    slug: "business-name-ideas",
    h1: "Business Name Ideas",
    keyword: "business name ideas",
    promise: "Brandable business names with the domain and trademark checks you must run first.",
    angle:
      "Generated business names are unowned words, which makes them a strong starting point and a legal risk if you skip the checks. Two searches — a trademark register and a domain lookup — separate a good idea from an expensive mistake.",
    subject: "a business name",
    audience: "founders and side-project builders",
    surface: "domains, storefronts and company registers",
    rules:
      "Always run a trademark search in your jurisdiction and a domain lookup before committing.",
    tips: [
      "Invented words are easier to trademark than descriptive ones.",
      "Say it on a phone call — if it needs spelling, it costs you every time.",
      "Check the .com and the matching social handles together.",
      "Avoid names that pin you to one product line.",
      "Search the trademark register before you print anything.",
    ],
    examples: ["Kavero", "Northsill", "Quenlark", "Marshline", "Velorna", "Copperfen"],
    tool: "names",
    flavor: "professional",
    related: ["professional-username-ideas", "team-name-generator", "youtube-channel-name-ideas"],
  },
  {
    slug: "bio-symbols-copy-paste",
    h1: "Bio Symbols to Copy and Paste",
    keyword: "bio symbols copy paste",
    promise: "Dividers, hearts, stars and bullets for Instagram, TikTok and Discord bios.",
    angle:
      "Bio symbols work as punctuation, not decoration. A single divider between two lines does more for readability than a border of stars, which most feeds render as visual noise.",
    subject: "bio symbols",
    audience: "anyone formatting a profile bio",
    surface: "Instagram, TikTok and Discord bios",
    rules:
      "Bios have tight character limits and symbols count against them; some platforms strip unusual glyphs.",
    tips: [
      "Use one divider between sections, not a border around everything.",
      "Match the symbol weight to your text — thin glyphs beside bold text look accidental.",
      "Older, widely supported symbols render everywhere; new emoji do not.",
      "Preview on a phone, which is where the bio is actually read.",
      "Budget characters: every symbol is one fewer word.",
    ],
    examples: ["✦", "·͜·", "❥", "⋆｡°", "⟢", "☾"],
    tool: "symbols",
    flavor: "aesthetic",
    related: ["instagram-username-ideas", "aesthetic-usernames", "small-caps-generator"],
  },
  {
    slug: "small-caps-generator",
    h1: "Small Caps Generator",
    keyword: "small caps generator",
    promise: "Convert any text to sᴍᴀʟʟ ᴄᴀᴘs you can paste into names and bios.",
    angle:
      "Small caps are the most widely supported styled font in Unicode, which is why they show up correctly in places where script and fraktur fail. If you want styled text that will not turn into boxes, this is the safe choice.",
    subject: "small caps text",
    audience: "anyone styling a name or bio",
    surface: "names, bios and captions on almost any platform",
    rules:
      "Small caps are Unicode letters, not formatting, so they paste as plain characters and survive most fields.",
    tips: [
      "Small caps render more reliably than script or fraktur.",
      "Use them for the whole word — mixing with normal letters looks broken.",
      "Screen readers may read them oddly, so avoid for essential information.",
      "They count as one character each, so no length penalty.",
      "Test in the destination field before saving.",
    ],
    examples: ["ᴠᴀᴇʟᴛʜ", "ʜᴀʟᴄʏɴ", "ǫᴜɪᴇᴛ ʜᴏᴜʀꜱ", "ɴᴏxʀɪᴅᴇʀ"],
    tool: "fancy",
    flavor: "aesthetic",
    related: ["bubble-text-generator", "strikethrough-text-generator", "bio-symbols-copy-paste"],
  },
  {
    slug: "bubble-text-generator",
    h1: "Bubble Text Generator",
    keyword: "bubble text generator",
    promise: "Turn text into Ⓑⓤⓑⓑⓛⓔ letters for names, bios and captions.",
    angle:
      "Bubble letters are enclosed alphanumerics — a genuine Unicode block rather than an image — so they paste anywhere plain text is accepted. Their downside is width: they take up noticeably more room than normal letters.",
    subject: "bubble text",
    audience: "people styling captions and display names",
    surface: "social bios, captions and display names",
    rules: "Enclosed alphanumerics are wide, so long words wrap earlier than you expect.",
    tips: [
      "Keep bubble text to short words — it is wide on every device.",
      "Filled and outlined variants both exist; pick one and stay with it.",
      "Some game name fields reject enclosed characters.",
      "Avoid for anything that needs to be searched.",
      "Preview on mobile where the extra width matters most.",
    ],
    examples: ["Ⓗⓐⓛⓒⓨⓝ", "🅑🅐🅓🅓🅘🅔", "Ⓥⓔⓧ", "🅠🅤🅘🅔🅣"],
    tool: "fancy",
    flavor: "aesthetic",
    related: ["small-caps-generator", "strikethrough-text-generator", "cute-usernames"],
  },
  {
    slug: "strikethrough-text-generator",
    h1: "Strikethrough Text Generator",
    keyword: "strikethrough text generator",
    promise: "Add s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ or underline to text that has no formatting options.",
    angle:
      "Strikethrough here is built from combining characters layered onto each letter, not from rich-text formatting. That is why it survives in plain-text fields where a formatting button does not exist at all.",
    subject: "strikethrough text",
    audience: "people posting in plain-text fields",
    surface: "bios, comments and chat apps without formatting",
    rules:
      "Combining characters roughly double the character count, which matters in fields with tight limits.",
    tips: [
      "Expect the character count to roughly double.",
      "Some apps normalise combining marks away on save.",
      "Copy the result immediately; retyping will not reproduce it.",
      "Use sparingly — long struck-through passages are hard to read.",
      "Underline and slash variants behave the same way.",
    ],
    examples: ["s̶o̶l̶d̶ ̶o̶u̶t̶", "o̶f̶f̶l̶i̶n̶e̶", "b̶u̶s̶y̶", "d̶o̶n̶e̶"],
    tool: "fancy",
    flavor: "aesthetic",
    related: ["small-caps-generator", "bubble-text-generator", "bio-symbols-copy-paste"],
  },
];

export interface LandingPage extends LandingSpec {
  title: string;
  description: string;
  intro: string;
  sections: { h2: string; body: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
}

function build(spec: LandingSpec): LandingPage {
  const title = `${spec.h1} — ${spec.promise.replace(/\.$/, "")} | ${SITE.name}`;

  const intro = `${spec.angle} Use the generator below to produce ${spec.subject} in seconds, tick the results worth keeping, and export your shortlist as text, PNG or SVG before you claim anything.`;

  const sections = [
    {
      h2: `What makes a strong ${spec.subject.replace(/^an? /, "")}`,
      body: [
        `Every good name solves the same three problems at once: it has to be readable at the size it will actually appear, sayable by someone who has only heard it once, and free on the platform where you need it. Most names people regret fail the second test — they looked fine on screen and fell apart the first time somebody tried to repeat them.`,
        `For ${spec.audience}, the constraint that bites hardest is where the name lives. On ${spec.surface}, ${spec.rules} Design inside that limit from the start rather than trimming a favourite until it no longer works.`,
      ],
    },
    {
      h2: `Five rules for ${spec.keyword}`,
      body: [
        `These are the specifics that separate a name you keep from one you change within a month.`,
      ],
      list: spec.tips,
    },
    {
      h2: `How to use this ${spec.keyword} generator`,
      body: [
        `The generator runs entirely in your browser, so there is no waiting, no account and no limit on how many times you roll. Every result is selectable: tick the ones you want and the copy, download and share buttons switch to working on just your selection.`,
      ],
      list: [
        "Generate a batch and read every result once, quickly.",
        "Tick anything you would not be embarrassed to say out loud.",
        "Roll again — a shortlist of five from three batches beats one lucky result.",
        "Export the shortlist as a PNG or text file so you can sleep on it.",
        `Check availability on ${spec.surface} before you announce anything.`,
      ],
    },
    {
      h2: `Mistakes that cost people their ${spec.subject.replace(/^an? /, "")}`,
      body: [
        `The expensive mistake is not picking a weak name — it is picking a name you have to change later. A rename costs you every mention, every saved link and every person who searched for you and found nothing. Anything tied to your current age, the current year, a game you are playing this month or a fandom you might leave is a rename waiting to happen.`,
        `The second most common mistake is claiming the name in one place and assuming the rest will still be free next week. They will not. When you settle on something, register it across every platform you might plausibly use in the same sitting, even the ones you have no immediate plans for.`,
      ],
    },
    {
      h2: `${spec.h1.replace(" Generator", "")} examples`,
      body: [
        `Here are worked examples in the right register. Treat them as calibration rather than a shortlist — the point is to show you what the target looks like so you can recognise it when the generator produces something close.`,
      ],
      list: spec.examples,
    },
    {
      h2: `Checking availability before you commit`,
      body: [
        `Availability is the step almost everyone skips and almost everyone regrets skipping. Open the signup or rename field on ${spec.surface} and paste the name in directly — third-party availability checkers lag behind reality and will tell you a taken name is free.`,
        `Keep two backups from the same batch. If your first choice is gone, having a prepared second choice is the difference between claiming something good today and settling for something worse in a hurry.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `How do I choose ${spec.subject}?`,
      a: `Decide the impression you want before you look at any results. Generate a batch of twenty, keep only the ones you would happily say out loud, then roll again and repeat until you have five candidates. Sleep on the shortlist and check availability on ${spec.surface} before you claim one.`,
    },
    {
      q: `Are these ${spec.keyword} free to use?`,
      a: `Yes. Every result is generated in your browser from open word pools, there is no account, no limit and no cost, and you can use what you find personally or commercially. For business use, run a trademark check first.`,
    },
    {
      q: `Will the name be available?`,
      a: `Often, but never guaranteed. Results are assembled at random so most combinations are uncommon, but popular platforms have hundreds of millions of accounts. ${spec.rules} Always paste your choice into the real signup field to confirm.`,
    },
    {
      q: `Can I export the names I like?`,
      a: `Yes. Tick the results you want and use the export bar to copy them all, download them as a text file, or save them as a branded PNG or SVG image you can share. With nothing ticked, exports include the whole batch.`,
    },
    {
      q: `How many ideas can I generate?`,
      a: `As many as you like. The generator runs locally in your browser, so pressing Generate again costs nothing and there is no daily limit or sign-up wall.`,
    },
    {
      q: `Can I make the name stylish or add symbols?`,
      a: `Yes. Once you have a name you like, run it through the fancy text generator for 60+ Unicode font styles, or add a symbol pair from the symbols library. Both accept anything you paste in.`,
    },
  ];

  return {
    ...spec,
    title: title.length > 70 ? `${spec.h1} | ${SITE.name}` : title,
    description: `${spec.promise} Generate, select and export ${spec.keyword} instantly — free, no sign-up.`.slice(
      0,
      158,
    ),
    intro,
    sections,
    faqs,
  };
}

export const LANDING_PAGES: LandingPage[] = SPECS.map(build);
export const LANDING_MAP: Record<string, LandingPage> = Object.fromEntries(
  LANDING_PAGES.map((p) => [p.slug, p]),
);
