# ARK Movement Web3 Website - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium Web3 social impact platforms including Celo.org, Worldcoin.org, Optimism.io, Gitcoin.co, and ZubaToken.com. The design prioritizes emotional storytelling, conversion optimization, and trust-building while maintaining crypto credibility for a general public audience.

## Brand Colors (Exact Usage Required)

- **#FFFFFF** - White (base)
- **#FF5501** - Vibrant Orange (primary accent, CTAs)
- **#9F0159** - Deep Magenta (secondary accent, highlights)
- **#FFFAF9** - Cream/Off-white (backgrounds)
- **Gradients**: Soft Orange → Magenta transitions allowed

## Typography System

**Font Family**: Inter or SF Pro Display via Google Fonts CDN

- **Hero Headlines**: Bold, 64px-72px desktop / 36px-48px mobile
- **Section Headers**: Bold, 48px-56px desktop / 28px-36px mobile
- **Subheadings**: Semibold, 24px-32px desktop / 20px-24px mobile
- **Body Text**: Regular, 16px-18px, friendly and readable
- **Token Stats/Numbers**: JetBrains Mono or similar monospace font for credibility

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm

- **Container Max-Width**: max-w-7xl (1280px) with px-4 md:px-8 lg:px-12
- **Grid**: 12-column grid system
- **Section Padding**: py-16 md:py-24 lg:py-32
- **Whitespace**: Massive, generous spacing between sections
- **Rounded Corners**: rounded-2xl for cards, rounded-lg for buttons
- **Shadows**: Soft, subtle shadows (shadow-lg with low opacity)

## Hero Section (Critical)

**Layout**: Full viewport height (min-h-screen) with two-column layout on desktop

