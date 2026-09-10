"use client"

import Link from "next/link"
import { KUUR_TERMIJN_MAANDEN, doelgroepen } from "@/lib/tarieven"
import { EASE, MEDIA, SCRUB } from "@/lib/editie2/beweging"
import { useScrollScene } from "./beweging/use-scroll-scene"

/**
 * Het behandeltraject als tijdlijn met een lichtstraal die meeloopt.
 *
 * Drie stappen zonder beloftes: de intake (gratis, zoals overal op de site),
 * het behandelplan en de behandelingen zelf (een kuur van zes, binnen de
 * termijn uit lib/tarieven.ts). Op desktop staat de sectie vast terwijl de
 * straal van boven naar beneden groeit en elke stap oplicht; op mobiel groeit
 * de straal gewoon mee met het scrollen. Zonder beweging staat alles er
 * meteen volledig.
 */
export function Traject() {
  const kuur = doelgroepen.flatMap((d) => d.kuren)[0]
  const aantal = kuur?.aantalBehandelingen ?? 6

  const stappen = [
    {
      nummer: "01",
      titel: "Intakegesprek",
      tekst:
        "Gratis en vrijblijvend. We bekijken huid en haartype, bespreken wat er mogelijk is en wat het kost.",
    },
    {
      nummer: "02",
      titel: "Behandelplan",
      tekst:
        "Een plan op maat: welke zones of welke gezichtsbehandeling, losse behandelingen of een kuur, en wanneer.",
    },
    {
      nummer: "03",
      titel: "Behandelingen",
      tekst: `Voor laserontharing een kuur van ${aantal} behandelingen, af te nemen binnen ${KUUR_TERMIJN_MAANDEN} maanden, op het ritme van de haargroei.`,
    },
  ]

  const ref = useScrollScene<HTMLElement>(({ gsap }, sectie) => {
    const straal = sectie.querySelector<HTMLElement>("[data-e2='straal']")
    const items = Array.from(sectie.querySelectorAll<HTMLElement>("[data-e2='stap']"))
    if (!straal || items.length === 0) return

    const mm = gsap.matchMedia()

    mm.add(`${MEDIA.desktop} and ${MEDIA.geenVoorkeur}`, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectie,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: SCRUB,
          anticipatePin: 1,
        },
      })
      tl.fromTo(straal, { scaleY: 0 }, { scaleY: 1, ease: EASE.geen, duration: 1 }, 0)
      items.forEach((item, i) => {
        tl.fromTo(
          item,
          { opacity: 0.25, y: 24 },
          { opacity: 1, y: 0, ease: EASE.uit, duration: 0.25 },
          (i / items.length) * 0.85
        )
      })
    })

    // Mobiel: geen pin, maar wel dezelfde volgorde. De straal groeit mee met
    // het scrollen en elke stap licht op zodra de straal hem bereikt, zodat het
    // traject zich ook op een telefoon van boven naar beneden opbouwt.
    mm.add(`${MEDIA.mobiel} and ${MEDIA.geenVoorkeur}`, () => {
      gsap.fromTo(
        straal,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: EASE.geen,
          scrollTrigger: { trigger: sectie, start: "top 75%", end: "bottom 70%", scrub: SCRUB },
        }
      )
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.3, y: 18 },
          {
            opacity: 1,
            y: 0,
            ease: EASE.uit,
            scrollTrigger: { trigger: item, start: "top 88%", end: "top 55%", scrub: SCRUB },
          }
        )
      })
    })
  })

  return (
    <section
      ref={ref}
      id="traject"
      className="e2-korrel flex flex-col justify-center px-6 py-20 md:py-28 lg:min-h-screen"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="ssz-op mb-12 text-center md:mb-16">
          <span
            className="mb-4 block font-sans text-xs uppercase tracking-[0.4em]"
            style={{ color: "var(--rose-gold)" }}
          >
            Zo werkt het
          </span>
          <h2 className="font-serif text-3xl text-balance text-foreground md:text-5xl">
            Van intake tot behandeling.
          </h2>
        </div>

        <div className="relative">
          {/* De lijn en de straal die erover loopt */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
            style={{ backgroundColor: "var(--border)" }}
          >
            <div
              data-e2="straal"
              className="e2-straal absolute inset-0 origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--rose-gold) 20%, var(--rose-gold) 80%, transparent)",
                boxShadow: "0 0 24px 2px color-mix(in oklch, var(--rose-gold) 45%, transparent)",
              }}
            />
          </div>

          <ol className="flex flex-col gap-10 md:gap-16">
            {stappen.map((stap, i) => (
              <li
                key={stap.nummer}
                data-e2="stap"
                className={`relative pl-14 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1 flex h-10 w-10 items-center justify-center rounded-full font-sans text-[10px] tracking-[0.2em] ${
                    i % 2 === 0
                      ? "left-0 md:left-auto md:-right-5"
                      : "left-0 md:-left-5"
                  }`}
                  style={{
                    backgroundColor: "var(--cream)",
                    border: "1px solid var(--rose-gold)",
                    color: "var(--rose-gold)",
                  }}
                >
                  {stap.nummer}
                </span>
                <h3 className="mb-2 font-serif text-2xl text-foreground md:text-3xl">{stap.titel}</h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">{stap.tekst}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="ssz-op mt-14 text-center md:mt-20">
          <Link
            href="/boeken?behandeling=consult"
            className="ssz-veeg inline-block px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] text-[color:var(--cream)]"
            style={{ backgroundColor: "var(--rose-gold)" }}
          >
            Plan je gratis intake
          </Link>
        </div>
      </div>
    </section>
  )
}
