import { Navbar } from "@/components/editie2/navbar"
import { HeroPortaal } from "@/components/editie2/hero-portaal"
import { IntroStrip } from "@/components/intro-strip"
import { SpecialtiesSection } from "@/components/specialties-section"
import { StudioSection } from "@/components/studio-section"
import { QuoteSection } from "@/components/quote-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ProductsSection } from "@/components/products-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/editie2/footer"

export default function Home() {
  return (
    <main id="inhoud" className="overflow-x-hidden">
      <Navbar />
      <HeroPortaal />
      <IntroStrip />
      <WhyUsSection />
      <SpecialtiesSection />
      <StudioSection />
      <QuoteSection />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
