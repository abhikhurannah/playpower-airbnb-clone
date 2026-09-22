# Verification record

## Final submission checks

The final package passes TypeScript checking, all seven automated tests, and lint with no errors (six existing Fast Refresh warnings). The frozen dependency lockfile installs successfully. `npm run build:vercel` generates Build Output API version 3 with static assets, a Node 22 server function, and the catch-all server route. This verifies the local Vercel-target build; no public Vercel deployment has been performed.

Verified on 22 September 2026 using the completed starter project.

## Automated checks

- `npm test`: 7 tests passed. Covers stay pricing, date validation, leap-day/daylight-saving arithmetic, guest limits, original listing fees, all 43 local JPEGs and nine photo categories.
- `npm run typecheck`: passed.
- `npm run build`: passed, including browser bundle and Nitro Node server.
- `npm run lint`: no errors; six existing React Fast Refresh warnings in the original shared UI components.

## Desktop browser checks

Checked at 1440 × 860 in the in-app browser:

- Listing, photo tour and lightbox rendered with local reference photographs.
- First and last lightbox boundaries disable the appropriate arrow. Buttons and Left/Right keys change photos.
- Escape returns from lightbox to tour, then to listing. Focus returns to the originating control.
- Nine category shortcuts and all 43 photo buttons are present.
- Amenities dialog opens; wishlist survives navigation to the home page.
- Original starter browse page remains available; searching Candolim returns the assignment property.
- Two-month calendar selects 18–23 October as five nights. Clearing dates and entering checkout before check-in show validation messages.
- Production server directly serves `/rooms/mirashya-ug10`, with the correct title, working gallery, no broken loaded images and no horizontal overflow at the tested viewport.

## Fixes found during verification

The inherited calendar used locale-dependent date attributes, causing a server/browser hydration mismatch. Attributes now use deterministic year-month-day values. The original Vite preview command expected a different server output directory; the project now builds a Nitro Node server and previews its actual output.

## Limits

This is a frontend assessment. Reservations, payments, authentication and host messaging are not connected. The location panel is an illustration rather than a live map. Six observed reference reviews are included; unobserved reviews were not fabricated. Original starter layout choices remain, so the entire page is not asserted to be pixel-identical to the reference. Browser testing was desktop-only, not a cross-browser or formal screen-reader audit.

## Branding cleanup

Removed builder metadata, runtime reporting hooks and the builder-specific Vite configuration dependency. Replaced the favicon with a neutral house icon and regenerated the architecture diagram. Standard Vite/TanStack/React/Tailwind/Nitro plugins now build the project. Historical prompts are kept in a separate upload file without rewriting the original user messages.
