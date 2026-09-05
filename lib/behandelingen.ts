/**
 * De behandelingen van Skin Studio Zuid, als één bron.
 *
 * Deze inhoud stond eerder als module-lokale const in specialties-section.tsx
 * en was daardoor nergens anders bruikbaar. Nu putten zowel de sectie op de
 * homepage als de losse behandelpagina's hieruit, zodat een wijziging maar op
 * één plek hoeft.
 *
 * LET OP bij het aanvullen: alles hieronder moet feitelijk kloppen. Er staan
 * bewust geen prijzen, behandelduren of aantallen sessies in — die zijn niet
 * bekend en worden niet geraden. Er staan ook geen uitspraken in over
 * geschiktheid bij zwangerschap, medicijngebruik of huidaandoeningen; dat
 * hoort thuis in de persoonlijke intake, niet op een webpagina.
 *
 * De teksten die zijn toegevoegd bovenop de oorspronkelijke sectie staan
 * gemarkeerd in docs/te-controleren.md, zodat de kliniek ze kan nalopen.
 */

export type Voordeel = {
  label: string
  text: string
}

export type VeelgesteldeVraag = {
  vraag: string
  antwoord: string
}

export type Behandeling = {
  /** Wordt gebruikt als route-slug: /laserontharing, /gezichtsbehandelingen */
  slug: string
  /** Korte aanduiding boven de titel op de kaart */
  tag: string
  /** Titel zoals die op de homepage-kaart staat */
  title: string
  /** De kop op de eigen pagina: bevat behandeling én plaats, want daar wordt op gezocht */
  paginaTitel: string
  /** Voor het title-element en de zoekresultaten */
  metaTitel: string
  metaBeschrijving: string
  /** Openingsalinea op de kaart en op de pagina */
  description: string
  /** Uitgebreidere uitleg, alleen op de eigen pagina */
  uitleg: string[]
  detail: string
  image: string
  imageAlt: string
  benefits?: Voordeel[]
  benefitsHeading?: string
  /** Wordt gebruikt voor de Service-structured data */
  schemaBeschrijving: string
  faq: VeelgesteldeVraag[]
  /** Vult het behandelingsveld van het contactformulier voor */
  formulierWaarde: string
}

