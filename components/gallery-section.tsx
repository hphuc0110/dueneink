"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { artistsList } from "@/lib/artists-data"

export function GallerySection() {
  return (
    <section className="bg-[#f5f5f0] py-8 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="mb-6 sm:mb-10 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
            BIO ARTIST
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center items-center gap-8 sm:gap-10 md:gap-16">
          {artistsList.map((artist, index) => (
            <div
              key={artist.id}
              className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[280px] sm:max-w-none sm:w-auto animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/artists/${artist.slug}`} className="w-full flex justify-center min-w-0">
                <div className="w-full max-w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] overflow-hidden rounded-2xl sm:rounded-[32px] shadow-md hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full aspect-3/4 sm:aspect-auto sm:h-[420px] md:h-[460px] lg:h-[520px] object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                  />
                </div>
              </Link>
              <p className="text-base sm:text-lg md:text-xl font-medium text-gray-900 text-center px-2">
                {artist.name}
              </p>
              <Link href={`/artists/${artist.slug}`} className="w-full sm:w-auto flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-full border border-black/40 px-8 sm:px-12 py-3 min-h-[44px] sm:min-h-0 bg-white text-sm sm:text-base font-medium hover:bg-black hover:text-white active:bg-black active:text-white transition-all duration-300 touch-manipulation"
                >
                  View Gallery
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animation */}
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
