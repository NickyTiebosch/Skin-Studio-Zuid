 "use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { hoofdnavigatie } from "@/lib/navigatie"
import Logo from "@/Images/logo-skin-studio-zuid.png"

export function Navbar() {
  const [gescrold, setGescrold] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pad = usePathname()

  useEffect(() => {
    const handleScroll = () => setGescrold(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // De balk is bovenaan doorzichtig met witte tekst, wat alleen leesbaar is
  // boven de donkere hero van de homepage. Op elke andere pagina begint de
  // inhoud op een lichte achtergrond, dus daar hoort de balk meteen zijn
  // ondoorzichtige variant te gebruiken.
  const opHomepage = pad === "/"
  const vast = gescrold || !opHomepage

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        vast
          ? "bg-[color:var(--sand-light)]/95 backdrop-blur-sm border-b border-[color:var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center leading-none">
          <Image
            src={Logo}
            alt="Skin Studio Zuid"
            className="h-18 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav.
            Pas vanaf xl (1280px). De vijf labels in kapitalen met brede
            spatiëring zijn samen 684px, plus logo (72px) en knop (191px): op
            1024px blijft er geen tussenruimte over en breken "De Studio" en de
            knop over twee regels. Op 768px brak het oude menu met vier items
            ook al zo. Daaronder toont de balk het hamburgermenu. Gemeten op
            6 september 2026. */}
        <ul className="hidden xl:flex items-center gap-10">
          {hoofdnavigatie.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-200 ${
                  vast
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white hover:text-white/90"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden xl:block">
          <Link
            href="/boeken"
            className="ssz-cta font-sans text-xs tracking-[0.2em] uppercase px-6 py-3"
          >
            Afspraak maken
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="xl:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden bg-[color:var(--sand-light)] border-t border-border px-6 py-8 flex flex-col gap-6">
          {hoofdnavigatie.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/boeken"
            onClick={() => setMenuOpen(false)}
            className="ssz-cta font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 text-center"
          >
            Afspraak maken
          </Link>
        </div>
      )}
    </header>
  )
}
