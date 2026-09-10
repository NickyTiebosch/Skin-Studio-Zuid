import Image from "next/image"
import { rondgang } from "@/lib/editie2/beeld"

/**
 * "Over ons": de tekst uit de eerste versie, met rechts de plek voor het
 * WebGL-accent (de ring van licht, mijlpaal M3). Tot die er is staat hier het
 * stilstaande beeld dat straks ook de terugvaloptie is, in een cirkel die het
 * logomotief alvast aankondigt.
 */
export function Studio() {
  const beeld = rondgang[1]

  return (
    <section id="studio" className="e2-korrel px-6 py-20 md:py-28" style={{ backgroundColor: "var(--sand)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="ssz-op">
          <span
            className="mb-4 block font-sans text-xs uppercase tracking-[0.4em]"
            style={{ color: "var(--rose-gold)" }}
          >
            Over ons
          </span>
          <h2 className="mb-6 font-serif text-3xl leading-tight text-balance text-foreground md:text-5xl">
            Waar wetenschap en schoonheid samenkomen.
          </h2>
          <div className="ssz-lijn mb-6 h-px w-10" style={{ backgroundColor: "var(--rose-gold)" }} />
          <p className="mb-4 font-sans text-sm leading-relaxed text-muted-foreground">
            Welkom bij de skinstudio van de toekomst. Bij Skin Studio Zuid draait alles om
            huidoptimalisatie op het hoogste niveau. Onze studio is ontstaan uit een passie
            voor huidverbetering en innovatie. Wij geloven dat echte resultaten niet pijnlijk
            hoeven te zijn.
          </p>
          <p className="mb-4 font-sans text-sm leading-relaxed text-muted-foreground">
            Wij werken uitsluitend met gecertificeerde specialisten en de meest geavanceerde
            apparatuur: de Atres Triple Wave Laser voor definitieve ontharing en de Atres
            HydraSpa voor huidverbetering en lift. Techniek en expertise in één.
          </p>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            Wij veranderen niet wie je bent &mdash; we onthullen de beste versie van jezelf met
            de techniek van morgen.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="e2-gloed pointer-events-none absolute -inset-10" aria-hidden="true" />
          <div className="relative aspect-square overflow-clip rounded-full">
            <Image
              src={beeld.src}
              alt={beeld.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="ssz-drift object-cover"
              style={{ objectPosition: beeld.positie }}
            />
          </div>
          {/* De penseelcirkel van het logo, als dunne ring om het beeld. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-full border"
            style={{ borderColor: "color-mix(in oklch, var(--rose-gold) 55%, transparent)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-full border"
            style={{ borderColor: "color-mix(in oklch, var(--rose-gold) 22%, transparent)" }}
          />
        </div>
      </div>
    </section>
  )
}
