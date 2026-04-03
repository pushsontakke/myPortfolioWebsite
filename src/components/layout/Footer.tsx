import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { SITE, FOOTER_LINKS } from "@/lib/constants";

const socialLinks = [
  { icon: Github, href: SITE.socials.github },
  { icon: Linkedin, href: SITE.socials.linkedin },
  { icon: Mail, href: `mailto:${SITE.email}` },
];

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 relative bg-surface border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
          {/* Left */}
          <div className="text-center lg:text-left">
            <span className="font-display font-extrabold text-[1.3rem] text-content">
              {SITE.name}
            </span>
            <p className="mt-1.5 text-label text-content-muted">
              {SITE.tagline}
            </p>
          </div>

          {/* Center — Nav links */}
          <div className="flex gap-8">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.85rem] text-content-muted transition-all duration-200 hover:text-content"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — Social icons */}
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-xl text-content-muted border border-border-subtle bg-surface-card/30 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
              >
                <Icon
                  size={15}
                  strokeWidth={1.5}
                  className="transition-colors duration-200 group-hover:text-accent"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-6 flex flex-col items-center gap-2 border-t border-border-subtle/30">
          <p className="flex items-center gap-1 text-small text-content-faint">
            Built with{" "}
            <Heart size={10} className="text-accent" /> using Next.js ·
            Designed in Figma
          </p>
          <p className="text-small text-content-faint">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}