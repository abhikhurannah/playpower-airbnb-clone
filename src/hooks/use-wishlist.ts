import { useCallback, useEffect, useState } from "react";

const KEY = "airbnb-clone-wishlist";

export function useWishlist() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed))
          setSaved(parsed.filter((id): id is string => typeof id === "string"));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { saved, toggle };
}
