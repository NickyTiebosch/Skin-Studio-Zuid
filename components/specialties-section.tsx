import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Specialty = {
  id: string
  tag: string
  title: string
  description: string
  detail: string
  image: string
  imageAlt: string
  benefits?: { label: string; text: string }[]
  benefitsHeading?: string
}

const specialties: Specialty[] = [
  {
    id: "gezichtsbehandelingen",
    tag: "Gezichtsbehandelingen",
    title: "Huidverbetering & Lift",
    description:
      'De Atres HydraSpa is de ultieme "all-in-one" behandeling voor een schone, volle en gelifte huid. Het gaat veel verder dan een standaard facial door de combinatie van drie krachtige technieken:',
    benefits: [
      {
        label: "Deep Cleanse & Hydrate",
        text: "Met de Vortex-technologie zuigen we onzuiverheden uit de poriën, terwijl we de huid tegelijkertijd verzadigen met hoogwaardige serums.",
      },
      {
        label: "Directe Lift & Verstrakking",
        text: "Door gebruik te maken van Radiofrequentie (RF) stimuleren we de diepe collageenlagen. Dit zorgt voor een onmiddellijke verstrakking van de huid en een natuurlijke lift van de gezichtscontouren.",
      },
      {
        label: "Anti-Aging Boost",
        text: "Ultrasone trillingen zorgen ervoor dat actieve werkstoffen dieper in de huid doordringen voor een langdurig verjongend effect.",
      },
    ],
    benefitsHeading: "De drie technieken:",
    detail: "Kalahari Productlijn",
    image: "/images/facial-treatment.jpg",
    imageAlt: "Luxe gezichtsbehandeling bij Skin Studio Zuid",
  },
  {
    id: "laserontharing",
    tag: "Laserontharing",
    title: "Definitieve Ontharing met de Atres Triple Wave",
    description:
      "In onze kliniek werken wij uitsluitend met de beste technologie. De Atres is een medisch gecertificeerde laser die drie verschillende golflengtes combineert. Waar oudere lasers vaak moeite hebben met lichte haartjes of een donkere huid, biedt de Atres een veilige en effectieve oplossing voor elk huid- en haartype.",
    benefits: [
      { label: "Effectief", text: "Pakt de haarwortel in de kern aan voor blijvend resultaat." },
      { label: "Vrijwel pijnloos", text: "Door de actieve koeling in de laserkop." },
      { label: "Snel", text: "Kortere behandeltijden door de geavanceerde In-Motion techniek." },
      { label: "Veilig", text: "Geschikt voor behandelingen het hele jaar door." },
    ],
    detail: "ATRES Technologie",
    image: "/images/laser-treatment.jpg",
    imageAlt: "Professionele laserontharing bij Skin Studio Zuid",
  },
]

export function SpecialtiesSection() {
  return (
    <section id="behandelingen" className="pt-16 pb-12 md:pt-24 md:pb-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <span
            className="font-sans text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--rose-gold)" }}
          >
            Onze specialisaties
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance max-w-xl">
            Behandelingen op maat
          </h2>
          <div className="w-12 h-px mt-6" style={{ backgroundColor: "var(--rose-gold)" }} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {specialties.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden"
              style={{ backgroundColor: index % 2 === 0 ? "var(--sand)" : "var(--walnut)" }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(to bottom, transparent 50%, var(--sand) 100%)"
                        : "linear-gradient(to bottom, transparent 50%, var(--walnut) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <p
                  className="font-sans text-xs tracking-[0.3em] uppercase mb-4"
                  style={{ color: "var(--rose-gold)" }}
                >
                  {item.tag}
                </p>
                <h3
                  className="font-serif text-2xl md:text-3xl mb-4 text-balance"
                  style={{ color: index % 2 === 0 ? "var(--foreground)" : "var(--cream)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed mb-4"
                  style={{ color: index % 2 === 0 ? "var(--muted-foreground)" : "var(--cream)" }}
                >
                  {item.description}
                </p>

                {item.benefits && (
                  <div className="mb-6">
                    <p
                      className="font-sans text-sm font-medium mb-3"
                      style={{ color: "var(--rose-gold)" }}
                    >
                      {item.benefitsHeading ?? "De voordelen op een rij:"}
                    </p>
                    <ul className="space-y-2 font-sans text-sm leading-relaxed" style={{ color: index % 2 === 0 ? "var(--muted-foreground)" : "var(--cream)" }}>
                      {item.benefits.map((b) => (
                        <li key={b.label}>
                          <strong style={{ color: index % 2 === 0 ? "var(--foreground)" : "var(--cream)" }}>{b.label}:</strong> {b.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className="font-sans text-xs tracking-[0.2em] uppercase"
                    style={{ color: "var(--rose-gold)" }}
                  >
                    {item.detail}
                  </span>
                  <Link
                    href="#contact"
                    className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-200 group/link"
                    style={{ color: "var(--rose-gold)" }}
                  >
                    Meer info
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waarom deze combinatie? */}
        <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl px-6 py-8 md:px-10 md:py-10 text-center"
            style={{
              backgroundColor: "var(--sand)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="w-12 h-px mx-auto mb-6"
              style={{ backgroundColor: "var(--rose-gold)" }}
            />
            <h3
              className="font-serif text-2xl md:text-4xl mb-4 text-balance leading-tight"
              style={{ color: "var(--rose-gold)" }}
            >
              Waarom deze combinatie?
            </h3>
            <p className="font-sans text-sm md:text-base leading-relaxed text-muted-foreground text-balance max-w-2xl mx-auto">
              Een gezonde huid begint bij een goede basis. Terwijl de laser zorgt voor een blijvend gladde huid, zorgt de HydraSpa voor de optimale conditie en stevigheid van je huid. Of je nu komt voor ontharing of voor huidverjonging; wij bieden een op maat gemaakt behandelplan met de meest innovatieve apparatuur van 2026.
            </p>
            <div
              className="w-12 h-px mx-auto mt-6"
              style={{ backgroundColor: "var(--rose-gold)" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
