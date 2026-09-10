"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import type { Mesh } from "three"

/**
 * Accent A: de ring van licht.
 *
 * Het logo van de studio is een penseelcirkel; die staat ook op het raam van
 * de behandelkamer. Deze ring is datzelfde motief in geborsteld rosé-goud,
 * die bij het scrollen langzaam kantelt en daarbij licht vangt.
 *
 * Eén mesh, één draw call, twee lichten. Geen omgevingskaart: die zou een
 * HDR-bestand kosten en dat is voor één ring niet te verdedigen. Twee gerichte
 * lichten met een warme en een rosé tint geven dezelfde glans.
 *
 * Zoals bij de lichtband: `frameloop="demand"`, geen eigen tijdlus. De scroll
 * is het enige wat het beeld verandert, dus staat de pagina stil, dan rekent
 * de GPU niet.
 */

/**
 * De ring vult ongeveer 93% van de canvashoogte; zie de cameraopstelling.
 * De dikte is bewust klein: het logo is een penseelstreek, geen buis, en de
 * terugval is een haarlijn. Dikker dan dit en het accent gaat het beeld
 * overheersen in plaats van omlijsten.
 */
const STRAAL = 1
const DIKTE = 0.028

function Ring() {
  const mesh = useRef<Mesh>(null)
  const invalidate = useThree((s) => s.invalidate)
  const canvas = useThree((s) => s.gl.domElement)

  useEffect(() => {
    let wachtend = false
    const meet = () => {
      wachtend = false
      const rect = canvas.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const v = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)))
      if (!mesh.current) return
      // Bewust een kleine hoek: de ring ligt óm de foto heen, en bij een
      // grotere kanteling valt de onderrand over het beeld en wordt het
      // rommelig. Wat je ziet is vooral het licht dat over het oppervlak
      // loopt, niet de draaiing zelf.
      mesh.current.rotation.x = -0.22 + v * 0.40
      mesh.current.rotation.z = -0.10 + v * 0.26
      invalidate()
    }
    const opScroll = () => {
      if (wachtend) return
      wachtend = true
      requestAnimationFrame(meet)
    }
    meet()
    window.addEventListener("scroll", opScroll, { passive: true })
    window.addEventListener("resize", opScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", opScroll)
      window.removeEventListener("resize", opScroll)
    }
  }, [canvas, invalidate])

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[STRAAL, DIKTE, 32, 180]} />
      <meshPhysicalMaterial
        color="#c58582"
        metalness={0.5}
        roughness={0.42}
        clearcoat={0.45}
        clearcoatRoughness={0.4}
      />
    </mesh>
  )
}

export function RingScene() {
  const [klaar, setKlaar] = useState(false)
  const lichten = useMemo(
    () => ({
      warm: "#fff4ea",
      rose: "#e3b8b6",
    }),
    []
  )

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      // Zichtbare hoogte is 2 * 2.75 * tan(22.5°) ≈ 2,28; de ring meet 2,11.
      camera={{ position: [0, 0, 2.75], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ opacity: klaar ? 1 : 0, transition: "opacity 700ms ease" }}
      onCreated={() => setKlaar(true)}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color={lichten.warm} />
      <directionalLight position={[-4, -2, 2]} intensity={0.7} color={lichten.rose} />
      <directionalLight position={[0, -3, 4]} intensity={0.5} color={lichten.warm} />
      <Ring />
    </Canvas>
  )
}
