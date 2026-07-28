import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { Prose } from "@/components/site/Blocks";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BestNickFinder" },
      {
        name: "description",
        content:
          "Get in touch with the BestNickFinder team about feedback, corrections, partnership enquiries or privacy requests.",
      },
      { property: "og:title", content: "Contact BestNickFinder" },
      { property: "og:description", content: "Feedback, corrections and partnership enquiries." },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/contact` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <h1 className="font-display text-3xl font-extrabold">Contact Us</h1>
      <div className="surface-card mt-6 p-5">
        <p className="text-sm text-muted-foreground">Email us directly:</p>
        <a
          href={`mailto:hello@${SITE.domain}`}
          className="mt-1 block font-display text-xl font-bold text-primary hover:underline"
        >
          hello@{SITE.domain}
        </a>
        <p className="mt-3 text-sm text-muted-foreground">
          We read everything and usually reply within two business days.
        </p>
      </div>
      <Prose
        sections={[
          {
            h2: "What to write about",
            body: ["Messages we especially welcome:"],
            list: [
              "A character limit or platform rule that has changed",
              "A style that renders incorrectly on your device",
              "A generator or symbol set you would like us to add",
              "Advertising and partnership enquiries",
              "Privacy requests relating to our privacy policy",
            ],
          },
          {
            h2: "Reporting a problem",
            body: [
              "If a tool is misbehaving, include your device, browser and the exact text you entered. That is almost always enough for us to reproduce and fix the issue quickly.",
            ],
          },
        ]}
      />
    </div>
  );
}
