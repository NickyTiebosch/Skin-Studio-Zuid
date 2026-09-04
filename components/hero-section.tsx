import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import HeroImage from "@/Images/1000026002.jpg"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={HeroImage}
        alt="Luxe behandelkamer Skin Studio Zuid"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[color:var(--walnut)]/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="font-sans text-xs tracking-[0.4em] uppercase mt-[calc(2rem+0.5cm)] mb-6 text-white"
        >
          Skin Studio Zuid - 's-Hertogenbosch
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[color:var(--cream)] leading-tight text-balance mb-8">
          Geef je huid de aandacht die het verdient.
        </h1>
        <p className="font-sans text-sm md:text-base text-[color:var(--cream)]/70 leading-relaxed mb-12 max-w-xl mx-auto">
          Ontdek de geavanceerde behandelingen van Skin Studio Zuid. Wij combineren expertise met ontspanning voor een stralend resultaat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#contact"
            className="font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-300 text-[color:var(--cream)]"
            style={{ backgroundColor: "var(--rose-gold)" }}
          >
            Afspraak maken
          </Link>
          <Link
            href="/#behandelingen"
            className="font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 border border-[color:var(--cream)]/50 text-[color:var(--cream)] hover:border-[color:var(--cream)] transition-colors duration-300"
          >
            Ontdek behandelingen
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ArrowDown size={18} className="text-[color:var(--cream)]/60" />
      </div>
    </section>
  )
}
