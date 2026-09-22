import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Star, Share, Heart, Award, MapPin, Grid3X3, Flag } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { getListing, formatPrice, listings } from "@/data/listings";
import { assignmentId, assignmentPhotos } from "@/data/property";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";
import { calculateStay } from "@/lib/booking";
import { PhotoTour } from "@/components/PhotoTour";
import {
  Amenities,
  PropertyHighlights,
  PropertyHost,
  PropertyLocation,
  PropertyReviews,
  PropertyRules,
  SleepingSpaces,
} from "@/components/PropertyDetails";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ListingCard } from "@/components/ListingCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/rooms/$id")({
  loader: ({ params }) => {
    const listing = getListing(params.id);
    if (!listing) throw notFound();
    return listing;
  },
  head: ({ loaderData: listing }) => ({
    meta: [
      { title: listing ? `${listing.title} · Stayhub` : "Stay · Stayhub" },
      {
        name: "description",
        content: listing
          ? `${listing.title} in ${listing.location}, ${listing.country}. ${formatPrice(listing.price, listing.currency)} per night.`
          : "Find your next stay.",
      },
      { property: "og:title", content: listing?.title ?? "Stay · Stayhub" },
      {
        property: "og:description",
        content: listing
          ? `Explore ${listing.title} in ${listing.location}.`
          : "Find your next stay.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RoomPage,
});
function todayPlus(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function RoomPage() {
  const listing = Route.useLoaderData();
  return <RoomDetail key={listing.id} listing={listing} />;
}
function RoomDetail({ listing }: { listing: NonNullable<ReturnType<typeof getListing>> }) {
  const featured = listing.id === assignmentId;
  const { saved, toggle } = useWishlist();
  const [checkIn, setCheckIn] = useState(featured ? "2026-10-18" : todayPlus(7));
  const [checkOut, setCheckOut] = useState(featured ? "2026-10-23" : todayPlus(12));
  const [guests, setGuests] = useState(2);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const photos = useMemo(
    () => (featured ? assignmentPhotos : [{ src: listing.image, room: listing.title }]),
    [featured, listing.image, listing.title],
  );
  const heroPhotos = featured ? [6, 3, 4, 12, 28].map((index) => assignmentPhotos[index]!) : photos;
  const stay = calculateStay({
    checkIn,
    checkOut,
    guests,
    maxGuests: listing.guests,
    nightlyPrice: listing.price,
    includeFees: !featured,
  });
  const isSaved = saved.includes(listing.id);
  const money = (amount: number) => formatPrice(amount, listing.currency);
  function openPhotos(element: HTMLElement) {
    opener.current = element;
    setGalleryOpen(true);
  }
  function share() {
    if (!navigator.clipboard) {
      toast("Share this stay", { description: window.location.href });
      return;
    }
    void navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Link copied"))
      .catch(() => toast("Share this stay", { description: window.location.href }));
  }
  function reserve() {
    if (!stay.valid) {
      toast.error(stay.error);
      return;
    }
    toast("Your stay selection is ready", {
      description: `${stay.nights} nights in ${listing.location} · ${money(stay.total)}. No booking or payment has been made.`,
    });
  }
  return (
    <div className={cn("min-h-screen bg-background", featured && "assignment-detail")}>
      <SiteHeader />
      <main className="mx-auto max-w-[1168px] px-6 py-6" id="main-content">
        <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          ← All stays
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-[26px] font-medium leading-tight">{listing.title}</h1>
          <div className="flex items-center gap-3 text-sm font-medium">
            <button
              onClick={share}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 underline underline-offset-4"
            >
              <Share className="h-4 w-4" /> Share
            </button>
            <button
              onClick={() => toggle(listing.id)}
              aria-pressed={isSaved}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 underline underline-offset-4"
            >
              <Heart className={cn("h-4 w-4", isSaved && "fill-primary text-primary")} />
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
        {!featured && (
          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
            <span className="font-medium text-foreground">{listing.rating}</span>
            <span>· {listing.reviews} reviews ·</span>
            <MapPin className="h-3.5 w-3.5" />
            {listing.location}, {listing.country}
          </p>
        )}
        <section
          id="photos"
          className={cn("listing-hero mt-5", !featured && "single-photo")}
          aria-label="Property photographs"
        >
          {heroPhotos.map((photo, index) => (
            <button
              key={photo.src}
              aria-label={`Open property photo ${index + 1}`}
              onClick={(event) => openPhotos(event.currentTarget)}
            >
              <img
                src={photo.src}
                alt={`${listing.title} — ${photo.room}`}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </button>
          ))}
          <button className="all-photos" onClick={(event) => openPhotos(event.currentTarget)}>
            <Grid3X3 size={15} /> Show all photos
          </button>
        </section>
        {featured && (
          <nav
            aria-label="Listing sections"
            className="flex gap-7 border-b border-border py-5 text-sm font-medium"
          >
            {["Photos", "Amenities", "Reviews", "Location"].map((section) => (
              <a
                key={section}
                className="underline-offset-8 hover:underline"
                href={`#${section.toLowerCase()}`}
              >
                {section}
              </a>
            ))}
          </nav>
        )}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_372px] lg:gap-24">
          <div>
            <h2 className="text-[22px] font-medium leading-7">
              {featured
                ? "Entire serviced apartment in Candolim, India"
                : `Entire home hosted by ${listing.host}`}
            </h2>
            <p className="mt-1 text-base">
              {listing.guests} guests · {listing.bedrooms}{" "}
              {listing.bedrooms === 1 ? "bedroom" : "bedrooms"} · {listing.beds}{" "}
              {listing.beds === 1 ? "bed" : "beds"} · {listing.baths}{" "}
              {listing.baths === 1 ? "bathroom" : "bathrooms"}
            </p>
            {featured ? (
              <>
                <a
                  href="#reviews"
                  className="my-7 flex items-center justify-between gap-4 rounded-2xl border border-border p-5"
                >
                  <div className="flex items-center gap-2">
                    <Award className="h-9 w-9" />
                    <span className="font-medium leading-5">
                      Guest
                      <br />
                      favourite
                    </span>
                  </div>
                  <p className="hidden max-w-[240px] text-sm xl:block">
                    One of the most loved homes on Airbnb, according to guests
                  </p>
                  <div className="text-center">
                    <strong className="text-xl">4.95</strong>
                    <div className="text-[10px] tracking-wide">★★★★★</div>
                  </div>
                  <div className="border-l border-border pl-5 text-center">
                    <strong className="block text-xl">19</strong>
                    <span className="text-xs underline">Reviews</span>
                  </div>
                </a>
                <div className="mb-6 flex items-center gap-4">
                  <img
                    className="h-11 w-11 rounded-full object-cover"
                    src="/assets/images/avatars/host.jpeg"
                    alt=""
                  />
                  <div>
                    <p className="font-medium">Hosted by {listing.host}</p>
                    <p className="text-sm text-muted-foreground">
                      {listing.hostYears} years hosting
                    </p>
                  </div>
                </div>
                <PropertyHighlights />
              </>
            ) : (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border p-4">
                <Award className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{listing.host} is a Superhost</p>
                  <p className="text-sm text-muted-foreground">
                    {listing.hostYears} years of hosting · 100% response rate
                  </p>
                </div>
              </div>
            )}
            <section className="detail-section">
              {featured && (
                <p className="mb-5 rounded-lg bg-muted p-4 text-sm">
                  Some info has been automatically translated.{" "}
                  <button
                    className="font-medium underline"
                    onClick={() => toast("Showing original")}
                  >
                    Show original
                  </button>
                </p>
              )}
              <p className={cn("leading-relaxed", !expanded && "line-clamp-5")}>
                {listing.description}
              </p>
              {listing.description.length > 300 && (
                <button
                  className="mt-4 font-medium underline"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
            </section>
            {featured && <SleepingSpaces onOpenPhotos={openPhotos} />}
            <Amenities amenities={listing.amenities} full={featured} />
            {featured && (
              <section className="detail-section" id="dates">
                <h2>{stay.valid ? `${stay.nights} nights in Candolim` : "Select your dates"}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {checkIn && checkOut
                    ? `${checkIn} – ${checkOut}`
                    : "Choose a check-in and checkout date"}
                </p>
                <Calendar
                  className="mt-5 w-full !p-0 [--cell-size:2.35rem]"
                  mode="range"
                  min={1}
                  numberOfMonths={2}
                  showOutsideDays={false}
                  defaultMonth={new Date(2026, 9, 1)}
                  selected={{
                    from: checkIn ? new Date(`${checkIn}T12:00:00`) : undefined,
                    to: checkOut ? new Date(`${checkOut}T12:00:00`) : undefined,
                  }}
                  onSelect={(range) => {
                    setCheckIn(range?.from ? format(range.from, "yyyy-MM-dd") : "");
                    setCheckOut(range?.to ? format(range.to, "yyyy-MM-dd") : "");
                  }}
                />
                <button
                  className="mt-5 text-sm font-medium underline"
                  onClick={() => {
                    setCheckIn("");
                    setCheckOut("");
                  }}
                >
                  Clear dates
                </button>
              </section>
            )}
          </div>
          <aside className="h-fit lg:sticky lg:top-28">
            {featured && (
              <div className="mb-6 flex items-center gap-4 rounded-xl border border-border p-4 text-sm">
                <img src="/assets/images/ui/discount.svg" alt="" className="h-6 w-6" />
                <span className="flex-1">
                  Get 10% off your next stay.
                  <br />
                  <Dialog>
                    <DialogTrigger className="underline">Terms apply</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Offer details</DialogTitle>
                        <DialogDescription>
                          Discounts depend on eligibility and are confirmed by the booking provider
                          at checkout.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </span>
                <button
                  className="rounded-lg bg-muted px-3 py-2 font-medium"
                  onClick={() => toast("Offer selected")}
                >
                  Claim
                </button>
              </div>
            )}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
              <p className="text-xl">
                <span className="font-semibold">
                  {money(featured && stay.valid ? stay.total : listing.price)}
                </span>{" "}
                <span className="text-base text-muted-foreground">
                  {featured && stay.valid ? `for ${stay.nights} nights` : "night"}
                </span>
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-border">
                <div className="grid grid-cols-2">
                  <label className="border-r border-border p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wide">
                      Check-in
                    </span>
                    <input
                      type="date"
                      value={checkIn}
                      aria-label="Check-in date"
                      onChange={(event) => setCheckIn(event.target.value)}
                      onInput={(event) => setCheckIn(event.currentTarget.value)}
                      className="w-full min-w-0 bg-transparent text-sm"
                    />
                  </label>
                  <label className="p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wide">
                      Checkout
                    </span>
                    <input
                      type="date"
                      value={checkOut}
                      aria-label="Checkout date"
                      onChange={(event) => setCheckOut(event.target.value)}
                      onInput={(event) => setCheckOut(event.currentTarget.value)}
                      className="w-full min-w-0 bg-transparent text-sm"
                    />
                  </label>
                </div>
                <label className="block border-t border-border p-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wide">
                    Guests
                  </span>
                  <select
                    value={guests}
                    aria-label="Guests"
                    onChange={(event) => setGuests(Number(event.target.value))}
                    className="w-full bg-transparent text-sm"
                  >
                    {Array.from({ length: listing.guests }, (_, index) => index + 1).map(
                      (number) => (
                        <option key={number} value={number}>
                          {number} guest{number > 1 ? "s" : ""}
                        </option>
                      ),
                    )}
                  </select>
                </label>
              </div>
              {!stay.valid && (
                <p className="mt-3 text-sm text-destructive" role="alert">
                  {stay.error}
                </p>
              )}
              {featured && checkIn === "2026-10-18" && (
                <p className="mt-4 rounded-lg bg-muted p-2 text-center text-xs">
                  Free cancellation before <strong>17 October</strong>
                </p>
              )}
              <button
                onClick={reserve}
                className="mt-4 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Reserve
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                You won't be charged yet
              </p>
              {stay.valid && !featured && (
                <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="underline">
                      {money(listing.price)} × {stay.nights} nights
                    </span>
                    <span>{money(stay.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>{money(stay.cleaning)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>{money(stay.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 font-semibold">
                    <span>Total</span>
                    <span>{money(stay.total)}</span>
                  </div>
                </div>
              )}
            </div>
            <button
              className="mx-auto mt-6 flex items-center gap-2 text-sm text-muted-foreground underline"
              onClick={() => toast("Report this listing")}
            >
              <Flag size={16} />
              Report this listing
            </button>
          </aside>
        </div>
        {featured && (
          <>
            <PropertyReviews />
            <PropertyLocation />
            <PropertyHost />
            <PropertyRules />
          </>
        )}
        <section className="py-10">
          <h2 className="mb-6 text-2xl font-medium">More places to stay</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {listings
              .filter((item) => item.id !== listing.id)
              .slice(0, 4)
              .map((item) => (
                <ListingCard
                  key={item.id}
                  listing={item}
                  saved={saved.includes(item.id)}
                  onToggleSave={toggle}
                />
              ))}
          </div>
        </section>
      </main>
      {galleryOpen && (
        <PhotoTour
          photos={photos}
          title={listing.title}
          saved={isSaved}
          onSave={() => toggle(listing.id)}
          onShare={share}
          onClose={() => setGalleryOpen(false)}
          returnFocus={opener.current}
        />
      )}
    </div>
  );
}
