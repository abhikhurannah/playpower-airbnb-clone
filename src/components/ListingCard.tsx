import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { formatPrice, type Listing } from "@/data/listings";
import { cn } from "@/lib/utils";

type Props = {
  listing: Listing;
  saved: boolean;
  onToggleSave: (id: string) => void;
};

export function ListingCard({ listing, saved, onToggleSave }: Props) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl">
        <Link to="/rooms/$id" params={{ id: listing.id }}>
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            width={1200}
            height={912}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => onToggleSave(listing.id)}
          className="absolute right-3 top-3 rounded-full p-1.5 transition-transform active:scale-90"
        >
          <Heart
            className={cn(
              "h-6 w-6 drop-shadow-sm transition-colors",
              saved ? "fill-primary text-primary" : "fill-foreground/40 text-card",
            )}
          />
        </button>
      </div>
      <Link to="/rooms/$id" params={{ id: listing.id }} className="mt-3 block">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold leading-tight">
            {listing.location}, {listing.country}
          </p>
          <span className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-foreground" />
            {listing.rating}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{listing.distance}</p>
        <p className="text-sm text-muted-foreground">{listing.dates}</p>
        <p className="mt-1 text-sm">
          <span className="font-semibold">{formatPrice(listing.price, listing.currency)}</span>{" "}
          night
        </p>
      </Link>
    </div>
  );
}
