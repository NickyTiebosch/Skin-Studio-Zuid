/**
 * Wanneer de inhoud van een pagina voor het laatst is gewijzigd.
 *
 * Twee gebruikers: de sitemap (`lastmod`) en de regel "Bijgewerkt op" onderaan
 * de pagina. De sitemap zette tot 9 oktober 2026 op álle pagina's de
 * buildtijd, waardoor elke deploy aan Google vertelde dat alles vandaag was
 * veranderd. Google vertrouwt `lastmod` alleen als hij consequent klopt, en
 * negeert hem anders. Een zichtbare datum is bovendien een actualiteitssignaal
 * voor AI-assistenten, die verouderde pagina's links laten liggen.
 *
 * Werk de datum bij wanneer de inhoud van die pagina verandert — niet bij
 * een technische wijziging.
 */
export const BIJGEWERKT: Record<string, string> = {
  "/": "2026-10-09",
  "/laserontharing": "2026-10-09",
  "/gezichtsbehandelingen": "2026-10-09",
  "/tarieven": "2026-09-07",
  "/contact": "2026-10-09",
  "/boeken": "2026-09-07",
  "/privacybeleid": "2026-09-04",
}

/** De datum voor de sitemap; valt terug op vandaag voor een onbekende route. */
export function bijgewerktOp(pad: string): Date {
  const datum = BIJGEWERKT[pad]
  return datum ? new Date(datum) : new Date()
}

/** "9 oktober 2026", zoals de bezoeker de datum leest. */
export function bijgewerktTekst(pad: string): string {
  const datum = BIJGEWERKT[pad]
  if (!datum) return ""
  return new Date(datum).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
