"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"
import { tattoosList, type TattooItem } from "@/lib/tattoos-data"

export default function TattooGalleryPage() {
  const params = useParams()
  const [tattoo, setTattoo] = useState<TattooItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    if (params.id) {
      const foundTattoo = tattoosList.find((t) => t.id === params.id)
      if (foundTattoo) {
        setTattoo(foundTattoo)
      }
      setLoading(false)
    }
  }, [params.id])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null || !tattoo?.images) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setSelectedImageIndex((prev) => {
          if (prev === null) return null
          return prev > 0 ? prev - 1 : tattoo.images.length - 1
        })
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        setSelectedImageIndex((prev) => {
          if (prev === null) return null
          return prev < tattoo.images.length - 1 ? prev + 1 : 0
        })
      } else if (e.key === "Escape") {
        setSelectedImageIndex(null)
      }
    }

    if (selectedImageIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImageIndex, tattoo])

  const openImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeImage = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex === null || !tattoo?.images) return
    setSelectedImageIndex(
      selectedImageIndex > 0 ? selectedImageIndex - 1 : tattoo.images.length - 1
    )
  }

  const goToNext = () => {
    if (selectedImageIndex === null || !tattoo?.images) return
    setSelectedImageIndex(
      selectedImageIndex < tattoo.images.length - 1 ? selectedImageIndex + 1 : 0
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-12 sm:pt-12">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  if (!tattoo) {
    return (
      <main className="min-h-screen pt-12 sm:pt-12">
        <Header />
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Không tìm thấy hình xăm.</p>
          <Link href="/product">
            <Button>Quay lại Product</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-12 sm:pt-12">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 w-full bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link href="/product">
            <Button 
              variant="ghost" 
              className="mb-6 sm:mb-8 text-sm sm:text-base"
            >
              ← Quay lại Product
            </Button>
          </Link>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground uppercase tracking-tight animate-fade-in">
            {tattoo.name}
          </h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {tattoo.images && tattoo.images.length > 0 ? (
            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {tattoo.images.map((imageSrc, index) => (
                <div
                  key={index}
                  onClick={() => openImage(index)}
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={imageSrc}
                    alt={`${tattoo.name} - Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Chưa có hình ảnh.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Viewer Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeImage()}>
        <DialogContent 
          className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] max-h-[95vh] p-0 bg-[#f5f5f0] border-none"
          showCloseButton={false}
        >
          {selectedImageIndex !== null && tattoo?.images && (
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              {/* Close Button */}
              <DialogClose className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 text-white hover:text-white/80 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors">
                <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </DialogClose>

              {/* Previous Button */}
              {tattoo.images.length > 1 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 z-50 text-white hover:text-white/80 bg-black/50 hover:bg-black/70 rounded-full p-2 sm:p-3 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
                <Image
                  src={tattoo.images[selectedImageIndex]}
                  alt={`${tattoo.name} - Image ${selectedImageIndex + 1}`}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>

              {/* Next Button */}
              {tattoo.images.length > 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 z-50 text-white hover:text-white/80 bg-black/50 hover:bg-black/70 rounded-full p-2 sm:p-3 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Image Counter */}
              {tattoo.images.length > 1 && (
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white bg-black/50 px-4 py-2 rounded-full text-xs sm:text-sm">
                  {selectedImageIndex + 1} / {tattoo.images.length}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer imageSrc="/img/2.webp" />
    </main>
  )
}

