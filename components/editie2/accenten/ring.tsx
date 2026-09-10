"use client"

import dynamic from "next/dynamic"
import { WebglPoort } from "./webgl-poort"

/**
 * De ring om het ronde studiobeeld.
 *
 * De terugval is geen noodoplossing: twee dunne cirkels in rosé-goud, precies
 * zoals ze er sinds mijlpaal M1 stonden. Wie een muis, een ruim scherm en
 * WebGL 2 heeft, en beweging niet heeft uitgezet, krijgt daar een echte ring
 * voor terug die met het scrollen kantelt. Beide versies liggen in dezelfde
 * doos, dus er verschuift niets.
 */
const RingScene = dynamic(() => import("./ring-scene").then((m) => m.RingScene), {
  ssr: false,
})

export function Ring() {
  return (
    <div className="pointer-events-none absolute -inset-6" aria-hidden="true">
      <WebglPoort className="absolute inset-0" fallback={<RingStil />}>
        <RingScene />
      </WebglPoort>
    </div>
  )
}

function RingStil() {
  return (
    <>
      <div
        className="absolute inset-3 rounded-full border"
        style={{ borderColor: "color-mix(in oklch, var(--rose-gold) 55%, transparent)" }}
      />
      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: "color-mix(in oklch, var(--rose-gold) 22%, transparent)" }}
      />
    </>
  )
}
