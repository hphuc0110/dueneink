"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"
import type { TattooItem, DigitalArtItem } from "@/lib/tattoos-data"

interface RecommendSectionProps {
  selectedItem: TattooItem | DigitalArtItem | null
}

export function RecommendSection({ selectedItem }: RecommendSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Default recommendations khi chưa chọn gì
  const defaultRecommendations = [
    {
      id: 1,
      image: "/img/6.webp",
      alt: "Floral lower back tattoo",
    },
    {
      id: 2,
      image: "/img/7.webp",
      alt: "Dragon side body tattoo",
    },
    {
      id: 3,
      image: "/img/8.webp",
      alt: "Ornate arm tattoo",
    },
  ]

  // Tạo recommendations từ selectedItem
  const getRecommendations = () => {
    if (!selectedItem || !selectedItem.images || selectedItem.images.length === 0) {
      return defaultRecommendations
    }

    // Hiển thị tất cả ảnh từ selectedItem
    return selectedItem.images.map((imageSrc, index) => ({
      id: index + 1,
      image: imageSrc,
      alt: `${selectedItem.name} - Image ${index + 1}`,
      name: selectedItem.name,
    }))
  }

  const recommendations = getRecommendations()
  const isCustomView = selectedItem !== null

  const openImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeImage = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex === null || !selectedItem?.images) return
    setSelectedImageIndex(
      selectedImageIndex > 0 ? selectedImageIndex - 1 : selectedItem.images.length - 1
    )
  }

  const goToNext = () => {
    if (selectedImageIndex === null || !selectedItem?.images) return
    setSelectedImageIndex(
      selectedImageIndex < selectedItem.images.length - 1 ? selectedImageIndex + 1 : 0
    )
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      } else if (e.key === "Escape") {
        closeImage()
      }
    }

    if (selectedImageIndex !== null) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImageIndex, selectedItem])

  return (
    <section 
      id="recommend-section"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#f5f3f0] scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
            {isCustomView ? selectedItem.name : "Recommend for You"}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg font-medium px-2 sm:px-4 md:px-0">
            {isCustomView 
              ? "Click on an image to view the full gallery"
              : "We've selected these works based on artists you'll love."
            }
          </p>
        </div>

        <div className={`grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto ${
          !isCustomView 
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center" 
            : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}>
          {recommendations.map((item, index) => (
            <div 
              key={item.id} 
              className={`space-y-0 ${isCustomView ? 'cursor-pointer' : ''} ${
                !isCustomView ? 'max-w-[300px] w-full' : 'w-full'
              }`}
              onClick={() => {
                if (isCustomView && selectedItem) {
                  // Tìm index của ảnh này trong selectedItem.images
                  const imageIndex = selectedItem.images.findIndex(img => img === item.image)
                  openImage(imageIndex >= 0 ? imageIndex : index)
                }
              }}
            >
              <div className="relative aspect-[3/4] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden group">
                <Image 
                  src={item.image || "/img/2.webp"} 
                  alt={item.alt} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Image Viewer Modal - chỉ hiển thị khi có selectedItem */}
        {isCustomView && selectedItem && (
          <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeImage()}>
            <DialogContent 
              className="max-w-[100vw] sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] max-h-[100vh] sm:max-h-[95vh] p-0 bg-[#f5f5f0] border-none m-0 sm:m-4 rounded-none sm:rounded-lg"
              showCloseButton={false}
            >
              {selectedImageIndex !== null && selectedItem.images && (
                <div className="relative w-full h-[100vh] sm:h-[90vh] flex items-center justify-center">
                  {/* Close Button */}
                  <DialogClose className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center">
                    <XIcon className="w-6 h-6 sm:w-5 sm:h-5" />
                  </DialogClose>

                  {/* Previous Button */}
                  {selectedItem.images.length > 1 && (
                    <button
                      onClick={goToPrevious}
                      className="absolute left-3 sm:left-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 md:p-3 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      aria-label="Previous image"
                    >
                      <ChevronLeftIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                  )}

                  {/* Image */}
                  <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
                    <Image
                      src={selectedItem.images[selectedImageIndex]}
                      alt={`${selectedItem.name} - Image ${selectedImageIndex + 1}`}
                      width={1920}
                      height={1080}
                      className="max-w-full max-h-full object-contain"
                      priority
                    />
                  </div>

                  {/* Next Button */}
                  {selectedItem.images.length > 1 && (
                    <button
                      onClick={goToNext}
                      className="absolute right-3 sm:right-4 z-50 text-white hover:text-white/80 bg-black/60 hover:bg-black/80 rounded-full p-2.5 sm:p-2 md:p-3 transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                      aria-label="Next image"
                    >
                      <ChevronRightIcon className="w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                  )}

                  {/* Image Counter */}
                  {selectedItem.images.length > 1 && (
                    <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white bg-black/60 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm touch-manipulation">
                      {selectedImageIndex + 1} / {selectedItem.images.length}
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
