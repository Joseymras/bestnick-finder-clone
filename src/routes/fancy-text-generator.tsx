import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { FancyTextTool } from "@/components/site/FancyTextTool";
import { JsonLd, RelatedLinks } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { Prose } from "@/components/site/Blocks";
import { SITE } from "@/lib/content";

const FAQS = [
  {
    q: "How does a fancy text generator work?",
    a: "It swaps each letter you type for a lookalike character from another Unicode block — mathematical bold, script, fraktur, small caps and so on. The output is plain text, not a font, which is why it survives copy and paste into apps that support no formatting.",
  },
  {
    q: "Can I use fancy text on Instagram and TikTok?",
    a: "Yes, in your display name, bio and captions. The @username field on both platforms is limited to plain letters, numbers, periods and underscores, so styled characters are rejected there.",
  },
  {
    q: "Why do some characters look like squares?",
    a: "Your device lacks a glyph for that code point. The character is intact and will show correctly elsewhere — pick bold, small caps or fullwidth if you need maximum compatibility.",
  },
  {
    q: "Is there a limit on how much text I can convert?",
    a: "No. Conversion happens in your browser, so there is no quota, no account and no rate limit.",
  },
  {
    q: "Does fancy text work in Word or Google Docs?",
    a: "Yes — it pastes as regular characters. Note that spell-check will not recognise the words and search inside the document will not match them against normal spelling.",
  },
];

const SECTIONS = [
  {
    h2: "What you can do with fancy text",
    body: [
      "Styled Unicode text is the only way to add visual personality to fields that offer no formatting controls. That covers almost every social bio, most game nicknames, chat display names and comment sections.",
    ],
    list: [
      "Instagram and TikTok display names and bios",
      "Discord display names, server nicknames and About Me",
      "Free Fire, PUBG, BGMI and CoD Mobile nicknames",
      "WhatsApp and Telegram profile names and status",
      "YouTube channel descriptions and comments",
      "Steam profile names and Twitch panel headings",
    ],
  },
  {
    h2: "The style families explained",
    body: [
      "Serif bold and italic come from the Mathematical Alphanumeric Symbols block and have the widest device support of anything here. Script and fraktur come from the same block but look far more decorative, at the cost of legibility at small sizes.",
      "Small caps borrow from the phonetic extensions block, which is why they read cleanly almost everywhere. Fullwidth forms come from the CJK compatibility range and produce the wide, spaced look popular in gaming names.",
      "Strikethrough, underline and wavy styles work differently again: they append an invisible combining mark after each letter rather than replacing it, so the underlying word stays searchable.",
    ],
  },
  {
    h2: "Choosing a style that renders everywhere",
    body: [
      "If your name has to display correctly on every device your audience might use, stay in the safe tier. Bold, italic, small caps and fullwidth cover almost all devices in circulation. Circled and squared letters are close behind. Rare script variants and newer emoji sequences are the most likely to break.",
      "Test before you commit: paste your styled name into a message and view it on a second device, ideally an older Android phone, before you spend a rename card on it.",
    ],
  },
  {
    h2: "Fancy text and accessibility",
    body: [
      "Screen readers read the underlying code point, not the visual shape. A name written entirely in mathematical bold may be spelled out character by character or skipped. Keep essential information in plain text and use styling as decoration only.",
    ],
  },
];

export const Route = createFileRoute("/fancy-text-generator")({
  head: () => ({
    meta: [
      { title: "Fancy Text Generator — 60+ Copy & Paste Fonts | BestNickFinder" },
      {
        name: "description",
        content:
          "Free fancy text generator with 60+ Unicode fonts. Convert any name into bold, script, small caps, bubble and wing styles you can copy and paste anywhere.",
      },
      { property: "og:title", content: "Fancy Text Generator — 60+ Copy & Paste Fonts" },
      {
        property: "og:description",
        content: "Turn any word into stylish Unicode fonts. Instant, free, copy-ready.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/fancy-text-generator` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: "Fancy Text Generator" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Fancy Text Generator</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Type any word and get more than sixty stylish Unicode variations — bold, italic, script,
        fraktur, small caps, bubble, squared, fullwidth, strikethrough and decorated frames. Tap a
        result to copy it, then paste it into any app that accepts Unicode.
      </p>

      <div className="mt-8">
        <FancyTextTool limit={64} />
      </div>

      <AdSlot slot="1111111111" />

      <div className="mt-8">
        <Prose sections={SECTIONS} />
      </div>

      <FaqSection faqs={FAQS} />
      <RelatedLinks slugs={["discord-name-fonts", "small-text-generator", "free-fire-name-style"]} />
    </div>
  );
}
