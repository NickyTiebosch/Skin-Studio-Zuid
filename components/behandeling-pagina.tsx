import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Behandeling } from "@/lib/behandelingen"
import { behandelingen } from "@/lib/behandelingen"
import {
  SITE_URL,
  behandelingSchema,
  faqSchema,
  kruimelpadSchema,
} from "@/lib/site"
import { TELEFOON_HREF, TELEFOON_WEERGAVE } from "@/lib/contact"

/**
 * De opmaak die /laserontharing en /gezichtsbehandelingen delen.
 *
 * Beide routes zijn dunne bestanden die hier hun inhoud vandaan halen; zo
 * blijft de opmaak op één plek en kan er geen verschil tussen de twee
 * pagina's insluipen.
 */
export function BehandelingPagina({ behandeling }: { behandeling: Behandeling }) {
  const paginaUrl = `${SITE_URL}/${behandeling.slug}`
  const andere = behandelingen.filter((b) => b.slug !== behandeling.slug)

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            behandelingSchema(behandeling),
            faqSchema(behandeling.faq, paginaUrl),
            kruimelpadSchema([
              { naam: "Home", pad: "/" },
              { naam: behandeling.tag, pad: `/${behandeling.slug}` },
            ]),
          ]),
        }}
      />

      {/* Kop met beeld */}
      <header className="pt-32 pb-12 md:pt-40 md:pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{behandeling.tag}</li>
            </ol>
          </nav>

          <span
            className="font-sans text-xs tracking-[0.4em] uppercase mb-5 block"
            style={{ color: "var(--rose-gold)" }}
          >
            {behandeling.detail}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-6 leading-tight">
            {behandeling.paginaTitel}
          </h1>
          <div className="w-10 h-px mb-8" style={{ backgroundColor: "var(--rose-gold)" }} />
          <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
            {behandeling.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href={`/boeken?behandeling=${behandeling.formulierWaarde}`}
              className="font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 text-[color:var(--cream)] transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: "var(--rose-gold)" }}
            >
              Afspraak maken
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
        </div>
      </header>

      <div className="relative h-72 md:h-[28rem] mb-16 md:mb-24">
        <Image
          src={behandeling.image}
          alt={behandeling.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Uitleg */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Hoe het werkt
          </h2>
          <div className="flex flex-col gap-6 font-sans text-sm leading-relaxed text-muted-foreground">
            {behandeling.uitleg.map((alinea) => (
              <p key={alinea.slice(0, 40)}>{alinea}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Voordelen */}
      {behandeling.benefits && (
        <section className="px-6 pb-16 md:pb-24" style={{ backgroundColor: "var(--sand)" }}>
          <div className="max-w-2xl mx-auto pt-16 md:pt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
              {behandeling.benefitsHeading ?? "De voordelen op een rij"}
            </h2>
            <ul className="flex flex-col gap-6">
              {behandeling.benefits.map((voordeel) => (
                <li key={voordeel.label} className="flex gap-4">
                  <Check
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--rose-gold)" }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-sans text-sm font-medium text-foreground mb-1">
                      {voordeel.label}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                      {voordeel.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Veelgestelde vragen */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
            Veelgestelde vragen
          </h2>
          <div className="flex flex-col gap-8">
            {behandeling.faq.map((item) => (
              <div key={item.vraag}>
                <h3 className="font-serif text-lg text-foreground mb-2">{item.vraag}</h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.antwoord}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Naar de andere behandeling */}
      {andere.length > 0 && (
        <section className="px-6 pb-16 md:pb-24">
          <div className="max-w-2xl mx-auto">
            {andere.map((b) => (
              <Link
                key={b.slug}
                href={`/${b.slug}`}
                className="flex items-center justify-between gap-6 p-6 md:p-8 border transition-colors duration-200 hover:border-[color:var(--rose-gold)]"
                style={{ borderColor: "var(--border)" }}
              >
                <div>
                  <span
                    className="font-sans text-xs tracking-[0.2em] uppercase block mb-2"
                    style={{ color: "var(--rose-gold)" }}
                  >
                    Ook bij Skin Studio Zuid
                  </span>
                  <span className="font-serif text-xl text-foreground">{b.tag}</span>
                </div>
                <ArrowRight size={20} style={{ color: "var(--rose-gold)" }} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
