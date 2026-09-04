import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { behandelingen } from "@/lib/behandelingen"

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
    // Behandelpagina's uit de gedeelde bron, zodat een nieuwe behandeling
    // automatisch in de sitemap komt.
    ...behandelingen.map((behandeling) => ({
      url: `${SITE_URL}/${behandeling.slug}`,
      lastModified: bijgewerkt,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/boeken`,
      lastModified: bijgewerkt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacybeleid`,
      lastModified: bijgewerkt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
