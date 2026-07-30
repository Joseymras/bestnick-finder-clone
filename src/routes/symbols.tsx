import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { SymbolPalette } from "@/components/site/SymbolPalette";
import { JsonLd, Prose, RelatedLinks } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { ExploreMore } from "@/components/site/LinkHub";
import { SITE } from "@/lib/content";

const FAQS = [
  {
    q: "How do I copy a symbol?",
    a: "Tap or click any symbol on this page and it is copied to your clipboard immediately. Paste it wherever you need it.",
  },
  {
    q: "Do these symbols work in game names?",
    a: "Most do. Free Fire, PUBG and CoD Mobile accept common symbol blocks such as hearts, stars and bracket frames. Newer emoji are the least reliable.",
  },
  {
    q: "Why does a symbol show as a box?",
    a: "The device has no glyph for it. The character is still correct — pick an older, more widely supported symbol instead.",
  },
  {
    q: "Are text symbols the same as emoji?",
    a: "No. Emoji are colour pictographs; text symbols are monochrome characters that inherit the surrounding text colour and size, which is why they blend into names much better.",
  },
];

const SECTIONS = [
  {
    h2: "How to use symbols in a name",
    body: [
      "The reliable pattern is a matched pair either side of your name — one opening symbol, one closing symbol, same family. That reads as deliberate design rather than clutter.",
      "Two decorations is the practical maximum. Beyond that the name becomes hard to read at the small sizes used in kill feeds and member lists, and some platforms strip the extras entirely.",
    ],
  },
  {
    h2: "Symbols that survive character limits",
    body: [
      "Every symbol counts against your name length, and some count as two. If your platform gives you twelve characters, budget four for decoration and eight for the actual name.",
    ],
  },
];

export const Route = createFileRoute("/symbols")({
  head: () => ({
    meta: [
      { title: "Text Symbols to Copy & Paste — Hearts, Stars, Crowns | BestNickFinder" },
      {
        name: "description",
        content:
          "Copy and paste text symbols: hearts, stars, crowns, arrows, brackets, kaomoji and more. Tap any symbol to copy it instantly — free, no sign-up.",
      },
      { property: "og:title", content: "Text Symbols to Copy & Paste" },
      {
        property: "og:description",
        content: "Hundreds of copy-ready text symbols for names, bios and gamer tags.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/symbols` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: "Symbols" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        Text Symbols to Copy &amp; Paste
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Hundreds of monochrome text symbols organised by theme. Tap any symbol to copy it, then
        paste it around your nickname, bio or clan tag.
      </p>

      <div className="mt-8">
        <SymbolPalette tool="symbols" />
      </div>

      <AdSlot slot="1111111111" />

      <div className="mt-8">
        <Prose sections={SECTIONS} />
      </div>

      <FaqSection faqs={FAQS} />
      <RelatedLinks slugs={["free-fire-name-style", "pubg-name-style", "discord-name-fonts"]} />
      <ExploreMore />
    </div>
  );
}
