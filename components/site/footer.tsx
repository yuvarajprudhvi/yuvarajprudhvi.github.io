import { Shell } from "@/components/ui/primitives";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-rule py-10">
      <Shell>
        <p className="serif text-lg leading-none">{profile.name}</p>
        <p className="label mt-3">
          {profile.location} &nbsp;/&nbsp; {profile.availability}
        </p>
        <p className="label mt-1.5">{profile.relocation}</p>
      </Shell>
    </footer>
  );
}
