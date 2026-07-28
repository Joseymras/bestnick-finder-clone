import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { Prose, ToolGrid } from "@/components/site/Blocks";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BestNickFinder — Free Naming Tools" },
      {
        name: "description",
        content:
          "BestNickFinder builds fast, private, browser-based naming tools: nickname generators, Unicode fancy text, username finders and symbol libraries.",
      },
      { property: "og:title", content: "About BestNickFinder — Free Naming Tools" },
      { property: "og:description", content: "Who we are and how the tools work." },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/about` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "About" }]} />
      <h1 className="font-display text-3xl font-extrabold">About BestNickFinder</h1>
      <Prose
        sections={[
          {
            h2: "What we build",
            body: [
              `${SITE.name} is a free set of naming tools: a random nickname generator, a Unicode fancy text converter, a username variation builder, a name mixer, a symbol library and a password generator. Every one of them runs entirely inside your browser.`,
              "We started the site because existing generators were slow, buried under interstitials, and produced names nobody would actually use. Our goal is the opposite: instant results, readable output, and pages that load in under a second on mobile data.",
            ],
          },
          {
            h2: "How the tools work",
            body: [
              "The name generators draw from curated adjective, noun and syllable pools tuned by vibe, then filter results for length and pronounceability. The text tools map ordinary letters onto alternative Unicode blocks defined in the Unicode standard — mathematical alphanumerics, phonetic extensions, enclosed alphanumerics and halfwidth/fullwidth forms.",
              "Because none of this requires a server, nothing you type is transmitted or stored. That is a privacy feature and a speed feature at the same time.",
            ],
          },
          {
            h2: "How we fund the site",
            body: [
              "The tools are free and always will be. The site is supported by display advertising, which is why you will see clearly labelled ad slots on most pages. We do not sell data, and we do not gate any feature behind a payment.",
            ],
          },
          {
            h2: "Editorial approach",
            body: [
              "Our guides are written from direct testing of the platforms we cover. Character limits, rename costs and rendering behaviour are checked against the live apps and revised when they change. If you find something out of date, tell us.",
            ],
          },
        ]}
      />
      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl font-bold">Our tools</h2>
        <ToolGrid />
      </section>
    </div>
  );
}
