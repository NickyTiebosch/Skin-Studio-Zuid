/**
 * De tarieven van Skin Studio Zuid.
 *
 * Overgenomen van de prijslijst- en actieflyer die de kliniek heeft
 * aangeleverd (mannen, september 2026). Twee regels waren op de foto lastig
 * te lezen door lichtweerkaatsing en staan als te controleren gemarkeerd in
 * docs/te-controleren.md.
 *
 * NOG NIET AANGELEVERD:
 * - De vrouwenprijzen voor laserontharing.
 * - De behandelduur per behandeling. Die staat op geen van beide flyers, en
 *   is technisch onmisbaar voor het boekingssysteem: zonder duur kan geen
 *   enkel systeem tijdsloten berekenen.
 */

export type Tariefregel = {
  naam: string
  /** Bedrag in hele euro's, of "gratis" voor een kosteloze dienst. */
  prijs: number | "gratis"
  /** Doorgestreepte prijs bij een aanbieding. */
  vanPrijs?: number
  toelichting?: string
  /** Nog nergens bekend; nodig voor het boekingssysteem. */
  duurMinuten?: number
}

export type Tariefgroep = {
  id: string
  titel: string
  toelichting?: string
  regels: Tariefregel[]
}

export type Kuur = {
  titel: string
  omvat: string
  aantalBehandelingen: number
  normalePrijsPerBehandeling: number
  kuurprijs: number
  perBehandelingInKuur: number
  /** Extra korting wanneer de hele kuur in één keer wordt afgerekend. */
  prijsBijEenmaligeAfname?: number
  perBehandelingBijEenmaligeAfname?: string
}

/**
 * De doelgroepen. Vrouwen staat er bewust al in met een lege lijst: zodra die
 * prijzen binnen zijn hoeft alleen `regels` gevuld te worden en verschijnt de
 * hele sectie vanzelf, inclusief vermelding in de structured data.
 */
export const tariefgroepen: Tariefgroep[] = [
  {
    id: "laserontharing-mannen",
    titel: "Laserontharing — mannen",
    toelichting: "Alle prijzen zijn per behandeling.",
    regels: [
      { naam: "Intakegesprek laserontharing", prijs: "gratis" },
      { naam: "Bovenlip, kin, baardlijn", prijs: 65 },
      { naam: "Wenkbrauwtussenstuk", prijs: 20 },
      { naam: "Kaaklijn incl. bakkebaarden", prijs: 50 },
      { naam: "Schouders", prijs: 75 },
      { naam: "Nek", prijs: 50 },
      { naam: "Oksels", prijs: 40 },
      { naam: "Borst", prijs: 65 },
      { naam: "Buik", prijs: 70 },
      { naam: "Borst en buik", prijs: 100 },
      { naam: "Gehele billen", prijs: 60 },
      { naam: "Intieme zone compleet", prijs: 250, toelichting: "incl. bilnaad" },
      { naam: "Bovenarmen", prijs: 70 },
      { naam: "Onderarmen", prijs: 70 },
      { naam: "Gehele armen", prijs: 90 },
      { naam: "Hele rug", prijs: 85 },
      { naam: "Bovenbenen", prijs: 80 },
      { naam: "Onderbenen", prijs: 80, toelichting: "incl. knie" },
      { naam: "Volledige benen", prijs: 125 },
    ],
  },
  {
    id: "laserontharing-vrouwen",
    titel: "Laserontharing — vrouwen",
    toelichting: "Alle prijzen zijn per behandeling.",
    // Nog aan te leveren door de kliniek.
    regels: [],
  },
  {
    id: "combinatiepakketten",
    titel: "Combinatiepakketten",
    toelichting: "Prijs per behandeling bij afname van een combinatie.",
    regels: [
      {
        naam: "Hele bovenlichaam",
        prijs: 150,
        vanPrijs: 250,
        toelichting: "rug, borst, buik en oksels",
      },
      {
        naam: "Schouders en rug",
        prijs: 100,
        vanPrijs: 160,
      },
    ],
  },
  {
    id: "gezichtsbehandelingen",
    titel: "Gezichtsbehandelingen",
    regels: [{ naam: "Hydrafacial gezichtsbehandeling", prijs: 45 }],
  },
]

/**
 * De actie voor kuren van zes behandelingen.
 *
 * Voorwaarden staan op de flyer: binnen 18 maanden af te nemen en niet te
 * combineren met andere acties. Die staan hieronder in `KUUR_VOORWAARDEN`,
 * want een aanbieding zonder zichtbare voorwaarden hoort niet op een site.
 */
export const kuren: Kuur[] = [
  {
    titel: "Hele bovenlichaam",
    omvat: "rug, borst, buik en oksels",
    aantalBehandelingen: 6,
    normalePrijsPerBehandeling: 250,
    kuurprijs: 900,
    perBehandelingInKuur: 150,
    prijsBijEenmaligeAfname: 750,
    perBehandelingBijEenmaligeAfname: "125",
  },
  {
    titel: "Schouders en rug",
    omvat: "schouders en rug",
    aantalBehandelingen: 6,
    normalePrijsPerBehandeling: 160,
    kuurprijs: 600,
    perBehandelingInKuur: 100,
    prijsBijEenmaligeAfname: 500,
    perBehandelingBijEenmaligeAfname: "83,33",
  },
]

export const KUUR_VOORWAARDEN =
  "De behandelingen dienen binnen 18 maanden te worden afgenomen. " +
  "Niet geldig in combinatie met andere acties."

export const KUUR_ADVIES =
  "Voor het beste resultaat adviseren wij een kuur van zes behandelingen."

/** Groepen met minstens één regel; lege groepen worden niet getoond. */
export function gevuldeTariefgroepen(): Tariefgroep[] {
  return tariefgroepen.filter((g) => g.regels.length > 0)
}

export function heeftTarieven(): boolean {
  return gevuldeTariefgroepen().length > 0
}

/**
 * Welke tariefgroepen bij welke behandelpagina horen.
 *
 * Nodig om de vanaf-prijs per pagina te bepalen. Zonder deze koppeling zou de
 * gezichtsbehandelingen-pagina "vanaf € 20" tonen — dat is het
 * wenkbrauwtussenstuk bij laserontharing, en dus misleidend.
 */
const groepenPerBehandeling: Record<string, string[]> = {
  laserontharing: [
    "laserontharing-mannen",
    "laserontharing-vrouwen",
    "combinatiepakketten",
  ],
  gezichtsbehandelingen: ["gezichtsbehandelingen"],
}

/**
 * Laagste bedrag binnen één behandeling, voor de vanaf-prijs in de structured
 * data. Het gratis intakegesprek telt niet mee: "vanaf € 0" wekt de indruk dat
 * de behandeling zelf gratis is.
 */
export function laagstePrijsVoor(slug: string): number | undefined {
  const ids = groepenPerBehandeling[slug]
  if (!ids) return undefined
  const bedragen = tariefgroepen
    .filter((g) => ids.includes(g.id))
    .flatMap((g) => g.regels)
    .map((r) => r.prijs)
    .filter((p): p is number => typeof p === "number")
  return bedragen.length ? Math.min(...bedragen) : undefined
}
