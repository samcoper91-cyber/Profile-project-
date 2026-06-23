import { motion } from "framer-motion";
import { experience } from "../data/content";
import { EASE, viewport } from "../lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          label="Experience & Education"
          title={
            <>
              The path so far —{" "}
              <span className="text-ink-muted">and what&apos;s next.</span>
            </>
          }
        />

        <ol className="mt-14 border-l border-line">
          {experience.map((exp, i) => (
            <motion.li
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="group relative pb-12 pl-8 last:pb-0 md:pl-12"
            >
              {/* node */}
              <span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-paper bg-ink transition-colors duration-300 group-hover:bg-accent" />

              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                    {exp.role}
                  </h3>
                  <p className="mt-0.5 text-base font-medium text-accent">
                    {exp.company}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium uppercase tracking-wide text-ink-muted">
                  {exp.period}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
                {exp.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
