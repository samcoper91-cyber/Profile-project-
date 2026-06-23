import { motion, useReducedMotion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  /** Seconds for one full loop. Larger = slower. */
  speed?: number;
  reverse?: boolean;
};

/**
 * Infinite horizontal marquee. Renders the list twice and translates by -50%
 * so the loop is seamless. Static (no animation) under reduced-motion.
 */
export function Marquee({ items, speed = 32, reverse = false }: MarqueeProps) {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden border-y border-line/80 py-5"
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <motion.ul
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : { duration: speed, ease: "linear", repeat: Infinity }
        }
        style={{ willChange: "transform" }}
      >
        {loop.map((item, i) => (
          <li key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-2xl font-semibold tracking-tight text-ink/85 sm:text-3xl">
              {item}
            </span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
