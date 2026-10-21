import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { behandelingen } from "@/lib/behandelingen"
import { ECHTE_AGENDA_AAN } from "@/lib/agenda"
import { ADRES, BEDRIJFSNAAM } from "@/lib/contact"
import { OPENGRAPH_BASIS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Afspraak maken",
  description: `Maak een afspraak bij ${BEDRIJFSNAAM} in ${ADRES.plaats}: kies een gezichtsbehandeling of een gratis intakegesprek voor laserontharing en een datum die u schikt.`,
  alternates: { canonical: "/boeken" },
  openGraph: {
    ...OPENGRAPH_BASIS,
    type: "website",
    url: "/boeken",
    title: `Afspraak maken bij ${BEDRIJFSNAAM}`,
    description: `Plan een afspraak in ${ADRES.plaats} voor een gezichtsbehandeling of laserontharing.`,
  },
}

/**
 * Vaste bestemming voor elke actieknop op de site.
 *
 * Hier staat het aanvraagformulier met de kalender: de bezoeker kiest een
 * behandeling, een datum en een dagdeel, en de kliniek bevestigt. Staat
 * `ECHTE_AGENDA_AAN` in lib/agenda.ts aan, dan boekt de bezoeker hier zelf in
 * de echte agenda (Cal.com op iCloud). Alleen deze pagina verandert dan; alle
 * knoppen die ernaartoe wijzen blijven kloppen.
 */
export default async function Boeken({
  searchParams,
}: {
  searchParams: Promise<{ behandeling?: string }>
}) {
  const params = await searchParams

  // Alleen een waarde overnemen die het formulier ook echt kent; een
  // willekeurige query-parameter mag niet in het formulier belanden.
  const gekozen = behandelingen.find(
    (b) => b.formulierWaarde === params.behandeling
  )
  // "consult" en "overig" zijn geen behandeling maar wel keuzes in het
  // formulier — de tarievenpagina verwijst bijvoorbeeld naar het intakegesprek.
  const overigeKeuzes = ["consult", "overig"]
  const isIntake = params.behandeling === "consult"
  const voorgevuld =
    gekozen?.formulierWaarde ??
    (params.behandeling && overigeKeuzes.includes(params.behandeling)
      ? params.behandeling
      : "")

  // Met de echte agenda bevestigt Cal.com de afspraak meteen; zonder is het
  // een aanvraag die de kliniek zelf bevestigt.
  const intro = gekozen
    ? `U heeft interesse in ${gekozen.tag.toLowerCase()}. ` +
      (ECHTE_AGENDA_AAN
        ? "Kies hieronder een dag en tijd die u schikt; u krijgt direct een bevestiging per e-mail."
        : "Kies hieronder een datum die u schikt en laat uw gegevens achter; wij bevestigen de afspraak per e-mail of telefoon.")
    : isIntake
      ? "Tijdens het intakegesprek kijken we naar uw huid, bespreken we wat er mogelijk is en krijgt u een concrete prijsopgave. U zit daarbij nergens aan vast. " +
        (ECHTE_AGENDA_AAN
          ? "Kies hieronder een dag en tijd die u schikt."
          : "Kies hieronder een datum die u schikt.")
      : (ECHTE_AGENDA_AAN
          ? "Kies een behandeling en daarna een dag en tijd die u schikt; u krijgt direct een bevestiging per e-mail."
          : "Kies een behandeling en een datum die u schikt, en laat uw gegevens achter; wij bevestigen de afspraak per e-mail of telefoon.") +
        " Weet u nog niet welke behandeling bij u past? Kies dan een gratis intakegesprek; we kijken samen wat er nodig is."

  return (
    <main className="overflow-x-clip">
      <Navbar />

      <div className="pt-32 md:pt-40 px-6">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Kruimelpad">
            <ol className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Afspraak maken</li>
            </ol>
          </nav>
        </div>
      </div>

      <ContactSection
        kopNiveau="h1"
        metAgenda
        standaardBehandeling={voorgevuld}
        titel={
          gekozen
            ? `Een afspraak voor ${gekozen.tag.toLowerCase()}`
            : isIntake
              ? "Een gratis intakegesprek"
              : "Maak een afspraak"
        }
        intro={intro}
      />

      <Footer />
    </main>
  )
}
