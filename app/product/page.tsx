"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { WorkGallerySection } from "@/components/work-gallery-section"
import { RecommendSection } from "@/components/recommend-section"
import { Footer } from "@/components/footer"
import type { TattooItem, DigitalArtItem } from "@/lib/tattoos-data"

export default function ProductPage() {
  const [selectedItem, setSelectedItem] = useState<TattooItem | DigitalArtItem | null>(null)

  return (
    <main className="min-h-screen pt-12 sm:pt-12 relative">
      <Header />
      <div className="relative z-0" style={{ pointerEvents: 'auto' }}>
        <WorkGallerySection onItemSelect={setSelectedItem} />
        <RecommendSection selectedItem={selectedItem} />
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
      </div>
    </main>
  )
}

