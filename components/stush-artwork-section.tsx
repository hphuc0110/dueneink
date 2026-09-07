"use client"

import { getArtistBySlug } from "@/lib/artists-data"
import { ArtistGallery } from "@/components/artist-gallery"

export function StushArtworkSection() {
  const artist = getArtistBySlug("stush")
  const images = artist?.galleryImages ?? []

  if (!artist || images.length === 0) return null

  return (
    <section
      id="stush-artwork"
      className="bg-[#f5f3f0] py-12 sm:py-16 md:py-20 border-t border-black/10 scroll-mt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-10 sm:mb-12">
          Stush Artwork
        </h2>
        <ArtistGallery images={images} artistName={artist.name} />
      </div>
    </section>
  )
}