export const behandelingen: Behandeling[] = [
  {
    slug: "gezichtsbehandelingen",
    tag: "Gezichtsbehandelingen",
    title: "Huidverbetering & Lift",
    paginaTitel: "Gezichtsbehandelingen in 's-Hertogenbosch",
    metaTitel: "Gezichtsbehandeling Den Bosch — HydraSpa huidverbetering",
    metaBeschrijving:
      "Gezichtsbehandeling in 's-Hertogenbosch met de Atres HydraSpa: " +
      "diepe reiniging, verstrakking met radiofrequentie en een anti-aging " +
      "boost. Zonder hersteltijd.",
    description:
      'De Atres HydraSpa is de ultieme "all-in-one" behandeling voor een schone, volle en gelifte huid. Het gaat veel verder dan een standaard facial door de combinatie van drie krachtige technieken:',
    uitleg: [
      "Waar een klassieke gezichtsbehandeling zich vooral op reiniging richt, " +
        "combineert de HydraSpa drie technieken in één sessie. De huid wordt " +
        "eerst grondig gereinigd en gehydrateerd, daarna verstevigd, en tot slot " +
        "verzadigd met werkstoffen die dieper in de huid doordringen dan bij een " +
        "gewone verzorging mogelijk is.",
      "Het voordeel van die volgorde is dat elke stap de volgende versterkt: een " +
        "schone, goed gehydrateerde huid neemt actieve stoffen beter op dan een " +
        "huid waarvan de poriën nog verstopt zijn.",
      "De behandeling kent geen hersteltijd. U kunt er dus voor kiezen op een " +
        "moment dat het u uitkomt, ook als u daarna nog een afspraak heeft.",
    ],
    benefitsHeading: "De drie technieken:",
    benefits: [
      {
        label: "Deep Cleanse & Hydrate",
        text: "Met de Vortex-technologie zuigen we onzuiverheden uit de poriën, terwijl we de huid tegelijkertijd verzadigen met hoogwaardige serums.",
      },
      {
        label: "Directe Lift & Verstrakking",
        text: "Door gebruik te maken van Radiofrequentie (RF) stimuleren we de diepe collageenlagen. Dit zorgt voor een onmiddellijke verstrakking van de huid en een natuurlijke lift van de gezichtscontouren.",
      },
      {
        label: "Anti-Aging Boost",
        text: "Ultrasone trillingen zorgen ervoor dat actieve werkstoffen dieper in de huid doordringen voor een langdurig verjongend effect.",
      },
    ],
    detail: "Kalahari Productlijn",
    image: "/images/facial-treatment.jpg",
    imageAlt: "Luxe gezichtsbehandeling bij Skin Studio Zuid",
    schemaBeschrijving:
      "Gezichtsbehandeling met de Atres HydraSpa in 's-Hertogenbosch: " +
      "reiniging met Vortex-technologie, verstrakking met radiofrequentie en " +
      "een anti-aging boost met ultrasone trillingen.",
    formulierWaarde: "gezichtsbehandeling",
    faq: [
      {
        vraag: "Wat is het verschil met een gewone gezichtsbehandeling?",
        antwoord:
          "Een klassieke gezichtsbehandeling richt zich vooral op reiniging. " +
          "De HydraSpa combineert reiniging met verstrakking en het inbrengen " +
          "van werkstoffen, in één sessie. Daardoor werkt de behandeling niet " +
          "alleen aan de conditie van de huid, maar ook aan de stevigheid.",
      },
      {
        vraag: "Heb ik na de behandeling hersteltijd nodig?",
        antwoord:
          "Nee. De behandeling is er juist op gericht dat u er direct verzorgd " +
          "uitziet, zonder roodheid of een periode waarin u zich liever niet " +
          "laat zien. U kunt na afloop gewoon uw dag vervolgen.",
      },
      {
        vraag: "Wat doet radiofrequentie precies met de huid?",
        antwoord:
          "Radiofrequentie brengt warmte in de diepere huidlagen, wat de " +
          "aanmaak van collageen stimuleert. Collageen is de vezel die de huid " +
          "stevigheid geeft. Het effect is direct zichtbaar als verstrakking en " +
          "bouwt zich in de weken erna verder op.",
      },
      {
        vraag: "Welke producten gebruiken jullie?",
        antwoord:
          "Wij werken met de Kalahari-productlijn, geïnspireerd op planten uit " +
          "de Afrikaanse woestijn. Die producten zijn ook los verkrijgbaar via " +
          "de studio, zodat u het resultaat thuis kunt onderhouden.",
      },
      {
        vraag: "Is de behandeling geschikt voor mijn huid?",
        antwoord:
          "De HydraSpa is geschikt voor alle huidtypes. Wat er in uw geval " +
          "precies nodig is, bespreken we tijdens een persoonlijke intake in de " +
          "studio — daar kijken we naar uw huid en stemmen we de behandeling af.",
      },
    ],
  },
  {
    slug: "laserontharing",
    tag: "Laserontharing",
    title: "Definitieve Ontharing met de Atres Triple Wave",
    paginaTitel: "Laserontharing in 's-Hertogenbosch",
    metaTitel: "Laserontharing Den Bosch — Atres Triple Wave",
    metaBeschrijving:
      "Definitieve laserontharing in 's-Hertogenbosch met de Atres Triple " +
      "Wave: drie golflengtes, geschikt voor elk huid- en haartype, vrijwel " +
      "pijnloos door actieve koeling.",
    description:
      "In onze kliniek werken wij uitsluitend met de beste technologie. De Atres is een medisch gecertificeerde laser die drie verschillende golflengtes combineert. Waar oudere lasers vaak moeite hebben met lichte haartjes of een donkere huid, biedt de Atres een veilige en effectieve oplossing voor elk huid- en haartype.",
    uitleg: [
      "Laserontharing werkt doordat het licht van de laser wordt opgenomen door " +
        "het pigment in de haar. Die lichtenergie wordt omgezet in warmte, en die " +
        "warmte schakelt de haarwortel uit. Omdat het licht op het pigment " +
        "aangrijpt, is de techniek het effectiefst bij haren die zich in de " +
        "groeifase bevinden — en die fase verschilt per haar. Daarom bestaat een " +
        "behandeling altijd uit meerdere sessies.",
      "Het verschil tussen één en drie golflengtes zit in wat de laser kan " +
        "bereiken. Elke golflengte dringt tot een andere diepte door en werkt " +
        "daardoor beter op een ander type haar of huid. Een laser met één " +
        "golflengte moet een compromis sluiten; de Atres Triple Wave kan de " +
        "juiste combinatie kiezen voor de huid en het haar waar hij op werkt. " +
        "Dat is de reden dat lichte haartjes en een donkere huid, die bij oudere " +
        "apparatuur lastig waren, hier wel goed te behandelen zijn.",
      "Tijdens de behandeling koelt de laserkop de huid actief. Die koeling " +
        "beschermt de bovenste huidlaag en maakt de behandeling comfortabel: de " +
        "meeste mensen ervaren niet meer dan een korte, warme tik.",
    ],
    benefits: [
      {
        label: "Effectief",
        text: "Pakt de haarwortel in de kern aan voor blijvend resultaat.",
      },
      {
        label: "Vrijwel pijnloos",
        text: "Door de actieve koeling in de laserkop.",
      },
      {
        label: "Snel",
        text: "Kortere behandeltijden door de geavanceerde In-Motion techniek.",
      },
      {
        label: "Veilig",
        text: "Geschikt voor behandelingen het hele jaar door.",
      },
    ],
    detail: "ATRES Technologie",
    image: "/images/laser-treatment.jpg",
    imageAlt: "Professionele laserontharing bij Skin Studio Zuid",
    schemaBeschrijving:
      "Definitieve laserontharing in 's-Hertogenbosch met de Atres Triple " +
      "Wave, een medisch gecertificeerde laser die drie golflengtes combineert " +
      "en daardoor geschikt is voor elk huid- en haartype.",
    formulierWaarde: "laserontharing",
    faq: [
      {
        vraag: "Doet laserontharing pijn?",
        antwoord:
          "De laserkop koelt de huid actief tijdens de behandeling. Daardoor is " +
          "laserontharing met de Atres vrijwel pijnloos: de meeste mensen " +
          "beschrijven het als een korte, warme tik. Dat is een merkbaar verschil " +
          "met oudere apparatuur zonder actieve koeling.",
      },
      {
        vraag: "Waarom drie golflengtes in plaats van één?",
        antwoord:
          "Elke golflengte dringt tot een andere diepte door en werkt daardoor " +
          "beter op een ander type haar of huid. Een laser met één golflengte " +
          "moet een compromis sluiten. De Atres Triple Wave combineert er drie en " +
          "kan zo de juiste instelling kiezen — ook bij lichte haartjes of een " +
          "donkere huid, waar oudere lasers moeite mee hebben.",
      },
      {
        vraag: "Kan ik ook in de zomer laseren?",
        antwoord:
          "Ja. De Atres is geschikt voor behandelingen het hele jaar door. Wat " +
          "verstandig is rond zonblootstelling in uw situatie, bespreken we " +
          "tijdens de intake.",
      },
      {
        vraag: "Werkt het op elk huid- en haartype?",
        antwoord:
          "De Atres is ontworpen voor elk huid- en haartype, juist doordat hij " +
          "drie golflengtes combineert. Of laserontharing in uw geval de beste " +
          "keuze is, en wat u aan resultaat mag verwachten, beoordelen we tijdens " +
          "een persoonlijke intake in de studio.",
      },
      {
        vraag: "Hoeveel behandelingen heb ik nodig?",
        antwoord:
          "Dat verschilt per persoon en per lichaamsdeel, omdat haren zich niet " +
          "allemaal tegelijk in dezelfde groeifase bevinden. Tijdens de intake " +
          "maken we een inschatting die bij uw situatie past en bespreken we het " +
          "behandelplan met u door.",
      },
    ],
  },
]

/** Zoekt een behandeling op bij zijn route-slug. */
export function behandelingBySlug(slug: string): Behandeling | undefined {
  return behandelingen.find((b) => b.slug === slug)
}

