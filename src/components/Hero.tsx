import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { hero, site, stats } from "../data/content";
import { EASE } from "../lib/motion";
import { Button } from "./ui/Button";
import { Magnetic } from "./ui/Magnetic";
import { ArrowDown } from "./ui/icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pb-16 pt-32 sm:pt-36 md:pb-24 md:pt-44"
    >
      {/* soft radial accent in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.10), rgba(37,99,235,0) 70%)",
        }}
      />

      <div className="container-x relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Left — copy */}
          <div>
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium text-ink-soft"
            >
              {site.available && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              )}
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-7 text-balance font-display text-[clamp(2.75rem,9vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink"
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-3 font-display text-xl font-medium tracking-tight text-accent sm:text-2xl"
            >
              {site.role}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
            >
              {hero.tagline}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button href="#work" variant="solid" withArrow>
                  View my work
                </Button>
              </Magnetic>
              <Button href="#contact" variant="outline">
                Get in touch
              </Button>
            </motion.div>
          </div>

          {/* Right — portrait with parallax */}
          <motion.div variants={item} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-paper-2">
              {/* placeholder sits behind — shown until a real photo is added */}
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-paper-2 to-paper">
                <span className="font-display text-7xl font-black text-ink/10">
                  {site.name.charAt(0)}
                </span>
                <span className="absolute bottom-5 left-5 text-xs font-medium text-ink-muted">
                  [ADD YOUR PHOTO → /public/portrait.jpg ]
                </span>
              </div>
              <motion.img
                src={hero.portrait}
                alt={`Portrait of ${site.name}`}
                style={{ y: reduce ? 0 : portraitY }}
                className="relative z-10 h-[118%] w-full object-cover"
                onError={(e) => {
                  // graceful fallback while you haven't added a photo yet
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* floating location chip */}
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-line bg-card px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
              <p className="text-xs text-ink-muted">Based in</p>
              <p className="text-sm font-semibold text-ink">{site.location}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Stat row */}
        <motion.dl
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={item} className="bg-paper px-6 py-7">
              <dt className="font-display text-4xl font-bold tracking-tight text-ink">
                {s.value}
              </dt>
              <dd className="mt-1 text-sm text-ink-muted">{s.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#work"
        style={{ opacity: reduce ? 1 : fadeOut }}
        className="mt-14 hidden items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted md:flex"
      >
        Scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
