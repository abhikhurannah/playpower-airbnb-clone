# Stayhub — Playpower Labs assignment

Completed from the user's **stay-finder-56-main.zip starter project**. The existing TanStack Start app, browse layout, listing cards, design tokens, original stays, route structure and component library are retained.

The assignment property is available at **`/rooms/mirashya-ug10`**, and is the first card on the browse page.

## Run step by step

You need Node.js 22.12+ and Bun. The updated `bun.lock` pins the standalone project dependencies.

```sh
# In this project folder:
npm exec --yes --package=bun -- bun install --frozen-lockfile
npm run dev
```

Open the address Vite prints, then select the first **Candolim, India** card. You can also append `/rooms/mirashya-ug10` to the address to go directly to the assignment page.

If Bun is already installed, `bun install --frozen-lockfile` is equivalent to the installation command above. No API keys, backend account or environment variables are needed.

## Validate

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

The tests cover invalid dates, leap days, guest limits, price calculations, local photos and category order. Browser checks are recorded in `docs/QA.md`.

## What is completed

- Five-image hero for the Candolim property, using the exact downloaded reference photos.
- Full-screen photo tour: nine room categories and all 43 photos.
- Lightbox: buttons, Left/Right keys, first/last boundaries, Escape, focus restoration and scroll locking.
- Property information, sleeping spaces, amenities overlay, two-month date calendar, reviews, location illustration, host and house rules.
- Original starter browse/search/category filtering and listing cards.
- Wishlist persistence, share-link copying, date validation and guest-aware stay calculations.
- Production architecture diagram, development record, reusable review-agent configurations and submission guide.

## Project organization

- `src/routes/index.tsx` — preserved browse page.
- `src/routes/rooms.$id.tsx` — extended original room page.
- `src/components/PhotoTour.tsx` — accessible tour/lightbox built with the existing Radix dialog dependency.
- `src/components/PropertyDetails.tsx` — property sections and overlays composed with existing UI components.
- `src/data/listings.ts` — original starter stays plus the assignment property.
- `src/data/photos.json` — 43-image reference manifest.
- `src/lib/booking.ts` — validated date/guest/price calculations.
- `docs/architecture.png` and `docs/ARCHITECTURE.md` — proposed production system.
- `docs/PROMPTS.md` — AI workflow and actual user request record.
- `.claude/agents/` — reusable review configurations.

## Important scope

This is a frontend assessment with TanStack Start server rendering, not a real booking service. No account authentication, payment processing, real reservations or host messaging are connected. Reserve shows the selected stay and explicitly does not claim a confirmed booking. Wishlist storage is local to the browser.

The user's starter browse UI and room-page styling are intentionally retained. The photo experience follows the reference closely; this is not a claim of pixel-identical reproduction of every listing section. The six review texts visible on the reference are reproduced; 13 additional reviews have not been invented.

## Deployment

For Vercel, follow `docs/DEPLOY-VERCEL.md`. `npm run build:vercel` generates `.vercel/output` for server functions and static assets; `vercel.json` configures cloud builds.

Local production builds use Nitro's **Node server** preset. `npm run build` emits `.output/public` plus `.output/server`; `npm run preview` serves the result at `http://127.0.0.1:4173`. You can specify `-- --host 0.0.0.0 --port 4173`. This is not a plain static deployment: retain the entire `.output` folder on a Node host. The build uses standard Vite, TanStack Start, React, Tailwind and Nitro plugins. No deployment or public repository publication was performed.

## Package for submission

```sh
python3 scripts/package.py
```

The ZIP is written to `submission/playpower-final.zip`. See `docs/DEPLOY-VERCEL.md` for deployment and upload instructions.
# playpower-airbnb-clone
