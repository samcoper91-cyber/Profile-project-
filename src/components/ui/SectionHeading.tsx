import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Small all-caps label, e.g. "Selected Work". */
  label: string;
  /** Large display title. */
  title: ReactNode;
  /** Optional supporting paragraph. */
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Consistent section header: eyebrow label + big title (+ optional intro). */
export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={[
        isCenter ? "mx-auto max-w-2xl text-center" : "max-w-3xl",
        className,
      ].join(" ")}
    >
      <Reveal>
        <span
          className={[
            "eyebrow inline-flex items-center gap-2",
            isCenter ? "justify-center" : "",
          ].join(" ")}
        >
          <span className="h-px w-6 bg-ink-muted/50" aria-hidden />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p
            className={[
              "mt-5 text-lg leading-relaxed text-ink-soft",
              isCenter ? "mx-auto" : "",
            ].join(" ")}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
