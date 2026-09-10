import type { Metadata } from "next"
import { Fragment } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TarievenMelder } from "@/components/tarieven-melder"
import { behandelingen } from "@/lib/behandelingen"
import { ADRES, TELEFOON_HREF, TELEFOON_WEERGAVE } from "@/lib/contact"
import { OPENGRAPH_BASIS, SITE_URL, kruimelpadSchema } from "@/lib/site"
import {
  KUUR_ADVIES,
  type Kuur,
  type Tariefgroep,
  doelgroepenMetTarieven,
  gevuldeOverigeTariefgroepen,
  heeftTarieven,
} from "@/lib/tarieven"

const tarievenBekend = heeftTarieven()

export const metadata: Metadata = {
  title: "Tarieven laserontharing en gezichtsbehandelingen",
  description: `Tarieven van Skin Studio Zuid in ${ADRES.plaats}: laserontharing per lichaamsdeel voor vrouwen en mannen, kuren en gezichtsbehandelingen. Gratis intakegesprek.`,
  alternates: { canonical: "/tarieven" },
  robots: tarievenBekend
    ? { index: true, follow: true }
    : { index: false, follow: true },
  openGraph: {
    ...OPENGRAPH_BASIS,
    type: "website",
    url: "/tarieven",
    title: "Tarieven — Skin Studio Zuid",
    description: `Wat laserontharing en gezichtsbehandelingen kosten bij Skin Studio Zuid in ${ADRES.plaats}.`,
  },
}

/** Toont een bedrag, of "Gratis" voor een kosteloze dienst. */
function Bedrag({ prijs }: { prijs: number | "gratis" }) {
  if (prijs === "gratis") {
    return <span style={{ color: "var(--rose-gold)" }}>Gratis</span>
  }
  return <>&euro; {prijs}</>
}

