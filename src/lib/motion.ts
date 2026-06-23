import type { Variants } from "framer-motion";

/** Signature "ease-out-expo" curve — the calm, premium feel used site-wide. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Default viewport config: reveal once, when ~25% is on screen. */
export const viewport = { once: true, amount: 0.25 } as const;

/** Fade + rise. The workhorse reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Plain fade — for large blocks where movement would feel heavy. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

/** Container that staggers its children. Children use `fadeUp` (or similar). */
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** A single staggered child. Pair with a `stagger()` parent. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
