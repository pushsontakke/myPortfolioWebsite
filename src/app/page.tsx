
// Assembles the layout shell — imports Sidebar, CursorGlow, and placeholder sections
import { CursorGlow } from "@/components/ui/CursorGlow";
import { Sidebar } from "@/components/layout/Sidebar";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen relative noise-overlay">
      <CursorGlow />
      <Sidebar />

      <main className="relative z-[2] lg:ml-[220px]">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Testimonials />
        <Education />
        <Contact />
      </main>
    </div>
  );
}