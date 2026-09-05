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
  plaats: "'s-Hertogenbosch",
  land: "NL",
} as const

/** Weergavevorm, zoals de bezoeker het nummer leest. */
export const TELEFOON_WEERGAVE = "073 689 6423"

/** Internationale vorm voor tel:-links en structured data. */
export const TELEFOON_HREF = "tel:+31736896423"

export const EMAIL = "info@skinstudiozuid.nl"

export const EMAIL_HREF = `mailto:${EMAIL}`

export const INSTAGRAM = "https://www.instagram.com/skinstudio_zuid"

/**
 * Openingstijden zijn bewust nog niet ingevuld: er staat op de site alleen
 * "Op afspraak". Zodra de echte tijden bekend zijn horen ze hier te komen,
 * zodat ze meteen ook in de structured data en Google Business Profile kloppen.
 */
export const OPENINGSTIJDEN_TEKST = "Op afspraak"
