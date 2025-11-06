import { Header } from "@/components/header"
import { WorkGallerySection } from "@/components/work-gallery-section"
import { RecommendSection } from "@/components/recommend-section"
import { Footer } from "@/components/footer"

export default function ProductPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WorkGallerySection />
      <RecommendSection />
      <Footer 
        imageSrc="/img/2.webp"
        headingText={
          <>
            See it in 
            <br />
            action 
          </>
        }
        buttonText='BOOK A DEMO'
        buttonLink="/"
      />
    </main>
  )
}

