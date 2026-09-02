"use client"

import { useState } from "react"
import Image from "next/image"

interface ArtistGalleryProps {
  images: string[]
  artistName: string
}

export function ArtistGallery({ images, artistName }: ArtistGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const hasImages = images && images.length > 0
  if (!hasImages) return null

  const openAt = (index: number) => {
    setActiveIndex(index)
  }

  const close = () => setActiveIndex(null)

  const showPrev = () => {
    if (activeIndex === null) return
    setActiveIndex((activeIndex - 1 + images.length) % images.length)
  }

  const showNext = () => {
    if (activeIndex === null) return
    setActiveIndex((activeIndex + 1) % images.length)
  }

  return (
    <>
      {/* Thumbnails grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-[2px]">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className="relative w-full aspect-3/4 overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/60"
          >
            <Image
              src={src}
              alt={`${artistName} work ${i + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 sm:px-6"
          onClick={close}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/70 text-white w-8 h-8 flex items-center justify-center text-sm hover:bg-black"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-2 sm:left-4 z-10 rounded-full bg-black/70 text-white w-9 h-9 flex items-center justify-center text-lg hover:bg-black"
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-[60vh] sm:h-[70vh]">
              <Image
                src={images[activeIndex]}
                alt={`${artistName} work ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Next button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                className="absolute right-2 sm:right-4 z-10 rounded-full bg-black/70 text-white w-9 h-9 flex items-center justify-center text-lg hover:bg-black"
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

