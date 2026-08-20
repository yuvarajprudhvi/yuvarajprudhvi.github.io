"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

type Tag = "div" | "section" | "li" | "article" | "header" | "tr";

/** Quiet entrance. 8px is enough to feel deliberate without being a slideshow. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: reduce ? 0.2 : 0.5, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  index = 0,
  className,
  step = 0.05,
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  step?: number;
  as?: Tag;
}) {
  return (
    <Reveal as={as} className={className} delay={Math.min(index * step, 0.3)}>
      {children}
    </Reveal>
  );
}
