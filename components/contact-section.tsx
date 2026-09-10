"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { CalendarDays, CheckCircle } from "lucide-react"
import dynamic from "next/dynamic"
import { format } from "date-fns"

// De kalender (react-day-picker + date-fns) is alleen nodig op /boeken en pas
// nadat een boekbare behandeling gekozen is. Als losse bundel scheelt dat de
// homepage zo'n 32 kB aan JavaScript; de component wordt toch pas na het
// laden getekend (zie `geladen` hieronder).
const AfspraakKiezer = dynamic(
  () => import("@/components/afspraak-kiezer").then((m) => m.AfspraakKiezer),
  {
    ssr: false,
    loading: () => (
      <p className="font-sans text-xs text-muted-foreground">Kalender wordt geladen…</p>
    ),
  }
)
import {
  STANDAARD_DAGDEEL,
  type DagdeelId,
  afspraakVoor,
  formatteerDatum,
} from "@/lib/agenda"
import { meld } from "@/lib/analytics"
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

export function ContactSection({
  standaardBehandeling = "",
  titel,
  intro,
  kopNiveau = "h2",
  metAgenda = false,
}: {
  /** Vult het behandelingsveld voor, bijvoorbeeld vanaf een behandelpagina. */
  standaardBehandeling?: string
  titel?: string
  intro?: string
  /**
   * Op de homepage is de kop een h2 onder de hero; op /boeken is deze sectie
   * de hele pagina en hoort de kop de h1 te zijn.
   */
  kopNiveau?: "h1" | "h2"
  /**
   * Toont de aanvraagkalender zodra een boekbare behandeling is gekozen. Staat
   * aan op /boeken; op de homepage blijft het een kort contactformulier.
   */
  metAgenda?: boolean
} = {}) {
  const Kop = kopNiveau
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: standaardBehandeling,
    message: "",
  })
  const [datum, setDatum] = useState<Date | undefined>(undefined)
  const [dagdeel, setDagdeel] = useState<DagdeelId>(STANDAARD_DAGDEEL)
  const boekingGestart = useRef(false)

  // De kalender rekent met "vandaag" en die kan op de server (UTC) een andere
  // dag zijn dan bij de bezoeker. Daarom pas tekenen na het laden, zodat de
  // server en de browser nooit een verschillende kalender opleveren.
  const [geladen, setGeladen] = useState(false)
  useEffect(() => {
    setGeladen(true)
  }, [])

  const afspraak = metAgenda ? afspraakVoor(form.treatment) : undefined

  function kiesDatum(nieuweDatum: Date | undefined) {
    setDatum(nieuweDatum)
    setError(null)
    if (nieuweDatum && !boekingGestart.current) {
      boekingGestart.current = true
      meld("booking_started", { behandeling: form.treatment })
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (afspraak && !datum) {
      setError("Kies een datum voor uw afspraak.")
      return
    }
    setSending(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...(afspraak && datum
            ? { date: format(datum, "yyyy-MM-dd"), daypart: dagdeel }
            : {}),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error ?? "Er ging iets mis. Probeer het later opnieuw.")
        setSending(false)
        return
      }
      setSubmitted(true)
      // Het formulier wordt inline vervangen door een bedanktekst; de URL
      // verandert dus niet. Zonder deze melding zou er geen enkel signaal zijn
      // waaraan een geslaagde aanvraag te herkennen valt.
      meld("generate_lead", { behandeling: form.treatment || "niet opgegeven" })
      if (afspraak && datum) {
        meld("booking_completed", { behandeling: form.treatment, dagdeel })
      }
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
            <Kop className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-8 leading-tight">
              {titel ?? "Jouw transformatie begint hier"}
            </Kop>
            <div className="w-10 h-px mb-10" style={{ backgroundColor: "var(--rose-gold)" }} />
            <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-12">
              {intro ??
                "Neem contact met ons op voor een vrijblijvende kennismaking of om direct een afspraak te plannen. Onze specialisten adviseren u graag over de meest geschikte behandeling."}
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
          <div className="e2-glas p-8 md:p-12">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle size={40} style={{ color: "var(--rose-gold)" }} />
                <h3 className="font-serif text-2xl text-foreground">Bedankt!</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {afspraak && datum
                    ? `Uw aanvraag voor ${afspraak.naam.toLowerCase()} op ${formatteerDatum(datum)} is ontvangen. Wij bevestigen de afspraak per e-mail of telefoon.`
                    : "Uw aanvraag is ontvangen. Wij nemen zo spoedig mogelijk contact met u op."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-naam" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      Naam *
                    </label>
                    <input
                      required
                      id="contact-naam"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200"
                      placeholder="Uw volledige naam"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-telefoon" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      Telefoon
                    </label>
                    <input
                      id="contact-telefoon"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200"
                      placeholder="+31"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    E-mailadres *
                  </label>
                  <input
                    required
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200"
                    placeholder="uw@email.nl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-behandeling" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Gewenste behandeling
                  </label>
                  <select
                    id="contact-behandeling"
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200 cursor-pointer"
                  >
                    <option value="">Maak een keuze</option>
                    <option value="gezichtsbehandeling">Gezichtsbehandeling</option>
                    <option value="laserontharing">Laserontharing</option>
                    <option value="consult">Gratis intakegesprek</option>
                    <option value="overig">Overig</option>
                  </select>
                </div>

                {/* De datumkeuze hangt af van de behandeling: laserontharing
                    begint met een intake, en bij "overig" hoort een bericht en
                    geen datum. Daardoor stond hier vóór een keuze helemaal
                    niets, en zag een bezoeker op /boeken nooit dat er een
                    agenda was. De plek is nu altijd zichtbaar en zegt zelf wat
                    er moet gebeuren. */}
                {metAgenda &&
                  (geladen && afspraak ? (
                    <AfspraakKiezer
                      afspraak={afspraak}
                      datum={datum}
                      onDatum={kiesDatum}
                      dagdeel={dagdeel}
                      onDagdeel={setDagdeel}
                    />
                  ) : (
                    <div className="flex flex-col gap-3">
                      <p className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        Wanneer schikt het u?
                      </p>
                      <div
                        className="flex items-start gap-3 border border-dashed px-4 py-4"
                        style={{
                          borderColor: "color-mix(in oklch, var(--rose-gold) 40%, transparent)",
                        }}
                      >
                        <CalendarDays
                          size={18}
                          className="mt-0.5 shrink-0"
                          style={{ color: "var(--rose-gold)" }}
                          aria-hidden="true"
                        />
                        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                          {form.treatment === "overig" ? (
                            <>
                              Bij &ldquo;overig&rdquo; plannen we geen datum vooruit.
                              Laat hieronder uw vraag achter, dan nemen we contact
                              met u op.
                            </>
                          ) : (
                            <>
                              Kies hierboven een behandeling, dan verschijnt hier de
                              kalender en kiest u zelf een dag die u schikt.
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-bericht" className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Bericht
                  </label>
                  <textarea
                    id="contact-bericht"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-transparent border-b border-border py-3 font-sans text-sm text-foreground outline-none focus:border-[color:var(--rose-gold)] transition-colors duration-200 resize-none"
                    placeholder="Stel uw vraag of laat een bericht achter..."
                  />
                </div>

                {error && (
                  <p role="alert" className="font-sans text-sm text-destructive">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-4 font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 text-[color:var(--cream)] transition-opacity duration-200 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--rose-gold)" }}
                >
                  {sending
                    ? "Bezig met versturen…"
                    : afspraak
                      ? "Vraag afspraak aan"
                      : "Verstuur aanvraag"}
                </button>
                <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                  Wij gebruiken uw gegevens alleen om contact met u op te nemen
                  over deze aanvraag. Lees hoe wij daarmee omgaan in ons{" "}
                  <Link
                    href="/privacybeleid"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    privacybeleid
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
