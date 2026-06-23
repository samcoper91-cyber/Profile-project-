import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { nav, site } from "../data/content";
import { CloseIcon, MenuIcon } from "./ui/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={[
            "container-x flex items-center justify-between transition-all duration-300",
            scrolled
              ? "my-2 rounded-full border border-line/80 bg-paper/75 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl md:my-3"
              : "border border-transparent py-5",
          ].join(" ")}
          style={scrolled ? { maxWidth: "72rem" } : undefined}
        >
          {/* Logo / wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-display text-paper transition-colors duration-300 group-hover:bg-accent">
              {site.name.charAt(0)}
            </span>
            <span className="hidden sm:block">{site.name}</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={site.resumeUrl}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-accent"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              className="container-x flex h-full flex-col justify-center gap-2 pb-20"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-line py-4 font-display text-3xl font-semibold tracking-tight text-ink"
                >
                  <span className="mr-3 text-sm font-medium text-ink-muted">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="mt-8 flex gap-3"
              >
                <a
                  href={site.resumeUrl}
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-ink/15 py-3 text-center text-sm font-semibold text-ink"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-ink py-3 text-center text-sm font-semibold text-paper"
                >
                  Get in touch
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
