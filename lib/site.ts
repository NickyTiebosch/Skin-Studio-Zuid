import { ADRES, BEDRIJFSNAAM, EMAIL, INSTAGRAM, TELEFOON_HREF } from "./contact"

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
