export const SITE = {
  name: "BestNickFinder",
  domain: "bestnickfinder.online",
  url: "https://bestnickfinder.online",
  tagline: "Nickname, Username & Stylish Text Generator",
  description:
    "Generate stylish nicknames, fancy fonts, symbols and available usernames for games and social media — free, instant and copy-ready.",
  // Replace with your real IDs before deploying to cPanel.
  adsenseClient: "ca-pub-0000000000000000",
  gaMeasurementId: "G-XXXXXXXXXX",
} as const;

export interface ToolLink {
  slug: string;
  title: string;
  short: string;
  blurb: string;
  icon: string;
}

export const TOOLS: ToolLink[] = [
  {
    slug: "/fancy-text-generator",
    title: "Fancy Text Generator",
    short: "Fancy Text",
    blurb: "Turn any word into 60+ stylish Unicode fonts you can paste anywhere.",
    icon: "✨",
  },
  {
    slug: "/nickname-generator",
    title: "Nickname Generator",
    short: "Nicknames",
    blurb: "Random nickname ideas by vibe: gamer, aesthetic, fantasy or professional.",
    icon: "🎲",
  },
  {
    slug: "/username-generator",
    title: "Username Generator",
    short: "Usernames",
    blurb: "Build handle variations from your name and check them across platforms.",
    icon: "@",
  },
  {
    slug: "/name-mixer",
    title: "Name Mixer",
    short: "Name Mixer",
    blurb: "Blend two names into couple names, brand names and clan tags.",
    icon: "⚯",
  },
  {
    slug: "/symbols",
    title: "Symbols & Text Emoji",
    short: "Symbols",
    blurb: "Copy hearts, stars, crowns, arrows, kaomoji and 500+ text symbols.",
    icon: "♛",
  },
  {
    slug: "/password-generator",
    title: "Password Generator",
    short: "Passwords",
    blurb: "Create strong random passwords in your browser — nothing is sent anywhere.",
    icon: "🔐",
  },
];

