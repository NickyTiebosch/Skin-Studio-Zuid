import Image from "next/image"
import StudioImage from "@/Images/1000026036.jpg"

export function StudioSection() {
  return (
    <section id="studio" className="py-16 md:py-24 bg-[color:var(--sand)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Text side */}
          <div>
            <span
              className="font-sans text-sm tracking-[0.4em] uppercase mb-4 block"
              style={{ color: "var(--rose-gold)" }}
            >
              Over ons
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance mb-6 leading-tight">
              Waar wetenschap en schoonheid samenkomen.
            </h2>
            <div className="w-10 h-px mb-6" style={{ backgroundColor: "var(--rose-gold)" }} />
            <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-4">
              Welkom bij de skinstudio van de toekomst. Bij Skin Studio Zuid draait alles om huidoptimalisatie op het hoogste niveau. Onze studio is ontstaan uit een passie voor huidverbetering en innovatie. Wij geloven dat echte resultaten niet pijnlijk hoeven te zijn.
            </p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-4">
              Wij werken uitsluitend met gecertificeerde specialisten en de meest geavanceerde apparatuur: de Atres Triple Wave Laser voor definitieve ontharing en de Atres HydraSpa voor huidverbetering en lift. Techniek en expertise in één.
            </p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Wij veranderen niet wie je bent — we onthullen de beste versie van jezelf met de techniek van morgen.
            </p>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="relative h-[500px] md:h-[620px] overflow-hidden">
              <Image
                src={StudioImage}
                alt="Interieur van Skin Studio Zuid met visgraatvloer en latjeswand"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-center"
              />
              {/* Warme filter overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: "rgba(180, 120, 80, 0.25)" }}
                aria-hidden
              />
            </div>
            {/* Decorative offset block */}
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 hidden md:block"
              style={{ backgroundColor: "var(--walnut)" }}
            />
            <div
              className="absolute -top-6 -right-6 w-20 h-20 hidden md:block border"
              style={{ borderColor: "var(--rose-gold)" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
