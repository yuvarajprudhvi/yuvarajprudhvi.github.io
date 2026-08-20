import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, projectNeighbours } from "@/content/projects";
import { Blocks } from "@/components/case-study/blocks";
import { Reveal } from "@/components/ui/reveal";
import { Shell, TextLink } from "@/components/ui/primitives";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      /* Naming an openGraph object here replaces the inherited one, which drops
         the site-wide card, so the image has to be pointed at again by hand. */
      images: ["/opengraph-image"],
    },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = projectNeighbours(slug);

  return (
    <article>
      {/* ---------------- cover ---------------- */}
      <Shell>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-3 pt-6 sm:pt-10">
          <Link href="/#work" className="label ulink-static text-ink">
            &larr; Index
          </Link>
          <span className="label ml-auto">
            File {project.file} &nbsp;/&nbsp; {project.kicker}
          </span>
        </div>

        <hr className="rule-double" />

        <header className="pb-12 pt-10 sm:pb-16 sm:pt-14">
          <Reveal>
            <h1 className="max-w-[18ch] text-balance text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-[4.25rem]">
              {project.title}
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal delay={0.08} className="lg:col-span-7">
              <p className="max-w-[52ch] text-pretty text-lg leading-[1.7] text-ink-2">
                {project.summary}
              </p>

              <dl className="mt-9 max-w-[38rem] border-t border-rule">
                <div className="grid grid-cols-12 gap-4 border-b border-rule py-3">
                  <dt className="label col-span-4 pt-0.5">Role</dt>
                  <dd className="col-span-8 text-[0.9375rem] text-ink-2">
                    {project.role}
                  </dd>
                </div>
                <div className="grid grid-cols-12 gap-4 border-b border-rule py-3">
                  <dt className="label col-span-4 pt-0.5">Tools</dt>
                  <dd className="col-span-8 text-[0.9375rem] text-ink-2">
                    {project.tools.join(", ")}
                  </dd>
                </div>
                <div className="grid grid-cols-12 gap-4 border-b border-rule py-3">
                  <dt className="label col-span-4 pt-0.5">Filed</dt>
                  <dd className="col-span-8 text-[0.9375rem] text-ink-2">
                    {project.period}
                  </dd>
                </div>
                {project.pdf ? (
                  <div className="grid grid-cols-12 gap-4 border-b border-rule py-3">
                    <dt className="label col-span-4 pt-0.5">Original</dt>
                    <dd className="col-span-8">
                      <TextLink href={project.pdf} download>
                        Full report, PDF
                      </TextLink>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </Reveal>

            <Reveal delay={0.14} className="lg:col-span-4 lg:col-start-9">
              <p className="label border-b border-rule pb-2">
                {project.metricsLabel ?? "At a glance"}
              </p>
              <dl>
                {project.metrics.map((m) => (
                  <div key={m.label} className="border-b border-rule py-4">
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="serif figs block text-[2rem] leading-none text-ink">
                        {m.value}
                      </span>
                      <span className="mt-2 block text-[0.8125rem] leading-snug text-ink-3">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>
      </Shell>

      {/* ---------------- body ---------------- */}
      <Shell>
        <div className="border-t-2 border-ink">
          {project.sections.map((section, i) => (
            <section
              key={section.title}
              className="grid gap-x-16 gap-y-6 border-b border-rule py-12 lg:grid-cols-12 lg:py-16"
            >
              <div className="lg:col-span-3">
                <Reveal>
                  <p className="label sticky top-24">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-9">
                <Reveal>
                  <h2 className="mb-8 max-w-[24ch] text-balance text-[1.75rem] leading-[1.15] sm:text-[2.25rem]">
                    {section.title}
                  </h2>
                </Reveal>
                <Blocks blocks={section.blocks} firstParagraphDropcap={i === 0} />
              </div>
            </section>
          ))}
        </div>
      </Shell>

      {/* ---------------- onward ---------------- */}
      {prev && next ? (
        <Shell className="pb-6 pt-12">
          <nav aria-label="More case studies" className="grid gap-px bg-rule sm:grid-cols-2">
            <Link
              href={`/work/${prev.slug}`}
              className="group bg-paper py-6 pr-6 transition-colors duration-200 hover:bg-paper-2"
            >
              <p className="label">&larr; Previous, file {prev.file}</p>
              <p className="serif mt-2 text-2xl leading-tight transition-colors group-hover:text-accent">
                {prev.title}
              </p>
            </Link>
            <Link
              href={`/work/${next.slug}`}
              className="group bg-paper py-6 transition-colors duration-200 hover:bg-paper-2 sm:pl-6 sm:text-right"
            >
              <p className="label">Next, file {next.file} &rarr;</p>
              <p className="serif mt-2 text-2xl leading-tight transition-colors group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          </nav>
        </Shell>
      ) : null}
    </article>
  );
}
