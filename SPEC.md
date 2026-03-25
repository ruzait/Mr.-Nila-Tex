# Mr. Nila Tex - Premium Clothing & Textile Website

## 1. Concept & Vision

Mr. Nila Tex is a distinguished clothing and textile establishment in Addalaichenai, Sri Lanka, offering premium fashion for the entire family. The website embodies **luxury without pretension** — a digital flagship store that feels like walking into an upscale boutique with warm Sri Lankan hospitality. The experience balances contemporary fashion aesthetics with the authenticity and trust of a local establishment that has served the community for years.

## 2. Design Language

### Aesthetic Direction
**Elegant Minimalism meets Sri Lankan Warmth** — Think Zara meets a premium Colombo boutique. Clean lines, generous whitespace, and sophisticated photography create a gallery-like experience, while gold accents and subtle textures add warmth and premium feel.

### Color Palette
- **Primary Black**: `#1a1a1a` — Sophisticated, authoritative
- **Pure White**: `#ffffff` — Clean canvas
- **Cream**: `#f8f6f3` — Warm background alternative
- **Gold Accent**: `#c9a959` — Premium, luxurious touch
- **Soft Gold**: `#e8dcc8` — Subtle highlights
- **Dark Gray**: `#4a4a4a` — Secondary text
- **Light Gray**: `#9a9a9a` — Muted text

### Typography
- **Headlines**: Playfair Display (serif) — Elegant, editorial feel
- **Body & UI**: Poppins (sans-serif) — Modern, readable, friendly
- **Accents**: Cormorant Garamond — For special quotes/taglines

### Spatial System
- Base unit: 8px
- Section padding: 80px-120px vertical
- Card gaps: 24px
- Maximum content width: 1400px
- Mobile padding: 20px

### Motion Philosophy
- **Entrance animations**: Fade-up with stagger (400ms, ease-out)
- **Scroll animations**: Subtle parallax, reveal on intersection
- **Hover states**: Scale 1.02-1.05, shadow lift, color transitions (300ms)
- **Page transitions**: Smooth scroll, no jarring jumps
- **Product cards**: Image zoom on hover, overlay reveal
- **Text effects**: Gradient text animations, letter spacing reveals

### Visual Assets
- Icons: Lucide Icons (line style, 1.5px stroke)
- Images: Unsplash fashion/textile photography (high-quality, editorial)
- Decorative: Subtle grain texture overlay, geometric gold accents
- Backgrounds: Soft gradients, subtle patterns

## 3. Layout & Structure

### Page Architecture (Single Page Application Feel)
1. **Navigation** — Sticky, transparent → solid on scroll, logo + menu + CTA
2. **Hero** — Full viewport, cinematic imagery, bold typography, dual CTAs
3. **Featured Categories** — 4-column grid with hover reveals
4. **New Arrivals** — Asymmetric grid, product cards with quick-view
5. **Trending Collection** — Horizontal scroll carousel with parallax
6. **Special Offers** — Full-width banner with countdown timer
7. **Testimonials** — Carousel with customer photos
8. **About Preview** — Image + text split, brand story teaser
9. **Full Collection Grid** — Filterable category tabs
10. **Contact Section** — Map, form, contact cards
11. **Footer** — Links, social, newsletter

### Responsive Strategy
- Desktop: Full layouts, 4-column grids
- Tablet (768px): 2-column grids, adjusted spacing
- Mobile (480px): Single column, hamburger menu, touch-optimized

## 4. Features & Interactions

### Navigation
- Transparent on hero, solid white with shadow on scroll
- Mobile: Hamburger with slide-in drawer
- Active section highlighting via scroll spy
- Smooth scroll to sections

### Hero Section
- Full-viewport background image with overlay gradient
- Animated text reveal (word by word)
- Floating particles animation (subtle)
- Parallax depth on scroll

### Product Cards
- Image zoom on hover (scale 1.1)
- Quick-view overlay on hover
- "New" / "Hot" tags with pulse animation
- Price display with strikethrough for sales
- Add to cart button (visual only)

### Category Cards
- Full-image cards with gradient overlay
- Title reveal on hover
- Subtle parallax movement

### Trending Carousel
- Auto-play with pause on hover
- Drag/swipe support
- Navigation arrows and dots
- 3 visible items on desktop, 1 on mobile

### Offers Section
- Countdown timer (days, hours, minutes, seconds)
- Animated number transitions
- Pulsing CTA button
- Progress bar showing offer expiry

### Testimonials
- Auto-rotating carousel
- Star ratings display
- Customer photos with circular frame
- Quote marks as decorative elements

### Lightbox Gallery
- Click to expand images
- Navigation arrows
- Close on overlay click or escape key
- Smooth zoom transition

### WhatsApp Button
- Fixed position bottom-right
- Pulse animation to draw attention
- Opens WhatsApp with pre-filled message
- Hover: expand with "Chat with us"

### Contact Form
- Floating label inputs
- Real-time validation
- Success/error states
- Loading spinner on submit

## 5. Component Inventory

### Navbar
- States: transparent, solid, mobile-open
- Logo (left), nav links (center), CTA button (right)
- Mobile: hamburger icon → full-screen overlay menu

### Hero Banner
- Full viewport, background image
- Overlay gradient (dark bottom)
- Animated headline, subheadline, dual CTAs

### Product Card
- Image container (aspect-ratio 3:4)
- Hover overlay with quick actions
- Title, price, original/sale price
- "New" / "Hot" badges
- States: default, hover, loading

### Category Card
- Full background image
- Gradient overlay
- Centered title
- Hover: slight zoom, title highlight

### Button
- Primary: black bg, white text, gold hover
- Secondary: white bg, black border, fill on hover
- Ghost: transparent, underline animation
- States: default, hover, active, disabled, loading

### Countdown Timer
- Individual digit boxes
- Flip animation on change
- Labels below each unit

### Testimonial Card
- Customer photo (circular)
- Star rating (5-star display)
- Quote text
- Customer name and location

### Form Input
- Floating label design
- Border animation on focus
- Error state with red border and message
- Success state with green check

### Footer
- 4-column grid (about, links, contact, social)
- Newsletter subscription form
- Copyright bar

## 6. Technical Approach

### Architecture
- Single HTML file with semantic sections
- External CSS file with CSS custom properties
- Vanilla JavaScript for interactivity
- No build tools required

### External Dependencies
- Google Fonts (Playfair Display, Poppins, Cormorant Garamond)
- AOS library (Animate On Scroll)
- Lucide Icons (CDN)
- Intersection Observer API (native)

### Performance
- Lazy loading images
- CSS animations (GPU-accelerated)
- Minimal JavaScript
- Optimized image sizes

### SEO Implementation
- Semantic HTML5 structure
- Meta tags (title, description, keywords, Open Graph)
- Schema.org LocalBusiness markup
- Proper heading hierarchy (H1 → H6)
- Alt text for all images
- Structured data for products
