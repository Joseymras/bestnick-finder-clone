import { useEffect, useRef } from "react";
import { SITE } from "@/lib/content";

/**
 * AdSense placement slot. Replace SITE.adsenseClient and the slot IDs with your
 * real values, then the units render automatically on every page that uses them.
 */
export function AdSlot({
  slot,
  format = "auto",
  label = "Advertisement",
  className = "",
}: {
  slot: string;
  format?: string;
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      // @ts-expect-error injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not loaded in preview */
    }
  }, []);

  const configured = !SITE.adsenseClient.endsWith("0000000000000000");

  return (
    <aside className={`my-8 ${className}`} aria-label={label}>
      <div className="mb-1 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {configured ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={SITE.adsenseClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="grid min-h-[90px] place-items-center rounded-lg border border-dashed border-border bg-muted/40 text-xs text-muted-foreground">
          Ad slot {slot} — add your AdSense publisher ID in src/lib/content.ts
        </div>
      )}
    </aside>
  );
}
