import Link from "next/link";
import { Shell, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { tracks } from "@/content/profile";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 bg-paper-2 py-16 sm:py-24">
      <Shell>
        <Reveal>
          <SectionHead
            number="02"
            eyebrow="Two halves of the same job"
            title="I want to be the analyst who has also built the thing"
            lead="Security work and infrastructure work get advertised as separate careers. On a small team they are the same person before lunch."
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          {tracks.map((track, i) => (
            <RevealItem key={track.id} index={i} step={0.1}>
              <div className="border-t-2 border-ink pt-5">
                <div className="flex items-baseline gap-4">
                  <span className="serif text-2xl leading-none text-accent">
                    {track.number}
                  </span>
                  <h3 className="text-[1.625rem] leading-tight">{track.title}</h3>
                </div>

                <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-ink-2">
                  {track.blurb}
                </p>

                <ul className="mt-8">
                  {track.points.map((point) => (
                    <li key={point.text} className="border-t border-rule py-5">
                      <p className="text-[0.9375rem] leading-[1.7] text-ink-2">
                        {point.text}
                      </p>
                      {point.evidence ? (
                        point.href ? (
                          <Link
                            href={point.href}
                            className="label ulink-static mt-2.5 inline-block text-accent"
                          >
                            {point.evidence}
                          </Link>
                        ) : (
                          <p className="label mt-2.5">{point.evidence}</p>
                        )
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </div>
      </Shell>
    </section>
  );
}
