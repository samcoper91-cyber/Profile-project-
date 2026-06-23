# Anurag Chand — Portfolio

A minimal, motion-driven personal portfolio built with **React + Vite +
TypeScript + Tailwind CSS v4 + Framer Motion**. The structure and motion
language follow a clean, product-design-style portfolio: a big-type hero,
scroll reveals, a skills marquee, numbered case-study rows, a parallax About,
an experience timeline, testimonials, and a bold contact section.

---

## Quick start

```bash
npm install      # already done once; re-run if you pull fresh
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build → /dist
npm run preview  # preview the production build locally
```

---

## ✏️ Where to put your content

**Almost everything lives in one file:** [`src/data/content.ts`](src/data/content.ts).

Open it and replace anything wrapped in `[SQUARE BRACKETS]` with your real
details. It controls:

| Section        | What to edit                                                       |
| -------------- | ------------------------------------------------------------------ |
| `site`         | Name, role, location, email, phone, LinkedIn, **resume link**      |
| `hero`         | Eyebrow, tagline, portrait image path                              |
| `stats`        | The 3 numbers under the hero (`[X]+` placeholders)                 |
| `marquee`      | The scrolling skills strip                                         |
| `services`     | The 3 "What I do" cards                                            |
| `projects`     | Selected work rows — **1 real, 2 templates** to fill in            |
| `about`        | Your bio paragraphs + highlights + photo path                      |
| `experience`   | Education / training / roles timeline                              |
| `testimonials` | Recommendations (placeholders until you have real quotes)          |
| `contact`      | Heading + subheading for the contact section                       |

### 🖼️ Adding images

Drop your files into the **`/public`** folder and the paths in `content.ts`
will pick them up automatically:

- `public/portrait.jpg` — hero portrait
- `public/about.jpg` — about photo
- `public/work-1.jpg`, `work-2.jpg`, `work-3.jpg` — project thumbnails

Until you add them, tasteful placeholders show in their place (so the layout
never looks broken).

---

## 🎨 Customizing the look

Design tokens (colors + fonts) live at the top of
[`src/index.css`](src/index.css) inside the `@theme { … }` block:

```css
--color-paper: #fafafa;   /* page background */
--color-ink: #09090b;     /* primary text   */
--color-accent: #2563eb;  /* the single blue accent — change to rebrand */
--font-display: "Archivo";       /* headings */
--font-sans: "Space Grotesk";    /* body     */
```

Change `--color-accent` to instantly re-theme every button, link highlight and
hover state.

---

## 🧩 Project structure

```
src/
├─ data/content.ts          ← all editable content (start here)
├─ lib/motion.ts            ← shared Framer Motion variants (fadeUp, stagger…)
├─ components/
│  ├─ Navbar.tsx            ← sticky nav, scroll-progress bar, mobile menu
│  ├─ Hero.tsx              ← big-type hero, entrance stagger, parallax portrait
│  ├─ Services.tsx          ← "What I do" cards
│  ├─ Work.tsx              ← numbered case-study rows
│  ├─ About.tsx             ← bio + sticky parallax photo
│  ├─ Experience.tsx        ← timeline
│  ├─ Testimonials.tsx      ← recommendations (dark section)
│  ├─ Contact.tsx           ← contact CTA + cards
│  ├─ Footer.tsx
│  └─ ui/                   ← reusable bits
│     ├─ Reveal.tsx         ← reduced-motion-aware scroll reveal
│     ├─ SectionHeading.tsx
│     ├─ Button.tsx
│     ├─ Magnetic.tsx       ← cursor-following CTA (adapted from a 21st.dev pattern)
│     ├─ Marquee.tsx
│     └─ icons.tsx          ← inline SVG icon set
└─ App.tsx                  ← section order
```

To reorder sections, just rearrange them in `App.tsx`.

---

## ♿ Motion & accessibility

- Every animation respects **`prefers-reduced-motion`** — reveals, the marquee,
  the magnetic buttons and parallax all disable for users who request it.
- Animations use only `transform` / `opacity` for smooth, compositor-friendly
  performance.
- Nav, buttons and links have visible focus states and proper labels.

---

## 🚀 Deploy

This is a static site — deploy the `dist/` folder anywhere:

- **Vercel / Netlify:** import the repo; build command `npm run build`, output
  directory `dist`.
- **GitHub Pages / any static host:** upload the contents of `dist/`.

---

## 🔧 Optional: screenshot scripts

`scripts/shoot.mjs` and `scripts/sections.mjs` use Playwright (a `devDependency`)
to screenshot the site via your installed Chrome — handy for previewing changes:

```bash
node scripts/shoot.mjs       # full desktop + mobile shots → /tmp/shot_*.png
node scripts/sections.mjs    # per-section crops → /tmp/sec_*.png
```

They're purely a dev convenience and are not part of the deployed site. Remove
the `scripts/` folder and `playwright` from `devDependencies` if you don't want
them.
