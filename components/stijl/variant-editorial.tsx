import Image from "next/image"
import Link from "next/link"
import { behandelingen } from "@/lib/behandelingen"
import { ADRES } from "@/lib/contact"
import HeroBeeld from "@/Images/1000026002.jpg"

/**
 * Richting 3 — Editorial.
 *
 * Opgezet als een modetijdschrift: een asymmetrisch raster, forse
 * schaalcontrasten en een kolom die blijft staan terwijl het beeld ernaast
 * doorloopt. Die vaste kolom is `position: sticky` — puur CSS, geen
 * scroll-listener, dus geen invloed op de reactiesnelheid van de pagina.
 */
export function VariantEditorial() {
  return (
    <div style={{ backgroundColor: "var(--sand)" }}>
      {/* Kop: tekst links, beeld rechts, ongelijke verdeling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">
        <div className="lg:col-span-5 flex items-center px-6 lg:pl-14 xl:pl-24 py-20 lg:py-0">
          <div>
            <p
              className="ssz-caps font-sans text-sm mb-9"
              style={{ color: "var(--rose-gold)" }}
            >
              Skin Studio Zuid &mdash; {ADRES.plaats}
            </p>

            <h2
              className="ssz-display font-serif text-foreground leading-[0.98] mb-9"
              style={{ fontSize: "clamp(3rem, 6vw, 5.25rem)" }}
            >
              Geef je huid
              <br />
              de aandacht
              <br />
              die het verdient.
            </h2>

            <p className="ssz-lopend font-sans text-sm leading-[1.9] text-muted-foreground max-w-sm mb-11">
              Definitieve laserontharing en huidverbetering, in een studio waar
              de tijd voor u genomen wordt.
            </p>

            <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
              <Link
                href="/boeken"
                className="ssz-caps font-sans text-sm px-8 py-4 transition-opacity duration-300 hover:opacity-90"
                style={{
                  backgroundColor: "var(--rose-gold)",
                  color: "var(--cream)",
                }}
              >
                Afspraak maken
              </Link>
              <Link
                href="/tarieven"
                className="ssz-caps font-sans text-sm border-b pb-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                style={{ borderColor: "var(--border)" }}
              >
                Tarieven
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative min-h-[52vh] lg:min-h-full overflow-hidden">
          <Image
            src={HeroBeeld}
            alt="De behandelkamer van Skin Studio Zuid"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            placeholder="blur"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Behandelingen: vaste kolom naast doorlopend beeld */}
      <div className="px-6 lg:px-14 xl:px-24 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p
                className="ssz-caps font-sans text-sm mb-6"
                style={{ color: "var(--rose-gold)" }}
              >
                Behandelingen
              </p>
              <h3
                className="ssz-display font-serif text-foreground leading-[1.05] mb-7"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
              >
                Twee specialismen, één studio
              </h3>
              <div
                className="ssz-lijn h-px w-20 mb-7"
                style={{ backgroundColor: "var(--rose-gold)" }}
              />
              <p className="ssz-lopend font-sans text-sm leading-[1.9] text-muted-foreground max-w-xs">
                Wat er bij u nodig is, bepalen we samen tijdens het gesprek
                vooraf. Dat gesprek is kosteloos.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-16 md:gap-24">
            {behandelingen.map((b, i) => (
              <article key={b.slug} className="ssz-reveal">
                <div className="relative h-[58vh] min-h-[340px] overflow-hidden mb-8">
                  <Image
                    src={b.image}
                    alt={b.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    className="ssz-drift object-cover object-center"
                  />
                </div>

                <div className="flex gap-6 md:gap-10">
                  <span
                    className="ssz-cijfers font-serif text-foreground/25 leading-none shrink-0"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="max-w-lg">
                    <p
                      className="ssz-caps font-sans text-sm mb-3"
                      style={{ color: "var(--rose-gold)" }}
                    >
                      {b.tag}
                    </p>
                    <h4 className="ssz-display font-serif text-2xl md:text-4xl text-foreground mb-5 leading-tight">
                      {b.title}
                    </h4>
                    <p className="ssz-lopend font-sans text-sm md:text-base leading-[1.85] text-muted-foreground mb-7">
                      {b.description}
                    </p>
                    <Link
                      href={`/${b.slug}`}
                      className="ssz-caps font-sans text-sm border-b pb-1 transition-colors duration-300 hover:opacity-70"
                      style={{
                        color: "var(--rose-gold)",
                        borderColor: "var(--rose-gold)",
                      }}
                    >
                      {b.tag} in {ADRES.plaats}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
