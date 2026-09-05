import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { IntroStrip } from "@/components/intro-strip"
import { SpecialtiesSection } from "@/components/specialties-section"
import { StudioSection } from "@/components/studio-section"
import { QuoteSection } from "@/components/quote-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ProductsSection } from "@/components/products-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="inhoud" className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
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
