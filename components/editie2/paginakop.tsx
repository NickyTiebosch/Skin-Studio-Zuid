import Link from "next/link"
import type { ReactNode } from "react"

export type Kruimel = { naam: string; pad: string }

/**
 * De kop die /tarieven, /boeken en /privacybeleid delen in editie 2.
 *
 * Dezelfde opbouw als op de behandelpagina's — kruimelpad, eyebrow, één h1
 * achter het maskertje, een gouden lijn en een introtekst — zodat elke pagina
 * op dezelfde manier begint. De beweging is tijdgestuurd (`ssz-intro`) en niet
 * op de scroll-tijdlijn: deze kop staat bij het laden al in beeld, en een
 * scroll-tijdlijn zou dan meteen op zijn eindstand staan.
 *
 * De laatste kruimel is de pagina zelf en krijgt geen link, precies zoals in
 * `kruimelpadSchema()`; houd de namen hier gelijk aan wat daar staat.
 */
export function Paginakop({
  eyebrow,
  titel,
  kruimels,
  children,
}: {
  eyebrow: string
  titel: ReactNode
  kruimels?: Kruimel[]
  children?: ReactNode
}) {
  return (
    <header className="ssz-intro e2-korrel relative overflow-clip px-6 pb-10 pt-32 md:pb-14 md:pt-40">
      <div
        className="e2-gloed pointer-events-none absolute -right-[16vw] -top-[12vh] h-[60vh] w-[60vw]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl">
        {kruimels && kruimels.length > 0 && (
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
              {kruimels.map((k, i) => {
                const laatste = i === kruimels.length - 1
                return (
                  <li key={k.pad} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {laatste ? (
                      <span className="text-foreground">{k.naam}</span>
                    ) : (
                      <Link href={k.pad} className="transition-colors hover:text-foreground">
                        {k.naam}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        <span
          className="ssz-intro-op mb-5 block font-sans text-xs uppercase tracking-[0.4em]"
          style={{ color: "var(--rose-gold)" }}
        >
          {eyebrow}
        </span>

        <div className="ssz-regel mb-6">
          <h1 className="ssz-regel-binnen font-serif text-3xl leading-tight text-balance text-foreground md:text-5xl">
            {titel}
          </h1>
        </div>

        <div
          className="ssz-intro-lijn ssz-vertraag-1 mb-8 h-px w-10"
          style={{ backgroundColor: "var(--rose-gold)" }}
        />

        {children && (
          <div className="ssz-intro-op ssz-vertraag-2 flex flex-col gap-4 font-sans text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
