/**
 * Meetgebeurtenissen en toestemmingsbeheer.
 *
 * Twee lagen met verschillende doelen:
 *
 * - Vercel Analytics draait altijd. Die zet geen cookies en volgt bezoekers
 *   niet individueel, dus daar is geen toestemming voor nodig. Dit is de
 *   betrouwbare basis voor "hoeveel bezoekers komen er".
 * - Google Analytics laadt pas ná expliciete toestemming en vult de rest in:
 *   welke pagina's, welke bron, welke stap in de funnel.
 *
 * Het gevolg van dat onderscheid is belangrijk om te weten bij het lezen van
 * de cijfers: bezoekers die de banner wegklikken verdwijnen uit Google
 * Analytics maar niet uit Vercel Analytics. De bezoekersaantallen blijven dus
 * altijd kloppen, ook als de funnelcijfers een deel missen.
 */

/** Zonder ID wordt Google Analytics helemaal niet geladen. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const CONSENT_OPSLAGSLEUTEL = "ssz-cookie-toestemming"

export type Toestemming = "verleend" | "geweigerd"

/**
 * De gebeurtenissen die we meten. Als vaste lijst, zodat een typfout in een
 * naam niet stilzwijgend een gebeurtenis oplevert die nergens in de
 * rapportage terugkomt.
 */
export type Gebeurtenis =
  | "click_telefoon"
  | "click_email"
  | "generate_lead"
  | "view_tarieven"
  | "booking_started"
  | "booking_completed"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Leest de eerder gemaakte keuze; `null` betekent: nog niet gekozen. */
export function leesToestemming(): Toestemming | null {
  if (typeof window === "undefined") return null
  try {
    const waarde = window.localStorage.getItem(CONSENT_OPSLAGSLEUTEL)
    return waarde === "verleend" || waarde === "geweigerd" ? waarde : null
  } catch {
    // Privémodus of geblokkeerde opslag: dan behandelen we het als "nog niet
    // gekozen" en vragen we het opnieuw, in plaats van de pagina te breken.
    return null
  }
}

export function slaToestemmingOp(keuze: Toestemming) {
  try {
    window.localStorage.setItem(CONSENT_OPSLAGSLEUTEL, keuze)
  } catch {
    // Niet kunnen opslaan is vervelend maar niet fataal; de bezoeker krijgt
    // de vraag dan bij een volgend bezoek opnieuw.
  }
}

/**
 * Registreert een gebeurtenis. Doet niets wanneer Google Analytics niet is
 * geladen — zonder toestemming, of zonder measurement ID. Aanroepen is dus
 * altijd veilig; de aanroeper hoeft niet te weten of er gemeten wordt.
 */
export function meld(gebeurtenis: Gebeurtenis, gegevens?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", gebeurtenis, gegevens ?? {})
}
