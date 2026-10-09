"use client"

/**
 * Laadt GSAP en ScrollTrigger één keer, en pas als de pagina er klaar voor is.
 *
 * GSAP staat bewust niet in de eerste bundel: geen enkele scène is nodig om de
 * pagina te lezen, en de laadtijdmeting (LCP) mag er niets van merken. Elke
 * scène vraagt de bibliotheek via `laadGsap()`; de eerste aanroep haalt hem op,
 * de rest wacht op dezelfde belofte.
 */

export type GsapApi = {
  gsap: typeof import("gsap")["gsap"]
  ScrollTrigger: typeof import("gsap/ScrollTrigger")["ScrollTrigger"]
}

let bezig: Promise<GsapApi> | null = null

export function laadGsap(): Promise<GsapApi> {
  if (!bezig) {
    bezig = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([g, s]) => {
        g.gsap.registerPlugin(s.ScrollTrigger)
        // Op mobiel verandert de viewporthoogte bij elke adresbalk-beweging;
        // zonder deze instelling herberekent ScrollTrigger dan alle scènes en
        // springt de pagina.
        s.ScrollTrigger.config({ ignoreMobileResize: true })
        // Lettertypes die later inladen verschuiven de hoogte van secties;
        // daarna moeten de start- en eindpunten opnieuw gemeten worden.
        document.fonts?.ready.then(() => s.ScrollTrigger.refresh())
        return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger }
      }
    )
  }
  return bezig
}

/**
 * Voert `fn` uit zodra de browser even niets te doen heeft, met een plafond
 * zodat het op een drukke pagina niet eindeloos wacht. Geeft een functie terug
 * die de afspraak weer intrekt.
 */
export function naIdle(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 1500 })
    return () => window.cancelIdleCallback(id)
  }
  // Safari kent requestIdleCallback niet; een korte pauze na de eerste
  // weergave is daar het beste alternatief.
  const id = window.setTimeout(fn, 200)
  return () => window.clearTimeout(id)
}
