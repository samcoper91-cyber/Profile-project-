import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/*
 * Magnetic — wraps a child so it gently "pulls" toward the cursor.
 * Pattern adapted from a 21st.dev "Magnetic Button" component, reworked to:
 *   • track on the element itself (no global listener),
 *   • use this project's spring feel, and
 *   • fully disable under prefers-reduced-motion.
 */

const SPRING = { stiffness: 250, damping: 22, mass: 0.4 };

type MagneticProps = {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: reduce ? 0 : springX, y: reduce ? 0 : springY }}
      className={["inline-block", className].filter(Boolean).join(" ")}
    >
      {children}
    </motion.div>
  );
}
