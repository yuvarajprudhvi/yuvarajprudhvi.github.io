import type { ReactNode } from "react";

/* ------------------------------------------------------------------
   Page furniture
------------------------------------------------------------------ */

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[76rem] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Numbered section head with the rule above it, like a chapter opening. */
export function SectionHead({
  number,
  eyebrow,
  title,
  lead,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <header className="border-t-2 border-ink pt-4">
      <div className="flex items-baseline gap-4">
        <span className="label text-ink">{number}</span>
        <span className="label">{eyebrow}</span>
      </div>
      <h2 className="mt-6 max-w-3xl text-balance text-[2rem] leading-[1.12] sm:text-[2.75rem]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-[46ch] text-pretty text-[1.0625rem] leading-[1.7]">
          {lead}
        </p>
      ) : null}
    </header>
  );
}

/* ------------------------------------------------------------------
   Bits and pieces
------------------------------------------------------------------ */

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`rule ${className}`} />;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="label border border-rule px-2 py-1 text-ink-3">
      {children}
    </span>
  );
}

export function TechniqueChip({ code, name }: { code: string; name: string }) {
  return (
    <span className="inline-flex items-baseline gap-2 border border-rule bg-paper-2 px-2.5 py-1.5">
      <span className="font-mono text-xs text-accent">{code}</span>
      <span className="text-xs text-ink-2">{name}</span>
    </span>
  );
}

/* ------------------------------------------------------------------
   Links that look like they were set, not styled
------------------------------------------------------------------ */

export function InkButton({
  href,
  children,
  download = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group inline-flex cursor-pointer items-center gap-2.5 bg-ink px-5 py-3 text-sm text-paper transition-colors duration-200 hover:bg-accent"
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </a>
  );
}

export function TextLink({
  href,
  children,
  download = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="ulink group inline-flex cursor-pointer items-center gap-2 text-sm text-ink"
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </a>
  );
}
