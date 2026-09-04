"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import {
  ADRES,
  EMAIL,
  EMAIL_HREF,
  OPENINGSTIJDEN_TEKST,
  TELEFOON_HREF,
  TELEFOON_WEERGAVE,
} from "@/lib/contact"

const gegevens = [
  { label: "Adres", value: `${ADRES.straat}, ${ADRES.plaats}` },
  {
    label: "Telefoon",
    value: TELEFOON_WEERGAVE,
    href: TELEFOON_HREF,
    analytics: "click_telefoon",
  },
  { label: "E-mail", value: EMAIL, href: EMAIL_HREF, analytics: "click_email" },
  { label: "Openingstijden", value: OPENINGSTIJDEN_TEKST },
] as { label: string; value: string; href?: string; analytics?: string }[]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", treatment: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error ?? "Er ging iets mis. Probeer het later opnieuw.")
        setSending(false)
        return
      }
      setSubmitted(true)
    } catch {
      setError("Er ging iets mis. Probeer het later opnieuw.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-28 md:py-40 px-6"
      style={{ backgroundColor: "var(--sand)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <span
              className="font-sans text-xs tracking-[0.4em] uppercase mb-5 block"
              style={{ color: "var(--rose-gold)" }}
            >
              Maak een afspraak
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-8 leading-tight">
              Jouw transformatie begint hier
            </h2>
            <div className="w-10 h-px mb-10" style={{ backgroundColor: "var(--rose-gold)" }} />
            <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-12">
              Neem contact met ons op voor een vrijblijvende kennismaking of om direct een afspraak te plannen. Onze specialisten adviseren u graag over de meest geschikte behandeling.
            </p>

            <div className="flex flex-col gap-8">
              {gegevens.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <p
                    className="font-sans text-xs tracking-[0.2em] uppercase"
                    style={{ color: "var(--rose-gold)" }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      data-analytics={item.analytics}
                      className="font-sans text-sm text-foreground hover:text-[color:var(--rose-gold)] transition-colors duration-200 w-fit"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-sans text-sm text-foreground">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-[color:var(--cream)] p-8 md:p-12">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle size={40} style={{ color: "var(--rose-gold)" }} />
                <h3 className="font-serif text-2xl text-foreground">Bedankt!</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Uw aanvraag is ontvangen. Wij nemen zo spoedig mogelijk contact met u op.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      Naam *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200"
                      placeholder="Uw volledige naam"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      Telefoon
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200"
                      placeholder="+31"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    E-mailadres *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200"
                    placeholder="uw@email.nl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Gewenste behandeling
                  </label>
                  <select
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200 cursor-pointer"
                  >
                    <option value="">Maak een keuze</option>
                    <option value="gezichtsbehandeling">Gezichtsbehandeling</option>
                    <option value="laserontharing">Laserontharing</option>
                    <option value="consult">Vrijblijvend consult</option>
                    <option value="overig">Overig</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Bericht
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200 resize-none"
                    placeholder="Stel uw vraag of laat een bericht achter..."
                  />
                </div>

                {error && (
                  <p className="font-sans text-sm text-destructive">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-4 font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 text-[color:var(--cream)] transition-opacity duration-200 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--rose-gold)" }}
                >
                  {sending ? "Bezig met versturen…" : "Verstuur aanvraag"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
