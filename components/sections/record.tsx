import { Shell, SectionHead } from "@/components/ui/primitives";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { timeline } from "@/content/profile";

export function Record() {
  return (
    <section id="record" className="scroll-mt-24 bg-paper-2 py-16 sm:py-24">
      <Shell>
        <Reveal>
          <SectionHead
            number="04"
            eyebrow="The record"
            title="Working backwards from now"
          />
        </Reveal>

        <ol className="mt-14 border-t-2 border-ink">
          {timeline.map((entry, i) => (
            <RevealItem as="li" key={entry.title} index={i} step={0.06}>
              <div className="grid gap-3 border-b border-rule py-8 sm:grid-cols-12 sm:gap-8">
                <p className="serif figs text-2xl leading-none text-accent sm:col-span-2">
                  {entry.year}
                </p>
                <div className="sm:col-span-10">
                  <h3 className="text-[1.375rem] leading-tight">{entry.title}</h3>
                  <p className="label mt-2">{entry.org}</p>
                  <p className="mt-4 max-w-[62ch] text-[0.9375rem] leading-[1.72] text-ink-2">
                    {entry.text}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