**Left Column**:
- Massive headline: "Buy $ACT" (72px, bold)
- Subline: "Join the global kindness economy. Transparent, rewarding, scalable." (24px)
- Two CTAs stacked/side-by-side:
  - Primary: "Buy $ACT" (filled #FF5501, px-8 py-4, rounded-lg)
  - Secondary: "Whitepaper" (outlined #FF5501, border-2)

**Right Column**: Illustration depicting missions, community, wallet, token ecosystem (isometric/semi-flat style)

**Animations**: Subtle parallax on scroll, fade-in text (0.6s delay), floating icons on illustration

**Image**: Hero should include a custom illustration or high-quality graphic representing the Web3 kindness economy - not a photograph. Position on right side of hero, complementing the CTAs.

## Component Library

### Navigation
- Sticky header with backdrop-blur
- Logo left, navigation center, language switcher + "Buy $ACT" button right
- Mobile: Hamburger menu with slide-in drawer
- Token stats bar below header: Live holders, market cap, 24h volume (count-up animation on load)

### Buttons
- **Primary**: bg-[#FF5501], hover gradient to magenta, px-6 py-3, rounded-lg, shadow-md
- **Secondary**: border-2 border-[#FF5501], hover fills with orange, same padding
- **Hover**: Soft glow effect using box-shadow with orange/magenta

### Cards (Missions, Impact, Features)
- bg-white with border border-gray-100, rounded-2xl, p-6 md:p-8
- Hover: subtle lift (translateY(-4px)), shadow increase
- 2-column on tablet, 3-column on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

### Forms (Donate, Nominate, Contact)
- Input fields: border border-gray-200, rounded-lg, p-4, focus:ring-2 focus:ring-[#FF5501]
- Multi-step: Progress indicator at top with numbered steps
- Upload areas: Dashed border, drag-and-drop feedback

### Token Stats Display
- Large numbers in monospace font with count-up animation
- Grid layout: 3-4 columns showing holders, market cap, volume, circulating supply
- Icons from Heroicons to accompany each stat

### Mission Calendar
- Grid view with card-based layout
- Month/year dropdown filters (styled select with custom arrow)
- Each mission card: Date badge (orange), title, description preview, "Learn More" link

### Roadmap
- Vertical timeline on mobile, horizontal on desktop
- Completed items: filled checkpoint in orange
- Current: pulsing magenta checkpoint
- Future: outlined gray checkpoints

### FAQ Accordion
- Click to expand, rotate chevron icon
- Answer text fades in with 0.3s transition
- Border-bottom separator between items

### Footer
- Multi-column layout: About ARK, Quick Links, Legal, Social
- Newsletter signup with inline form
- Social icons in orange on hover
- Bottom bar: Copyright, language selector

## Premium Motion System (Apple/Tesla/Spotify-Inspired)

**Animation Physics**:
- Low-friction, inertia-based motion with smooth deceleration
- Primary easing curve: cubic-bezier(0.25, 0.1, 0.25, 1) - smooth
- Cinematic entrance: cubic-bezier(0.16, 1, 0.3, 1) - slow start, smooth finish
- Overshoot effect: cubic-bezier(0.34, 1.56, 0.64, 1) - playful interactions
- Micro-bounce for button clicks: cubic-bezier(0.68, -0.55, 0.265, 1.55)

**Transitions**:
- Fade-through with blur: opacity 0 → 1 combined with filter: blur(10px) → blur(0px)
- Lift-with-opacity: y: 40px → 0 combined with opacity animation
- Staggered reveals: staggerChildren: 0.1s, delayChildren: 0.2s
- Soft parallax on scroll using GSAP ScrollTrigger (speed: 0.3-0.5)
- Progressive blur-to-crisp for images: blur(20px) → blur(0px) on load

**UI Layout**:
- Full-bleed hero sections with min-h-screen
- Container max-width: 1400px with generous px-6 md:px-12 padding
- Strict 8px/12px spacing system (gap-ark-sm: 8px, gap-ark-md: 12px)
- Section padding: py-24 md:py-32 for cinematic spacing

**Interaction Design**:
- Delayed hover reactions (200-300ms transition duration)
- Magnetic button feel: scale 1.04 on hover with spring physics
- Active state: scale 0.97 with quick spring transition
- Shadow softness: 20-40px blur, 5-10% opacity (shadow-premium utilities)

**Implementation**:
- Framer Motion for page + component transitions
- GSAP ScrollTrigger for scroll-driven parallax effects
- Custom MagneticButton component for premium button interactions
- AnimatedSection wrapper for consistent reveal animations

**GSAP Cleanup Requirements**:
- Always track GSAP tweens/timelines in component-local variables
- Kill only component-specific instances in useEffect cleanup functions
- NEVER use `ScrollTrigger.getAll().forEach(t => t.kill())` - this breaks global animations
- Pattern: `const tween = gsap.to(...); return () => tween.kill();`

**Performance Utilities**:
- `lazyLoad.tsx`: Lazy-loaded page components with Suspense boundaries
- `OptimizedImage.tsx`: Progressive image loading with blur-to-crisp effect
- Use `once: true` on useInView to prevent re-triggering animations

## Animations & Interactions

**Strategic Animation Placement**:
- Hero: Cinematic staggered text reveals with blur-to-crisp effect
- Section entrance: Fade-up with blur on scroll into view (using useInView)
- Token stats: Count-up animation with cinematic easing
- Hover: Magnetic scaling (1.04), subtle shadow increase
- Cards: Lift-with-shadow effect on hover (translateY(-4px))
- Scroll indicator: Bouncing animation at hero bottom
- Background orbs: Gentle floating animation (4s ease-in-out infinite)

## Images

**Hero**: Custom Web3 illustration (community + tokens + missions) - right side, 50% width on desktop
**Mission Cards**: Icon-based graphics or minimal photos of impact work
**Impact Page**: Before/after photos of completed missions (3-column grid)
**About Page**: Team photo or community gathering (if available), otherwise mission collage
**Testimonials**: Headshots of community members (circular, 80px diameter)

## Accessibility

- Minimum contrast 4.5:1 (tested: white text on #FF5501 passes, cream backgrounds work)
- Focus states: ring-2 ring-offset-2 ring-[#FF5501] on all interactive elements
- Alt text for all images
- ARIA labels for icon-only buttons
- Keyboard navigation fully supported
- Mobile-first responsive: stack columns, enlarge touch targets (min 44px)

## Page-Specific Guidelines

**Token Page**: Emphasize contract address (copy button), tokenomics pie chart, live stats prominently, buy widget in sidebar

**Whitepaper**: PDF embed with fallback download link, clean reader mode

**Impact Page**: Visual impact metrics (dollars donated, people helped), mission cards in masonry grid

**Donate/Nominate**: Multi-step forms with clear progress, success states with confetti or celebration animation

**Mission Calendar**: Filter UI at top, grid of cards below, load more pagination

**Legal Pages**: Simple typography-focused layout, max-w-prose container, clear hierarchy

## Tone & Emotional Direction

- Optimistic and warm (achieved through cream backgrounds, rounded corners, friendly copy)
- Trustworthy and transparent (clean layouts, accessible information, security badges)
- Approachable for non-crypto users (avoid jargon, explain concepts simply)
- Professional yet youthful (modern sans-serif, vibrant orange, engaging micro-interactions)