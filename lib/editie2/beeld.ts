/**
 * Het beeldmanifest van editie 2.
 *
 * De enige plek die weet welk beeld waar staat. Zolang het Higgsfield-tegoed
 * ontbreekt wijzen de meeste plekken naar uitsnedes van de twee echte
 * studiofoto's (`soort: "placeholder"`); zodra een AI-beeld gegenereerd en
 * goedgekeurd is, verandert hier één regel: `src` en `soort`.
 *
 * `soort` stuurt ook de eerlijkheid: bij `ai-sfeer` en `ai-bewerking` toont de
 * pagina het bijschrift "Sfeerimpressie" en de footer de verantwoording.
 * AI-beeld is hier uitsluitend sfeer, interieur of abstractie — nooit een
 * voor/na-"resultaat" en nooit een persoon die als klant of medewerker
 * gepresenteerd wordt.
 */
import type { StaticImageData } from "next/image"
import behandelkamerRaam from "@/Images/1000026002.jpg"
import behandelkamerLatten from "@/Images/1000026036.jpg"

export type Beeldsoort =
  /** Echte foto van de studio, ongewijzigd. */
  | "foto"
  /** Met AI gemaakt sfeerbeeld zonder foto als basis. */
  | "ai-sfeer"
  /** Met AI bewerkte uitsnede of variant van een echte foto. */
  | "ai-bewerking"
  /** Tijdelijk: uitsnede van een echte foto tot het AI-beeld er is. */
  | "placeholder"

export type Beeld = {
  id: string
  src: StaticImageData
  alt: string
  soort: Beeldsoort
  /** `object-position` van de uitsnede, als die niet gecentreerd hoort. */
  positie?: string
  /**
   * Alleen voor placeholders: inzoomfactor van de uitsnede, zodat dezelfde
   * foto niet twee keer identiek naast elkaar staat tot het AI-beeld er is.
   */
  zoom?: number
  /** Alleen voor placeholders: warme avondtint over de uitsnede. */
  tint?: "avond"
  bijschrift?: string
}

export const heroPoort: Beeld = {
  id: "hero-poort",
  src: behandelkamerRaam,
  alt: "Behandelkamer van Skin Studio Zuid: het behandelbed bij het raam met het logo op het glas",
  soort: "foto",
  positie: "50% 62%",
}

/** De rondgang door de studio, in de volgorde waarin je de ruimte binnenkomt. */
export const rondgang: Beeld[] = [
  {
    id: "rondgang-entree",
    src: behandelkamerRaam,
    alt: "Blik de behandelkamer in, richting het raam",
    soort: "placeholder",
    positie: "30% 42%",
    zoom: 1.45,
    bijschrift: "De entree",
  },
  {
    id: "rondgang-raam",
    src: behandelkamerRaam,
    alt: "Behandelbed bij het raam met het logo op het glas",
    soort: "foto",
    positie: "50% 45%",
    bijschrift: "Het behandelbed bij het raam",
  },
  {
    id: "rondgang-latten",
    src: behandelkamerLatten,
    alt: "Behandelbed voor de lattenwand met de Kalahari-producten",
    soort: "foto",
    positie: "50% 50%",
    bijschrift: "De lattenwand",
  },
  {
    id: "rondgang-producten",
    src: behandelkamerLatten,
    alt: "De plank met Kalahari-producten in de lattenwand",
    soort: "placeholder",
    positie: "88% 38%",
    zoom: 1.35,
    bijschrift: "De Kalahari-plank",
  },
  {
    id: "rondgang-avond",
    src: behandelkamerRaam,
    alt: "Behandelkamer in avondlicht",
    soort: "placeholder",
    positie: "62% 74%",
    zoom: 1.2,
    tint: "avond",
    bijschrift: "Aan het eind van de dag",
  },
]

/** Kopbeeld van /laserontharing: warm licht door een matglazen, huidkleurige laag. */
export const laserKop: Beeld = {
  id: "laser-licht",
  src: behandelkamerRaam,
  alt: "Zacht daglicht in de behandelkamer",
  soort: "placeholder",
  positie: "50% 30%",
}

/** Kopbeeld van /gezichtsbehandelingen: water en licht in crème en rosé-goud. */
export const gezichtKop: Beeld = {
  id: "gezicht-water",
  src: behandelkamerLatten,
  alt: "De rustige behandelkamer van Skin Studio Zuid",
  soort: "placeholder",
  positie: "30% 40%",
}

/** Smalle beeldband boven tarieven, boeken en privacybeleid. */
export const sfeerband: Beeld = {
  id: "band-daglicht",
  src: behandelkamerRaam,
  alt: "Daglicht door de jaloezieën van de studio",
  soort: "placeholder",
  positie: "50% 22%",
}

export function isAiBeeld(beeld: Beeld): boolean {
  return beeld.soort === "ai-sfeer" || beeld.soort === "ai-bewerking"
}

/** Staat er ergens op de site een AI-beeld? Dan hoort de verantwoording in de footer. */
export function heeftAiBeelden(): boolean {
  return [heroPoort, ...rondgang, laserKop, gezichtKop, sfeerband].some(isAiBeeld)
}

export const BEELD_VERANTWOORDING =
  "Sfeerbeelden zijn deels met AI bewerkt op basis van foto's van de studio."

export const BIJSCHRIFT_AI = "Sfeerimpressie"
