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
