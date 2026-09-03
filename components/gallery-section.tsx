"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getArtistBySlug } from "@/lib/artists-data"

export function GallerySection() {
  const artist = getArtistBySlug("stush")
  const [expanded, setExpanded] = useState(false)

  if (!artist) return null

  return (
    <section className="bg-[#f5f5f0] py-2 sm:py-2 md:py-2 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
            BIO ARTIST
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start animate-fade-up">
          {/* Left: image */}
          <div className="w-full flex justify-start">
            <Link href={`/artists/${artist.slug}`} className="w-full max-w-[400px] block">
              <div className="w-full overflow-hidden rounded-2xl sm:rounded-[32px] shadow-md hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full aspect-3/4 object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                />
              </div>
            </Link>
          </div>

          {/* Right: intro */}
          <div className="flex flex-col text-left">
            <div className="space-y-3">
              <p className="text-sm sm:text-base">
                <span className="font-bold">Name:</span> {artist.profileName ?? artist.name}
              </p>
              {artist.age != null && (
                <p className="text-sm sm:text-base">
                  <span className="font-bold">Age:</span> {artist.age}
                </p>
              )}
              {artist.from && (
                <p className="text-sm sm:text-base">
                  <span className="font-bold">From:</span> {artist.from}
                </p>
              )}
            </div>

            {artist.about && (
              <div className="mt-6 sm:mt-8 space-y-3">
                <p className="font-bold text-sm sm:text-base">
                  {artist.aboutLabel ?? "About him:"}
                </p>
                <div
                  className={`text-sm sm:text-base leading-relaxed text-black whitespace-pre-wrap ${
                    expanded ? "" : "line-clamp-8"
                  }`}
                >
                  {artist.about}
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="text-sm sm:text-base font-medium underline underline-offset-2 hover:no-underline"
                >
                  {expanded ? "See less" : "See more"}
                </button>
              </div>
            )}

            <Link href={`/artists/${artist.slug}`} className="inline-flex mt-6 sm:mt-8">
              <Button
                variant="outline"
                className="rounded-full border border-black/40 px-8 sm:px-12 py-3 min-h-[44px] sm:min-h-0 bg-white text-sm sm:text-base font-medium hover:bg-black hover:text-white active:bg-black active:text-white transition-all duration-300 touch-manipulation"
              >
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease forwards;
        }
      `}</style>
    </section>
  )
}
