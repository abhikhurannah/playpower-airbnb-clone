import { useState } from "react";
import {
  Bath,
  Car,
  ChevronRight,
  Cctv,
  Check,
  Home,
  KeyRound,
  Minus,
  Monitor,
  PawPrint,
  Plus,
  ShieldCheck,
  Snowflake,
  Star,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { amenityGroups, assignmentPhotos, reviews } from "@/data/property";
import { toast } from "sonner";

export function PropertyHighlights() {
  return (
    <div className="space-y-6 border-y border-border py-8">
      {[
        [
          Waves,
          "Outdoor entertainment",
          "The pool and alfresco dining are great for summer trips.",
        ],
        [Snowflake, "Designed for staying cool", "Beat the heat with the A/C and ceiling fan."],
        [KeyRound, "Self check-in", "You can check in with the building staff."],
      ].map(([Icon, label, description]) => {
        const Symbol = Icon as typeof Waves;
        return (
          <div className="flex gap-5" key={String(label)}>
            <Symbol className="mt-0.5 h-6 w-6 shrink-0" />
            <div>
              <p className="font-medium">{String(label)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{String(description)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export function SleepingSpaces({ onOpenPhotos }: { onOpenPhotos: (opener: HTMLElement) => void }) {
  return (
    <section className="detail-section">
      <h2>Where you'll sleep</h2>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { name: "Bedroom", detail: "1 double bed", photo: assignmentPhotos[12] },
          { name: "Living room", detail: "1 sofa", photo: assignmentPhotos[0] },
        ].map((room) => (
          <button
            className="text-left"
            key={room.name}
            onClick={(e) => onOpenPhotos(e.currentTarget)}
          >
            <img
              className="mb-3 aspect-[1.5] w-full rounded-xl object-cover"
              src={room.photo?.src}
              alt={room.name}
              loading="lazy"
            />
            <p className="font-medium">{room.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{room.detail}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
const amenityIcons = [
  Utensils,
  Wifi,
  Monitor,
  Car,
  Waves,
  Bath,
  PawPrint,
  Cctv,
  ShieldCheck,
  ShieldCheck,
];
export function Amenities({ amenities, full = false }: { amenities: string[]; full?: boolean }) {
  return (
    <section className="detail-section" id="amenities">
      <h2>What this place offers</h2>
      <ul className="my-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {amenities.map((item, i) => {
          const Icon = amenityIcons[i] ?? Check;
          return (
            <li className="flex items-center gap-4" key={item}>
              <Icon className="h-6 w-6 shrink-0" strokeWidth={1.5} />
              <span
                className={
                  item.includes("not reported") ? "text-muted-foreground line-through" : ""
                }
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
      {full && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-12 border-foreground px-6 text-base">
              Show all 50 amenities
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-[780px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">What this place offers</DialogTitle>
              <DialogDescription>Included facilities and available services.</DialogDescription>
            </DialogHeader>
            {Object.entries(amenityGroups).map(([group, items]) => (
              <section key={group}>
                <h3 className="mb-2 mt-6 text-lg font-semibold">{group}</h3>
                {items.map((item) => (
                  <div key={item} className="flex items-center gap-5 border-b border-border py-5">
                    <Check className="h-5 w-5 shrink-0" />
                    <span className={item.includes("alarm") ? "line-through" : ""}>{item}</span>
                  </div>
                ))}
              </section>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
function Review({ review }: { review: (typeof reviews)[number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article>
      <div className="flex items-center gap-3">
        {review.image ? (
          <img
            className="h-11 w-11 rounded-full object-cover"
            src={`/assets/images/avatars/${review.image}`}
            alt=""
          />
        ) : (
          <span className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-background">
            {review.name[0]}
          </span>
        )}
        <div>
          <p className="font-medium">{review.name}</p>
          <p className="text-sm text-muted-foreground">{review.tenure}</p>
        </div>
      </div>
      <p className="mb-2 mt-4 flex items-center gap-2 text-sm">
        <span aria-label="5 stars" className="text-xs tracking-wide">
          ★★★★★
        </span>{" "}
        · <span className="font-medium">{review.date}</span>
      </p>
      <p className={expanded ? "leading-6" : "line-clamp-3 leading-6"}>{review.text}</p>
      {review.text.length > 160 && (
        <button className="mt-2 font-medium underline" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </article>
  );
}
export function PropertyReviews() {
  return (
    <section className="detail-section !py-12" id="reviews">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <img
            className="h-24 w-14 object-contain"
            src="/assets/images/ui/laurel-left.png"
            alt=""
          />
          <span className="text-[88px] font-medium leading-none tracking-tight">4.95</span>
          <img
            className="h-24 w-14 object-contain"
            src="/assets/images/ui/laurel-right.png"
            alt=""
          />
        </div>
        <h2 className="mt-3">Guest favourite</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
      </div>
      <div className="my-10 grid grid-cols-3 gap-5 border-b border-border pb-6 md:grid-cols-6">
        {[
          ["Cleanliness", "5.0"],
          ["Accuracy", "5.0"],
          ["Check-in", "5.0"],
          ["Communication", "5.0"],
          ["Location", "4.8"],
          ["Value", "4.8"],
        ].map(([label, rating]) => (
          <div key={label} className="border-r border-border pr-4">
            <p className="text-sm font-medium">{label}</p>
            <p className="mt-1 text-xl font-medium">{rating}</p>
            <Star className="mt-5 h-6 w-6" />
          </div>
        ))}
      </div>
      <div className="grid gap-x-20 gap-y-10 md:grid-cols-2">
        {reviews.map((review) => (
          <Review key={review.name} review={review} />
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-8 h-12 border-foreground px-6 text-base">
            Show all 19 reviews
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>4.95 · 19 reviews</DialogTitle>
            <DialogDescription>Guest feedback shown on this listing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-8 py-4">
            {reviews.map((review) => (
              <Review key={review.name} review={review} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
export function PropertyLocation() {
  const [zoom, setZoom] = useState(1);
  return (
    <section className="detail-section !py-12" id="location">
      <h2>Where you’ll be</h2>
      <p className="my-5">Candolim, Goa, India</p>
      <div className="location-map" aria-label="Approximate location in Candolim">
        <div className="location-map-surface" style={{ transform: `scale(${zoom})` }} />
        <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foreground text-white shadow-lg">
          <Home size={34} />
        </div>
        <div className="absolute right-3 top-3 grid gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Zoom in"
            disabled={zoom >= 2}
            onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
          >
            <Plus />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Zoom out"
            disabled={zoom <= 1}
            onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
          >
            <Minus />
          </Button>
        </div>
      </div>
      <p className="mt-4 text-sm">Exact location will be provided after booking.</p>
      <h3 className="mt-8 text-lg font-medium">Neighbourhood highlights</h3>
      <p className="mt-3">
        Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to
        beaches, cafés, and popular attractions.
      </p>
    </section>
  );
}
export function PropertyHost() {
  return (
    <section className="detail-section !py-12">
      <h2>Meet your host</h2>
      <div className="mt-6 grid gap-12 md:grid-cols-[380px_1fr]">
        <div className="flex items-center justify-between gap-6 rounded-3xl border border-border p-8 shadow-lg">
          <div className="text-center">
            <img
              className="mx-auto mb-3 h-24 w-24 rounded-full"
              src="/assets/images/avatars/host.jpeg"
              alt="Mirashya Homes"
            />
            <h3 className="text-2xl font-medium">Mirashya Homes</h3>
            <p className="text-sm">Host</p>
          </div>
          <div>
            {[
              ["1,463", "Reviews"],
              ["4.68★", "Rating"],
              ["2", "Years hosting"],
            ].map(([number, label]) => (
              <div className="border-b border-border py-3 last:border-0" key={label}>
                <strong className="block text-xl">{number}</strong>
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">Host details</h3>
          <p className="my-4 leading-7">
            Response rate: 100%
            <br />
            Responds within an hour
          </p>
          <Button
            className="h-12 bg-foreground px-6 text-background hover:bg-foreground/90"
            onClick={() =>
              toast("Message host", {
                description: "Host messaging is available after signing in to the booking service.",
              })
            }
          >
            Message host
          </Button>
          <p className="mt-6 flex gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <ShieldCheck className="h-6 w-6 shrink-0" />
            To help protect your payment, always use Airbnb to send money and communicate with
            hosts.
          </p>
        </div>
      </div>
    </section>
  );
}
export function PropertyRules() {
  return (
    <section className="detail-section !py-12">
      <h2>Things to know</h2>
      <div className="mt-6 grid gap-10 md:grid-cols-3">
        {[
          [
            "Cancellation policy",
            "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
            "Review this host’s full policy for details.",
          ],
          ["House rules", "Check-in after 2:00 pm", "Checkout before 11:00 am", "3 guests maximum"],
          [
            "Safety & property",
            "Carbon monoxide alarm not reported",
            "Smoke alarm not reported",
            "Exterior security cameras on property",
          ],
        ].map(([heading, ...lines]) => (
          <div key={heading}>
            <h3 className="font-medium">{heading}</h3>
            {lines.map((line) => (
              <p className="mt-3" key={line}>
                {line}
              </p>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <button className="mt-5 flex items-center gap-1 font-medium underline">
                  Learn more <ChevronRight size={16} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{heading}</DialogTitle>
                  <DialogDescription>Information for your stay.</DialogDescription>
                </DialogHeader>
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </section>
  );
}
