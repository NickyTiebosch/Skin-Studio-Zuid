import Link from "next/link"
import { Instagram, MapPin, Phone, Mail } from "lucide-react"
import { TELEFOON_HREF, TELEFOON_WEERGAVE, EMAIL, ADRES, INSTAGRAM } from "@/lib/contact"
import { behandelingsnavigatie, hoofdnavigatie } from "@/lib/navigatie"

export function Footer() {
  return (
    <footer
      id="footer"
      className="py-16 md:py-20 px-6"
      style={{ backgroundColor: "var(--walnut)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
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
              Exclusieve kliniek voor gezichtsbehandelingen en laserontharing in <span className="whitespace-nowrap">&apos;s-Hertogenbosch</span>. Waar wetenschap en sereniteit samenkomen.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <p
                className="font-sans text-xs tracking-[0.2em] uppercase mb-5"
                style={{ color: "var(--rose-gold)" }}
              >
                Navigatie
              </p>
              <ul className="flex flex-col gap-3">
                {hoofdnavigatie.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-sans text-xs text-[color:var(--cream)]/60 hover:text-[color:var(--cream)] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="font-sans text-xs tracking-[0.2em] uppercase mb-5"
                style={{ color: "var(--rose-gold)" }}
              >
                Behandelingen
              </p>
              <ul className="flex flex-col gap-3">
                {behandelingsnavigatie.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-sans text-xs text-[color:var(--cream)]/60 hover:text-[color:var(--cream)] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="font-sans text-xs tracking-[0.2em] uppercase mb-5"
                style={{ color: "var(--rose-gold)" }}
              >
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
                  <a
                    href={TELEFOON_HREF}
                    data-analytics="click_telefoon"
                    className="font-sans text-xs text-[color:var(--cream)]/60 hover:text-[color:var(--cream)] transition-colors duration-200"
                  >
                    {TELEFOON_WEERGAVE}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={12} className="shrink-0 text-[color:var(--cream)]/60" />
                  <a
                    href={`mailto:${EMAIL}`}
                    data-analytics="click_email"
                    className="font-sans text-xs text-[color:var(--cream)]/60 hover:text-[color:var(--cream)] transition-colors duration-200"
                  >
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
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
