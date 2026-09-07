"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { WorkGallerySection } from "@/components/work-gallery-section"
import { StushArtworkSection } from "@/components/stush-artwork-section"
import { RecommendSection } from "@/components/recommend-section"
import { Footer } from "@/components/footer"
import type { TattooItem, DigitalArtItem } from "@/lib/tattoos-data"

export default function ProductPage() {
  const [selectedItem, setSelectedItem] = useState<TattooItem | DigitalArtItem | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.location.hash !== "#stush-artwork") return
    const el = document.getElementById("stush-artwork")
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }, [])

  return (
    <main className="min-h-screen pt-12 sm:pt-12 relative">
      <Header />
      <div className="relative z-0" style={{ pointerEvents: 'auto' }}>
        <WorkGallerySection onItemSelect={setSelectedItem} />
        <StushArtworkSection />
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

