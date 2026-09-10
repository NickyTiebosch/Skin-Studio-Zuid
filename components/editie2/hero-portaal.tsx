"use client"

import Image from "next/image"
import Link from "next/link"
import { heroPoort } from "@/lib/editie2/beeld"
import { EASE, MEDIA, SCRUB } from "@/lib/editie2/beweging"
import { useScrollScene } from "./beweging/use-scroll-scene"

/**
 * De hero van editie 2: "de studio in".
 *
 * Links de kop, rechts de behandelkamer in een poortvorm. Bij het scrollen
 * groeit die poort naar het midden tot hij het scherm vult: je glijdt de
 * kamer in, en de volgende sectie schuift eronder vandaan. Op desktop staat
 * de sectie daarvoor 120% van de schermhoogte vast; op mobiel is er geen pin
 * en zoomt de poort alleen licht mee.
 *
 * Wat hier NIET beweegt, en waarom:
 * - De h1 blijft in de basistoestand volledig zichtbaar en in één blok (de
 *   les uit docs/stand-van-zaken.md over de laadtijdmeting); pas ná de eerste
 *   weergave mag de tekst met het scrollen vervagen.
 * - De foto begint op volle dekking; de enige constante beweging is een trage
 *   zoom van 7% over achttien seconden, puur `transform`, alleen op desktop
 *   en alleen voor wie beweging niet heeft uitgezet. Dat vervangt de
 *   videoclip uit het plan: de clip zou uit dezelfde stilstaande foto komen,
 *   en dit kost nul bytes. Een echte AI-clip kan later in dezelfde poort.
 */
export function HeroPortaal() {
  const ref = useScrollScene<HTMLElement>(({ gsap }, sectie) => {
    const poort = sectie.querySelector<HTMLElement>("[data-e2='poort']")
    const tekst = sectie.querySelector<HTMLElement>("[data-e2='tekst']")
    const cue = sectie.querySelector<HTMLElement>("[data-e2='cue']")
    const gloed = sectie.querySelector<HTMLElement>("[data-e2='gloed']")
    if (!poort || !tekst) return

    const mm = gsap.matchMedia()

    mm.add(`${MEDIA.desktop} and ${MEDIA.geenVoorkeur}`, () => {
      // Hoeveel de poort moet groeien en verschuiven om het scherm te vullen,
      // opnieuw berekend bij elke refresh (ander venster, andere fonts).
      const doel = () => {
        const r = poort.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight
        return {
          schaal: Math.max(vw / r.width, vh / r.height) * 1.06,
          x: vw / 2 - (r.left + r.width / 2),
          y: vh / 2 - (r.top + r.height / 2),
          straal: r.width / 2,
        }
      }
      const start = doel()
      gsap.set(poort, { borderRadius: `${start.straal}px ${start.straal}px 0 0` })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectie,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.to(
        poort,
        {
          scale: () => doel().schaal,
          x: () => doel().x,
          y: () => doel().y,
          borderRadius: "0px 0px 0 0",
          ease: EASE.in,
        },
        0
      )
        .to(tekst, { y: -70, opacity: 0.15, ease: EASE.geen }, 0)
        .to(cue, { opacity: 0, ease: EASE.geen }, 0)
        .to(gloed, { opacity: 0, ease: EASE.geen }, 0)
    })

    mm.add(`${MEDIA.mobiel} and ${MEDIA.geenVoorkeur}`, () => {
      gsap.to(poort, {
        scale: 1.06,
        ease: EASE.geen,
        scrollTrigger: { trigger: sectie, start: "top top", end: "bottom top", scrub: SCRUB },
      })
    })
  })

  return (
    <section
      ref={ref}
      className="e2-korrel relative min-h-[100svh] overflow-clip bg-[color:var(--cream)]"
      aria-labelledby="e2-hero-kop"
    >
      {/* Zachte gloed achter de poort */}
      <div
        data-e2="gloed"
        aria-hidden="true"
        className="e2-gloed pointer-events-none absolute -right-[10vw] top-[8vh] h-[90vh] w-[70vw]"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,42vw)] lg:gap-16 lg:pb-0 lg:pt-20">
        {/* Kop */}
        <div data-e2="tekst" className="relative z-10 max-w-xl">
          <p
            className="ssz-intro-op font-sans text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--rose-gold)" }}
          >
            Skin Studio Zuid &mdash; &rsquo;s-Hertogenbosch
          </p>
          {/* Eén masker om de hele kop: zie de LCP-toelichting hierboven. */}
          <div className="ssz-regel mb-8">
            <h1
              id="e2-hero-kop"
              className="ssz-regel-binnen font-serif text-4xl md:text-6xl xl:text-7xl text-foreground leading-[1.05] text-balance"
            >
              Geef je huid de aandacht die het verdient.
            </h1>
          </div>
          <p className="ssz-intro-op ssz-vertraag-2 font-sans text-sm md:text-base leading-relaxed text-muted-foreground max-w-md mb-10">
            Ontdek de geavanceerde behandelingen van Skin Studio Zuid. Wij combineren
            expertise met ontspanning voor een stralend resultaat.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
            <Link
              href="/boeken"
              className="ssz-veeg ssz-intro-op ssz-vertraag-3 whitespace-nowrap font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 text-[color:var(--cream)] transition-colors duration-300 text-center"
              style={{ backgroundColor: "var(--rose-gold)" }}
            >
              Afspraak maken
            </Link>
            <Link
              href="/#behandelingen"
              className="ssz-intro-op ssz-vertraag-4 whitespace-nowrap font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 border transition-colors duration-300 text-center text-foreground hover:border-[color:var(--rose-gold)]"
              style={{ borderColor: "var(--border)" }}
            >
              Ontdek behandelingen
            </Link>
          </div>
        </div>

        {/* De poort: de behandelkamer in een boogvorm */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            data-e2="poort"
            className="e2-poort relative aspect-[4/5] w-[min(86vw,420px)] lg:aspect-auto lg:h-[74vh] lg:w-[40vw] lg:max-w-none"
          >
            <div className="e2-kenburns absolute inset-0">
              <Image
                src={heroPoort.src}
                alt={heroPoort.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 40vw, 86vw"
                className="object-cover"
                style={{ objectPosition: heroPoort.positie }}
              />
            </div>
            {/* Lichte sluier onderin zodat de boog zacht in de crème overloopt */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in oklch, var(--walnut) 35%, transparent), transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll-cue */}
      <div
        data-e2="cue"
        className="absolute bottom-8 left-6 md:left-10 flex items-center gap-4 font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <span className="e2-cue-lijn block h-px w-14" style={{ backgroundColor: "var(--rose-gold)" }} />
        <span>De studio in</span>
      </div>
    </section>
  )
}
