import type { MetadataRoute } from "next"
import { IS_PREVIEW, SITE_URL } from "@/lib/site"

/**
 * De crawlers van AI-assistenten worden hier bewust NIET geblokkeerd.
 *
 * Dat is de meest gemaakte fout bij het optimaliseren voor AI-zoekmachines:
 * ChatGPT, Perplexity en Google AI Overviews kunnen alleen naar een bedrijf
 * verwijzen als ze de pagina's mogen lezen. Voor een kliniek die gevonden
 * wil worden is elke vermelding in zo'n antwoord waardevol, dus laten we ze
 * expliciet toe in plaats van het aan de standaardinstelling over te laten.
 */
export default function robots(): MetadataRoute.Robots {
  // Een preview-deploy op Vercel is publiek bereikbaar. Zou die geïndexeerd
  // worden, dan concurreert hij met het echte domein om dezelfde teksten.
  if (IS_PREVIEW) {
    return { rules: [{ userAgent: "*", disallow: "/" }] }
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // De API-route levert geen inhoud op die in zoekresultaten thuishoort.
        disallow: "/api/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "meta-externalagent",
        ],
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
