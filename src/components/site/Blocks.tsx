import { NICHE_MAP, TOOLS, type Niche } from "@/lib/content";
import { Link } from "@tanstack/react-router";

export function RelatedLinks({ slugs, title = "Related generators" }: { slugs: string[]; title?: string }) {
  const items = slugs.map((s) => NICHE_MAP[s]).filter(Boolean) as Niche[];
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map((n) => (
          <Link
            key={n.slug}
            to="/generator/$slug"
            params={{ slug: n.slug }}
            className="surface-card hover-lift block p-4"
          >
            <span className="block font-semibold">{n.h1}</span>
            <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">
              {n.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ToolGrid({ exclude }: { exclude?: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {TOOLS.filter((t) => t.slug !== exclude).map((t) => (
        <Link key={t.slug} to={t.slug} className="surface-card hover-lift block p-5">
          <span className="text-2xl" aria-hidden>
            {t.icon}
          </span>
          <span className="mt-2 block font-display font-bold">{t.title}</span>
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{t.blurb}</span>
        </Link>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Prose({ sections }: { sections: { h2: string; body: string[]; list?: string[] }[] }) {
  return (
    <div className="prose-content">
      {sections.map((s) => (
        <section key={s.h2}>
          <h2>{s.h2}</h2>
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {s.list && (
            <ul>
              {s.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
