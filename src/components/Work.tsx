import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../data/content";
import { EASE, viewport } from "../lib/motion";
import { SectionHeading } from "./ui/SectionHeading";
import { ArrowUpRight } from "./ui/icons";

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            label="Selected Work"
            title={
              <>
                Campaigns &amp; projects
                <br className="hidden sm:block" /> I&apos;m proud of.
              </>
            }
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xs text-sm leading-relaxed text-ink-muted md:pb-2 md:text-right"
          >
            A look at the work behind the results. Replace these with your own
            case studies as your portfolio grows.
          </motion.p>
        </div>

        <div className="mt-14 border-t border-line">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={project.href}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 }}
      className="group grid grid-cols-1 items-center gap-6 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
    >
      {/* index + year */}
      <div className="flex items-center justify-between md:col-span-2 md:flex-col md:items-start md:justify-start md:gap-2">
        <span className="font-display text-sm font-semibold text-ink-muted">
          {project.index}
        </span>
        <span className="text-sm text-ink-muted">{project.year}</span>
      </div>

      {/* title + description */}
      <div className="md:col-span-6">
        <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.category.map((c) => (
            <span
              key={c}
              className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {c}
            </span>
          ))}
          <span className="ml-1 text-xs font-medium text-ink">
            {project.result}
          </span>
        </div>
      </div>

      {/* thumbnail + arrow */}
      <div className="flex items-center gap-4 md:col-span-4 md:justify-end">
        <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-line bg-paper-2">
          <div className="absolute inset-0 grid place-items-center text-center">
            <span className="px-2 text-[0.65rem] font-medium leading-tight text-ink-muted">
              [PROJECT IMAGE]
            </span>
          </div>
          <img
            src={project.image}
            alt={project.title}
            className="relative z-10 h-full w-full scale-100 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  );
}
