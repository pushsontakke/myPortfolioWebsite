import type { MetadataRoute } from "next";
import { IS_INDEXABLE_DEPLOYMENT, PRODUCTION_ORIGIN } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE_DEPLOYMENT) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PRODUCTION_ORIGIN}/sitemap.xml`,
    host: PRODUCTION_ORIGIN,
  };
}
