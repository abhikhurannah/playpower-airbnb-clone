import { Link } from "@tanstack/react-router";
import { Search, Globe, Menu, UserCircle2 } from "lucide-react";

import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  query?: string;
  onQueryChange?: (v: string) => void;
};

export function SiteHeader({ query, onQueryChange }: Props) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-primary">
          <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden="true">
            <path d="M16 1c2.5 0 4.3 1.4 5.7 4.2l6.1 12.6c1.1 2.3 1.4 3.6 1.4 5 0 4.1-2.9 6.9-6.7 6.9-2.6 0-4.9-1.4-6.5-3.6-1.6 2.2-3.9 3.6-6.5 3.6C5.7 29.7 2.8 26.9 2.8 22.8c0-1.4.3-2.7 1.4-5l6.1-12.6C11.7 2.4 13.5 1 16 1zm0 2.6c-1.4 0-2.4.9-3.4 2.9L6.5 19.1c-.9 1.9-1.1 2.8-1.1 3.7 0 2.7 1.8 4.3 4.1 4.3 1.9 0 3.7-1.2 5-3.2-2-2.7-3.3-5.2-3.3-7.2 0-2.7 1.9-4.6 4.8-4.6s4.8 1.9 4.8 4.6c0 2-1.3 4.5-3.3 7.2 1.3 2 3.1 3.2 5 3.2 2.3 0 4.1-1.6 4.1-4.3 0-.9-.2-1.8-1.1-3.7L19.4 6.5c-1-2-2-2.9-3.4-2.9zm0 11.1c-1.5 0-2.4.9-2.4 2.3 0 1.3.9 3.2 2.4 5.4 1.5-2.2 2.4-4.1 2.4-5.4 0-1.4-.9-2.3-2.4-2.3z" />
          </svg>
          <span className="hidden text-xl font-bold tracking-tight sm:block">airbnb</span>
        </Link>

        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-card py-2 pl-5 pr-2 shadow-sm transition-shadow hover:shadow-md">
          <input
            value={query ?? ""}
            onChange={(e) => onQueryChange?.(e.target.value)}
            placeholder={onQueryChange ? "Search destinations" : "Search all stays"}
            aria-label="Search destinations"
            onFocus={() => {
              if (!onQueryChange) void navigate({ to: "/" });
            }}
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
          />
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Search className="h-4 w-4" />
          </span>
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <button
            onClick={() =>
              toast("Hosting information", {
                description: "Contact the booking provider to list your property.",
              })
            }
            className="rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
          >
            Become a host
          </button>
          <button
            className="rounded-full p-3 transition-colors hover:bg-muted"
            aria-label="Language"
            onClick={() => toast("English · Prices shown in each listing’s currency")}
          >
            <Globe className="h-4 w-4" />
          </button>
          <button
            aria-label="Main navigation menu"
            onClick={() =>
              toast("Explore stays", {
                action: {
                  label: "All stays",
                  onClick: () => {
                    void navigate({ to: "/" });
                  },
                },
              })
            }
            className="flex items-center gap-2 rounded-full border border-border py-1.5 pl-3 pr-1.5 transition-shadow hover:shadow-md"
          >
            <Menu className="h-4 w-4" />
            <UserCircle2 className="h-7 w-7 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
