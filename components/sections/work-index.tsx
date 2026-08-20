import Link from "next/link";
import { Shell, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { projects, sideProjects } from "@/content/projects";

export function WorkIndex() {
  return (
    <section id="work" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <Reveal>
          <SectionHead
            number="01"
            eyebrow="The work"
            title="Four write-ups, all of them things I actually did"
            lead="Each one has its own page here with the findings, the screenshots and what I would tell somebody defending against it. The original PDF is attached at the top of every page if you would rather read it that way."
          />
        </Reveal>

        <ol className="mt-14">
          {projects.map((project, i) => (
            <RevealItem as="li" key={project.slug} index={i} step={0.06}>
              <Link
                href={`/work/${project.slug}`}
                className="group block border-t border-rule py-8 transition-colors duration-300 hover:bg-paper-2 sm:py-10"
              >
                <div className="grid gap-x-8 gap-y-5 lg:grid-cols-12">
                  <div className="flex items-start gap-5 lg:col-span-7">
                    <span className="label mt-2 shrink-0 text-ink-3 transition-colors duration-300 group-hover:text-accent">
                      {project.file}
                    </span>
                    <div>
                      <h3 className="text-[1.75rem] leading-[1.15] tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-[2.125rem]">
                        {project.title}
                      </h3>
                      <p className="label mt-2.5">
                        {project.kicker} &nbsp;/&nbsp; {project.period}
                      </p>
                      <p className="mt-4 max-w-[52ch] text-pretty leading-[1.68] text-ink-2">
                        {project.summary}
                      </p>
                      <span className="ulink mt-5 inline-flex items-center gap-2 text-sm text-ink group-hover:text-accent">
                        Read it
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </div>

                  <dl className="lg:col-span-4 lg:col-start-9">
                    <p className="label mb-1 border-b border-rule pb-2">
                      {project.metricsLabel ?? "What I did"}
                    </p>
                    {project.metrics.map((m) => (
                      <div key={m.label} className="leader border-b border-rule py-2.5">
                        <dt className="text-[0.8125rem] leading-snug text-ink-3">
                          {m.label}
                        </dt>
                        <dd className="serif figs whitespace-nowrap text-lg leading-none text-ink">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </RevealItem>
          ))}
        </ol>

        <div className="border-t-2 border-ink" />

        {/* ------------------------------------------------------------------ */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <p className="label border-t-2 border-ink pt-4">
              Also on the shelf
            </p>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-9 lg:gap-12">
            {sideProjects.map((side, i) => (
              <RevealItem key={side.title} index={i}>
                <article>
                  <p className="label">
                    {side.kicker} &nbsp;/&nbsp; {side.period}
                  </p>
                  <h3 className="mt-3 text-[1.375rem] leading-[1.2]">
                    {side.title}
                  </h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-ink-2">
                    {side.summary}
                  </p>
                  <p className="label mt-4 border-t border-rule pt-3">
                    {side.meta}
                  </p>
                </article>
              </RevealItem>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
