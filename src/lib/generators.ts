// Generator page registry.
//
// Each entry is a *configuration* of the shared engine in `./engine.ts` plus
// hand-written, page-specific copy. Adding a new SEO generator page means
// adding one object here — no new route or component code.

import type { GenLength, GenMode, GenStyle, GenTheme } from "./engine";

export type GenCluster = "username" | "nickname" | "clan";

export interface GenPage {
  slug: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  cluster: GenCluster;
  /** Shown as the intro above the tool — 2–3 page-specific sentences. */
  intro: string;
  /** Label above the results list, matched to what the tool actually makes. */
  resultLabel: string;
  mode: GenMode;
  style: GenStyle;
  theme: GenTheme;
  words: 1 | 2 | 3;
  length: GenLength;
  numbers: boolean;
  symbols: boolean;
  customNouns?: string[];
  /** Page-specific naming advice. */
  tips: string[];
  /** Who this page is for / where the name gets used. */
  useCases: string[];
  faqs: { q: string; a: string }[];
  related: string[];
  guides: string[];
  pillar?: boolean;
}

const AVAILABILITY_FAQ = {
  q: "Are the generated names free to use?",
  a: "Yes. Everything the generator produces is free to use. Names are combined from ordinary words, so always check availability on the platform where you plan to use the name, and avoid anything that matches an existing brand.",
};

