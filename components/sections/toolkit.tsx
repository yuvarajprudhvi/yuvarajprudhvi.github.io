import { Shell, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { skills, certifications, training, education } from "@/content/profile";

export function Toolkit() {
  return (
    <section id="toolkit" className="scroll-mt-24 py-16 sm:py-24">
      <Shell>
        <Reveal>
          <SectionHead
            number="03"
            eyebrow="Toolkit"
            title="What I can pick up on the first morning"
            lead="Listed the way I would use them rather than padded out to look longer. Exams and course completions are kept apart, because they are not the same thing."
          />
        </Reveal>

        <dl className="mt-14 border-t-2 border-ink">
          {skills.map((group, i) => (
            <RevealItem key={group.group} index={i} step={0.04}>
              <div className="grid gap-2 border-b border-rule py-5 sm:grid-cols-12 sm:gap-8">
                <dt className="label pt-1 sm:col-span-3">{group.group}</dt>
                {/* capped at the site's prose measure; the full column ran to
                    ~100 characters a line, well past comfortable reading */}
                <dd className="max-w-[64ch] text-[1.0625rem] leading-[1.6] text-ink-2 sm:col-span-9">
                  {group.items}
                </dd>
              </div>
            </RevealItem>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- education ---- */}
          <Reveal className="lg:col-span-4">
            <h3 className="label border-t-2 border-ink pt-4 text-ink">
              Education
            </h3>
            <p className="serif mt-5 text-[1.25rem] leading-snug">
              {education.degree}
            </p>
            <p className="mt-4 text-[0.9375rem] text-ink-2">
              {education.university}
            </p>
            <p className="label mt-1.5">{education.graduated}</p>
            <p className="mt-4 text-[0.875rem] leading-[1.6] text-ink-3">
              Coursework: {education.coursework}
            </p>
          </Reveal>

          {/* ---- certifications ---- */}
          <Reveal delay={0.06} className="lg:col-span-4">
            <h3 className="label border-t-2 border-ink pt-4 text-ink">
              Certification
            </h3>
            <ul className="mt-5">
              {certifications.map((c) => (
                <li key={c.name} className="border-b border-rule pb-5">
                  <p className="serif text-[1.25rem] leading-snug">{c.name}</p>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-2">
                    {c.issuer}
                  </p>
                  <p className="label mt-1.5">{c.detail}</p>
                  {c.credentialId ? (
                    <p className="mt-3 break-all font-mono text-[0.75rem] leading-relaxed text-ink-3">
                      ID {c.credentialId}
                    </p>
                  ) : null}
                  {c.verify ? (
                    <a
                      href={c.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ulink-static mt-2 inline-block text-[0.875rem] text-ink-2"
                    >
                      Verify with AWS
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- training ---- */}
          <Reveal delay={0.12} className="lg:col-span-4">
            <h3 className="label border-t-2 border-ink pt-4 text-ink">
              Training and learning paths
            </h3>
            <ul className="mt-5">
              {training.map((t) => (
                <li key={t.name} className="border-b border-rule py-4 first:pt-0">
                  <p className="text-[1.0625rem] leading-snug text-ink">
                    {t.name}
                  </p>
                  <p className="mt-1 text-[0.875rem] text-ink-2">{t.issuer}</p>
                  <p className="label mt-1.5">{t.detail}</p>
                  {t.credentialId ? (
                    <p className="mt-2 font-mono text-[0.75rem] text-ink-3">
                      {t.credentialId}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
