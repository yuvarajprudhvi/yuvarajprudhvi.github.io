import { Shell } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/content/profile";

const CHANNELS = [
  {
    label: "Phone",
    value: profile.phoneDisplay,
    href: `tel:${profile.phoneTel}`,
  },
  { label: "WhatsApp", value: profile.phoneDisplay, href: profile.whatsapp, external: true },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yuvarajprudhvi",
    href: profile.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/yuvarajprudhvi",
    href: profile.github,
    external: true,
  },
  {
    label: "TryHackMe",
    value: "tryhackme.com/p/iamalsouser",
    href: profile.tryhackme,
    external: true,
  },
  { label: "CV", value: "One page, PDF", href: profile.resume, download: true },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-ink py-20 text-[color:#cfc9bd] sm:py-28"
    >
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            {/* same shape as the other four section heads: number, gap, eyebrow */}
            <div className="flex items-baseline gap-4">
              <span className="label text-paper">05</span>
              <span className="label text-[color:#b9b2a4]">Contact</span>
            </div>
            <h2 className="mt-6 max-w-[14ch] text-balance text-[2.5rem] leading-[1.05] text-paper sm:text-[3.5rem]">
              If you are hiring for a SOC or a service desk, I would like to
              hear from you.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.72]">
              Happy to walk through anything on this site line by line. The
              write-ups are the honest version, including the parts where it
              took three attempts.
            </p>

            <dl className="mt-10 max-w-[26rem] border-t border-[color:rgba(247,244,238,0.24)]">
              <div className="grid grid-cols-12 gap-4 border-b border-[color:rgba(247,244,238,0.24)] py-3">
                <dt className="label col-span-4 pt-0.5 text-[color:#b9b2a4]">
                  Based in
                </dt>
                <dd className="col-span-8 text-[0.9375rem]">
                  {profile.location}
                </dd>
              </div>
              <div className="grid grid-cols-12 gap-4 border-b border-[color:rgba(247,244,238,0.24)] py-3">
                <dt className="label col-span-4 pt-0.5 text-[color:#b9b2a4]">
                  Status
                </dt>
                <dd className="col-span-8 text-[0.9375rem]">
                  {profile.availability}
                </dd>
              </div>
              <div className="grid grid-cols-12 gap-4 border-b border-[color:rgba(247,244,238,0.24)] py-3">
                <dt className="label col-span-4 pt-0.5 text-[color:#b9b2a4]">
                  Relocation
                </dt>
                <dd className="col-span-8 text-[0.9375rem]">
                  {profile.relocation}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <dl className="border-t border-[color:rgba(247,244,238,0.24)]">
              {CHANNELS.map((c) => (
                <div
                  key={c.label}
                  className="border-b border-[color:rgba(247,244,238,0.24)]"
                >
                  <a
                    href={c.href}
                    download={c.download || undefined}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex cursor-pointer items-baseline justify-between gap-4 py-4 transition-colors duration-200 hover:text-paper"
                  >
                    <span className="label text-[color:#b9b2a4] transition-colors group-hover:text-paper">
                      {c.label}
                    </span>
                    <span className="flex items-baseline gap-3 break-all text-right text-[0.9375rem]">
                      {c.value}
                      <span
                        aria-hidden="true"
                        className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </a>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
