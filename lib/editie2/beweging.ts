/**
 * Bewegingstokens van editie 2.
 *
 * Eén plek voor de mediaquery-strings en de maten die alle scènes delen, zodat
 * een scène nooit zijn eigen grens verzint. De regels uit de bewegingslaag in
 * app/globals.css blijven gelden: de zichtbare toestand is de basis, alleen
 * `transform` en `opacity` bewegen, en nooit `opacity` op het LCP-element.
 */

export const MEDIA = {
  /** Bezoekers die beweging niet hebben uitgezet. */
  geenVoorkeur: "(prefers-reduced-motion: no-preference)",
  /** Vanaf hier: gepinde scènes, WebGL en het menu in de balk. */
  desktop: "(min-width: 1024px)",
  mobiel: "(max-width: 1023px)",
  /** Een echte muis: pas dan cursorgloed en magnetische knoppen. */
  muis: "(hover: hover) and (pointer: fine)",
} as const

/** De "boter" van de tryout: scrub met een halve seconde naloop. */
export const SCRUB = 0.6

/** Parallax nooit verder dan dit deel van de hoogte; daarboven wordt het onrustig. */
export const PARALLAX_MAX = 0.08

export const EASE = {
  uit: "power2.out",
  in: "power2.in",
  zacht: "power1.inOut",
  geen: "none",
} as const
