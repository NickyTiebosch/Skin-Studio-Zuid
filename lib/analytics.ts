import { track } from "@vercel/analytics"

/**
 * Meetgebeurtenissen.
 *
 * Twee lagen met verschillende doelen:
 *
 * - Vercel Analytics draait altijd. Die zet geen cookies en volgt bezoekers
 *   niet individueel. Dit is de betrouwbare basis voor "hoeveel bezoekers
 *   komen er" én, sinds 10 oktober 2026, voor de conversies: elke
 *   gebeurtenis hieronder gaat ook als "custom event" naar Vercel.
 * - Google Analytics vult de rest in: welke bron, welke campagne, de funnel
 *   per pagina. Sinds 18 oktober 2026 zonder cookiebanner, privacyvriendelijk
 *   ingesteld; de voorwaarden daarvoor staan in components/google-analytics.tsx.
 *
 * Bij het lezen van de cijfers: wie Google Analytics blokkeert, of in de oude
 * cookiebanner op "Weigeren" klikte, ontbreekt in Google Analytics maar wordt
 * door Vercel Analytics wel geteld. Vercel is dus de volledige telling;
 * Google Analytics de verrijkte deelverzameling.
 */

/** Zonder ID wordt Google Analytics helemaal niet geladen. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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

/**
 * De sleutel waaronder de cookiebanner tot 18 oktober 2026 de keuze van de
 * bezoeker bewaarde. Er wordt niets meer opgeslagen, alleen nog gelezen: wie
 * toen op "Weigeren" klikte, krijgt ook nu geen Google Analytics.
 */
const OUDE_TOESTEMMINGSSLEUTEL = "ssz-cookie-toestemming"

export function eerderGeweigerd(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(OUDE_TOESTEMMINGSSLEUTEL) === "geweigerd"
  } catch {
    // Privémodus of geblokkeerde opslag: dan is er ook geen oude keuze.
    return false
  }
}

/**
 * Registreert een gebeurtenis bij Vercel Analytics (altijd) en bij Google
 * Analytics (als dat geladen is). Aanroepen is dus altijd veilig; de
 * aanroeper hoeft niet te weten of er gemeten wordt.
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
