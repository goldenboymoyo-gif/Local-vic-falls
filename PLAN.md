# Local Vic Falls — Build Prompt

**Rebrand of:** Vic Falls Televivi → **Local Vic Falls**
**Positioning shift:** from a tourism-brochure site → a living local business & experience directory that gets tourists (and locals) out into the *whole* town — falls-side adventure, backstreet food, rural villages, and everything in between.

The old framing was "come see the falls." The new framing is: **"the falls are just the start — here's the whole town."**

---

## Tech Stack (Existing)
- React 19 + Vite 8
- Tailwind CSS 4
- GSAP + ScrollTrigger (animations)
- Framer Motion (page transitions)
- React Router 6
- Express + Prisma (backend)

## Design Palette
- **Zambezi blue-green** — primary (#0D9488 / #0F766E)
- **Spray-mist white** — backgrounds, text overlays
- **Sunset amber** — accent highlights (#F59E0B)
- **Red earth / ochre** — warm accents (#C2410C)
- **Deep charcoal** — contrast text (#1C1917)

## Key Principles
- Directory-meets-magazine feel (TripAdvisor + Klook + Suburbia)
- Real businesses only — no invented names/prices
- WhatsApp is first-class CTA (dominant local contact)
- Mobile-first
- Motion in service of real details, never decoration

---

## Execution Phases

### Phase 1: Data Source (single source of truth)
- `src/data/listings.js` — structured JSON for ALL listings (adventures, restaurants, culture, stay)
- Shared between directory grids AND "Build Your Day" tool

### Phase 2: Homepage Sections (in order)
1. Hero — real VF imagery, bold headline, category pills
2. Category Grid — bento layout, real images
3. Adventure & Adrenaline — Klook-style cards with prices
4. Eat & Drink — TripAdvisor-style directory with filters
5. Culture, Schools & Villages — magazine storytelling
6. Build Your Day — interactive itinerary builder
7. Local Voices / Meet the People — named humans
8. Stay — accommodation directory
9. Footer — map, WhatsApp CTA, social

### Phase 3: Animations
- GSAP ScrollTrigger reveals
- Magnetic buttons on CTAs
- Marquee strips (review quotes, category tags)
- Glare hover on cards
- Number ticker on real stats

### Phase 4: Polish
- Mobile responsiveness
- WhatsApp deep-links
- Performance audit
