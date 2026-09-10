import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/editie2/navbar"
import { Footer } from "@/components/editie2/footer"
import { Huidlagen } from "@/components/editie2/huidlagen"
import { Lichtband } from "@/components/editie2/accenten/lichtband"
import type { Behandeling } from "@/lib/behandelingen"
import { behandelingen } from "@/lib/behandelingen"
import {
  SITE_URL,
  behandelingSchema,
  faqSchema,
  kruimelpadSchema,
} from "@/lib/site"
import { TELEFOON_HREF, TELEFOON_WEERGAVE } from "@/lib/contact"
import { Paginaovergang, behandelingOvergang } from "@/components/paginaovergang"
import { BIJSCHRIFT_AI, gezichtKop, isAiBeeld, laserKop } from "@/lib/editie2/beeld"

/**
 * De opmaak die /laserontharing en /gezichtsbehandelingen delen, in editie 2.
 *
 * Zelfde props als de eerste versie, zodat de twee routes alleen hun
 * importregel wisselen. Alles wat een zoekmachine of een AI-assistent leest
 * blijft identiek: dezelfde drie JSON-LD-blokken met dezelfde @id's, dezelfde
 * ene h1, hetzelfde kruimelpad, en in de FAQ letterlijk dezelfde vraagtekst
 * als in het schema — dat laatste is een eis van faqSchema() in lib/site.ts.
 *
 * Wat wél verandert is de vorm: de balk en de footer van editie 2, een breed
 * kopbeeld, een tweekolomsopzet met een meelopende kop, glas voor de
 * voordelen, een uitvouwbare FAQ, en per behandeling één eigen accent —
 * de huidlagen bij de gezichtsbehandeling, de lichtband bij laserontharing.
 *
 * Die accentkeuze staat bewust hier en niet in lib/behandelingen.ts: dat
 * bestand beschrijft de behandeling, niet hoe editie 2 haar in beeld brengt.
 */
