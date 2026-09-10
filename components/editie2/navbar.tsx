"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { hoofdnavigatie } from "@/lib/navigatie"
import Logo from "@/Images/logo-skin-studio-zuid.png"

/**
 * De balk van editie 2.
 *
 * Twee dingen anders dan in de eerste versie:
 *
 * 1. Het menu staat al vanaf 1024px in de balk (was 1280px), met iets kleinere
 *    letters en minder spatiëring. Daaronder een hamburgerknop van 44×44 die
 *    altijd donker op licht staat — de hero van editie 2 is licht, dus de
 *    balk hoeft nergens meer wit te zijn. Daarmee is het onzichtbare icoontje
 *    van de eerste versie weg.
 * 2. Het mobiele menu is een overlay over de hele pagina met grote serif
 *    links die trapsgewijs verschijnen, in plaats van een lijstje onder de
 *    balk.
 */
export function Navbar() {
  const [gescrold, setGescrold] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const bijScroll = () => setGescrold(window.scrollY > 24)
    bijScroll()
    window.addEventListener("scroll", bijScroll, { passive: true })
    return () => window.removeEventListener("scroll", bijScroll)
  }, [])

  // Zolang het overlay-menu open is scrolt de pagina eronder niet mee, en
  // sluit Escape het menu — zoals elk dialoogvenster hoort te doen.
  useEffect(() => {
    if (!menuOpen) return
    const vorige = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    const bijToets = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", bijToets)
    return () => {
      document.documentElement.style.overflow = vorige
      window.removeEventListener("keydown", bijToets)
    }
  }, [menuOpen])

  const vast = gescrold || menuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        vast
          ? "bg-[color:var(--sand-light)]/90 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center leading-none" onClick={() => setMenuOpen(false)}>
          <Image src={Logo} alt="Skin Studio Zuid" className="h-16 w-auto" priority />
        </Link>

        {/* Menu in de balk, vanaf 1024px. Gemeten: vijf labels op 11px met
            0,12em spatiëring plus logo en knop passen op 1024px met ruimte over. */}
        <ul className="hidden lg:flex items-center gap-7">
          {hoofdnavigatie.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-sans text-[11px] tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 ssz-streep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/boeken"
            className="ssz-cta font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-3"
          >
            Afspraak maken
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center text-foreground"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="e2-menu"
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Overlay-menu */}
      {menuOpen && (
        <div
          id="e2-menu"
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 flex flex-col justify-between px-6 pb-8 pt-6 overflow-y-auto"
          style={{ backgroundColor: "var(--sand-light)" }}
        >
          <ul className="flex flex-col">
            {hoofdnavigatie.map((link, i) => (
              <li
                key={link.href}
                className="e2-menu-item border-b"
                style={{ borderColor: "var(--border)", animationDelay: `${i * 60}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-5 font-serif text-2xl text-foreground"
                >
                  {link.label}
                  <span
                    className="font-sans text-[10px] tracking-[0.2em]"
                    style={{ color: "var(--rose-gold)" }}
                  >
                    0{i + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/boeken"
            onClick={() => setMenuOpen(false)}
            className="e2-menu-item ssz-cta font-sans text-xs tracking-[0.2em] uppercase px-6 py-4 text-center"
            style={{ animationDelay: `${hoofdnavigatie.length * 60}ms` }}
          >
            Afspraak maken
          </Link>
        </div>
      )}
    </header>
  )
}
