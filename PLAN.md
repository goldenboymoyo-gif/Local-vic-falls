# Local Vic Falls - Implementation Plan

## Overview
Transform "ConnectHub" into "Local Vic Falls" - an immersive discovery platform for Victoria Falls.

## Tech Stack (Existing)
- React 19 + Vite 8
- Tailwind CSS 4
- GSAP + ScrollTrigger (animations)
- Framer Motion (page transitions)
- React Router 6
- Express + Prisma (backend)
- Clerk (auth, optional)

---

## Phase 1: Brand Rename (All Files)

### Files to update with "ConnectHub" → "Local Vic Falls" / "LocalVicFalls"

| File | Changes |
|------|---------|
| `index.html` | Title, meta tags, OG tags |
| `src/components/layout/PremiumNav.jsx` | Logo text "ConnectHub" → "Local Vic Falls" |
| `src/components/layout/Footer.jsx` | Brand name, email, tagline, copyright |
| `src/components/home/Hero.jsx` | Headline words, subtitle text, CTA buttons |
| `src/components/home/AboutUs.jsx` | "About ConnectHub" → "About Local Vic Falls", all text |
| `src/components/home/FeaturedBusinesses.jsx` | Section headers, descriptions |
| `src/components/home/PopularProfessionals.jsx` | Section headers |
| `src/components/home/Testimonials.jsx` | "ConnectHub" references |
| `src/components/home/HowItWorks.jsx` | "ConnectHub helps you" |
| `src/components/home/Cities.jsx` | Descriptions |
| `src/components/home/CTA.jsx` | All text references |
| `src/components/home/DemoShowcase.jsx` | "ConnectHub works for" |
| `src/components/ui/Logo.jsx` | Update icon/design |
| `src/pages/About.jsx` | All "ConnectHub" references |
| `src/pages/HowItWorks.jsx` | All "ConnectHub" references |
| `src/pages/Contact.jsx` | Email, FAQ questions, HQ text |
| `src/data/mockData.js` | Email addresses, testimonials |

---

## Phase 2: Homepage Redesign

### 2.1 Cinematic Hero (Rewrite `Hero.jsx`)
- Fullscreen video background (Victoria Falls video from CDN)
- Animated headline: "Discover the Real Victoria Falls"
- Rotating taglines: "Every Street Has a Story" / "Explore Beyond the Falls"
- Animated search bar with category autocomplete
- Floating quick category pills
- GSAP word-by-word headline animation
- Floating particles effect (already exists, enhance)
- Mouse-follow parallax on content
- Smooth scroll indicator

### 2.2 Explore by Mood Section (New Component)
- `src/components/home/ExploreByMood.jsx`
- Grid of mood cards: "I'm Hungry", "I Want Adventure", "Family Fun", "Date Night", "Luxury Escape", "Hidden Gems", "Culture", "Nature", "Relax", "Nightlife"
- Each card with curated image, GSAP hover animations
- Links to filtered search results

### 2.3 Featured Experiences (Rewrite `FeaturedBusinesses.jsx`)
- Rename to `FeaturedExperiences.jsx`
- Immersive experience cards with:
  - Image carousel
  - Rating + reviews
  - Duration
  - Pricing
  - "Book Now" button
  - Save/Share icons
  - Animated hover effects (scale, shadow, border glow)
- Real Victoria Falls experiences: rafting, helicopter, bungee, safari, cultural tours

### 2.4 Local Stories Section (New Component)
- `src/components/home/LocalStories.jsx`
- Magazine-style storytelling cards
- Topics: Rural communities, Village visits, Cultural performances, Local chefs, Conservation projects
- Cinematic imagery with narrative text
- Parallax scroll effects

### 2.5 Community Impact Section (New Component)
- `src/components/home/CommunityImpact.jsx`
- Animated counters: Hosts Joined, Businesses Listed, Experiences, Jobs Supported
- Highlight cards for community tourism, local entrepreneurs, schools
- GSAP count-up animations

### 2.6 Interactive Map Preview (New Component)
- `src/components/home/MapPreview.jsx`
- Static preview of Victoria Falls map
- Animated pins for different categories
- CTA to full map page

### 2.7 Become a Host CTA (New Component)
- `src/components/home/BecomeHost.jsx`
- Prominent section encouraging hosts to join
- Host categories displayed
- Registration CTA button

