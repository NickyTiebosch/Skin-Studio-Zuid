"use client"

import { useEffect } from "react"
import { meld } from "@/lib/analytics"

/**
 * Meldt dat iemand de tarievenpagina bekeek.
 *
 * Dat is een sterk koopsignaal: wie naar prijzen kijkt, overweegt serieus.
 * In de funnel is dit de stap tussen "leest over de behandeling" en "maakt een
 * afspraak" — valt daar veel weg, dan weet je dat de prijs of de presentatie
 * ervan het probleem is.
 *
 * De gebeurtenis stond al als mogelijkheid in lib/analytics.ts maar werd
 * nergens aangeroepen, omdat de pagina nog niet bestond.
 */
export function TarievenMelder() {
  useEffect(() => {
    meld("view_tarieven")
  }, [])

  return null
}