const PAGES: GenPage[] = [
  // ── Username cluster ───────────────────────────────────────────────
  {
    slug: "cool-username-generator",
    h1: "Cool Username Generator",
    seoTitle: "Cool Username Generator — Sharp, Modern Username Ideas",
    metaDescription:
      "Generate cool usernames in one click. Pick a style, theme and length, then copy sharp, modern handle ideas for games, Discord and social accounts.",
    cluster: "username",
    intro:
      "A handle reads as cool when it is short, confident and easy to say out loud. This generator leans on hard consonants and single-syllable nouns rather than decoration, so the result still looks right in a small profile bubble.",
    resultLabel: "Cool username ideas",
    mode: "username",
    style: "cool",
    theme: "any",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Two words beat three. Anything longer stops being memorable in voice chat.",
      "Prefer consonant endings — they land harder than trailing vowels.",
      "Skip birth years; they date a handle you might keep for a decade.",
      "Say the name out loud before committing. If you have to spell it twice, pick another.",
    ],
    useCases: [
      "Gaming profiles where the name appears on a scoreboard",
      "Discord and Twitch handles you will read out loud",
      "Second social accounts that need a fresh identity",
    ],
    faqs: [
      {
        q: "What makes a username sound cool rather than try-hard?",
        a: "Restraint. One strong noun with one modifier usually beats a long phrase padded with numbers, underscores and symbols. If every part is doing something, nothing stands out.",
      },
      {
        q: "Should I use numbers in a cool username?",
        a: "Only when the number means something to you. Random digits usually signal that the plain version was taken, which reads as a fallback rather than a choice.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["gaming-username-generator", "unique-username-generator", "short-username-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "cute-username-generator",
    h1: "Cute Username Generator",
    seoTitle: "Cute Username Generator — Soft & Sweet Username Ideas",
    metaDescription:
      "Make cute usernames instantly. Soft, sweet handle ideas built from gentle words, ready to copy for Instagram, TikTok, Roblox and Discord.",
    cluster: "username",
    intro:
      "Cute handles work through softness: gentle sounds, lowercase letters and words with warm associations like honey, bunny or peach. The generator keeps the vocabulary sweet without slipping into baby-talk.",
    resultLabel: "Cute username ideas",
    mode: "username",
    style: "cute",
    theme: "food",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Keep everything lowercase — capitals make a soft handle look shouty.",
      "Food and small-animal words carry cuteness without extra effort.",
      "One separator maximum. A single dot or underscore is enough.",
      "Double letters (bunnii, sweetii) read cute on some platforms and cluttered on others — test both.",
    ],
    useCases: [
      "Instagram and TikTok accounts with a soft visual theme",
      "Roblox and cosy-game profiles",
      "Friend-group Discord servers",
    ],
    faqs: [
      {
        q: "How do I make a cute username that still feels grown-up?",
        a: "Choose warmth over childishness: words like linen, honey, dusk or clover feel gentle without reading as a kids' account. Avoid strings of repeated letters and emoji-heavy padding.",
      },
      {
        q: "Can I use these on Instagram?",
        a: "Yes, as long as the handle fits Instagram's 30-character limit and uses only letters, numbers, periods and underscores. Check the handle on the app before you settle on it.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["aesthetic-nickname-generator", "cool-username-generator", "username-generator-for-girls"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "funny-username-generator",
    h1: "Funny Username Generator",
    seoTitle: "Funny Username Generator — Genuinely Funny Handle Ideas",
    metaDescription:
      "Generate funny usernames that actually land. Mismatched words, silly pairings and joke handles for games, group chats and social accounts.",
    cluster: "username",
    intro:
      "Funny names work on contrast: an ordinary, slightly pathetic word bolted to a dramatic one. The generator deliberately mismatches tone so the result raises a smile instead of trying too hard.",
    resultLabel: "Funny username ideas",
    mode: "username",
    style: "funny",
    theme: "food",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Contrast is the whole joke: pair something mundane with something grand.",
      "Short jokes survive. If the punchline needs 20 characters, it has already died.",
      "Avoid jokes at anyone's expense — they age badly and get you reported.",
      "Read it as a killfeed line or a scoreboard entry; that is where it has to work.",
    ],
    useCases: [
      "Casual lobbies where the name appears in the killfeed",
      "Group chats and friend servers",
      "Alt accounts and party games",
    ],
    faqs: [
      {
        q: "What makes a funny username work?",
        a: "Surprise, then brevity. The reader should get the joke in one beat. Anything that needs explaining stops being funny by the second time someone sees it.",
      },
      {
        q: "Will a funny username hurt me in competitive games?",
        a: "Only socially. Some players use a joke handle casually and a plain one for ranked play — nothing stops you keeping two accounts with different tones.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["funny-nickname-generator", "cool-username-generator", "funny-clan-name-generator"],
    guides: ["nickname-ideas-by-personality"],
  },
  {
    slug: "unique-username-generator",
    h1: "Unique Username Generator",
    seoTitle: "Unique Username Generator — Handles Nobody Else Has Taken",
    metaDescription:
      "Create unique usernames using uncommon word pairs. Generate rare, unclaimed handle ideas and check them on the platform you want.",
    cluster: "username",
    intro:
      "The reason your first choice is always taken is that it uses the twenty words everyone reaches for. This generator pulls from rarer vocabulary and unusual pairings, which dramatically improves your odds of finding an unclaimed handle.",
    resultLabel: "Unique username ideas",
    mode: "username",
    style: "unique",
    theme: "any",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Uncommon nouns beat common nouns with numbers bolted on.",
      "Mix registers: one plain word plus one unexpected word is memorable and rare.",
      "Check the handle on every platform you care about before you use it anywhere.",
      "If a name is free everywhere, register it everywhere the same day.",
    ],
    useCases: [
      "Building one consistent handle across every platform",
      "Creators who need a name nobody else is using",
      "Replacing a handle that only exists with numbers appended",
    ],
    faqs: [
      {
        q: "How do I find a username that is actually available?",
        a: "Widen the vocabulary rather than adding characters. A rare word pair is far more likely to be free than a common word with digits, and it reads much better.",
      },
      {
        q: "Should I claim the same username everywhere?",
        a: "If you plan to build an audience, yes. One handle across platforms makes you findable and stops someone else taking the matching name later.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cool-username-generator", "random-username-generator", "short-username-generator"],
    guides: ["username-availability-checklist", "how-to-choose-a-username"],
  },
  {
    slug: "random-username-generator",
    h1: "Random Username Generator",
    seoTitle: "Random Username Generator — Instant Random Handle Ideas",
    metaDescription:
      "Generate random usernames instantly. Hit generate for a fresh batch of random handle ideas, then copy the one you like — no sign-up needed.",
    cluster: "username",
    intro:
      "Sometimes you do not want to make a decision, you want a shortlist. This version randomises style and theme on every run, so each batch spans several tones instead of repeating one flavour.",
    resultLabel: "Random username ideas",
    mode: "username",
    style: "random",
    theme: "any",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "Generate three or four batches before judging any single name.",
      "Copy the two or three you half-like, then compare them side by side.",
      "Randomness is a starting point — edit the winner rather than accepting it whole.",
      "Ignore anything you cannot type from memory.",
    ],
    useCases: [
      "Signing up for something quickly without overthinking it",
      "Breaking a naming block when nothing feels right",
      "Throwaway or test accounts",
    ],
    faqs: [
      {
        q: "How random are the results?",
        a: "Style, theme and word structure are all re-rolled per name, and no result repeats within a batch. Each run gives a genuinely different mix.",
      },
      {
        q: "Can I narrow the randomness?",
        a: "Yes. Set a specific style or theme in the controls and the generator will stay within that lane while still varying the structure.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["unique-username-generator", "cool-username-generator", "gaming-username-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "gaming-username-generator",
    h1: "Gaming Username Generator",
    seoTitle: "Gaming Username Generator — Gamertags & In-Game Names",
    metaDescription:
      "Create gaming usernames and gamertags that read well on a scoreboard. Pick a style, generate, copy — free and instant.",
    cluster: "username",
    intro:
      "A gaming name has to survive three places: the lobby list, the killfeed and someone shouting it in voice chat. That rules out long phrases and clever spellings, which is why this generator biases toward two punchy syllables.",
    resultLabel: "Gaming username ideas",
    mode: "username",
    style: "gaming",
    theme: "fire",
    words: 2,
    length: "medium",
    numbers: true,
    symbols: false,
    tips: [
      "Under 12 characters keeps the name readable in scoreboards and overlays.",
      "Avoid lookalike characters (l/I, 0/O) — people will type it wrong.",
      "Leave room for a clan tag if you might join a team later.",
      "Check the name renders in the game's own font before you pay to change it.",
    ],
    useCases: [
      "Shooters and battle royales with visible killfeeds",
      "Ranked ladders and tournament sign-ups",
      "Streaming under the same name you play under",
    ],
    faqs: [
      {
        q: "What is the ideal length for a gaming name?",
        a: "Six to twelve characters. Short enough to read at a glance during a match, long enough to be distinctive and available.",
      },
      {
        q: "Can I add symbols to my in-game name?",
        a: "It depends on the game. Many accept a limited Unicode range and reject the rest. Try the symbol version first, and keep a plain fallback ready.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cool-username-generator", "gaming-nickname-generator", "gaming-clan-name-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "short-username-generator",
    h1: "Short Username Generator",
    seoTitle: "Short Username Generator — 3 to 8 Character Handles",
    metaDescription:
      "Generate short usernames between three and eight characters. Compact, typeable handles that fit any platform limit.",
    cluster: "username",
    intro:
      "Short handles are the hardest to claim and the easiest to remember. This generator constrains output to three to eight characters and drops anything that becomes unpronounceable when trimmed.",
    resultLabel: "Short username ideas",
    mode: "username",
    style: "minimal",
    theme: "any",
    words: 1,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "One strong word usually beats two abbreviated ones.",
      "Keep at least one vowel so the name is still sayable.",
      "Short names are heavily claimed — generate a wide batch and check quickly.",
      "If the four-letter version is taken, a five-letter version is still short.",
    ],
    useCases: [
      "Platforms with tight character limits",
      "Names you will type constantly",
      "Clean, minimal branding",
    ],
    faqs: [
      {
        q: "Why are short usernames so hard to get?",
        a: "There are only so many combinations, and most were claimed years ago. Rare letter combinations and less common words are your best route to a free one.",
      },
      {
        q: "What is the shortest username most platforms allow?",
        a: "Usually three characters, though some require four or five. Generate a mix of lengths so you have a fallback if the shortest option is rejected.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["minimal-username-generator", "unique-username-generator", "cool-username-generator"],
    guides: ["username-availability-checklist"],
  },
  {
    slug: "minimal-username-generator",
    h1: "Minimal Username Generator",
    seoTitle: "Minimal Username Generator — Clean, Lowercase Handles",
    metaDescription:
      "Generate minimal usernames: clean lowercase handles with no numbers, no symbols and no clutter. Copy-ready in one click.",
    cluster: "username",
    intro:
      "Minimal handles strip out everything decorative: no digits, no symbols, no camel case. What is left has to carry the name on its own, so word choice matters more here than anywhere else.",
    resultLabel: "Minimal username ideas",
    mode: "username",
    style: "minimal",
    theme: "nature",
    words: 1,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "Lowercase everything and let the word do the work.",
      "Concrete nouns read cleaner than abstract ones.",
      "If you must join two words, join them with nothing at all.",
      "Test the handle in a small font — minimal names live or die at 12px.",
    ],
    useCases: [
      "Portfolio and design accounts",
      "Newsletter and writing handles",
      "Anywhere a busy name would clash with your visuals",
    ],
    faqs: [
      {
        q: "Is a minimal username better for a professional profile?",
        a: "Usually. A clean lowercase handle reads as considered, and it is far easier to print on a card, say on a call or type into a browser.",
      },
      {
        q: "What if the minimal version is taken?",
        a: "Add a single meaningful word rather than a number — your city, craft or medium keeps the clean look while making the handle unique.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["professional-username-generator", "short-username-generator", "aesthetic-nickname-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "professional-username-generator",
    h1: "Professional Username Generator",
    seoTitle: "Professional Username Generator — Handles for Work Profiles",
    metaDescription:
      "Create professional usernames for LinkedIn, portfolios, email and client-facing accounts. Clean, credible handle ideas you can copy instantly.",
    cluster: "username",
    intro:
      "A work handle has a different job from a gaming one: it has to be readable on a business card, dictatable over the phone and safe to put in a client email. This generator avoids slang, digits and decoration entirely.",
    resultLabel: "Professional username ideas",
    mode: "username",
    style: "professional",
    theme: "technology",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Your real name plus your craft is still the strongest professional handle.",
      "Avoid anything you would not read out on a client call.",
      "Keep the same handle across LinkedIn, email and your portfolio domain.",
      "Skip years and locations — both will be wrong eventually.",
    ],
    useCases: [
      "LinkedIn and professional networks",
      "Portfolio sites and freelance profiles",
      "Business email addresses",
    ],
    faqs: [
      {
        q: "Should a professional username include my real name?",
        a: "If you are building a personal reputation, yes. A name plus discipline — think 'lena.builds' — is memorable and immediately explains who you are.",
      },
      {
        q: "Are underscores unprofessional?",
        a: "Not inherently, but periods generally read cleaner and survive being written down. Pick one separator and use it everywhere.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["minimal-username-generator", "unique-username-generator", "cool-username-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "username-generator-for-instagram",
    h1: "Instagram Username Generator",
    seoTitle: "Instagram Username Generator — Handle Ideas That Fit IG",
    metaDescription:
      "Generate Instagram usernames that fit the 30-character limit and IG's allowed characters. Aesthetic, cute and clean handle ideas to copy.",
    cluster: "username",
    intro:
      "Instagram allows 30 characters but only letters, numbers, periods and underscores — and your handle appears above every post, comment and story reply. This generator keeps results inside those rules and short enough to read in a comment thread.",
    resultLabel: "Instagram username ideas",
    mode: "username",
    style: "aesthetic",
    theme: "nature",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Instagram permits only letters, numbers, periods and underscores — no symbols.",
      "Keep it under about 15 characters so it does not truncate in comments.",
      "Your display name can carry the fancy version; the handle should stay plain.",
      "Changing your handle breaks old links and mentions, so choose one you can keep.",
    ],
    useCases: [
      "New personal or theme accounts",
      "Rebranding an account without losing the audience",
      "Second accounts for photography, art or a niche interest",
    ],
    faqs: [
      {
        q: "What characters can I use in an Instagram username?",
        a: "Letters, numbers, periods and underscores only, up to 30 characters. Decorative Unicode works in the display name field but not in the handle.",
      },
      {
        q: "How often can I change my Instagram username?",
        a: "Instagram allows changes, but old mentions and links stop resolving, and a freed handle can be claimed by someone else. Treat a change as permanent.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["username-generator-for-tiktok", "cute-username-generator", "aesthetic-nickname-generator"],
    guides: ["how-to-choose-a-username", "username-availability-checklist"],
  },
  {
    slug: "username-generator-for-tiktok",
    h1: "TikTok Username Generator",
    seoTitle: "TikTok Username Generator — Handles Built for TikTok",
    metaDescription:
      "Generate TikTok usernames that are short, sayable and easy to search. Copy-ready handle ideas for creators and new accounts.",
    cluster: "username",
    intro:
      "TikTok handles get spoken aloud in videos and typed into search far more often than handles on other platforms. That makes phonetic clarity — not visual flair — the deciding factor here.",
    resultLabel: "TikTok username ideas",
    mode: "username",
    style: "creative",
    theme: "music",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Say it in a sentence: 'follow me at ___'. If that is awkward, change it.",
      "Include your niche word so search surfaces you for it.",
      "Avoid homophone traps — viewers type what they heard, not what you spelled.",
      "Match your handle to your other platforms so cross-posting works.",
    ],
    useCases: [
      "Creator accounts built around one niche",
      "Accounts you will promote verbally in videos",
      "Cross-posting to Reels and Shorts under one name",
    ],
    faqs: [
      {
        q: "Does my TikTok username affect discoverability?",
        a: "It helps. Handles containing a clear niche word are easier to find in search, and viewers who half-remember your name are more likely to land on you.",
      },
      {
        q: "Should my TikTok handle match my Instagram?",
        a: "Where possible, yes. One handle everywhere means a viewer only has to remember one thing to find you on any platform.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["username-generator-for-instagram", "username-generator-for-youtube", "cute-username-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "username-generator-for-youtube",
    h1: "YouTube Name Generator",
    seoTitle: "YouTube Username Generator — Channel Name & Handle Ideas",
    metaDescription:
      "Generate YouTube channel names and @handles that are searchable, sayable and available. Copy ideas instantly, free.",
    cluster: "username",
    intro:
      "A YouTube name has to work twice: as an @handle in the URL and as a channel name people say in comments and recommendations. Names that scan as one clear phrase outperform clever spellings every time.",
    resultLabel: "YouTube name ideas",
    mode: "username",
    style: "creative",
    theme: "adventure",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Signal the topic. A viewer should half-guess your content from the name.",
      "Avoid boxing yourself in — a name tied to one game blocks a pivot later.",
      "Check the matching @handle is free before you commit to the channel name.",
      "Test how it looks truncated under a thumbnail, which is where most people read it.",
    ],
    useCases: [
      "New channels choosing a first name",
      "Rebrands moving away from a personal name",
      "Second channels for clips or shorts",
    ],
    faqs: [
      {
        q: "Should my channel name include a keyword?",
        a: "A light topic signal helps discovery, but do not stuff it. 'Ridgeline Rides' tells people you cover cycling; 'best cycling videos channel' just looks spammy.",
      },
      {
        q: "Can I change my YouTube handle later?",
        a: "YouTube allows handle changes, but old links and mentions point at the previous one. Pick a name broad enough to survive a change of direction.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["username-generator-for-tiktok", "professional-username-generator", "unique-username-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "username-generator-for-discord",
    h1: "Discord Username Generator",
    seoTitle: "Discord Username Generator — Handles & Display Names",
    metaDescription:
      "Generate Discord usernames and display names. Lowercase-safe handle ideas plus decorated display names you can copy straight in.",
    cluster: "username",
    intro:
      "Discord splits identity in two: a lowercase username that must be unique, and a display name that can carry capitals and symbols. Generate the plain handle here, then style the display name separately.",
    resultLabel: "Discord username ideas",
    mode: "username",
    style: "gaming",
    theme: "technology",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Discord usernames are lowercase and allow letters, numbers, periods and underscores.",
      "Save the decoration for the display name, which is what people actually see.",
      "Per-server nicknames let you use a different name in each community.",
      "Short handles are easier to @mention mid-conversation.",
    ],
    useCases: [
      "New Discord accounts",
      "Server-specific nicknames",
      "Matching your Discord name to your in-game name",
    ],
    faqs: [
      {
        q: "What is the difference between a Discord username and display name?",
        a: "The username is your unique lowercase handle used for mentions and friend requests. The display name is the styled name shown in chat, and it does not have to be unique.",
      },
      {
        q: "Can I use symbols in a Discord name?",
        a: "In the display name and per-server nicknames, yes. The base username is restricted to lowercase letters, numbers, periods and underscores.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["gaming-username-generator", "cool-username-generator", "gaming-clan-name-generator"],
    guides: ["unicode-fonts-explained"],
  },
  {
    slug: "username-generator-for-boys",
    h1: "Username Ideas for Boys",
    seoTitle: "Username Generator for Boys — Cool Handle Ideas",
    metaDescription:
      "Generate username ideas for boys: cool, sharp and gaming-friendly handles you can copy and use on any platform.",
    cluster: "username",
    intro:
      "This configuration leans toward harder consonants and shorter, blunter word pairs — the tone most people mean when they search for boys' username ideas. Every control is still open, so soften or sharpen it as you like.",
    resultLabel: "Username ideas for boys",
    mode: "username",
    style: "cool",
    theme: "fire",
    words: 2,
    length: "medium",
    numbers: true,
    symbols: false,
    tips: [
      "Blunt beats elaborate — one strong noun carries more than three modifiers.",
      "Try the same word pair with and without a number and compare.",
      "Keep it appropriate for every platform you use, including school accounts.",
      "A name you will still like in three years is worth more than one that is trending now.",
    ],
    useCases: [
      "First gaming account",
      "Group chats and Discord servers",
      "Sports and hobby accounts",
    ],
    faqs: [
      {
        q: "What makes a good username for a boy?",
        a: "The same things that make any good username: short, easy to say, easy to type and still likeable in a few years. Tone is a preference, not a rule.",
      },
      {
        q: "Can I use these usernames on any platform?",
        a: "Most of them, yes. Platforms differ on symbols and length, so generate with symbols off if you want the widest compatibility.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cool-username-generator", "gaming-username-generator", "nickname-generator-for-boys"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "username-generator-for-girls",
    h1: "Username Ideas for Girls",
    seoTitle: "Username Generator for Girls — Cute & Aesthetic Handles",
    metaDescription:
      "Generate username ideas for girls: cute, aesthetic and clean handles ready to copy for Instagram, TikTok, Roblox and Discord.",
    cluster: "username",
    intro:
      "This configuration favours softer vocabulary and lowercase pairings — the aesthetic most people are after when they search for girls' username ideas. Switch the style control for something sharper whenever you want.",
    resultLabel: "Username ideas for girls",
    mode: "username",
    style: "aesthetic",
    theme: "nature",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Lowercase keeps a soft handle looking intentional.",
      "Nature and texture words age better than trend words.",
      "One separator is plenty — two starts to look accidental.",
      "Check the handle is free everywhere before you use it anywhere.",
    ],
    useCases: [
      "Instagram and TikTok accounts with a soft theme",
      "Art, journalling and photography accounts",
      "Friend-group servers and gaming profiles",
    ],
    faqs: [
      {
        q: "How do I make an aesthetic username?",
        a: "Pick two gentle words, keep them lowercase, and join them with a single period or nothing at all. Restraint is what creates the look.",
      },
      {
        q: "Can I add symbols to these handles?",
        a: "In display names, yes. Most platforms restrict the handle itself to letters, numbers, periods and underscores, so keep the symbol version for your display name.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cute-username-generator", "aesthetic-nickname-generator", "username-generator-for-instagram"],
    guides: ["how-to-choose-a-username"],
  },

  // ── Nickname cluster ───────────────────────────────────────────────
  {
    slug: "cool-nickname-generator",
    h1: "Cool Nickname Generator",
    seoTitle: "Cool Nickname Generator — Sharp Nickname Ideas",
    metaDescription:
      "Generate cool nicknames in seconds. Short, confident nickname ideas for friends, teammates and online profiles — free to copy.",
    cluster: "nickname",
    intro:
      "A nickname is different from a username: other people have to say it, remember it and use it about you. That pushes cool nicknames toward one or two syllables with a clear stress pattern.",
    resultLabel: "Cool nickname ideas",
    mode: "nickname",
    style: "cool",
    theme: "any",
    words: 2,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "One or two syllables. Anything longer gets shortened by your friends anyway.",
      "Test it as a shout — nicknames mostly get used loudly.",
      "A nickname tied to something you actually do sticks far longer.",
      "If you have to ask people to use it, it is not the right one yet.",
    ],
    useCases: [
      "Team and squad nicknames",
      "Gaming aliases used in voice chat",
      "Group chats and friend circles",
    ],
    faqs: [
      {
        q: "What makes a nickname stick?",
        a: "Ease and truth. It has to be quick to say, and it has to connect to something recognisable about you — a habit, a role, a story. Names invented from nothing tend to fade.",
      },
      {
        q: "Can a nickname be the same as my username?",
        a: "It can, and keeping them the same makes you easier to recognise. Just check the spoken version is as comfortable as the written one.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["funny-nickname-generator", "gaming-nickname-generator", "cool-username-generator"],
    guides: ["nickname-ideas-by-personality"],
  },
  {
    slug: "funny-nickname-generator",
    h1: "Funny Nickname Generator",
    seoTitle: "Funny Nickname Generator — Nicknames That Get a Laugh",
    metaDescription:
      "Generate funny nicknames for friends, teammates and group chats. Silly, harmless nickname ideas ready to copy.",
    cluster: "nickname",
    intro:
      "The best funny nicknames are affectionate rather than sharp — the kind a friend group adopts permanently. This generator pairs gentle, absurd words instead of reaching for insults.",
    resultLabel: "Funny nickname ideas",
    mode: "nickname",
    style: "funny",
    theme: "food",
    words: 2,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "Punch up or punch nowhere. A nickname that stings stops being funny fast.",
      "Absurd beats crude — silly words survive repetition, rude ones do not.",
      "Two syllables is the sweet spot for something shouted across a room.",
      "If the person laughs the first time, it will stick.",
    ],
    useCases: [
      "Friend groups and group chats",
      "Sports teams and casual squads",
      "Party games and lobbies",
    ],
    faqs: [
      {
        q: "How do I pick a funny nickname for a friend?",
        a: "Anchor it to a real shared story. An inside reference outlasts a generic joke, and it never reads as mean-spirited because everyone knows where it came from.",
      },
      {
        q: "Are these nicknames safe to use?",
        a: "They are built from harmless everyday words with no insults or slurs. Still use judgement — anything can land badly with the wrong person.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cool-nickname-generator", "funny-username-generator", "funny-clan-name-generator"],
    guides: ["nickname-ideas-by-personality"],
  },
  {
    slug: "cute-nickname-generator",
    h1: "Cute Nickname Generator",
    seoTitle: "Cute Nickname Generator — Sweet Nickname Ideas",
    metaDescription:
      "Generate cute nicknames for partners, friends and pets. Sweet, soft nickname ideas you can copy in one tap.",
    cluster: "nickname",
    intro:
      "Cute nicknames rely on soft sounds — m, l and n consonants with open vowels — which is why so many end in a vowel. The generator favours that shape and keeps everything short enough to use daily.",
    resultLabel: "Cute nickname ideas",
    mode: "nickname",
    style: "cute",
    theme: "food",
    words: 2,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "Soft consonants carry the whole effect: m, l, n, sh.",
      "Ending on a vowel makes almost any word sound warmer.",
      "Keep it private-friendly — a nickname for one person need not work in public.",
      "Shorter is sweeter; three syllables is usually one too many.",
    ],
    useCases: [
      "Partners and close friends",
      "Pets",
      "Soft-themed social accounts",
    ],
    faqs: [
      {
        q: "What makes a nickname sound cute?",
        a: "Phonetics more than meaning. Soft consonants, open vowels and a short length do most of the work — which is why unrelated words like 'mochi' and 'bunny' feel similar.",
      },
      {
        q: "Can I use these as usernames too?",
        a: "Yes, though you may need to add a second word to find a free handle. Lowercase them and join with a period for a clean look.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cute-username-generator", "aesthetic-nickname-generator", "cool-nickname-generator"],
    guides: ["nickname-ideas-by-personality"],
  },
  {
    slug: "unique-nickname-generator",
    h1: "Unique Nickname Generator",
    seoTitle: "Unique Nickname Generator — Uncommon Nickname Ideas",
    metaDescription:
      "Generate unique nicknames from uncommon words. Distinctive nickname ideas nobody in your circle will already be using.",
    cluster: "nickname",
    intro:
      "If everyone in your group already has a nickname built from the same handful of words, the fix is vocabulary. This configuration draws on rarer nouns so the result sounds like nobody else's.",
    resultLabel: "Unique nickname ideas",
    mode: "nickname",
    style: "unique",
    theme: "any",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Unusual does not mean unpronounceable — keep it sayable on the first try.",
      "One rare word plus one plain word is more memorable than two rare ones.",
      "Try the same word in a different language family for a fresh sound.",
      "Distinctiveness comes from sound, not from strange spelling.",
    ],
    useCases: [
      "Standing out in a big community",
      "Creators wanting a signature alias",
      "Replacing a nickname everyone else shares",
    ],
    faqs: [
      {
        q: "How do I make a nickname nobody else has?",
        a: "Change the source material. Pull from vocabulary most people never use — geology, weather, old crafts — instead of adding numbers or alternate spellings to a common name.",
      },
      {
        q: "Will a strange nickname be hard for people to remember?",
        a: "Not if it is easy to say. Memorability tracks pronunciation, not familiarity, so any name that rolls off the tongue will stick.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cool-nickname-generator", "unique-username-generator", "gaming-nickname-generator"],
    guides: ["nickname-ideas-by-personality"],
  },
  {
    slug: "gaming-nickname-generator",
    h1: "Gaming Nickname Generator",
    seoTitle: "Gaming Nickname Generator — In-Game Aliases & Tags",
    metaDescription:
      "Generate gaming nicknames that work in voice chat and on a scoreboard. Copy-ready aliases for any game, free.",
    cluster: "nickname",
    intro:
      "In games your nickname is what teammates call you under pressure, so it needs to survive being shortened mid-fight. Names that already collapse to one clean syllable have a large advantage.",
    resultLabel: "Gaming nickname ideas",
    mode: "nickname",
    style: "gaming",
    theme: "fire",
    words: 2,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "Assume it will be shortened — make sure the short form still sounds good.",
      "Avoid names that clash with common callouts in your game.",
      "One hard consonant cuts through voice comms better than soft ones.",
      "Keep it consistent with your in-game name so teammates connect the two.",
    ],
    useCases: [
      "Team voice comms",
      "Tournament rosters",
      "Streaming and clip channels",
    ],
    faqs: [
      {
        q: "Should my gaming nickname match my username?",
        a: "Ideally the nickname is the spoken short form of your username. That way teammates, viewers and the scoreboard all reinforce the same identity.",
      },
      {
        q: "What nicknames work best in competitive play?",
        a: "Short, hard-edged and unambiguous ones. Anything that sounds like a game callout will cause confusion at exactly the wrong moment.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["gaming-username-generator", "cool-nickname-generator", "gaming-clan-name-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "aesthetic-nickname-generator",
    h1: "Aesthetic Nickname Generator",
    seoTitle: "Aesthetic Nickname Generator — Soft, Pretty Name Ideas",
    metaDescription:
      "Generate aesthetic nicknames: soft, lowercase name ideas with a calm, curated feel. Copy them straight into your profile.",
    cluster: "nickname",
    intro:
      "Aesthetic naming is a visual discipline as much as a verbal one — the words are chosen partly for how they look written down. Muted nouns, lowercase letters and no numbers are the whole formula.",
    resultLabel: "Aesthetic nickname ideas",
    mode: "nickname",
    style: "aesthetic",
    theme: "nature",
    words: 2,
    length: "medium",
    numbers: false,
    symbols: false,
    tips: [
      "Lowercase, always. Capitals break the effect immediately.",
      "Muted words — linen, dusk, moss — beat bright ones.",
      "No numbers. They are the fastest way to lose the look.",
      "Look at it written in your profile font before deciding.",
    ],
    useCases: [
      "Curated Instagram and Pinterest accounts",
      "Journalling and art profiles",
      "Soft-themed gaming profiles",
    ],
    faqs: [
      {
        q: "What counts as an aesthetic name?",
        a: "In practice: lowercase, two gentle words, at most one separator, and no digits. The style is defined by what it leaves out.",
      },
      {
        q: "Can I add symbols to an aesthetic name?",
        a: "Sparingly, and only in fields that allow them. One small symbol can frame a name; three turn it into clutter.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cute-nickname-generator", "cute-username-generator", "username-generator-for-instagram"],
    guides: ["unicode-fonts-explained"],
  },
  {
    slug: "nickname-generator-for-boys",
    h1: "Nickname Ideas for Boys",
    seoTitle: "Nickname Generator for Boys — Cool & Funny Ideas",
    metaDescription:
      "Generate nickname ideas for boys: cool, funny and gaming-friendly nicknames for friends, teammates and profiles.",
    cluster: "nickname",
    intro:
      "Most nicknames that stick for boys come from a real trait or story rather than a word list — so treat these as prompts. The moment a generated name reminds you of something true, you have found it.",
    resultLabel: "Nickname ideas for boys",
    mode: "nickname",
    style: "cool",
    theme: "sports",
    words: 2,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "Anchor it to something real — a position, a habit, a moment.",
      "Short names get used; long ones get shortened by other people.",
      "Keep it kind. A nickname repeated daily should not be a jab.",
      "Try the shout test before committing.",
    ],
    useCases: ["Sports teams", "School and friend groups", "Gaming squads"],
    faqs: [
      {
        q: "How do I choose a nickname for a friend?",
        a: "Start from something specific to him — a habit, a catchphrase, a famous mishap. Generated words are useful for finding the right sound around that idea.",
      },
      {
        q: "What if he does not like the nickname?",
        a: "Then it is not the nickname. A name only works when the person answers to it happily, so try another until one lands.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cool-nickname-generator", "username-generator-for-boys", "gaming-nickname-generator"],
    guides: ["nickname-ideas-by-personality"],
  },
  {
    slug: "nickname-generator-for-girls",
    h1: "Nickname Ideas for Girls",
    seoTitle: "Nickname Generator for Girls — Cute & Cool Ideas",
    metaDescription:
      "Generate nickname ideas for girls: cute, cool and aesthetic nicknames for friends, profiles and group chats.",
    cluster: "nickname",
    intro:
      "This configuration mixes soft vocabulary with a shorter word length, which is where most cute-but-not-childish nicknames live. Switch the style control to cool or unique for a completely different tone.",
    resultLabel: "Nickname ideas for girls",
    mode: "nickname",
    style: "cute",
    theme: "nature",
    words: 2,
    length: "short",
    numbers: false,
    symbols: false,
    tips: [
      "Soft consonants and short length do most of the work.",
      "Names drawn from a real detail always beat generic sweetness.",
      "Say it a few times — daily-use names need to be effortless.",
      "Keep a plain version for accounts that reject symbols.",
    ],
    useCases: ["Friend groups", "Social profiles", "Gaming and Discord servers"],
    faqs: [
      {
        q: "What is a good nickname for a best friend?",
        a: "One that references something only the two of you would explain the same way. Shared history is what makes a nickname feel earned rather than assigned.",
      },
      {
        q: "Can I use a nickname as my display name?",
        a: "Yes — display names accept far more characters than handles, so you can style the nickname there while keeping a plain username underneath.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cute-nickname-generator", "username-generator-for-girls", "aesthetic-nickname-generator"],
    guides: ["nickname-ideas-by-personality"],
  },

  // ── Clan cluster ───────────────────────────────────────────────────
  {
    slug: "clan-name-generator",
    h1: "Clan Name Generator",
    seoTitle: "Clan Name Generator — Team, Squad & Clan Name Ideas",
    metaDescription:
      "Generate clan names for any game. Cool, funny and fantasy clan name ideas plus matching short tags — free and instant.",
    cluster: "clan",
    pillar: true,
    intro:
      "A clan name has to do two jobs at once: sound good written out on a roster, and shrink to a two-to-four character tag that sits in front of every member's name. This generator builds the full name first, then shows you the tag it collapses into.",
    resultLabel: "Clan name ideas",
    mode: "clan",
    style: "cool",
    theme: "mythology",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "Check the tag before the name. If the initials are ugly, the name will not last.",
      "Most games cap tags at three or four characters — plan for the limit.",
      "Avoid names tied to one game if you might expand into others.",
      "Say it as a team introduction: it has to sound right announced.",
    ],
    useCases: [
      "Competitive teams and rosters",
      "Casual friend squads",
      "Discord communities and guilds",
    ],
    faqs: [
      {
        q: "How long should a clan name be?",
        a: "Two words is the norm — long enough to sound like an organisation, short enough to fit a roster line. The tag matters more than the name's length.",
      },
      {
        q: "How do I pick a clan tag?",
        a: "Take the initials or the first three letters of the strongest word, then check it is not already common in your game. A distinct tag is worth more than a clever full name.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["cool-clan-name-generator", "gaming-clan-name-generator", "3-letter-clan-names"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "cool-clan-name-generator",
    h1: "Cool Clan Name Generator",
    seoTitle: "Cool Clan Name Generator — Sharp Clan Name Ideas",
    metaDescription:
      "Generate cool clan names with strong, modern word pairs. Copy clan name ideas and matching tags for any game.",
    cluster: "clan",
    intro:
      "Cool clan names sound like organisations rather than jokes: one sharp modifier plus one unit word. The effect comes from confidence and brevity, not from stacked adjectives.",
    resultLabel: "Cool clan name ideas",
    mode: "clan",
    style: "cool",
    theme: "space",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "One modifier is enough. Two makes it sound like a subtitle.",
      "Unit words — legion, order, syndicate — instantly read as a team.",
      "Hard opening consonants make a stronger tag.",
      "Avoid trend words that will date the roster in a year.",
    ],
    useCases: ["Ranked teams", "Esports rosters", "Community guilds"],
    faqs: [
      {
        q: "What makes a clan name sound serious?",
        a: "A structural word like Order, Legion or Syndicate paired with a single strong modifier. That pattern reads as an organisation rather than a group of friends.",
      },
      {
        q: "Should the clan name relate to the game we play?",
        a: "Not necessarily. Game-neutral names let the clan move between titles without a rebrand, which matters more than thematic fit over time.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["clan-name-generator", "gaming-clan-name-generator", "fantasy-clan-name-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "funny-clan-name-generator",
    h1: "Funny Clan Name Generator",
    seoTitle: "Funny Clan Name Generator — Joke Clan & Squad Names",
    metaDescription:
      "Generate funny clan names for casual squads and friend teams. Silly, harmless clan name ideas ready to copy.",
    cluster: "clan",
    intro:
      "A funny clan name gets read out by the whole lobby, so the joke has to survive repetition. Mismatching a serious unit word with a ridiculous modifier is the most reliable formula.",
    resultLabel: "Funny clan name ideas",
    mode: "clan",
    style: "funny",
    theme: "food",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "Contrast is the joke: a silly word plus a formal unit word.",
      "Check the tag too — funny names often produce accidental initials.",
      "Keep it clean; most games will force a rename otherwise.",
      "If it makes the enemy team laugh, it works.",
    ],
    useCases: ["Casual squads", "Friend-group teams", "Party and custom lobbies"],
    faqs: [
      {
        q: "Will a funny clan name get us banned?",
        a: "Not if it stays clean. Report-worthy names are the ones using slurs or targeting people — silly words are fine everywhere.",
      },
      {
        q: "Can a funny clan still be competitive?",
        a: "Plenty are. A joke name and a serious roster is a well-worn combination, and it makes you memorable in the bracket.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["clan-name-generator", "funny-username-generator", "cool-clan-name-generator"],
    guides: ["nickname-ideas-by-personality"],
  },
  {
    slug: "gaming-clan-name-generator",
    h1: "Gaming Clan Name Generator",
    seoTitle: "Gaming Clan Name Generator — Names & Tags for Any Game",
    metaDescription:
      "Generate gaming clan names and tags that fit in-game character limits. Copy roster-ready clan name ideas instantly.",
    cluster: "clan",
    intro:
      "Games impose hard limits: a short tag, a capped name length and a restricted character set. This configuration stays inside the strictest common rules so a name you like here will usually be accepted in game.",
    resultLabel: "Gaming clan name ideas",
    mode: "clan",
    style: "gaming",
    theme: "fire",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "Confirm the tag limit in your game before falling in love with a name.",
      "Plain letters travel best — many games reject Unicode in clan tags.",
      "Keep the name under about 20 characters for roster displays.",
      "Register the matching Discord server name at the same time.",
    ],
    useCases: ["Shooters and battle royales", "MMO guilds", "Mobile game clans"],
    faqs: [
      {
        q: "How many characters can a clan tag be?",
        a: "Most games allow three or four; a few allow five. Generate the full name, then check the shortened tag fits your game's limit before you register.",
      },
      {
        q: "Can clan names use symbols?",
        a: "Some games allow a narrow Unicode range and reject everything else. Keep a plain-letter fallback ready in case the styled version is refused.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["clan-name-generator", "fortnite-clan-names", "cool-clan-name-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "fantasy-clan-name-generator",
    h1: "Fantasy Clan Name Generator",
    seoTitle: "Fantasy Clan Name Generator — Guild & House Names",
    metaDescription:
      "Generate fantasy clan, guild and house names for RPGs and MMOs. Copy-ready names with a mythic, old-world feel.",
    cluster: "clan",
    intro:
      "Fantasy guild names borrow the grammar of noble houses: an elemental or animal word attached to a structural noun like Order, Covenant or House. That pattern signals a world without needing invented spellings.",
    resultLabel: "Fantasy clan name ideas",
    mode: "clan",
    style: "fantasy",
    theme: "mythology",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "House / Order / Covenant instantly set a fantasy register.",
      "Skip apostrophes — they look the part but nobody can type them.",
      "Elemental and animal words carry the most weight.",
      "Match the tone to your server's roleplay level.",
    ],
    useCases: ["MMO guilds", "Tabletop parties", "Roleplay servers"],
    faqs: [
      {
        q: "What makes a name sound fantasy?",
        a: "Structure, mostly. 'Ashen Covenant' reads as fantasy because of the noun, not the adjective — swap in a modern unit word and the same modifier feels military.",
      },
      {
        q: "Should I use invented words?",
        a: "Sparingly. One invented word among real ones feels crafted; a name made entirely of invented syllables is hard to say and harder to remember.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["viking-clan-name-generator", "clan-name-generator", "cool-clan-name-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "viking-clan-name-generator",
    h1: "Viking Clan Name Generator",
    seoTitle: "Viking Clan Name Generator — Norse-Styled Clan Names",
    metaDescription:
      "Generate Viking-styled clan names with Norse-inspired words. Copy raider, shield and saga-flavoured clan name ideas.",
    cluster: "clan",
    intro:
      "Norse-flavoured names lean on weather, iron and seafaring vocabulary — the imagery of the sagas rather than literal Old Norse. Keeping the words in English makes them pronounceable while retaining the tone.",
    resultLabel: "Viking clan name ideas",
    mode: "clan",
    style: "dark",
    theme: "winter",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    customNouns: [
      "Longship", "Shieldwall", "Fjord", "Raven", "Runestone", "Bearclaw", "Stormhold", "Ironhelm",
      "Frostmark", "Sea-wolf", "Axehand", "Northgale", "Wyrd", "Hearthfire", "Skald", "Drakkar",
    ],
    tips: [
      "Weather and metal words carry the Norse feel best.",
      "Compound words (Ironhelm, Stormhold) match the saga naming style.",
      "Avoid deity names unless the whole roster is committed to the theme.",
      "Test the tag — compounds often shorten badly.",
    ],
    useCases: ["Survival and raiding games", "Historical MMO guilds", "Themed community servers"],
    faqs: [
      {
        q: "Are these real Old Norse names?",
        a: "No — they are English words chosen for a Norse-adjacent feel. That keeps every name readable and sayable for an international roster.",
      },
      {
        q: "What games suit a Viking clan name?",
        a: "Anything with raiding, survival or medieval combat. The style also works well for general communities that want a hardy, weathered identity.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["fantasy-clan-name-generator", "clan-name-generator", "japanese-clan-name-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "japanese-clan-name-generator",
    h1: "Japanese-Style Clan Name Generator",
    seoTitle: "Japanese Clan Name Generator — Samurai-Styled Clan Names",
    metaDescription:
      "Generate Japanese-styled clan names inspired by samurai, blossom and blade imagery. Copy-ready names and tags.",
    cluster: "clan",
    intro:
      "This configuration draws on imagery associated with samurai-era naming — blades, blossom, mountain and moon — rendered in readable English words. It is a stylistic homage, not a translation tool.",
    resultLabel: "Japanese-style clan name ideas",
    mode: "clan",
    style: "mysterious",
    theme: "night",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    customNouns: [
      "Blossom", "Katana", "Ronin", "Shrine", "Lantern", "Bamboo", "Tidewave", "Moonpath",
      "Ironfan", "Silkroad", "Crane", "Ashfall", "Snowpine", "Duskblade", "Koi", "Stonegarden",
    ],
    tips: [
      "Nature plus weapon is the classic pairing in this style.",
      "Use English words unless a member actually speaks Japanese — mistranslations are common.",
      "Restraint suits the theme; two words is plenty.",
      "Check the tag reads cleanly in Latin characters.",
    ],
    useCases: ["Samurai and ninja games", "Anime-themed communities", "Fighting-game teams"],
    faqs: [
      {
        q: "Are these actual Japanese words?",
        a: "No. They are English words chosen for imagery associated with the aesthetic, which avoids the mistranslations that plague machine-generated Japanese names.",
      },
      {
        q: "Can I write my clan name in Japanese characters?",
        a: "Many games reject non-Latin characters in clan tags. Keep a Latin version as the official name and use styled text only in display fields that allow it.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["fantasy-clan-name-generator", "clan-name-generator", "viking-clan-name-generator"],
    guides: ["unicode-fonts-explained"],
  },
  {
    slug: "3-letter-clan-names",
    h1: "3-Letter Clan Tag Generator",
    seoTitle: "3 Letter Clan Names — Short Clan Tag Generator",
    metaDescription:
      "Generate 3-letter clan tags that fit every game's tag limit. Punchy short clan names ready to copy.",
    cluster: "clan",
    intro:
      "Three characters is the tightest common tag limit, and the shortest tags are the most contested. This mode generates the tag directly rather than shortening a longer name, so nothing gets mangled.",
    resultLabel: "3-letter clan tags",
    mode: "tag",
    style: "cool",
    theme: "any",
    words: 1,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "Avoid tags that spell something unintended — read them twice.",
      "Hard consonants are easier to recognise in a killfeed.",
      "Have two or three backups; short tags are frequently taken.",
      "Pick the tag first, then build the full clan name around it.",
    ],
    useCases: ["Games with a strict 3-character tag limit", "Rebranding an existing roster", "Tournament sign-ups"],
    faqs: [
      {
        q: "Why do most games limit clan tags to three characters?",
        a: "The tag prefixes every member's name on scoreboards and killfeeds, so it has to stay narrow enough not to push the name off screen.",
      },
      {
        q: "Should the tag match the clan name?",
        a: "It helps, but it does not have to be the initials. Many teams pick a strong tag first and choose a full name that justifies it afterwards.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["clan-name-generator", "gaming-clan-name-generator", "cool-clan-name-generator"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "fortnite-clan-names",
    h1: "Fortnite Clan Name Generator",
    seoTitle: "Fortnite Clan Names — Team & Squad Name Generator",
    metaDescription:
      "Generate Fortnite clan and squad names with matching short tags. Copy-ready ideas for duos, trios and full teams.",
    cluster: "clan",
    intro:
      "Fortnite squads are small and named informally, so tags matter less than a name that fits in a Discord channel title and a tournament sign-up field. Punchy two-word names do best.",
    resultLabel: "Fortnite clan name ideas",
    mode: "clan",
    style: "edgy",
    theme: "space",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    tips: [
      "Keep it short enough for a tournament roster field.",
      "Duos and trios often prefer a name over a tag — pick what your group will actually use.",
      "Avoid referencing a single season or item; both get vaulted.",
      "Grab the matching Discord and social handles the same day.",
    ],
    useCases: ["Duos and trios", "Custom lobby teams", "Cash-cup rosters"],
    faqs: [
      {
        q: "Does Fortnite have official clan support?",
        a: "There is no built-in clan system with tags the way some shooters have, so most squads use a shared prefix in their display names or simply a team name on Discord.",
      },
      {
        q: "Can I put symbols in my Fortnite name?",
        a: "The display name accepts a limited character set and rejects much of Unicode. Test any styled version before relying on it for a tournament.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["gaming-clan-name-generator", "cod-clan-names", "free-fire-clan-names"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "cod-clan-names",
    h1: "COD Clan Name Generator",
    seoTitle: "COD Clan Names — Call of Duty Clan Tag Generator",
    metaDescription:
      "Generate Call of Duty clan names and 4-character clan tags. Military-flavoured, roster-ready ideas to copy.",
    cluster: "clan",
    intro:
      "Call of Duty shows a short clan tag beside your name in every lobby and killfeed, which makes the tag the real decision. Military and hardware vocabulary fits the setting without feeling forced.",
    resultLabel: "COD clan name ideas",
    mode: "clan",
    style: "gaming",
    theme: "technology",
    words: 2,
    length: "any",
    numbers: false,
    symbols: false,
    customNouns: [
      "Recon", "Warhead", "Blackout", "Overwatch", "Payload", "Breach", "Foxtrot", "Sabre",
      "Havoc", "Ricochet", "Bunker", "Ironsight", "Deadzone", "Nightwatch", "Salvo", "Warpath",
    ],
    tips: [
      "The tag appears everywhere — decide it before the full name.",
      "Four characters is the usual ceiling in recent titles.",
      "Military words fit the setting; avoid real unit designations.",
      "Plain letters only — stylised tags are commonly rejected.",
    ],
    useCases: ["Multiplayer lobbies", "Warzone squads", "Competitive ladders"],
    faqs: [
      {
        q: "How long can a Call of Duty clan tag be?",
        a: "Recent titles allow up to four characters. Generate the full name for identity, then confirm the shortened tag fits before you register it.",
      },
      {
        q: "Can clan tags be changed later?",
        a: "Yes, though every member has to update, and lobbies will associate you with the old tag for a while. Choose one you can keep.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["gaming-clan-name-generator", "fortnite-clan-names", "3-letter-clan-names"],
    guides: ["how-to-choose-a-username"],
  },
  {
    slug: "free-fire-clan-names",
    h1: "Free Fire Clan Name Generator",
    seoTitle: "Free Fire Clan Names — Guild Name & Tag Generator",
    metaDescription:
      "Generate Free Fire guild and clan names with stylish tags. Copy-ready ideas that fit Free Fire's name limits.",
    cluster: "clan",
    intro:
      "Free Fire guilds display a name and a short tag, and the community leans heavily on decorated text. Generate the plain name first — that is what has to be accepted — then style it if the field allows.",
    resultLabel: "Free Fire clan name ideas",
    mode: "clan",
    style: "edgy",
    theme: "fire",
    words: 2,
    length: "any",
    numbers: false,
    symbols: true,
    tips: [
      "Keep a plain-text version ready; styled characters are often rejected.",
      "Short names survive the guild list better than long ones.",
      "Symbols belong around the name, not inside it.",
      "Check the name renders on a phone screen, not just desktop.",
    ],
    useCases: ["Free Fire guilds", "Squad rosters", "Regional community teams"],
    faqs: [
      {
        q: "Can I use stylish fonts in a Free Fire guild name?",
        a: "Some Unicode ranges are accepted and others are rejected outright. Try the styled version, and keep a plain fallback so you are not stuck mid-rename.",
      },
      {
        q: "How do I make a guild name stand out?",
        a: "A distinctive word matters more than decoration. Once every guild in the list uses symbols, the symbols stop differentiating anything.",
      },
      AVAILABILITY_FAQ,
    ],
    related: ["gaming-clan-name-generator", "clan-name-generator", "fortnite-clan-names"],
    guides: ["unicode-fonts-explained"],
  },
];

export const GEN_PAGES = PAGES;
export const GEN_PAGE_MAP: Record<string, GenPage> = Object.fromEntries(
  PAGES.map((p) => [p.slug, p]),
);

export const CLUSTER_LABELS: Record<GenCluster, string> = {
  username: "Username generators",
  nickname: "Nickname generators",
  clan: "Clan name generators",
};

export function pagesInCluster(cluster: GenCluster) {
  return PAGES.filter((p) => p.cluster === cluster);
}

/**
 * Older /generator/<slug> URLs that now have a better flat home. The dynamic
 * generator route issues a permanent redirect so existing links keep their value.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "clan-name-generator": "/clan-name-generator",
};
