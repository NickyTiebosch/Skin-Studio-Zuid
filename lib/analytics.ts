import { track } from "@vercel/analytics"

/**
 * Meetgebeurtenissen en toestemmingsbeheer.
 *
 * Twee lagen met verschillende doelen:
 *
 * - Vercel Analytics draait altijd. Die zet geen cookies en volgt bezoekers
 *   niet individueel, dus daar is geen toestemming voor nodig. Dit is de
 *   betrouwbare basis voor "hoeveel bezoekers komen er" én, sinds 10 oktober
 *   2026, voor de conversies: elke gebeurtenis hieronder gaat ook als
 *   "custom event" naar Vercel, zodat bellen, mailen en aanvragen geteld
 *   worden óók als de bezoeker de cookiebanner weigert.
 * - Google Analytics laadt pas ná expliciete toestemming en vult de rest in:
 *   welke bron, welke campagne, de funnel per pagina.
 *
 * Het gevolg van dat onderscheid is belangrijk om te weten bij het lezen van
 * de cijfers: bezoekers die de banner wegklikken verdwijnen uit Google
 * Analytics maar niet uit Vercel Analytics. Vercel is dus de volledige
 * telling; Google Analytics de verrijkte deelverzameling.
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
  | "click_instagram"
  /** Klik op een "Afspraak maken"-knop; `plek` zegt welke. */
  | "click_afspraak"
  | "generate_lead"
  | "view_tarieven"
  | "booking_started"
  | "booking_completed"

/**
 * De klik-gebeurtenissen die via een `data-analytics`-attribuut op een link
 * worden gemeld, zodat de knoppen zelf geen meetcode bevatten. Een optioneel
 * `data-analytics-plek` zegt waar de knop stond (hero, menu, footer, …).
 */
export const KLIK_GEBEURTENISSEN: ReadonlySet<string> = new Set([
  "click_telefoon",
  "click_email",
  "click_instagram",
  "click_afspraak",
])

export function isKlikGebeurtenis(naam: string | undefined): naam is Gebeurtenis {
  return naam !== undefined && KLIK_GEBEURTENISSEN.has(naam)
}

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
 * Registreert een gebeurtenis bij Vercel Analytics (altijd) en bij Google
 * Analytics (alleen als dat na toestemming geladen is). Aanroepen is dus
 * altijd veilig; de aanroeper hoeft niet te weten of er gemeten wordt.
 *
 * Vercel accepteert alleen platte waarden (tekst, getal, boolean, null) als
 * eigenschappen; geneste objecten worden stilzwijgend genegeerd. Houd de
 * gegevens daarom plat.
 */
export function meld(
  gebeurtenis: Gebeurtenis,
  gegevens?: Record<string, string | number | boolean | null>
) {
  if (typeof window === "undefined") return
  try {
    track(gebeurtenis, gegevens)
  } catch {
    // Een meetfout mag nooit de pagina breken.
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", gebeurtenis, gegevens ?? {})
  }
}
