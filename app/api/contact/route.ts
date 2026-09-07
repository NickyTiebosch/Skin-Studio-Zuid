import { NextResponse } from "next/server"
import {
  STANDAARD_DAGDEEL,
  afspraakVoor,
  formatteerDatum,
  formatteerDatumKort,
  isDagdeel,
  labelDagdeel,
  parseAfspraakdatum,
} from "@/lib/agenda"

/**
 * Bestemming van het contactformulier.
 *
 * TIJDELIJK het adres van Nicky, sinds 7 september 2026: zo komen aanvragen
 * aan terwijl `info@skinstudiozuid.nl` geen mail kan ontvangen (het domein
 * heeft geen MX-record, zie docs/stand-van-zaken.md). Het adres dat de
 * bezoeker op de site ziet, blijft dat van de kliniek (`EMAIL` in
 * lib/contact.ts). Zodra mail op het domein werkt: hier terug naar
 * info@skinstudiozuid.nl en daar opnieuw één keer op de activatiemail van
 * formsubmit klikken.
 */
const CONTACT_EMAIL = "info@22labs.nl"
const FORMSUBMIT_URL = `https://formsubmit.co/${CONTACT_EMAIL}`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, treatment, message, date, daypart } = body as {
      name?: string
      email?: string
      phone?: string
      treatment?: string
      message?: string
      /** yyyy-MM-dd, alleen vanaf de aanvraagkalender op /boeken. */
      date?: string
      daypart?: string
    }

    // Een datum hoort alleen bij een boekbare behandeling. Is er wel een datum
    // meegestuurd maar klopt hij niet (verleden, ander formaat), dan is dat
    // een fout in de aanvraag en geen reden om hem stilletjes weg te laten.
    const afspraak = afspraakVoor(treatment)
    const datum = afspraak && date !== undefined ? parseAfspraakdatum(date) : undefined
    if (afspraak && date !== undefined && !datum) {
      return NextResponse.json(
        { error: "Kies een datum die nog komt." },
        { status: 400 }
      )
    }
    const dagdeel = isDagdeel(daypart) ? daypart : STANDAARD_DAGDEEL

    const onderwerp =
      afspraak && datum
        ? `Afspraakaanvraag: ${afspraak.naam} op ${formatteerDatumKort(datum)}` +
          (dagdeel !== "geen-voorkeur" ? ` (${labelDagdeel(dagdeel).toLowerCase()})` : "")
        : "Nieuwe aanvraag via Skin Studio Zuid"

    // Formsubmit.co: geen account nodig. Bij de eerste aanvraag krijgt het
    // adres hierboven een activatiemail – één keer op de link klikken, daarna
    // komen alle aanvragen in die mailbox. De velden staan in de mail in
    // deze volgorde.
    const formBody = new URLSearchParams({
      name: name ?? "",
      email: email ?? "",
      phone: phone ?? "",
      treatment: treatment ?? "",
      ...(afspraak && datum
        ? {
            afspraak: afspraak.naam,
            datum: formatteerDatum(datum),
            dagdeel: labelDagdeel(dagdeel),
          }
        : {}),
      message: message ?? "",
      _replyto: email ?? "",
      _subject: onderwerp,
    })

    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString(),
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: "Aanvraag kon niet worden verstuurd." },
        { status: res.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Aanvraag kon niet worden verstuurd." },
      { status: 500 }
    )
  }
}
