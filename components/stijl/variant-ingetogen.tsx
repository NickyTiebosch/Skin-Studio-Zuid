import Image from "next/image"
import Link from "next/link"
import { behandelingen } from "@/lib/behandelingen"
import { ADRES } from "@/lib/contact"
import HeroBeeld from "@/Images/1000026002.jpg"

/**
 * Richting 1 — Ingetogen.
 *
 * Het uitgangspunt is dat dure merken minder doen, niet meer. De hero is
 * bewust geen schermvullende foto maar een rustig tekstvlak; het beeld komt
 * er daarna pas, als een brede band. Wat het duur maakt zit in de typografie
 * en de witruimte, niet in beweging: één trage fade per blok en verder niets.
 */
export function VariantIngetogen() {
  return (
    <div style={{ backgroundColor: "var(--sand-light)" }}>
      {/* Kop */}
      <div className="px-6 pt-24 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <p
            className="ssz-caps font-sans text-sm mb-10"
            style={{ color: "var(--rose-gold)" }}
          >
            Skin Studio Zuid &mdash; {ADRES.plaats}
          </p>

          <h2
            className="ssz-display font-serif text-foreground leading-[1.04] mb-10"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
          >
            Geef je huid de aandacht die het verdient.
          </h2>

          <div
            className="ssz-lijn h-px w-24 mb-10"
            style={{ backgroundColor: "var(--rose-gold)" }}
          />

          <p className="ssz-lopend font-sans text-base md:text-lg leading-[1.85] text-muted-foreground max-w-xl mb-14">
            Definitieve laserontharing en huidverbetering, in een studio waar de
            tijd voor u genomen wordt. Het kennismakingsgesprek is vrijblijvend.
          </p>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            <Link
              href="/boeken"
              className="ssz-caps font-sans text-sm border-b pb-1 transition-colors duration-300 hover:opacity-70"
              style={{ color: "var(--rose-gold)", borderColor: "var(--rose-gold)" }}
            >
              Afspraak maken
            </Link>
            <Link
              href="/tarieven"
              className="ssz-caps font-sans text-sm border-b pb-1 border-transparent text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Tarieven bekijken
            </Link>
          </div>
        </div>
      </div>

      {/* Beeld als brede band, niet als achtergrond */}
      <div className="relative h-[42vh] min-h-[280px] md:h-[58vh] overflow-hidden">
        <Image
          src={HeroBeeld}
          alt="De behandelkamer van Skin Studio Zuid"
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
      </div>

      {/* Behandelingen als lijst, één kolom */}
      <div className="px-6 py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <p
            className="ssz-caps ssz-reveal font-sans text-sm mb-16"
            style={{ color: "var(--rose-gold)" }}
          >
            Behandelingen
          </p>

          <ol className="flex flex-col">
            {behandelingen.map((b, i) => (
              <li
                key={b.slug}
                className="ssz-reveal border-t py-12 md:py-16"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex gap-8 md:gap-16">
                  <span
                    className="ssz-cijfers font-serif text-sm pt-2 shrink-0 opacity-50"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-xl">
                    <h3 className="ssz-display font-serif text-3xl md:text-4xl text-foreground mb-5 leading-tight">
                      {b.title}
                    </h3>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
