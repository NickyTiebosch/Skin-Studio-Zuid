import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { behandelingen } from "@/lib/behandelingen"
import { heeftTarieven } from "@/lib/tarieven"
import { bijgewerktOp } from "@/lib/bijgewerkt"

/**
 * Groeit mee met de site: elke nieuwe pagina hoort hier een regel te krijgen,
 * zodat zoekmachines hem vinden zonder erop te hoeven stuiten via een link.
 *
 * `lastModified` komt per pagina uit `lib/bijgewerkt.ts`. Tot 9 oktober 2026
 * stond hier de buildtijd, waardoor elke deploy álle pagina's als gewijzigd
 * meldde — en Google negeert een `lastmod` die niet consequent klopt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: bijgewerktOp("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Behandelpagina's uit de gedeelde bron, zodat een nieuwe behandeling
    // automatisch in de sitemap komt.
    ...behandelingen.map((behandeling) => ({
      url: `${SITE_URL}/${behandeling.slug}`,
      lastModified: bijgewerktOp(`/${behandeling.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    // Alleen in de sitemap zodra er echt tarieven op staan; de pagina zelf
    // staat tot die tijd op noindex en dat mag geen tegenstrijdig signaal geven.
    ...(heeftTarieven()
      ? [
          {
            url: `${SITE_URL}/tarieven`,
            lastModified: bijgewerktOp("/tarieven"),
            changeFrequency: "monthly" as const,
            priority: 0.9,
          },
        ]
      : []),
    {
      url: `${SITE_URL}/boeken`,
      lastModified: bijgewerktOp("/boeken"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: bijgewerktOp("/contact"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacybeleid`,
      lastModified: bijgewerktOp("/privacybeleid"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
