import type { Metadata } from "next"
import Link from "next/link"
import { VariantIngetogen } from "@/components/stijl/variant-ingetogen"
import { VariantRijk } from "@/components/stijl/variant-rijk"
import { VariantEditorial } from "@/components/stijl/variant-editorial"

/**
 * Tijdelijke vergelijkingspagina voor de uitstraling van de site.
 *
 * Drie uitwerkingen van dezelfde inhoud, onder elkaar, zodat het verschil in
 * één scroll te zien is. De inhoud komt uit lib/behandelingen.ts — dezelfde
 * bron als de echte pagina's, zodat er geen tweede kopie van de teksten
 * ontstaat.
 *
 * Deze route staat op noindex en ontbreekt bewust in app/sitemap.ts: het is
 * feitelijk een tweede versie van de homepage, en die hoort niet in Google.
 * Zodra de richting gekozen is kan deze map met de drie varianten weg.
 */
export const metadata: Metadata = {
  title: "Stijlvoorbeelden",
  robots: { index: false, follow: false },
}

const varianten = [
  {
    id: "ingetogen",
    nummer: "01",
    titel: "Ingetogen",
    kern: "Rust, ruimte en typografie",
    tekst:
      "De hero is geen schermvullende foto maar een tekstvlak; het beeld komt " +
      "daarna. De behandelingen staan als een genummerde lijst onder elkaar. " +
      "Wat het duur maakt zit in de witruimte en de letters, niet in beweging.",
    lijkt: "Aesop, The Row",
    beweging: "Eén trage fade per blok. Verder niets.",
  },
  {
    id: "rijk",
    nummer: "02",
    titel: "Rijk",
    kern: "Diepte, laag over laag",
    tekst:
      "Donker walnoot, filmkorrel over het beeld, een gouden rand die bij " +
      "hover langzaam van hoek verandert. De foto's in de kaarten schuiven " +
      "heel traag mee met de scroll.",
    lijkt: "Augustinus Bader, La Mer",
    beweging: "Hero staat stil. Kaarten komen op, foto's driften mee.",
  },
  {
    id: "editorial",
    nummer: "03",
    titel: "Editorial",
    kern: "Raster en schaalcontrast",
    tekst:
      "Een ongelijke verdeling van 5 om 7, met de tekst links en het beeld " +
      "rechts over de volle hoogte. Bij de behandelingen blijft de linkerkolom " +
      "staan terwijl de foto's ernaast doorlopen.",
    lijkt: "Modetijdschrift, Celine",
    beweging: "Vaste kolom bij het scrollen, beeld dat traag meebeweegt.",
  },
]

