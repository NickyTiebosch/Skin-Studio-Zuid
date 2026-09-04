 "use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import Logo from "@/Images/Gemini_Generated_Image_lszs4rlszs4rlszs-fotor-bg-remover-202603101188.png"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { label: "Behandelingen", href: "/#behandelingen" },
    { label: "De Studio", href: "/#studio" },
    { label: "Producten", href: "/#producten" },
    { label: "Contact", href: "/#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
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

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-200 ${
                  scrolled
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
        <div className="hidden md:block">
          <Link
            href="/#contact"
            className="font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 border transition-colors duration-200"
            style={{
              borderColor: "var(--rose-gold)",
              color: "var(--rose-gold)",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--rose-gold)"
              ;(e.currentTarget as HTMLElement).style.color = "var(--cream)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor =
                "transparent"
              ;(e.currentTarget as HTMLElement).style.color = "var(--rose-gold)"
            }}
          >
            Afspraak maken
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Sluit menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[color:var(--sand-light)] border-t border-border px-6 py-8 flex flex-col gap-6">
          {links.map((link) => (
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
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 border text-center"
            style={{ borderColor: "var(--rose-gold)", color: "var(--rose-gold)" }}
          >
            Afspraak maken
          </Link>
        </div>
      )}
    </header>
  )
}
