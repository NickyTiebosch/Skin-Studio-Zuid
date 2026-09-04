import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/**
 * Groeit mee met de site: elke nieuwe pagina hoort hier een regel te krijgen,
 * zodat zoekmachines hem vinden zonder erop te hoeven stuiten via een link.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const bijgewerkt = new Date()

  return [
    {
      url: SITE_URL,
      lastModified: bijgewerkt,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacybeleid`,
      lastModified: bijgewerkt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
