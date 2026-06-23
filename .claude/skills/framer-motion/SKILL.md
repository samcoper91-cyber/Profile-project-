---
name: framer-motion
description: "Framer Motion (v11) animation reference for React. Use when building, reviewing, or debugging animations/transitions/gestures in React, Next.js, Vite. Covers: motion components, variants, stagger, AnimatePresence (enter/exit), layout & shared-element (layoutId) animations, gestures (hover/tap/drag), scroll-linked animation (useScroll/useTransform/useSpring), 3D transforms (rotateX/rotateY/perspective tilt), springs vs tweens, prefers-reduced-motion, performance (LazyMotion/m), and common gotchas (transform conflicts, exit keys, RSC 'use client'). Keywords: animate, transition, motion.div, whileHover, whileTap, whileInView, AnimatePresence, useScroll, parallax, scroll progress, stagger, spring, tilt, page transition, reduced motion."
---

# Framer Motion (v11)

Production reference for animating React UIs with Framer Motion. Targets the
installed version (`framer-motion@^11`). Prefer `transform`/`opacity` animations,
always honor reduced-motion, and reach for variants over per-element props.

> Package note: Framer Motion is also published as **`motion`** (`import { motion } from "motion/react"`). On v11 with the `framer-motion` package installed, import from **`framer-motion`**. APIs below are identical.
>
> **Next.js / RSC:** `motion` components are client-only — put `"use client"` at the top of any file that imports them.

---

## 1. Core component API

```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 24 }}   // start state (use `false` to skip mount anim)
  animate={{ opacity: 1, y: 0 }}     // target state
  exit={{ opacity: 0, y: -24 }}      // unmount state (needs <AnimatePresence>)
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  whileInView={{ opacity: 1 }}       // animates when scrolled into view
  viewport={{ once: true, amount: 0.2 }}
/>
```

Animate **`x/y/scale/rotate/opacity`** (compositor-friendly) rather than
`width/height/top/left`. Any `motion.*` element works (`motion.section`,
`motion.button`, `motion.ul`, …). For a custom component, wrap it:
`const MotionCard = motion(Card)` (the component must forward `ref` + `className/style`).

---

## 2. Variants (preferred for anything non-trivial)

Named states that **propagate from parent to children** — the parent's `animate`
label drives every child, enabling clean staggering.

```jsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map((t) => (
    <motion.li key={t} variants={item}>{t}</motion.li>
  ))}
</motion.ul>
```

Children only need `variants={item}` — they inherit `hidden`/`show` from the parent.
Extras: `staggerDirection: -1`, `when: "beforeChildren"`, dynamic variants via
`custom` prop (`show: (i) => ({ transition: { delay: i * 0.1 } })`).

---

## 3. AnimatePresence (enter **and exit**)

Required to animate components as they **unmount** (modals, route changes, list removals).

```jsx
import { AnimatePresence, motion } from 'framer-motion'

<AnimatePresence mode="wait">
  {open && (
    <motion.div key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    />
  )}
</AnimatePresence>
```

Rules:
- Direct children of `<AnimatePresence>` must each have a **stable, unique `key`**.
- `mode`: `"sync"` (default), `"wait"` (finish exit before enter), `"popLayout"` (removed item pops out of flow — great with `layout`).
- Add `initial={false}` to skip animating already-present children on first render.

---

## 4. Layout & shared-element animations

```jsx
<motion.div layout />                 {/* animates size/position changes automatically */}
<motion.div layout="position" />      {/* only position (avoids content squish) */}
```

Shared element across components — same `layoutId` morphs between them:

```jsx
{tabs.map((t) => (
  <button key={t} onClick={() => setActive(t)} className="relative">
    {t}
    {active === t && <motion.span layoutId="underline" className="absolute -bottom-1 inset-x-0 h-0.5 bg-brand-600" />}
  </button>
))}
```

Gotchas: animate `borderRadius`/`boxShadow` via **`style`** (not a Tailwind class) so
they interpolate correctly under `layout`; wrap groups in `<LayoutGroup>` to coordinate.

---

## 5. Motion values & scroll-linked animation

Motion values update outside React render (no re-renders → fast).

```jsx
import { useScroll, useTransform, useSpring, motion } from 'framer-motion'

// Scroll progress bar
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
<motion.div style={{ scaleX }} className="fixed top-0 inset-x-0 h-1 origin-left bg-brand-600" />

// Parallax tied to an element entering/leaving the viewport
const ref = useRef(null)
const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
const y = useTransform(p, [0, 1], ['-12%', '12%'])
<motion.img ref={ref} style={{ y }} />
```

