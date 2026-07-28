import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { NameGenerator } from "@/components/site/NameGenerator";
import { JsonLd, Prose, RelatedLinks } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { SITE } from "@/lib/content";

const FAQS = [
  {
    q: "How do I get a good nickname?",
    a: "Start from the impression you want to give rather than a word you like. Pick the vibe, generate twenty candidates, say each one out loud and keep the three that survive. Sleep on it before you commit.",
  },
  {
    q: "Can I generate a nickname starting with specific letters?",
    a: "Yes. Enter the letters in the First letters field and every result will begin with them — useful if you want your nickname to match your real initials.",
  },
  {
    q: "Are these nicknames unique?",
    a: "They are assembled at random from large word pools, so most combinations are uncommon, but no generator can guarantee uniqueness. Add a personal touch — your initials, a meaningful number — to make it yours.",
  },
  {
    q: "What is the difference between a nickname and a username?",
    a: "A nickname is a display name; it can contain spaces, symbols and styled characters. A username is a unique identifier used to log in or link to your profile, and is usually restricted to plain letters, numbers and one or two separators.",
  },
  {
    q: "Can I use a generated nickname for my business?",
    a: "Yes, generated names are unowned. Run a trademark and domain check before you build anything commercial on one.",
  },
];

const SECTIONS = [
  {
    h2: "The five nickname vibes",
    body: [
      "Each preset draws from a different word pool, because a name that works in a competitive shooter reads badly on a professional profile.",
    ],
    list: [
      "Gamer — adjective plus noun, hard consonants, optional numeric suffix",
      "Aesthetic — soft lowercase words joined by a period or underscore",
      "Fantasy — invented syllables built for RPG and D&D characters",
      "Professional — clean lowercase, name plus discipline",
      "Surprise me — mixes all four pools for maximum variety",
    ],
  },
  {
    h2: "How to make a generated name your own",
    body: [
      "The strongest handles combine something random with something personal. Take a generated base you like, then thread your own initials, birth year or a meaningful number through it. The result stays memorable but becomes recognisably yours.",
      "Another approach: generate twenty names, pick your two favourite halves from different results, and combine them. The mixer tool on this site does this automatically if you feed it two words.",
    ],
  },
  {
    h2: "Testing a nickname before you commit",
    body: [
      "Read it aloud to a friend and ask them to spell it back. If they cannot, it will cost you every time someone tries to find you. Then check it as a handle on the platforms you use, because a display name and a matching handle is worth far more than a clever name alone.",
    ],
  },
  {
    h2: "Nicknames that age badly",
    body: [
      "Avoid the current year, the game you play right now, a fandom you might leave, and deliberate misspellings. Every one of these locks your identity to a moment that will pass, and renaming later costs you all the recognition you built.",
    ],
  },
];

export const Route = createFileRoute("/nickname-generator")({
  head: () => ({
    meta: [
      { title: "Nickname Generator — Random Cool Nickname Ideas | BestNickFinder" },
      {
        name: "description",
        content:
          "Free random nickname generator with gamer, aesthetic, fantasy and professional presets. Lock your first letters and roll unlimited nickname ideas.",
      },
      { property: "og:title", content: "Nickname Generator — Random Cool Nickname Ideas" },
      {
        property: "og:description",
        content: "Roll unlimited nickname ideas by vibe. Free, instant, copy-ready.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/nickname-generator` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: "Nickname Generator" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Nickname Generator</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Roll unlimited nickname ideas across five distinct vibes. Lock the first letters if you want
        the name to match your initials, then tap any result to copy it.
      </p>

      <div className="mt-8">
        <NameGenerator count={18} />
      </div>

      <AdSlot slot="1111111111" />

      <div className="mt-8">
        <Prose sections={SECTIONS} />
      </div>

      <FaqSection faqs={FAQS} />
      <RelatedLinks slugs={["gamertag-generator", "cute-nicknames", "fantasy-name-generator"]} />
    </div>
  );
}
