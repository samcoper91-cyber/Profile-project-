import { motion, useReducedMotion } from "framer-motion";
import { contact, site } from "../data/content";
import { EASE, viewport } from "../lib/motion";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";
import { ArrowUpRight, LinkedInIcon, MailIcon, PhoneIcon } from "./ui/icons";

export function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-32">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow inline-flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-ink-muted/50" aria-hidden />
              Contact
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
              {contact.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              {contact.subheading}
            </p>
          </Reveal>

          {/* primary email CTA */}
          <Reveal delay={0.18}>
            <Magnetic strength={0.3} className="mt-10">
              <motion.a
                href={`mailto:${site.email}`}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-display text-lg font-semibold text-paper transition-colors duration-300 hover:bg-accent"
              >
                {site.email}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-paper/15 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.a>
            </Magnetic>
          </Reveal>
        </div>

        {/* contact methods */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3"
        >
          <ContactCard
            icon={<MailIcon className="h-5 w-5" />}
            label="Email"
            value={site.email}
            href={`mailto:${site.email}`}
          />
          <ContactCard
            icon={<PhoneIcon className="h-5 w-5" />}
            label="Phone"
            value={site.phone}
            href={site.phoneHref}
          />
          <ContactCard
            icon={<LinkedInIcon className="h-5 w-5" />}
            label="LinkedIn"
            value="Connect with me"
            href={site.socials.linkedin}
            external
          />
        </motion.div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
      className="group flex flex-col gap-3 rounded-2xl border border-line bg-card p-6 text-left transition-colors duration-300 hover:border-ink/25"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-paper-2 text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-paper">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-wide text-ink-muted">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-sm font-semibold text-ink">
          {value}
        </span>
      </span>
    </motion.a>
  );
}
