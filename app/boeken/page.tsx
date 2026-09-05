import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { behandelingen } from "@/lib/behandelingen"
import { ADRES } from "@/lib/contact"

export const metadata: Metadata = {
  title: "Afspraak maken",
  description: `Maak een afspraak bij Skin Studio Zuid in ${ADRES.plaats} voor een gezichtsbehandeling, laserontharing of een vrijblijvend consult.`,
  alternates: { canonical: "/boeken" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "/boeken",
    title: "Afspraak maken bij Skin Studio Zuid",
    description: `Plan een afspraak in ${ADRES.plaats} voor een gezichtsbehandeling of laserontharing.`,
  },
}

/**
 * Vaste bestemming voor elke actieknop op de site.
 *
 * Nu staat hier het contactformulier. Zodra het online boekingssysteem er is,
 * verandert alleen deze pagina — alle knoppen die ernaartoe wijzen blijven
 * kloppen. Dat is de reden dat deze route nu al bestaat.
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
  // formulier — de tarievenpagina verwijst bijvoorbeeld naar een consult.
  const overigeKeuzes: Record<string, string> = {
    consult: "een vrijblijvend consult",
    overig: "iets anders",
  }
  const overigeKeuze = params.behandeling
    ? overigeKeuzes[params.behandeling]
    : undefined
  const voorgevuld = gekozen?.formulierWaarde ?? (overigeKeuze ? params.behandeling! : "")

  return (
    <main className="overflow-x-hidden">
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
        standaardBehandeling={voorgevuld}
        titel={
          gekozen
            ? `Een afspraak voor ${gekozen.tag.toLowerCase()}`
            : overigeKeuze === "een vrijblijvend consult"
              ? "Een vrijblijvend consult"
              : "Maak een afspraak"
        }
        intro={
          gekozen
            ? `U heeft interesse in ${gekozen.tag.toLowerCase()}. Laat hieronder uw gegevens achter, dan nemen wij contact met u op om een moment te plannen dat u schikt.`
            : overigeKeuze === "een vrijblijvend consult"
              ? "Tijdens een consult kijken we naar uw huid, bespreken we wat er mogelijk is en krijgt u een concrete prijsopgave. U zit daarbij nergens aan vast."
              : "Laat uw gegevens achter, dan nemen wij contact met u op om een moment te plannen dat u schikt. Weet u nog niet welke behandeling bij u past? Kies dan een vrijblijvend consult; we kijken samen wat er nodig is."
        }
      />

      <Footer />
    </main>
  )
}
