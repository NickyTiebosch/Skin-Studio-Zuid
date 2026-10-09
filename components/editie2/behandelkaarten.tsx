import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { behandelingen } from "@/lib/behandelingen"
import { rondgang } from "@/lib/editie2/beeld"
import { Paginaovergang, behandelingOvergang } from "@/components/paginaovergang"

/**
 * De twee behandelingen als glas-kaarten over een zachte fotoband, plus een
 * smalle derde kaart die naar de tarieven wijst. Inhoud komt uit
 * lib/behandelingen.ts; de foto op de kaart groeit bij klikken door naar de
 * kop van de behandelpagina (dezelfde `Paginaovergang`-naam als daar).
 */
export function Behandelkaarten() {
  const band = rondgang[2]

  return (
    <section id="behandelingen" className="relative overflow-clip py-20 md:py-28 px-6">
      {/* Fotoband: de lattenwand, ver naar de crème toe getrokken zodat de
          kaarten erop lezen als glas. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={band.src}
          alt=""
          fill
          sizes="100vw"
          className="ssz-drift object-cover"
          style={{ objectPosition: "50% 35%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--cream) 0%, color-mix(in oklch, var(--cream) 78%, transparent) 35%, color-mix(in oklch, var(--cream) 78%, transparent) 65%, var(--cream) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="ssz-op mb-12 flex flex-col items-center text-center md:mb-16">
          <span
            className="mb-4 font-sans text-xs uppercase tracking-[0.4em]"
            style={{ color: "var(--rose-gold)" }}
          >
            Onze specialisaties
          </span>
          <h2 className="max-w-xl font-serif text-3xl text-balance text-foreground md:text-5xl">
            Behandelingen op maat
          </h2>
          <div className="mt-6 h-px w-12" style={{ backgroundColor: "var(--rose-gold)" }} />
        </div>

        <div className="ssz-trap grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.72fr] md:gap-6">
          {behandelingen.map((item) => (
            <article key={item.slug} className="ssz-op ssz-til e2-glas group flex flex-col overflow-clip">
              <div className="relative aspect-[4/3] overflow-clip">
                <Paginaovergang naam={behandelingOvergang(item.slug)}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Paginaovergang>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p
                  className="mb-3 font-sans text-xs uppercase tracking-[0.3em]"
                  style={{ color: "var(--rose-gold)" }}
                >
                  {item.tag}
                </p>
                <h3 className="mb-3 font-serif text-2xl text-balance text-foreground md:text-3xl">
                  {item.title}
                </h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.benefits && (
                  <ul className="mb-8 flex flex-wrap gap-2">
                    {item.benefits.slice(0, 4).map((v) => (
                      <li
                        key={v.label}
                        className="border px-3 py-1 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                        style={{ borderColor: "color-mix(in oklch, var(--rose-gold) 35%, transparent)" }}
                      >
                        {v.label}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/${item.slug}`}
                  className="mt-auto inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-foreground hover:text-[color:var(--rose-gold)] transition-colors"
                >
                  Meer over {item.tag.toLowerCase()}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}

          <aside className="ssz-op e2-glas flex flex-col justify-between p-6 md:p-8 md:col-span-2 lg:col-span-1">
            <div>
              <p
                className="mb-3 font-sans text-xs uppercase tracking-[0.3em]"
                style={{ color: "var(--rose-gold)" }}
              >
                Onder één dak
              </p>
              <h3 className="mb-4 font-serif text-2xl text-balance text-foreground">
                Twee specialismen, één intake.
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                Laserontharing en huidverbetering vragen elk om eigen apparatuur en
                expertise. Bij ons vind je ze in dezelfde studio, en elk traject
                begint met een gratis intake waarin we samen kijken wat er nodig is.
              </p>
            </div>
            <Link
              href="/tarieven"
              className="mt-8 inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--rose-gold)" }}
            >
              Bekijk de tarieven
              <span className="block h-px w-8" style={{ backgroundColor: "var(--rose-gold)" }} />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
