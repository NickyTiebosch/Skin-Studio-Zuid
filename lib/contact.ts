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

/**
 * De naam zoals de bezoeker hem leest, op 9 oktober 2026 op verzoek van de
 * kliniek één woord geworden. Dat volgt de schrijfwijze van de kliniek zelf en
 * van de Instagram-naam (`skinstudio_zuid`).
 *
 * Let op de twee plekken die hier bewust van afwijken: het logo
 * (`Images/logo-skin-studio-zuid.png`) is een foto-bestand waarin "Skin Studio"
 * in schrijfletters staat, en het domein heeft een koppelteken. Alleen de
 * geschreven naam verandert mee met deze regel.
 *
 * Alles wat de bezoeker ziet leest hier: paginatitels, de deelafbeelding, de
 * footer, de structured data. Stond dit ergens met de hand ingetypt, dan liep
 * het vroeg of laat uit elkaar — zie de toelichting boven aan dit bestand.
 */
export const BEDRIJFSNAAM = "Skinstudio Zuid"

export const ADRES = {
  straat: "Hildebrandstraat 8",
  plaats: "'s-Hertogenbosch",
  land: "NL",
} as const

/** Weergavevorm, zoals de bezoeker het nummer leest. */
export const TELEFOON_WEERGAVE = "073 689 6423"

/** Internationale vorm voor tel:-links en structured data. */
export const TELEFOON_HREF = "tel:+31736896423"

/**
 * Het adres volgt het domein dat op 9 oktober 2026 is vastgelegd:
 * skinstudio-zuid.nl, mét koppelteken. Het oude `skinstudiozuid.nl` zonder
 * koppelteken stond los bij TransIP en heeft nooit post kunnen ontvangen.
 * Zodra de kliniek bevestigt welk postvak er echt komt, is dit de enige regel
 * die hoeft te wijzigen — de site, de structured data en llms.txt lezen hier.
 */
export const EMAIL = "info@skinstudio-zuid.nl"

export const EMAIL_HREF = `mailto:${EMAIL}`

export const INSTAGRAM = "https://www.instagram.com/skinstudio_zuid"

/**
 * Openingstijden zijn bewust nog niet ingevuld: er staat op de site alleen
 * "Op afspraak". Zodra de echte tijden bekend zijn horen ze hier te komen,
 * zodat ze meteen ook in de structured data en Google Business Profile kloppen.
 */
export const OPENINGSTIJDEN_TEKST = "Op afspraak"
