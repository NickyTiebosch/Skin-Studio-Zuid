/**
 * De aanvraagkalender op /boeken.
 *
 * Dit is bewust een aanvraag, geen boeking: de site kent de agenda van de
 * kliniek nog niet (dat wordt Cal.com op de iCloud-agenda, zie
 * docs/te-controleren.md), dus een gekozen datum is een voorkeur die de
 * kliniek per e-mail of telefoon bevestigt. Wat hier staat is alles wat de
 * kalender over de kliniek aanneemt; klopt iets niet, dan is het hier één
 * regel.
 */
import { format, isValid, parseISO, startOfToday } from "date-fns"
import { nl } from "date-fns/locale/nl"

export const DAGDELEN = [
  { id: "ochtend", label: "Ochtend" },
  { id: "middag", label: "Middag" },
  { id: "avond", label: "Avond" },
  { id: "geen-voorkeur", label: "Geen voorkeur" },
] as const

export type DagdeelId = (typeof DAGDELEN)[number]["id"]

export const STANDAARD_DAGDEEL: DagdeelId = "geen-voorkeur"

export function isDagdeel(waarde: unknown): waarde is DagdeelId {
  return DAGDELEN.some((d) => d.id === waarde)
}

export function labelDagdeel(id: DagdeelId): string {
  return DAGDELEN.find((d) => d.id === id)?.label ?? id
}

/** 0 = zondag. Nog te bevestigen door de kliniek; de site zegt "op afspraak". */
export const GESLOTEN_WEEKDAGEN: number[] = [0]

/** Hoe ver vooruit een datum gekozen kan worden. */
export const MAANDEN_VOORUIT = 3

export type Afspraak = {
  /** Zoals in de aanvraag en de bevestiging: "Gezichtsbehandeling". */
  naam: string
  /** Uitleg boven de kalender, waar die nodig is. */
  toelichting?: string
}

/**
 * Welke keuze in het formulier tot welke afspraak leidt. "overig" staat er
 * bewust niet in: daar hoort een bericht bij, geen datum.
 *
 * Laserontharing begint altijd met een intake (zie de veelgestelde vragen op
 * de behandelpagina), dus wie laserontharing kiest, vraagt een intake aan.
 */
export const AFSPRAAK_PER_KEUZE: Record<string, Afspraak> = {
  gezichtsbehandeling: { naam: "Gezichtsbehandeling" },
  laserontharing: {
    naam: "Intakegesprek laserontharing",
    toelichting:
      "Laserontharing begint altijd met een gratis intakegesprek. Kies hieronder een datum voor de intake; de behandeldata leggen we daarna samen vast.",
  },
  consult: { naam: "Gratis intakegesprek" },
}

export function afspraakVoor(keuze: string | undefined): Afspraak | undefined {
  return keuze ? AFSPRAAK_PER_KEUZE[keuze] : undefined
}

/** ISO-datum (yyyy-MM-dd) → Date; undefined als hij niet klopt of voorbij is. */
export function parseAfspraakdatum(waarde: unknown): Date | undefined {
  if (typeof waarde !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(waarde)) {
    return undefined
  }
  const datum = parseISO(waarde)
  if (!isValid(datum) || datum < startOfToday()) return undefined
  return datum
}

/** Voor het formulier en de mail: "donderdag 12 september 2026". */
export function formatteerDatum(datum: Date): string {
  return format(datum, "EEEE d MMMM yyyy", { locale: nl })
}

/** Voor de onderwerpregel: "do 12 sep". */
export function formatteerDatumKort(datum: Date): string {
  return format(datum, "EEEEEE d MMM", { locale: nl })
}

/** De eerste letter groot, voor maandnamen die date-fns klein schrijft. */
export function metHoofdletter(tekst: string): string {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1)
}
