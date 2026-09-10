import { Navbar } from "@/components/editie2/navbar"
import { HeroPortaal } from "@/components/editie2/hero-portaal"
import { IntroStrip } from "@/components/intro-strip"
import { Behandelkaarten } from "@/components/editie2/behandelkaarten"
import { Tellers } from "@/components/editie2/tellers"
import { Rondgang } from "@/components/editie2/rondgang"
import { Studio } from "@/components/editie2/studio"
import { Traject } from "@/components/editie2/traject"
import { QuoteSection } from "@/components/quote-section"
import { Producten } from "@/components/editie2/producten"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/editie2/footer"

/**
 * De homepage van editie 2, in de volgorde van het plan van 10 september 2026:
 * de hero die je de studio in trekt, de twee behandelingen als glas-kaarten,
 * drie getallen, de rondgang, over ons, het traject, de filosofie, de
 * producten en tot slot het contactformulier. De ankers #behandelingen,
 * #studio, #producten en #contact blijven bestaan omdat lib/navigatie.ts en
 * public/llms.txt ernaar verwijzen.
 */
export default function Home() {
  return (
    <main id="inhoud" className="overflow-x-clip">
      <Navbar />
      <HeroPortaal />
      <IntroStrip />
      <Behandelkaarten />
      <Tellers />
      <Rondgang />
      <Studio />
      <Traject />
      <QuoteSection />
      <Producten />
      <ContactSection />
      <Footer />
    </main>
  )
}
