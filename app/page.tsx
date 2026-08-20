import { Hero } from "@/components/sections/hero";
import { WorkIndex } from "@/components/sections/work-index";
import { Approach } from "@/components/sections/approach";
import { Toolkit } from "@/components/sections/toolkit";
import { Record } from "@/components/sections/record";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkIndex />
      <Approach />
      <Toolkit />
      <Record />
      <Contact />
    </>
  );
}
