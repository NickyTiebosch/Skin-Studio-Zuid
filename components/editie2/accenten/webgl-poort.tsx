"use client"

import { useEffect, useState, type ReactNode } from "react"
import { MEDIA } from "@/lib/editie2/beweging"
import { naIdle } from "../beweging/gsap"

/**
 * De poortwachter voor alles wat WebGL gebruikt.
 *
 * Dit is de enige plek die beslist of three.js en react-three-fiber geladen
 * worden. De scène zelf komt als `children` (via `next/dynamic` met
 * `ssr: false` in de aanroeper) en wordt pas gerenderd als álles klopt:
 *
 * - de bezoeker heeft beweging niet uitgezet, gebruikt een muis en een scherm
 *   van minstens 1024px, en heeft geen databesparing aanstaan;
 * - het apparaat heeft minstens vier kernen en vier gigabyte, en een proef op
 *   WebGL 2 slaagt zónder "major performance caveat" (dat sluit
 *   software-rendering uit, waar een canvas de pagina juist trager maakt);
 * - de browser heeft even niets te doen, en de sectie komt in beeld
 *   (800px marge).
 *
 * In alle andere gevallen blijft de `fallback` staan: een stilstaand beeld met
 * dezelfde afmetingen, zodat er nooit iets verschuift.
 */
export function WebglPoort({
  fallback,
  children,
  className,
}: {
  fallback: ReactNode
  children: ReactNode
  className?: string
}) {
  const [toestaan, setToestaan] = useState(false)
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!element || !kanWebgl()) return
    let actief = true
    let stopIdle = () => {}
    const waarnemer = new IntersectionObserver(
      (items) => {
        if (!items.some((i) => i.isIntersecting)) return
        waarnemer.disconnect()
        stopIdle = naIdle(() => {
          if (actief) setToestaan(true)
        })
      },
      { rootMargin: "800px 0px" }
    )
    waarnemer.observe(element)
    return () => {
      actief = false
      stopIdle()
      waarnemer.disconnect()
    }
  }, [element])

  return (
    <div ref={setElement} className={className}>
      {toestaan ? children : fallback}
    </div>
  )
}

type MetSpaarstand = Navigator & {
  connection?: { saveData?: boolean }
  deviceMemory?: number
}

/** Alle voorwaarden die zonder canvas te controleren zijn, plus de WebGL-proef. */
function kanWebgl(): boolean {
  if (typeof window === "undefined") return false
  const nav = navigator as MetSpaarstand
  if (!window.matchMedia(MEDIA.geenVoorkeur).matches) return false
  if (!window.matchMedia(MEDIA.desktop).matches) return false
  if (!window.matchMedia(MEDIA.muis).matches) return false
  if (nav.connection?.saveData) return false
  if ((nav.hardwareConcurrency ?? 8) < 4) return false
  if ((nav.deviceMemory ?? 8) < 4) return false
  try {
    const proef = document.createElement("canvas")
    const gl = proef.getContext("webgl2", { failIfMajorPerformanceCaveat: true })
    if (!gl) return false
    gl.getExtension("WEBGL_lose_context")?.loseContext()
    return true
  } catch {
    return false
  }
}
