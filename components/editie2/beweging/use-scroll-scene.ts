"use client"

import { useEffect, useRef } from "react"
import { MEDIA } from "@/lib/editie2/beweging"
import { laadGsap, naIdle, type GsapApi } from "./gsap"

/**
 * Zet een GSAP-scène op voor het element waar de ref op staat.
 *
 * - Doet niets bij `prefers-reduced-motion: reduce`: de basistoestand in de
 *   HTML is dan het eindbeeld.
 * - Laadt de bibliotheek pas na idle, buiten het pad van de eerste weergave.
 * - Bouwt alles binnen een `gsap.context`, zodat unmount (ook de dubbele
 *   mount van React's strict mode) alle tweens én ScrollTriggers opruimt.
 *
 * `opzet` krijgt de api en het element; wat het teruggeeft wordt genegeerd,
 * opruimen gaat via de context. Gebruik binnen `opzet` `gsap.matchMedia()` om
 * per schermbreedte een andere scène te bouwen.
 */
export function useScrollScene<T extends HTMLElement>(
  opzet: (api: GsapApi, element: T) => void
) {
  const ref = useRef<T>(null)
  const opzetRef = useRef(opzet)
  opzetRef.current = opzet

  useEffect(() => {
    if (!window.matchMedia(MEDIA.geenVoorkeur).matches) return
    let actief = true
    let context: { revert: () => void } | undefined

    const stop = naIdle(() => {
      laadGsap().then((api) => {
        const element = ref.current
        if (!actief || !element) return
        context = api.gsap.context(() => opzetRef.current(api, element), element)
      })
    })

    return () => {
      actief = false
      stop()
      context?.revert()
    }
  }, [])

  return ref
}
