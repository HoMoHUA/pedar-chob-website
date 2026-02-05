import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { FeaturesSection } from "@/components/sections/features"
import { ProductsSection } from "@/components/sections/products"
import { GallerySection } from "@/components/sections/gallery"
import { AboutSection } from "@/components/sections/about"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ContactSection } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed Header */}
      <Header />

      {/* Page Sections */}
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <GallerySection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
