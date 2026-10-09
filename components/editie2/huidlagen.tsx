import type { Behandeling } from "@/lib/behandelingen"

/**
 * De drie technieken van de gezichtsbehandeling als drie huidlagen die bij
 * het scrollen uit elkaar liften.
 *
 * De stapel is CSS-3D, geen WebGL: een gekanteld vlak (`rotateX`) met drie
 * kinderen die elk op een andere `translateZ` staan. Na de kanteling wijst de
 * Z-as schuin omhoog, dus een grotere Z tilt een laag op boven de vorige.
 *
 * De stapel is decoratie en staat op `aria-hidden`; de inhoud zit in de lijst
 * ernaast, die letterlijk de `benefits` uit lib/behandelingen.ts toont. Er
 * wordt hier dus niets over de huid beweerd wat niet al in de datalaag staat —
 * de vlakken zijn een beeld van "drie technieken in één sessie", geen
 * anatomische tekening.
 *
 * Beweging: puur CSS op de view-timeline, zoals de tellers. De eindstand
 * (lagen uit elkaar) is de basistoestand, dus zonder JavaScript, zonder
 * scroll-tijdlijn en bij uitgezette beweging staat de stapel meteen goed.
 */
export function Huidlagen({ behandeling }: { behandeling: Behandeling }) {
  const lagen = behandeling.benefits ?? []
  if (lagen.length === 0) return null

  return (
    <section
      id="technieken"
      className="e2-korrel relative overflow-clip px-6 py-20 md:py-28"
      style={{ backgroundColor: "var(--sand)" }}
      aria-labelledby="e2-technieken-kop"
    >
      <div
        className="e2-gloed pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <header className="ssz-op mb-12 max-w-2xl md:mb-16">
          <span
            className="mb-4 block font-sans text-xs uppercase tracking-[0.4em]"
            style={{ color: "var(--rose-gold)" }}
          >
            In één sessie
          </span>
          <h2
            id="e2-technieken-kop"
            className="font-serif text-3xl text-balance text-foreground md:text-5xl"
          >
            {behandeling.benefitsHeading ?? "De voordelen op een rij"}
          </h2>
        </header>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
          {/* De stapel. Vaste verhouding, dus hij reserveert zijn ruimte
              voordat er iets beweegt: geen verschuiving in de opmaak. */}
          <div className="e2-huidstapel" aria-hidden="true">
            <div className="e2-huidstapel-binnen">
              {lagen.map((laag, i) => (
                <div
                  key={laag.label}
                  className={`e2-huidlaag e2-huidlaag-${i + 1}`}
                  /* De eerste techniek hoort aan het oppervlak, dus die
                     krijgt de hoogste Z en ligt bovenop. */
                  style={
                    {
                      "--e2-laag-z": `${(lagen.length - 1 - i) * 46}px`,
                    } as React.CSSProperties
                  }
                >
                  <span className="e2-huidlaag-glans" />
                </div>
              ))}
            </div>
          </div>

          {/* De inhoud. */}
          <ol className="ssz-trap flex flex-col gap-8">
            {lagen.map((laag, i) => (
              <li key={laag.label} className="ssz-op flex gap-5">
                <span
                  className="mt-1 shrink-0 font-sans text-[11px] tracking-[0.25em]"
                  style={{ color: "var(--rose-gold)" }}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="mb-2 font-serif text-xl text-foreground md:text-2xl">
                    {laag.label}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {laag.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
