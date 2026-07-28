import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { GUIDES, SITE } from "@/lib/content";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Naming Guides — Usernames, Nicknames & Unicode | BestNickFinder" },
      {
        name: "description",
        content:
          "In-depth guides on choosing usernames, understanding Unicode fancy fonts, nickname psychology and checking handle availability across platforms.",
      },
      { property: "og:title", content: "Naming Guides — Usernames, Nicknames & Unicode" },
      {
        property: "og:description",
        content: "Practical, in-depth guides to naming yourself online.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/guides` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Naming Guides</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Longer reads on picking a name you will not regret, how Unicode styling actually works, and
        how to lock down your handle everywhere at once.
      </p>
      <div className="mt-8 grid gap-3">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            to="/guides/$slug"
            params={{ slug: g.slug }}
            className="surface-card hover-lift block p-5"
          >
            <span className="block font-display text-lg font-bold">{g.title}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{g.description}</span>
            <span className="mt-2 block text-xs text-muted-foreground">{g.readTime}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
