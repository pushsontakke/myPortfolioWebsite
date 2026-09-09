import type { MetadataRoute } from "next";
import { PRODUCTION_ORIGIN } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${PRODUCTION_ORIGIN}/` }];
}
