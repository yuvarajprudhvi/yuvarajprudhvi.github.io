import { Shell } from "@/components/ui/primitives";
import { profile, colophon } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-rule py-10">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="serif text-lg leading-none">{profile.name}</p>
            <p className="label mt-3">
              {profile.location} &nbsp;/&nbsp; {profile.availability}
            </p>
            <p className="label mt-1.5">{profile.relocation}</p>
          </div>

          <p className="max-w-[52ch] text-[0.8125rem] leading-[1.7] text-ink-3 lg:col-span-6 lg:col-start-7">
            {colophon}
          </p>
        </div>
      </Shell>
    </footer>
  );
}
