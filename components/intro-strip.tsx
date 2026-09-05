const items = [
  "Kalahari Producten",
  "ATRES Technologie",
  "Gecertificeerde specialisten",
  "Sapphire ICE-koeling",
]

/**
 * De strip schuift horizontaal mee met de scroll.
 *
 * Bewust scroll-gestuurd en niet vanzelf lopend: content die uit zichzelf
 * langer dan vijf seconden beweegt moet volgens WCAG 2.2.2 te pauzeren zijn,
 * en dan zou hier een pauzeknop bij moeten. Beweging die alleen reageert op de
 * scroll van de bezoeker valt daar niet onder — die stopt immers zodra hij
 * ophoudt met scrollen.
 *
 * De rij staat er twee keer in zodat er tijdens het verschuiven geen gat aan
 * de rechterkant valt. De tweede kopie is `aria-hidden`, zodat een schermlezer
 * de opsomming niet dubbel voorleest.
 */
export function IntroStrip() {
  return (
    <section
      className="bg-[color:var(--walnut)] py-8 overflow-hidden"
      aria-label="Waar Skin Studio Zuid mee werkt"
    >
      <div className="ssz-loper flex items-center gap-10 md:gap-16 whitespace-nowrap w-max">
        {[0, 1].map((kopie) => (
          <div
            key={kopie}
            className="flex items-center gap-10 md:gap-16"
            aria-hidden={kopie === 1 ? "true" : undefined}
          >
            {items.map((item) => (
              <div key={item} className="flex items-center gap-10 md:gap-16">
                <span className="ssz-caps font-serif text-xl md:text-3xl text-[color:var(--cream)]">
                  {item}
                </span>
                <span
                  className="block w-1.5 h-1.5 rotate-45 shrink-0"
                  style={{ backgroundColor: "var(--rose-gold)" }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
