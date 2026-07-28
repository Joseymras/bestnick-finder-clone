import { createFileRoute, Link } from "@tanstack/react-router";
import { FancyTextTool } from "@/components/site/FancyTextTool";
import { NameGenerator } from "@/components/site/NameGenerator";
import { ToolGrid, JsonLd } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { CopyChip } from "@/components/site/CopyCard";
import { SYMBOL_GROUPS } from "@/lib/fancy";
import { NICHES, GUIDES, SITE } from "@/lib/content";

const FAQS = [
  {
    q: "What is a nickname generator?",
    a: "A nickname generator builds name ideas for you from word pools and text-styling rules. BestNickFinder combines a random nickname engine with a Unicode fancy-text converter, so you can generate an idea and immediately style it for your game or social profile.",
  },
  {
    q: "Is BestNickFinder free to use?",
    a: "Yes. Every generator, symbol set and guide on this site is completely free, with no account, no download and no usage limit.",
  },
  {
    q: "Do you store the names I generate?",
    a: "No. All generation and styling runs locally in your browser. Nothing you type is sent to a server or saved.",
  },
  {
    q: "Where can I use these stylish names?",
    a: "Anywhere that accepts Unicode text: Free Fire, PUBG and BGMI, Discord display names, Instagram and TikTok bios, WhatsApp, Telegram, Roblox display names, Steam and more. Fields limited to plain ASCII — such as Instagram @handles — will reject styled characters.",
  },
  {
    q: "Why do some styles show as empty boxes?",
    a: "A box means your device has no glyph for that character. The text is still correct and will copy fine; choose a more widely supported style such as bold, small caps or fullwidth if you need it to render everywhere.",
  },
  {
    q: "Can I use generated names commercially?",
    a: "Yes. Generated names are not owned by anyone, so you can use them for channels, brands and products. Always run a trademark check before building a business on one.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nickname Generator & Stylish Name Maker — BestNickFinder",
      },
      {
        name: "description",
        content:
          "Free nickname generator, fancy text maker and username finder. Create stylish names with symbols for Free Fire, PUBG, Discord, Instagram and TikTok.",
      },
      { property: "og:title", content: "Nickname Generator & Stylish Name Maker — BestNickFinder" },
      {
        property: "og:description",
        content:
          "Generate stylish nicknames, fancy fonts and available usernames in seconds. 100% free, no sign-up.",
      },
      { property: "og:url", content: SITE.url },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: SITE.name,
              url: SITE.url,
              description: SITE.description,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE.url}/fancy-text-generator?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "WebApplication",
              name: "BestNickFinder Nickname Generator",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              url: SITE.url,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            faqJsonLd(FAQS),
          ],
        }}
      />

      <section className="border-b border-border bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-highlight" /> 60+ fonts · 500+ symbols ·
                20+ generators
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Nickname &amp; Username Generator{" "}
                <span className="text-primary">that people actually copy</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
                Turn any word into stylish Unicode fonts, decorated gamer tags and available social
                handles. Everything runs instantly in your browser — free, no sign-up, nothing stored.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/fancy-text-generator"
                  className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Style my name
                </Link>
                <Link
                  to="/tools"
                  className="rounded-lg border border-white/20 px-5 py-3 font-semibold transition-colors hover:bg-white/10"
                >
                  Browse all tools
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Random nicknames
              </h2>
              <div className="mt-3 grid gap-2 text-lg">
                {["꧁ＮＩＮＪＡ꧂", "𝓪𝓮𝓼𝓽𝓱𝓮𝓽𝓲𝓬", "ꜱɪʟᴇɴᴛᴏᴛᴛᴇʀ", "☠ＴＩＴＡＮ☠"].map((n) => (
                  <div
                    key={n}
                    className="rounded-lg border border-white/10 bg-ink/60 px-4 py-2.5 text-center"
                  >
                    {n}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-ink-muted">
                Live examples — generate your own below
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <section id="generator">
              <h2 className="font-display text-2xl font-bold">Fancy text generator</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Type a name and get every stylish variation at once — bold, script, small caps,
                bubble, wings and more.
              </p>
              <div className="mt-5">
                <FancyTextTool />
              </div>
            </section>

            <AdSlot slot="1111111111" />

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold">Random nickname generator</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a vibe, optionally lock the first letters, and roll unlimited fresh ideas.
              </p>
              <div className="mt-5">
                <NameGenerator />
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold">Text symbols to copy</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap any symbol to copy it, then paste it around your name.
              </p>
              <div className="mt-5 space-y-5">
                {SYMBOL_GROUPS.slice(0, 6).map((g) => (
                  <div key={g.slug}>
                    <h3 className="mb-2 text-sm font-semibold">{g.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {g.symbols.map((s) => (
                        <CopyChip key={s} value={s} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/symbols"
                className="mt-5 inline-block text-sm font-semibold text-primary hover:underline"
              >
                See all 500+ symbols →
              </Link>
            </section>

            <AdSlot slot="2222222222" />

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold">All tools</h2>
              <div className="mt-4">
                <ToolGrid />
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold">Generators by platform &amp; game</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Each page is tuned to the character limits and naming rules of that platform.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {NICHES.map((n) => (
                  <Link
                    key={n.slug}
                    to="/generator/$slug"
                    params={{ slug: n.slug }}
                    className="surface-card hover-lift px-4 py-3 text-sm font-medium"
                  >
                    {n.h1}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-12 prose-content">
              <h2>Everything you need to name yourself online</h2>
              <p>
                A nickname is the first thing anyone learns about you online. It appears in the kill
                feed, on the leaderboard, above every comment and in every shout-out. BestNickFinder
                exists to make that decision fast: generate ideas, style them, check that they fit
                the platform, and copy them in one tap.
              </p>
              <p>
                The site is built around two engines. The first is a name generator that combines
                curated adjective, noun and syllable pools into thousands of readable, pronounceable
                combinations, filtered by vibe. The second is a Unicode converter that maps ordinary
                letters onto the mathematical, small-caps, fullwidth, circled and script blocks
                defined in the Unicode standard — the same characters that make{" "}
                <span className="whitespace-nowrap">𝓯𝓪𝓷𝓬𝔂 𝓽𝓮𝔁𝓽</span> possible in a profile that
                officially supports no formatting at all.
              </p>
              <h2>Built for speed</h2>
              <p>
                Every generator runs client-side. There is no request to a server when you type,
                which means results appear as fast as you can press a key, the tools work on a slow
                connection, and nothing you enter ever leaves your device. Pages are static and
                lightweight so they load in well under a second on mobile data.
              </p>
              <h2>Which tool should you use?</h2>
              <ul>
                <li>
                  <strong>Have a name already?</strong> Use the{" "}
                  <Link to="/fancy-text-generator">fancy text generator</Link> to style it.
                </li>
                <li>
                  <strong>Need an idea?</strong> Roll the{" "}
                  <Link to="/nickname-generator">nickname generator</Link> by vibe.
                </li>
                <li>
                  <strong>Claiming a handle?</strong> The{" "}
                  <Link to="/username-generator">username generator</Link> builds available
                  variations.
                </li>
                <li>
                  <strong>Naming a duo or couple?</strong> Blend two names in the{" "}
                  <Link to="/name-mixer">name mixer</Link>.
                </li>
                <li>
                  <strong>Just want decoration?</strong> Grab characters from the{" "}
                  <Link to="/symbols">symbol library</Link>.
                </li>
              </ul>
            </section>

            <FaqSection faqs={FAQS} />

            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold">Naming guides</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {GUIDES.map((g) => (
                  <Link
                    key={g.slug}
                    to="/guides/$slug"
                    params={{ slug: g.slug }}
                    className="surface-card hover-lift block p-4"
                  >
                    <span className="block font-semibold">{g.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{g.description}</span>
                    <span className="mt-2 block text-xs text-muted-foreground">{g.readTime}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <AdSlot slot="3333333333" label="Sponsored" className="my-0" />
            <div className="surface-card p-5">
              <h2 className="font-display font-bold">Trending styles</h2>
              <div className="mt-3 grid gap-2 text-sm">
                {[
                  "꧁༒ＫＩＮＧ༒꧂",
                  "ᴀʟᴏɴᴇ ʙᴏʏ",
                  "𝔡𝔞𝔯𝔨𝔪𝔬𝔡𝔢",
                  "『ＳＮＩＰＥＲ』",
                  "☬ＮＯＶＡ☬",
                  "𝕭𝖑𝖆𝖟𝖊",
                ].map((s) => (
                  <div key={s} className="rounded-md bg-muted px-3 py-2 text-center">
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-card p-5">
              <h2 className="font-display font-bold">Quick links</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {NICHES.slice(0, 10).map((n) => (
                  <li key={n.slug}>
                    <Link
                      to="/generator/$slug"
                      params={{ slug: n.slug }}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {n.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <AdSlot slot="4444444444" label="Sponsored" className="my-0" />
          </aside>
        </div>
      </div>
    </>
  );
}
