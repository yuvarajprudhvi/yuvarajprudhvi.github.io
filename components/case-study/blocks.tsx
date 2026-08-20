import Image from "next/image";
import type { Block } from "@/content/projects";
import { TechniqueChip } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

/**
 * Case-study body. The measure is held at ~64ch and hung off a left rail so
 * margin notes can sit in the gutter on wide screens, the way an annotation
 * would in a printed report.
 */
export function Blocks({
  blocks,
  firstParagraphDropcap = false,
}: {
  blocks: Block[];
  firstParagraphDropcap?: boolean;
}) {
  const firstParagraph = blocks.findIndex((b) => b.kind === "p");

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockView
          key={i}
          block={block}
          dropcap={firstParagraphDropcap && i === firstParagraph}
          figureNumber={
            block.kind === "shot"
              ? blocks.slice(0, i + 1).filter((b) => b.kind === "shot").length
              : 0
          }
        />
      ))}
    </div>
  );
}

function BlockView({
  block,
  dropcap,
  figureNumber,
}: {
  block: Block;
  dropcap: boolean;
  figureNumber: number;
}) {
  switch (block.kind) {
    case "p":
      return (
        <p
          className={`max-w-[64ch] text-pretty text-[1.0625rem] leading-[1.75] text-ink-2 ${
            dropcap ? "dropcap" : ""
          }`}
        >
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="max-w-[64ch] border-t border-rule">
          {block.items.map((item) => (
            <li
              key={item}
              className="border-b border-rule py-3.5 pl-6 text-[1.0625rem] leading-[1.7] text-ink-2 [text-indent:-1.5rem]"
            >
              <span aria-hidden="true" className="mr-3 text-accent">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
      );

    /* hangs in the gutter on wide screens, sits inline below that.
       the note is absolutely placed so it cannot widen the page */
    case "note":
      return (
        <aside className="relative max-w-[64ch] xl:h-0">
          <p className="border-l-2 border-accent py-1 pl-4 text-[0.875rem] italic leading-[1.6] text-ink-3 xl:absolute xl:left-full xl:top-0 xl:ml-10 xl:w-48 xl:border-l xl:border-rule">
            {block.text}
          </p>
        </aside>
      );

    case "callout":
      return (
        <aside className="max-w-[64ch] border-y-2 border-ink bg-paper-2 px-6 py-6">
          <p className="label text-ink">{block.title}</p>
          <p className="mt-3 text-[1rem] leading-[1.7] text-ink-2">
            {block.text}
          </p>
        </aside>
      );

    case "quote":
      return (
        <Reveal>
          <blockquote className="max-w-[54ch] py-6">
            <p className="serif text-balance text-[1.625rem] italic leading-[1.35] text-ink sm:text-[2rem]">
              {block.text}
            </p>
          </blockquote>
        </Reveal>
      );

    case "chips":
      return (
        <div className="max-w-[64ch] pt-2">
          <p className="label border-b border-rule pb-2">{block.label}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {block.items.map((item) => (
              <TechniqueChip key={item.code} code={item.code} name={item.name} />
            ))}
          </div>
        </div>
      );

    case "shot":
      return (
        <Reveal>
          <figure className="max-w-[64ch] pt-4">
            <div className="border border-rule bg-paper-2 p-2">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                sizes="(min-width: 1024px) 700px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 flex gap-3 border-b border-rule pb-3 text-[0.8125rem] leading-[1.6] text-ink-3">
              <span className="label shrink-0 pt-px text-accent">
                Fig. {figureNumber}
              </span>
              <span>{block.caption}</span>
            </figcaption>
          </figure>
        </Reveal>
      );

    case "table":
      return (
        <div className="-mx-5 overflow-x-auto px-5 pt-2 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[38rem] border-collapse text-left">
            <thead>
              <tr className="border-y-2 border-ink">
                {block.head.map((h) => (
                  <th key={h} scope="col" className="label py-2.5 pr-6 last:pr-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-rule align-top">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`py-4 pr-6 text-[0.9375rem] leading-[1.65] last:pr-0 ${
                        block.monoCols?.includes(c)
                          ? "whitespace-nowrap font-mono text-[0.8125rem] text-accent"
                          : c === 0
                            ? "text-ink"
                            : "text-ink-2"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "waves":
      return <Waves items={block.items} />;

    case "matrix":
      return <Matrix columns={block.columns} />;

    case "steps":
      return (
        <ol className="max-w-[64ch] border-t-2 border-ink">
          {block.items.map((item, i) => (
            <li
              key={item.title}
              className="grid gap-x-6 gap-y-2 border-b border-rule py-6 sm:grid-cols-12"
            >
              <span className="label pt-1 text-accent sm:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="sm:col-span-10">
                <p className="serif text-[1.1875rem] leading-snug text-ink">
                  {item.title}
                </p>
                <p className="mt-2.5 text-[1rem] leading-[1.7] text-ink-2">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
  }
}

/* ------------------------------------------------------------------
   Attack waves. Drawn here rather than lifting the vendor slide out
   of the source report.
------------------------------------------------------------------ */
function Waves({
  items,
}: {
  items: { wave: string; gap?: string; title: string; points: string[] }[];
}) {
  return (
    <ol className="grid gap-px border-t-2 border-ink bg-rule sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.wave}
          delay={i * 0.07}
          className="flex flex-col bg-paper px-1 pb-6 pt-5 sm:px-4"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="label text-accent">{item.wave}</span>
            <span className="label">{item.gap ?? "start"}</span>
          </div>
          <p className="serif mt-3 text-[1.1875rem] leading-snug text-ink">
            {item.title}
          </p>
          <ul className="mt-4 space-y-2.5">
            {item.points.map((p) => (
              <li
                key={p}
                className="flex gap-2.5 text-[0.875rem] leading-[1.6] text-ink-2"
              >
                <span aria-hidden="true" className="text-ink-3">
                  &middot;
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------
   ATT&CK tactics, set as a printed matrix
------------------------------------------------------------------ */
function Matrix({
  columns,
}: {
  columns: { tactic: string; techniques: string[] }[];
}) {
  return (
    <div className="relative pt-2">
      <div className="-mx-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        <ol className="flex min-w-max gap-px bg-rule">
          {columns.map((col, i) => (
            <Reveal
              as="li"
              key={col.tactic}
              delay={Math.min(i * 0.03, 0.24)}
              className="w-40 bg-paper"
            >
              <p className="label border-y-2 border-ink px-2.5 py-2.5 leading-tight text-ink">
                {col.tactic}
              </p>
              <ul>
                {col.techniques.map((t) => (
                  <li
                    key={t}
                    className="border-b border-rule px-2.5 py-2.5 text-[0.8125rem] leading-snug text-ink-2"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-paper to-transparent sm:hidden"
      />
      <p className="label mt-3">Scroll for the rest &rarr;</p>
    </div>
  );
}
