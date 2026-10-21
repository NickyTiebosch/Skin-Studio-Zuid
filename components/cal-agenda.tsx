"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CAL_GEBRUIKER, calLink, type Afspraak } from "@/lib/agenda"
import { meld } from "@/lib/analytics"
import { TELEFOON_HREF, TELEFOON_WEERGAVE } from "@/lib/contact"

/**
 * De echte agenda op /boeken: het boekingsscherm van Cal.com, ingesloten op
 * de pagina. Cal.com toont alleen tijden die in de agenda van de kliniek vrij
 * zijn, vraagt zelf naam, e-mail en telefoon, zet de afspraak in haar agenda
 * en stuurt de klant een bevestiging.
 *
 * Het script van Cal.com laadt pas als deze component verschijnt, en dat is
 * pas nadat de bezoeker een behandeling heeft gekozen. Wie alleen de site
 * bekijkt, maakt geen verbinding met Cal.com. De component wordt alleen
 * gebruikt als `ECHTE_AGENDA_AAN` in lib/agenda.ts aan staat.
 */

type CalFunctie = ((...args: unknown[]) => void) & {
  loaded?: boolean
  ns?: Record<string, CalFunctie>
  q?: unknown[][]
}

declare global {
  interface Window {
    Cal?: CalFunctie
  }
}

const CAL_HERKOMST = "https://cal.com"
const CAL_SCRIPT = "https://app.cal.com/embed/embed.js"

/** Na zoveel seconden zonder agenda krijgt de bezoeker de uitweg te zien. */
const GEDULD_SECONDEN = 15

/**
 * De laadcode die Cal.com zelf voorschrijft, in TypeScript: zet `window.Cal`
 * klaar als wachtrij en laadt het script één keer. Opdrachten die binnenkomen
 * voordat het script er is, voert Cal.com uit zodra het geladen is.
 */
function laadCal(): CalFunctie {
  if (window.Cal) return window.Cal
  const cal = function (...args: unknown[]) {
    const zelf = window.Cal as CalFunctie
    if (!zelf.loaded) {
      zelf.ns = {}
      zelf.q = zelf.q ?? []
      const script = document.createElement("script")
      script.src = CAL_SCRIPT
      script.async = true
      document.head.appendChild(script)
      zelf.loaded = true
    }
    if (args[0] === "init") {
      const naamruimte = args[1]
      const api = function (...apiArgs: unknown[]) {
        api.q?.push(apiArgs)
      } as CalFunctie
      api.q = []
      if (typeof naamruimte === "string") {
        const ns = (zelf.ns ??= {})
        ns[naamruimte] = ns[naamruimte] ?? api
        ns[naamruimte].q?.push(args)
        zelf.q?.push(["initNamespace", naamruimte])
      } else {
        zelf.q?.push(args)
      }
      return
    }
    zelf.q?.push(args)
  } as CalFunctie
  window.Cal = cal
  return cal
}

/** Elke agenda op de pagina krijgt een eigen naamruimte bij Cal.com. */
let volgnummer = 0

export function CalAgenda({
  afspraak,
  behandeling,
}: {
  afspraak: Afspraak
  /** De keuze in het formulier, zoals ze in de metingen terugkomt. */
  behandeling: string
}) {
  const houder = useRef<HTMLDivElement>(null)
  const [klaar, setKlaar] = useState(false)
  const [mislukt, setMislukt] = useState(false)

  useEffect(() => {
    const element = houder.current
    // In de ontwikkelmodus draait React elk effect twee keer; het
    // boekingsscherm hoort er maar één keer in te komen.
    if (!element || element.dataset.cal) return
    volgnummer += 1
    const naamruimte = `${afspraak.calAfspraaktype}-${volgnummer}`
    element.dataset.cal = naamruimte

    const Cal = laadCal()
    Cal("init", naamruimte, { origin: CAL_HERKOMST })
    const api = window.Cal?.ns?.[naamruimte]
    if (!api) {
      setMislukt(true)
      return
    }
    api("inline", {
      elementOrSelector: element,
      calLink: `${CAL_GEBRUIKER}/${afspraak.calAfspraaktype}`,
      config: { layout: "month_view", theme: "light" },
    })
    api("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" })
    api("on", { action: "linkReady", callback: () => setKlaar(true) })
    api("on", { action: "linkFailed", callback: () => setMislukt(true) })

    // Cal.com meldt een geslaagde boeking onder de oude én de nieuwe naam van
    // de gebeurtenis. Zo telt één boeking maar één keer mee.
    let laatsteMelding = 0
    const opBoeking = () => {
      const nu = Date.now()
      if (nu - laatsteMelding < 5000) return
      laatsteMelding = nu
      meld("generate_lead", { behandeling })
      meld("booking_completed", { behandeling })
    }
    api("on", { action: "bookingSuccessful", callback: opBoeking })
    api("on", { action: "bookingSuccessfulV2", callback: opBoeking })

    // Met de echte agenda betekent dit: de bezoeker koos een behandeling en
    // kreeg de agenda te zien. Bij de aanvraag was het: een datum gekozen.
    meld("booking_started", { behandeling })
  }, [afspraak.calAfspraaktype, behandeling])

  useEffect(() => {
    if (klaar) return
    const wacht = window.setTimeout(() => setMislukt(true), GEDULD_SECONDEN * 1000)
    return () => window.clearTimeout(wacht)
  }, [klaar])

  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Kies een dag en tijd
      </p>
      {afspraak.toelichting && (
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          {afspraak.toelichting}
        </p>
      )}
      <div className="relative min-h-[540px]">
        {!klaar && !mislukt && (
          <p
            aria-live="polite"
            className="absolute inset-x-0 top-8 text-center font-sans text-sm text-muted-foreground"
          >
            De agenda wordt geladen…
          </p>
        )}
        <div ref={houder} className="relative w-full" />
      </div>
      {mislukt && !klaar && (
        <p role="alert" className="font-sans text-sm leading-relaxed text-foreground">
          De agenda laadt hier niet.{" "}
          <a
            href={calLink(afspraak)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Open hem in een nieuw venster
          </a>{" "}
          of bel{" "}
          <a href={TELEFOON_HREF} data-analytics="click_telefoon" className="underline underline-offset-2">
            {TELEFOON_WEERGAVE}
          </a>
          .
        </p>
      )}
      <p className="font-sans text-xs leading-relaxed text-muted-foreground">
        Na het kiezen van een tijd krijgt u direct een bevestiging per e-mail. De
        agenda draait op Cal.com; lees in ons{" "}
        <Link
          href="/privacybeleid"
          className="underline underline-offset-2 hover:text-foreground transition-colors"
        >
          privacybeleid
        </Link>{" "}
        wat er met uw gegevens gebeurt.
      </p>
    </div>
  )
}
