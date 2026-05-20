# Portfolio v6 — Phase 3 (Polish)

The substance was done in v5. This is the craft layer.

---

## What's new

### 1. Layered hero (three additions, layered carefully)

**Live time indicator** — The status pill now reads
`● Available for freelance projects · 7:18pm in Lagos`
Time updates at the start of every minute. Uses `Intl.DateTimeFormat` with timezone `Africa/Lagos` so it's always correct regardless of where the visitor is.

**Word-cycling intro line** — "Front End Web Developer building **interfaces / experiences / products / systems**" — cycles every 2.4s with a fade-and-slide. Min-width prevents layout shift. Pauses if `prefers-reduced-motion` is set.

**Animated background orb** — A soft radial-gradient blob behind the hero that drifts on a 20s loop. Pure CSS, hardware-accelerated. Disables animation under reduced-motion.

### 2. Custom cursor

Two-layer system: a 6px dot that tracks instantly, plus a 32px ring that follows with a soft lerp. On hover over links/buttons the ring expands to 56px. On project images it expands to 72px with a stronger fill. Auto-disables on touch devices, coarse pointers, and reduced-motion preference. Form fields keep the native text caret.

### 3. Page-load entrance

Refined the timing of the existing `.reveal` system. Hero text reveals immediately on DOMContentLoaded; hero photo waits for full `window.load` so the image isn't half-loaded when it fades in; side rails settle in last at 0.7s. Has a 1.5s safety timeout so the page never feels stuck.

### 4. Theme system (light + dark)

Real engineering, not a CSS invert:

- **Token system** — Every color now flows through CSS custom properties. 42 hardcoded colors converted across the stylesheet.
- **Light mode** is a separately-tuned palette: warm off-white `#f7f5f1` instead of pure white, deeper accent blue `#2563eb` for contrast, all border opacities re-balanced for light surfaces.
- **Anti-flash** — Inline script in `<head>` reads localStorage and applies the theme class before paint. No flash of wrong theme on load.
- **Persistence** — Saved to localStorage. Falls back to system preference on first visit.
- **System sync** — If the user hasn't explicitly chosen, the site responds to OS-level theme changes live.
- **Toggle button** in the navbar shows sun/moon depending on current state, with an `aria-label` that updates accordingly.

### 5. Custom 404 page

`/404.html` shares the portfolio's grain overlay, theme system, and accent color. Massive monospace `404`, "PAGE NOT FOUND" tagline, "This page took the day off." headline, two CTAs. `meta robots: noindex, follow` so search engines don't index it.

To wire it up in production: configure your host to serve `404.html` for not-found responses. GitHub Pages does this automatically.

### 6. Section numbering fix

Caught and fixed a numbering bug from Phase 2 where section headers said `06. Pricing` but the navbar said `05. Pricing`. The Beliefs section dropped its number (it's a values block, not a navigation destination), so the on-page numbers now match the navbar exactly: 01 About, 02 Skills, 03 Work, 04 Process, 05 Pricing, 06 Contact.

---

## Verified visually (1440×900 headless Chromium)

- Dark hero — orb glow, time pill, moon toggle ✓
- Dark skills — three colored category labels, Goal callout ✓
- Dark pricing — Most Popular badge, three aligned packages ✓
- Light hero — warm off-white reads as deliberate, not generic ✓
- Light skills — white cards float above off-white background ✓
- Light pricing — accent retains energy, Most Popular tint subtle ✓
- 404 page — orb glow centered, copy reads quietly confident ✓

---

## Files in this version

```
portfolio-v6/
├── index.html               — hero, theme toggle, cursor, theme bootstrap
├── 404.html                 — NEW
├── style.css                — theme tokens, all phase 3 styling
├── script.js                — phase 3 IIFE for behaviors
├── CHANGES.md               — this file
├── Emmanuel-Onyekachi-Resume.pdf
├── Emmanuel-Onyekachi-Resume.docx
├── images/
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

---

## Still your responsibility before deploying

1. ☐ Replace `https://emmanuelonyekachi.com/` placeholder with your real domain (in `index.html` head, `sitemap.xml`, `robots.txt`)
2. ☐ Create `images/og-image.jpg` (1200×630) for link previews
3. ☐ Confirm WhatsApp `+2348169269415` and email `emmanuelymb@gmail.com`
4. ☐ Verify these GitHub repos exist (or update the URLs):
   - `github.com/emmanuelonyeka/lumiere-restaurant`
   - `github.com/emmanuelonyeka/primenest-realty` (when ready)
   - `github.com/emmanuelonyeka/portfolio`
5. ☐ Configure host to serve `404.html` for not-found responses

---

## What's NOT done (and probably shouldn't be)

- **Per-project detail pages** — only worth it if you'll write multiple thousand-word case studies
- **Blog / Notes** — only if you'll actually write
- **Contact form** — you chose WhatsApp-first, adding email form would dilute the primary CTA

The portfolio is feature-complete for winning freelance clients in your stated market.