/** Een prijstabel: per regel de naam, eventueel een toelichting, en het bedrag. */
function Prijstabel({ groep }: { groep: Tariefgroep }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-sans text-sm">
        <caption className="sr-only">{groep.titel}</caption>
        <tbody>
          {groep.regels.map((regel) => (
            <tr
              key={regel.naam}
              className="border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <th
                scope="row"
                className="py-3 pr-4 text-left font-normal text-muted-foreground align-top"
              >
                {regel.naam}
                {regel.toelichting && (
                  <span className="block text-xs mt-0.5 opacity-75">
                    {regel.toelichting}
                  </span>
                )}
              </th>
              <td className="ssz-cijfers py-3 text-right whitespace-nowrap align-top">
                {regel.vanPrijs && (
                  <span className="text-muted-foreground line-through mr-3 opacity-60">
                    &euro; {regel.vanPrijs}
                  </span>
                )}
                <span className="text-foreground">
                  <Bedrag prijs={regel.prijs} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Eén kuur van zes behandelingen, met de extra korting bij afname in één keer. */
function Kuurkaart({ kuur }: { kuur: Kuur }) {
  return (
    <div className="p-6 md:p-7" style={{ backgroundColor: "var(--sand)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
        <h3 className="font-serif text-xl text-foreground">{kuur.titel}</h3>
        {kuur.label && (
          <span
            className="font-sans text-xs tracking-[0.15em] uppercase"
            style={{ color: "var(--rose-gold)" }}
          >
            {kuur.label}
          </span>
        )}
      </div>
      <p className="font-sans text-xs text-muted-foreground mb-5">{kuur.omvat}</p>

      <p className="font-sans text-xs text-muted-foreground mb-1">
        Normaal &euro; {kuur.normalePrijsPerBehandeling} per behandeling
      </p>
      <p className="ssz-cijfers font-serif text-3xl text-foreground mb-1">
        &euro; {kuur.kuurprijs}
      </p>
      <p className="font-sans text-xs text-muted-foreground mb-5">
        voor {kuur.aantalBehandelingen} behandelingen &mdash; &euro;{" "}
        {kuur.perBehandelingInKuur} per behandeling
      </p>

      {kuur.prijsBijEenmaligeAfname && (
        <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
          <p
            className="font-sans text-xs tracking-[0.15em] uppercase mb-1"
            style={{ color: "var(--rose-gold)" }}
          >
            Bij afname in één keer
          </p>
          <p className="ssz-cijfers font-serif text-xl text-foreground">
            &euro; {kuur.prijsBijEenmaligeAfname}
            <span className="font-sans text-xs text-muted-foreground ml-2">
              &euro; {kuur.perBehandelingBijEenmaligeAfname} per behandeling
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default function Tarieven() {
  const doelgroepen = doelgroepenMetTarieven()
  const overige = gevuldeOverigeTariefgroepen()

  return (
    <main id="inhoud" className="overflow-x-clip">
      <div className="ssz-leesbalk" aria-hidden="true" />
      <Navbar />
      <TarievenMelder />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            kruimelpadSchema([
              { naam: "Home", pad: "/" },
              { naam: "Tarieven", pad: "/tarieven" },
            ])
          ),
        }}
      />

      <article className="pt-36 pb-24 md:pt-44 md:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Tarieven</li>
            </ol>
          </nav>

          <span
            className="font-sans text-xs tracking-[0.4em] uppercase mb-5 block"
            style={{ color: "var(--rose-gold)" }}
          >
            Wat kost het
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-6 leading-tight">
            Tarieven in {ADRES.plaats}
          </h1>
          <div className="w-10 h-px mb-8" style={{ backgroundColor: "var(--rose-gold)" }} />
          <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-2xl mb-4">
            Bij laserontharing hangt de prijs af van het gebied dat u wilt laten
            behandelen. Het intakegesprek is gratis: daarin kijken we samen wat er
            nodig is en weet u precies waar u aan toe bent.
          </p>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-2xl">
            {KUUR_ADVIES}
          </p>

          {/* Per doelgroep: eerst de pakketten, dan de losse lichaamsdelen */}
          <div className="flex flex-col gap-14 mt-16">
            {doelgroepen.map((doelgroep) => (
              <Fragment key={doelgroep.id}>
                {(doelgroep.kuren.length > 0 ||
                  doelgroep.pakketten.regels.length > 0) && (
                  <section id={`pakketten-${doelgroep.id}`}>
                    <h2 className="font-serif text-2xl text-foreground mb-2">
                      Pakketten &mdash; {doelgroep.naam}
                    </h2>
                    {doelgroep.kuren.length > 0 && (
                      <p className="font-sans text-xs text-muted-foreground mb-6">
                        Een kuur van zes behandelingen, met extra korting bij
                        afname in één keer.
                      </p>
                    )}

                    {doelgroep.kuren.length > 0 && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {doelgroep.kuren.map((kuur) => (
                            <Kuurkaart key={kuur.titel} kuur={kuur} />
                          ))}
                        </div>
                        <p className="font-sans text-xs text-muted-foreground mt-6 leading-relaxed">
                          {doelgroep.voorwaarden}
                        </p>
                      </>
                    )}

                    {doelgroep.pakketten.regels.length > 0 && (
                      <div className="mt-10">
                        <h3 className="font-serif text-xl text-foreground mb-2">
                          {doelgroep.pakketten.titel}
                        </h3>
                        {doelgroep.pakketten.toelichting && (
                          <p className="font-sans text-xs text-muted-foreground mb-6">
                            {doelgroep.pakketten.toelichting}
                          </p>
                        )}
                        <Prijstabel groep={doelgroep.pakketten} />
                      </div>
                    )}
                  </section>
                )}

                {doelgroep.lichaamsdelen.regels.length > 0 && (
                  <section id={`lichaamsdelen-${doelgroep.id}`}>
                    <h2 className="font-serif text-2xl text-foreground mb-2">
                      {doelgroep.lichaamsdelen.titel}
                    </h2>
                    {doelgroep.lichaamsdelen.toelichting && (
                      <p className="font-sans text-xs text-muted-foreground mb-6">
                        {doelgroep.lichaamsdelen.toelichting}
                      </p>
                    )}
                    <Prijstabel groep={doelgroep.lichaamsdelen} />
                  </section>
                )}
              </Fragment>
            ))}

            {overige.map((groep) => (
              <section key={groep.id} id={groep.id}>
                <h2 className="font-serif text-2xl text-foreground mb-2">
                  {groep.titel}
                </h2>
                {groep.toelichting && (
                  <p className="font-sans text-xs text-muted-foreground mb-6">
                    {groep.toelichting}
                  </p>
                )}
                <Prijstabel groep={groep} />
              </section>
            ))}
          </div>

          {/* Actie */}
          <div className="mt-16 flex flex-wrap gap-4">
            <Link
              href="/boeken?behandeling=consult"
              className="ssz-veeg font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 text-[color:var(--cream)] transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: "var(--rose-gold)" }}
            >
              Gratis intakegesprek
            </Link>
            <a
              href={TELEFOON_HREF}
              data-analytics="click_telefoon"
              className="font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 border transition-colors duration-200"
              style={{ borderColor: "var(--rose-gold)", color: "var(--rose-gold)" }}
            >
              Bel {TELEFOON_WEERGAVE}
            </a>
          </div>

          <div className="mt-16 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
            <p
              className="font-sans text-xs tracking-[0.2em] uppercase mb-5"
              style={{ color: "var(--rose-gold)" }}
            >
              Meer over de behandelingen
            </p>
            <ul className="flex flex-col gap-3">
              {behandelingen.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/${b.slug}`}
                    className="font-sans text-sm text-foreground hover:text-[color:var(--rose-gold)] transition-colors"
                  >
                    {b.tag} in {ADRES.plaats}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