export function BehandelingPagina({ behandeling }: { behandeling: Behandeling }) {
  const paginaUrl = `${SITE_URL}/${behandeling.slug}`
  const andere = behandelingen.filter((b) => b.slug !== behandeling.slug)
  const isGezicht = behandeling.slug === "gezichtsbehandelingen"
  const heeftHuidlagen = isGezicht && (behandeling.benefits?.length ?? 0) > 0
  const sfeer = isGezicht ? gezichtKop : laserKop

  return (
    <main id="inhoud" className="overflow-x-clip">
      <div className="ssz-leesbalk" aria-hidden="true" />
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

      {/* ---------------------------------------------------------------
          Kop. De h1 staat achter hetzelfde masker als op de homepage:
          puur transform, dekking onaangeroerd, want dit is het eerste wat
          een bezoeker leest.
          --------------------------------------------------------------- */}
      <header className="ssz-intro e2-korrel relative overflow-clip px-6 pb-12 pt-32 md:pb-16 md:pt-40">
        <div
          className="e2-gloed pointer-events-none absolute -right-[18vw] -top-[10vh] h-[70vh] w-[70vw]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl">
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{behandeling.tag}</li>
            </ol>
          </nav>

          <span
            className="ssz-intro-op mb-5 block font-sans text-xs uppercase tracking-[0.4em]"
            style={{ color: "var(--rose-gold)" }}
          >
            {behandeling.detail}
          </span>

          <div className="ssz-regel mb-6">
            <h1 className="ssz-regel-binnen font-serif text-3xl leading-tight text-balance text-foreground md:text-5xl">
              {behandeling.paginaTitel}
            </h1>
          </div>

          <div
            className="ssz-intro-lijn ssz-vertraag-1 mb-8 h-px w-10"
            style={{ backgroundColor: "var(--rose-gold)" }}
          />

          <p className="ssz-intro-op ssz-vertraag-2 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            {behandeling.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href={`/boeken?behandeling=${behandeling.formulierWaarde}`}
              className="ssz-veeg ssz-intro-op ssz-vertraag-3 whitespace-nowrap px-8 py-4 text-center font-sans text-xs uppercase tracking-[0.2em] text-[color:var(--cream)] transition-colors duration-300"
              style={{ backgroundColor: "var(--rose-gold)" }}
            >
              Afspraak maken
            </Link>
            <a
              href={TELEFOON_HREF}
              data-analytics="click_telefoon"
              className="ssz-intro-op ssz-vertraag-4 whitespace-nowrap border px-8 py-4 text-center font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300"
              style={{ borderColor: "var(--rose-gold)", color: "var(--rose-gold)" }}
            >
              Bel {TELEFOON_WEERGAVE}
            </a>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------
          Kopbeeld. Dezelfde overgangsnaam als de kaart op de homepage, dus
          de foto groeit door in plaats van dat het scherm omklapt. Daarom
          ook hetzelfde bronbeeld als op die kaart.

          Waarom niet over de volle breedte: beide behandelfoto's zijn
          1024x1024. Een 21:9-uitsnede daaruit is 1024x439, en die over 1440px
          uitsmeren kost zichtbaar scherpte — juist op het element dat de
          laadtijdmeting oppikt. Binnen max-w-6xl blijft de opschaling onder
          de 13%. Zodra er een echt breed bronbeeld is (mijlpaal M4) kan deze
          band alsnog het hele scherm vullen.

          Enig priority-beeld op deze pagina: geen animatie op de dekking.
          --------------------------------------------------------------- */}
      <div className="px-6">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-clip md:aspect-[21/9]">
          <Paginaovergang naam={behandelingOvergang(behandeling.slug)}>
            <Image
              src={behandeling.image}
              alt={behandeling.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="object-cover object-center"
            />
          </Paginaovergang>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
            style={{
              background: "linear-gradient(to top, var(--background), transparent)",
            }}
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------
          Hoe het werkt. Op desktop blijft de kop staan terwijl de uitleg
          langsloopt; op mobiel is het gewoon een kop met alinea's.
          --------------------------------------------------------------- */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span
              className="mb-4 block font-sans text-xs uppercase tracking-[0.4em]"
              style={{ color: "var(--rose-gold)" }}
            >
              Zo werkt het
            </span>
            <h2 className="font-serif text-2xl text-balance text-foreground md:text-4xl">
              Hoe het werkt
            </h2>
            <div
              className="ssz-lijn mt-6 h-px w-10"
              style={{ backgroundColor: "var(--rose-gold)" }}
            />
          </div>

          <div className="ssz-trap flex flex-col gap-6">
            {behandeling.uitleg.map((alinea) => (
              <p
                key={alinea.slice(0, 40)}
                className="ssz-op font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {alinea}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Het accent van deze behandeling. */}
      {heeftHuidlagen ? (
        <Huidlagen behandeling={behandeling} />
      ) : (
        <Lichtband />
      )}

      {/* ---------------------------------------------------------------
          Voordelen als glas-kaarten. Bij de gezichtsbehandeling staan die
          al in de huidlagen hierboven, dus dan slaan we ze over: dezelfde
          drie punten twee keer onder elkaar is geen ontwerp.
          --------------------------------------------------------------- */}
      {behandeling.benefits && !heeftHuidlagen && (
        <section className="e2-korrel relative overflow-clip px-6 py-16 md:py-24">
          <div className="relative mx-auto max-w-6xl">
            <header className="ssz-op mb-10 max-w-2xl md:mb-14">
              <h2 className="font-serif text-2xl text-balance text-foreground md:text-4xl">
                {behandeling.benefitsHeading ?? "De voordelen op een rij"}
              </h2>
            </header>
            <ul className="ssz-trap grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
              {behandeling.benefits.map((voordeel, i) => (
                <li key={voordeel.label} className="ssz-op ssz-til e2-glas flex flex-col p-7 md:p-8">
                  <span
                    className="mb-4 font-sans text-[11px] tracking-[0.25em]"
                    style={{ color: "var(--rose-gold)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mb-3 font-serif text-xl text-foreground md:text-2xl">
                    {voordeel.label}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {voordeel.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Sfeerband: een adempauze tussen de uitleg en de vragen. */}
      <div className="relative aspect-[21/9] w-full overflow-clip">
        <Image
          src={sfeer.src}
          alt={sfeer.alt}
          fill
          sizes="100vw"
          className="ssz-drift object-cover"
          style={{ objectPosition: sfeer.positie }}
        />
        {isAiBeeld(sfeer) && (
          <span className="e2-glas absolute bottom-4 left-6 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:left-10">
            {BIJSCHRIFT_AI}
          </span>
        )}
      </div>

      {/* ---------------------------------------------------------------
          Veelgestelde vragen. De vraagtekst in de <summary> is letterlijk
          `item.vraag` — dezelfde string die in het FAQ-schema staat. Wijk
          daar niet van af, ook niet met een toegevoegd leesteken.
          --------------------------------------------------------------- */}
      <section className="px-6 py-16 md:py-24" aria-labelledby="e2-faq-kop">
        <div className="mx-auto max-w-3xl">
          <header className="ssz-op mb-10 md:mb-12">
            <span
              className="mb-4 block font-sans text-xs uppercase tracking-[0.4em]"
              style={{ color: "var(--rose-gold)" }}
            >
              Goed om te weten
            </span>
            <h2
              id="e2-faq-kop"
              className="font-serif text-2xl text-balance text-foreground md:text-4xl"
            >
              Veelgestelde vragen
            </h2>
          </header>

          <div className="ssz-trap flex flex-col">
            {behandeling.faq.map((item) => (
              <details key={item.vraag} className="ssz-op e2-vouw">
                <summary className="e2-vouw-kop">
                  <h3 className="font-serif text-lg text-foreground md:text-xl">
                    {item.vraag}
                  </h3>
                  <span className="e2-vouw-teken" aria-hidden="true" />
                </summary>
                <p className="e2-vouw-tekst font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.antwoord}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Doorverwijzingen. */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5">
          <Link
            href="/tarieven"
            className="ssz-op ssz-til e2-glas flex items-center justify-between gap-6 p-6 md:p-8"
          >
            <div>
              <span
                className="mb-2 block font-sans text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--rose-gold)" }}
              >
                Wat kost het
              </span>
              <span className="font-serif text-xl text-foreground">
                Tarieven en behandelduur
              </span>
            </div>
            <ArrowRight size={20} style={{ color: "var(--rose-gold)" }} aria-hidden="true" />
          </Link>

          {andere.map((b) => (
            <Link
              key={b.slug}
              href={`/${b.slug}`}
              className="ssz-op ssz-til e2-glas flex items-center justify-between gap-6 p-6 md:p-8"
            >
              <div>
                <span
                  className="mb-2 block font-sans text-xs uppercase tracking-[0.2em]"
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

      <Footer />
    </main>
  )
}
