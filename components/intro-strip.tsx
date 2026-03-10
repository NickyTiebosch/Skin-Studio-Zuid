export function IntroStrip() {
  return (
    <section className="bg-[color:var(--walnut)] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-px" style={{ backgroundColor: "var(--rose-gold)" }} />
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-[color:var(--cream)]/70">
            Kalahari Producten
          </p>
        </div>
        <p className="font-serif text-lg md:text-xl text-[color:var(--cream)] text-center text-balance">
          Gecertificeerde specialisten in huidverzorging & laserontharing
        </p>
        <div className="flex items-center gap-4">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-[color:var(--cream)]/70">
            ATRES Technologie
          </p>
          <div className="w-8 h-px" style={{ backgroundColor: "var(--rose-gold)" }} />
        </div>
      </div>
    </section>
  )
}
