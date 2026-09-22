import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ListingCard } from "@/components/ListingCard";
import { CATEGORIES, listings } from "@/data/listings";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Stayhub — Book unique homes and stays" },
      {
        name: "description",
        content:
          "Browse cabins, beachfront villas and design lofts around the world, and book your next stay in seconds.",
      },
      { property: "og:title", content: "Stayhub — Book unique homes and stays" },
      {
        property: "og:description",
        content:
          "Cabins, villas and city lofts around the world. Find a place and book it instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { saved, toggle } = useWishlist();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      const matchesQuery =
        !q ||
        l.location.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q);
      const matchesCategory = category === "All" || l.categories.includes(category);
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader query={query} onQueryChange={setQuery} />

      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] gap-8 overflow-x-auto px-6 py-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 border-b-2 pb-2 text-sm font-medium transition-colors",
                category === c
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <p className="mb-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "stay" : "stays"}
          {category !== "All" ? ` in ${category}` : ""}
          {query ? ` matching “${query}”` : ""}
        </p>

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="text-xl font-semibold">No stays found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different destination or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                saved={saved.includes(l.id)}
                onToggleSave={toggle}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-border py-10">
        <div className="mx-auto max-w-[1400px] px-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Stayhub · Anywhere · Any week · Add guests
        </div>
      </footer>
    </div>
  );
}
