import { SITE } from "@/lib/constants";

export const PRODUCTION_ORIGIN = "https://portfolio.elixirflow.in";

export const IS_INDEXABLE_DEPLOYMENT =
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

export const SEO_TITLE = "Piyush Sontakke | Full-Stack & AI Engineer";

export const SEO_DESCRIPTION =
  "Full-stack and AI engineer building Python/Django backends, React/Next.js interfaces, and agentic AI applications.";

export const SOCIAL_IMAGE = {
  url: "/ps-circle.png",
  width: 1080,
  height: 1080,
  alt: "Piyush Sontakke monogram",
} as const;

const personId = `${PRODUCTION_ORIGIN}/#person`;
const websiteId = `${PRODUCTION_ORIGIN}/#website`;

export const PORTFOLIO_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${PRODUCTION_ORIGIN}/#profile-page`,
      url: `${PRODUCTION_ORIGIN}/`,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": websiteId },
      mainEntity: {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        url: `${PRODUCTION_ORIGIN}/`,
        image: `${PRODUCTION_ORIGIN}${SOCIAL_IMAGE.url}`,
        jobTitle: "Full-Stack & AI Engineer",
        sameAs: [
          SITE.socials.github,
          SITE.socials.linkedin,
          SITE.socials.twitter,
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${PRODUCTION_ORIGIN}/`,
      name: "Piyush Sontakke Portfolio",
      description: SEO_DESCRIPTION,
      inLanguage: "en-IN",
      about: { "@id": personId },
    },
  ],
} as const;

export const SERIALIZED_PORTFOLIO_JSON_LD = JSON.stringify(
  PORTFOLIO_JSON_LD,
).replace(/</g, "\\u003c");
