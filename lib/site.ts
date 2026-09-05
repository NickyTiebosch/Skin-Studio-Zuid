import { ADRES, BEDRIJFSNAAM, EMAIL, INSTAGRAM, TELEFOON_HREF } from "./contact"
import type { Behandeling, VeelgesteldeVraag } from "./behandelingen"
import { laagstePrijsVoor } from "./tarieven"

/** Draait deze build als preview-omgeving op Vercel? */
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview"

/**
 * De canonieke locatie van de site.
 *
 * Zoekmachines gebruiken dit om te bepalen welke URL de "echte" is. Die waarde
 * voedt de canonicals, de sitemap, robots.txt, de OpenGraph-tags en de
 * structured data — staat hij verkeerd, dan wijst álles naar het verkeerde
 * adres tegelijk.
 *
 * Vandaar een keten in plaats van één vaste waarde. Er waren twee concrete
 * manieren waarop dat misging:
 *
 * 1. Het vaste adres hieronder is ooit afgeleid van het e-mailadres in de
 *    oorspronkelijke code en nooit geverifieerd. Werkt dat domein niet, dan
 *    vertelt elke pagina aan Google dat de echte versie op een dood adres
 *    staat. Op Vercel is dat niet meer nodig: het platform weet zelf op welke
 *    URL het draait.
 * 2. Preview-deploys zijn publiek bereikbaar. Zonder deze keten zou een
 *    preview zichzelf als het productiedomein presenteren en daarmee met de
 *    echte site gaan concurreren in de index. Nu wijst een preview naar
 *    zichzelf, en `IS_PREVIEW` zet hem bovendien op noindex.
 *
 * Deze variabelen worden alleen in server-componenten gelezen (metadata,
 * sitemap, robots, JSON-LD), dus ze hoeven niet publiek gemaakt te worden.
 */
function bepaalSiteUrl(): string {
  // 1. Expliciet gezet wint altijd: het echte domein, zodra dat bekend is.
  const expliciet = process.env.NEXT_PUBLIC_SITE_URL
  if (expliciet) return expliciet.replace(/\/$/, "")

  // 2. Productie op Vercel: het domein dat aan het project hangt.
  const productie = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (process.env.VERCEL_ENV === "production" && productie) {
    return `https://${productie}`
  }

  // 3. Preview of ontwikkeling op Vercel: verwijs naar deze deploy zelf.
  const deploy = process.env.VERCEL_URL
  if (deploy) return `https://${deploy}`

  // 4. Buiten Vercel: de laatste terugval.
  return "https://skinstudiozuid.nl"
}

export const SITE_URL = bepaalSiteUrl()

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
