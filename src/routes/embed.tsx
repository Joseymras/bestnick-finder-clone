import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Layout";
import { JsonLd } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { buildHead, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/content";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/embed")({
  head: () =>
    buildHead({
      path: "/embed",
      title: "Free Nickname Generator Widget for Your Website — BestNickFinder",
      description:
        "Embed a free nickname generator widget on your blog or site in one line of HTML. No account, no API key, works everywhere — light and dark themes included.",
      socialTitle: "Free Nickname Generator Widget (Embeddable)",
      socialDescription:
        "Copy one line of HTML and put a working nickname generator on your blog. Free forever.",
      type: "article",
    }),
  component: EmbedPage,
});

const FAQS = [
  {
    q: "Is the nickname generator widget really free?",
    a: "Yes. The widget is free for any legitimate website, personal or commercial. There is no API key, no sign-up and no usage limit. The only requirement is that you keep the small 'Powered by BestNickFinder' credit link visible.",
  },
  {
    q: "Will the widget slow down my page?",
    a: "No. The iframe loads lazily, weighs only a few kilobytes of HTML and runs entirely in the visitor's browser, so it never blocks your own content from rendering.",
  },
  {
    q: "Can I change the colours or size?",
    a: "Yes. Add ?theme=dark for the dark version, change count to control how many nicknames appear, and set mode=fancy to turn the widget into a stylish font generator instead.",
  },
  {
    q: "Do you collect data from my visitors?",
    a: "The widget stores nothing about your visitors. Names are generated locally in the browser and we only count anonymous generate and copy events so we know which embeds are used.",
  },
  {
    q: "Can I use it on Blogger, WordPress or Wix?",
    a: "Yes. Paste the snippet into any HTML or custom-code block. On WordPress use a Custom HTML block, on Blogger switch the post editor to HTML view, and on Wix use the Embed HTML element.",
  },
];

const SNIPPETS = [
  {
    id: "basic",
    label: "Standard (light)",
    code: `<iframe src="${SITE.url}/widget?ref=yoursite.com" title="Free Nickname Generator by BestNickFinder" width="100%" height="520" loading="lazy" style="border:0;max-width:480px" ></iframe>`,
  },
  {
    id: "dark",
    label: "Dark theme",
    code: `<iframe src="${SITE.url}/widget?theme=dark&count=10&ref=yoursite.com" title="Free Nickname Generator by BestNickFinder" width="100%" height="600" loading="lazy" style="border:0;max-width:480px" ></iframe>`,
  },
  {
    id: "fancy",
    label: "Fancy font mode",
    code: `<iframe src="${SITE.url}/widget?mode=fancy&count=12&ref=yoursite.com" title="Free Fancy Text Generator by BestNickFinder" width="100%" height="640" loading="lazy" style="border:0;max-width:480px" ></iframe>`,
  },
  {
    id: "autoresize",
    label: "Auto-resizing",
    code: `<iframe id="bnf-widget" src="${SITE.url}/widget?ref=yoursite.com" title="Free Nickname Generator by BestNickFinder" width="100%" height="520" loading="lazy" style="border:0;max-width:480px"></iframe>
<script>
window.addEventListener("message", function (e) {
  if (e.data && e.data.type === "bnf-widget-height") {
    var f = document.getElementById("bnf-widget");
    if (f) f.style.height = e.data.height + "px";
  }
});
</script>`,
  },
];

function EmbedPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1600);
      track("copy", "embed-page", { snippet: id });
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(FAQS),
            breadcrumbJsonLd([{ name: "Embed widget", path: "/embed" }]),
            {
              "@type": "SoftwareApplication",
              name: "BestNickFinder Nickname Generator Widget",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any (web browser)",
              url: `${SITE.url}/embed`,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Embed widget" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        Free nickname generator widget for your website
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Give your readers a working nickname generator without writing a line of JavaScript. Copy the
        snippet below, paste it into any post or page, and the widget renders instantly — light or
        dark, nickname or fancy-font mode. It is free for every legitimate site, forever, and the
        only thing we ask in return is that the small credit link stays visible.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">Live preview</h2>
        <div className="surface-card overflow-hidden p-2">
          <iframe
            src="/widget?ref=bestnickfinder.online"
            title="Free Nickname Generator widget preview"
            loading="lazy"
            className="h-[540px] w-full max-w-[480px] border-0"
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-2xl font-bold">Copy your embed code</h2>
        <div className="space-y-4">
          {SNIPPETS.map((s) => (
            <div key={s.id} className="surface-card p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">{s.label}</h3>
                <button
                  type="button"
                  onClick={() => copy(s.id, s.code)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {copied === s.id ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy code
                    </>
                  )}
                </button>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-lg bg-ink p-3 text-[11px] leading-relaxed text-ink-foreground">
                <code>{s.code}</code>
              </pre>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Replace <code>ref=yoursite.com</code> with your own domain — it only helps us see which
          embeds are popular, and it never identifies your visitors.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-2xl font-bold">Options you can set</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="py-2 pr-4">Parameter</th>
                <th className="py-2 pr-4">Values</th>
                <th className="py-2">What it does</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {[
                ["theme", "light (default), dark", "Matches the widget to your site background."],
                ["mode", "nickname (default), fancy", "Random nickname ideas, or stylish Unicode fonts of the typed name."],
                ["count", "3 – 20 (default 8)", "How many results appear per generate."],
                ["flavor", "gamer, aesthetic, fantasy, dark, cute, funny, clan, anime, short", "Locks the widget to one nickname style."],
                ["ref", "your domain", "Anonymous label so you and we can see which site the usage came from."],
              ].map(([p, v, d]) => (
                <tr key={p} className="border-t border-border">
                  <td className="py-2 pr-4 font-mono text-xs">{p}</td>
                  <td className="py-2 pr-4 text-muted-foreground">{v}</td>
                  <td className="py-2 text-muted-foreground">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Why bloggers add a nickname widget
        </h2>
        <p>
          Naming posts — “best gamer names”, “aesthetic Instagram usernames”, “clan name ideas” —
          attract readers who arrive with one job to do: find a name they like. A static list makes
          them leave for a generator. An embedded generator keeps them on your page, which lifts dwell
          time, scroll depth and the odds they read the rest of your article or click an affiliate
          link.
        </p>
        <p>
          The widget is deliberately small: one iframe, no tracking pixels, no cookies, no layout
          shift. It works on mobile, respects the visitor's system font rendering, and degrades to a
          plain link if a browser blocks iframes.
        </p>
        <h2 className="font-display text-2xl font-bold text-foreground">Usage terms in plain words</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Free for personal, business and monetised sites.</li>
          <li>Keep the “Powered by BestNickFinder” link visible and crawlable.</li>
          <li>Do not wrap the widget in your own branding or claim it as your tool.</li>
          <li>Do not use it on sites with adult, hateful or illegal content.</li>
          <li>We may update the widget's styling and word pools over time — your embed updates automatically.</li>
        </ul>
      </section>

      <FaqSection faqs={FAQS} />

      <div className="mt-10 surface-card p-5">
        <h2 className="font-display text-xl font-bold">Prefer the full tools?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The site versions add exports, symbols, voting and dozens of styles.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {[
            { to: "/nickname-generator", label: "Nickname generator" },
            { to: "/fancy-text-generator", label: "Fancy text generator" },
            { to: "/username-generator", label: "Username generator" },
            { to: "/symbols", label: "Symbols & emojis" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
