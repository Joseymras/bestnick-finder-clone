import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isFavourite, onFavouritesChange, toggleFavourite } from "@/lib/favorites";
import { track } from "@/lib/analytics";

/** Heart toggle that saves a name to the visitor's browser-side favourites. */
export function FavouriteButton({
  value,
  source,
  className = "",
}: {
  value: string;
  source: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(isFavourite(value));
    sync();
    return onFavouritesChange(sync);
  }, [value]);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${value} from favourites` : `Save ${value} to favourites`}
      onClick={() => {
        const next = toggleFavourite(value, source);
        setOn(next);
        if (next) track("favorite", source, { value_length: value.length });
      }}
      className={`shrink-0 rounded-md p-1.5 transition-colors ${
        on ? "text-primary" : "text-muted-foreground hover:text-primary"
      } ${className}`}
    >
      <Heart className={`h-4 w-4 ${on ? "fill-current" : ""}`} />
    </button>
  );
}
