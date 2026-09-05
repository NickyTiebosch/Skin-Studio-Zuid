import * as React from "react"

/**
 * Laat een element van de ene pagina doorgroeien naar de andere.
 *
 * Klik je op de homepage een behandelkaart aan, dan groeit die foto door naar
 * de kop van de behandelpagina in plaats van dat het scherm omklapt. Beide
 * kanten krijgen dezelfde `naam`; daaraan herkent de browser dat het om
 * hetzelfde element gaat.
 *
 * Dit kost geen enkele extra byte: `ViewTransition` zit in de React die Next.js
 * zelf meelevert. Wel moet `experimental.viewTransition` in next.config.mjs
 * aanstaan, anders bestaat de component niet.
 *
 * Vandaar de terugval hieronder. Ontbreekt de component — vlag uit, of een
 * toekomstige versie die hem anders exporteert — dan worden de kinderen gewoon
 * getoond en navigeert de site zoals altijd. Zonder die controle zou de pagina
 * in dat geval helemaal niet renderen, en dat is een te hoge prijs voor een
 * animatie.
 */
type OvergangProps = {
  naam: string
  children: React.ReactNode
}

const ReactViewTransition = (
  React as unknown as {
    ViewTransition?: React.ComponentType<{
      name?: string
      children: React.ReactNode
    }>
  }
).ViewTransition

export function Paginaovergang({ naam, children }: OvergangProps) {
  if (!ReactViewTransition) return <>{children}</>
  return <ReactViewTransition name={naam}>{children}</ReactViewTransition>
}

/** Dezelfde naam aan beide kanten van de navigatie. */
export function behandelingOvergang(slug: string): string {
  return `behandeling-${slug}`
}
