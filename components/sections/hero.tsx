import { Shell, InkButton, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { profile, stats } from "@/content/profile";

export function Hero() {
  return (
    <section className="relative">
      <Shell>
        {/* running strip, the line above a masthead */}
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 pb-3 pt-8 sm:pt-12">
          <span className="label">{profile.location}</span>
          <span className="label ml-auto hidden sm:inline">Portfolio / 2026</span>
        </div>

        <hr className="rule-double" />

        <Reveal>
          {/* w-fit shrinks the figure to the quote, so the credit right-aligns
              to the closing quote mark rather than to the page edge. */}
          <figure className="mt-10 w-fit sm:mt-14">
            <blockquote>
              {/* One line at every width, so the size is driven by the viewport
                  and capped once the shell stops growing. */}
              <p className="serif whitespace-nowrap text-[min(5.4vw,4.4rem)] italic leading-[1.1] tracking-[-0.02em]">
                &ldquo;{profile.headline}&rdquo;
              </p>
            </blockquote>
            <figcaption className="label mt-6 text-right">
              &mdash;&ensp;{profile.headlineCredit}
            </figcaption>
          </figure>
        </Reveal>

        {/* the bit a recruiter scans for: who, what, where, when */}
        <Reveal delay={0.06}>
          <div className="mt-12 border-t-2 border-ink pt-5 sm:mt-16">
            <h1 className="text-[1.75rem] leading-none sm:text-[2.25rem]">
              {profile.name}
            </h1>
            <p className="label mt-3 text-ink">{profile.roles}</p>
            <p className="mt-2 text-[0.9375rem] text-ink-3">
              {profile.qualification}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 pb-14 lg:grid-cols-12 lg:gap-16 lg:pb-20">
          <Reveal delay={0.12} className="lg:col-span-7">
            <p className="max-w-[54ch] text-pretty text-lg leading-[1.72] text-ink-2 sm:text-xl sm:leading-[1.66]">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <InkButton href="#work">Read the write-ups</InkButton>
              <TextLink href={profile.resume} download>
                Download CV
              </TextLink>
            </div>

            <dl className="mt-10 max-w-[34rem] border-t border-rule">
              <div className="grid grid-cols-12 gap-4 border-b border-rule py-3">
                <dt className="label col-span-4 pt-0.5">Status</dt>
                <dd className="col-span-8 flex items-center gap-2.5 text-[0.9375rem] text-ink-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {profile.availability}
                </dd>
              </div>
              <div className="grid grid-cols-12 gap-4 border-b border-rule py-3">
                <dt className="label col-span-4 pt-0.5">Relocation</dt>
                <dd className="col-span-8 text-[0.9375rem] text-ink-2">
                  {profile.relocation}
                </dd>
              </div>
              <div className="grid grid-cols-12 gap-4 border-b border-rule py-3">
                <dt className="label col-span-4 pt-0.5">Phone</dt>
                <dd className="col-span-8 text-[0.9375rem]">
                  <a
                    href={`tel:${profile.phoneTel}`}
                    className="ulink-static text-ink-2"
                  >
                    {profile.phoneDisplay}
                  </a>
                  <span className="text-ink-3"> &nbsp;/&nbsp; </span>
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ulink-static text-ink-2"
                  >
                    WhatsApp
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.18} className="lg:col-span-4 lg:col-start-9">
            <p className="label border-b border-rule pb-2">By the numbers</p>
            <dl className="mt-1">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-rule py-4">
                  <div className="leader">
                    <dt className="text-[0.9375rem] text-ink-2">
                      {s.href ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ulink-static"
                        >
                          {s.label}
                        </a>
                      ) : (
                        s.label
                      )}
                    </dt>
                    <dd className="serif figs text-2xl leading-none text-ink">
                      {s.value}
                    </dd>
                  </div>
                  <p className="mt-1.5 text-[0.8125rem] text-ink-3">{s.note}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