export interface Niche {
  slug: string;
  h1: string;
  title: string;
  description: string;
  keyword: string;
  flavor: "gamer" | "aesthetic" | "fantasy" | "professional";
  intro: string;
  sections: { h2: string; body: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
  examples: string[];
  related: string[];
}

const gamerFaqBase = (game: string) => [
  {
    q: `How do I change my ${game} name to a stylish font?`,
    a: `Type your name into the generator on this page, pick a style you like and tap it to copy. Then open ${game}, go to the name-change screen and paste it in. The characters are standard Unicode, so the game stores them like normal letters.`,
  },
  {
    q: `Why does my stylish ${game} name show as boxes?`,
    a: `Boxes mean the font used by the game or device has no glyph for that character. Choose a simpler style — bold, small caps or a bracket decoration — which almost every device renders correctly.`,
  },
  {
    q: `Is it free to use these ${game} names?`,
    a: `Yes. Every name and symbol here is free to copy and use, with no sign-up and no limits.`,
  },
];

export const NICHES: Niche[] = [
  {
    slug: "free-fire-name-style",
    h1: "Free Fire Name Style Generator",
    title: "Free Fire Name Style Generator — Stylish FF Names & Symbols",
    description:
      "Create stylish Free Fire names with fancy fonts, wings ꧁꧂ and symbols. Copy Free Fire nickname styles instantly — free, no login.",
    keyword: "free fire name style",
    flavor: "gamer",
    intro:
      "Free Fire players change their in-game name more than almost any other mobile community — a sharp nickname is the first thing your squad and your opponents see on the kill feed. This generator converts anything you type into stylish Unicode fonts and framed symbol styles that the Free Fire name field accepts.",
    sections: [
      {
        h2: "How to change your Free Fire name",
        body: [
          "Free Fire lets you rename your account with a Name Change Card, or free of charge the very first time you set a nickname. Once you have your styled text copied, the process takes under a minute.",
        ],
        list: [
          "Copy a style from the generator above.",
          "Open Free Fire and tap your avatar in the top-left corner.",
          "Tap the pencil icon next to your current nickname.",
          "Long-press the text field and choose Paste.",
          "Confirm the change and spend your Name Change Card if prompted.",
        ],
      },
      {
        h2: "Which styles actually work in Free Fire",
        body: [
          "Free Fire renders most Unicode blocks, but not all of them. Mathematical bold, small caps, fullwidth and the classic ꧁ ꧂ wing brackets are reliable across Android and iOS. Very new emoji and rare script blocks can appear as empty boxes on older devices, so test with a short word first.",
          "Guild tags follow the same rules but have a shorter character limit, so decorated short words such as ꧁SHRK꧂ work better than long sentences.",
        ],
      },
      {
        h2: "Name ideas by playstyle",
        body: [
          "Rushers usually pick aggressive, punchy names; support players lean on clean readable handles; content creators want something searchable that people can actually type into YouTube.",
        ],
        list: [
          "Rusher: BlazingViper, ToxicReaper77, ꧁RushKing꧂",
          "Sniper: SilentScope, OneTapNova, ༄SoloShot༄",
          "Support: CalmMedic, SteadyRanger, QuietWarden",
          "Creator: FFwithAria, NovaPlaysFF, TheDriftHQ",
        ],
      },
    ],
    faqs: [
      ...gamerFaqBase("Free Fire"),
      {
        q: "Can I use the same stylish name in Free Fire MAX?",
        a: "Yes. Free Fire and Free Fire MAX share the same account, so your nickname carries across both clients automatically.",
      },
    ],
    examples: ["ꜱʜʀᴋ", "꧁ＮＩＮＪＡ꧂", "༄ＧＡＭＥＲ༄", "𝕭𝖑𝖆𝖟𝖊", "☠ᴠɪᴘᴇʀ☠", "【ＦＦ ＫＩＮＧ】"],
    related: ["pubg-name-style", "clan-name-generator", "gamertag-generator"],
  },
  {
    slug: "pubg-name-style",
    h1: "PUBG & BGMI Name Style Generator",
    title: "PUBG Name Style Generator — Stylish BGMI Names & Clan Tags",
    description:
      "Generate stylish PUBG and BGMI names with fancy fonts, symbols and clan tags. Copy and paste your new PUBG nickname in seconds.",
    keyword: "pubg name style",
    flavor: "gamer",
    intro:
      "PUBG Mobile and BGMI both accept Unicode nicknames, which is why the lobby is full of decorated handles. Type your name below to see dozens of PUBG-safe styles, then copy the one that fits your squad identity.",
    sections: [
      {
        h2: "Changing your PUBG Mobile nickname",
        body: [
          "You get one free rename card when you reach level 10; after that a Rename Card costs UC or can drop from events. Because renames are limited, decide on a name you will keep before you spend the card.",
        ],
        list: [
          "Copy your styled name from the tool above.",
          "Open Inventory and find the Rename Card.",
          "Tap Use, paste your name into the field.",
          "Confirm — the change applies immediately.",
        ],
      },
      {
        h2: "Clan tags and squad naming",
        body: [
          "Clan tags are capped at a handful of characters, so pick a two to five letter core and decorate lightly. A consistent tag across every member makes your squad instantly recognisable in the kill feed and on tournament brackets.",
          "If you plan to stream or enter esports events, keep at least one plain-text version of your name so casters and viewers can spell it.",
        ],
      },
      {
        h2: "Popular PUBG name patterns",
        body: ["These structures show up again and again in high-rank lobbies because they read fast on a small screen."],
        list: [
          "Tag + Name: ᴳᵒᵈ Reaper",
          "Bracket wrap: 『Sniper』",
          "Symbol split: ꧁ᴀʟᴏɴᴇ ʙᴏʏ꧂",
          "Small caps: ᴘʜᴀɴᴛᴏᴍ",
          "Number suffix: Vortex77",
        ],
      },
    ],
    faqs: [
      ...gamerFaqBase("PUBG Mobile"),
      {
        q: "Are stylish names allowed by the PUBG rules?",
        a: "Decorative Unicode is allowed. What is not allowed is impersonating staff, offensive language or symbols that break the terms of service — those can get an account renamed or banned.",
      },
    ],
    examples: ["꧁༒ＫＩＬＬＥＲ༒꧂", "ᴀʟᴏɴᴇ ʙᴏʏ", "『ＳＮＩＰＥＲ』", "𝖆𝖓𝖌𝖊𝖑", "☬ＴＩＴＡＮ☬", "ᴳᵒᵈ Ｒｅａｐｅｒ"],
    related: ["free-fire-name-style", "clan-name-generator", "gamertag-generator"],
  },
  {
    slug: "instagram-username-ideas",
    h1: "Instagram Username Ideas & Handle Generator",
    title: "Instagram Username Ideas — Aesthetic Handle Generator",
    description:
      "Find aesthetic Instagram username ideas and available handle variations. Generate cute, clean and brandable IG usernames instantly.",
    keyword: "instagram username ideas",
    flavor: "aesthetic",
    intro:
      "A good Instagram handle is short, easy to say out loud and still free. This page generates handle variations from any word plus curated aesthetic ideas you can adapt, and explains how to check availability before you commit.",
    sections: [
      {
        h2: "What makes an Instagram username work",
        body: [
          "Instagram allows letters, numbers, periods and underscores, up to 30 characters. The best-performing handles stay under 15 characters, avoid double punctuation and match the name people already know you by.",
          "If your exact name is taken, a prefix such as the, its or real usually reads better than trailing numbers, which look like a throwaway account.",
        ],
      },
      {
        h2: "Aesthetic username formulas",
        body: ["Aesthetic handles come from a small number of repeatable patterns. Swap the word, keep the shape."],
        list: [
          "Soft noun + soft noun: peach.cloud, honeymarsh",
          "Word + suffix: lunacore, vellumco",
          "Two syllables + dot: sol.ari, mira.vex",
          "Descriptor + name: quietlyaria, softlynoor",
          "Single word claim: velour, driftly, embermood",
        ],
      },
      {
        h2: "Checking availability the fast way",
        body: [
          "Open instagram.com/yourhandle in a private tab. A 'page isn't available' message means the handle is free right now. Check the same handle on TikTok, X and YouTube before you settle, so your branding stays consistent as you grow.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I use fancy fonts in my Instagram username?",
        a: "Not in the @handle — Instagram restricts that field to letters, numbers, periods and underscores. You can use fancy fonts in your display name and bio, and this site's fancy text generator produces text that pastes cleanly there.",
      },
      {
        q: "How often can I change my Instagram username?",
        a: "Instagram allows changes at any time, but changing twice within 14 days can temporarily block further edits. Your old handle also becomes claimable by someone else immediately.",
      },
      {
        q: "Do numbers hurt my username?",
        a: "Only when they look arbitrary. A meaningful number — a year, a jersey number, a birth date you actually use — reads far better than a random three-digit suffix.",
      },
    ],
    examples: ["peach.cloud", "lunacore", "sol.ari", "itsvelour", "driftly", "honeymarsh"],
    related: ["tiktok-username-ideas", "aesthetic-username-generator", "youtube-channel-name-ideas"],
  },
  {
    slug: "tiktok-username-ideas",
    h1: "TikTok Username Ideas Generator",
    title: "TikTok Username Ideas — Catchy Handle Generator",
    description:
      "Generate catchy TikTok username ideas that are short, memorable and easy to search. Free TikTok handle generator with instant copy.",
    keyword: "tiktok username ideas",
    flavor: "aesthetic",
    intro:
      "TikTok handles get spoken out loud in duets, stitches and shout-outs, so they need to survive being said rather than read. This generator favours short, pronounceable handles and shows you variations of any word you type.",
    sections: [
      {
        h2: "Rules of the TikTok handle",
        body: [
          "TikTok allows up to 24 characters using letters, numbers, underscores and periods. Handles must be unique, and changing yours is limited to once every 30 days — so it is worth getting right the first time.",
        ],
      },
      {
        h2: "Niche-first naming",
        body: [
          "Search discovery on TikTok has grown fast, and a handle that contains your niche word gets surfaced in username search. If you post recipes, cooking or eats inside the handle is a genuine advantage.",
        ],
        list: [
          "Food: mira.eats, thecrumbclub",
          "Fitness: liftwithnoor, dailyrepco",
          "Study: studywithsol, notesbyaria",
          "Gaming: driftplaysff, novaclipshq",
          "Fashion: fitsbyremi, thelayerclub",
        ],
      },
      {
        h2: "Keep it consistent across platforms",
        body: [
          "Pick the handle that is free on TikTok, Instagram and YouTube at the same time. Cross-platform consistency is worth more than a marginally cuter name on one app, because it makes every shout-out point everywhere.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often can I change my TikTok username?",
        a: "Once every 30 days. TikTok shows the exact date your next change becomes available in the edit profile screen.",
      },
      {
        q: "Can TikTok usernames have symbols?",
        a: "Only periods and underscores. Fancy Unicode can be used in your display name instead, which is the field shown in bold on your profile.",
      },
      {
        q: "What length is best for a TikTok handle?",
        a: "Aim for 6 to 14 characters. Short enough to type from memory, long enough to still be available.",
      },
    ],
    examples: ["thecrumbclub", "novaclipshq", "studywithsol", "fitsbyremi", "driftly", "reallynoor"],
    related: ["instagram-username-ideas", "youtube-channel-name-ideas", "aesthetic-username-generator"],
  },
  {
    slug: "discord-name-fonts",
    h1: "Discord Fonts & Name Generator",
    title: "Discord Font Generator — Stylish Discord Names & Nicknames",
    description:
      "Generate stylish Discord names and fancy fonts for your username, server nickname and about me. Copy and paste, no bots needed.",
    keyword: "discord fonts",
    flavor: "gamer",
    intro:
      "Discord renders Unicode everywhere except code blocks, which means fancy fonts work in your display name, server nickname, About Me, channel names and messages. Generate a style below and paste it straight in.",
    sections: [
      {
        h2: "Where fancy fonts work on Discord",
        body: [
          "Your @username is restricted to lowercase letters, numbers, periods and underscores. Everything else — display name, per-server nickname, status, About Me and message text — accepts full Unicode.",
        ],
        list: [
          "Display name: full Unicode, up to 32 characters",
          "Server nickname: full Unicode, set per server",
          "About Me: full Unicode plus markdown",
          "Channel and role names: Unicode, useful for dividers",
          "@username: plain lowercase only",
        ],
      },
      {
        h2: "Server aesthetic: dividers and role names",
        body: [
          "Server owners use symbol dividers such as ▬▬ ✦ ▬▬ between channel categories to break up long sidebars. Roles styled with a leading symbol sort visually and make the member list scannable at a glance.",
        ],
      },
      {
        h2: "Accessibility warning",
        body: [
          "Screen readers announce mathematical alphanumeric characters letter-by-letter, or skip them entirely. If your server has accessibility-minded members, keep at least the channel names in plain text and save the styling for decoration.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I use fancy fonts in my Discord username?",
        a: "No — the @username field is plain lowercase. Use the display name or your per-server nickname instead; both accept full Unicode styling.",
      },
      {
        q: "Do I need a bot to change my nickname font?",
        a: "No. Copy the styled text from this page and paste it into the nickname field. Bots are only needed for automated or role-triggered renaming.",
      },
      {
        q: "Why does my Discord font look different on mobile?",
        a: "Mobile system fonts cover fewer Unicode blocks than desktop. Bold, italic, small caps and fullwidth are the safest cross-device choices.",
      },
    ],
    examples: ["𝓐𝓾𝓻𝓸𝓻𝓪", "ᴠᴏɪᴅᴡᴀʟᴋᴇʀ", "【ＮＯＶＡ】", "𝔡𝔞𝔯𝔨𝔪𝔬𝔡𝔢", "✦ mod ✦", "ℕ𝕠𝕧𝕒"],
    related: ["fancy-text-generator", "clan-name-generator", "gamertag-generator"],
  },
  {
    slug: "aesthetic-username-generator",
    h1: "Aesthetic Username Generator",
    title: "Aesthetic Username Generator — Soft & Cute Handle Ideas",
    description:
      "Generate soft, cute and aesthetic usernames for Instagram, Pinterest, Roblox and Discord. Hundreds of aesthetic handle ideas, free.",
    keyword: "aesthetic usernames",
    flavor: "aesthetic",
    intro:
      "Aesthetic usernames follow a recognisable sound: soft consonants, natural imagery and lowercase punctuation. This generator produces them by the dozen so you can find one that is still available.",
    sections: [
      {
        h2: "The sound of an aesthetic handle",
        body: [
          "Most aesthetic handles use liquid consonants (l, m, n, r) and open vowels. Compare velour and blitzkrieg — the first flows, the second stops. That softness is the whole effect.",
          "Lowercase is near-universal in this style, and a single period between two words reads cleaner than an underscore.",
        ],
      },
      {
        h2: "Themes that never go out of style",
        body: ["Pick a theme first, then generate inside it — random ideas across every theme rarely feel coherent."],
        list: [
          "Celestial: lunarei, star.dwell, solnoct",
          "Botanical: fernlet, petalcore, moss.diary",
          "Dessert: honeymilk, peach.crumb, sugarloft",
          "Weather: driftfog, rain.pale, cloudspun",
          "Vintage: velour, sepiaclub, atticmoth",
        ],
      },
      {
        h2: "Making it yours",
        body: [
          "Once you find a shape you like, thread your own name through it. aria becomes ariadrift, ariacloud, aria.veil — recognisably you, and far more likely to be available than the bare word.",
        ],
      },
    ],
    faqs: [
      {
        q: "What are the best aesthetic usernames?",
        a: "The best ones are short, lowercase, pronounceable and personal. Combining a soft natural noun with your own name — moss.aria, lunanoor — gives you availability plus identity.",
      },
      {
        q: "Can I use aesthetic usernames on Roblox?",
        a: "Roblox usernames allow letters, numbers and a single underscore, so the lowercase word-plus-word patterns work, but periods do not. Use underscore versions instead.",
      },
      {
        q: "Are aesthetic usernames still popular?",
        a: "Yes — the vocabulary shifts each year but the underlying pattern of soft, lowercase, nature-adjacent handles has been stable for a long time.",
      },
    ],
    examples: ["lunarei", "peach.crumb", "moss.diary", "cloudspun", "velour", "sol.veil"],
    related: ["instagram-username-ideas", "tiktok-username-ideas", "cute-nicknames"],
  },
  {
    slug: "gamertag-generator",
    h1: "Gamertag Generator",
    title: "Gamertag Generator — Cool Xbox, PSN & Steam Name Ideas",
    description:
      "Generate cool gamertags for Xbox, PlayStation, Steam and PC. Thousands of unique gamertag ideas, filtered by vibe and length.",
    keyword: "gamertag generator",
    flavor: "gamer",
    intro:
      "A gamertag sticks with you across every lobby, leaderboard and clip you ever post. This generator builds tags from a curated adjective and noun pool with optional numeric suffixes, tuned for the length limits of each major platform.",
    sections: [
      {
        h2: "Platform character limits",
        body: ["Each platform caps gamertag length differently, which is the single biggest constraint on your options."],
        list: [
          "Xbox: 12 characters, spaces allowed, one free change",
          "PlayStation Network: 16 characters, letters, numbers, hyphen and underscore",
          "Steam: 32 characters for display name, changeable freely",
          "Nintendo: 10 characters",
          "Riot ID: 16 characters plus a numeric tagline",
        ],
      },
      {
        h2: "What makes a gamertag last",
        body: [
          "Tags that age well avoid trends, avoid the current year and avoid the game you happen to play right now. SilentOtter still works in ten years; FortniteKid2019 does not.",
          "Say it out loud before you commit. If a teammate cannot repeat it on comms after hearing it once, it is too complicated.",
        ],
      },
      {
        h2: "Gamertag styles by genre",
        body: ["Community norms differ genre to genre, and matching them makes you read as a serious player."],
        list: [
          "FPS: short, hard consonants — Vex, Rook, Kade",
          "MMO: fantasy syllables — Thalvion, Marolyn",
          "Racing: speed words — Apex, Drift, Redline",
          "Horror/survival: bleak nouns — Ashfall, Cinder",
          "Casual/party: playful — WaffleTank, SirNoodle",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find an available gamertag?",
        a: "Generate a batch, then try them in the platform's name-change screen — it validates availability live. Pairing an uncommon adjective with a common noun gives the best hit rate.",
      },
      {
        q: "Can I change my Xbox gamertag for free?",
        a: "Your first change is free. Each additional change carries a fee, so it is worth testing your shortlist with friends first.",
      },
      {
        q: "Should my gamertag match my streaming name?",
        a: "Ideally yes. When your clip goes viral, viewers search the name they saw on screen — if that differs from your channel, the traffic evaporates.",
      },
    ],
    examples: ["SilentOtter", "ApexRook", "FrozenVex", "NovaDrift", "IronKade", "AshfallHQ"],
    related: ["clan-name-generator", "pubg-name-style", "free-fire-name-style"],
  },
  {
    slug: "clan-name-generator",
    h1: "Clan Name & Tag Generator",
    title: "Clan Name Generator — Cool Clan Names, Tags & Symbols",
    description:
      "Generate cool clan names and short clan tags for Free Fire, PUBG, CoD and Valorant. Includes symbol-decorated clan tag styles.",
    keyword: "clan name generator",
    flavor: "gamer",
    intro:
      "A clan name has to work twice: as a full title on your roster page, and as a two-to-five character tag squeezed in front of every member's name. This generator handles both.",
    sections: [
      {
        h2: "Building the tag first",
        body: [
          "Work backwards. Choose a short, sharp tag that survives the character limit — usually three or four letters — then expand it into the full clan name. VEX becomes Vexcore Syndicate; the reverse rarely produces a clean tag.",
        ],
      },
      {
        h2: "Decorating clan tags",
        body: ["Symbol frames make a tag stand out in the kill feed without eating many characters."],
        list: ["꧁VEX꧂", "【VEX】", "『VEX』", "☬VEX☬", "༄VEX", "ᴳᵒᵈ VEX"],
      },
      {
        h2: "Naming conventions that build identity",
        body: [
          "The strongest clans enforce a shared format: tag, then member name, then optional role marker. When every member follows it, your squad looks organised before a single shot is fired.",
          "Reserve one or two symbol variants for leadership so rank is visible at a glance.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long can a clan tag be?",
        a: "Most mobile shooters allow four to five characters, while PC titles often allow more. Design for four and you will fit almost everywhere.",
      },
      {
        q: "Can clan tags use symbols?",
        a: "Usually yes, though some games count each symbol against the character limit and a few strip them entirely. Test in-game before you announce the tag to your members.",
      },
      {
        q: "What makes a good clan name?",
        a: "Short, pronounceable, and not already taken by a well-known esports org. Check the name on YouTube and social before you print it on jerseys.",
      },
    ],
    examples: ["꧁VEX꧂", "Ashfall Syndicate", "☬ONYX☬", "Nullforce", "【RVN】", "Ironclad Dominion"],
    related: ["gamertag-generator", "pubg-name-style", "free-fire-name-style"],
  },
  {
    slug: "youtube-channel-name-ideas",
    h1: "YouTube Channel Name Ideas",
    title: "YouTube Channel Name Generator — Ideas That Rank",
    description:
      "Generate YouTube channel name ideas that are searchable, brandable and available. Free channel name generator with naming guidance.",
    keyword: "youtube channel name ideas",
    flavor: "professional",
    intro:
      "Your channel name is a search term. Get it right and people find you by typing what they remember; get it wrong and they land on someone else. This page generates candidates and explains the tradeoff between brandable and descriptive names.",
    sections: [
      {
        h2: "Descriptive vs brandable",
        body: [
          "Descriptive names such as Budget Home Studio tell viewers exactly what they get and pick up search traffic on day one, but they box you in if your content shifts.",
          "Brandable names such as Vexpoint carry no meaning at first and grow slowly, but they let you pivot freely and are far easier to trademark.",
          "The reliable middle ground is a personal name plus a category word: Aria Builds, Noor Cooks, Drift Reviews.",
        ],
      },
      {
        h2: "Handle, channel name and display name",
        body: [
          "YouTube gives you an @handle (unique, changeable twice every 14 days) and a channel name (changeable three times in 14 days). Keep them aligned. A mismatch costs you every time someone hears your name in a video and searches for it.",
        ],
      },
      {
        h2: "Before you commit",
        body: [
          "Search the name on YouTube and Google. Check the .com and your target domain. Check the handle on Instagram and TikTok. Say it on camera once and listen back — if it is hard to say, you will resent it after 200 videos.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I change my YouTube channel name later?",
        a: "Yes, up to three times in 14 days. Your videos and subscribers are unaffected, but external links and mentions of your old name will not redirect.",
      },
      {
        q: "Should my channel name include a keyword?",
        a: "It helps early on for discovery, but only if the keyword genuinely describes your permanent niche. Do not lock yourself into a topic you might leave.",
      },
      {
        q: "Can two channels have the same name?",
        a: "Channel names can duplicate; @handles cannot. That is another reason to treat the handle as your real identity.",
      },
    ],
    examples: ["Aria Builds", "Vexpoint", "The Crumb Club", "Drift Reviews", "Noor Cooks", "Quiet Desk"],
    related: ["instagram-username-ideas", "business-name-generator", "tiktok-username-ideas"],
  },
  {
    slug: "business-name-generator",
    h1: "Business & Brand Name Generator",
    title: "Business Name Generator — Brandable Company Name Ideas",
    description:
      "Generate brandable business and startup name ideas with domain guidance. Free company name generator for founders and side projects.",
    keyword: "business name generator",
    flavor: "professional",
    intro:
      "Naming a business is a constraint problem: it has to be memorable, legally clear and available as a domain. This generator produces invented and compound candidates you can test against all three.",
    sections: [
      {
        h2: "Four name archetypes",
        body: ["Almost every company name falls into one of these categories."],
        list: [
          "Invented: Kodak, Zalando — total freedom, needs marketing spend",
          "Compound: Facebook, Snowflake — meaning plus availability",
          "Descriptive: General Motors — instantly clear, hard to trademark",
          "Metaphor: Amazon, Oracle — evocative and highly defensible",
        ],
      },
      {
        h2: "The availability checklist",
        body: [
          "Before you fall in love with a name, run it through every gate at once. A name that fails one of these late is expensive to abandon.",
        ],
        list: [
          "Domain: check .com plus your local TLD",
          "Trademark: search your national register for your class",
          "Social handles: the same handle on all key platforms",
          "Pronunciation: does it survive a phone call?",
          "Meaning: check it in the languages of your target markets",
        ],
      },
      {
        h2: "Testing a shortlist",
        body: [
          "Read each candidate aloud in a sentence: 'Hi, I'm calling from ___.' Names that feel awkward in that sentence will feel awkward forever. Then wait 48 hours and re-read the list — the winner is usually the one you still like.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does my business name need to match my domain exactly?",
        a: "It helps enormously. If the exact .com is gone, adding a short suffix such as app, hq or co is far better than a hyphen or an unrelated word.",
      },
      {
        q: "Can I trademark a generated name?",
        a: "Generated names are not owned by anyone, so yes — subject to your national trademark rules and existing marks in your class. Get professional advice before filing.",
      },
      {
        q: "How long should a business name be?",
        a: "One or two syllables is ideal, three at most. Short names are easier to say, remember, type and fit in a logo.",
      },
    ],
    examples: ["Vellum", "Northloop", "Kindra", "Solace Labs", "Driftbase", "Ember & Co"],
    related: ["youtube-channel-name-ideas", "name-mixer", "domain-name-ideas"],
  },
  {
    slug: "cute-nicknames",
    h1: "Cute Nicknames for Friends & Partners",
    title: "Cute Nickname Generator — Sweet Names for Him & Her",
    description:
      "Find cute nicknames for your boyfriend, girlfriend, best friend or pet. Hundreds of sweet nickname ideas plus a personalised generator.",
    keyword: "cute nicknames",
    flavor: "aesthetic",
    intro:
      "The best pet names come from a shared moment, not a list — but a list is a great place to start. Below are curated cute nicknames by relationship, plus a generator that builds personalised ones from a name you enter.",
    sections: [
      {
        h2: "Cute nicknames by relationship",
        body: ["Tone matters more than the word. What lands as sweet from a partner sounds odd from a colleague."],
        list: [
          "For him: Bear, Sunny, Ace, Bug, Captain, Moonpie",
          "For her: Peach, Sunshine, Robin, Poppy, Doll, Sparrow",
          "Best friends: Twin, Goose, Sprout, Chief, Bestie, Gremlin",
          "Siblings: Bub, Squish, Tiny, Boss, Sprout",
          "Pets: Biscuit, Noodle, Mochi, Pickle, Waffles",
        ],
      },
      {
        h2: "How to make a nickname stick",
        body: [
          "Nicknames survive when they are short, easy to shout across a room and tied to something specific. Shorten their real name, add a soft suffix (-ie, -o, -bug) or take a word from a story only the two of you know.",
        ],
      },
      {
        h2: "When not to use one",
        body: [
          "Read the room. In group chats, professional settings or in front of family, a private nickname can embarrass rather than charm. If they have never used it back to you, that is a signal.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a good cute nickname for a boyfriend?",
        a: "Short, warm and specific beats generic. Bear, Ace and Sunny work broadly, but a shortened version of his own name plus a soft suffix is usually more personal.",
      },
      {
        q: "How do I pick a nickname they will actually like?",
        a: "Try it once, casually, and watch the reaction. If they smile or use it back, it works. If they correct you, drop it without making it a thing.",
      },
      {
        q: "Can I generate a nickname from a real name?",
        a: "Yes — enter the name in the generator on this page and it will produce shortened, softened and blended variations.",
      },
    ],
    examples: ["Moonpie", "Sunny", "Peach", "Goose", "Biscuit", "Sparrow"],
    related: ["name-mixer", "aesthetic-username-generator", "instagram-username-ideas"],
  },
  {
    slug: "roblox-username-ideas",
    h1: "Roblox Username Ideas Generator",
    title: "Roblox Username Ideas — Cool & Available Name Generator",
    description:
      "Generate cool Roblox username ideas that follow Roblox naming rules. Free Roblox name generator for new and renamed accounts.",
    keyword: "roblox username ideas",
    flavor: "gamer",
    intro:
      "Roblox has strict username rules and a huge player base, which makes finding an available name genuinely hard. This generator produces rule-compliant candidates in bulk so you can try a lot of them fast.",
    sections: [
      {
        h2: "Roblox username rules",
        body: ["Names that break any of these are rejected instantly at signup."],
        list: [
          "3 to 20 characters",
          "Letters, numbers and at most one underscore",
          "The underscore cannot be first or last",
          "No spaces, periods or symbols",
          "Must pass the profanity and personal-information filter",
        ],
      },
      {
        h2: "Finding one that is free",
        body: [
          "Common words are long gone. Compound two uncommon words, or thread a number that means something to you through a word you like. Generating twenty candidates and testing them all is faster than agonising over one.",
        ],
      },
      {
        h2: "Changing your name later",
        body: [
          "Roblox charges 1,000 Robux for a username change and keeps a public history of your previous names. Your old name is released back into the pool, so a friend can claim it if you coordinate.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can Roblox usernames have symbols?",
        a: "No. Only letters, numbers and a single underscore that is not at the start or end.",
      },
      {
        q: "How much does a Roblox name change cost?",
        a: "1,000 Robux per change. Your display name, which is separate, can be changed free up to a limited number of times per week.",
      },
      {
        q: "Can I use fancy fonts on Roblox?",
        a: "Not in the username. The display name accepts a wider character set on some clients, but Roblox filters heavily, so plain text is the reliable option.",
      },
    ],
    examples: ["FrozenOtter", "vex_kade", "AshfallNova", "quietdrift", "IronPoppy", "solvex22"],
    related: ["gamertag-generator", "aesthetic-username-generator", "clan-name-generator"],
  },
  {
    slug: "fantasy-name-generator",
    h1: "Fantasy Name Generator",
    title: "Fantasy Name Generator — Elf, Warrior & D&D Character Names",
    description:
      "Generate fantasy names for D&D characters, elves, warriors and RPG worlds. Pronounceable, original fantasy name ideas, free.",
    keyword: "fantasy name generator",
    flavor: "fantasy",
    intro:
      "Fantasy names live or die on pronounceability. This generator builds names from a curated syllable set so every result can actually be said out loud at a table, in a raid or in a novel.",
    sections: [
      {
        h2: "Why syllable structure matters",
        body: [
          "A convincing fantasy name follows internal rules. Elvish tends toward liquid consonants and open vowels — Thalvion, Marolyn. Dwarvish clusters hard stops — Brakdor, Grunmar. Orcish leans on plosives and short vowels — Vixnar, Zarkul.",
          "Consistency inside a culture matters more than any individual name. If two elves in your setting sound like they come from different planets, the illusion breaks.",
        ],
      },
      {
        h2: "Names by race and role",
        body: ["Use these as anchors, then generate variations in the same sound family."],
        list: [
          "Elf: Thalvion, Aerilyn, Solmareth",
          "Dwarf: Brakdor, Thrainmus, Kaldrin",
          "Orc: Vixnar, Zarkul, Grommen",
          "Human noble: Marolyn, Corvane, Aldrieth",
          "Rogue: Quel, Nyxen, Dremar",
        ],
      },
      {
        h2: "Using generated names in published work",
        body: [
          "Procedurally generated names are not copyrightable as bare words, so you are free to use them in games, novels and campaigns. Do still check that a name is not a well-known trademark in the fantasy space before you build a franchise on it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I use these names for my D&D character?",
        a: "Yes, freely. They are generated from syllable patterns rather than copied from any existing setting.",
      },
      {
        q: "How do I make a fantasy name sound like a specific race?",
        a: "Match the consonant profile. Soft and liquid for elves, hard clusters for dwarves, plosive-heavy for orcs. Keep vowel length consistent within one culture.",
      },
      {
        q: "Are these names original?",
        a: "They are assembled from syllable fragments at random, so collisions with existing names are possible but uncommon. Search any name you plan to publish.",
      },
    ],
    examples: ["Thalvion", "Aerilyn", "Brakdor", "Nyxeth", "Solmareth", "Vixnar"],
    related: ["gamertag-generator", "clan-name-generator", "name-mixer"],
  },
  {
    slug: "couple-name-generator",
    h1: "Couple Name Generator",
    title: "Couple Name Generator — Blend Two Names Into One",
    description:
      "Blend two names into a cute couple name or ship name. Free couple name generator with dozens of instant combinations.",
    keyword: "couple name generator",
    flavor: "aesthetic",
    intro:
      "Couple names — also called ship names — merge two names into one word. Enter both names in the mixer and you will get every plausible blend, from the obvious to the ones you would never have thought of.",
    sections: [
      {
        h2: "How name blending works",
        body: [
          "The standard method takes the opening sound of one name and the ending of the other. Where the split falls decides whether the result is elegant or unpronounceable, so the generator tries every split and filters the results by length and readability.",
        ],
      },
      {
        h2: "What makes a blend work",
        body: ["Test any candidate against these three questions before you use it."],
        list: [
          "Can you say it once and be understood?",
          "Does it keep a recognisable piece of both names?",
          "Does it accidentally spell something unfortunate?",
        ],
      },
      {
        h2: "Beyond couples",
        body: [
          "The same blending works for business partnerships, band names, joint social accounts and duo streaming channels. Anywhere two identities need one label, a blend beats a hyphen.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do you make a couple name?",
        a: "Take the first syllable of one name and the last of the other, then try the reverse. Enter both names in the mixer above and it will produce every workable combination at once.",
      },
      {
        q: "What is a ship name?",
        a: "A ship name is a fandom term for the blended name of two characters people want to see together. Mechanically it is the same as a couple name.",
      },
      {
        q: "Can I blend three names?",
        a: "Run the mixer twice: blend the first two, then blend that result with the third. Keep the final output under about twelve characters.",
      },
    ],
    examples: ["Ariel + Noah = Arinoah", "Mia + Leo = Mileo", "Sara + Kai = Sarakai", "Zoe + Ben = Zoben"],
    related: ["name-mixer", "cute-nicknames", "aesthetic-username-generator"],
  },
  {
    slug: "domain-name-ideas",
    h1: "Domain Name Ideas Generator",
    title: "Domain Name Ideas — Short, Brandable Domain Generator",
    description:
      "Generate short brandable domain name ideas for your startup, blog or portfolio, with practical advice on TLDs and availability.",
    keyword: "domain name ideas",
    flavor: "professional",
    intro:
      "Every short dictionary .com was registered years ago, so modern domain hunting is about clever construction rather than luck. This generator produces compound and invented candidates worth checking.",
    sections: [
      {
        h2: "Strategies that still find good domains",
        body: ["These approaches consistently surface available names in a saturated market."],
        list: [
          "Compound two short common words: driftbase, northloop",
          "Add a functional suffix: getvellum, vellumhq, vellumapp",
          "Invent from Latin or Greek roots: solace, kindra, vellum",
          "Use a modern TLD deliberately: .online, .io, .co, .studio",
          "Drop a vowel — sparingly, and only if it stays readable",
        ],
      },
      {
        h2: "Choosing a TLD",
        body: [
          "A .com still carries the most trust with a general audience, but a good name on a relevant TLD beats a bad name on .com. Extensions such as .online, .studio and .co are widely understood and no longer read as second-tier.",
          "Avoid hyphens and numbers entirely. Both get lost whenever someone says your domain out loud.",
        ],
      },
      {
        h2: "Before you buy",
        body: [
          "Check the name's history on an archive service — an expired domain can carry spam penalties from a previous owner. Check the matching social handles. Then register for multiple years to signal permanence.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a .online domain good for SEO?",
        a: "Search engines treat modern TLDs equivalently to .com. Rankings come from content, links and user signals — not from the extension.",
      },
      {
        q: "How long should a domain be?",
        a: "Under 15 characters and ideally two words. Every extra character increases typos and reduces recall.",
      },
      {
        q: "Should I buy multiple extensions?",
        a: "Buy your primary plus the local TLD of your main market. Defensively registering a dozen extensions is rarely worth the recurring cost for a small project.",
      },
    ],
    examples: ["driftbase", "northloop", "getvellum", "kindra", "solace.studio", "vellumhq"],
    related: ["business-name-generator", "youtube-channel-name-ideas", "name-mixer"],
  },
  {
    slug: "small-text-generator",
    h1: "Small Text Generator",
    title: "Small Text Generator — Tiny Caps, Superscript & Subscript",
    description:
      "Convert text into small caps, superscript and subscript Unicode. Copy tiny text for bios, usernames and captions instantly.",
    keyword: "small text generator",
    flavor: "aesthetic",
    intro:
      "Small text uses Unicode characters that were designed for phonetics and mathematics but render as miniature letters. Paste them into a bio, caption or username field for a subtle, clean effect.",
    sections: [
      {
        h2: "The three kinds of small text",
        body: ["Each uses a different Unicode block and has different coverage gaps."],
        list: [
          "Small caps: ᴛʜɪs ɪs sᴍᴀʟʟ ᴄᴀᴘs — near-complete alphabet, best coverage",
          "Superscript: ᵗʰⁱˢ ⁱˢ ˢᵘᵖᵉʳ — sits high, missing a few letters",
          "Subscript: ₜₕᵢₛ — sits low, very limited alphabet",
        ],
      },
      {
        h2: "Where small text works",
        body: [
          "Instagram bios, TikTok display names, Discord nicknames, Twitter/X names and Tumblr posts all render small text correctly. Plain-text-only fields such as Instagram @handles and Roblox usernames strip or reject it.",
        ],
      },
      {
        h2: "Accessibility note",
        body: [
          "Screen readers handle small caps reasonably but often garble superscript and subscript. Never put essential information — your name, a link, a call to action — in small text alone.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I make text smaller on Instagram?",
        a: "Instagram has no built-in size control. Convert your text to small caps here, copy it and paste it into your bio or display name.",
      },
      {
        q: "Does small text work everywhere?",
        a: "It works in any field that accepts full Unicode. Fields restricted to plain ASCII, such as usernames and email addresses, will reject it.",
      },
      {
        q: "Why do some letters not shrink?",
        a: "Unicode never defined superscript or subscript forms for every letter. The generator leaves those characters unchanged rather than substituting a wrong glyph.",
      },
    ],
    examples: ["ᴛɪɴʏ ᴛᴇxᴛ", "ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ", "ₛᵤᵦₛ𝒸ᵣᵢₚₜ", "ꜱᴍᴀʟʟ ᴄᴀᴘꜱ"],
    related: ["fancy-text-generator", "discord-name-fonts", "aesthetic-username-generator"],
  },
];

export const NICHE_MAP = Object.fromEntries(NICHES.map((n) => [n.slug, n]));

export interface Guide {
  slug: string;
  title: string;
  h1: string;
  description: string;
  updated: string;
  readTime: string;
  intro: string;
  sections: { h2: string; body: string[]; list?: string[] }[];
  faqs: { q: string; a: string }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "how-to-choose-a-username",
    title: "How to Choose a Username You Will Not Regret",
    h1: "How to Choose a Username You Will Not Regret",
    description:
      "A practical framework for picking a username that stays available, readable and relevant across every platform for years.",
    updated: "2026-07-01",
    readTime: "8 min read",
    intro:
      "Most people choose a username in under a minute and live with it for a decade. This guide walks through a repeatable process that produces a handle you can carry across every platform without wincing later.",
    sections: [
      {
        h2: "Step 1: Decide what the name is for",
        body: [
          "A username serving a personal brand has different requirements from a gaming alias or an anonymous throwaway. A personal brand handle should be searchable and tied to your real identity. A gaming alias can be invented and evocative. An anonymous handle should share nothing with your other accounts.",
          "Mixing these purposes is the most common mistake. If you might one day monetise the account, treat it as a brand from day one.",
        ],
      },
      {
        h2: "Step 2: Set your constraints before you brainstorm",
        body: [
          "Constraints make creativity faster, not slower. Write down your maximum length, allowed characters and required availability platforms before you generate a single idea.",
        ],
        list: [
          "Target length: 6 to 14 characters",
          "Characters: lowercase letters, at most one separator",
          "Must be free on: your top three platforms simultaneously",
          "Must survive being said out loud once",
          "Must not contain a year, a game title or a trend word",
        ],
      },
      {
        h2: "Step 3: Generate in volume, judge later",
        body: [
          "Produce at least fifty candidates before you evaluate any of them. Judging while generating kills the good weird options early. Use the generators on this site to fill the list quickly, then cut ruthlessly.",
        ],
      },
      {
        h2: "Step 4: The availability sweep",
        body: [
          "Take your top ten and check all of them on every platform in one sitting. Availability changes daily, and a handle you check on Monday can be gone by Friday. When you find one free everywhere, register it everywhere immediately — even on platforms you do not plan to use yet.",
        ],
      },
      {
        h2: "Step 5: The 48-hour test",
        body: [
          "Sit on your choice for two days. Say it aloud, type it, imagine it in a URL and in a video introduction. Names that feel clever on day one often feel exhausting on day three. The one you still like after 48 hours is the one to take.",
        ],
      },
      {
        h2: "Common mistakes to avoid",
        body: ["Nearly every regretted username falls into one of these traps."],
        list: [
          "Trailing random numbers that signal a second-choice account",
          "The current year, which dates you permanently",
          "A game or fandom you may leave",
          "Deliberate misspellings people cannot type from memory",
          "Different handles on different platforms",
          "Anything that cannot be spelled after hearing it once",
        ],
      },
    ],
    faqs: [
      {
        q: "Should my username be my real name?",
        a: "If you are building a personal brand, yes — real names are trusted and searchable. For gaming or privacy-sensitive accounts, an invented handle is safer.",
      },
      {
        q: "How do I check a username across all platforms at once?",
        a: "Open each platform's profile URL with your handle appended in a private tab. It is manual but authoritative — third-party checkers are frequently out of date.",
      },
      {
        q: "Is it bad to change my username later?",
        a: "It costs you accumulated recognition and breaks external links, but it is far better than keeping a name that no longer fits. Change once, then commit.",
      },
    ],
  },
  {
    slug: "unicode-fonts-explained",
    title: "How Unicode Fancy Fonts Actually Work",
    h1: "How Unicode Fancy Fonts Actually Work",
    description:
      "Fancy text is not a font — it is a set of separate Unicode characters. Here is why that matters for compatibility, SEO and accessibility.",
    updated: "2026-07-01",
    readTime: "7 min read",
    intro:
      "When you paste 𝓯𝓪𝓷𝓬𝔂 𝓽𝓮𝔁𝓽 into a bio, you are not applying a font. You are using entirely different characters that happen to look like styled letters. That distinction explains every quirk of fancy text.",
    sections: [
      {
        h2: "Characters, not formatting",
        body: [
          "Unicode assigns a unique number to every character. Alongside ordinary Latin letters it defines blocks such as Mathematical Alphanumeric Symbols, which contain bold, italic, script, fraktur, double-struck and monospace versions of A to Z.",
          "A fancy text generator maps each letter you type to the matching character in one of those blocks. The result is plain text that travels through any system accepting Unicode — no formatting layer required.",
        ],
      },
      {
        h2: "Why boxes appear",
        body: [
          "An empty box, or tofu, means the device has no glyph for that code point in any installed font. The character is still there and still copies correctly — it simply cannot be drawn.",
          "Older Android builds, some smart TVs and certain game clients ship minimal font sets, which is why the same name renders perfectly on your phone and as boxes on a friend's.",
        ],
      },
      {
        h2: "The accessibility cost",
        body: [
          "Screen readers work from the underlying character, not the shape. Mathematical bold A is not the letter A, so a reader may announce it as 'mathematical bold capital A', spell the whole word out, or skip it silently.",
          "Use fancy text as decoration around plain text, never as the only carrier of important information.",
        ],
      },
      {
        h2: "What it means for search",
        body: [
          "Search engines generally do not treat mathematical alphanumerics as equivalent to their plain counterparts. A page title or heading written in fancy text is effectively invisible for the plain-text query. Keep all real content in ordinary letters.",
        ],
      },
      {
        h2: "Combining marks and the zalgo effect",
        body: [
          "Some styles work differently: strikethrough, underline and zalgo append combining characters after each letter. These stack unlimited times, which is how zalgo text spills vertically. Many platforms strip or limit them to prevent layout abuse.",
        ],
      },
      {
        h2: "Choosing a safe style",
        body: ["If maximum compatibility matters, stick to the blocks with the widest device support."],
        list: [
          "Mathematical bold and italic — near-universal",
          "Small caps — very wide support",
          "Fullwidth forms — universal wherever CJK fonts exist",
          "Circled and squared letters — good, occasional gaps",
          "Rare script variants and new emoji — least reliable",
        ],
      },
    ],
    faqs: [
      {
        q: "Is fancy text safe to use?",
        a: "Yes. It is standard Unicode, not code, and cannot carry anything harmful. The only risks are rendering gaps and reduced accessibility.",
      },
      {
        q: "Why does fancy text get removed from some fields?",
        a: "Some platforms deliberately restrict fields to ASCII to keep them searchable and readable. Usernames and email addresses are the usual examples.",
      },
      {
        q: "Does fancy text hurt SEO?",
        a: "In page content, yes — search engines cannot match it to normal queries. In a social bio it is harmless, since those fields are not ranking factors.",
      },
    ],
  },
  {
    slug: "nickname-ideas-by-personality",
    title: "Nickname Ideas Sorted by Personality Type",
    h1: "Nickname Ideas Sorted by Personality Type",
    description:
      "Find a nickname that actually fits you. Hundreds of nickname ideas organised by personality, energy and the impression you want to make.",
    updated: "2026-07-01",
    readTime: "9 min read",
    intro:
      "The nicknames that stick describe something true. Rather than scrolling a random alphabetical list, start from the trait you want the name to communicate and work outward.",
    sections: [
      {
        h2: "The quiet strategist",
        body: [
          "You watch before you act and you would rather be underestimated than loud. Names in this family use stillness words and restraint — the effect is unsettling in a good way.",
        ],
        list: ["Silent", "Quietstorm", "Nullpoint", "Stillwater", "Warden", "Ghostline", "Lowlight", "Cipher"],
      },
      {
        h2: "The relentless aggressor",
        body: [
          "You take the fight forward every time. Hard consonants and heat imagery match that energy, and they read fast on a kill feed.",
        ],
        list: ["Blaze", "Rampage", "Ironfang", "Havok", "Redline", "Breaker", "Furnace", "Onslaught"],
      },
      {
        h2: "The soft aesthetic",
        body: [
          "You want warmth rather than intimidation. Liquid consonants, nature imagery and lowercase styling all point in the same direction.",
        ],
        list: ["peachcloud", "lunarei", "mossdrift", "honeyveil", "sunspun", "petalcore", "softnoor", "velour"],
      },
      {
        h2: "The chaotic joker",
        body: [
          "Your whole personality is the bit. Absurd noun pairings work best — the more mundane the object, the funnier the contrast.",
        ],
        list: ["WaffleTank", "SirNoodle", "LegalGoose", "ToastGoblin", "MildPanic", "CerealOffender", "BongoJury"],
      },
      {
        h2: "The professional",
        body: [
          "You need something a recruiter can read without flinching. Real name plus discipline is unbeatable here; if that is taken, add a neutral suffix.",
        ],
        list: ["aria.builds", "noor.dev", "remi.writes", "kade.designs", "solworks", "quietdesk"],
      },
      {
        h2: "The mysterious wanderer",
        body: [
          "Distance and elsewhere are the theme. These names suggest a backstory the reader has to invent, which is exactly the point.",
        ],
        list: ["Nomad", "Farshore", "Ashfall", "Driftless", "Hollowpath", "Nightferry", "Longwake"],
      },
      {
        h2: "Turning a trait into a name",
        body: [
          "Write the adjective you want people to feel. Find three nouns associated with it. Combine each noun with an unrelated but tonally matched adjective. Say the results aloud and keep the ones that survive. That process beats any list, including this one.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find a nickname that fits me?",
        a: "Start with the impression you want to leave, not with a list of words. Pick the trait first, then find nouns and adjectives that carry it, then generate combinations.",
      },
      {
        q: "Should my nickname be intimidating?",
        a: "Only if that matches how you actually play or present. A mismatch between name and behaviour reads as trying too hard.",
      },
      {
        q: "Can I have different nicknames on different platforms?",
        a: "You can, but it costs you recognition. Keep one core identity and vary only the decoration around it.",
      },
    ],
  },
  {
    slug: "username-availability-checklist",
    title: "The Username Availability Checklist",
    h1: "The Username Availability Checklist",
    description:
      "A step-by-step checklist for confirming a username is free across every platform that matters before you commit to it.",
    updated: "2026-07-01",
    readTime: "6 min read",
    intro:
      "Claiming a name on one platform and discovering it is taken everywhere else is the single most common naming failure. Run this checklist in one sitting, before you announce anything.",
    sections: [
      {
        h2: "Check the social platforms first",
        body: [
          "Open each profile URL directly in a private window. A not-found page means the handle is free at that moment. Do all of them within the same hour — availability moves fast on short names.",
        ],
        list: [
          "instagram.com/handle",
          "tiktok.com/@handle",
          "youtube.com/@handle",
          "x.com/handle",
          "reddit.com/user/handle",
          "twitch.tv/handle",
          "github.com/handle",
        ],
      },
      {
        h2: "Then check the domain",
        body: [
          "Even if you have no website today, a matching domain protects the name. Check your primary TLD and one backup. If the exact match is gone, a short functional suffix keeps the brand intact better than a hyphen.",
        ],
      },
      {
        h2: "Search for existing use",
        body: [
          "Run the name through a search engine in quotes. You are looking for an established business, a trademark, or an unfortunate meaning in another language. Five minutes here prevents an expensive rebrand later.",
        ],
      },
      {
        h2: "Claim everything at once",
        body: [
          "Register the handle on every platform on your list the same day, including ones you do not plan to use. Dormant claimed accounts are free and they keep your options open permanently.",
        ],
      },
      {
        h2: "Document it",
        body: [
          "Keep a single note listing every platform, the exact handle and the email used. When you expand later, or hand work to a collaborator, that note saves hours.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are username availability checker tools reliable?",
        a: "Only partially. They cache results and miss platform-specific reservation rules. Manual checks against the real profile URLs are the only authoritative method.",
      },
      {
        q: "What if my name is taken on one platform only?",
        a: "Decide whether that platform is core to your plans. If it is, pick a different name. If not, use a consistent variant everywhere else and accept the single exception.",
      },
      {
        q: "Can I get a taken username released?",
        a: "Rarely. Some platforms release inactive handles or honour trademark claims, but the process is slow and the outcome is uncertain. Assume the answer is no.",
      },
    ],
  },
];

export const GUIDE_MAP = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
