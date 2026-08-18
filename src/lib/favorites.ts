// Favourites + collections, stored in the visitor's browser.
//
// The static cPanel build has no server, so this layer is intentionally
// localStorage-only: no account required, nothing leaves the device.

export interface FavouriteItem {
  value: string;
  /** Where it came from, e.g. "gamertag-generator". */
  source: string;
  /** Collection name; "Saved" is the default bucket. */
  collection: string;
  at: number;
}

const KEY = "bnf.favourites.v1";
const EVENT = "bnf:favourites";

function read(): FavouriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is FavouriteItem =>
        !!i && typeof (i as FavouriteItem).value === "string",
    );
  } catch {
    return [];
  }
}

function write(items: FavouriteItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items.slice(0, 2000)));
  } catch {
    /* quota or private mode — favourites simply don't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function listFavourites(): FavouriteItem[] {
  return read().sort((a, b) => b.at - a.at);
}

export function isFavourite(value: string): boolean {
  return read().some((i) => i.value === value);
}

export function toggleFavourite(value: string, source: string, collection = "Saved"): boolean {
  const items = read();
  const existing = items.findIndex((i) => i.value === value);
  if (existing >= 0) {
    items.splice(existing, 1);
    write(items);
    return false;
  }
  items.push({ value, source, collection, at: Date.now() });
  write(items);
  return true;
}

export function removeFavourite(value: string) {
  write(read().filter((i) => i.value !== value));
}

export function moveToCollection(value: string, collection: string) {
  write(read().map((i) => (i.value === value ? { ...i, collection } : i)));
}

export function renameCollection(from: string, to: string) {
  write(read().map((i) => (i.collection === from ? { ...i, collection: to } : i)));
}

export function deleteCollection(name: string) {
  write(read().filter((i) => i.collection !== name));
}

export function collections(): string[] {
  const set = new Set(read().map((i) => i.collection));
  set.add("Saved");
  return [...set].sort();
}

export function clearFavourites() {
  write([]);
}

/** Subscribe to favourite changes (same tab and other tabs). */
export function onFavouritesChange(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener(EVENT, fn);
    window.removeEventListener("storage", fn);
  };
}
