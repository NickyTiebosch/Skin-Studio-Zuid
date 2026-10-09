/**
 * Contact- en bedrijfsgegevens op één plek.
 *
 * Deze stonden eerder los van elkaar in contact-section.tsx, footer.tsx en
 * app/api/contact/route.ts. Daardoor kon de footer jarenlang "Amsterdam Zuid"
 * blijven zeggen terwijl de kliniek in 's-Hertogenbosch zit — een tegenstrijdig
 * locatiesignaal waar Google en AI-modellen op afknappen.
 *
 * Alles wat de bezoeker over het bedrijf te zien krijgt, komt hiervandaan.
 */

export const BEDRIJFSNAAM = "Skin Studio Zuid"

export const ADRES = {
  straat: "Hildebrandstraat 8",
  /**
   * Volgens OpenStreetMap (opgezocht 9 oktober 2026); nog niet door de
   * kliniek bevestigd, zie docs/te-controleren.md.
   */
  postcode: "5216 VR",
  plaats: "'s-Hertogenbosch",
  land: "NL",
} as const

/**
 * De plaatsnaam zoals mensen hem intypen. In titels, koppen en de eerste
 * alinea van een pagina wint deze vorm; "'s-Hertogenbosch" blijft de
 * officiële naam in adresregels en structured data.
 */
export const PLAATS_ZOEKNAAM = "Den Bosch"

/**
 * Coördinaten van het adres, voor de structured data. Volgens OpenStreetMap
 * (9 oktober 2026). Een paar meter afwijking maakt voor Google niet uit;
 * een ander adres wel — controleer dit dus als de kliniek ooit verhuist.
 */
export const GEO = { latitude: 51.6831879, longitude: 5.3281354 } as const

/**
 * Waar de studio zit en waar klanten vandaan komen. Eén alinea op de site,
 * zodat Google en AI-assistenten weten voor welk gebied de kliniek relevant
 * is — zonder aparte pagina's per dorp, want dat telt sinds 2026 als
 * "scaled content abuse".
 */
export const WIJK = "in het zuiden van 's-Hertogenbosch"

export const WERKGEBIED = [
  "Vught",
  "Rosmalen",
  "Sint-Michielsgestel",
  "Vlijmen",
  "Engelen",
  "Boxtel",
] as const

/** Weergavevorm, zoals de bezoeker het nummer leest. */
export const TELEFOON_WEERGAVE = "073 689 6423"

/** Internationale vorm voor tel:-links en structured data. */
export const TELEFOON_HREF = "tel:+31736896423"

export const EMAIL = "info@skinstudiozuid.nl"

export const EMAIL_HREF = `mailto:${EMAIL}`

export const INSTAGRAM = "https://www.instagram.com/skinstudio_zuid"

/**
 * De spaarapp van de kliniek in Google Play. Hoort in `sameAs` van de
 * structured data: elk extern profiel dat dezelfde naam draagt, helpt Google
 * en AI-modellen het bedrijf als één entiteit te herkennen. De App
 * Store-variant ontbreekt nog omdat de URL niet bekend is.
 */
export const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=nl.skinstudiozuid.app"

/**
 * Openingstijden zijn bewust nog niet ingevuld: er staat op de site alleen
 * "Op afspraak". Zodra de echte tijden bekend zijn horen ze hier te komen,
 * zodat ze meteen ook in de structured data en Google Business Profile kloppen.
 */
export const OPENINGSTIJDEN_TEKST = "Op afspraak"
