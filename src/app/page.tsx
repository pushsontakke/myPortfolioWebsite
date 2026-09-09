
// Assembles the layout shell, importing the site sections and shared effects.
import type { Metadata } from "next";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { Sidebar } from "@/components/layout/Sidebar";

import { ScrollToTop } from "@/components/layout/ScrollToTop";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
// import { Testimonials } from "@/components/sections/Testimonials";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import {
  IS_INDEXABLE_DEPLOYMENT,
  PRODUCTION_ORIGIN,
  SEO_DESCRIPTION,
  SEO_TITLE,
  SOCIAL_IMAGE,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_ORIGIN),
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  robots: IS_INDEXABLE_DEPLOYMENT
    ? undefined
    : { index: false, follow: false, noarchive: true },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: SOCIAL_IMAGE.url,
    apple: SOCIAL_IMAGE.url,
  },
  openGraph: {
    type: "profile",
    url: "/",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    siteName: "Piyush Sontakke Portfolio",
    locale: "en_IN",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
    creator: "@PiyushSontakke4",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden noise-overlay">
      <CursorGlow />
      <Sidebar />
      <ScrollToTop />

      <main className="relative z-[2] overflow-x-hidden lg:ml-[220px]">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        {/* <Testimonials /> */}
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