### 2.8 Updated Home.jsx
```jsx
<Hero />
<SearchBar />           // Inline intelligent search
<ExploreByMood />       // Mood-based exploration
<FeaturedExperiences /> // Immersive experience cards
<LocalStories />        // Storytelling section
<CommunityImpact />     // Impact statistics
<MapPreview />          // Interactive map preview
<BecomeHost />          // Host registration CTA
<CTA />                 // Final call to action
```

---

## Phase 3: Navigation Update

### 3.1 PremiumNav.jsx
- Brand: "Local Vic Falls"
- Nav links: Home, Explore, Experiences, Map, Events, Stories, About
- "Become a Host" button (prominent, accent color)
- Enhanced search with category filters
- Mobile menu with all new links

### 3.2 Footer.jsx
- Brand name + tagline: "The Digital Heartbeat of Victoria Falls"
- Links: Explore, For Hosts, Community, Support, Legal
- Social media links
- Newsletter signup
- "Become a Host" link

---

## Phase 4: Mock Data Overhaul

### `src/data/mockData.js`
Replace generic service data with Victoria Falls-specific:

**Categories:**
- Restaurants, Cafés, Bars, Hotels, Lodges, Guest Houses
- Adventures, Rafting, Helicopter Flights, Bungee Jumping
- Wildlife Experiences, Local Markets, Shopping
- Schools, Community Projects, Rural Storytelling
- Volunteer Opportunities, Local Guides, Transport
- Events, Hidden Gems

**Featured Experiences:**
- Zambezi White Water Rafting
- Victoria Falls Helicopter Flight
- Bungee Jumping at Victoria Falls Bridge
- Sunset Cruise on the Zambezi
- Cultural Village Tour
- Walking Safari in Rainforest
- Local Market Tour
- Traditional Cooking Class

**Moods:**
- I'm Hungry, I Want Adventure, Family Fun, Date Night
- Luxury Escape, Hidden Gems, Culture, Nature, Relax, Nightlife

**Testimonials:**
- Tourist testimonials from different countries
- Local business owner testimonials
- Community member testimonials

---

## Phase 5: Styling & Animation Enhancements

### 5.1 Color Palette Update
- Primary: Deep ocean blue (#0A1628)
- Accent: Warm sunset orange (#FF6B35) or golden (#F5A623)
- Secondary: Forest green (#2D6A4F)
- Background gradients with Victoria Falls imagery

### 5.2 Animation Enhancements
- Page transitions with Framer Motion
- GSAP ScrollTrigger for all sections
- Parallax effects on images
- Stagger animations on card grids
- Magnetic hover effects on interactive elements
- Smooth scroll with Lenis (add dependency)

### 5.3 New CSS additions to `index.css`
- Custom animations for mood cards
- Map pin animations
- Hero video overlay gradients
- Experience card hover states

---

## Phase 6: New Pages (Future)

### 6.1 Experiences Page (`/experiences`)
- Grid of all experiences with filters
- Category, mood, price, duration filters

### 6.2 Map Page (`/map`)
- Full interactive map of Victoria Falls
- Filterable pins for all categories

### 6.3 Events Page (`/events`)
- Timeline of upcoming events
- Festival, market, community event cards

### 6.4 Stories Page (`/stories`)
- Blog-style storytelling content
- Rural communities, cultural features

### 6.5 Host Registration (`/become-host`)
- Multi-step registration form
- Host category selection
- Identity verification flow

### 6.6 Host Dashboard (`/dashboard/host`)
- Listing management
- Booking management
- Analytics
- Earnings tracking

---

## Execution Order

1. **Phase 1**: Brand rename across all files (mechanical, safe)
2. **Phase 2**: Homepage redesign (biggest visual impact)
3. **Phase 3**: Navigation updates
4. **Phase 4**: Mock data overhaul
5. **Phase 5**: Animation & styling polish
6. **Phase 6**: New pages (future work)

---

## Key Design Principles

- **Immersive**: Every page should feel like exploring Victoria Falls
- **Discovery-first**: Encourage exploration, not just listing
- **Community-driven**: Highlight local people and stories
- **Mobile-first**: Premium app-like experience
- **Performance**: Smooth animations without sacrificing speed
- **Authentic**: Real businesses, real stories, real experiences
