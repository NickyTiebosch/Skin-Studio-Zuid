import Image from "next/image"
import StudioImage from "@/Images/1000026036.jpg"

/**
 * De tekstkolom blijft staan terwijl het beeld ernaast doorloopt.
 *
 * Dat is `position: sticky` — pure CSS, geen scroll-listener, dus het raakt de
 * reactiesnelheid van de pagina niet. Het beeld wordt onthuld door een doek
 * dat wegschuift in plaats van door een fade; dat leest duurder en is even
 * goedkoop, want beide zijn niets meer dan een `transform`.
 */
export function StudioSection() {
  return (
    <section id="studio" className="py-16 md:py-24 bg-[color:var(--sand)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          {/* Tekst — blijft staan */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span
                className="ssz-caps ssz-op font-sans text-sm mb-5 block"
                style={{ color: "var(--rose-gold)" }}
              >
                Over ons
              </span>
              <h2 className="ssz-display ssz-op font-serif text-3xl md:text-5xl text-foreground mb-6 leading-tight">
                Waar wetenschap en schoonheid samenkomen.
              </h2>
              <div
                className="ssz-lijn w-16 h-px mb-7"
                style={{ backgroundColor: "var(--rose-gold)" }}
              />
              <div className="ssz-op flex flex-col gap-4">
                <p className="ssz-lopend font-sans text-sm leading-[1.85] text-muted-foreground">
                  Welkom bij de skinstudio van de toekomst. Bij Skin Studio Zuid
                  draait alles om huidoptimalisatie op het hoogste niveau. Onze
                  studio is ontstaan uit een passie voor huidverbetering en
                  innovatie. Wij geloven dat echte resultaten niet pijnlijk
                  hoeven te zijn.
                </p>
                <p className="ssz-lopend font-sans text-sm leading-[1.85] text-muted-foreground">
                  Wij werken uitsluitend met gecertificeerde specialisten en de
                  meest geavanceerde apparatuur: de Atres Triple Wave Laser voor
                  definitieve ontharing en de Atres HydraSpa voor huidverbetering
                  en lift. Techniek en expertise in één.
                </p>
                <p className="ssz-lopend font-sans text-sm leading-[1.85] text-muted-foreground">
                  Wij veranderen niet wie je bent — we onthullen de beste versie
                  van jezelf met de techniek van morgen.
                </p>
              </div>
            </div>
          </div>

          {/* Beeld — loopt door */}
          <div className="lg:col-span-7 relative">
            <div
              className="ssz-doek relative h-[500px] md:h-[720px] overflow-hidden"
              style={{ "--doek": "var(--sand)" } as React.CSSProperties}
            >
              <Image
                src={StudioImage}
                alt="Interieur van Skin Studio Zuid met visgraatvloer en latjeswand"
                fill
                sizes="(max-width: 1024px) 100vw, 760px"
                placeholder="blur"
                className="ssz-drift object-cover object-center"
              />
              {/* Warme filter overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: "rgba(180, 120, 80, 0.22)" }}
                aria-hidden
              />
            </div>

            {/* Decoratieve blokken */}
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 hidden md:block"
              style={{ backgroundColor: "var(--walnut)" }}
              aria-hidden
            />
            <div
              className="absolute -top-6 -right-6 w-20 h-20 hidden md:block border"
              style={{ borderColor: "var(--rose-gold)" }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}
