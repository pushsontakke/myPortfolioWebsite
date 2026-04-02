
// Assembles the layout shell — imports Sidebar, CursorGlow, and placeholder sections
import { CursorGlow } from "@/components/ui/CursorGlow";
import { Sidebar } from "@/components/layout/Sidebar";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";

function SectionPlaceholder({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center border-b border-border-subtle"
    >
      <p className="font-display text-2xl text-content-muted">{label} - In_progress</p>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative noise-overlay">
      <CursorGlow />
      <Sidebar />

      <main className="relative z-[2] lg:ml-[220px]">
        <Hero/>
        <About/>
        <Skills/>
        <Experience />
        <SectionPlaceholder id="projects" label="Projects" />
        <SectionPlaceholder id="services" label="Services" />
        <SectionPlaceholder id="testimonials" label="Testimonials" />
        <SectionPlaceholder id="education" label="Education" />
        <SectionPlaceholder id="contact" label="Contact" />
      </main>
    </div>
  );
}

// export default function Home() {
//   return (
//     <div className="my-28">
//     <div className="text-center text-8xl font-bold text-yellow-500">Portfolio | Piyush Sontakke
//   </div>
//     <div className="text-center text-7xl text-yellow-300">Product Engineer who ships - not just codes</div>
//     </div>
//   );
// }
