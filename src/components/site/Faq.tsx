export function FaqSection({
  faqs,
  title = "Frequently asked questions",
}: {
  faqs: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
        {faqs.map((f) => (
          <details key={f.q} className="group p-4 open:bg-muted/40">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">
              <span className="flex items-start justify-between gap-4">
                {f.q}
                <span className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
