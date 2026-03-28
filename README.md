# Al-Zakki Hall Website

Modern, responsive banquet hall website for Al-Zakki Hall in Addalaichenai, Ampara, Sri Lanka.

**Live Site**: https://al-zakki.netlify.app

---

## 📋 What Was Made

### Website Sections
1. **Home/Hero** - Full-screen hero with image slider
2. **About** - Features list highlighting 800 chairs & 100 tables
3. **Services** - 6 event types (Wedding, Walima, Conference, Official, Awarding, Competition)
4. **Gallery** - 6 venue images with hover effects
5. **Pricing** - 4 packages:
   - Normal Wedding: Rs. 45,000 (4:30 PM - 8:30 PM)
   - Walima: Rs. 55,000 (11:30 AM - 2:30 PM)
   - Special Programs: Custom
   - Premium Rental: Custom
6. **FAQ** - 6 common questions
7. **Contact** - Two phone numbers, email, location, Google Maps, booking form

### Contact Info
- **Phone 1**: +94 75 474 0232
- **Phone 2**: +94 77 775 5076
- **WhatsApp**: Direct links on page
- **Email**: info@alzakki.com
- **Location**: Akkaraipattu Kalmunai Road, Addalaichenai - 09, Ampara, Sri Lanka

---

## 🔧 How It Was Made

### Tech Stack
- HTML5 (semantic structure)
- CSS3 (custom properties, animations)
- JavaScript (GSAP animations)
- Google Fonts (Poppins)
- GSAP Library (scroll animations)

### Key Features
- Dark theme with red accent (#dc2626)
- Responsive mobile-first design
- Smooth scroll navigation
- Image slider on hero
- Scroll-triggered animations
- WhatsApp click-to-chat integration
- Google Maps embed
- WhatsApp floating button

---

## 📁 Project Structure

```
al-zakki-banquet/
├── index.html              # Main website (HTML)
├── css/
│   └── style.css           # All styles (responsive)
├── js/
│   └── main.js             # Animations & functionality
├── assets/                 # Hero & gallery images
│   ├── hall.png           # Hero slider image 1
│   ├── hall2.png          # Hero slider image 2
│   └── hall in/           # Gallery images
│       ├── stage.png
│       ├── chirig.png
│       └── img (1-9).jpeg
├── images/
│   ├── og-image.jpg       # Social sharing image
│   └── favicon/           # Favicon files
│       ├── favicon.ico
│       ├── favicon.svg
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── favicon-96x96.png
│       ├── apple-touch-icon.png
│       └── site.webmanifest
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Crawler instructions
├── SEO-BACKLINKS-GUIDE.md  # SEO strategy guide
└── README.md               # This file
```

---

## 🎨 Design Specifications

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #dc2626 | Buttons, accents |
| Primary Dark | #b91c1c | Hover states |
| Background | #0a0a0a | Main background |
| Card BG | #141414 | Card backgrounds |
| Text Primary | #ffffff | Main text |
| Text Secondary | #a3a3a3 | Secondary text |

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Headings**: Bold, gradient text effects

---

## 🔍 SEO Implementation

### Meta Tags
- [x] Title with keywords
- [x] Meta description (800 chairs, 100 tables)
- [x] Meta keywords (50+ keywords)
- [x] Author
- [x] Robots (index, follow)
- [x] Geo tags (local SEO)
- [x] Canonical URL

### Favicon/Multimedia
- [x] favicon.ico (all browsers)
- [x] favicon-16x16.png
- [x] favicon-32x32.png
- [x] favicon-96x96.png
- [x] apple-touch-icon.png
- [x] SVG logo for navbar

### Open Graph (Facebook/WhatsApp)
- [x] Type, URL, title
- [x] Description
- [x] Image (1200x630)
- [x] Image alt text
- [x] Locale & site name

### Twitter Card
- [x] Large image card
- [x] Title & description
- [x] Image

### JSON-LD Structured Data
- [x] EventVenue schema
- [x] LocalBusiness schema
- [x] Organization schema
- [x] FAQPage schema (6 questions)

### Additional SEO
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Image lazy loading
- [x] Alt text on all images
- [x] Internal linking (nav menu)
- [x] Backlinks guide created

---

## 📱 Page Speed Optimization

- [x] DNS prefetch for external resources
- [x] Deferred loading for GSAP scripts
- [x] Lazy loading for gallery images
- [x] Preload for critical fonts
- [x] Print media query for fonts
- [x] Image width/height attributes

---

## 🚀 Deployment

### Netlify (Recommended)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `al-zakki-banquet` folder
3. Done!

### GitHub + Netlify
1. Push to GitHub repository
2. Connect repo to Netlify
3. Auto-deploy on every push

### Update After Domain Change
| File | What to Change |
|------|----------------|
| index.html | All URLs (og:url, canonical, etc.) |
| sitemap.xml | Domain in loc tag |
| robots.txt | Sitemap URL |
| SEO-BACKLINKS-GUIDE.md | Domain references |

---

## 📞 Contact

- **Phone**: +94 75 474 0232 / +94 77 775 5076
- **Email**: info@alzakki.com
- **Location**: Addalaichenai, Ampara, Sri Lanka

---

© 2024-2026 Al-Zakki Hall | Built with ❤️
