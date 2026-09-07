import { NextResponse } from "next/server"

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
    const { name, email, phone, treatment, message } = body as {
      name?: string
      email?: string
      phone?: string
      treatment?: string
      message?: string
    }

    // Formsubmit.co: geen account nodig. Bij de eerste aanvraag krijgt
    // info@skinstudiozuid.nl een activatiemail – één keer op de link klikken,
    // daarna komen alle aanvragen in die mailbox.
    const formBody = new URLSearchParams({
      name: name ?? "",
      email: email ?? "",
      phone: phone ?? "",
      treatment: treatment ?? "",
      message: message ?? "",
      _replyto: email ?? "",
      _subject: "Nieuwe aanvraag via Skin Studio Zuid",
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
