"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Color, type ShaderMaterial } from "three"

/**
 * Accent B: licht in drie diepten.
 *
 * Eén vlak met één shader. Drie zachte lichtlinten liggen bij het binnenkomen
 * dicht bij het oppervlak en zakken bij het scrollen elk naar een andere
 * diepte in een warm verloop. Dat is een beeld bij "licht dat tot verschillende
 * diepten doordringt" — er wordt geen apparaat afgebeeld en geen resultaat
 * beloofd; de tekst op de pagina doet de inhoudelijke uitspraken.
 *
 * Zuinigheid zit in vier keuzes: `frameloop="demand"` (er wordt alleen
 * getekend als de scroll iets verandert), geen eigen tijdlus, `dpr` tot 1,5 en
 * één draw call. Buiten beeld gebeurt er niets, want dan komt er geen
 * scroll-update die het beeld ongeldig maakt.
 *
 * Dit bestand wordt uitsluitend geladen door accenten/lichtband.tsx, en die
 * laadt het pas als WebglPoort groen licht geeft: desktop, muis, WebGL 2
 * zonder software-rendering, geen databesparing, beweging niet uitgezet, en
 * pas als de band in beeld komt.
 */

const HOEKPUNT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/**
 * De kleuren komen als uniform binnen uit de tokens in app/globals.css, zodat
 * de band nooit uit de huisstijl loopt. `uVoortgang` is het enige wat beweegt.
 */
const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uVoortgang;
  uniform vec3 uOppervlak;
  uniform vec3 uMidden;
  uniform vec3 uDiep;
  uniform vec3 uLichtWarm;
  uniform vec3 uLichtRose;

  varying vec2 vUv;

  // Waardenruis, genoeg om banding in het verloop te breken.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float ruis(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float som = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      som += amp * ruis(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return som;
  }

  // Eén lichtlint: een gaussische band rond de hoogte 'mid'.
  float lint(float diepte, float mid, float breedte) {
    float d = (diepte - mid) / breedte;
    return exp(-d * d);
  }

  void main() {
    // 0 aan het oppervlak (boven), 1 diep (onder).
    float diepte = 1.0 - vUv.y;

    // Het warme verloop waar de linten in liggen: licht aan het oppervlak,
    // warm en verzadigd in de diepte. Zonder dat verloop zou licht op licht
    // vallen en zie je niets.
    vec3 kleur = mix(uOppervlak, uMidden, smoothstep(0.0, 0.42, diepte));
    kleur = mix(kleur, uDiep, smoothstep(0.45, 1.0, diepte));

    // Zachte golving, zodat de linten geen rechte strepen zijn.
    float golf = fbm(vec2(vUv.x * 1.7, diepte * 0.9 + uVoortgang * 0.3));
    float x = vUv.x;

    // De drie diepten. Bij voortgang 0 liggen ze tegen het oppervlak aan; bij
    // 1 staan ze elk op hun eigen hoogte.
    float mid1 = mix(0.10, 0.24, uVoortgang) + (golf - 0.5) * 0.030;
    float mid2 = mix(0.12, 0.48, uVoortgang) + (golf - 0.5) * 0.040;
    float mid3 = mix(0.14, 0.74, uVoortgang) + (golf - 0.5) * 0.050;

    // Hoe dieper, hoe breder en waziger: dat is wat diepte leesbaar maakt.
    float l1 = lint(diepte, mid1, 0.075);
    float l2 = lint(diepte, mid2, 0.115);
    float l3 = lint(diepte, mid3, 0.175);

    // Aan de zijkanten uitdoven, zodat de band in de pagina oplost.
    float randen = smoothstep(0.0, 0.18, x) * smoothstep(1.0, 0.82, x);

    // Licht mengt naar zijn eigen kleur toe; optellen zou op deze lichte
    // ondergrond meteen naar wit lopen en de linten juist onzichtbaar maken.
    // Dieper licht is zwakker: zo leest de band als licht dat dooft.
    kleur = mix(kleur, uOppervlak, clamp(l1 * 0.80 * randen, 0.0, 1.0));
    kleur = mix(kleur, uLichtWarm, clamp(l2 * 0.55 * randen, 0.0, 1.0));
    kleur = mix(kleur, uLichtRose, clamp(l3 * 0.38 * randen, 0.0, 1.0));

    // Fijne korrel, dezelfde gedachte als .e2-korrel in de CSS.
    kleur += (hash(vUv * 900.0) - 0.5) * 0.018;

    gl_FragColor = vec4(kleur, 1.0);
  }
`

function Vlak() {
  const materiaal = useRef<ShaderMaterial>(null)
  const viewport = useThree((s) => s.viewport)
  const invalidate = useThree((s) => s.invalidate)
  const canvas = useThree((s) => s.gl.domElement)

  const uniforms = useMemo(
    () => ({
      uVoortgang: { value: 0 },
      uOppervlak: { value: new Color("#fcfaf6") },
      uMidden: { value: new Color("#f0e8dc") },
      uDiep: { value: new Color("#ecd8d2") },
      uLichtWarm: { value: new Color("#f8f5f0") },
      uLichtRose: { value: new Color("#c58582") },
    }),
    []
  )

  // De scroll stuurt de scène. Geen eigen tijdlus: staat de pagina stil, dan
  // rekent de GPU niet.
  useEffect(() => {
    let wachtend = false
    const meet = () => {
      wachtend = false
      const rect = canvas.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const rauw = (vh - rect.top) / (vh + rect.height)
      const v = Math.min(1, Math.max(0, rauw))
      if (materiaal.current) {
        materiaal.current.uniforms.uVoortgang.value = v
        invalidate()
      }
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
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materiaal}
        vertexShader={HOEKPUNT}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function LichtbandScene() {
  const [klaar, setKlaar] = useState(false)

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power" }}
      style={{
        // Pas tonen als er echt een beeld staat; anders zie je één frame niets.
        opacity: klaar ? 1 : 0,
        transition: "opacity 600ms ease",
      }}
      onCreated={() => setKlaar(true)}
    >
      <Vlak />
    </Canvas>
  )
}
