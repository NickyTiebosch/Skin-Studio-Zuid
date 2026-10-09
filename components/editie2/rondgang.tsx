"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BIJSCHRIFT_AI, isAiBeeld, rondgang } from "@/lib/editie2/beeld"
import { EASE, MEDIA, SCRUB } from "@/lib/editie2/beweging"
import { useScrollScene } from "./beweging/use-scroll-scene"

/**
 * Rondgang door de studio: een rij panelen die je van links naar rechts
 * doorloopt.
 *
 * Twee manieren, per schermformaat de manier die daar hoort.
 *
 * Op desktop staat de sectie vast en schuift de rij mee met het scrollwiel;
 * daar is verticaal scrollen de enige handeling die iedereen doet.
 *
 * Op een telefoon blijft de rij staan en veegt de bezoeker zelf. Dat is hier
 * bewust twee keer bijgesteld. Eerst kon je alleen vegen, maar niets vertelde
 * dat er meer foto's waren, dus zag vrijwel iedereen er één. Daarna schoven de
 * panelen automatisch mee met het verticaal scrollen, en toen stond er bij elke
 * scrollpositie een halve foto in beeld en had je er geen grip op. Nu staan de
 * foto's stil, staat er telkens één vol in beeld, en zeggen de stippen en de
 * pijlen dat er meer is. Een pin zou de verticale scroll kapen, en dat hoort
 * een pagina op een telefoon niet te doen.
 */
export function Rondgang() {
  const vensterRef = useRef<HTMLDivElement>(null)
  const [actief, setActief] = useState(0)

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

  /** Welk paneel staat er in het midden? Stuurt de stippen en de pijlen. */
  useEffect(() => {
    const venster = vensterRef.current
    if (!venster) return
    let wachtend = false
    const meet = () => {
      wachtend = false
      const midden = venster.scrollLeft + venster.clientWidth / 2
      const panelen = Array.from(
        venster.querySelectorAll<HTMLElement>("[data-e2='paneel']")
      )
      let dichtstbij = 0
      let kleinste = Number.POSITIVE_INFINITY
      panelen.forEach((el, i) => {
        const afstand = Math.abs(el.offsetLeft + el.offsetWidth / 2 - midden)
        if (afstand < kleinste) {
          kleinste = afstand
          dichtstbij = i
        }
      })
      setActief(dichtstbij)
    }
    const opScroll = () => {
      if (wachtend) return
      wachtend = true
      requestAnimationFrame(meet)
    }
    meet()
    venster.addEventListener("scroll", opScroll, { passive: true })
    window.addEventListener("resize", opScroll, { passive: true })
    return () => {
      venster.removeEventListener("scroll", opScroll)
      window.removeEventListener("resize", opScroll)
    }
  }, [])

  const naPaneel = useCallback((index: number) => {
    const venster = vensterRef.current
    if (!venster) return
    const panelen = Array.from(
      venster.querySelectorAll<HTMLElement>("[data-e2='paneel']")
    )
    const doel = panelen[Math.min(panelen.length - 1, Math.max(0, index))]
    if (!doel) return
    venster.scrollTo({
      left: doel.offsetLeft - (venster.clientWidth - doel.offsetWidth) / 2,
      behavior: "smooth",
    })
  }, [])

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

      <div ref={vensterRef} data-e2="venster" className="e2-rondgang-venster">
        <ul
          data-e2="spoor"
          className="e2-rondgang-spoor flex gap-5 px-6 md:gap-8 md:px-10 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
        >
          {rondgang.map((beeld, i) => (
            <li
              key={beeld.id}
              data-e2="paneel"
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

      {/* Bladeren. Alleen waar de bezoeker zelf veegt: op desktop schuift de
          rij mee met de scroll en zou dit dubbelop zijn. */}
      <nav
        aria-label="Foto's van de studio"
        className="mx-auto mt-8 flex w-full max-w-7xl items-center justify-between gap-4 px-6 md:px-10 lg:hidden"
      >
        <div className="flex items-center gap-3" role="tablist" aria-label="Kies een foto">
          {rondgang.map((beeld, i) => (
            <button
              key={beeld.id}
              type="button"
              role="tab"
              aria-selected={i === actief}
              aria-label={`Foto ${i + 1}: ${beeld.bijschrift ?? beeld.alt}`}
              onClick={() => naPaneel(i)}
              className="h-9 w-4 shrink-0"
            >
              <span
                className="block h-1.5 w-1.5 rounded-full transition-[background-color,transform] duration-300"
                style={{
                  backgroundColor:
                    i === actief
                      ? "var(--rose-gold)"
                      : "color-mix(in oklch, var(--rose-gold) 28%, transparent)",
                  transform: i === actief ? "scale(1.6)" : "none",
                }}
              />
            </button>
          ))}
          <span className="ml-3 whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Veeg of tik
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => naPaneel(actief - 1)}
            disabled={actief === 0}
            aria-label="Vorige foto"
            className="flex h-11 w-11 items-center justify-center border transition-colors disabled:opacity-30"
            style={{ borderColor: "color-mix(in oklch, var(--rose-gold) 40%, transparent)" }}
          >
            <ChevronLeft size={18} style={{ color: "var(--rose-gold)" }} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => naPaneel(actief + 1)}
            disabled={actief === rondgang.length - 1}
            aria-label="Volgende foto"
            className="flex h-11 w-11 items-center justify-center border transition-colors disabled:opacity-30"
            style={{ borderColor: "color-mix(in oklch, var(--rose-gold) 40%, transparent)" }}
          >
            <ChevronRight size={18} style={{ color: "var(--rose-gold)" }} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </section>
  )
}
