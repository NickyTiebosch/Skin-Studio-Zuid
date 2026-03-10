import { NextResponse } from "next/server"

const CONTACT_EMAIL = "info@skinstudiozuid.nl"
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
