import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, viewport } from "../../lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before this element reveals. */
  delay?: number;
  /** Distance (px) the element rises from. */
  y?: number;
  /** Render as a different element if you need correct semantics. */
  as?: "div" | "section" | "li" | "span";
};

/**
 * Scroll-reveal wrapper. Fades + rises into view once, and fully respects
 * `prefers-reduced-motion` (renders static, no transform).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
