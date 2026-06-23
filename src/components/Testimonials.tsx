import { motion } from "framer-motion";
import { testimonials } from "../data/content";
import { stagger, staggerItem, viewport } from "../lib/motion";
import { SectionHeading } from "./ui/SectionHeading";
import { StarIcon } from "./ui/icons";

export function Testimonials() {
  return (
    <section id="recommendations" className="scroll-mt-24 bg-ink py-20 text-paper md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow inline-flex items-center gap-2 text-paper/60">
            <span className="h-px w-6 bg-paper/30" aria-hidden />
            Recommendations
          </span>
          <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Kind words from people I&apos;ve worked with.
          </h2>
        </div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              variants={staggerItem}
              className="flex flex-col rounded-3xl border border-paper/10 bg-paper/[0.03] p-8"
            >
              <div className="flex gap-1 text-accent" aria-hidden>
                {Array.from({ length: 5 }).map((_, s) => (
                  <StarIcon key={s} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-paper/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-paper/10 pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-paper/10 font-display text-sm font-semibold text-paper">
                  {t.name.replace(/[[\]]/g, "").charAt(0) || "—"}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-paper">
                    {t.name}
                  </span>
                  <span className="block text-sm text-paper/55">{t.title}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
