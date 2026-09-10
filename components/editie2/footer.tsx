import Link from "next/link"
import { Instagram, MapPin, Phone, Mail } from "lucide-react"
import { TELEFOON_HREF, TELEFOON_WEERGAVE, EMAIL, ADRES, INSTAGRAM } from "@/lib/contact"
import { behandelingsnavigatie, sectienavigatie } from "@/lib/navigatie"
import { BEELD_VERANTWOORDING, heeftAiBeelden } from "@/lib/editie2/beeld"

/**
 * De footer van editie 2: dezelfde opbouw als de eerste versie, met één regel
 * extra zodra er ergens een AI-beeld op de site staat. Die regel komt uit het
 * beeldmanifest, dus hij verschijnt vanzelf op het moment dat het eerste
 * sfeerbeeld erin gaat en verdwijnt weer als ze allemaal vervangen zijn.
 */
export function Footer() {
  const linkKlasse =
    "font-sans text-xs text-[color:var(--cream)]/60 hover:text-[color:var(--cream)] transition-colors duration-200"

  return (
    <footer id="footer" className="py-16 md:py-20 px-6" style={{ backgroundColor: "var(--walnut)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-xs">
            <div className="flex flex-col leading-none mb-6">
              <span className="font-serif text-xl tracking-widest uppercase text-[color:var(--cream)]">
                Skin Studio
              </span>
              <span
                className="font-sans text-xs tracking-[0.3em] uppercase"
                style={{ color: "var(--rose-gold)" }}
              >
                Zuid
              </span>
            </div>
            <p className="font-sans text-xs leading-relaxed text-[color:var(--cream)]/60">
              Exclusieve kliniek voor gezichtsbehandelingen en laserontharing in{" "}
              <span className="whitespace-nowrap">&apos;s-Hertogenbosch</span>. Waar wetenschap
              en sereniteit samenkomen.
            </p>
            {heeftAiBeelden() && (
              <p className="font-sans text-[11px] leading-relaxed text-[color:var(--cream)]/40 mt-4">
                {BEELD_VERANTWOORDING}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "var(--rose-gold)" }}>
                Navigatie
              </p>
              <ul className="flex flex-col gap-3">
                {sectienavigatie.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkKlasse}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "var(--rose-gold)" }}>
                Behandelingen
              </p>
              <ul className="flex flex-col gap-3">
                {behandelingsnavigatie.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkKlasse}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "var(--rose-gold)" }}>
                Contact
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-2">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-[color:var(--cream)]/60" />
                  <span className="font-sans text-xs text-[color:var(--cream)]/60">
                    {ADRES.straat}, <span className="whitespace-nowrap">&apos;s-Hertogenbosch</span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={12} className="shrink-0 text-[color:var(--cream)]/60" />
                  <a href={TELEFOON_HREF} data-analytics="click_telefoon" className={linkKlasse}>
                    {TELEFOON_WEERGAVE}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={12} className="shrink-0 text-[color:var(--cream)]/60" />
                  <a href={`mailto:${EMAIL}`} data-analytics="click_email" className={linkKlasse}>
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[color:var(--cream)]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[color:var(--cream)]/40">
            © {new Date().getFullYear()} Skin Studio Zuid. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacybeleid"
              className="font-sans text-xs text-[color:var(--cream)]/40 hover:text-[color:var(--cream)]/60 transition-colors"
            >
              Privacybeleid
            </Link>
            <Link
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram van Skin Studio Zuid"
              className="text-[color:var(--cream)]/40 hover:text-[color:var(--cream)] transition-colors"
            >
              <Instagram size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
