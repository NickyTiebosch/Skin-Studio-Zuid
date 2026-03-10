export function QuoteSection() {
  return (
    <section
      className="py-16 md:py-24 px-6"
      style={{ backgroundColor: "var(--walnut)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="w-12 h-px mx-auto mb-8"
          style={{ backgroundColor: "var(--rose-gold)" }}
        />
        <blockquote className="font-serif text-2xl md:text-4xl text-[color:var(--cream)] leading-relaxed text-balance italic mb-6">
          "Schoonheid is niet een masker dat je draagt — het is een uitdrukking van hoe goed je je voelt van binnen."
        </blockquote>
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--rose-gold)" }}
        >
          Skin Studio Zuid — Filosofie
        </p>
        <div
          className="w-12 h-px mx-auto mt-8"
          style={{ backgroundColor: "var(--rose-gold)" }}
        />
      </div>
    </section>
  )
}
