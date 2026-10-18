"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import {
  GA_MEASUREMENT_ID,
  eerderGeweigerd,
  isKlikGebeurtenis,
  meld,
} from "@/lib/analytics"

/**
 * Laadt Google Analytics en meldt de klikken op bellen, mailen, Instagram en
 * "Afspraak maken".
 *
 * Sinds 18 oktober 2026 zonder cookiebanner, op verzoek van Nicky. Dat kan
 * alleen omdat Google Analytics privacyvriendelijk is ingesteld, zoals de
 * Autoriteit Persoonsgegevens dat beschrijft:
 *
 * - er is een verwerkersovereenkomst met Google (de gegevensverwerkings-
 *   voorwaarden, geaccepteerd in GA4);
 * - het delen van gegevens met Google staat in GA4 helemaal uit;
 * - Google-signalen en advertentiepersonalisatie staan uit, hieronder in de
 *   config;
 * - GA4 slaat geen IP-adressen op;
 * - het privacybeleid vertelt bezoekers dat er gemeten wordt en hoe.
 *
 * Wie een van die punten terugdraait, heeft de cookiebanner weer nodig.
 *
 * Bezoekers die in de oude banner op "Weigeren" klikten, houden die keuze:
 * bij hen laden we Google Analytics niet.
 */
export function GoogleAnalytics() {
  const [laden, setLaden] = useState(false)

  useEffect(() => {
    setLaden(Boolean(GA_MEASUREMENT_ID) && !eerderGeweigerd())
  }, [])

  // Klikken op bellen, mailen, Instagram en "Afspraak maken" zijn voor een
  // kliniek de conversies. Eén luisteraar op document-niveau vangt ze
  // allemaal, zodat de knoppen zelf geen meetcode hoeven te bevatten. De
  // luisteraar hangt er altijd: `meld` stuurt naar Vercel (cookieloos) en naar
  // Google Analytics als dat geladen is.
  useEffect(() => {
    function opKlik(event: MouseEvent) {
      const doel = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-analytics]"
      )
      const naam = doel?.dataset.analytics
      if (!isKlikGebeurtenis(naam)) return
      const plek = doel?.dataset.analyticsPlek
      meld(naam, plek ? { plek } : undefined)
    }

    document.addEventListener("click", opKlik)
    return () => document.removeEventListener("click", opKlik)
  }, [])

  if (!laden) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  )
}
