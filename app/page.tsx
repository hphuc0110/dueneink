import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ArtDiscoverySection } from "@/components/art-discovery-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen pt-16 sm:pt-12">
      <Header />
      <HeroSection />
      <AboutSection />
      <ArtDiscoverySection />
      <GallerySection />
      <ContactFormSection />
      <Footer imageSrc="/img/9.webp" />
    </main>
  )
}
