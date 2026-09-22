import { useEffect, useMemo, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpFromLine, ChevronLeft, ChevronRight, Grid3X3, Heart, X } from "lucide-react";
import { Dialog, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { roomDescriptions, type PropertyPhoto } from "@/data/property";

type Props = {
  photos: PropertyPhoto[];
  title: string;
  saved: boolean;
  onSave: () => void;
  onShare: () => void;
  onClose: () => void;
  returnFocus: HTMLElement | null;
};

export function PhotoTour({ photos, title, saved, onSave, onShare, onClose, returnFocus }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const roomRefs = useRef<Record<string, HTMLElement | null>>({});
  const photoOpener = useRef<HTMLElement | null>(null);
  const rooms = useMemo(
    () =>
      [...new Set(photos.map((photo) => photo.room))].map((name) => ({
        name,
        description: roomDescriptions[name],
        photos: photos
          .map((photo, index) => ({ ...photo, index }))
          .filter((photo) => photo.room === name),
      })),
    [photos],
  );
  const current = selected === null ? undefined : photos[selected];
  useEffect(() => {
    if (selected === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setSelected((index) =>
          Math.max(
            0,
            Math.min(photos.length - 1, (index ?? 0) + (event.key === "ArrowRight" ? 1 : -1)),
          ),
        );
      }
    };
    document.addEventListener("keydown", handleKey);
    for (const index of [selected - 1, selected + 1]) {
      const photo = photos[index];
      if (photo) new Image().src = photo.src;
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [selected, photos]);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-white" />
        <DialogPrimitive.Content
          className="photo-tour"
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus?.focus({ preventScroll: true });
          }}
          onEscapeKeyDown={(event) => {
            if (selected !== null) event.preventDefault();
          }}
        >
          <header className="photo-tour-header">
            <button className="photo-icon" aria-label="Back to listing" onClick={onClose}>
              <ChevronLeft size={20} />
            </button>
            <DialogTitle className="photo-tour-title">Photo tour</DialogTitle>
            <div className="flex gap-1">
              <button className="photo-icon" aria-label="Share" onClick={onShare}>
                <ArrowUpFromLine size={19} />
              </button>
              <button
                className="photo-icon"
                aria-label={saved ? "Unsave" : "Save"}
                aria-pressed={saved}
                onClick={onSave}
              >
                <Heart size={20} className={saved ? "fill-primary text-primary" : ""} />
              </button>
            </div>
          </header>
          <div className="photo-tour-body">
            <nav className="photo-categories" aria-label="Photo categories">
              {rooms.map((room) => (
                <button
                  key={room.name}
                  onClick={() =>
                    roomRefs.current[room.name]?.scrollIntoView({
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "instant"
                        : "smooth",
                    })
                  }
                >
                  <img src={room.photos[0]?.src} alt="" />
                  <span>{room.name}</span>
                </button>
              ))}
            </nav>
            {rooms.map((room) => (
              <section
                key={room.name}
                className="photo-room"
                ref={(el) => {
                  roomRefs.current[room.name] = el;
                }}
              >
                <div className="photo-room-copy">
                  <h2>{room.name}</h2>
                  {room.description && <p>{room.description}</p>}
                </div>
                <div className="photo-room-grid">
                  {room.photos.map((photo, index) => (
                    <button
                      key={photo.src}
                      className={index % 3 === 0 ? "photo-wide" : ""}
                      aria-label={`Open ${room.name} photo ${photo.index + 1}`}
                      onClick={(event) => {
                        photoOpener.current = event.currentTarget;
                        setSelected(photo.index);
                      }}
                    >
                      <img src={photo.src} alt={room.name} loading="lazy" />
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <Dialog
            open={current !== undefined}
            onOpenChange={(open) => {
              if (!open) setSelected(null);
            }}
          >
            <DialogPortal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-white" />
              <DialogPrimitive.Content
                className="photo-lightbox"
                aria-describedby={undefined}
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                  photoOpener.current?.focus({ preventScroll: true });
                }}
              >
                <header className="photo-lightbox-header">
                  <button
                    className="photo-icon"
                    aria-label="Return to photo tour"
                    onClick={() => setSelected(null)}
                  >
                    <Grid3X3 size={19} />
                  </button>
                  <DialogTitle className="photo-tour-title">{current?.room}</DialogTitle>
                  <div className="flex items-center gap-3">
                    <span aria-live="polite" aria-atomic="true">
                      {(selected ?? 0) + 1} of {photos.length}
                    </span>
                    <button
                      className="photo-icon"
                      aria-label="Close photo viewer"
                      onClick={() => setSelected(null)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </header>
                <div className="photo-lightbox-stage">
                  <button
                    className="photo-arrow photo-previous"
                    aria-label="Previous photo"
                    disabled={selected === 0}
                    onClick={() => setSelected((index) => Math.max(0, (index ?? 0) - 1))}
                  >
                    <ChevronLeft size={23} />
                  </button>
                  {current && (
                    <img
                      key={current.src}
                      src={current.src}
                      alt={`${title}: ${current.room}, photo ${(selected ?? 0) + 1} of ${photos.length}`}
                    />
                  )}
                  <button
                    className="photo-arrow photo-next"
                    aria-label="Next photo"
                    disabled={selected === photos.length - 1}
                    onClick={() =>
                      setSelected((index) => Math.min(photos.length - 1, (index ?? 0) + 1))
                    }
                  >
                    <ChevronRight size={23} />
                  </button>
                </div>
              </DialogPrimitive.Content>
            </DialogPortal>
          </Dialog>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
