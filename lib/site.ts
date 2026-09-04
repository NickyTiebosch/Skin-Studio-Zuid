import { ADRES, BEDRIJFSNAAM, EMAIL, INSTAGRAM, TELEFOON_HREF } from "./contact"
import type { Behandeling, VeelgesteldeVraag } from "./behandelingen"
import { laagstePrijsVoor } from "./tarieven"

/**
 * De canonieke locatie van de site. Zoekmachines gebruiken dit om te bepalen
 * welke URL de "echte" is; zonder dit worden preview-omgevingen en het
 * productiedomein als aparte sites gezien, wat de vindbaarheid verdunt.
 *
 * Via NEXT_PUBLIC_SITE_URL te overschrijven voor lokaal werk of previews.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://skinstudiozuid.nl"

export const SITE_NAAM = BEDRIJFSNAAM

export const SITE_BESCHRIJVING =
  `${BEDRIJFSNAAM} is een kliniek in ${ADRES.plaats} voor gezichtsbehandelingen ` +
  "en laserontharing, met de Atres Triple Wave laser en de Atres HydraSpa."

/**
 * Structured data over het bedrijf, in JSON-LD.
 *
 * Dit is de belangrijkste hefboom van de hele SEO-inzet: het vertelt Google
 * en AI-modellen letterlijk wát dit bedrijf is, wáár het zit en wat het doet,
 * in plaats van dat ze het uit de lopende tekst moeten afleiden. Voor een
 * lokale kliniek is dat het verschil tussen wel en niet in de kaartresultaten
 * verschijnen.
 *
 * Nog aan te vullen zodra de gegevens er zijn: openingstijden, geo-coördinaten,
 * prijzen per behandeling en het Google Business Profile bij `sameAs`.
 */
export function bedrijfsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE_URL}/#organisatie`,
    name: BEDRIJFSNAAM,
    description: SITE_BESCHRIJVING,
    url: SITE_URL,
    telephone: TELEFOON_HREF.replace("tel:", ""),
    email: EMAIL,
    image: `${SITE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADRES.straat,
      addressLocality: ADRES.plaats,
      addressCountry: ADRES.land,
    },
    areaServed: {
      "@type": "City",
      name: ADRES.plaats,
    },
    sameAs: [INSTAGRAM],
    knowsAbout: [
      "Laserontharing",
      "Definitieve ontharing",
      "Gezichtsbehandeling",
      "Huidverbetering",
      "Radiofrequentie huidverstrakking",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Laserontharing",
          description:
            "Definitieve ontharing met de Atres Triple Wave, een medisch " +
            "gecertificeerde laser die drie golflengtes combineert en daardoor " +
            "geschikt is voor elk huid- en haartype.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gezichtsbehandeling",
          description:
            "Huidverbetering en lift met de Atres HydraSpa: reiniging met " +
            "Vortex-technologie, verstrakking met radiofrequentie en een " +
            "anti-aging boost met ultrasone trillingen.",
        },
      },
    ],
  }
}

/**
 * Structured data voor één behandeling.
 *
 * De `provider`-verwijzing knoopt deze dienst aan het organisatie-schema uit
 * `bedrijfsSchema()` via het `@id` dat daar al bestaat. Zonder die verwijzing
 * zouden het twee losse feiten zijn; nu weet een zoekmachine dat déze kliniek
 * déze behandeling aanbiedt.
 *
 * Er staat bewust geen `offers` met prijs in: die is niet bekend, en een
 * verzonnen prijs in structured data is erger dan geen prijs.
 */
export function behandelingSchema(behandeling: Behandeling) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${behandeling.slug}#dienst`,
    name: behandeling.tag,
    description: behandeling.schemaBeschrijving,
    url: `${SITE_URL}/${behandeling.slug}`,
    serviceType: behandeling.tag,
    provider: { "@id": `${SITE_URL}/#organisatie` },
    areaServed: {
      "@type": "City",
      name: ADRES.plaats,
    },
    // Laserontharing wordt per lichaamsdeel geprijsd, dus één bedrag op de
    // dienst zou misleiden. Een vanaf-prijs met verwijzing naar de volledige
    // lijst is wat hier klopt.
    ...(laagstePrijsVoor(behandeling.slug) !== undefined
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: String(laagstePrijsVoor(behandeling.slug)),
            description: "Vanaf-prijs; tarief hangt af van het te behandelen gebied.",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/tarieven`,
          },
        }
      : {}),
  }
}

/**
 * Vraag-en-antwoordblokken in machineleesbare vorm. Dit is waar AI-assistenten
 * en de antwoordblokken van Google hun materiaal uit halen — de vragen moeten
 * dus letterlijk overeenkomen met wat er op de pagina staat.
 */
export function faqSchema(vragen: VeelgesteldeVraag[], paginaUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${paginaUrl}#faq`,
    mainEntity: vragen.map((v) => ({
      "@type": "Question",
      name: v.vraag,
      acceptedAnswer: {
        "@type": "Answer",
        text: v.antwoord,
      },
    })),
  }
}

/** Navigatiepad, zodat zoekresultaten laten zien waar de pagina zit. */
export function kruimelpadSchema(kruimels: { naam: string; pad: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: kruimels.map((k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: k.naam,
      item: `${SITE_URL}${k.pad}`,
    })),
  }
}
