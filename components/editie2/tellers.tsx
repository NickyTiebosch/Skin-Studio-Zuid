import { behandelingen } from "@/lib/behandelingen"
import { KUUR_TERMIJN_MAANDEN, doelgroepen } from "@/lib/tarieven"

/**
 * Drie getallen die op scroll optellen. Alleen feiten uit de datalaag: het
 * aantal behandelingen in een kuur en de termijn komen uit lib/tarieven.ts, de
 * drie technieken uit de voordelenlijst van de gezichtsbehandeling. Bewust
 * géén "drie golflengtes": welke laser er precies staat, is nog een open vraag
 * aan de kliniek (docs/te-controleren.md).
 *
 * Het tellen zit in CSS (`.e2-teller` in app/globals.css) op de view-timeline;
 * het echte getal staat als tekst voor schermlezers, de teller is decoratie.
 */
export function Tellers() {
  const kuur = doelgroepen.flatMap((d) => d.kuren)[0]
  const technieken =
    behandelingen.find((b) => b.slug === "gezichtsbehandelingen")?.benefits?.length ?? 3

  const tellers = [
    {
      getal: kuur?.aantalBehandelingen ?? 6,
      label: "behandelingen in een kuur",
      toelichting: "Voor het beste resultaat adviseren wij een kuur van zes behandelingen.",
    },
    {
      getal: KUUR_TERMIJN_MAANDEN,
      label: "maanden om een kuur af te nemen",
      toelichting: "Genoeg ruimte om de behandelingen op het ritme van de haargroei te plannen.",
    },
    {
      getal: technieken,
      label: "technieken in één HydraSpa-sessie",
      toelichting: "Reiniging, lift en boost, in één behandeling van de gezichtshuid.",
    },
  ]

  return (
    <section className="px-6 py-16 md:py-20" style={{ backgroundColor: "var(--sand)" }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {tellers.map((t) => (
          <div key={t.label} className="ssz-op text-center md:text-left">
            <p className="ssz-cijfers font-serif text-6xl leading-none text-foreground md:text-7xl">
              <span className="sr-only">{t.getal}</span>
              <span
                aria-hidden="true"
                className="e2-teller"
                style={{ "--e2-doel": t.getal } as React.CSSProperties}
              />
            </p>
            <p
              className="mt-3 font-sans text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--rose-gold)" }}
            >
              {t.label}
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
              {t.toelichting}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
