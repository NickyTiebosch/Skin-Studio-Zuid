import { Sparkles, Snowflake, TrendingUp } from "lucide-react"

const reasons = [
  {
    icon: Sparkles,
    title: "Medische Innovatie 2026",
    text: "Wij werken uitsluitend met de allernieuwste Atres-systemen. Veiliger, sneller en effectiever dan traditionele methoden.",
  },
  {
    icon: Snowflake,
    title: "Pijnvrije Ervaring",
    text: "Dankzij de geavanceerde Sapphire ICE-koeling in onze Atres laser geniet je van een comfortabele behandeling zonder irritatie.",
  },
  {
    icon: TrendingUp,
    title: "Direct Zichtbaar Resultaat",
    text: "Onze HydraSpa en RF-lifting zorgen voor een onmiddellijke glow en verstrakking zonder hersteltijd.",
  },
]

export function WhyUsSection() {
  return (
    <section
      id="waarom-wij"
      className="py-16 md:py-20 px-6"
      style={{ backgroundColor: "var(--sand)" }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="ssz-op text-center mb-12 md:mb-16">
          <h2 className="ssz-display font-serif italic text-3xl md:text-5xl text-foreground max-w-2xl mx-auto leading-tight">
            Waarom kiezen voor Skin Studio Zuid?
          </h2>
          <div
            className="ssz-lijn w-12 h-px mx-auto mt-6"
            style={{ backgroundColor: "var(--rose-gold)" }}
          />
        </header>

        <div className="ssz-trap grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-10">
          {reasons.map((item) => (
            <article
              key={item.title}
              className="ssz-op flex flex-col items-center text-center"
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--rose-gold) 15%, transparent)" }}
                aria-hidden
              >
                <item.icon
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: "var(--rose-gold)" }}
                />
              </div>
              <h3 className="font-sans text-lg md:text-xl font-medium tracking-tight text-foreground mb-3">
                {item.title}
              </h3>
              <p className="ssz-lopend font-sans text-sm md:text-base leading-relaxed text-muted-foreground max-w-sm mx-auto">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
