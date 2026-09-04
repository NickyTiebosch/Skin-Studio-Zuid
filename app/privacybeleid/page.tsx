import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ADRES,
  BEDRIJFSNAAM,
  EMAIL,
  EMAIL_HREF,
  TELEFOON_HREF,
  TELEFOON_WEERGAVE,
} from "@/lib/contact"

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: `Hoe ${BEDRIJFSNAAM} omgaat met persoonsgegevens die via de website worden achtergelaten.`,
  robots: { index: true, follow: true },
}

/**
 * Laatste inhoudelijke wijziging van deze verklaring. Pas deze datum aan
 * wanneer de tekst verandert — bezoekers en toezichthouders mogen zien
 * hoe actueel de verklaring is.
 */
const LAATST_BIJGEWERKT = "4 september 2026"

export default function Privacybeleid() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <article className="pt-36 pb-24 md:pt-44 md:pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <span
            className="font-sans text-xs tracking-[0.4em] uppercase mb-5 block"
            style={{ color: "var(--rose-gold)" }}
          >
            Juridisch
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-6 leading-tight">
            Privacybeleid
          </h1>
          <div className="w-10 h-px mb-8" style={{ backgroundColor: "var(--rose-gold)" }} />
          <p className="font-sans text-xs text-muted-foreground mb-12">
            Laatst bijgewerkt op {LAATST_BIJGEWERKT}
          </p>

          <div className="flex flex-col gap-10 font-sans text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">
                Wie verwerkt uw gegevens?
              </h2>
              <p>
                {BEDRIJFSNAAM}, gevestigd aan {ADRES.straat} in {ADRES.plaats}, is
                verantwoordelijk voor de verwerking van persoonsgegevens zoals
                beschreven op deze pagina. Vragen over uw gegevens kunt u stellen via{" "}
                <a href={EMAIL_HREF} className="text-foreground hover:text-[color:var(--rose-gold)] transition-colors">
                  {EMAIL}
                </a>{" "}
                of{" "}
                <a href={TELEFOON_HREF} className="text-foreground hover:text-[color:var(--rose-gold)] transition-colors">
                  {TELEFOON_WEERGAVE}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">
                Welke gegevens verzamelen wij?
              </h2>
              <p className="mb-4">
                Wij verzamelen alleen de gegevens die u zelf invult in het
                contactformulier op deze website:
              </p>
              <ul className="flex flex-col gap-2 list-disc pl-5">
                <li>uw naam</li>
                <li>uw e-mailadres</li>
                <li>uw telefoonnummer, als u dat invult</li>
                <li>de behandeling waarin u geïnteresseerd bent</li>
                <li>het bericht dat u achterlaat</li>
              </ul>
              <p className="mt-4">
                Wij vragen via de website bewust geen medische of
                gezondheidsgegevens. Wat er nodig is over uw huid, medicijngebruik
                of gezondheid bespreken wij persoonlijk tijdens de intake in de
                studio, niet via een webformulier.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">
                Waarvoor gebruiken wij ze?
              </h2>
              <p>
                Uitsluitend om contact met u op te nemen over uw aanvraag en om
                een afspraak in te plannen. De grondslag hiervoor is uw eigen
                verzoek om contact. Wij gebruiken uw gegevens niet voor
                nieuwsbrieven of reclame, en verkopen ze niet aan derden.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">
                Met wie delen wij ze?
              </h2>
              <p className="mb-4">
                Om de website te laten werken schakelen wij een aantal
                dienstverleners in:
              </p>
              <ul className="flex flex-col gap-3 list-disc pl-5">
                <li>
                  <span className="text-foreground">Vercel</span> — host de website
                  en verzamelt geanonimiseerde bezoekcijfers. Hierbij worden geen
                  cookies geplaatst en worden bezoekers niet individueel gevolgd.
                </li>
                <li>
                  <span className="text-foreground">FormSubmit</span> — verwerkt de
                  verzending van het contactformulier en stuurt uw bericht door naar
                  onze mailbox.
                </li>
              </ul>
              <p className="mt-4">
                De lettertypen op deze website worden vanaf onze eigen server
                geladen. Uw browser legt daarvoor dus geen verbinding met externe
                partijen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">
                Hoe lang bewaren wij ze?
              </h2>
              <p>
                Aanvragen via het contactformulier bewaren wij zolang dat nodig is
                om u goed van dienst te zijn. Wordt u klant, dan bewaren wij uw
                gegevens in onze klantadministratie voor de duur die daarvoor
                wettelijk geldt. Leidt uw aanvraag niet tot een afspraak, dan
                verwijderen wij uw bericht zodra de vraag is afgehandeld.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">
                Welke rechten heeft u?
              </h2>
              <p>
                U mag ons altijd vragen welke gegevens wij van u hebben, ze laten
                corrigeren of laten verwijderen. Ook kunt u bezwaar maken tegen de
                verwerking. Een verzoek daartoe kunt u sturen naar{" "}
                <a href={EMAIL_HREF} className="text-foreground hover:text-[color:var(--rose-gold)] transition-colors">
                  {EMAIL}
                </a>
                ; wij reageren binnen een maand. Bent u het niet eens met hoe wij
                met uw gegevens omgaan, dan kunt u een klacht indienen bij de{" "}
                <a
                  href="https://autoriteitpersoonsgegevens.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-[color:var(--rose-gold)] transition-colors"
                >
                  Autoriteit Persoonsgegevens
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
