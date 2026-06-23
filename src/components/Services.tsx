import { motion, useReducedMotion } from "framer-motion";
import { services } from "../data/content";
import { EASE, stagger, staggerItem, viewport } from "../lib/motion";
import { SectionHeading } from "./ui/SectionHeading";

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          label="What I do"
          title={
            <>
              Three ways I help brands{" "}
              <span className="text-ink-muted">grow online.</span>
            </>
          }
          intro="From search to social to story — an end-to-end toolkit for getting found, getting clicks, and getting remembered."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {services.map((s) => (
            <motion.article
              key={s.id}
              variants={staggerItem}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="group flex flex-col rounded-3xl border border-line bg-card p-7 transition-colors duration-300 hover:border-ink/20"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-ink-muted">
                  {s.index}
                </span>
                <span className="h-2 w-2 rounded-full bg-line transition-colors duration-300 group-hover:bg-accent" />
              </div>

              <h3 className="mt-10 font-display text-2xl font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent">{s.subtitle}</p>

              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                {s.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {s.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
