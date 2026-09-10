"use client"

import Image from "next/image"
import { BIJSCHRIFT_AI, isAiBeeld, rondgang } from "@/lib/editie2/beeld"
import { EASE, MEDIA, SCRUB } from "@/lib/editie2/beweging"
import { useScrollScene } from "./beweging/use-scroll-scene"

/**
 * Rondgang door de studio: een rij panelen die je van links naar rechts
 * doorloopt.
 *
 * De basis is een gewone horizontaal scrollende rij met scroll-snap; die
 * werkt overal, ook zonder JavaScript en bij uitgezette beweging. Op desktop
 * neemt GSAP het over: de sectie staat vast en verticaal scrollen schuift de
 * rij, zodat je met het scrollwiel de studio doorloopt.
 */
export function Rondgang() {
  const ref = useScrollScene<HTMLElement>(({ gsap }, sectie) => {
    const venster = sectie.querySelector<HTMLElement>("[data-e2='venster']")
    const spoor = sectie.querySelector<HTMLElement>("[data-e2='spoor']")
    if (!venster || !spoor) return

    const mm = gsap.matchMedia()
    mm.add(`${MEDIA.desktop} and ${MEDIA.geenVoorkeur}`, () => {
      const afstand = () => spoor.scrollWidth - venster.clientWidth
      if (afstand() <= 0) return
      gsap.set(venster, { overflowX: "hidden" })
      gsap.to(spoor, {
        x: () => -afstand(),
        ease: EASE.geen,
        scrollTrigger: {
          trigger: sectie,
          start: "top top",
          end: () => `+=${afstand()}`,
          pin: true,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => gsap.set(venster, { clearProps: "overflowX" })
    })
  })

  return (
    <section
      ref={ref}
      id="rondgang"
      className="flex flex-col justify-center overflow-clip py-20 md:py-24 lg:min-h-screen"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="mx-auto mb-10 w-full max-w-7xl px-6 md:mb-12 md:px-10">
        <div className="ssz-op flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              className="mb-4 block font-sans text-xs uppercase tracking-[0.4em]"
              style={{ color: "var(--rose-gold)" }}
            >
              De studio
            </span>
            <h2 className="font-serif text-3xl text-balance text-foreground md:text-5xl">
              Loop even mee.
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
            Een kleine, rustige studio in &rsquo;s-Hertogenbosch: één behandelkamer,
            daglicht, en alles binnen handbereik.
          </p>
        </div>
      </div>

      <div data-e2="venster" className="e2-rondgang-venster">
        <ul
          data-e2="spoor"
          className="e2-rondgang-spoor flex gap-5 px-6 md:gap-8 md:px-10 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {rondgang.map((beeld, i) => (
            <li
              key={beeld.id}
              className="e2-paneel w-[84vw] shrink-0 sm:w-[62vw] lg:w-[44vw]"
            >
              <figure>
                <div className="relative aspect-[3/2] overflow-clip">
                  <Image
                    src={beeld.src}
                    alt={beeld.alt}
                    fill
                    sizes="(max-width: 640px) 84vw, (max-width: 1024px) 62vw, 44vw"
                    className="object-cover"
                    style={{
                      objectPosition: beeld.positie,
                      // Placeholder-uitsnede: inzoomen vanuit hetzelfde punt als de positie.
                      transform: beeld.zoom ? `scale(${beeld.zoom})` : undefined,
                      transformOrigin: beeld.zoom ? beeld.positie : undefined,
                    }}
                  />
                  {beeld.tint === "avond" && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(160deg, color-mix(in oklch, var(--walnut) 42%, transparent), color-mix(in oklch, var(--rose-gold) 40%, transparent) 70%, color-mix(in oklch, var(--walnut) 32%, transparent))",
                        mixBlendMode: "multiply",
                      }}
                    />
                  )}
                  {isAiBeeld(beeld) && (
                    <span className="e2-glas absolute bottom-3 left-3 px-2 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {BIJSCHRIFT_AI}
                    </span>
                  )}
                </div>
                <figcaption className="mt-4 flex items-baseline gap-4">
                  <span
                    className="ssz-cijfers font-sans text-[10px] tracking-[0.25em]"
                    style={{ color: "var(--rose-gold)" }}
                  >
                    0{i + 1} / 0{rondgang.length}
                  </span>
                  <span className="font-serif text-lg text-foreground">{beeld.bijschrift}</span>
                </figcaption>
              </figure>
            </li>
          ))}
          {/* Lege ruimte aan het eind, zodat het laatste paneel helemaal in beeld komt. */}
          <li aria-hidden="true" className="w-6 shrink-0 md:w-10" />
        </ul>
      </div>
    </section>
  )
}
