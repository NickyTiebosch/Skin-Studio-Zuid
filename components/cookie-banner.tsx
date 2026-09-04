"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import Link from "next/link"
import {
  GA_MEASUREMENT_ID,
  leesToestemming,
  meld,
  slaToestemmingOp,
  type Toestemming,
} from "@/lib/analytics"

/**
 * Vraagt toestemming voor Google Analytics en laadt dat pas ná een "ja".
 *
 * Bewuste keuze: het script wordt niet vooraf geladen met Consent Mode, maar
 * helemaal niet totdat de bezoeker instemt. Dat is de veiligste uitleg van de
 * AVG — er gaat dan ook geen IP-adres naar Google van iemand die nergens mee
 * heeft ingestemd. De basiscijfers lopen ondertussen gewoon door via Vercel
 * Analytics, dat cookieloos is.
 *
 * Weigeren en accepteren staan bewust naast elkaar, even zichtbaar en even
 * makkelijk aan te klikken. Een weggestopte weigerknop is geen vrije keuze.
 */
export function CookieBanner() {
  const [keuze, setKeuze] = useState<Toestemming | null>(null)
  const [geladen, setGeladen] = useState(false)

  useEffect(() => {
    setKeuze(leesToestemming())
    setGeladen(true)
  }, [])

  // Klikken op bellen en mailen zijn voor een kliniek belangrijke conversies.
  // Eén luisteraar op document-niveau vangt ze allemaal, zodat de knoppen zelf
  // geen meetcode hoeven te bevatten.
  useEffect(() => {
    if (keuze !== "verleend") return

    function opKlik(event: MouseEvent) {
      const doel = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-analytics]"
      )
      const naam = doel?.dataset.analytics
      if (naam === "click_telefoon" || naam === "click_email") {
        meld(naam)
      }
    }

    document.addEventListener("click", opKlik)
    return () => document.removeEventListener("click", opKlik)
  }, [keuze])

  function kies(nieuweKeuze: Toestemming) {
    slaToestemmingOp(nieuweKeuze)
    setKeuze(nieuweKeuze)
  }

  const magMeten = keuze === "verleend" && Boolean(GA_MEASUREMENT_ID)

  return (
    <>
      {magMeten && (
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
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Pas tonen nadat we de opgeslagen keuze hebben gelezen, anders knippert
          de balk kort in beeld bij bezoekers die al gekozen hebben. */}
      {geladen && keuze === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookievoorkeuren"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div
            className="max-w-3xl mx-auto p-6 md:p-7 shadow-lg flex flex-col md:flex-row md:items-center gap-5"
            style={{ backgroundColor: "var(--walnut)" }}
          >
            <p className="font-sans text-xs leading-relaxed text-[color:var(--cream)]/80 flex-1">
              Wij meten graag hoe de website gebruikt wordt, zodat we hem kunnen
              verbeteren. Daarvoor gebruiken we Google Analytics, dat cookies
              plaatst. Weigert u, dan werkt de site precies hetzelfde. Meer
              hierover leest u in ons{" "}
              <Link
                href="/privacybeleid"
                className="underline underline-offset-2 hover:text-[color:var(--cream)]"
              >
                privacybeleid
              </Link>
              .
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => kies("geweigerd")}
                className="font-sans text-xs tracking-[0.15em] uppercase px-5 py-3 border border-[color:var(--cream)]/30 text-[color:var(--cream)]/70 hover:text-[color:var(--cream)] hover:border-[color:var(--cream)]/60 transition-colors duration-200"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={() => kies("verleend")}
                className="font-sans text-xs tracking-[0.15em] uppercase px-5 py-3 border transition-colors duration-200"
                style={{
                  borderColor: "var(--rose-gold)",
                  color: "var(--rose-gold)",
                }}
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
