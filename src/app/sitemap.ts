import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * The site is a single page, so only the root URL is indexable. Hash
 * fragments (#about, #services, …) are not separate URLs and must never be
 * listed here — they only create junk entries in Search Console.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
