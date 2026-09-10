import type { Metadata } from "next"
import { Navbar } from "@/components/editie2/navbar"
import { Footer } from "@/components/editie2/footer"
import { Sfeerband } from "@/components/editie2/sfeerband"
import { ContactSection } from "@/components/contact-section"
import { behandelingen } from "@/lib/behandelingen"
import { ADRES } from "@/lib/contact"
import { OPENGRAPH_BASIS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Afspraak maken",
  description: `Maak een afspraak bij Skin Studio Zuid in ${ADRES.plaats}: kies een gezichtsbehandeling of een gratis intakegesprek voor laserontharing en een datum die u schikt.`,
  alternates: { canonical: "/boeken" },
  openGraph: {
    ...OPENGRAPH_BASIS,
    type: "website",
    url: "/boeken",
    title: "Afspraak maken bij Skin Studio Zuid",
    description: `Plan een afspraak in ${ADRES.plaats} voor een gezichtsbehandeling of laserontharing.`,
  },
}

/**
 * Vaste bestemming voor elke actieknop op de site.
 *
 * Hier staat het aanvraagformulier met de kalender: de bezoeker kiest een
 * behandeling, een datum en een dagdeel, en de kliniek bevestigt. Zodra de
 * echte agenda gekoppeld is (Cal.com op iCloud) verandert alleen deze
 * pagina — alle knoppen die ernaartoe wijzen blijven kloppen.
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

  return (
    <main id="inhoud" className="overflow-x-clip">
      <Navbar />

      <div className="e2-korrel relative px-6 pt-32 md:pt-40">
        <div
          className="e2-gloed pointer-events-none absolute -right-[16vw] -top-[10vh] h-[55vh] w-[55vw]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl">
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
        intro={
          gekozen
            ? `U heeft interesse in ${gekozen.tag.toLowerCase()}. Kies hieronder een datum die u schikt en laat uw gegevens achter; wij bevestigen de afspraak per e-mail of telefoon.`
            : isIntake
              ? "Tijdens het intakegesprek kijken we naar uw huid, bespreken we wat er mogelijk is en krijgt u een concrete prijsopgave. U zit daarbij nergens aan vast. Kies hieronder een datum die u schikt."
              : "Kies een behandeling en een datum die u schikt, en laat uw gegevens achter; wij bevestigen de afspraak per e-mail of telefoon. Weet u nog niet welke behandeling bij u past? Kies dan een gratis intakegesprek; we kijken samen wat er nodig is."
        }
      />

      <Sfeerband />

      <Footer />
    </main>
  )
}
