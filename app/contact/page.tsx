import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ADRES,
  BEDRIJFSNAAM,
  EMAIL,
  EMAIL_HREF,
  INSTAGRAM,
  OPENINGSTIJDEN_TEKST,
  PLAATS_ZOEKNAAM,
  TELEFOON_HREF,
  TELEFOON_WEERGAVE,
  WERKGEBIED,
  WIJK,
} from "@/lib/contact"
import { OPENGRAPH_BASIS, kruimelpadSchema } from "@/lib/site"
import { bijgewerktTekst } from "@/lib/bijgewerkt"

/**
 * De contactpagina: één adres met de bedrijfsgegevens.
 *
 * Tot 9 oktober 2026 was "contact" een anker op de homepage. Een Google
 * Business Profile, een gids of een AI-assistent wil echter naar één URL
 * kunnen verwijzen waar naam, adres, telefoon en werkgebied staan — en die
 * URL moet dezelfde gegevens tonen als het profiel. Het aanvraagformulier
 * blijft op /boeken; deze pagina verwijst ernaar.
 */
export const metadata: Metadata = {
  title: `Contact en adres in ${PLAATS_ZOEKNAAM}`,
  description:
    `Contactgegevens van ${BEDRIJFSNAAM} in ${PLAATS_ZOEKNAAM}: adres, telefoon, ` +
    `e-mail en werkgebied. Vraag een afspraak aan of bel ${TELEFOON_WEERGAVE}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    ...OPENGRAPH_BASIS,
    type: "website",
    url: "/contact",
    title: `Contact — ${BEDRIJFSNAAM}`,
    description: `Adres, telefoon en werkgebied van ${BEDRIJFSNAAM} in ${PLAATS_ZOEKNAAM}.`,
  },
}

const gegevens: { label: string; waarde: string; href?: string; analytics?: string }[] = [
  {
    label: "Adres",
    waarde: `${ADRES.straat}, ${ADRES.postcode} ${ADRES.plaats}`,
  },
  {
    label: "Telefoon",
    waarde: TELEFOON_WEERGAVE,
    href: TELEFOON_HREF,
    analytics: "click_telefoon",
  },
  { label: "E-mail", waarde: EMAIL, href: EMAIL_HREF, analytics: "click_email" },
  { label: "Openingstijden", waarde: OPENINGSTIJDEN_TEKST },
  {
    label: "Instagram",
    waarde: "@skinstudio_zuid",
    href: INSTAGRAM,
    analytics: "click_instagram",
  },
]

export default function Contact() {
  const bijgewerkt = bijgewerktTekst("/contact")
  const werkgebied = `${WERKGEBIED.slice(0, -1).join(", ")} en ${WERKGEBIED[WERKGEBIED.length - 1]}`

  return (
    <main id="inhoud" className="overflow-x-clip">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            kruimelpadSchema([
              { naam: "Home", pad: "/" },
              { naam: "Contact", pad: "/contact" },
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
              <li className="text-foreground">Contact</li>
            </ol>
          </nav>

          <span
            className="font-sans text-xs tracking-[0.4em] uppercase mb-5 block"
            style={{ color: "var(--rose-gold)" }}
          >
            Contact
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-6 leading-tight">
            {BEDRIJFSNAAM} in {PLAATS_ZOEKNAAM}
          </h1>
          <div className="w-10 h-px mb-8" style={{ backgroundColor: "var(--rose-gold)" }} />
          <p className="font-sans text-sm md:text-base leading-relaxed text-foreground max-w-2xl mb-4">
            {BEDRIJFSNAAM} is een kliniek voor laserontharing en gezichtsbehandelingen
            aan de {ADRES.straat} {WIJK}. Bel {TELEFOON_WEERGAVE}, mail naar {EMAIL} of
            vraag online een afspraak aan; wij bevestigen per e-mail of telefoon.
          </p>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-2xl">
            Wij werken op afspraak. Een intakegesprek voor laserontharing is gratis en
            vrijblijvend.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {gegevens.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <p
                  className="font-sans text-xs tracking-[0.2em] uppercase"
                  style={{ color: "var(--rose-gold)" }}
                >
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    data-analytics={item.analytics}
                    className="font-sans text-sm text-foreground hover:text-[color:var(--rose-gold)] transition-colors"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.waarde}
                  </a>
                ) : (
                  <p className="font-sans text-sm text-foreground">{item.waarde}</p>
                )}
              </div>
            ))}
          </div>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Waar komen onze klanten vandaan?
            </h2>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-2xl">
              De studio zit {WIJK} en is goed bereikbaar vanuit {werkgebied}. Ook uit de
              rest van de regio bent u welkom.
            </p>
          </section>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/boeken"
              data-analytics="click_afspraak"
              data-analytics-plek="contact"
              className="ssz-veeg font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 text-[color:var(--cream)] transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: "var(--rose-gold)" }}
            >
              Afspraak aanvragen
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

          {bijgewerkt && (
            <p className="font-sans text-xs text-muted-foreground mt-16">
              Bijgewerkt op {bijgewerkt}
            </p>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}
