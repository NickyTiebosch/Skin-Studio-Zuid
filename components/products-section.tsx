import Image from "next/image"
import Link from "next/link"

const products = [
  { name: "Kalahari Hydration Serum", sub: "Diep voedend — voor alle huidtypes" },
  { name: "Desert Rose Face Oil", sub: "Anti-aging — rijk aan antioxidanten" },
  { name: "Mineral Glow Mask", sub: "Revitaliserend — één keer per week" },
  { name: "Baobab Repair Cream", sub: "Intensief herstellend — nachtcrème" },
]

export function ProductsSection() {
  return (
    <section id="producten" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <span
            className="font-sans text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--rose-gold)" }}
          >
            Onze producten
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance max-w-xl">
            De Kalahari collectie
          </h2>
          <div className="w-12 h-px mt-6" style={{ backgroundColor: "var(--rose-gold)" }} />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative h-[420px] md:h-[520px] overflow-hidden">
            <Image
              src="/images/kalahari-products.jpg"
              alt="Kalahari skincare producten op een luxe plank"
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover object-center"
            />
          </div>

          {/* Product list */}
          <div>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-8">
              De Kalahari productlijn is geïnspireerd op de krachtige, helende planten uit de Afrikaanse woestijn. Elk product is samengesteld met de zuiverste ingrediënten en wetenschappelijk bewezen actieve stoffen.
            </p>
            <ul className="flex flex-col divide-y divide-border">
              {products.map((product) => (
                <li
                  key={product.name}
                  className="group flex items-start justify-between py-4 gap-4"
                >
                  <div>
                    <p className="font-serif text-lg text-foreground mb-1 group-hover:text-[color:var(--rose-gold)] transition-colors duration-200">
                      {product.name}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground tracking-wide">
                      {product.sub}
                    </p>
                  </div>
                  <div
                    className="mt-2 w-4 h-4 border shrink-0 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ borderColor: "var(--rose-gold)" }}
                  />
                </li>
              ))}
            </ul>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase mt-8"
              style={{ color: "var(--rose-gold)" }}
            >
              Bestel via de studio
              <span className="block w-8 h-px" style={{ backgroundColor: "var(--rose-gold)" }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
