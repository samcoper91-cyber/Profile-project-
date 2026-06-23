import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type Variant = "solid" | "outline" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-accent",
  outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "text-ink hover:text-accent",
};

/** Pill CTA with a subtle press + an arrow that nudges on hover. */
export function Button({
  href,
  children,
  variant = "solid",
  withArrow = false,
  external = false,
  className = "",
  onClick,
}: ButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={[base, variants[variant], className].join(" ")}
    >
      {children}
      {withArrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </motion.a>
  );
}
