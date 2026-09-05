import Image from "next/image"
import Link from "next/link"
import HeroImage from "@/Images/1000026002.jpg"
import { ADRES } from "@/lib/contact"

export function HeroSection() {
  return (
    <section className="ssz-scrim ssz-korrel relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden isolate">
      {/* Achtergrond. Blijft `priority` en begint volledig zichtbaar: het
          inzoomen verandert alleen de schaal, niet de dekking, en raakt de
          laadtijdmeting daarom niet. */}
      <Image
        src={HeroImage}
        alt="Luxe behandelkamer Skin Studio Zuid"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="ssz-hero-media object-cover object-center -z-10"
      />

      {/* Band achter de navigatiebalk, zodat de witte menu-items leesbaar
          blijven boven het lichte deel van de foto. */}
      <div className="ssz-kopband" aria-hidden="true" />

      {/* Inhoud. Gaat bij het wegscrollen iets sneller omhoog dan de foto,
          wat diepte geeft. */}
      <div className="ssz-intro ssz-hero-inhoud relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="ssz-caps ssz-intro-op font-sans text-sm mt-[calc(2rem+0.5cm)] mb-7 text-[color:var(--cream)]">
          Skin Studio Zuid &mdash; {ADRES.plaats}
        </p>

        {/* Eén masker om de hele kop, en niet één per regel.

            Gemeten verschil: met een masker per regel wordt elke regel een
            eigen LCP-kandidaat van zo'n 8.900 px². Dat is kleiner dan de
            cookiebanner (28.400 px²), die pas na de hydratie schildert — en
            dus werd díé het gemeten element en sprong de Largest Contentful
            Paint van 1,3 naar 3,0 seconde. Als één blok is de kop groot genoeg
            om te winnen en wordt hij gemeten op het moment dat hij echt
            verschijnt.

            Om diezelfde reden is de kop een maat groter dan voorheen: de
            strakkere tracking en kleinere regelafstand maakten het tekstblok
            kleiner dan de cookiebanner, die pas na de hydratie schildert en
            hem daarmee overnam. Grotere letters lossen dat op én geven de hero
            meer zeggingskracht. */}
        <div className="ssz-regel mb-9">
          <h1 className="ssz-display ssz-regel-binnen font-serif text-5xl md:text-7xl lg:text-8xl text-[color:var(--cream)] leading-[1.04]">
            Geef je huid de aandacht die het verdient.
          </h1>
        </div>

        <div
          className="ssz-intro-lijn ssz-vertraag-1 w-24 h-px mx-auto mb-9"
          style={{ backgroundColor: "var(--rose-gold)" }}
        />

        <p className="ssz-lopend ssz-intro-op ssz-vertraag-2 font-sans text-sm md:text-base text-[color:var(--cream)]/80 leading-[1.85] mb-12 max-w-xl mx-auto">
          Ontdek de geavanceerde behandelingen van Skin Studio Zuid. Wij
          combineren expertise met ontspanning voor een stralend resultaat.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/boeken"
            className="ssz-caps ssz-veeg ssz-intro-op ssz-vertraag-3 font-sans text-sm px-9 py-4 text-[color:var(--cream)] transition-opacity duration-300 hover:opacity-95"
            style={{ backgroundColor: "var(--rose-gold)" }}
          >
            Afspraak maken
          </Link>
          <Link
            href="/#behandelingen"
            className="ssz-caps ssz-intro-op ssz-vertraag-4 font-sans text-sm px-9 py-4 border border-[color:var(--cream)]/40 text-[color:var(--cream)] transition-colors duration-300 hover:border-[color:var(--cream)]"
          >
            Ontdek behandelingen
          </Link>
        </div>
      </div>

      {/* Scroll-aanwijzing: een gouden streepje dat rustig op en neer gaat,
          in plaats van het stuiterende pijltje dat er stond. */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 h-12 w-px overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="ssz-puls h-6 w-px"
          style={{ backgroundColor: "var(--rose-gold)" }}
        />
      </div>
    </section>
  )
}
