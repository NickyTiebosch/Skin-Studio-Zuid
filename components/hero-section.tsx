import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import HeroImage from "@/Images/1000026002.jpg"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image. Zoomt langzaam in tijdens het scrollen; de dekking
          blijft ongemoeid, dus dit raakt de laadtijdmeting niet. */}
      <Image
        src={HeroImage}
        alt="Luxe behandelkamer Skin Studio Zuid"
        fill
        priority
        sizes="100vw"
        className="ssz-hero-media object-cover object-center"
      />

      {/* Dark overlay. Van 60% naar 64%, en dat is een meetkwestie: bij 60%
          kwamen het kleine label boven de kop op 4,43:1 uit en de menu-items op
          4,35:1, waar de norm 4,5:1 vraagt voor kleine tekst. Vier procentpunt
          brengt beide ruim boven de norm en is met het oog niet te zien. Een
          zwaarder verloop was hier eerder de fout: dat haalde de norm wél, maar
          verzoop de foto. */}
      <div className="absolute inset-0 bg-[color:var(--walnut)]/64" />

      {/* Content. Gaat bij het wegscrollen iets sneller omhoog dan de foto,
          wat diepte geeft. */}
      <div className="ssz-intro ssz-hero-inhoud relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p
          className="ssz-intro-op font-sans text-xs tracking-[0.4em] uppercase mt-[calc(2rem+0.5cm)] mb-6 text-white"
        >
          Skin Studio Zuid - 's-Hertogenbosch
        </p>
        {/* Eén masker om de hele kop, en niet één per regel.

            Gemeten: met een masker per regel wordt elke regel een eigen
            LCP-kandidaat van zo'n 8.900 px². Dat is kleiner dan de
            cookiebanner, die pas na de hydratie schildert — en dus werd díé het
            gemeten element en sprong de Largest Contentful Paint van 1,3 naar
            3,0 seconde. Als één blok is de kop groot genoeg om te winnen. */}
        <div className="ssz-regel mb-8">
          <h1 className="ssz-regel-binnen font-serif text-4xl md:text-6xl lg:text-7xl text-[color:var(--cream)] leading-tight text-balance">
            Geef je huid de aandacht die het verdient.
          </h1>
        </div>
        <p className="ssz-intro-op ssz-vertraag-2 font-sans text-sm md:text-base text-[color:var(--cream)]/70 leading-relaxed mb-12 max-w-xl mx-auto">
          Ontdek de geavanceerde behandelingen van Skin Studio Zuid. Wij combineren expertise met ontspanning voor een stralend resultaat.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/boeken"
            className="ssz-veeg ssz-intro-op ssz-vertraag-3 font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-300 text-[color:var(--cream)]"
            style={{ backgroundColor: "var(--rose-gold)" }}
          >
            Afspraak maken
          </Link>
          <Link
            href="/#behandelingen"
            className="ssz-intro-op ssz-vertraag-4 font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 border border-[color:var(--cream)]/50 text-[color:var(--cream)] hover:border-[color:var(--cream)] transition-colors duration-300"
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
