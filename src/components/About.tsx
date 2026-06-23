import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { about, site } from "../data/content";
import { viewport } from "../lib/motion";
import { Reveal } from "./ui/Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="scroll-mt-24 bg-paper-2/60 py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* portrait with parallax */}
          <div ref={ref} className="relative lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-paper">
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-paper to-paper-2">
                <span className="font-display text-7xl font-black text-ink/10">
                  {site.name.charAt(0)}
                </span>
                <span className="absolute bottom-5 left-5 text-xs font-medium text-ink-muted">
                  [ADD A PHOTO → /public/about.jpg ]
                </span>
              </div>
              <motion.img
                src={about.portrait}
                alt={site.name}
                style={{ y: reduce ? 0 : imageY }}
                className="relative z-10 h-[116%] w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* bio */}
          <div>
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2">
                <span className="h-px w-6 bg-ink-muted/50" aria-hidden />
                About me
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[2.8rem]">
                A curious marketer who cares about the people behind the metrics.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <p className="text-lg leading-relaxed text-ink-soft">{para}</p>
                </Reveal>
              ))}
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="mt-10 grid gap-3 sm:grid-cols-1"
            >
              {about.highlights.map((h) => (
                <motion.li
                  key={h}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-3 border-t border-line pt-3 text-base font-medium text-ink"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  {h}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
