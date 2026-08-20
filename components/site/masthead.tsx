"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "toolkit", label: "Toolkit" },
  { id: "record", label: "Record" },
  { id: "contact", label: "Contact" },
];

export function Masthead() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!onHome) return;
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-[color:rgba(247,244,238,0.92)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-[76rem] items-baseline justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link href="/" className="serif text-lg leading-none tracking-tight">
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-baseline gap-7">
            {LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  href={href(l.id)}
                  aria-current={onHome && active === l.id ? "location" : undefined}
                  className={`label transition-colors duration-200 hover:text-accent ${
                    onHome && active === l.id ? "text-accent" : ""
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.resume} download className="label ulink-static text-ink">
                CV
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="small-nav"
          className="label cursor-pointer px-1 py-1 text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div id="small-nav" className="border-t border-rule bg-paper md:hidden">
          <ul className="mx-auto max-w-[76rem] px-5 py-2 sm:px-8">
            {LINKS.map((l) => (
              <li key={l.id} className="border-b border-rule last:border-0">
                <Link
                  href={href(l.id)}
                  onClick={() => setOpen(false)}
                  className="serif block py-3 text-xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-rule">
              <a
                href={profile.resume}
                download
                onClick={() => setOpen(false)}
                className="serif block py-3 text-xl text-accent"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