export default function Stijl() {
  return (
    <main>
      {/* Toelichting vooraf */}
      <section
        className="px-6 pt-20 pb-16 md:pt-28 md:pb-20"
        style={{ backgroundColor: "var(--walnut)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="ssz-caps font-sans text-sm mb-6"
            style={{ color: "var(--rose-gold-light)" }}
          >
            Ter beoordeling &mdash; niet openbaar
          </p>
          <h1
            className="ssz-display font-serif text-3xl md:text-5xl leading-tight mb-7"
            style={{ color: "var(--cream)" }}
          >
            Drie richtingen voor de uitstraling
          </h1>
          <p
            className="ssz-lopend font-sans text-sm md:text-base leading-[1.85] mb-6"
            style={{
              color: "color-mix(in oklch, var(--cream) 78%, transparent)",
            }}
          >
            Dezelfde inhoud, drie keer anders vormgegeven. Het lettertype, de
            kleuren en de teksten zijn overal gelijk aan wat er nu op de site
            staat &mdash; alleen de opmaak en de beweging verschillen. Scroll er
            doorheen en kies er één; daarna werk ik die richting uit over de
            hele site.
          </p>
          <p
            className="ssz-lopend font-sans text-sm leading-[1.85] mb-12"
            style={{
              color: "color-mix(in oklch, var(--cream) 58%, transparent)",
            }}
          >
            De beweging is met CSS gebouwd en niet met een animatiebibliotheek.
            Dat scheelt zo&apos;n 35 kB JavaScript en houdt de secties
            server-side, wat direct meetelt voor de snelheidsscore waar Google op
            let. Wie in zijn systeeminstellingen beweging heeft uitgezet, of een
            browser gebruikt die het niet ondersteunt, ziet gewoon de complete
            pagina zonder animatie.
          </p>

          <nav aria-label="Naar een richting">
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {varianten.map((v) => (
                <li key={v.id}>
                  <a
                    href={`#${v.id}`}
                    className="ssz-til block h-full p-5 border transition-colors duration-300"
                    style={{
                      borderColor:
                        "color-mix(in oklch, var(--cream) 22%, transparent)",
                    }}
                  >
                    <span
                      className="ssz-cijfers font-serif text-sm block mb-3 opacity-60"
                      style={{ color: "var(--rose-gold-light)" }}
                    >
                      {v.nummer}
                    </span>
                    <span
                      className="font-serif text-xl block mb-2"
                      style={{ color: "var(--cream)" }}
                    >
                      {v.titel}
                    </span>
                    <span
                      className="font-sans text-xs block leading-relaxed"
                      style={{
                        color:
                          "color-mix(in oklch, var(--cream) 60%, transparent)",
                      }}
                    >
                      {v.kern}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {varianten.map((v) => (
        <section key={v.id} id={v.id} className="scroll-mt-0">
          {/* Toelichtingsstrip boven elke variant */}
          <div
            className="px-6 py-8 md:py-10"
            style={{ backgroundColor: "var(--walnut-mid)" }}
          >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              <div className="md:col-span-4">
                <span
                  className="ssz-cijfers font-serif text-sm block mb-2 opacity-70"
                  style={{ color: "var(--rose-gold-light)" }}
                >
                  {v.nummer}
                </span>
                <h2
                  className="font-serif text-2xl md:text-3xl mb-1"
                  style={{ color: "var(--cream)" }}
                >
                  {v.titel}
                </h2>
                <p
                  className="font-sans text-xs"
                  style={{
                    color:
                      "color-mix(in oklch, var(--cream) 55%, transparent)",
                  }}
                >
                  In de geest van {v.lijkt}
                </p>
              </div>

              <div className="md:col-span-8">
                <p
                  className="ssz-lopend font-sans text-sm leading-[1.8] mb-3"
                  style={{
                    color:
                      "color-mix(in oklch, var(--cream) 82%, transparent)",
                  }}
                >
                  {v.tekst}
                </p>
                <p
                  className="font-sans text-xs leading-relaxed"
                  style={{ color: "var(--rose-gold-light)" }}
                >
                  Beweging: {v.beweging}
                </p>
              </div>
            </div>
          </div>

          {v.id === "ingetogen" && <VariantIngetogen />}
          {v.id === "rijk" && <VariantRijk />}
          {v.id === "editorial" && <VariantEditorial />}
        </section>
      ))}

      {/* Afsluiting */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: "var(--walnut)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="ssz-display font-serif text-2xl md:text-4xl leading-tight mb-6"
            style={{ color: "var(--cream)" }}
          >
            En dan?
          </h2>
          <p
            className="ssz-lopend font-sans text-sm md:text-base leading-[1.85] mb-5"
            style={{
              color: "color-mix(in oklch, var(--cream) 78%, transparent)",
            }}
          >
            Laat weten welke richting het wordt &mdash; of welke onderdelen uit
            verschillende richtingen u wilt combineren; dat kan ook. Daarna
            werk ik het uit over de homepage, de twee behandelpagina&apos;s en de
            tarievenpagina, en meet ik de laadtijd voor en na.
          </p>
          <p
            className="ssz-lopend font-sans text-sm leading-[1.85] mb-10"
            style={{
              color: "color-mix(in oklch, var(--cream) 58%, transparent)",
            }}
          >
            Deze pagina is niet vindbaar in Google en staat niet in de sitemap.
            Zodra de keuze gemaakt is verdwijnt hij.
          </p>

          <Link
            href="/"
            className="ssz-caps font-sans text-sm px-8 py-4 inline-block transition-opacity duration-300 hover:opacity-90"
            style={{
              backgroundColor: "var(--rose-gold)",
              color: "var(--cream)",
            }}
          >
            Naar de huidige site
          </Link>
        </div>
      </section>
    </main>
  )
}
