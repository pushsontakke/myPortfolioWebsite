
// Assembles the layout shell — imports Sidebar, CursorGlow, and placeholder sections
import { CursorGlow } from "@/components/ui/CursorGlow";
import { Sidebar } from "@/components/layout/Sidebar";

function SectionPlaceholder({ id, label }: { id: string; label: string }) {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center border-b border-border-subtle"
    >
      <p className="font-display text-2xl text-content-muted">{label}</p>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative noise-overlay">
      <CursorGlow />
      <Sidebar />

      <main className="relative z-[2] lg:ml-[220px]">
        <SectionPlaceholder id="hero" label="Hero" />
        <SectionPlaceholder id="about" label="About" />
        <SectionPlaceholder id="skills" label="Skills" />
        <SectionPlaceholder id="experience" label="Experience" />
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
