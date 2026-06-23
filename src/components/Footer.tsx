import { motion, useReducedMotion } from "framer-motion";
import { nav, site } from "../data/content";
import { ArrowDown, LinkedInIcon } from "./ui/icons";

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* brand */}
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5 text-base font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-display text-paper">
                {site.name.charAt(0)}
              </span>
              {site.name}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {site.role} based in {site.location}. Currently open to new
              opportunities — let&apos;s make something grow.
            </p>
          </div>

          {/* nav + socials */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-3">
              <span className="eyebrow">Navigate</span>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              <span className="eyebrow">Elsewhere</span>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {site.phone}
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
            }
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors duration-200 group-hover:border-ink">
              <ArrowDown className="h-3.5 w-3.5 rotate-180" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
