/**
 * De tarieven van Skin Studio Zuid.
 *
 * Overgenomen van de flyers die de kliniek heeft aangeleverd: de prijslijst en
 * de kuuractie voor mannen (4 september 2026) en dezelfde twee flyers voor
 * vrouwen (7 september 2026). Twee regels van de mannenlijst waren op de foto
 * lastig te lezen door lichtweerkaatsing en staan als te controleren
 * gemarkeerd in docs/te-controleren.md.
 *
 * NOG NIET AANGELEVERD:
 * - De behandelduur per behandeling. Die staat op geen van de flyers, en is
 *   technisch onmisbaar voor het boekingssysteem: zonder duur kan geen enkel
 *   systeem tijdsloten berekenen.
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
  /** Aanprijzing zoals op de flyer, bijvoorbeeld "Meest gekozen". */
  label?: string
  aantalBehandelingen: number
  normalePrijsPerBehandeling: number
  kuurprijs: number
  perBehandelingInKuur: number
  /** Extra korting wanneer de hele kuur in één keer wordt afgerekend. */
  prijsBijEenmaligeAfname?: number
  perBehandelingBijEenmaligeAfname?: string
}

/**
 * De kuuractie per doelgroep. De voorwaarden staan per groep, want ze
 * verschillen per flyer: de vrouwenactie geldt alleen voor nieuwe klanten,
 * op de mannenflyer staat die beperking niet.
 */
export type Kuurgroep = {
  id: string
  titel: string
  kuren: Kuur[]
  voorwaarden: string
}

/**
 * De prijstabellen, gegroepeerd per doelgroep zodat een bezoeker alles wat
 * voor haar of hem geldt bij elkaar vindt. Een lege groep wordt niet getoond.
 */
export const tariefgroepen: Tariefgroep[] = [
  {
    id: "laserontharing-vrouwen",
    titel: "Laserontharing — vrouwen",
    toelichting: "Alle prijzen zijn per behandeling.",
    regels: [
      { naam: "Intakegesprek laserontharing", prijs: "gratis" },
      { naam: "Bovenlip", prijs: 30 },
      { naam: "Kin", prijs: 30 },
      { naam: "Bovenlip en kin", prijs: 50 },
      { naam: "Wenkbrauwtussenstuk", prijs: 20 },
      { naam: "Kaaklijn incl. bakkebaarden", prijs: 50 },
      { naam: "Hals", prijs: 35 },
      { naam: "Gehele gezicht", prijs: 75 },
      { naam: "Gehele gezicht en hals", prijs: 100 },
      { naam: "Oksels", prijs: 40 },
      { naam: "Buikstreep", prijs: 30 },
      { naam: "Bikinilijn", prijs: 50 },
      { naam: "Gehele schaamstreek", prijs: 55, toelichting: "incl. bilnaad" },
      { naam: "Gehele billen", prijs: 50 },
      {
        naam: "Intieme zone compleet",
        prijs: 90,
        toelichting: "schaamstreek, bikinilijn, schaamlippen en bilnaad",
      },
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
    id: "combinatiepakketten-vrouwen",
    titel: "Combinatiepakketten — vrouwen",
    toelichting: "Prijs per behandeling bij afname van een combinatie.",
    regels: [
      { naam: "Oksels en bikinilijn", prijs: 75, vanPrijs: 90 },
      {
        naam: "Full body",
        prijs: 250,
        vanPrijs: 1050,
        toelichting: "van top tot teen",
      },
      { naam: "Oksels, bikinilijn en onderbenen", prijs: 125, vanPrijs: 170 },
    ],
  },
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
    id: "combinatiepakketten-mannen",
    titel: "Combinatiepakketten — mannen",
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
 * Voorwaarden die op beide actieflyers staan. Ze horen zichtbaar bij de
 * kuurprijzen, want een aanbieding zonder voorwaarden hoort niet op een site.
 */
export const KUUR_VOORWAARDEN =
  "De behandelingen dienen binnen 18 maanden te worden afgenomen. " +
  "Niet geldig in combinatie met andere acties."

/**
 * De actie voor kuren van zes behandelingen, per doelgroep.
 *
 * De vrouwenflyer noemt één voorwaarde extra: de actie geldt voor nieuwe
 * klanten. Op de mannenflyer staat dat niet, dus die beperking staat alleen
 * bij de vrouwenkuren — zie docs/te-controleren.md.
 */
export const kuurgroepen: Kuurgroep[] = [
  {
    id: "kuren-vrouwen",
    titel: "Vrouwen",
    voorwaarden: "Actie geldig voor nieuwe klanten. " + KUUR_VOORWAARDEN,
    kuren: [
      {
        titel: "Smooth Essentials",
        omvat: "oksels en bikinilijn",
        aantalBehandelingen: 6,
        normalePrijsPerBehandeling: 90,
        kuurprijs: 450,
        perBehandelingInKuur: 75,
        prijsBijEenmaligeAfname: 375,
        perBehandelingBijEenmaligeAfname: "62,50",
      },
      {
        titel: "Total Smooth",
        omvat: "oksels, bikinilijn en onderbenen",
        label: "Meest gekozen",
        aantalBehandelingen: 6,
        normalePrijsPerBehandeling: 170,
        kuurprijs: 750,
        perBehandelingInKuur: 125,
        prijsBijEenmaligeAfname: 600,
        perBehandelingBijEenmaligeAfname: "100",
      },
    ],
  },
  {
    id: "kuren-mannen",
    titel: "Mannen",
    voorwaarden: KUUR_VOORWAARDEN,
    kuren: [
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
    ],
  },
]

export const KUUR_ADVIES =
  "Voor het beste resultaat adviseren wij een kuur van zes behandelingen."

/** Groepen met minstens één regel; lege groepen worden niet getoond. */
export function gevuldeTariefgroepen(): Tariefgroep[] {
  return tariefgroepen.filter((g) => g.regels.length > 0)
}

/** Kuurgroepen met minstens één kuur; lege groepen worden niet getoond. */
export function gevuldeKuurgroepen(): Kuurgroep[] {
  return kuurgroepen.filter((g) => g.kuren.length > 0)
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
    "laserontharing-vrouwen",
    "combinatiepakketten-vrouwen",
    "laserontharing-mannen",
    "combinatiepakketten-mannen",
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
