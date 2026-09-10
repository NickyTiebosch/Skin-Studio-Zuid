import Image from "next/image"
import Link from "next/link"
import { BIJSCHRIFT_AI, isAiBeeld, rondgang } from "@/lib/editie2/beeld"

const producten = [
  { naam: "Kalahari Hydration Serum", sub: "Diep voedend — voor alle huidtypes" },
  { naam: "Desert Rose Face Oil", sub: "Anti-aging — rijk aan antioxidanten" },
  { naam: "Mineral Glow Mask", sub: "Revitaliserend — één keer per week" },
  { naam: "Baobab Repair Cream", sub: "Intensief herstellend — nachtcrème" },
]

/**
 * De Kalahari-collectie. Dezelfde lijst en tekst als de eerste versie; het
 * beeld is nu de echte productenplank uit de studio (uitsnede van een
 * studiofoto) in plaats van het AI-beeld met verzonnen verpakkingen.
 */
export function Producten() {
  const beeld = rondgang[3]

  return (
    <section id="producten" className="px-6 py-20 md:py-28" style={{ backgroundColor: "var(--cream)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="ssz-op mb-12 flex flex-col items-center text-center md:mb-16">
          <span
            className="mb-4 font-sans text-xs uppercase tracking-[0.4em]"
            style={{ color: "var(--rose-gold)" }}
          >
            Onze producten
          </span>
          <h2 className="max-w-xl font-serif text-3xl text-balance text-foreground md:text-5xl">
            De Kalahari collectie
          </h2>
          <div className="mt-6 h-px w-12" style={{ backgroundColor: "var(--rose-gold)" }} />
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div
            className="ssz-doek relative h-[420px] overflow-clip md:h-[520px]"
            style={{ "--doek": "var(--cream)" } as React.CSSProperties}
          >
            <Image
              src={beeld.src}
              alt={beeld.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="ssz-drift object-cover"
              style={{ objectPosition: beeld.positie }}
            />
            {isAiBeeld(beeld) && (
              <span className="e2-glas absolute bottom-3 left-3 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {BIJSCHRIFT_AI}
              </span>
            )}
          </div>

          <div className="ssz-op">
            <p className="mb-8 font-sans text-sm leading-relaxed text-muted-foreground">
              De Kalahari productlijn is geïnspireerd op de krachtige, helende planten uit de
              Afrikaanse woestijn. Elk product is samengesteld met de zuiverste ingrediënten en
              wetenschappelijk bewezen actieve stoffen.
            </p>
            <ul className="flex flex-col divide-y divide-border">
              {producten.map((product) => (
                <li key={product.naam} className="group flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="mb-1 font-serif text-lg text-foreground transition-colors duration-200 group-hover:text-[color:var(--rose-gold)]">
                      {product.naam}
                    </p>
                    <p className="font-sans text-xs tracking-wide text-muted-foreground">{product.sub}</p>
                  </div>
                  <div
                    className="mt-2 h-4 w-4 shrink-0 rotate-45 border opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ borderColor: "var(--rose-gold)" }}
                  />
                </li>
              ))}
            </ul>
            <Link
              href="/boeken"
              className="mt-8 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--rose-gold)" }}
            >
              Bestel via de studio
              <span className="block h-px w-8" style={{ backgroundColor: "var(--rose-gold)" }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
