import Image from "next/image"
import Link from "next/link"
import { behandelingen } from "@/lib/behandelingen"
import { ADRES } from "@/lib/contact"
import HeroBeeld from "@/Images/1000026036.jpg"

/**
 * Richting 2 — Rijk.
 *
 * Diepte in plaats van witruimte: donker walnoot, gelaagd beeld, filmkorrel
 * en gouden lijnwerk. De hero staat stil — daar wordt de laadtijd gemeten, en
 * een fade of verschuiving op dat beeld kost punten. Alle beweging begint pas
 * onder de vouw: de kaarten komen op, de foto's schuiven zeer traag mee.
 */
export function VariantRijk() {
  return (
    <div style={{ backgroundColor: "var(--walnut)" }}>
      {/* Hero: beeld, verlopende scrim, korrel. Geen beweging. */}
      <div className="ssz-scrim ssz-korrel relative h-[78vh] min-h-[520px] overflow-hidden isolate">
        <Image
          src={HeroBeeld}
          alt="De behandelkamer van Skin Studio Zuid"
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center -z-10"
        />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <p
              className="ssz-caps font-sans text-sm mb-7"
              style={{ color: "var(--rose-gold-light)" }}
            >
              Skin Studio Zuid &mdash; {ADRES.plaats}
            </p>

            <h2
              className="ssz-display font-serif leading-[1.02] max-w-3xl"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 5rem)",
                color: "var(--cream)",
              }}
            >
              Geef je huid de aandacht die het verdient.
            </h2>

            <div
              className="h-px w-32 my-9"
              style={{
                background:
                  "linear-gradient(to right, var(--rose-gold), transparent)",
              }}
            />

            <div className="flex flex-wrap gap-4">
              <Link
                href="/boeken"
                className="ssz-caps font-sans text-sm px-9 py-4 transition-opacity duration-300 hover:opacity-90"
                style={{
                  backgroundColor: "var(--rose-gold)",
                  color: "var(--cream)",
                }}
              >
                Afspraak maken
              </Link>
              <Link
                href="/tarieven"
                className="ssz-caps font-sans text-sm px-9 py-4 border transition-colors duration-300"
                style={{
                  borderColor: "color-mix(in oklch, var(--cream) 45%, transparent)",
                  color: "var(--cream)",
                }}
              >
                Tarieven
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Behandelingen als gelaagde kaarten */}
      <div className="px-6 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="ssz-reveal mb-16 md:mb-20">
            <p
              className="ssz-caps font-sans text-sm mb-5"
              style={{ color: "var(--rose-gold-light)" }}
            >
              Behandelingen
            </p>
            <h3
              className="ssz-display font-serif text-3xl md:text-5xl max-w-lg leading-tight"
              style={{ color: "var(--cream)" }}
            >
              Twee specialismen, één studio
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {behandelingen.map((b) => (
              <article
                key={b.slug}
                className="ssz-reveal ssz-goudrand ssz-til group overflow-hidden"
                style={
                  {
                    "--vlak": "var(--walnut-mid)",
                  } as React.CSSProperties
                }
              >
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <Image
                    src={b.image}
                    alt={b.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="ssz-drift ssz-vervaag-onder object-cover object-center"
                  />
                </div>

                <div className="relative p-7 md:p-9 -mt-16">
                  <p
                    className="ssz-caps font-sans text-sm mb-4"
                    style={{ color: "var(--rose-gold-light)" }}
                  >
                    {b.tag}
                  </p>
                  <h4
                    className="ssz-display font-serif text-2xl md:text-3xl mb-5 leading-tight"
                    style={{ color: "var(--cream)" }}
                  >
                    {b.title}
                  </h4>
                  <p
                    className="ssz-lopend font-sans text-sm leading-[1.8] mb-7"
                    style={{
                      color: "color-mix(in oklch, var(--cream) 72%, transparent)",
                    }}
                  >
                    {b.description}
                  </p>
                  <Link
                    href={`/${b.slug}`}
                    className="ssz-caps font-sans text-sm border-b pb-1 transition-colors duration-300"
                    style={{
                      color: "var(--rose-gold-light)",
                      borderColor:
                        "color-mix(in oklch, var(--rose-gold-light) 50%, transparent)",
                    }}
                  >
                    {b.tag} in {ADRES.plaats}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