Key hooks:
- `useMotionValue(0)` — a value you `.set()` imperatively (e.g. from pointer events).
- `useTransform(mv, [in], [out])` — map one range to another (numbers, colors, strings).
- `useSpring(source, config)` — smooth a value with spring physics.
- `useMotionTemplate\`...\`` — compose motion values into a CSS string.
- `useMotionValueEvent(mv, "change", cb)` — react to changes.
- `useScroll({ target, container, offset })` — `scrollY`, `scrollYProgress`, etc.
- `useInView(ref, { once, amount })` — boolean visibility (no motion element needed).
- `useAnimate()` → `[scope, animate]` — imperative timelines/sequences.

---

## 6. 3D transforms (perspective tilt)

```jsx
const px = useMotionValue(0.5), py = useMotionValue(0.5)
const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 200, damping: 18 })
const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 200, damping: 18 })

<motion.div
  onMouseMove={(e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }}
  onMouseLeave={() => { px.set(0.5); py.set(0.5) }}
  style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
/>
```

Use `transformPerspective` for per-element perspective; set `transformStyle: 'preserve-3d'`
and give children `translateZ(...)` (via `style`) to make them pop forward as the card tilts.

---

## 7. Transitions: spring vs tween

```jsx
transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 1 }}  // physical, natural
transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}            // spring by feel
transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}               // tween (ease-out-expo)
transition={{ repeat: Infinity, repeatType: 'mirror', duration: 4 }}   // looping float
```

Micro-interactions: **150–300ms**. Custom easing: pass a cubic-bezier array.
Per-property transitions: `transition={{ y: { type: 'spring' }, opacity: { duration: 0.2 } }}`.

---

## 8. Accessibility — reduced motion (do this every time)

```jsx
import { useReducedMotion } from 'framer-motion'

function Reveal({ children }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >{children}</motion.div>
  )
}
```

Or globally: `<MotionConfig reducedMotion="user">…</MotionConfig>`. Also disable
infinite/looping animations under reduced motion (skip the `animate` loop entirely).

---

## 9. Performance

- Animate **`transform` + `opacity`** only; avoid layout-triggering props.
- Shrink bundle with `LazyMotion` + the lightweight `m` component:
  ```jsx
  import { LazyMotion, domAnimation, m } from 'framer-motion'
  <LazyMotion features={domAnimation}><m.div animate={{ opacity: 1 }} /></LazyMotion>
  ```
  (`domMax` adds layout/drag features.) Use `m.*` instead of `motion.*` inside.
- Prefer motion values + `useTransform` for scroll/pointer work so you don't re-render per frame.
- Heavy looping/parallax is best on `will-change: transform` elements; keep layers few.

---

## 10. Common gotchas

- **Transform conflicts:** don't put Tailwind transform utilities (`hover:-translate-y-1`,
  `hover:scale-105`) on the *same element* Framer animates a transform on — they fight and
  Framer's inline transform wins. Split responsibilities: reveal/stagger on an **outer**
  wrapper, hover-scale/tilt on the **inner** element. (See `Reveal` wrapping `Tilt` below.)
- **Exit not firing:** the element must be inside `<AnimatePresence>` and have a stable `key`.
- **Re-triggering reveals:** set `viewport={{ once: true }}` or `whileInView` replays each scroll.
- **StrictMode (dev only):** double-mounts components, so entrance animations may appear to run twice in development — not a production issue.
- **`useScroll` target:** pass a `ref` and `offset`; the element must be laid out/measurable.
- **Next.js:** `"use client"` on any file importing `motion`/hooks, or you'll get an RSC error.

---

## Reference implementations in this project

Live, working examples to copy from:
- `src/lib/motion.js` — shared `fadeUp` / `stagger` / `inView` variants.
- `src/components/Reveal.jsx` — reduced-motion-aware scroll reveal wrapper.
- `src/components/Tilt.jsx` — 3D pointer-tracking tilt with spring + glare.
- `src/components/Navbar.jsx` — `useScroll` + `useSpring` scroll-progress bar; `AnimatePresence` mobile menu.
- `src/components/Hero.jsx` — variant stagger + infinite floating badges.
- `src/components/Skills.jsx` / `Services.jsx` / `Work.jsx` — `Reveal`-wraps-`Tilt` pattern (avoids the transform conflict above).
