import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SITE, TOOLS, NICHES } from "@/lib/content";

const FOOTER_LEGAL = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
  { to: "/disclaimer", label: "Disclaimer" },
  { to: "/cookie-policy", label: "Cookie Policy" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
            N
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Best<span className="text-primary">Nick</span>Finder
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 text-sm md:flex">
          {TOOLS.slice(0, 5).map((t) => (
            <Link
              key={t.slug}
              to={t.slug}
              className="rounded-md px-3 py-1.5 text-ink-muted transition-colors hover:bg-white/10 hover:text-ink-foreground"
            >
              {t.short}
            </Link>
          ))}
          <Link
            to="/ideas"
            className="rounded-md px-3 py-1.5 text-ink-muted transition-colors hover:bg-white/10 hover:text-ink-foreground"
          >
            Name ideas
          </Link>
          <Link
            to="/tools"
            className="rounded-md bg-primary px-3 py-1.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            All tools
          </Link>
        </nav>

        <Link
          to="/tools"
          className="ml-auto rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground md:hidden"
        >
          Tools
        </Link>
      </div>
      <div className="border-t border-white/10 bg-ink/60">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-2 text-xs text-ink-muted">
          {NICHES.slice(0, 9).map((n) => (
            <Link
              key={n.slug}
              to="/generator/$slug"
              params={{ slug: n.slug }}
              className="whitespace-nowrap transition-colors hover:text-ink-foreground"
            >
              {n.h1.replace(" Generator", "")}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-lg font-bold">
            Best<span className="text-primary">Nick</span>Finder
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Free nickname, username and stylish text tools. Everything runs in your browser — no
            account, no limits, nothing stored.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Tools</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {TOOLS.map((t) => (
              <li key={t.slug}>
                <Link to={t.slug} className="transition-colors hover:text-ink-foreground">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Popular generators</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {NICHES.slice(0, 8).map((n) => (
              <li key={n.slug}>
                <Link
                  to="/generator/$slug"
                  params={{ slug: n.slug }}
                  className="transition-colors hover:text-ink-foreground"
                >
                  {n.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide">Site</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <Link to="/guides" className="transition-colors hover:text-ink-foreground">
                Guides
              </Link>
            </li>
            {FOOTER_LEGAL.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-ink-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-ink-muted">
          © {new Date().getFullYear()} {SITE.domain}. Generated names are provided as-is for personal
          and commercial use. Game and platform names are trademarks of their respective owners and
          this site is not affiliated with any of them.
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
        </li>
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {i.to ? (
              <Link to={i.to} className="hover:text-primary">
                {i.label}
              </Link>
            ) : (
              <span className="text-foreground">{i.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
